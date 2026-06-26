import * as fs from 'fs';
import * as path from 'path';

interface MergedKeyword {
  keyword: string;
  volume: number;
  difficulty: number;
  cpc: number;
  intent: string;
  buyerPersona: string;
  relevance: number;
  revenueScore: number;
  competition: number;
  cluster: string;
  source: string;
}

// Parse a CSV file into keyword records
function parseCSV(filepath: string, sourceName: string): MergedKeyword[] {
  const content = fs.readFileSync(filepath, 'utf-8');
  const lines = content.split('\n').filter(l => l.trim());
  const header = lines[0].split(',').map(h => h.trim().toLowerCase());

  const getIdx = (...names: string[]) => header.findIndex(h => names.some(n => h.includes(n)));

  const kwIdx = getIdx('keyword');
  const volIdx = getIdx('volume');
  const diffIdx = getIdx('difficult', 'kd');
  const cpcIdx = getIdx('cpc');
  const intentIdx = getIdx('intent');
  const personaIdx = getIdx('persona');
  const relIdx = getIdx('relevance');
  const revIdx = getIdx('revenue');
  const compIdx = getIdx('competition');
  const clusterIdx = getIdx('cluster');

  const results: MergedKeyword[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    const kw = cols[kwIdx]?.replace(/^"|"$/g, '')?.trim();
    if (!kw) continue;
    results.push({
      keyword: kw,
      volume: parseInt(cols[volIdx] || '0', 10) || 0,
      difficulty: parseInt(cols[diffIdx] || '0', 10) || 0,
      cpc: parseFloat(cols[cpcIdx] || '0') || 0,
      intent: cols[intentIdx]?.replace(/^"|"$/g, '')?.trim() || 'Unknown',
      buyerPersona: cols[personaIdx]?.replace(/^"|"$/g, '')?.trim() || '',
      relevance: parseInt(cols[relIdx] || '0', 10) || 0,
      revenueScore: parseFloat(cols[revIdx] || '0') || 0,
      competition: parseFloat(cols[compIdx] || '0') || 0,
      cluster: cols[clusterIdx]?.replace(/^"|"$/g, '')?.trim() || '',
      source: sourceName,
    });
  }
  return results;
}

// Exbabel relevance keywords/phrases
const RELEVANT_TERMS = [
  'live translation', 'real time translation', 'real-time translation', 'simultaneous',
  'interpretation', 'interpreter', 'captioning', 'caption', 'subtitle',
  'live audio', 'live video', 'livestream', 'webinar', 'conference',
  'church', 'ministry', 'event translation', 'multilingual',
  'speech to speech', 'speech-to-speech', 'ai translation', 'ai translator',
  'translation software', 'translation app', 'translation platform',
  'translation service', 'translation tool', 'on-demand', 'on demand',
  'zoom translation', 'zoom interpretation', 'youtube translation',
  'real time translator', 'live translation app', 'translation earbuds',
  'closed captioning', 'live caption', 'ai powered translation',
  'language translation', 'voice translator', 'audio translator',
  'video translator', 'translation api', 'speech to text',
];

function isRelevantToExbabel(kw: MergedKeyword): boolean {
  const lower = kw.keyword.toLowerCase();
  // If it already has a high relevance score from V2, trust it
  if (kw.relevance >= 7) return true;
  // Check for relevant terms
  if (RELEVANT_TERMS.some(term => lower.includes(term))) return true;
  // Check buyer persona
  if (['Church Admin', 'Conference Organizer', 'Livestreamer', 'Enterprise Buyer'].includes(kw.buyerPersona)) return true;
  return false;
}

