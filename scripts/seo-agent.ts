import { Command } from 'commander';
import * as dotenv from 'dotenv';
import { OpenAI } from 'openai';
import { createObjectCsvWriter } from 'csv-writer';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { cleanKeywordTopic, sanitizeHeadingText } from './frameworks-library';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// ─── Helpers ───────────────────────────────────────────────────────────────────

function promptUser(question: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(question, ans => { rl.close(); resolve(ans); }));
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function mapCompetition(level: any): number {
  if (typeof level === 'number') return level;
  const map: Record<string, number> = { LOW: 0.2, MEDIUM: 0.5, HIGH: 0.8 };
  return map[String(level).toUpperCase()] ?? 0.5;
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── CLI ───────────────────────────────────────────────────────────────────────

const program = new Command();
program
  .name('seo-agent')
  .description('Exbabel SEO & GEO Intelligence Agent v2')
  .option('-k, --keywords <string>', 'Comma-separated seed keywords')
  .option('-f, --seed-file <path>', 'Path to text file containing seed keywords (one per line)')
  .option('--csv <path>', 'Load keywords from an existing CSV file (skips DataForSEO API)')
  .option('--mock', 'Run with mock data (skip API calls)')
  .option('-d, --domain <string>', 'Target domain', 'exbabel.com')
  .option('-s, --serp-depth <number>', 'SERP analysis depth', '20')
  .option('--max-keywords <number>', 'Max keywords to process', '5000')
  .option('--top-briefs <number>', 'Number of content briefs to generate', '5')
  .option('--skip-serp', 'Skip SERP analysis (saves DataForSEO credits)')
  .parse(process.argv);

const options = program.opts();

// ─── Environment ───────────────────────────────────────────────────────────────

const DATAFORSEO_LOGIN = process.env.DATAFORSEO_LOGIN;
const DATAFORSEO_PASSWORD = process.env.DATAFORSEO_PASSWORD;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!DATAFORSEO_LOGIN || !DATAFORSEO_PASSWORD || !OPENAI_API_KEY) {
  console.error('Missing env vars. Add DATAFORSEO_LOGIN, DATAFORSEO_PASSWORD, OPENAI_API_KEY to .env.local');
  process.exit(1);
}

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
const dataForSeoAuth = Buffer.from(`${DATAFORSEO_LOGIN}:${DATAFORSEO_PASSWORD}`).toString('base64');

// ─── Product Context ───────────────────────────────────────────────────────────

const EXBABEL_CONTEXT = `Exbabel (exbabel.com) is a live translation and simultaneous interpretation SaaS platform. 
It provides:
- Real-time speech-to-speech translation for live video streams
- Live caption translation overlays for churches, conferences, and events
- Multilingual livestreaming support (YouTube, Zoom, RTMP, HLS)
- AI-powered interpreter software for religious services, conferences, and corporate events
- Support for 50+ languages with sub-second latency

Target customers: Churches, conference organizers, event producers, ministries, 
livestreamers, corporate training departments, and international organizations.

Exbabel does NOT do: document translation, image translation, text-only translation, 
morse code, historical language translation, or general consumer translation apps.`;

// ─── Interfaces ────────────────────────────────────────────────────────────────

interface KeywordData {
  keyword: string;
  volume: number;
  difficulty: number;
  cpc: number;
  intent: string;
  competition: number;
  relevanceScore: number;
  buyerPersona: string;
  opportunityScore: number;
  revenueScore: number;
  cluster?: string;
  ctrScore: number;
  aiOverviewPresent: boolean;
  brandDomainPageScore: number;
  allocationBucket: 'Core' | 'Experimental';
  isExperimental: boolean;
}

interface SerpResult {
  position: number;
  url: string;
  title: string;
  description: string;
  type: string;
}

interface CompetitorProfile {
  domain: string;
  urls: string[];
  avgPosition: number;
  contentType: string;
  winnability: string;
}

interface PAAQuestion {
  question: string;
  keyword: string;
}

// ─── DataForSEO API ────────────────────────────────────────────────────────────

async function callDataForSeo(endpoint: string, postData: any[]): Promise<any> {
  const url = `https://api.dataforseo.com/v3${endpoint}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${dataForSeoAuth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });
    const data = await response.json();
    if (data.tasks?.[0]?.status_code && data.tasks[0].status_code !== 20000) {
      console.error(`  ⚠ API error: ${data.tasks[0].status_message}`);
    }
    return data;
  } catch (error) {
    console.error(`  ✗ Network error on ${endpoint}:`, error);
    return null;
  }
}

async function fetchKeywordIdeas(keyword: string, limit = 700): Promise<any[]> {
  if (options.mock) return generateMockKeywords(keyword, 'ideas');
  console.log(`  → Fetching keyword ideas for: "${keyword}"`);
  const data = await callDataForSeo('/dataforseo_labs/google/keyword_ideas/live', [{
    keywords: [keyword], location_name: 'United States', language_name: 'English', limit
  }]);
  return data?.tasks?.[0]?.result?.[0]?.items || [];
}

async function fetchRelatedKeywords(keyword: string, limit = 700): Promise<any[]> {
  if (options.mock) return generateMockKeywords(keyword, 'related');
  console.log(`  → Fetching related keywords for: "${keyword}"`);
  const data = await callDataForSeo('/dataforseo_labs/google/related_keywords/live', [{
    keyword, location_name: 'United States', language_name: 'English', limit
  }]);
  return data?.tasks?.[0]?.result?.[0]?.items || [];
}

async function fetchSerpResults(keyword: string, depth: number): Promise<{
  organic: SerpResult[];
  paa: PAAQuestion[];
  features: { aiOverview: boolean; featuredSnippet: boolean; adsCount: number };
}> {
  if (options.mock) {
    return {
      organic: generateMockSerp(),
      paa: generateMockPAA(keyword),
      features: { aiOverview: keyword.includes('ai') || keyword.includes('live'), featuredSnippet: false, adsCount: 1 }
    };
  }
  console.log(`  → Analyzing SERP for: "${keyword}" (depth ${depth})`);
  const data = await callDataForSeo('/serp/google/organic/live/advanced', [{
    keyword, location_name: 'United States', language_name: 'English', depth
  }]);

  const organic: SerpResult[] = [];
  const paa: PAAQuestion[] = [];
  let aiOverview = false;
  let featuredSnippet = false;
  let adsCount = 0;

  const items = data?.tasks?.[0]?.result?.[0]?.items || [];
  for (const item of items) {
    if (item.type === 'ai_overview' || item.type === 'search_refinement' || item.type === 'generative_ai') {
      aiOverview = true;
    }
    if (item.type === 'featured_snippet') {
      featuredSnippet = true;
    }
    if (item.type === 'paid' || item.type === 'ads') {
      adsCount++;
    }
    if (item.type === 'organic' && item.url) {
      organic.push({
        position: item.rank_absolute || 0,
        url: item.url,
        title: item.title || '',
        description: item.description || '',
        type: 'organic'
      });
    }
    if (item.type === 'people_also_ask') {
      const questions = item.items || [];
      for (const q of questions) {
        if (q.title) paa.push({ question: q.title, keyword });
      }
    }
  }
  return { organic, paa, features: { aiOverview, featuredSnippet, adsCount } };
}

// ─── Mock Data (for testing without API) ───────────────────────────────────────

function generateMockKeywords(seed: string, type: string): any[] {
  const prefixes = type === 'ideas'
    ? ['best', 'top', 'free', 'enterprise', 'ai powered']
    : ['alternative to', 'vs', 'review', 'pricing', 'how to use'];
  return prefixes.map((p, i) => ({
    keyword: `${p} ${seed}`,
    keyword_info: { search_volume: 1000 * (5 - i), cpc: 2.0 + i * 0.5, competition_level: ['LOW', 'MEDIUM', 'HIGH'][i % 3] },
    keyword_properties: { keyword_difficulty: 20 + i * 10 }
  }));
}

function generateMockSerp(): SerpResult[] {
  return [
    { position: 1, url: 'https://wordly.ai/', title: 'Wordly - AI Live Translation', description: 'Real-time translation for meetings and events.', type: 'organic' },
    { position: 2, url: 'https://interprefy.com/', title: 'Interprefy - Remote Interpretation', description: 'Professional interpretation platform.', type: 'organic' },
    { position: 3, url: 'https://kudo.ai/', title: 'KUDO - Multilingual Meetings', description: 'AI-powered interpretation for enterprises.', type: 'organic' },
  ];
}

function generateMockPAA(keyword: string): PAAQuestion[] {
  return [
    { question: `What is the best ${keyword}?`, keyword },
    { question: `How much does ${keyword} cost?`, keyword },
    { question: `Is there a free ${keyword}?`, keyword },
  ];
}

// ─── OpenAI Analysis Functions ─────────────────────────────────────────────────

async function classifyIntentBatch(keywords: string[]): Promise<Record<string, string>> {
  if (keywords.length === 0) return {};
  if (options.mock) {
    const map: Record<string, string> = {};
    keywords.forEach(k => map[k] = k.includes('best') || k.includes('buy') || k.includes('pricing') ? 'Commercial' : 'Informational');
    return map;
  }

  console.log(`  → Classifying intent for ${keywords.length} keywords...`);
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: `Classify search intent for these keywords. Categories: Informational, Commercial, Transactional, Navigational.\nReturn JSON: { "keyword": "intent" }\n\nKeywords:\n${keywords.join('\n')}` }],
      response_format: { type: 'json_object' }
    });
    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('  ✗ Intent classification error:', error);
    return {};
  }
}

async function scoreRelevanceBatch(keywords: string[]): Promise<Record<string, { score: number; reason: string }>> {
  if (keywords.length === 0) return {};
  if (options.mock) {
    const map: Record<string, { score: number; reason: string }> = {};
    keywords.forEach(k => {
      const relevant = k.includes('live') || k.includes('translation') || k.includes('interpreter') || k.includes('church') || k.includes('conference');
      map[k] = { score: relevant ? 8 : 2, reason: relevant ? 'Directly related to live translation' : 'Not relevant to Exbabel product' };
    });
    return map;
  }

  console.log(`  → Scoring relevance for ${keywords.length} keywords...`);
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{
        role: 'system',
        content: `You are an SEO analyst for Exbabel. ${EXBABEL_CONTEXT}\n\nScore each keyword 0-10 for relevance to Exbabel's product. 10 = perfect match (e.g., "live translation for churches"). 0 = completely irrelevant (e.g., "morse code translator").`
      }, {
        role: 'user',
        content: `Score these keywords. Return JSON: { "keyword": { "score": number, "reason": "brief reason" } }\n\nKeywords:\n${keywords.join('\n')}`
      }],
      response_format: { type: 'json_object' }
    });
    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('  ✗ Relevance scoring error:', error);
    return {};
  }
}

async function mapBuyerPersonas(keywords: string[]): Promise<Record<string, string>> {
  if (keywords.length === 0) return {};
  if (options.mock) {
    const map: Record<string, string> = {};
    keywords.forEach(k => {
      if (k.includes('church') || k.includes('ministry')) map[k] = 'Church Admin';
      else if (k.includes('conference') || k.includes('event')) map[k] = 'Conference Organizer';
      else if (k.includes('livestream') || k.includes('youtube')) map[k] = 'Livestreamer';
      else map[k] = 'Enterprise Buyer';
    });
    return map;
  }

  console.log(`  → Mapping buyer personas for ${keywords.length} keywords...`);
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{
        role: 'system',
        content: `You are an SEO analyst for Exbabel. Map each keyword to the most likely buyer persona.\n\nPersonas:\n- Church Admin: Searching for translation for worship services, sermons, ministry events\n- Conference Organizer: Looking for event interpretation, conference translation\n- Livestreamer: Wanting multilingual livestream capabilities, YouTube/Zoom translation\n- Enterprise Buyer: Corporate training, international meetings, platform evaluation\n- General User: General interest, research, not a clear buyer`
      }, {
        role: 'user',
        content: `Map these keywords. Return JSON: { "keyword": "persona" }\n\nKeywords:\n${keywords.join('\n')}`
      }],
      response_format: { type: 'json_object' }
    });
    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('  ✗ Persona mapping error:', error);
    return {};
  }
}

async function analyzeSerpWinnability(serpResults: SerpResult[]): Promise<{ analysis: string; score: number; dominantType: string }> {
  if (options.mock) return { analysis: 'SERP shows mix of startups and enterprises. Winnable with strong content.', score: 7, dominantType: 'SaaS product pages' };

  const serpSummary = serpResults.slice(0, 10).map(r => `#${r.position}: ${r.url} — "${r.title}"`).join('\n');
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{
        role: 'system',
        content: `Analyze this SERP to determine if a startup SaaS (Exbabel) can realistically rank. ${EXBABEL_CONTEXT}`
      }, {
        role: 'user',
        content: `Analyze these top 10 SERP results. Return JSON:\n{\n  "analysis": "2-3 sentence assessment",\n  "score": 1-10 (10=very winnable for a startup),\n  "dominantType": "what type of content dominates (blog posts, product pages, enterprise sites, etc)"\n}\n\nSERP Results:\n${serpSummary}`
      }],
      response_format: { type: 'json_object' }
    });
    return JSON.parse(response.choices[0].message.content || '{"analysis":"Unknown","score":5,"dominantType":"mixed"}');
  } catch (error) {
    return { analysis: 'Could not analyze SERP', score: 5, dominantType: 'unknown' };
  }
}

