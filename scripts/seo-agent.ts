import { Command } from 'commander';
import * as dotenv from 'dotenv';
import { OpenAI } from 'openai';
import { createObjectCsvWriter } from 'csv-writer';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

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

async function fetchKeywordIdeas(keyword: string, limit = 100): Promise<any[]> {
  if (options.mock) return generateMockKeywords(keyword, 'ideas');
  console.log(`  → Fetching keyword ideas for: "${keyword}"`);
  const data = await callDataForSeo('/dataforseo_labs/google/keyword_ideas/live', [{
    keywords: [keyword], location_name: 'United States', language_name: 'English', limit
  }]);
  return data?.tasks?.[0]?.result?.[0]?.items || [];
}

async function fetchRelatedKeywords(keyword: string, limit = 100): Promise<any[]> {
  if (options.mock) return generateMockKeywords(keyword, 'related');
  console.log(`  → Fetching related keywords for: "${keyword}"`);
  const data = await callDataForSeo('/dataforseo_labs/google/related_keywords/live', [{
    keyword, location_name: 'United States', language_name: 'English', limit
  }]);
  return data?.tasks?.[0]?.result?.[0]?.items || [];
}

async function fetchSerpResults(keyword: string, depth: number): Promise<{ organic: SerpResult[], paa: PAAQuestion[] }> {
  if (options.mock) return { organic: generateMockSerp(), paa: generateMockPAA(keyword) };
  console.log(`  → Analyzing SERP for: "${keyword}" (depth ${depth})`);
  const data = await callDataForSeo('/serp/google/organic/live/advanced', [{
    keyword, location_name: 'United States', language_name: 'English', depth
  }]);

  const organic: SerpResult[] = [];
  const paa: PAAQuestion[] = [];

  const items = data?.tasks?.[0]?.result?.[0]?.items || [];
  for (const item of items) {
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
  return { organic, paa };
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

async function buildContentGapAnalysis(competitors: SerpResult[], seedKeywords: string[]): Promise<string> {
  if (options.mock) return '## Content Gap Analysis\n\n| Topic | Wordly | Interprefy | KUDO | Exbabel |\n|-------|--------|-----------|------|---------|\n| Live Translation | ✅ | ✅ | ✅ | ❌ |\n| Church Translation | ❌ | ❌ | ❌ | ❌ |\n| Conference Interpretation | ✅ | ✅ | ✅ | ❌ |\n\n**Key Gaps**: Exbabel has no blog content targeting church translation or conference interpretation.';

  const competitorSummary = competitors.slice(0, 10).map(c => `- ${c.url}: "${c.title}" — ${c.description}`).join('\n');
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{
        role: 'system',
        content: `You are an SEO strategist for Exbabel. ${EXBABEL_CONTEXT}`
      }, {
        role: 'user',
        content: `Analyze these competitor pages and identify content gaps for Exbabel.\n\nSeed topics: ${seedKeywords.join(', ')}\n\nCompetitor pages:\n${competitorSummary}\n\nReturn a markdown content gap analysis including:\n1. A markdown table showing which topics each competitor covers vs Exbabel\n2. Key content gaps Exbabel should fill\n3. Specific blog post ideas to fill each gap\n4. Quick wins (low-competition topics no competitor covers well)`
      }],
    });
    return response.choices[0].message.content || '';
  } catch (error) {
    return 'Error generating content gap analysis.';
  }
}

async function generateTopicalAuthority(clusters: Record<string, string[]>, keywords: KeywordData[]): Promise<string> {
  if (options.mock) return '## Topical Authority Architecture\n\n### Pillar: Live Translation Software\n- Spoke: Church Translation Guide\n- Spoke: Conference Interpretation Comparison\n- Spoke: Multilingual Livestreaming Setup';

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
        content: `You are an SEO content strategist for Exbabel. ${EXBABEL_CONTEXT}\n\nDesign a topical authority architecture using a pillar-and-spoke model.`
      }, {
        role: 'user',
        content: `Design a topical authority content plan based on these keyword clusters:\n\n${clusterSummary}\n\nFor each pillar page, provide:\n1. Pillar page title and URL slug\n2. 5-8 supporting spoke articles with titles and URL slugs\n3. Internal linking strategy between pillar and spokes\n4. Target word count for each piece\n5. Priority order for publishing\n\nFormat as clean markdown.`
      }],
    });
    return response.choices[0].message.content || '';
  } catch (error) {
    return 'Error generating topical authority plan.';
  }
}

