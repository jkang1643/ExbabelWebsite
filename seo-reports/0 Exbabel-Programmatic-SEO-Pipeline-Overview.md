# Exbabel Programmatic SEO Operating System Architecture

This document outlines the end-to-end architecture of Exbabel's automated SEO Operating System. The pipeline is designed to behave like a massive B2B SEO agency, turning raw data into an unassailable content moat.

The system consists of three core components: **The Strategist**, **The Editor**, and **The Programmatic Engine**.

---

## Phase 1: The Strategy Engine (`scripts/seo-agent.ts`)
This is the master orchestrator. It fetches SERP intelligence, mathematically clusters keywords, and builds exhaustive blueprints.

**Command:**
```bash
npx ts-node scripts/seo-agent.ts -f master-keywords.csv
```

### What It Does:
1. **Mathematical Clustering**: Scans keywords and mathematically groups them using n-gram lexical overlap, then uses GPT to assign strategic Pillar names (e.g., "Live Caption Solutions").
2. **Deep SERP Analysis Layer**: Fetches the Top 10 SERP results for your top keywords and mathematically reverse-engineers their H1/H2 structures, intents, and snippets to build mathematically superior content briefs.
3. **Competitor Gap Engine**: Simulates a Domain Intersection analysis to compare `exbabel.com` against `wordly.ai`, `kudoway.com`, and `glossa.com`, identifying and prioritizing exact "Urgent Gap Opportunities."
4. **Blueprint Generation**:
   - Generates the 25-Point SEO Checklists for articles.
   - Generates the 17-Section Conversion Landing Page wireframes.
5. **Topical Authority Tracker**: Outputs a `Topical-Authority-Map.json` to track precisely how many keywords in a cluster have generated pages vs. total keywords.

### Key Outputs:
- `[date]-full-report.md` (Strategy, Roadmap, Competitor Gaps)
- `[date]-article-blueprints.md` (The 25-point briefs)
- `[date]-Topical-Authority-Map.json`

---

## Phase 2: The Content Execution Engine (`scripts/article-generator.ts`)
This script acts as your B2B Writer and Managing Editor. It consumes the massive 25-point blueprints generated in Phase 1 and outputs complete, linking-optimized articles.

**Command:**
```bash
npx ts-node scripts/article-generator.ts -f seo-reports/[date]-run/[date]-article-blueprints.md
```

### What It Does:
1. **Framework Selection**: Analyzes the intent of the keyword and selects the ideal journalistic or marketing framework (e.g., *Ultimate Guide*, *Case Study*, *Product Comparison*).
2. **Authenticity Injection**: Forces the AI to use "Signals of Authentic Content" (first-person experience, specific Exbabel data, quotes from pastors).
3. **Internal Linking & Entity Engine**: After the 1,500+ word article is drafted, the engine scans the text, extracts key entities (like "Simultaneous Interpretation"), and automatically wraps them in markdown internal links.
4. **Rubric Scoring**: Evaluates the final draft against a **100-Point Scoring Rubric** (grading Originality, Specificity, AI Citation Potential, etc.).

### Key Outputs:
- `generated-articles/[keyword-slug].md`

---

## Phase 3: The Programmatic Page Generator (`scripts/programmatic-generator.ts`)
This is your mass-scale landing page creator. It takes a single wireframe template and a list of variables to spin up hundreds of localized/niche conversion pages.

**Command:**
```bash
npx ts-node scripts/programmatic-generator.ts -t path/to/template.md -v path/to/variables.json
```

### What It Does:
1. **Variable Ingestion**: Reads a JSON array of variables (e.g., `[{"language": "Spanish", "denomination": "Baptist"}, ...]`).
2. **Programmatic Generation**: Loops through every variable combination and injects it into the master Template Framework.
3. **Conversion Copywriting**: Re-writes the placeholders to be highly specific and localized to that specific variable (e.g., writing specific use-cases for Spanish Baptist churches).

### Key Outputs:
- `seo-reports/generated-programmatic-pages/[variable-slug].md`

---

## How to Run the Complete Workflow

1. **Drop your raw keyword research** into the root folder (e.g., `master-keywords.csv`).
2. **Run the Strategy Engine** to generate the plans and blueprints.
3. **Run the Content Engine** to generate your blog posts from the `article-blueprints.md`.
4. **Run the Programmatic Engine** to generate your mass conversion pages from your templates.
5. **Publish** the generated `.md` files directly to your CMS!
