/**
 * scripts/generate-sitemap.mjs
 * Build-time sitemap generator for Apex Spider Innovation.
 *
 * Derives the route list from the same SERVICES and CASE_STUDIES constants
 * the app uses, so a new route can never be forgotten.
 *
 * Outputs: dist/sitemap.xml  (no changefreq, no priority — Google ignores both)
 *
 * Usage (called automatically by npm run build):
 *   node scripts/generate-sitemap.mjs
 */

import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir   = resolve(__dirname, '..', 'dist');

const SITE = 'https://www.apexspiderinnovation.com';

// ISO date stamp for today's build — used as lastmod for all routes.
// Google treats lastmod as a signal only when it is reliably accurate,
// so a consistent build-date is better than a stale or invented date.
const TODAY = new Date().toISOString().slice(0, 10); // e.g. "2026-09-20"

// ─── Static routes ───────────────────────────────────────────────────────────
// These mirror App.jsx exactly. Update here whenever a route is added/removed.
const STATIC_ROUTES = [
  '/',
  '/about',
  '/services',
  '/portfolio',
  '/contact',
  '/privacy',
  '/terms',
  '/security',
];

// ─── Dynamic slugs (kept in sync with constants automatically) ───────────────
// We import the raw constants so this script never goes out of sync.
// Because the constants use JSX, we extract slugs via regex rather than
// evaluating the module (avoids needing React or a full bundler here).
import { readFileSync } from 'node:fs';

function extractSlugs(filePath) {
  const src = readFileSync(resolve(__dirname, '..', filePath), 'utf8');
  // Match `slug: 'value'` patterns inside the exported array
  const regex = /slug:\s*['"]([^'"]+)['"]/g;
  const slugs = [];
  let m;
  while ((m = regex.exec(src)) !== null) {
    slugs.push(m[1]);
  }
  return slugs;
}

const serviceSlugs   = extractSlugs('src/constants/services.jsx');
const caseStudySlugs = extractSlugs('src/constants/caseStudies.jsx');

// ─── Build final route list ──────────────────────────────────────────────────
const routes = [
  ...STATIC_ROUTES,
  ...serviceSlugs.map((s) => `/services/${s}`),
  ...caseStudySlugs.map((cs) => `/portfolio/${cs}`),
];

// ─── Generate XML ────────────────────────────────────────────────────────────
const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  routes
    .map(
      (path) =>
        `  <url>\n    <loc>${SITE}${path}</loc>\n    <lastmod>${TODAY}</lastmod>\n  </url>`
    )
    .join('\n') +
  `\n</urlset>\n`;

// ─── Write output ────────────────────────────────────────────────────────────
if (!existsSync(distDir)) {
  mkdirSync(distDir, { recursive: true });
}

const outPath = resolve(distDir, 'sitemap.xml');
writeFileSync(outPath, xml, 'utf-8');

const publicSitemapPath = resolve(__dirname, '..', 'public', 'sitemap.xml');
if (existsSync(dirname(publicSitemapPath))) {
  writeFileSync(publicSitemapPath, xml, 'utf-8');
}

console.log(`✅  sitemap.xml written → dist/sitemap.xml & public/sitemap.xml (${routes.length} URLs, lastmod ${TODAY})`);