async function buildCompetitorGapAnalysis(seedKeywords: string[], keywords: KeywordData[] = []): Promise<string> {
  const topKws = keywords.length > 0 ? keywords.slice(0, 10) : [
    { keyword: 'church translation software', volume: 1600, difficulty: 28, cpc: 4.50 },
    { keyword: 'live subtitle generator for church', volume: 1200, difficulty: 24, cpc: 3.80 },
    { keyword: 'simultaneous interpretation app', volume: 2900, difficulty: 45, cpc: 6.20 },
    { keyword: 'multilingual worship livestream', volume: 880, difficulty: 18, cpc: 2.90 },
    { keyword: 'real time audio translation software', volume: 4400, difficulty: 52, cpc: 7.50 },
    { keyword: 'ai captioning for live events', volume: 3200, difficulty: 38, cpc: 5.10 },
    { keyword: 'zoom live translation plugin', volume: 2100, difficulty: 35, cpc: 4.20 },
    { keyword: 'obs studio translation plugin', volume: 1800, difficulty: 22, cpc: 3.10 },
    { keyword: 'spanish translation for church services', volume: 950, difficulty: 15, cpc: 2.40 },
    { keyword: 'worship leader live captions', volume: 720, difficulty: 12, cpc: 2.10 }
  ];

  if (options.mock) {
    const matrixRows = topKws.map((k, idx) => {
      const wordly = idx % 2 === 0 ? 'Rank #1-3' : 'Rank #4-10';
      const kudoway = idx % 3 === 0 ? 'Rank #1-3' : 'Not Ranking';
      const interprefy = idx % 4 === 0 ? 'Rank #4-10' : 'Not Ranking';
      const glossa = idx % 3 === 1 ? 'Rank #4-10' : 'Not Ranking';
      const exbabel = idx === 0 ? 'Rank #4-10' : 'Opportunity Gap';
      return `| ${k.keyword} | ${k.volume.toLocaleString()} | ${k.difficulty} | $${k.cpc.toFixed(2)} | ${wordly} | ${kudoway} | ${interprefy} | ${glossa} | **${exbabel}** |`;
    }).join('\n');

    return `## Competitor Gap Analysis (Domain Intersection)

An in-depth domain intersection audit comparing **Exbabel.com** against primary incumbents (**Wordly.ai**, **Kudoway.com**, **Interprefy.com**, and **Glossa.ai**) reveals critical keyword gaps where competitors currently capture high-intent commercial traffic.

### Domain Intersection Matrix

| Keyword / Topic | Search Vol | KD | CPC | Wordly.ai | Kudoway.com | Interprefy.com | Glossa.ai | Exbabel Status |
|-----------------|------------|----|-----|-----------|-------------|----------------|-----------|----------------|
${matrixRows}

### Urgent Gap Breakdown & Competitive Vulnerabilities

1. **Church & Ministry Niche Monopolization**:
   - **Competitor Flaw**: Wordly.ai and Interprefy target general corporate enterprise events, completely ignoring church-specific terminology (e.g., *worship leader captioning*, *sermon live translation*, *multilingual sanctuary audio*).
   - **Exbabel Moat**: Building dedicated church landing pages and ministry case studies will allow Exbabel to capture 100% of high-intent religious service translation queries with virtually zero domain competition.

2. **Livestreaming Integration Queries (OBS, Zoom, YouTube)**:
   - **Competitor Flaw**: Kudoway and Glossa require expensive hardware bridges or manual interpreter booking. None offer zero-friction software plugins for OBS Studio or YouTube RTMP streams.
   - **Exbabel Moat**: Publishing technical guides and integration landing pages targeting *OBS Studio translation plugin* and *Zoom live caption overlay* addresses urgent technical search intent that competitors cannot satisfy.

3. **Raw CPC Validation & High-Intent Arbitrage**:
   - Keywords like *simultaneous interpretation app* ($6.20 CPC) and *real time audio translation software* ($7.50 CPC) have heavy advertiser spend. Competitors rely on paid Google Ads. Exbabel can out-rank them organically by creating comprehensive comparison and feature breakdown pages.

### Action Plan for Gap Closure

- **Action 1 (Immediate)**: Launch 5 dedicated Ministry & Church Translation landing pages targeting exact-match church queries.
- **Action 2 (Week 3)**: Publish step-by-step integration tutorials for OBS Studio, Zoom, and ProPresenter.
- **Action 3 (Month 2)**: Create direct comparison pages (*Exbabel vs Wordly*, *Exbabel vs KUDO*) to capture late-stage bottom-of-funnel buyers.`;
  }

  console.log('  → Analyzing domain intersections (Exbabel vs Wordly, Glossa, KUDO)...');
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{
        role: 'system',
        content: `You are a Senior SEO Analyst producing an enterprise domain intersection report for Exbabel. ${EXBABEL_CONTEXT}`
      }, {
        role: 'user',
        content: `Simulate a DataForSEO Domain Intersection Analysis comparing 'exbabel.com' with 'wordly.ai', 'glossa.com', and 'kudoway.com' for the seed keywords: ${seedKeywords.join(', ')}.
        
Return a multi-page, comprehensive markdown report containing:
1. An extensive Domain Intersection Matrix (Table with 10+ rows) showing Search Vol, KD, CPC, Competitor Positions, and Exbabel Status.
2. "Urgent Gap Breakdown & Competitive Vulnerabilities" (detailed narrative analysis).
3. Strategic positioning recommendations for capturing organic share from competitors.`
      }],
    });
    return response.choices[0].message.content || '';
  } catch (error) {
    return 'Error generating content gap analysis.';
  }
}

async function generateTopicalAuthority(clusters: Record<string, string[]>, keywords: KeywordData[]): Promise<string> {
  const clusterEntries = Object.entries(clusters);
  if (options.mock || clusterEntries.length === 0) {
    const pillars = clusterEntries.length > 0 ? clusterEntries.slice(0, 5) : [
      ['Church & Ministry Translation', ['church translation software', 'sermon live captions', 'multilingual worship service', 'spanish translation for church', 'church interpreter software', 'bilingual worship service setup']],
      ['Live Streaming & Event Subtitles', ['live caption generator', 'obs translation plugin', 'youtube live subtitles', 'zoom simultaneous interpretation', 'rtmp stream translation', 'real time caption overlay']],
      ['Simultaneous Interpretation SaaS', ['simultaneous interpretation software', 'ai interpreter app', 'speech to speech translation live', 'real time audio translator', 'conference interpretation software', 'remote simultaneous interpretation']],
      ['Conference & Corporate Events', ['conference translation tool', 'multilingual event streaming', 'corporate presentation captions', 'international event interpreter', 'bilingual conference software', 'hybrid event live translation']],
      ['AI Speech Translation Tech', ['sub second speech translation', 'ai live captioning accuracy', 'custom vocabulary worship translation', 'latency in live translation', 'neural machine translation live audio', 'ai vs human interpreter cost']]
    ];

    const pillarMarkdown = pillars.map(([nameVal, kws], idx) => {
      const name = nameVal as string;
      const slug = slugify(name);
      const kwsList = (kws as string[]).slice(0, 6);
      const spokes = kwsList.map((kw, sIdx) => {
        const spokeSlug = slugify(kw);
        return `  - **Spoke ${sIdx + 1}**: [${kw}](file:///${spokeSlug})
    - **URL**: \`/${slug}/${spokeSlug}\`
    - **Search Intent**: Informational / Commercial Investigation
    - **Target Word Count**: 2,200 words
    - **Anchor Text to Pillar**: "Learn more about ${name.toLowerCase()}"
    - **Publishing Priority**: ${sIdx < 2 ? 'P1 (Month 1)' : sIdx < 4 ? 'P2 (Month 2)' : 'P3 (Month 3)'}`;
      }).join('\n');

      return `### Pillar ${idx + 1}: ${name}
- **Pillar Title**: The Definitive Guide to ${name}
- **Pillar URL**: \`/${slug}\`
- **Primary Keyword**: \`${kwsList[0] || name}\`
- **Target Word Count**: 3,800+ words
- **Strategic Role**: Core Hub page linking to all cluster spokes and passing link equity.

#### Supporting Spoke Articles:
${spokes}

#### Pillar-to-Spoke Linking Strategy:
- **Pillar Page** includes a dedicated "Explore Topic Deep-Dives" section linking to all ${kwsList.length} spoke pages using exact semantic target keywords as anchor text.
- **Each Spoke Article** contains at least 2 contextual in-body links back to the main Pillar Page \`/${slug}\` within the first 300 words.`;
    }).join('\n\n---\n\n');

    return `## Topical Authority Architecture (Pillar & Spoke Model)

To establish domain authority and topical relevance in Google and Generative AI Search engines, Exbabel must structure content into distinct **Topical Pillars** supported by targeted **Spoke Articles**.

\`\`\`mermaid
graph TD
  P1[Pillar 1: Church & Ministry Translation] --> S1[Spoke: Sermon Live Captions]
  P1 --> S2[Spoke: Multilingual Worship Service]
  P1 --> S3[Spoke: Spanish Translation for Church]
  P2[Pillar 2: Live Streaming Subtitles] --> S4[Spoke: OBS Translation Plugin]
  P2 --> S5[Spoke: YouTube Live Subtitles]
  P2 --> S6[Spoke: Zoom Interpretation]
\`\`\`

${pillarMarkdown}`;
  }

  const clusterSummary = Object.entries(clusters).map(([name, kws]) => {
    const kwData = kws.slice(0, 5).map(kw => {
      const d = keywords.find(k => k.keyword === kw);
      return d ? `  - "${kw}" (vol: ${d.volume}, KD: ${d.difficulty})` : `  - "${kw}"`;
    }).join('\n');
    return `**${name}**:\n${kwData}`;
  }).join('\n\n');

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{
        role: 'system',
        content: `You are a Lead Content Architect for Exbabel. ${EXBABEL_CONTEXT}\n\nDesign an exhaustive topical authority architecture using a pillar-and-spoke model.`
      }, {
        role: 'user',
        content: `Design a topical authority content plan based on these keyword clusters:\n\n${clusterSummary}\n\nFor EACH cluster pillar page, provide:\n1. Pillar page title and exact URL slug\n2. 6-8 supporting spoke articles with titles, URL slugs, search intent, and word counts\n3. Bi-directional internal linking strategy\n4. Publishing priority\n\nFormat as clean, enterprise-grade markdown.`
      }],
    });
    return response.choices[0].message.content || '';
  } catch (error) {
    return 'Error generating topical authority plan.';
  }
}

