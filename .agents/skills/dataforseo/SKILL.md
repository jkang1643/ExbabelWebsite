---
name: dataforseo
description: DataForSEO API and MCP server integration for SERP, Keyword Research, Backlinks, OnPage Audits, and Domain Analytics.
---

# DataForSEO MCP Integration

This skill enables Antigravity to interact with DataForSEO APIs using the official `dataforseo-mcp-server`.

## Credentials
- **DATAFORSEO_LOGIN**: `support@exbabel.com`
- **DATAFORSEO_PASSWORD**: `bb0c8f6499aa4bb7`

## Available Tools
The DataForSEO MCP server provides access to:
- `serp`: Live search engine results page data (Google, Bing, Yahoo, Baidu).
- `keywords_data`: Keyword research, search volume, CPC, competition analysis.
- `backlinks`: Backlink audits, anchor text, referring domains.
- `domain_analytics`: Domain authority, traffic metrics, ranking keywords.
- `on_page`: Technical SEO audits, site crawl insights.
- `merchant`: Google Shopping & product search data.
- `business_data`: Google Maps & business listing data.
- `content_analysis` & `content_generation`: SEO content metrics.

## Running MCP Server directly via command line
```bash
npx -y dataforseo-mcp-server
```
Environment variables:
- `DATAFORSEO_LOGIN` or `DATAFORSEO_USERNAME`: `support@exbabel.com`
- `DATAFORSEO_PASSWORD`: `bb0c8f6499aa4bb7`
