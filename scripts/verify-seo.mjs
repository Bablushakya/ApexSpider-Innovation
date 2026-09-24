/**
 * scripts/verify-seo.mjs
 * 
 * ⚠️  MANUAL TESTING UTILITY — Not part of the build pipeline.
 * 
 * Automated SEO and Structured Data Auditor for all 16 generated HTML files.
 * Run manually after build to verify SEO metadata and structured data.
 * 
 * Run: node scripts/verify-seo.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist');

const ROUTES = [
  { path: '/', file: 'index.html', expectService: false, expectBreadcrumbs: false, expectContact: false },
  { path: '/about', file: 'about/index.html', expectService: false, expectBreadcrumbs: true, expectContact: false },
  { path: '/services', file: 'services/index.html', expectService: false, expectBreadcrumbs: true, expectContact: false },
  { path: '/services/web-development', file: 'services/web-development/index.html', expectService: true, expectBreadcrumbs: true, expectContact: false },
  { path: '/services/mobile-app-development', file: 'services/mobile-app-development/index.html', expectService: true, expectBreadcrumbs: true, expectContact: false },
  { path: '/services/ai-solutions', file: 'services/ai-solutions/index.html', expectService: true, expectBreadcrumbs: true, expectContact: false },
  { path: '/services/business-applications', file: 'services/business-applications/index.html', expectService: true, expectBreadcrumbs: true, expectContact: false },
  { path: '/services/data-analytics', file: 'services/data-analytics/index.html', expectService: true, expectBreadcrumbs: true, expectContact: false },
  { path: '/services/automation', file: 'services/automation/index.html', expectService: true, expectBreadcrumbs: true, expectContact: false },
  { path: '/portfolio', file: 'portfolio/index.html', expectService: false, expectBreadcrumbs: true, expectContact: false },
  { path: '/portfolio/india-heritage-travel', file: 'portfolio/india-heritage-travel/index.html', expectService: false, expectBreadcrumbs: true, expectContact: false },
  { path: '/portfolio/elevation-by-kim', file: 'portfolio/elevation-by-kim/index.html', expectService: false, expectBreadcrumbs: true, expectContact: false },
  { path: '/contact', file: 'contact/index.html', expectService: false, expectBreadcrumbs: true, expectContact: true },
  { path: '/privacy', file: 'privacy/index.html', expectService: false, expectBreadcrumbs: false, expectContact: false },
  { path: '/terms', file: 'terms/index.html', expectService: false, expectBreadcrumbs: false, expectContact: false },
  { path: '/security', file: 'security/index.html', expectService: false, expectBreadcrumbs: false, expectContact: false },
];

let totalPassed = 0;
let totalFailed = 0;

console.log('=== Running Phase 2 Automated SEO & Structured Data Audit ===\n');

for (const r of ROUTES) {
  const filePath = path.join(distDir, r.file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ [FAIL] Missing file: ${r.file}`);
    totalFailed++;
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf-8');

  const titleMatches = html.match(/<title>[\s\S]*?<\/title>/gi) || [];
  const descMatches = html.match(/<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/gi) || [];
  const canonicalMatches = html.match(/<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/?>/gi) || [];
  const h1Matches = html.match(/<h1[\s\S]*?<\/h1>/gi) || [];
  const jsonLdMatches = html.match(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi) || [];
  const metaKeywordsMatches = html.match(/<meta\s+name="keywords"/gi) || [];
  const localhostMatches = html.match(/http:\/\/localhost/gi) || [];
  const vercelPreviewMatches = html.match(/vercel\.app/gi) || [];

  const issues = [];

  if (titleMatches.length !== 1) issues.push(`Found ${titleMatches.length} <title> tags (expected 1)`);
  if (descMatches.length !== 1) issues.push(`Found ${descMatches.length} meta description tags (expected 1)`);
  if (canonicalMatches.length !== 1) issues.push(`Found ${canonicalMatches.length} canonical tags (expected 1)`);
  if (h1Matches.length !== 1) issues.push(`Found ${h1Matches.length} <h1> tags (expected 1)`);
  if (jsonLdMatches.length !== 1) issues.push(`Found ${jsonLdMatches.length} JSON-LD blocks (expected 1)`);
  if (metaKeywordsMatches.length > 0) issues.push('Found obsolete meta keywords tag');
  if (localhostMatches.length > 0) issues.push('Found localhost URL');
  if (vercelPreviewMatches.length > 0) issues.push('Found vercel preview URL');

  // Parse JSON-LD
  if (jsonLdMatches.length === 1) {
    try {
      const jsonText = jsonLdMatches[0]
        .replace(/<script\s+type="application\/ld\+json">/i, '')
        .replace(/<\/script>/i, '');
      const parsed = JSON.parse(jsonText);
      const graph = parsed['@graph'] || [parsed];

      const hasOrg = graph.some((item) => item['@type'] === 'Organization');
      const hasWebSite = graph.some((item) => item['@type'] === 'WebSite');
      const hasService = graph.some((item) => item['@type'] === 'Service');
      const hasBreadcrumb = graph.some((item) => item['@type'] === 'BreadcrumbList');
      const hasContact = graph.some((item) => item['@type'] === 'ContactPage');

      if (!hasOrg) issues.push('Missing Organization schema in @graph');
      if (!hasWebSite) issues.push('Missing WebSite schema in @graph');
      if (r.expectService && !hasService) issues.push('Missing Service schema in @graph');
      if (r.expectBreadcrumbs && !hasBreadcrumb) issues.push('Missing BreadcrumbList schema in @graph');
      if (r.expectContact && !hasContact) issues.push('Missing ContactPage schema in @graph');
    } catch (e) {
      issues.push(`Invalid JSON-LD syntax: ${e.message}`);
    }
  }

  // Check Title & Meta for primary brand "Apex Spider Innovation"
  if (titleMatches.length === 1) {
    const titleText = titleMatches[0];
    if (titleText.includes('ApexSpider Innovation')) {
      issues.push('Title contains unspaced "ApexSpider Innovation" instead of "Apex Spider Innovation"');
    }
  }

  if (issues.length === 0) {
    console.log(`✅  ${r.path.padEnd(38)} [PASS] (Title, Meta, Canonical, H1, JSON-LD Graph verified)`);
    totalPassed++;
  } else {
    console.error(`❌  ${r.path.padEnd(38)} [FAIL]`);
    for (const iss of issues) {
      console.error(`     - ${iss}`);
    }
    totalFailed++;
  }
}

console.log(`\nAudit Results: ${totalPassed} Passed, ${totalFailed} Failed\n`);

if (totalFailed > 0) {
  process.exit(1);
}