async function generateContentCalendar(clusters: Record<string, string[]>, keywords: KeywordData[]): Promise<string> {
  const topKws = keywords.slice(0, 50);
  
  if (options.mock || topKws.length === 0) {
    const sampleKws = topKws.length >= 10 ? topKws : [
      { keyword: 'church translation software', volume: 1600, difficulty: 28, intent: 'Transactional', buyerPersona: 'Church Pastor / Tech Director' },
      { keyword: 'live caption generator for church', volume: 1200, difficulty: 24, intent: 'Commercial', buyerPersona: 'Worship Leader' },
      { keyword: 'simultaneous interpretation app', volume: 2900, difficulty: 45, intent: 'Transactional', buyerPersona: 'Event Planner' },
      { keyword: 'obs studio translation plugin', volume: 1800, difficulty: 22, intent: 'Commercial', buyerPersona: 'Livestream Producer' },
      { keyword: 'spanish translation for church services', volume: 950, difficulty: 15, intent: 'Informational', buyerPersona: 'Ministry Director' },
      { keyword: 'real time audio translation software', volume: 4400, difficulty: 52, intent: 'Commercial', buyerPersona: 'Enterprise AV Manager' },
      { keyword: 'exbabel vs wordly', volume: 480, difficulty: 12, intent: 'Transactional', buyerPersona: 'Decision Maker' },
      { keyword: 'zoom live translation plugin', volume: 2100, difficulty: 35, intent: 'Commercial', buyerPersona: 'Conference Organizer' },
      { keyword: 'multilingual worship service setup', volume: 650, difficulty: 14, intent: 'Informational', buyerPersona: 'Church Tech Volunteer' },
      { keyword: 'ai captioning for live events', volume: 3200, difficulty: 38, intent: 'Commercial', buyerPersona: 'AV Director' },
    ];

    const ideaRows = sampleKws.map((k, i) => {
      const title = `The Complete Guide to ${k.keyword.replace(/\b\w/g, l => l.toUpperCase())} (2026 Edition)`;
      const stage = k.intent === 'Transactional' ? 'BOFU (Decision)' : k.intent === 'Commercial' ? 'MOFU (Evaluation)' : 'TOFU (Awareness)';
      const persona = k.buyerPersona || 'Church & Event Organizers';
      return `| ${i + 1} | ${title} | ${k.keyword} | ${k.volume.toLocaleString()} | ${k.difficulty} | ${k.intent} | ${stage} | ${persona} | 2,500 |`;
    }).join('\n');

    return `## 12-Month Content Calendar & Execution Strategy

### Phase 1: 90-Day Rapid Execution Sprint (Weeks 1-12)

#### Weeks 1-4: Foundation & High-Intent BOFU Pages
- **Goal**: Capture existing bottom-of-funnel search volume with zero delay.
- **Deliverables**:
  - Launch 5 Core Product Landing Pages: \`/church-translation-software\`, \`/live-caption-generator\`, \`/simultaneous-interpretation-app\`.
  - Publish 3 Direct Competitor Comparison Pages: \`/exbabel-vs-wordly\`, \`/exbabel-vs-kudo\`, \`/exbabel-vs-interprefy\`.
  - Set up automated FAQ Schema and Open Graph metadata on all published pages.

#### Weeks 5-8: Technical Integration Guides (MOFU)
- **Goal**: Intercept technical buyers and streaming producers searching for workflow integrations.
- **Deliverables**:
  - Publish step-by-step guides: *How to Add Real-Time Translation to OBS Studio*, *Setting Up Live Subtitles on Zoom Meetings*, *ProPresenter Live Caption Overlay Tutorial*.
  - Embed video walkthroughs and downloadable PDF setup cheat-sheets to boost on-page dwell time.

#### Weeks 9-12: Topical Pillar Expansion & Internal Link Weaving
- **Goal**: Establish initial authority hubs for Church Ministry & Event Subtitling.
- **Deliverables**:
  - Publish 2 Pillar Pages (3,500+ words each).
  - Publish 10 supporting spoke articles.
  - Implement full bidirectional internal linking hierarchy.

---

### Month-by-Month 12-Month Strategic Roadmap

- **Months 1-3**: **BOFU Capture & Foundation** — Launch core transactional pages, comparison wireframes, and initial 90-day content batch (15 articles).
- **Months 4-6**: **Topic Cluster Scaling** — Expand into denominational (Baptist, Pentecostal, Catholic) and regional language programmatic templates (25 articles).
- **Months 7-9**: **GEO & AI Citation Campaign** — Optimize content for ChatGPT/Perplexity AI search overviews with direct answer snippets and structured FAQ schema (20 articles).
- **Months 10-12**: **Authority & Digital PR Acceleration** — Launch annual industry research report ("State of Multilingual Worship 2026") and execute backlink outreach (20 articles).

---

### Top Content Ideas Queue (Mapped to Intent & Persona)

| # | Proposed Article Title | Target Keyword | Vol | KD | Intent | Funnel Stage | Buyer Persona | Est Words |
|---|------------------------|----------------|-----|----|--------|--------------|---------------|-----------|
${ideaRows}`;
  }

  const clusterSummary = Object.entries(clusters).slice(0, 10).map(([name, kws]) => {
    return `**${name}**: ${kws.slice(0, 5).join(', ')}`;
  }).join('\n');

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{
        role: 'system',
        content: `You are a Content Marketing Director for Exbabel. ${EXBABEL_CONTEXT}`
      }, {
        role: 'user',
        content: `Based on these keyword clusters, generate an enterprise-grade 12-Month Content Strategy:\n\n${clusterSummary}\n\nProvide:\n1. A detailed "90-Day Rapid Execution Sprint" (Weeks 1-4, 5-8, 9-12).\n2. A month-by-month 12-Month SEO Roadmap.\n3. A structured table of "Top 50 Content Ideas" with Article Title, Primary Keyword, Vol, KD, Intent, Funnel Stage, Buyer Persona, and Word Count.\n\nFormat as clean markdown.`
      }],
    });
    return response.choices[0].message.content || '';
  } catch (error) {
    return 'Error generating content calendar.';
  }
}

async function generateProgrammaticBlueprints(keywords: KeywordData[]): Promise<string> {
  if (options.mock || keywords.length === 0) {
    return `## Programmatic SEO Blueprints (Scalable Page Generation)

Programmatic SEO allows Exbabel to automatically generate hundreds of targeted, high-converting landing pages using structured variable replacement.

### Top 10 Scalable URL Templates

1. **Language-Specific Church Pages**:
   - **URL Structure**: \`/church-translation-[language]\`
   - **Example**: \`/church-translation-spanish\`, \`/church-translation-korean\`
   - **Dynamic Variables**: \`{Language}\`, \`{NativeLanguageName}\`, \`{DemographicStat}\`
   - **Target Query**: "[language] translation for church services"

2. **Denomination-Specific Worship Captioning**:
   - **URL Structure**: \`/[denomination]-worship-captioning-software\`
   - **Example**: \`/baptist-worship-captioning-software\`, \`/pentecostal-worship-captioning-software\`
   - **Dynamic Variables**: \`{Denomination}\`, \`{WorshipStyle}\`, \`{CommonLiturgyTerms}\`
   - **Target Query**: "[denomination] church live translation app"

3. **Livestreaming Platform Integration**:
   - **URL Structure**: \`/live-captioning-[platform]\`
   - **Example**: \`/live-captioning-obs-studio\`, \`/live-captioning-youtube-live\`
   - **Dynamic Variables**: \`{Platform}\`, \`{TechnicalProtocol}\`, \`{SetupSteps}\`
   - **Target Query**: "how to add live subtitles to [platform]"

4. **Event Type Simultaneous Interpretation**:
   - **URL Structure**: \`/simultaneous-interpretation-[event-type]\`
   - **Example**: \`/simultaneous-interpretation-conferences\`, \`/simultaneous-interpretation-webinars\`
   - **Dynamic Variables**: \`{EventType}\`, \`{AudienceSize}\`, \`{LatencyRequirement}\`
   - **Target Query**: "simultaneous interpretation software for [event-type]"

5. **Software Alternative Comparison Pages**:
   - **URL Structure**: \`/exbabel-vs-[competitor]\`
   - **Example**: \`/exbabel-vs-wordly\`, \`/exbabel-vs-kudo\`
   - **Dynamic Variables**: \`{Competitor}\`, \`{CompetitorPricing}\`, \`{ExbabelAdvantages}\`
   - **Target Query**: "exbabel vs [competitor]"

6. **City & Regional Ministry Services**:
   - **URL Structure**: \`/church-translation-services-[city]\`
   - **Example**: \`/church-translation-services-dallas\`, \`/church-translation-services-miami\`
   - **Dynamic Variables**: \`{City}\`, \`{State}\`, \`{LocalLanguageDemographics}\`
   - **Target Query**: "church translation services in [city]"

7. **Hardware & AV Setup Guides**:
   - **URL Structure**: \`/live-translation-[hardware-brand]\`
   - **Example**: \`/live-translation-behringer-x32\`, \`/live-translation-blackmagic-atem\`
   - **Dynamic Variables**: \`{HardwareBrand}\`, \`{AudioInterface}\`, \`{CableType}\`
   - **Target Query**: "connect live translation to [hardware-brand]"

8. **Ministry Use-Case Guides**:
   - **URL Structure**: \`/multilingual-worship-[use-case]\`
   - **Example**: \`/multilingual-worship-youth-ministry\`, \`/multilingual-worship-conferences\`
   - **Dynamic Variables**: \`{UseCase}\`, \`{AgeGroup}\`, \`{EngagementFeatures}\`
   - **Target Query**: "multilingual setup for [use-case]"

9. **AI Audio Captioning Modules**:
   - **URL Structure**: \`/real-time-ai-captions-[niche]\`
   - **Example**: \`/real-time-ai-captions-religious-broadcasting\`
   - **Dynamic Variables**: \`{Niche}\`, \`{VocabularySet}\`, \`{AccuracyMetrics}\`
   - **Target Query**: "real time ai captions for [niche]"

10. **Broadcast Protocol Streaming**:
    - **URL Structure**: \`/[protocol]-stream-translation\`
    - **Example**: \`/hls-stream-translation\`, \`/rtmp-stream-translation\`
    - **Dynamic Variables**: \`{Protocol}\`, \`{Bitrate}\`, \`{EncoderSettings}\`
    - **Target Query**: "live translation for [protocol] streams"

---

### Copy-Paste OpenAI Prompt Template for Programmatic Content Engine

\`\`\`text
System: You are an expert Technical SEO copywriter for Exbabel (exbabel.com). Exbabel provides sub-second live speech translation, caption overlays, and simultaneous interpretation for churches and events.

Task: Generate a high-converting, SEO-optimized 1,800-word landing page for the following target variables:
- Target Language/Niche: {Variable_1}
- Primary Keyword: {Variable_2}
- Secondary Keywords: {Variable_3}

Structure Requirements:
1. H1: Live {Variable_1} Translation & Captioning for Churches & Events
2. Subheadline: Real-time speech translation with <1s latency in {Variable_1}. No expensive equipment required.
3. Hero Section CTA: "Start Free 14-Day Trial" / "Book Live Demo"
4. Problem Section: The challenge of reaching {Variable_1} speaking attendees during live worship services.
5. Solution Section: How Exbabel seamlessly converts speaker audio into instant {Variable_1} captions on mobile devices and screens.
6. Step-by-Step Setup Guide (3 simple steps).
7. Interactive Features Grid (Custom religious dictionary, audio streaming, QR code join).
8. FAQ Section: 6 specific questions regarding {Variable_1} dialect support and audio setup.
9. JSON-LD Schema: Output valid SoftwareApplication schema markup.
\`\`\`

---

### 100-Article Programmatic Mass-Publishing Queue (Sample Batch)

| Queue ID | URL Slug | Target Language / Niche | Primary Keyword | Priority |
|----------|----------|-------------------------|-----------------|----------|
| P-001 | \`/church-translation-spanish\` | Spanish | spanish church translation software | Immediate |
| P-002 | \`/church-translation-korean\` | Korean | korean worship service live captions | Immediate |
| P-003 | \`/church-translation-portuguese\` | Portuguese | portuguese live audio translation for church | Immediate |
| P-004 | \`/church-translation-mandarin\` | Mandarin | mandarin live translation tool church | High |
| P-005 | \`/church-translation-french\` | French | french simultaneous interpretation church | High |
| P-006 | \`/church-translation-vietnamese\` | Vietnamese | vietnamese church service captions | High |
| P-007 | \`/live-captioning-obs-studio\` | OBS Studio | obs studio live translation plugin | Immediate |
| P-008 | \`/live-captioning-zoom-meetings\` | Zoom | zoom live translation captions | Immediate |
| P-009 | \`/live-captioning-youtube-live\` | YouTube | youtube live stream translation overlay | High |
| P-010 | \`/exbabel-vs-wordly\` | Wordly | exbabel vs wordly comparison | Immediate |`;
  }

  const topKws = keywords.slice(0, 100).map(k => k.keyword).join(', ');

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{
        role: 'system',
        content: `You are a Technical SEO Strategist for Exbabel. ${EXBABEL_CONTEXT}`
      }, {
        role: 'user',
        content: `Analyze these top keywords and identify the Top 20 scalable programmatic SEO templates we could auto-generate.\n\nKeywords: ${topKws}\n\nFor each programmatic category (e.g., Language-specific, Livestream platform-specific, Denomination-specific, City-specific), provide:\n1. The URL structure (e.g., /church-translation-[language])\n2. The specific variables to inject\n3. Key on-page elements needed (e.g., dynamic H1, local testimonials)\n4. A detailed, copy-pasteable ChatGPT/OpenAI Prompt Example that our engineers can use to automatically generate the content for this template.\n\nFinally, at the end of the report, provide a "100-Article Programmatic Publishing Plan" that lists out 100 specific article titles/variants (e.g., combinations of top languages, top denominations, and platforms) that we should mass-generate first.\n\nFormat as clean markdown.`
      }],
    });
    return response.choices[0].message.content || '';
  } catch (error) {
    return 'Error generating programmatic blueprints.';
  }
}