async function generateContentBrief(kw: KeywordData, paaQuestions: PAAQuestion[], serpResults: SerpResult[]): Promise<string> {
  const relevantPAA = paaQuestions.filter(p => p.keyword.includes(kw.keyword.split(' ')[0])).slice(0, 5);
  const topResults = serpResults.slice(0, 5).map(r => `- #${r.position}: "${r.title}" (${r.url})`).join('\n');

  if (options.mock) {
    return `# Content Brief: ${kw.keyword}\n\n**Target Keyword**: ${kw.keyword}\n**Volume**: ${kw.volume} | **KD**: ${kw.difficulty} | **Intent**: ${kw.intent}\n**Buyer Persona**: ${kw.buyerPersona}\n**Revenue Score**: ${kw.revenueScore}\n\n## Suggested Title\n"${kw.keyword}: The Complete Guide for 2026"\n\n## Target Word Count\n2,500 words\n\n## Suggested H2s\n- What is ${kw.keyword}?\n- Why ${kw.keyword} matters for churches and events\n- How Exbabel solves ${kw.keyword}\n- Pricing and getting started\n\n## People Also Ask\n${relevantPAA.map(q => `- ${q.question}`).join('\n') || '- No PAA data available'}\n\n## Schema\nFAQPage, SoftwareApplication\n\n## Internal Links\n- /pricing\n- /live\n- /features`;
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{
        role: 'system',
        content: `You are an SEO content strategist for Exbabel. ${EXBABEL_CONTEXT}\n\nCreate detailed, actionable content briefs that a writer can immediately use.`
      }, {
        role: 'user',
        content: `Create a detailed SEO content brief for: "${kw.keyword}"\n\nKeyword data:\n- Search Volume: ${kw.volume}\n- Keyword Difficulty: ${kw.difficulty}\n- CPC: $${kw.cpc}\n- Intent: ${kw.intent}\n- Buyer Persona: ${kw.buyerPersona}\n- Revenue Score: ${kw.revenueScore}\n\nTop SERP results:\n${topResults}\n\nPeople Also Ask:\n${relevantPAA.map(q => `- ${q.question}`).join('\n') || 'None found'}\n\nInclude:\n1. Suggested title (with keyword)\n2. Meta description (155 chars)\n3. Target word count\n4. H2 structure (6-8 headings)\n5. Key points to cover under each H2\n6. People Also Ask questions to answer in content\n7. Internal links to suggest (/pricing, /live, /features, /demo)\n8. Schema markup recommendation\n9. CTA placement strategy\n10. Competitive angle (how to differentiate from top results)\n\nFormat as clean markdown.`
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
  if (options.mock) {
    return `Found ${keywords.length} relevant keywords across ${Object.keys(clusters).length} topic clusters. The SERP landscape is moderately competitive (winnability: ${winnability.score}/10). Top opportunity: "${keywords[0]?.keyword}" with revenue score ${keywords[0]?.revenueScore}. Recommend starting with church translation content to capture underserved niche.`;
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
        content: `Write an executive summary of our SEO research findings.\n\nKey data:\n- Total relevant keywords found: ${keywords.length}\n- Topic clusters: ${clusterNames}\n- SERP winnability: ${winnability.score}/10 — ${winnability.analysis}\n- Dominant content type in SERPs: ${winnability.dominantType}\n- People Also Ask questions found: ${paaQuestions.length}\n- Seed topics analyzed: ${seedKeywords.join(', ')}\n\nTop 15 keyword opportunities:\n${topKws}\n\nWrite 3-4 paragraphs covering:\n1. Market opportunity summary\n2. Competitive landscape assessment\n3. Recommended content strategy (what to publish first)\n4. Expected impact and timeline`
      }],
    });
    return response.choices[0].message.content || '';
  } catch (error) {
    return 'Error generating executive summary.';
  }
}