// Irrelevant exclusion patterns
const EXCLUDE_PATTERNS = [
  'morse', 'braille', 'old english', 'medieval', 'simlish', 'gaster',
  'leet speak', 'binary', 'manga', 'pokemon', 'minecraft', 'flash',
  'zoom h1', 'zoom h2', 'zoom h4', 'zoom h5', 'zoom h6', 'zoom drain',
  'zoom flume', 'zoom flash', 'zoom dc', 'zoom car', 'zoom diallo',
  'zoom whitening', 'zoom lighting', 'zoom lens', 'zoom camera test',
  'zoom code', 'zoom remote', 'zoom clips', 'zoom icon', 'zoom mod',
  'ai rewriter', 'ai image', 'ai photo', 'ai picture', 'ai comic',
  'ai plagiarism', 'ai checker', 'ai detector', 'ai writing detector',
  'ai character', 'ai editor', 'ai letter', 'ai script writer',
  'ai code', 'screenplay', 'screenwriting', 'storyboard',
  'grammarly', 'notion ai', 'paperclip', 'turboscribe', 'typeset',
  'text to image', 'image generator', 'video generator', 'flow ai',
  'deepseek', 'poly ai', 'pixverse', 'typecast', 'typeface',
  'project management', 'accounting software', 'property management',
  'invoicing', 'bookkeeping', 'budgeting', 'scheduling', 'fleet',
  'sage software', 'tableau', 'gantt', 'volunteer management',
  'contract management', 'legal', 'compliance', 'plm software',
  'sap software', 'fusion 360', 'word processing', 'desktop publishing',
  'dsi conference', 'mac conference', 'asm conference', 'ada conference',
  'hitec conference', 'kubernetes', 'supercomputing', 'siggraph',
  'lost in translation', 'where does translation occur',
  'where does translation take place', 'where does translation happen',
  'translation diagram', 'translation steps', 'in situ translation',
  'which shows only a vertical', 'a la carte', 'à la carte',
  'bright novels', 'twitter voicemail', 'paradox live',
  'google translate english to', 'translate english to', 'translate french',
  'translate german', 'translate italian', 'translate japanese',
  'translate korean', 'translate chinese', 'translate arabic',
  'translate russian', 'translate portuguese', 'translate vietnamese',
  'translate tagalog', 'translate english to uzbek', 'translate english to myanmar',
  'translate english to bangla', 'translate english to marathi',
  'french to english translation', 'german to english translation',
  'english to spanish translation', 'english to french translation',
  'english to german translation', 'english to japanese translation',
  'english to hindi translation', 'english to polish',
  'english to mandarin', 'dutch to english', 'polish to english',
  'vietnamese to english', 'latin to english', 'english to latin',
  'english to chinese translation', 'english to arabic',
  'english to russian', 'english to urdu', 'english to italian',
  'english to portuguese', 'english to vietnamese',
  'french to english', 'portuguese to english', 'italian to english',
  'german to english', 'russian to english', 'english to french',
  'english to chinese', 'translate to english',
  'google translate', 'deepl translate', 'bing translate', 'yandex translate',
  'pitt zoom', 'washu zoom', 'cuny zoom', 'csun zoom', 'iu zoom',
  'penn zoom', 'uga zoom', 'gmu zoom', 'uva zoom', 'wustl zoom',
  'baruch zoom', 'bmcc zoom', 'uw zoom', 'umich zoom', 'utk zoom',
  'ub zoom', 'ut zoom', 'uf zoom', 'uky zoom', 'mcps zoom', 'fiu zoom',
  'quillbot', 'judson', 'plymouth live', 'w place live', 'lancaster live',
  'spoken live', 'paradox live',
];

function isExcluded(keyword: string): boolean {
  const lower = keyword.toLowerCase();
  return EXCLUDE_PATTERNS.some(p => lower.includes(p));
}

// Main
const reportsDir = path.resolve(__dirname, '../seo-reports');
const outDir = process.env.RUN_DIR || reportsDir;
const masterFile = path.join(reportsDir, 'master-keywords.csv');

const allKeywords: MergedKeyword[] = [];
if (fs.existsSync(masterFile)) {
  const parsed = parseCSV(masterFile, 'Master');
  console.log(`Loaded ${parsed.length} keywords from master-keywords.csv`);
  allKeywords.push(...parsed);
} else {
  console.log('No master-keywords.csv found. Run seo-agent.ts first.');
  process.exit(1);
}

// Deduplicate
const deduped = new Map<string, MergedKeyword>();
for (const kw of allKeywords) {
  deduped.set(kw.keyword.toLowerCase(), kw);
}

console.log(`\nTotal unique keywords: ${deduped.size}`);

// Filter: must be relevant and not excluded
const goldmine: MergedKeyword[] = [];
for (const kw of deduped.values()) {
  if (isExcluded(kw.keyword)) continue;
  if (!isRelevantToExbabel(kw)) continue;
  if (kw.volume === 0 && kw.cpc === 0) continue; // zero-value keywords
  goldmine.push(kw);
}

// Sort by revenue score first, then by volume
goldmine.sort((a, b) => {
  if (b.revenueScore !== a.revenueScore) return b.revenueScore - a.revenueScore;
  return b.volume - a.volume;
});

console.log(`Goldmine keywords: ${goldmine.length}\n`);

// Write CSV
const csvHeader = 'Keyword,Volume,KD,CPC,Intent,Buyer Persona,Relevance,Revenue Score,Competition,Cluster,Source';
const csvRows = goldmine.map(k =>
  `${k.keyword},${k.volume},${k.difficulty},${k.cpc},${k.intent},${k.buyerPersona},${k.relevance},${k.revenueScore},${k.competition},${k.cluster},${k.source}`
);
fs.writeFileSync(path.join(outDir, 'goldmine-keywords.csv'), [csvHeader, ...csvRows].join('\n'));