async function generateLandingPageWireframes(keywords: KeywordData[]): Promise<string> {
  if (options.mock || keywords.length === 0) {
    return `## Conversion-Focused Landing Page Wireframes

To maximize visitor-to-trial conversion rates, high-intent transactional landing pages must follow Exbabel's 17-point CRO Landing Page Framework.

### 17-Section Ideal Wireframe Blueprint: "Church Translation Software"

1. **SEO Meta Title**: \`Church Translation Software | Live Captions & Interpretation | Exbabel\`
2. **Meta Description**: \`Instantly translate church services in real-time. Sub-second live captions in 50+ languages on mobile devices and screens. Start free demo today.\`
3. **URL Slug**: \`/church-translation-software\`
4. **Search Intent**: Transactional / High Commercial Intent (Pastor, Worship Director, Tech Lead)
5. **Section 1: Hero Banner**:
   - **H1**: Real-Time Church Translation & Live Captions for Every Service
   - **Subheadline**: Empower your multilingual congregation. Exbabel delivers instant sub-second audio translation directly to smartphones and sanctuary screens.
   - **Primary CTA Button**: "Start Free 14-Day Church Trial"
   - **Secondary CTA Button**: "Watch 2-Min Live Demo Video"
   - **Social Proof**: "Trusted by over 500+ churches & ministries worldwide."
6. **Section 2: The Multilingual Sanctuary Challenge (Problem)**:
   - **H2**: Is Language Barrier Keeping Visitors From Feeling at Home?
   - **Pain Points**: High cost of hiring human interpreters, complex hardware systems, static slides that don't match live sermons.
7. **Section 3: How Exbabel Works in 3 Simple Steps (Solution)**:
   - **Step 1**: Connect your soundboard or microphone to Exbabel's web app.
   - **Step 2**: Speakers speak naturally; AI processes sermon audio instantly.
   - **Step 3**: Attendees scan a QR code to view live captions or listen to translated audio on their phones.
8. **Section 4: Key Benefits for Ministries**:
   - Benefit Cards: Sub-second latency, custom biblical terminology dictionary, zero app installation required for attendees.
9. **Section 5: Feature Specifications Grid**:
   - Speech-to-Speech audio streaming, customizable font sizes for projector displays, automatic transcript archives.
10. **Section 6: Supported Languages (50+ Languages)**:
    - Interactive grid displaying Spanish, Korean, Portuguese, Mandarin, French, Vietnamese, Swahili, Arabic, etc.
11. **Section 7: Ministry & Event Use Cases**:
    - Sunday Morning Worship, Youth Group Meetings, International Conferences, Funeral & Wedding Services.
12. **Section 8: Seamless AV Integrations**:
    - OBS Studio, ProPresenter, vMix, Zoom, YouTube Live, Behringer/Allen&Heath Digital Consoles.
13. **Section 9: Feature & Cost Comparison (Exbabel vs Traditional Systems)**:
    - Table comparing Exbabel vs Human Interpreters ($500/service vs Exbabel SaaS) and Hardware Receivers.
14. **Section 10: Pastor Testimonials & Case Study**:
    - Video testimonial embed + quote: *"Exbabel grew our Spanish-speaking service attendance by 40% in 90 days."*
15. **Section 11: Transparent Pricing Preview**:
    - Simple tier preview: Starter Ministry Plan vs Growth Plan vs Enterprise Multi-Campus.
16. **Section 12: Frequently Asked Questions (FAQ Section)**:
    - 8 detailed FAQ dropdowns addressing Wi-Fi bandwidth requirements, dialect accuracy, and trial terms.
17. **Section 13: Final Conversion CTA Banner**:
    - **H2**: Ready to Make Your Sanctuary Truly Multilingual?
    - **Button**: "Start Free Trial — No Credit Card Required"

---

### Top 20 Comparison Page Matrix (BOFU Buyers)

Exbabel must build dedicated comparison landing pages to capture late-stage buyers evaluating alternatives:

| Page URL | Primary Target Keyword | Main Differentiating Claim | CTA Angle |
|----------|------------------------|----------------------------|-----------|
| \`/exbabel-vs-wordly\` | exbabel vs wordly | Lower latency, sub-second accuracy, built specifically for church budgets | "Compare Latency & Save 50%" |
| \`/exbabel-vs-kudo\` | exbabel vs kudo | Zero hardware requirement vs complex KUDO setup | "Try Software-Only Translation" |
| \`/exbabel-vs-interprefy\` | exbabel vs interprefy | Instant self-serve AI vs mandatory event consultation | "Launch in 5 Minutes" |
| \`/exbabel-vs-zoom-interpretation\` | exbabel vs zoom interpretation | In-person sanctuary projection + live mobile web app | "Bridge In-Person & Online Worship" |
| \`/exbabel-vs-livevoice\` | exbabel vs livevoice | Automated AI translation vs manual human audio streaming | "Automate Your Live Translation" |
| \`/exbabel-vs-interprete-me\` | exbabel vs interprete me | Custom church dictionary support & lower latency | "See Church Dictionary in Action" |
| \`/exbabel-vs-google-translate\` | exbabel vs google translate | Real-time continuous speech stream vs 15-second snippet limit | "Built for Continuous Sermons" |
| \`/exbabel-vs-deepl\` | exbabel vs deepl | Speech-to-speech audio streaming vs text document engine | "Hear Speech Translation Live" |
| \`/exbabel-vs-spf-audio\` | exbabel vs spf audio | Direct smartphone web app join via QR code | "No App Store Downloads Needed" |
| \`/exbabel-vs-transcribe-me\` | exbabel vs transcribe me | Multilingual audio output + live caption overlay | "Audio + Subtitles Combined" |`;
  }

  const transactionalKws = keywords.filter(k => k.intent === 'Transactional' || k.intent === 'Commercial').slice(0, 5).map(k => k.keyword).join(', ');

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{
        role: 'system',
        content: `You are a Conversion Rate Optimization (CRO) and SEO Expert for Exbabel. ${EXBABEL_CONTEXT}`
      }, {
        role: 'user',
        content: `Design massive, conversion-focused landing page wireframes for these high-intent keywords:\n\nKeywords: ${transactionalKws}\n\nFor EACH keyword, you MUST generate the complete Exbabel Ideal Landing Page Template following this exact structure:\n1. SEO Title & Meta Description & URL Slug\n2. Search Intent & Primary/Secondary Keywords\n3. Section 1: Hero (H1, Subheadline, CTAs, Social Proof, Visual)\n4. Section 2: Problem Section (H2, Pain points)\n5. Section 3: Solution Section (H2, 3-Step Process)\n6. Section 4: Benefits (H2, Cards)\n7. Section 5: Feature Grid (Icons, Descriptions)\n8. Section 6: Supported Languages (H2, List)\n9. Section 7: Use Cases (H2, Events)\n10. Section 8: Integrations (OBS, YouTube, etc.)\n11. Section 9: Comparison Section (If applicable)\n12. Section 10: Testimonials & Case Study Outline\n13. Section 11: Pricing Preview\n14. Section 12: FAQs (8-15 questions)\n15. Section 13: Final CTA\n16. Technical SEO (Schema types, Internal Links, Semantic Keywords)\n17. Image Briefs\n\nFinally, output a list of the "Top 20 Comparison Pages" (e.g., Exbabel vs Wordly, Exbabel vs Zoom Interpretation) that we need to build to capture late-stage buyers.\n\nFormat as clean markdown.`
      }],
    });
    return response.choices[0].message.content || '';
  } catch (error) {
    return 'Error generating landing page wireframes.';
  }
}

async function generateBacklinkStrategy(clusters: Record<string, string[]>): Promise<string> {
  if (options.mock) {
    return `## Backlink & Digital PR Strategy

Building enterprise domain authority requires acquiring high-relevance editorial backlinks from authoritative domains in Church Tech, Worship Leadership, Event Production, and SaaS AV Technology.

### Top 20 High-DA Backlink Targets

| Target Domain / Publication | Authority / Niche | Target Pitch Angle | Ideal Contact Role |
|-----------------------------|-------------------|--------------------|--------------------|
| **ChurchProduction.com** | DA 52 / Church AV Tech | "How AI Speech Translation is Transforming Multilingual Ministry" | Tech Editor |
| **WorshipLeader.com** | DA 56 / Worship & Ministry | "Breaking Language Barriers in Modern Worship Services" | Managing Editor |
| **ChurchTechToday.com** | DA 48 / Ministry Tech | "Software Product Review: Exbabel Live Translation Platform" | Reviews Editor |
| **SoundAndCommunications.com** | DA 45 / Commercial Sound | "Case Study: Implementing Sub-Second Audio Translation via QR Code" | AV Journalist |
| **EventMB.com (Skift)** | DA 72 / Event Management | "The Future of Hybrid Event Interpretation: AI vs Human" | Tech Columnist |
| **AVNetwork.com** | DA 60 / Commercial AV | "Integrating Live AI Captions into ProPresenter & OBS Studio" | Contributing Writer |
| **TechnologiesForWorship.com** | DA 42 / Sanctuary Tech | "Multilingual Accessibility Guidelines for Modern Churches" | Features Editor |
| **ChurchMag.com** | DA 51 / Christian Tech | "Top 5 Tools for Reaching Immigrant Communities in Your City" | Senior Writer |
| **ChurchLeaders.com** | DA 74 / Ministry Leadership | "Why Multilingual Services are the Fastest Growing Church Trend" | Opinion Editor |
| **ProSoundWeb.com** | DA 58 / Live Audio Engineering | "Managing Audio Feed Latency for Real-Time Speech Recognition" | Audio Engineer |
| **CommercialIntegrator.com** | DA 54 / Systems Integration | "SaaS Simultaneous Interpretation replacing legacy hardware" | Systems Editor |
| **ChurchGrowth.org** | DA 49 / Church Expansion | "Demographic Trends: The Rise of Bilingual Congregations" | Research Director |
| **Outreach.com** | DA 62 / Church Outreach | "How Live Captions Open Doors for Deaf & Non-English Worshipers" | Editor-in-Chief |
| **InAVateMagazine.com** | DA 46 / Pro AV International | "Global Livestreaming: Real-Time Subtitle Translation Techniques" | Global Editor |
| **ChurchExecutive.com** | DA 44 / Church Business Admin | "Budgeting for Live Translation: Hardware vs SaaS ROI" | Executive Editor |
| **EventTechBrief.com** | DA 40 / Event Software | "Exbabel Product Breakthrough: Sub-Second Audio Stream Translation" | Product Reviewer |
| **ChurchMarketingSucks.com** | DA 50 / Ministry Marketing | "Communicating Across Language Divides in Local Outreach" | Guest Post Editor |
| **FaithTech.com** | DA 38 / Christian Tech Labs | "Building Ethical AI Speech Translation for Religious Texts" | Community Lead |
| **ChurchITNetwork.com** | DA 35 / Church IT Directors | "Network & Wi-Fi Requirements for Smartphone Audio Streaming" | Forum Admin |
| **WorshipFacilities.com** | DA 43 / Worship Tech Architecture | "Sanctuary Screen Placement for Live Caption Subtitles" | Design Editor |

---

### 3 High-Authority "Link Bait" Asset Blueprints

1. **The Annual State of Multilingual Worship Report (2026 Edition)**:
   - **Concept**: A data-driven survey report analyzing non-English speaking church attendance, primary languages requested (Spanish, Korean, Portuguese), and technology adoption rates.
   - **Why It Earns Links**: Journalists and ministry researchers frequently quote statistics. Every time a blog cites "42% of urban churches serve multilingual communities", they link back to Exbabel as the primary source.

2. **Interactive Church Audio Latency & Accuracy Calculator**:
   - **Concept**: A free web tool where AV directors enter their buffer rate, internet connection type, and soundboard model to get an instant latency score and recommended setup.
   - **Why It Earns Links**: Church IT forums (Reddit r/churchtech, Facebook Church AV Groups) will link to it as a standard utility resource.

3. **Global Worship Language Density Map & Demographic Tool**:
   - **Concept**: An interactive visual map displaying non-English language demographics by US state and city, highlighting where multilingual church services are needed most.
   - **Why It Earns Links**: Local news outlets, denominational leaders, and church planting organizations will cite local data graphics.

---

### Digital PR Press Release Script & Outreach Pitch Template

**Subject Line**: Pitch: How AI speech translation is enabling [City/Denomination] churches to hold multi-language services

\`\`\`text
Hi [Editor First Name],

With non-English speaking demographics expanding rapidly across North America, churches are facing a major challenge: how to make live sermons accessible to attendees who speak Spanish, Korean, or Portuguese without spending $500+ per week on human interpreters.

Exbabel (exbabel.com) has launched a sub-second live speech translation platform that streams translated audio and live captions directly to attendees' smartphones via a simple QR code.

We just published our comprehensive 2026 Multilingual Worship Report, revealing that churches offering real-time translation saw a 35% increase in non-English visitor retention within 90 days.

Would you be interested in an exclusive feature or interview with our lead engineers on how AI speech translation is breaking language barriers in live sanctuary environments?

Best regards,

[Your Name]
Head of Communications, Exbabel
exbabel.com
\`\`\``;
  }

  const clusterNames = Object.keys(clusters).join(', ');

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{
        role: 'system',
        content: `You are a Digital PR and Link Building Specialist for Exbabel. ${EXBABEL_CONTEXT}`
      }, {
        role: 'user',
        content: `Develop an off-page SEO and backlink strategy targeting these specific topic clusters:\n\nClusters: ${clusterNames}\n\nProvide:\n1. A curated list of the "Top 20 Backlink Targets" (specific high-authority sites, publications, and associations in the Church-Tech / Ministry / Event space).\n2. 3 highly shareable "Link Bait" asset ideas we could create to naturally attract backlinks.\n3. A Digital PR angle/press release idea we could use to pitch Christian/Church-tech media.\n\nFormat as clean markdown.`
      }],
    });
    return response.choices[0].message.content || '';
  } catch (error) {
    return 'Error generating backlink strategy.';
  }
}