async function clusterKeywords(keywords: KeywordData[]): Promise<Record<string, string[]>> {
  const topKeywords = keywords.slice(0, 80).map(k => k.keyword);
  if (topKeywords.length === 0) return {};

  if (options.mock) {
    return {
      'Live Translation Tools': topKeywords.filter(k => k.includes('live') || k.includes('real time')),
      'Church Translation': topKeywords.filter(k => k.includes('church') || k.includes('ministry')),
      'Conference Interpretation': topKeywords.filter(k => k.includes('conference') || k.includes('event')),
      'Livestream Translation': topKeywords.filter(k => k.includes('livestream') || k.includes('youtube') || k.includes('zoom')),
    };
  }

  console.log(`  → Clustering ${topKeywords.length} keywords...`);
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{
        role: 'system',
        content: `You are an SEO analyst for Exbabel. ${EXBABEL_CONTEXT}\n\nGroup keywords into topic clusters relevant to Exbabel's product and market.`
      }, {
        role: 'user',
        content: `Group these keywords into SEO topic clusters. Use cluster names relevant to Exbabel (e.g., "Church Translation Software", "Conference Interpretation", "Live Caption Solutions").\nReturn JSON: { "Cluster Name": ["keyword1", "keyword2"] }\n\nKeywords:\n${topKeywords.join('\n')}`
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
  const paaSection = paaQuestions.slice(0, 10).map(q => `- ${q.question}`).join('\n');

  if (options.mock) return `# GEO Recommendations for "${topic}"\n\nOptimize for AI citations by structuring content with clear definitions, comparisons, and FAQ schema.`;

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

// ─── Scoring ───────────────────────────────────────────────────────────────────

function calculateRevenueScore(
  volume: number, cpc: number, intent: string, difficulty: number,
  competition: number, relevance: number
): number {
  const intentWeights: Record<string, number> = {
    Transactional: 3.0, Commercial: 2.5, Informational: 1.0, Navigational: 0.3, Unknown: 0.5
  };
  const intentW = intentWeights[intent] || 1.0;
  // Revenue Score: weighs CPC heavily (proxy for commercial value), relevance, and intent
  // Penalizes high difficulty, rewards high volume
  const raw = (volume * cpc * intentW * (relevance / 10)) / (difficulty + competition * 10 + 1);
  return parseFloat(raw.toFixed(2));
}

function calculateOpportunity(volume: number, intent: string, difficulty: number, competition: number): number {
  const intentWeights: Record<string, number> = {
    Transactional: 2.5, Commercial: 2.0, Informational: 1.0, Navigational: 0.5, Unknown: 1.0
  };
  const w = intentWeights[intent] || 1.0;
  return parseFloat(((volume * w) / (difficulty + competition * 10 + 1)).toFixed(2));
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
  // Top 20 keywords table
  const kwTable = keywords.slice(0, 20).map(k =>
    `| ${k.keyword} | ${k.volume.toLocaleString()} | ${k.difficulty} | $${k.cpc.toFixed(2)} | ${k.intent} | ${k.buyerPersona} | ${k.relevanceScore} | ${k.revenueScore} |`
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
**SERP Winnability**: ${winnability.score}/10

---

## Executive Summary

${executiveSummary}

---

## Top 20 Keyword Opportunities

| Keyword | Volume | KD | CPC | Intent | Persona | Relevance | Revenue Score |
|---------|--------|-----|-----|--------|---------|-----------|---------------|
${kwTable}

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
    let keywordsStr = options.keywords;
    if (!keywordsStr) {
      keywordsStr = await promptUser('Enter seed keywords (comma-separated):\n> ');
    }
    seedKeywords = keywordsStr.split(',').map((k: string) => k.trim()).filter(Boolean);
    if (seedKeywords.length === 0) { console.log('No seeds provided. Exiting.'); process.exit(1); }

    console.log('📡 Phase 1: Keyword Discovery');
    console.log(`   Processing ${seedKeywords.length} seed keywords...\n`);

    const allRaw: any[] = [];
    for (const seed of seedKeywords) {
      const ideas = await fetchKeywordIdeas(seed, 100);
      const related = await fetchRelatedKeywords(seed, 100);
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

  // ── Phase 4: Scoring ──────────────────────────────────────────────────────
  console.log('📊 Phase 4: Scoring & Ranking\n');

  const processedKeywords: KeywordData[] = keywordsToProcess.map(item => {
    const kw = item.keyword;
    const vol = item.keyword_info?.search_volume || 0;
    const diff = item.keyword_properties?.keyword_difficulty || 0;
    const cpc = item.keyword_info?.cpc || 0;
    const competition = mapCompetition(item.keyword_info?.competition_level);
    const intent = intentMap[kw] || 'Unknown';
    const relevance = allRelevance[kw]?.score || 5;
    const persona = personaMap[kw] || 'General User';

    const opportunityScore = calculateOpportunity(vol, intent, diff, competition);
    const revenueScore = calculateRevenueScore(vol, cpc, intent, diff, competition, relevance);

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
    };
  });

  // Sort by revenue score (most actionable first)
  processedKeywords.sort((a, b) => b.revenueScore - a.revenueScore);
  console.log(`   ✓ Scored ${processedKeywords.length} keywords. Top: "${processedKeywords[0]?.keyword}" (Revenue: ${processedKeywords[0]?.revenueScore})\n`);

  // ── Phase 5: SERP Analysis ────────────────────────────────────────────────
  const allPAA: PAAQuestion[] = [];
  const allSerpResults: SerpResult[] = [];
  let winnability = { analysis: 'SERP analysis skipped', score: 5, dominantType: 'unknown' };

  if (options.skipSerp || options.csv) {
    console.log('⏭️ Phase 5: SERP Analysis (skipped — use without --csv or --skip-serp to enable)\n');
  } else {
    console.log('🔎 Phase 5: SERP & Competitor Analysis\n');
    for (const seed of seedKeywords.slice(0, 3)) {
      const { organic, paa } = await fetchSerpResults(seed, serpDepth);
      allSerpResults.push(...organic);
      allPAA.push(...paa);
    }
    winnability = await analyzeSerpWinnability(allSerpResults);
    console.log(`   ✓ SERP Winnability: ${winnability.score}/10 — ${winnability.dominantType}\n`);
  }

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

  // ── Phase 7: Content Gap Analysis ─────────────────────────────────────────
  console.log('📋 Phase 7: Content Gap Analysis\n');
  const contentGap = await buildContentGapAnalysis(allSerpResults, seedKeywords);

  // ── Phase 8: Topical Authority Architecture ───────────────────────────────
  console.log('🏗️ Phase 8: Topical Authority Architecture\n');
  const topicalAuthority = await generateTopicalAuthority(clusters, processedKeywords);

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

  // CSV
  const csvWriter = createObjectCsvWriter({
    path: path.join(reportsDir, `${filePrefix}-keywords.csv`),
    header: [
      { id: 'keyword', title: 'Keyword' },
      { id: 'volume', title: 'Volume' },
      { id: 'difficulty', title: 'KD' },
      { id: 'cpc', title: 'CPC' },
      { id: 'intent', title: 'Intent' },
      { id: 'buyerPersona', title: 'Buyer Persona' },
      { id: 'relevanceScore', title: 'Relevance' },
      { id: 'opportunityScore', title: 'Opportunity Score' },
      { id: 'revenueScore', title: 'Revenue Score' },
      { id: 'competition', title: 'Competition' },
      { id: 'cluster', title: 'Cluster' },
    ]
  });
  await csvWriter.writeRecords(processedKeywords);
  console.log(`   ✓ ${filePrefix}-keywords.csv`);

  // Full report
  const fullReport = generateFullReportMarkdown(
    seedKeywords, processedKeywords, clusters, allSerpResults,
    winnability, allPAA, executiveSummary, contentGap, topicalAuthority, geoRecs, dateStr
  );
  fs.writeFileSync(path.join(reportsDir, `${filePrefix}-full-report.md`), fullReport);
  console.log(`   ✓ ${filePrefix}-full-report.md`);

  // Content briefs
  for (const brief of briefs) {
    const briefFile = `${filePrefix}-brief-${slugify(brief.keyword)}.md`;
    fs.writeFileSync(path.join(reportsDir, briefFile), brief.content);
    console.log(`   ✓ ${briefFile}`);
  }

  // Landing pages
  const landingPages = Object.entries(clusters).slice(0, 8).map(([cluster, kws], i) => {
    const topKw = kws[0] || cluster;
    const kd = processedKeywords.find(k => k.keyword === topKw);
    return `### ${i + 1}. /${slugify(cluster)}\n\n- **Target Keyword**: ${topKw}\n- **Volume**: ${kd?.volume || 'N/A'}\n- **Revenue Score**: ${kd?.revenueScore || 'N/A'}\n- **Buyer Persona**: ${kd?.buyerPersona || 'N/A'}`;
  }).join('\n\n');
  fs.writeFileSync(path.join(reportsDir, `${filePrefix}-landing-pages.md`), `# Recommended Landing Pages\n\n${landingPages}`);
  console.log(`   ✓ ${filePrefix}-landing-pages.md`);

  // PAA questions
  if (allPAA.length > 0) {
    const paaContent = allPAA.map(q => `- **${q.question}** _(from: "${q.keyword}")_`).join('\n');
    fs.writeFileSync(path.join(reportsDir, `${filePrefix}-people-also-ask.md`), `# People Also Ask — Opportunities\n\n${paaContent}`);
    console.log(`   ✓ ${filePrefix}-people-also-ask.md`);
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  ✅ SEO Agent v2 completed successfully!');
  console.log(`  📁 Reports saved to: seo-reports/`);
  console.log(`  📊 ${processedKeywords.length} keywords analyzed`);
  console.log(`  🗂️ ${Object.keys(clusters).length} topic clusters`);
  console.log(`  📝 ${briefs.length} content briefs generated`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main().catch(console.error);