// Write Markdown report
const tierLabels = [
  { name: '🏆 Tier 1: Highest Revenue Potential', filter: (k: MergedKeyword) => k.revenueScore > 1000 || k.cpc > 20 },
  { name: '🥇 Tier 2: High-Value Commercial Keywords', filter: (k: MergedKeyword) => k.revenueScore > 100 || (k.cpc > 5 && k.volume > 100) },
  { name: '🎯 Tier 3: Niche Long-Tail Opportunities', filter: (k: MergedKeyword) => k.volume > 0 },
];

let md = `# 🏆 Exbabel Goldmine Keywords Report

**Generated**: ${new Date().toISOString().split('T')[0]}
**Sources**: 3 CSV files merged & deduplicated
**Total Unique Keywords**: ${deduped.size}
**Goldmine Keywords (Exbabel-relevant)**: ${goldmine.length}

---

## How to Use This Report

1. **Tier 1** = Write content for these FIRST. Highest revenue potential.
2. **Tier 2** = Build pillar/spoke content around these topics.
3. **Tier 3** = Long-tail keywords to weave into existing blog content.

---

`;

let usedKeywords = new Set<string>();

for (const tier of tierLabels) {
  const tierKws = goldmine.filter(k => !usedKeywords.has(k.keyword) && tier.filter(k));
  if (tierKws.length === 0) continue;

  md += `## ${tier.name}\n\n`;
  md += `| Keyword | Volume | KD | CPC | Intent | Persona | Revenue Score |\n`;
  md += `|---------|--------|-----|-----|--------|---------|---------------|\n`;

  for (const k of tierKws.slice(0, 40)) {
    md += `| ${k.keyword} | ${k.volume.toLocaleString()} | ${k.difficulty} | $${k.cpc.toFixed(2)} | ${k.intent} | ${k.buyerPersona || '-'} | ${k.revenueScore} |\n`;
    usedKeywords.add(k.keyword);
  }
  md += '\n---\n\n';
}

// Persona breakdown
md += `## 👤 Keywords by Buyer Persona\n\n`;
const personas = ['Church Admin', 'Conference Organizer', 'Livestreamer', 'Enterprise Buyer'];
for (const persona of personas) {
  const personaKws = goldmine.filter(k => k.buyerPersona === persona);
  if (personaKws.length === 0) continue;
  md += `### ${persona} (${personaKws.length} keywords)\n\n`;
  md += `| Keyword | Volume | CPC | Intent | Revenue Score |\n`;
  md += `|---------|--------|-----|--------|---------------|\n`;
  for (const k of personaKws.slice(0, 15)) {
    md += `| ${k.keyword} | ${k.volume.toLocaleString()} | $${k.cpc.toFixed(2)} | ${k.intent} | ${k.revenueScore} |\n`;
  }
  md += '\n';
}

md += `---\n\n## 📊 Summary Stats\n\n`;
md += `| Metric | Value |\n`;
md += `|--------|-------|\n`;
md += `| Total goldmine keywords | ${goldmine.length} |\n`;
md += `| Avg. search volume | ${Math.round(goldmine.reduce((s, k) => s + k.volume, 0) / goldmine.length).toLocaleString()} |\n`;
md += `| Avg. CPC | $${(goldmine.reduce((s, k) => s + k.cpc, 0) / goldmine.length).toFixed(2)} |\n`;
md += `| Avg. KD | ${Math.round(goldmine.reduce((s, k) => s + k.difficulty, 0) / goldmine.length)} |\n`;
md += `| Highest CPC keyword | ${goldmine.sort((a, b) => b.cpc - a.cpc)[0]?.keyword} ($${goldmine[0]?.cpc}) |\n`;
md += `| Highest volume keyword | ${goldmine.sort((a, b) => b.volume - a.volume)[0]?.keyword} (${goldmine[0]?.volume.toLocaleString()}) |\n`;

fs.writeFileSync(path.join(outDir, 'goldmine-keywords.md'), md);

console.log(`✅ Written: ${path.relative(process.cwd(), path.join(outDir, 'goldmine-keywords.csv'))}`);
console.log(`✅ Written: ${path.relative(process.cwd(), path.join(outDir, 'goldmine-keywords.md'))}`);
console.log(`\n🏆 Top 10 Goldmine Keywords:`);
goldmine.sort((a, b) => b.revenueScore - a.revenueScore);
for (const k of goldmine.slice(0, 10)) {
  console.log(`  ${k.keyword} — Rev: ${k.revenueScore} | Vol: ${k.volume} | CPC: $${k.cpc} | ${k.buyerPersona}`);
}