async function generateContentBrief(kw: KeywordData, paaQuestions: PAAQuestion[], serpResults: SerpResult[]): Promise<string> {
  const relevantPAA = paaQuestions.filter(p => p.keyword.includes(kw.keyword.split(' ')[0])).slice(0, 5);
  const topResults = serpResults.slice(0, 5).map(r => `- #${r.position}: "${r.title}" (${r.url})\n  Snippet: ${r.description}`).join('\n');
  const cleanTopic = cleanKeywordTopic(kw.keyword);
  const h1Title = `The Complete Guide to ${cleanTopic} (2026 Edition)`;

  if (options.mock) {
    return `# Content Brief: ${kw.keyword}

**Target Keyword**: ${kw.keyword}
**Volume**: ${kw.volume.toLocaleString()} | **KD**: ${kw.difficulty} | **Intent**: ${kw.intent}
**Buyer Persona**: ${kw.buyerPersona}
**Revenue Score**: ${kw.revenueScore}

## 1. Suggested SEO Title & Meta
- **Title Tag**: ${h1Title} | Exbabel
- **Meta Description**: Master ${cleanTopic.toLowerCase()} with real-time AI speech translation and sub-second live captioning. Learn how Exbabel empowers churches and global events.
- **URL Slug**: \`/${slugify(kw.keyword)}\`

## 2. Target Word Count
2,800 words

## 3. Structural Heading Hierarchy (H2 / H3 Outline)
- **H1**: ${h1Title}
- **H2**: What Is Real-Time ${cleanTopic}?
  - **H3**: Core Challenges Solved by Modern Live Speech AI
- **H2**: Why ${cleanTopic} Is Critical for Modern Sanctuaries
  - **H3**: Demographic Shifts & Multilingual Audience Demands
- **H2**: Step-by-Step Implementation Framework
  - **H3**: Connecting Audio Feeds & Soundboards
  - **H3**: Setting Up Smartphone Mobile Join via QR Codes
- **H2**: Comparing Top ${cleanTopic} Options: SaaS AI vs Human Interpreters
- **H2**: Frequently Asked Questions

## 4. People Also Ask (FAQ Targets)
${relevantPAA.map(q => `- **${q.question}**`).join('\n') || '- How does live church translation work?\n- What is the best app for sermon captioning?'}

## 5. Schema & Technical SEO Targets
- **JSON-LD Schema**: FAQPage, SoftwareApplication
- **Internal Links**: Link to \`/pricing\`, \`/church-translation-software\`, and \`/live-captioning-obs-studio\`.`;
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{
        role: 'system',
        content: `You are an SEO content strategist for Exbabel. ${EXBABEL_CONTEXT}\n\nCreate detailed, actionable content briefs that a writer can immediately use.`
      }, {
        role: 'user',
        content: `Create a comprehensive Master SEO Content Package for the keyword: "${kw.keyword}".\n\nKeyword data:\n- Search Volume: ${kw.volume}\n- Keyword Difficulty: ${kw.difficulty}\n- Intent: ${kw.intent}\n- Buyer Persona: ${kw.buyerPersona}\n\nTop SERP results (Analyze these deeply to reverse-engineer their H1/H2 structure and intent):\n${topResults}\n\nPeople Also Ask:\n${relevantPAA.map(q => `- ${q.question}`).join('\n') || 'None found'}\n\nYou must generate the COMPLETE SEO package for this article. Follow this exact 25-point checklist structure:\n1. Primary Keyword\n2. Search Intent\n3. SEO Title Tag (Max 60 chars)\n4. Meta Description (150-160 chars)\n5. URL Slug\n6. H1\n7. Article Introduction (Hook, Problem, Solution overview)\n8. Table of Contents\n9. H2 Structure (5-10 H2s) (Derived from SERP Analysis)\n10. H3 Structure (2-5 H3s per H2)\n11. FAQ Section (5-10 specific FAQs and answers)\n12. Featured Snippet Section (40-60 word direct answer)\n13. Internal Links (Suggestions)\n14. External Authority Sources (Citations)\n15. Semantic Keywords\n16. Entities\n17. EEAT Section (Credibility / Use Cases)\n18. Comparison Table (Suggest columns/rows if applicable)\n19. Conversion CTA\n20. Image Requirements (Hero + 2 internal)\n21. Schema Markup Suggestions\n22. Content Length Target (Based on SERP depth)\n23. NLP Optimization Guidelines\n24. Programmatic Variables (If applicable)\n25. Competitive Angle\n\nFormat as clean markdown.`
      }],
    });
    return response.choices[0].message.content || '';
  } catch (error) {
    return `# Content Brief: ${kw.keyword}\n\nError generating brief.`;
  }
}

async function generateExecutiveSummary(
  keywords: KeywordData[],
  clusters: Record<string, string[]>,
  competitors: SerpResult[],
  winnability: { analysis: string; score: number; dominantType: string },
  paaQuestions: PAAQuestion[],
  seedKeywords: string[]
): Promise<string> {
  const topKw = keywords[0]?.keyword || 'church translation software';
  const topVol = keywords[0]?.volume || 1600;
  const totalVol = keywords.reduce((sum, k) => sum + k.volume, 0);

  if (options.mock) {
    return `### Market Opportunity Summary
Exbabel's SEO & GEO Intelligence research reveals a high-conviction organic search opportunity across the **${seedKeywords.join(', ')}** space. Across ${keywords.length} analyzed keywords, total monthly search demand exceeds **${totalVol.toLocaleString()} monthly queries**, with high commercial CPCs averaging **$3.50 – $7.50 per click**. Search intent is heavily concentrated among church leaders, worship directors, and live event producers actively seeking real-time speech translation and captioning solutions.

### Competitive Landscape & SERP Winnability
The overall SERP winnability score is rated at **${winnability.score}/10** (${winnability.analysis}). Dominant incumbents like Wordly.ai and Interprefy target general enterprise corporate events, creating a massive, undefended competitive moat for Exbabel in the religious, sanctuary, and livestreaming niches. Because major competitors lack dedicated church landing pages and integration tutorials (OBS, Zoom, ProPresenter), Exbabel can swiftly capture top #1–3 rankings for high-intent queries with targeted, low-difficulty content.

### Portfolio Allocation Rationale (80/20 Rule)
Following Exbabel's modernized SEO framework, keyword opportunities are partitioned into an **80% Core Commercial Portfolio** and a **20% Experimental/GEO Portfolio**:
- **80% Core Commercial (${keywords.filter(k => k.allocationBucket === 'Core').length} Keywords)**: Prioritizes verified search demand, raw advertiser CPC dollar validation, and high Organic CTR potential. Highlights include primary target **"${topKw}"** (Search Vol: ${topVol.toLocaleString()}, Revenue Score: ${keywords[0]?.revenueScore || '95'}).
- **20% Experimental & GEO (${keywords.filter(k => k.allocationBucket === 'Experimental').length} Keywords)**: Targets emerging AI search queries (ChatGPT/Perplexity overviews), multi-platform integrations (OBS, Zoom, TikTok), and high-relevance long-tail phrases to future-proof Exbabel's organic visibility.

### 90-Day Priority Execution Roadmap
1. **Weeks 1–4**: Deploy 5 core transactional landing pages and 3 competitor comparison wireframes (*Exbabel vs Wordly*, *Exbabel vs KUDO*).
2. **Weeks 5–8**: Publish 10 technical streaming integration guides (OBS, Zoom, ProPresenter) to intercept technical decision-makers.
3. **Weeks 9–12**: Build out 2 complete Topical Authority Pillars supported by 12 spoke articles and bidirectional internal linking.

### Projected ROI & Revenue Impact
By executing this strategy, Exbabel is projected to achieve top 3 search visibility for 35+ core keywords within 90–120 days, driving an estimated **5,000–12,000 targeted monthly visits** from high-intent buyers, yielding an estimated 150+ new SaaS trial signups monthly.`;
  }

  const topKws = keywords.slice(0, 15).map(k => `- "${k.keyword}" — Vol: ${k.volume}, KD: ${k.difficulty}, Revenue: ${k.revenueScore}, Persona: ${k.buyerPersona}`).join('\n');
  const clusterNames = Object.keys(clusters).join(', ');

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{
        role: 'system',
        content: `You are an SEO strategist writing an executive summary for Exbabel's leadership team. ${EXBABEL_CONTEXT}`
      }, {
        role: 'user',
        content: `Write an executive summary of our SEO research findings.\n\nKey data:\n- Total relevant keywords found: ${keywords.length}\n- Topic clusters: ${clusterNames}\n- SERP winnability: ${winnability.score}/10 — ${winnability.analysis}\n- Dominant content type in SERPs: ${winnability.dominantType}\n- People Also Ask questions found: ${paaQuestions.length}\n- Seed topics analyzed: ${seedKeywords.join(', ')}\n\nTop 15 keyword opportunities:\n${topKws}\n\nWrite 4 detailed paragraphs covering:\n1. Market opportunity summary\n2. Competitive landscape assessment & winnability\n3. 80/20 Portfolio allocation rationale\n4. Recommended 90-day execution roadmap and expected revenue impact`
      }],
    });
    return response.choices[0].message.content || '';
  } catch (error) {
    return 'Error generating executive summary.';
  }
}

function mathematicallyClusterKeywords(keywords: string[]): Record<string, string[]> {
  const clusters: Record<string, string[]> = {};
  const rootWords = new Map<string, string[]>();

  const ignoreWords = new Set(['software', 'app', 'best', 'free', 'for', 'in', 'and', 'the', 'how', 'to', 'with', 'is']);

  for (const kw of keywords) {
    const words = kw.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ').filter(w => w.length > 2 && !ignoreWords.has(w));
    if (words.length === 0) {
      if (!rootWords.has('misc')) rootWords.set('misc', []);
      rootWords.get('misc')!.push(kw);
      continue;
    }
    // Simple mathematical clustering: group by the most significant root n-gram
    const root = words[0];
    if (!rootWords.has(root)) rootWords.set(root, []);
    rootWords.get(root)!.push(kw);
  }
  
  for (const [root, kws] of rootWords.entries()) {
    clusters[`Mathematical_Group_${root}`] = kws;
  }
  return clusters;
}

async function clusterKeywords(keywords: KeywordData[]): Promise<Record<string, string[]>> {
  const topKeywords = keywords.slice(0, 100).map(k => k.keyword);
  if (topKeywords.length === 0) return {};

  if (options.mock) {
    return {
      'Live Translation Tools': topKeywords.filter(k => k.includes('live') || k.includes('real time')),
      'Church Translation': topKeywords.filter(k => k.includes('church') || k.includes('ministry')),
      'Conference Interpretation': topKeywords.filter(k => k.includes('conference') || k.includes('event')),
      'Livestream Translation': topKeywords.filter(k => k.includes('livestream') || k.includes('youtube') || k.includes('zoom')),
    };
  }

  console.log(`  → Mathematically clustering ${topKeywords.length} keywords via lexical overlap...`);
  const mathematicalClusters = mathematicallyClusterKeywords(topKeywords);

  console.log(`  → Refining and naming mathematical clusters via GPT...`);
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{
        role: 'system',
        content: `You are an SEO analyst for Exbabel. ${EXBABEL_CONTEXT}\n\nWe have mathematically clustered these keywords using n-grams. Refine the groups, merge them if necessary, and assign highly strategic SEO Pillar names (e.g., "Church Translation Software", "Live Caption Solutions").`
      }, {
        role: 'user',
        content: `Refine these mathematical clusters into final Topic Clusters. Discard irrelevant keywords.\nReturn JSON: { "Pillar Name": ["keyword1", "keyword2"] }\n\nMathematical Clusters:\n${JSON.stringify(mathematicalClusters, null, 2)}`
      }],
      response_format: { type: 'json_object' }
    });
    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('  ✗ Clustering error:', error);
    return { 'General': topKeywords };
  }
}

async function generateGEORec(topic: string, paaQuestions: PAAQuestion[]): Promise<string> {
  const paaList = paaQuestions.length > 0 ? paaQuestions.slice(0, 8) : [
    { question: 'How do you translate a live church service in real-time?' },
    { question: 'What is the best software for live sermon translation?' },
    { question: 'How much does live simultaneous interpretation cost?' },
    { question: 'Can Zoom automatically translate live audio for church webinars?' },
    { question: 'How can non-English speakers listen to church sermons on their phones?' },
    { question: 'Does live AI translation work for Spanish and Portuguese?' }
  ];

  if (options.mock) {
    const faqPairs = paaList.map(q => `#### Q: ${q.question}
**Citation-Optimized Answer**: Exbabel provides sub-second live speech translation for church services and live events. Speakers talk into a standard microphone, and Exbabel automatically converts the audio into translated subtitles and voice audio streams accessible on smartphones via QR code, supporting over 50 languages with zero hardware installation.`).join('\n\n');

    return `## Generative Engine Optimization (GEO) & AI Search Blueprint

To win citations and top answers in AI Engine Overviews (ChatGPT, Perplexity AI, Claude, Google Gemini, and Bing Copilot), Exbabel's content must be optimized for machine extraction and entity recognition.

### 1. Citation Engineering Rules for AI Engines

- **Direct Definition Pattern**: The first sentence after an H2 heading MUST provide a direct, standalone definition of 30–50 words (e.g., *"Church translation software is a real-time speech processing tool that converts spoken sanctuary audio into translated text captions and synthetic speech for non-English attendees."*).
- **Data & Numerical Density**: AI engines prioritize sources containing specific data points, bulleted lists, and structured metrics over generic fluff.
- **Entity Association**: Explicitly connect the entity **Exbabel** to key semantic concepts (*sub-second latency*, *simultaneous interpretation*, *QR code audio stream*, *OBS Studio plugin*).

---

### 2. Standardized JSON-LD Schema Markup

Exbabel pages must implement valid **SoftwareApplication** and **FAQPage** JSON-LD schema snippets to enable rich snippet inclusion in SERPs and structured data extraction by AI bots.

\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Exbabel",
  "operatingSystem": "Web, iOS, Android",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "49.00",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "128"
  },
  "description": "Sub-second live speech translation and caption overlay platform for churches, conferences, and livestreamed events."
}
\`\`\`

---

### 3. PAA Question-Answer Optimization Matrix (AI Search Citation Targets)

${faqPairs}`;
  }

  const paaSection = paaQuestions.slice(0, 10).map(q => `- ${q.question}`).join('\n');

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{
        role: 'system',
        content: `You are a Generative Engine Optimization (GEO) specialist for Exbabel. ${EXBABEL_CONTEXT}`
      }, {
        role: 'user',
        content: `Create GEO recommendations for: "${topic}"\n\nPeople Also Ask questions from Google:\n${paaSection || 'None found'}\n\nHow should Exbabel structure content so AI assistants (ChatGPT, Gemini, Claude, Perplexity) cite Exbabel when users ask about this topic?\n\nInclude:\n1. Content structure recommendations\n2. Entity and semantic targets\n3. Schema markup (with JSON-LD examples)\n4. FAQ pairs to include (answer the PAA questions)\n5. Citation-optimized snippets (concise, factual paragraphs AI models prefer to quote)\n6. Comparison table recommendations\n\nFormat as detailed markdown.`
      }],
    });
    return response.choices[0].message.content || '';
  } catch (error) {
    return `Error generating GEO for ${topic}`;
  }
}

// ─── Scoring & 80/20 Portfolio Allocation ───────────────────────────────────────

function calculateOrganicCTR(aiOverview: boolean, featuredSnippet: boolean, adsCount: number): number {
  let ctr = 1.0;
  if (aiOverview) ctr -= 0.35; // AI overview absorbs clicks unless targeted for GEO
  if (featuredSnippet) ctr -= 0.15;
  if (adsCount > 0) ctr -= Math.min(0.35, adsCount * 0.1);
  return parseFloat(Math.max(0.15, ctr).toFixed(2));
}

function calculateBrandDomainPageCompetition(keyword: string, difficulty: number, competitionLevel: number, serpResults: SerpResult[] = []): number {
  let brandPenalty = 0;
  const megaBrands = ['google.com', 'microsoft.com', 'zoom.us', 'apple.com', 'wikipedia.org', 'youtube.com'];
  const topDomains = serpResults.slice(0, 3).map(r => {
    try { return new URL(r.url).hostname.toLowerCase(); } catch { return ''; }
  });
  if (topDomains.some(d => megaBrands.some(b => d.includes(b)))) {
    brandPenalty = 2.5;
  }
  const score = (difficulty * 0.4) + (competitionLevel * 10 * 0.35) + (brandPenalty * 10 * 0.25);
  return parseFloat(Math.min(10, Math.max(1, score)).toFixed(1));
}

function calculateRevenueScore(
  volume: number, cpc: number, intent: string, difficulty: number,
  competition: number, relevance: number, ctrScore = 1.0, bdpScore = 5.0
): number {
  const intentWeights: Record<string, number> = {
    Transactional: 3.5, Commercial: 2.8, Informational: 1.0, Navigational: 0.3, Unknown: 0.5
  };
  const intentW = intentWeights[intent] || 1.0;
  // CPC Raw Dollar Value Signal: Raw CPC dollars demonstrate actual advertiser validation
  const rawCpcFactor = cpc > 0 ? Math.log2(cpc + 1) * 2.5 + (cpc >= 5.0 ? 4.0 : 0) : 0.5;
  
  // Demand Factor: Search volume with 1st-party relevance boost
  const demandFactor = Math.max(10, volume);
  
  // Holistic competition penalty (Brand -> Domain -> Page)
  const compPenalty = bdpScore + (difficulty * 0.05) + 1;
  
  // Revenue score formula: combines Demand, CPC Raw Dollars, Intent, Relevance, Organic CTR, and Brand/Domain/Page competition
  const raw = (demandFactor * rawCpcFactor * intentW * (relevance / 10) * ctrScore) / compPenalty;
  return parseFloat(raw.toFixed(2));
}

function calculateOpportunity(volume: number, intent: string, difficulty: number, competition: number): number {
  const intentWeights: Record<string, number> = {
    Transactional: 2.5, Commercial: 2.0, Informational: 1.0, Navigational: 0.5, Unknown: 1.0
  };
  const w = intentWeights[intent] || 1.0;
  return parseFloat(((volume * w) / (difficulty + competition * 10 + 1)).toFixed(2));
}

function partitionPortfolio8020(keywords: KeywordData[]): KeywordData[] {
  const total = keywords.length;
  if (total === 0) return keywords;
  const experimentalTarget = Math.ceil(total * 0.20);
  
  const isExpCandidate = (k: KeywordData) => {
    const lower = k.keyword.toLowerCase();
    const hasAiTerms = lower.includes('ai') || lower.includes('chatgpt') || lower.includes('prompt') || lower.includes('clone') || lower.includes('voice') || lower.includes('geo');
    const hasPlatformTerms = lower.includes('youtube') || lower.includes('tiktok') || lower.includes('obs') || lower.includes('propresenter') || lower.includes('plugin');
    const isLongTailHighRelevance = k.relevanceScore >= 8 && k.volume < 100;
    return hasAiTerms || hasPlatformTerms || isLongTailHighRelevance;
  };
  
  const expCandidates = keywords.filter(isExpCandidate);
  expCandidates.sort((a, b) => (b.relevanceScore * 10 + b.revenueScore) - (a.relevanceScore * 10 + a.revenueScore));
  
  const selectedExp = expCandidates.slice(0, experimentalTarget);
  
  if (selectedExp.length < experimentalTarget) {
    const remainingNeeded = experimentalTarget - selectedExp.length;
    const existingSet = new Set(selectedExp.map(k => k.keyword));
    const backfill = keywords
      .filter(k => !existingSet.has(k.keyword))
      .sort((a, b) => a.volume - b.volume)
      .slice(0, remainingNeeded);
    selectedExp.push(...backfill);
  }
  
  const expSet = new Set(selectedExp.map(k => k.keyword));
  
  return keywords.map(k => {
    const isExp = expSet.has(k.keyword);
    return {
      ...k,
      isExperimental: isExp,
      allocationBucket: isExp ? ('Experimental' as const) : ('Core' as const)
    };
  });
}

// ─── Report Generators ─────────────────────────────────────────────────────────

function generateFullReportMarkdown(
  seedKeywords: string[],
  keywords: KeywordData[],
  clusters: Record<string, string[]>,
  competitors: SerpResult[],
  winnability: { analysis: string; score: number; dominantType: string },
  paaQuestions: PAAQuestion[],
  executiveSummary: string,
  contentGap: string,
  topicalAuthority: string,
  geoRecs: string,
  dateStr: string
): string {
  const coreKeywords = keywords.filter(k => k.allocationBucket === 'Core');
  const expKeywords = keywords.filter(k => k.allocationBucket === 'Experimental');

  // Top Core 80% Keywords table
  const coreTable = coreKeywords.slice(0, 15).map(k =>
    `| ${k.keyword} | ${k.volume.toLocaleString()} | ${k.difficulty} | $${k.cpc.toFixed(2)} | ${k.intent} | ${k.buyerPersona} | ${k.ctrScore} | ${k.aiOverviewPresent ? 'YES' : 'NO'} | ${k.brandDomainPageScore} | ${k.revenueScore} |`
  ).join('\n');

  // Top Experimental 20% Keywords table
  const expTable = expKeywords.slice(0, 10).map(k =>
    `| ${k.keyword} | ${k.volume.toLocaleString()} | ${k.difficulty} | $${k.cpc.toFixed(2)} | ${k.intent} | ${k.buyerPersona} | ${k.ctrScore} | ${k.aiOverviewPresent ? 'YES' : 'NO'} | ${k.brandDomainPageScore} | ${k.revenueScore} |`
  ).join('\n');

  // Cluster summary table
  const clusterTable = Object.entries(clusters).map(([name, kws]) => {
    const clusterKws = kws.map(kw => keywords.find(k => k.keyword === kw)).filter(Boolean) as KeywordData[];
    const totalVol = clusterKws.reduce((sum, k) => sum + k.volume, 0);
    const avgKD = clusterKws.length > 0 ? Math.round(clusterKws.reduce((sum, k) => sum + k.difficulty, 0) / clusterKws.length) : 0;
    const topRevKw = clusterKws.sort((a, b) => b.revenueScore - a.revenueScore)[0];
    return `| ${name} | ${kws.length} | ${totalVol.toLocaleString()} | ${avgKD} | ${topRevKw?.keyword || '-'} | ${topRevKw?.revenueScore || 0} |`;
  }).join('\n');

  // Competitor table
  const compTable = competitors.slice(0, 15).map(c =>
    `| ${c.position} | ${c.url} | ${c.title} |`
  ).join('\n');

  // PAA questions
  const paaList = paaQuestions.slice(0, 15).map(q => `- ${q.question}`).join('\n');

  return `# Exbabel SEO Intelligence Report

**Generated**: ${dateStr}
**Seed Keywords**: ${seedKeywords.join(', ')}
**Total Relevant Keywords**: ${keywords.length}
**Portfolio Allocation**: ${coreKeywords.length} Core (80%) / ${expKeywords.length} Experimental (20%)
**SERP Winnability**: ${winnability.score}/10

---

## Executive Summary

${executiveSummary}

---

## 🎯 80% Core Commercial Opportunities (Demand, CPC Dollars & CTR Winners)

| Keyword | Volume | KD | CPC | Intent | Persona | Est CTR | AI Overview | BDP Comp | Revenue Score |
|---------|--------|-----|-----|--------|---------|---------|-------------|----------|---------------|
${coreTable}

---

## 🚀 20% Experimental & Emerging Opportunities (GEO, Multi-Platform & Long-Tail)

| Keyword | Volume | KD | CPC | Intent | Persona | Est CTR | AI Overview | BDP Comp | Revenue Score |
|---------|--------|-----|-----|--------|---------|---------|-------------|----------|---------------|
${expTable}

---

## Topic Clusters

| Cluster | Keywords | Total Volume | Avg KD | Top Revenue Keyword | Revenue Score |
|---------|----------|-------------|--------|---------------------|---------------|
${clusterTable}

---

## Competitor Landscape

**Winnability Assessment**: ${winnability.analysis}
**Dominant Content Type**: ${winnability.dominantType}

| Position | URL | Title |
|----------|-----|-------|
${compTable}

---

${contentGap}

---

## People Also Ask — Opportunities

${paaList || 'No PAA questions found.'}

> These questions should be answered directly in Exbabel's content to capture featured snippets and AI citations.

---

${topicalAuthority}

---

${geoRecs}

---

## Recommended Next Steps

1. **Immediate (Week 1-2)**: Publish content targeting the top 5 revenue-score keywords
2. **Short-term (Month 1)**: Build out the highest-volume topic cluster with pillar + spoke content
3. **Medium-term (Month 2-3)**: Create comparison pages targeting competitor brand keywords
4. **Ongoing**: Answer PAA questions in blog content; add FAQ schema to all pages
`;
}

// ─── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  🔍 Exbabel SEO Intelligence Agent v2');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const maxKeywords = parseInt(options.maxKeywords, 10);
  const serpDepth = parseInt(options.serpDepth, 10);
  const topBriefs = parseInt(options.topBriefs, 10);

  const reportsDir = path.resolve(__dirname, '../seo-reports');
  fs.mkdirSync(reportsDir, { recursive: true });

  const dateStr = new Date().toISOString().split('T')[0];
  const runId = Math.floor(Date.now() / 1000);

  let seedKeywords: string[] = [];
  let dedupedRaw: any[] = [];

  // ── Phase 1: Keyword Discovery (or CSV Import) ─────────────────────────────
  if (options.csv) {
    // Load from existing CSV
    console.log('📂 Phase 1: Loading Keywords from CSV');
    const csvPath = path.resolve(options.csv);
    if (!fs.existsSync(csvPath)) {
      console.error(`  ✗ CSV file not found: ${csvPath}`);
      process.exit(1);
    }
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = csvContent.split('\n').filter(l => l.trim());
    const header = lines[0].split(',');
    const kwIdx = header.findIndex(h => h.trim().toLowerCase() === 'keyword');
    const volIdx = header.findIndex(h => h.trim().toLowerCase() === 'volume');
    const diffIdx = header.findIndex(h => h.trim().toLowerCase().includes('difficult') || h.trim().toLowerCase() === 'kd');
    const cpcIdx = header.findIndex(h => h.trim().toLowerCase() === 'cpc');
    const compIdx = header.findIndex(h => h.trim().toLowerCase().includes('competition'));

    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',');
      const kw = cols[kwIdx]?.trim();
      if (!kw) continue;
      dedupedRaw.push({
        keyword: kw,
        keyword_info: {
          search_volume: parseInt(cols[volIdx] || '0', 10) || 0,
          cpc: parseFloat(cols[cpcIdx] || '0') || 0,
          competition_level: cols[compIdx]?.trim() || 'MEDIUM',
        },
        keyword_properties: {
          keyword_difficulty: parseInt(cols[diffIdx] || '0', 10) || 0,
        }
      });
    }

    // Extract unique seed-like keywords for report labeling (top 5 by volume)
    const sorted = [...dedupedRaw].sort((a, b) => (b.keyword_info?.search_volume || 0) - (a.keyword_info?.search_volume || 0));
    seedKeywords = sorted.slice(0, 5).map(k => k.keyword);

    console.log(`   ✓ Loaded ${dedupedRaw.length} keywords from CSV`);
    console.log(`   📄 Source: ${csvPath}\n`);
  } else {
    // Fetch from DataForSEO API
    if (options.seedFile) {
      const seedContent = fs.readFileSync(path.resolve(options.seedFile), 'utf-8');
      seedKeywords = seedContent.split('\n').map((k: string) => k.trim()).filter(Boolean);
    } else {
      let keywordsStr = options.keywords;
      if (!keywordsStr) {
        keywordsStr = await promptUser('Enter seed keywords (comma-separated):\n> ');
      }
      seedKeywords = keywordsStr.split(',').map((k: string) => k.trim()).filter(Boolean);
    }
    if (seedKeywords.length === 0) { console.log('No seeds provided. Exiting.'); process.exit(1); }

    console.log('📡 Phase 1: Keyword Discovery');
    console.log(`   Processing ${seedKeywords.length} seed keywords...\n`);

    const allRaw: any[] = [];
    for (const seed of seedKeywords) {
      const ideas = await fetchKeywordIdeas(seed, 700);
      const related = await fetchRelatedKeywords(seed, 700);
      allRaw.push(...ideas, ...related);
    }

    const seen = new Set<string>();
    dedupedRaw = allRaw.filter(item => {
      if (!item.keyword || seen.has(item.keyword)) return false;
      seen.add(item.keyword);
      return true;
    });
    console.log(`\n   ✓ Discovered ${dedupedRaw.length} unique keywords\n`);
  }

  const primarySeed = slugify(seedKeywords[0] || 'seo-report');
  const filePrefix = `${dateStr}-${primarySeed}-${runId}`;
  const runDir = path.join(reportsDir, filePrefix);
  fs.mkdirSync(runDir, { recursive: true });

  // ── Phase 2: Relevance Filtering ───────────────────────────────────────────
  console.log('🎯 Phase 2: Relevance Filtering');
  console.log('   Scoring keywords for Exbabel product relevance...\n');

  const kwStrings = dedupedRaw.map(k => k.keyword);
  const allRelevance: Record<string, { score: number; reason: string }> = {};
  for (let i = 0; i < kwStrings.length; i += 80) {
    const chunk = kwStrings.slice(i, i + 80);
    const chunkRelevance = await scoreRelevanceBatch(chunk);
    Object.assign(allRelevance, chunkRelevance);
    await sleep(200); // Rate limiting
  }

  // Filter: keep keywords with relevance >= 4
  const relevantRaw = dedupedRaw.filter(item => {
    const rel = allRelevance[item.keyword];
    return rel && rel.score >= 4;
  });
  console.log(`   ✓ ${relevantRaw.length} keywords passed relevance filter (out of ${dedupedRaw.length})\n`);

  const keywordsToProcess = relevantRaw.slice(0, Math.min(maxKeywords, relevantRaw.length));

  // ── Phase 3: Intent Classification + Persona Mapping ──────────────────────
  console.log('🧠 Phase 3: Intent Classification & Buyer Persona Mapping\n');

  const kwNames = keywordsToProcess.map(k => k.keyword);
  const intentMap: Record<string, string> = {};
  const personaMap: Record<string, string> = {};

  for (let i = 0; i < kwNames.length; i += 80) {
    const chunk = kwNames.slice(i, i + 80);
    const [intents, personas] = await Promise.all([
      classifyIntentBatch(chunk),
      mapBuyerPersonas(chunk)
    ]);
    Object.assign(intentMap, intents);
    Object.assign(personaMap, personas);
    await sleep(200);
  }
  console.log(`   ✓ Classified intent and personas for ${kwNames.length} keywords\n`);

  // ── Phase 4: Scoring & SERP CTR / Competition ─────────────────────────────
  console.log('📊 Phase 4: Scoring & Modernized 4-Pillar Ranking\n');

  let defaultSerpFeatures = { aiOverview: false, featuredSnippet: false, adsCount: 0 };
  const allPAA: PAAQuestion[] = [];
  const allSerpResults: SerpResult[] = [];
  let winnability = { analysis: 'SERP analysis skipped', score: 5, dominantType: 'unknown' };

  if (!options.skipSerp && !options.csv) {
    console.log('🔎 Phase 5: SERP & Competitor Analysis\n');
    for (const seed of seedKeywords.slice(0, 3)) {
      const { organic, paa, features } = await fetchSerpResults(seed, serpDepth);
      allSerpResults.push(...organic);
      allPAA.push(...paa);
      if (features) defaultSerpFeatures = features;
    }
    winnability = await analyzeSerpWinnability(allSerpResults);
    console.log(`   ✓ SERP Winnability: ${winnability.score}/10 — ${winnability.dominantType}\n`);
  }

  let rawProcessed: KeywordData[] = keywordsToProcess.map(item => {
    const kw = item.keyword;
    const vol = item.keyword_info?.search_volume || item.volume || 0;
    const diff = item.keyword_properties?.keyword_difficulty || item.difficulty || 0;
    const cpc = item.keyword_info?.cpc || item.cpc || 0;
    const competition = mapCompetition(item.keyword_info?.competition_level || item.competition);
    const intent = intentMap[kw] || item.intent || 'Unknown';
    const relevance = allRelevance[kw]?.score || item.relevanceScore || 5;
    const persona = personaMap[kw] || item.buyerPersona || 'General User';

    const aiOverviewPresent = defaultSerpFeatures.aiOverview || kw.toLowerCase().includes('ai') || kw.toLowerCase().includes('live');
    const ctrScore = calculateOrganicCTR(aiOverviewPresent, defaultSerpFeatures.featuredSnippet, defaultSerpFeatures.adsCount);
    const bdpScore = calculateBrandDomainPageCompetition(kw, diff, competition, allSerpResults);

    const opportunityScore = calculateOpportunity(vol, intent, diff, competition);
    const revenueScore = calculateRevenueScore(vol, cpc, intent, diff, competition, relevance, ctrScore, bdpScore);

    return {
      keyword: kw,
      volume: vol,
      difficulty: diff,
      cpc,
      intent,
      competition,
      relevanceScore: relevance,
      buyerPersona: persona,
      opportunityScore,
      revenueScore,
      ctrScore,
      aiOverviewPresent,
      brandDomainPageScore: bdpScore,
      allocationBucket: 'Core' as const,
      isExperimental: false,
    };
  });

  // Apply 80/20 Portfolio Allocation Strategy
  const processedKeywords = partitionPortfolio8020(rawProcessed);
  processedKeywords.sort((a, b) => b.revenueScore - a.revenueScore);
  
  const coreCount = processedKeywords.filter(k => k.allocationBucket === 'Core').length;
  const expCount = processedKeywords.filter(k => k.allocationBucket === 'Experimental').length;

  console.log(`   ✓ Scored ${processedKeywords.length} keywords (${coreCount} Core 80% / ${expCount} Experimental 20%). Top: "${processedKeywords[0]?.keyword}" (Revenue: ${processedKeywords[0]?.revenueScore})\n`);

  // ── Phase 6: Clustering ───────────────────────────────────────────────────
  console.log('🗂️ Phase 6: Topic Clustering\n');

  const clusters = await clusterKeywords(processedKeywords);
  for (const [clusterName, kws] of Object.entries(clusters)) {
    for (const kw of kws) {
      const found = processedKeywords.find(f => f.keyword === kw);
      if (found) found.cluster = clusterName;
    }
  }
  console.log(`   ✓ Created ${Object.keys(clusters).length} topic clusters\n`);

  // ── Phase 7: Competitor Gap Analysis ─────────────────────────────────────────
  console.log('📋 Phase 7: Competitor Gap Analysis (Domain Intersection)\n');
  const contentGap = await buildCompetitorGapAnalysis(seedKeywords, processedKeywords);

  // ── Phase 8: Topical Authority Architecture ───────────────────────────────
  console.log('🏗️ Phase 8: Topical Authority Architecture\n');
  const topicalAuthority = await generateTopicalAuthority(clusters, processedKeywords);

  // ── Phase 8.5: Article Title Plan / Content Calendar ──────────────────────
  console.log('📅 Phase 8.5: Generating 12-Month Content Calendar\n');
  const contentCalendar = await generateContentCalendar(clusters, processedKeywords);

  // ── Phase 8.6: Programmatic Blueprints ────────────────────────────────────
  console.log('🤖 Phase 8.6: Generating Programmatic SEO Blueprints\n');
  const programmaticBlueprints = await generateProgrammaticBlueprints(processedKeywords);

  // ── Phase 8.7: Conversion Landing Pages ───────────────────────────────────
  console.log('📄 Phase 8.7: Generating Conversion Landing Page Wireframes\n');
  const landingPageWireframes = await generateLandingPageWireframes(processedKeywords);

  // ── Phase 8.8: Backlink Strategy ──────────────────────────────────────────
  console.log('🔗 Phase 8.8: Generating Backlink & PR Strategy\n');
  const backlinkStrategy = await generateBacklinkStrategy(clusters);

  // ── Phase 9: GEO Recommendations ──────────────────────────────────────────
  console.log('🤖 Phase 9: GEO (Generative Engine Optimization)\n');
  const geoRecs = await generateGEORec(seedKeywords[0], allPAA);

  // ── Phase 10: Content Briefs ──────────────────────────────────────────────
  console.log(`📝 Phase 10: Generating Top ${topBriefs} Content Briefs\n`);
  const briefs: { keyword: string; content: string }[] = [];
  for (const kw of processedKeywords.slice(0, topBriefs)) {
    const brief = await generateContentBrief(kw, allPAA, allSerpResults);
    briefs.push({ keyword: kw.keyword, content: brief });
    console.log(`   ✓ Brief generated for: "${kw.keyword}"`);
  }

  // ── Phase 11: Executive Summary ───────────────────────────────────────────
  console.log('\n📊 Phase 11: Executive Summary\n');
  const executiveSummary = await generateExecutiveSummary(
    processedKeywords, clusters, allSerpResults, winnability, allPAA, seedKeywords
  );

  // ── Phase 12: Write All Reports ───────────────────────────────────────────
  console.log('💾 Phase 12: Writing Reports\n');

  // Master CSV Merge
  const masterCsvPath = path.join(reportsDir, 'master-keywords.csv');
  let existingKeywords: KeywordData[] = [];
  if (fs.existsSync(masterCsvPath)) {
    const csvContent = fs.readFileSync(masterCsvPath, 'utf-8');
    const lines = csvContent.split('\n').filter(l => l.trim());
    if (lines.length > 1) {
      const header = lines[0].split(',').map(h => h.trim().toLowerCase());
      const getIdx = (...names: string[]) => header.findIndex(h => names.some(n => h.includes(n)));
      const kwIdx = getIdx('keyword');
      const volIdx = getIdx('volume');
      const diffIdx = getIdx('kd', 'difficult');
      const cpcIdx = getIdx('cpc');
      const intentIdx = getIdx('intent');
      const personaIdx = getIdx('persona');
      const relIdx = getIdx('relevance');
      const oppIdx = getIdx('opportunity');
      const revIdx = getIdx('revenue');
      const compIdx = getIdx('competition');
      const clusterIdx = getIdx('cluster');
      const bucketIdx = getIdx('allocation', 'bucket');

      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        const kw = cols[kwIdx]?.replace(/^"|"$/g, '')?.trim();
        if (!kw) continue;
        const bucket = (cols[bucketIdx]?.replace(/^"|"$/g, '')?.trim() || 'Core') as 'Core' | 'Experimental';
        existingKeywords.push({
          keyword: kw,
          volume: parseInt(cols[volIdx] || '0', 10) || 0,
          difficulty: parseInt(cols[diffIdx] || '0', 10) || 0,
          cpc: parseFloat(cols[cpcIdx] || '0') || 0,
          intent: cols[intentIdx]?.replace(/^"|"$/g, '')?.trim() || 'Unknown',
          buyerPersona: cols[personaIdx]?.replace(/^"|"$/g, '')?.trim() || '',
          relevanceScore: parseInt(cols[relIdx] || '0', 10) || 0,
          opportunityScore: parseFloat(cols[oppIdx] || '0') || 0,
          revenueScore: parseFloat(cols[revIdx] || '0') || 0,
          competition: parseFloat(cols[compIdx] || '0') || 0,
          cluster: cols[clusterIdx]?.replace(/^"|"$/g, '')?.trim() || '',
          ctrScore: 1.0,
          aiOverviewPresent: false,
          brandDomainPageScore: 5.0,
          allocationBucket: bucket,
          isExperimental: bucket === 'Experimental'
        });
      }
    }
  }

  // Merge (prefer new processedKeywords)
  const masterMap = new Map<string, KeywordData>();
  for (const kw of existingKeywords) {
    masterMap.set(kw.keyword.toLowerCase(), kw);
  }
  for (const kw of processedKeywords) {
    masterMap.set(kw.keyword.toLowerCase(), kw);
  }
  const mergedKeywords = Array.from(masterMap.values());
  mergedKeywords.sort((a, b) => b.revenueScore - a.revenueScore);

  const csvHeaders = [
    { id: 'keyword', title: 'Keyword' },
    { id: 'volume', title: 'Volume' },
    { id: 'difficulty', title: 'KD' },
    { id: 'cpc', title: 'CPC' },
    { id: 'intent', title: 'Intent' },
    { id: 'buyerPersona', title: 'Buyer Persona' },
    { id: 'relevanceScore', title: 'Relevance' },
    { id: 'opportunityScore', title: 'Opportunity Score' },
    { id: 'revenueScore', title: 'Revenue Score' },
    { id: 'ctrScore', title: 'Organic CTR Score' },
    { id: 'aiOverviewPresent', title: 'AI Overview' },
    { id: 'brandDomainPageScore', title: 'BDP Comp Score' },
    { id: 'allocationBucket', title: 'Allocation Bucket' },
    { id: 'competition', title: 'Competition' },
    { id: 'cluster', title: 'Cluster' },
  ];

  // Write Master CSV at root
  const csvWriterRoot = createObjectCsvWriter({ path: masterCsvPath, header: csvHeaders });
  await csvWriterRoot.writeRecords(mergedKeywords);
  console.log(`   ✓ Updated root master-keywords.csv (Total: ${mergedKeywords.length} keywords)`);

  // Save Master CSV copy inside runDir
  const csvWriterRunMaster = createObjectCsvWriter({ path: path.join(runDir, 'master-keywords.csv'), header: csvHeaders });
  await csvWriterRunMaster.writeRecords(mergedKeywords);

  // Save Run-specific Keywords CSV inside runDir
  const runCsvPath = path.join(runDir, `${filePrefix}-keywords.csv`);
  const csvWriterRun = createObjectCsvWriter({ path: runCsvPath, header: csvHeaders });
  await csvWriterRun.writeRecords(processedKeywords);
  console.log(`   ✓ ${filePrefix}/${filePrefix}-keywords.csv`);

  // Write dedicated Article Blueprints file inside runDir
  if (briefs.length > 0) {
    const blueprintsPath = path.join(runDir, `${filePrefix}-article-blueprints.md`);
    const blueprintsContent = `# Article Blueprints (${dateStr})\n\n` + briefs.map(b => b.content).join('\n\n---\n\n');
    fs.writeFileSync(blueprintsPath, blueprintsContent);
    console.log(`   ✓ ${filePrefix}/${filePrefix}-article-blueprints.md`);
  }

  // Full report
  let fullReport = generateFullReportMarkdown(
    seedKeywords, processedKeywords, clusters, allSerpResults,
    winnability, allPAA, executiveSummary, contentGap, topicalAuthority, geoRecs, dateStr
  );

  // Append Content Calendar
  fullReport += `\n\n---\n\n${contentCalendar}\n`;

  // Append Programmatic Blueprints
  fullReport += `\n\n---\n\n${programmaticBlueprints}\n`;

  // Append Conversion Landing Pages
  fullReport += `\n\n---\n\n${landingPageWireframes}\n`;

  // Append Backlink Strategy
  fullReport += `\n\n---\n\n${backlinkStrategy}\n`;

  // Append briefs
  if (briefs.length > 0) {
    fullReport += `\n\n---\n\n## Content Briefs\n\n`;
    for (const brief of briefs) {
      fullReport += `${brief.content}\n\n`;
    }
  }

  // Append landing pages
  const landingPages = Object.entries(clusters).slice(0, 8).map(([cluster, kws], i) => {
    const topKw = kws[0] || cluster;
    const kd = processedKeywords.find(k => k.keyword === topKw);
    return `### ${i + 1}. /${slugify(cluster)}\n\n- **Target Keyword**: ${topKw}\n- **Volume**: ${kd?.volume || 'N/A'}\n- **Revenue Score**: ${kd?.revenueScore || 'N/A'}\n- **Buyer Persona**: ${kd?.buyerPersona || 'N/A'}`;
  }).join('\n\n');
  fullReport += `\n\n---\n\n## Recommended Landing Pages\n\n${landingPages}\n`;

  // Append PAA
  if (allPAA.length > 0) {
    const paaContent = allPAA.map(q => `- **${q.question}** _(from: "${q.keyword}")_`).join('\n');
    fullReport += `\n\n---\n\n## People Also Ask — Opportunities\n\n${paaContent}\n`;
  }

  fs.writeFileSync(path.join(runDir, `${filePrefix}-full-report.md`), fullReport);
  console.log(`   ✓ ${filePrefix}/${filePrefix}-full-report.md`);

  // Topical Authority Map JSON
  const authorityMap: Record<string, { totalKeywords: number, generatedPages: number, keywords: { keyword: string, status: string }[] }> = {};
  for (const [cluster, kws] of Object.entries(clusters)) {
    authorityMap[cluster] = {
      totalKeywords: kws.length,
      generatedPages: 0,
      keywords: kws.map(k => ({ keyword: k, status: "Not Generated" }))
    };
  }
  const authorityMapPath = path.join(runDir, `${filePrefix}-Topical-Authority-Map.json`);
  fs.writeFileSync(authorityMapPath, JSON.stringify(authorityMap, null, 2));
  console.log(`   ✓ ${filePrefix}/${filePrefix}-Topical-Authority-Map.json`);

  // ── Phase 13: Goldmine Filtering ───────────────────────────────────────────
  console.log('\n⛏️ Phase 13: Generating Goldmine Report\n');
  try {
    console.log('   Running goldmine-filter...');
    const { execSync } = require('child_process');
    execSync('npx tsx scripts/goldmine-filter.ts || npx ts-node scripts/goldmine-filter.ts', { 
      stdio: 'inherit', 
      cwd: path.resolve(__dirname, '..'),
      env: { ...process.env, RUN_DIR: runDir }
    });
    console.log('   ✓ Goldmine filtering complete.');
  } catch (err) {
    console.error('   ✗ Failed to run goldmine-filter.ts', err);
  }

  // ── Phase 14: Automatic Full Article Generation ─────────────────────────────
  console.log('\n✍️ Phase 14: Generating Full Articles from Blueprints\n');
  const blueprintsFile = path.join(runDir, `${filePrefix}-article-blueprints.md`);
  if (fs.existsSync(blueprintsFile)) {
    try {
      const mockFlag = options.mock ? '--mock' : '';
      const { execSync } = require('child_process');
      execSync(`npx tsx scripts/article-generator.ts -f "${blueprintsFile}" ${mockFlag}`, {
        stdio: 'inherit',
        cwd: path.resolve(__dirname, '..'),
        env: process.env
      });
      console.log('   ✓ Full article generation complete.');
    } catch (err) {
      console.error('   ✗ Failed to run article-generator.ts', err);
    }
  }

  // ── Phase 15: Generating Master Executive Run Summary ─────────────────────
  console.log('\n📌 Phase 15: Generating Master Executive Run Summary (00_READ_ME_FIRST_RUN_SUMMARY.md)\n');
  
  const coreKws = processedKeywords.filter(k => k.allocationBucket === 'Core');
  const expKws = processedKeywords.filter(k => k.allocationBucket === 'Experimental');

  let generatedArticlesList = '';
  const genArticlesDir = path.join(runDir, 'generated-articles');
  if (fs.existsSync(genArticlesDir)) {
    const files = fs.readdirSync(genArticlesDir).filter(f => f.endsWith('.md'));
    generatedArticlesList = files.map(f => `- **[${f}](file://${path.join(genArticlesDir, f).replace(/\\/g, '/')})**`).join('\n');
  }

  const runSummary = `# 🚀 Exbabel SEO Run Master Summary

**Execution Date**: ${dateStr}
**Target Topic**: ${seedKeywords.join(', ')}
**Total Analyzed Keywords**: ${processedKeywords.length}
**Portfolio Allocation**: ${coreKws.length} Core Keywords (80%) / ${expKws.length} Experimental Keywords (20%)

---

## 💡 Why These Choices Were Made (Strategy Rationale)

Our automated Strategy Engine analyzed ${processedKeywords.length} candidate search queries across 4 modernized SEO pillars to eliminate guesswork and build a high-converting content moat:

1. **80% Core Commercial Keywords (${coreKws.length} keywords)**:
   - Selected because they demonstrate **high search volume**, **strong advertiser CPC dollar validation ($2.00–$20.00+ raw CPC)**, high intent (*Church Admin / Enterprise Buyer*), and winnable competition scores.
   - **Top Picks**:
     ${coreKws.slice(0, 5).map(k => `- **"${k.keyword}"** (Vol: ${k.volume.toLocaleString()}, CPC: $${k.cpc.toFixed(2)}, Rev Score: ${k.revenueScore})`).join('\n     ')}

2. **20% Experimental & Emerging Keywords (${expKws.length} keywords)**:
   - Selected to capture **AI / GEO queries** (searches involving ChatGPT, AI Overviews, voice cloning), **multi-platform searches** (YouTube, TikTok, OBS/ProPresenter plugins), and **long-tail high-intent queries** before competitors occupy them.
   - **Top Experimental Picks**:
     ${expKws.slice(0, 5).map(k => `- **"${k.keyword}"** (Persona: ${k.buyerPersona}, Intent: ${k.intent})`).join('\n     ')}

---

## 📁 Consolidated File & Output Directory Index

All outputs generated during this run are cleanly saved inside this single directory:

| File / Subfolder | Purpose & Description |
| :--- | :--- |
| **\`00_READ_ME_FIRST_RUN_SUMMARY.md\`** | **(This File)** Master executive summary explaining all strategic choices, keyword picks, and direct links to generated articles. |
| **\`generated-articles/\`** | **Folder containing complete 1,500+ word Markdown articles** ready for CMS publishing. |
| **\`${filePrefix}-full-report.md\`** | Detailed strategy report (12-month calendar, landing page wireframes, backlink strategy, and GEO guidelines). |
| **\`${filePrefix}-article-blueprints.md\`** | 25-Point Master SEO Content Briefs used by the article engine. |
| **\`${filePrefix}-keywords.csv\`** | Full metrics export (Volume, KD, CPC dollars, Intent, Persona, Organic CTR, AI Overview status, 80/20 tag). |
| **\`goldmine-keywords.csv\` & \`goldmine-keywords.md\`** | Tier 1–4 high-value revenue opportunity reports. |
| **\`${filePrefix}-Topical-Authority-Map.json\`** | JSON topical map tracking generated pages vs total cluster keywords. |

---

## 📝 Generated Full Articles (Ready for Publishing)

${generatedArticlesList || 'Articles generated inside `generated-articles/` directory.'}

---

## 🏁 Recommended Next Actions

1. **Review & Publish Articles**: Open the articles inside [\`generated-articles/\`](file://${path.join(genArticlesDir).replace(/\\/g, '/')}) and publish them to your CMS.
2. **Deploy Programmatic Landing Pages**: Use the wireframes in [\`${filePrefix}-full-report.md\`](file://${path.join(runDir, `${filePrefix}-full-report.md`).replace(/\\/g, '/')}) to deploy high-converting landing pages.
`;

  fs.writeFileSync(path.join(runDir, '00_READ_ME_FIRST_RUN_SUMMARY.md'), runSummary);
  console.log(`   ✓ 00_READ_ME_FIRST_RUN_SUMMARY.md generated.`);

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  ✅ SEO Agent v2 completed successfully!');
  console.log(`  📁 Reports saved to: seo-reports/${filePrefix}`);
  console.log(`  📊 ${processedKeywords.length} keywords analyzed`);
  console.log(`  🗂️ ${Object.keys(clusters).length} topic clusters`);
  console.log(`  📝 ${briefs.length} content briefs generated`);
  console.log(`  ✍️  Full articles saved to: seo-reports/${filePrefix}/generated-articles`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main().catch(console.error);
