/**
 * scripts/prerender.mjs
 * Phase 1 & 2 Build-time static prerendering (SSG) for Apex Spider Innovation website.
 *
 * Renders all 16 canonical routes to static HTML files with full semantic
 * markup, exact brand entity consistency ("Apex Spider Innovation"),
 * route-specific SEO metadata, and JSON-LD structured data inside dist/
 * for search engines, crawlers, and instant client page loads.
 *
 * Production Asset Fix: Resolves Vite dev SSR asset paths (/src/assets/...)
 * into production hashed asset URLs (/assets/...) using Vite manifest.json.
 */

import { createServer } from 'vite';
import { renderToString } from 'react-dom/server';
import React from 'react';
import { StaticRouter, Routes, Route } from 'react-router-dom';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');

async function prerender() {
  console.log('\n🚀 Starting static prerendering for all canonical routes (Phase 2)...\n');

  if (!fs.existsSync(indexHtmlPath)) {
    console.error('❌ dist/index.html not found! Run "vite build" before prerendering.');
    process.exit(1);
  }

  const baseTemplate = fs.readFileSync(indexHtmlPath, 'utf-8');

  // Load manifest.json to map development /src/assets paths to production /assets/[name]-[hash]
  let manifest = {};
  const manifestPath = path.join(distDir, '.vite', 'manifest.json');
  const altManifestPath = path.join(distDir, 'manifest.json');
  if (fs.existsSync(manifestPath)) {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  } else if (fs.existsSync(altManifestPath)) {
    manifest = JSON.parse(fs.readFileSync(altManifestPath, 'utf-8'));
  }

  const assetReplacements = [];
  for (const [srcKey, entry] of Object.entries(manifest)) {
    if (entry && entry.file) {
      const rawSrc = '/' + srcKey;
      const encodedSrc = '/' + encodeURI(srcKey);
      const targetFile = '/' + entry.file;
      assetReplacements.push({ from: rawSrc, to: targetFile });
      if (rawSrc !== encodedSrc) {
        assetReplacements.push({ from: encodedSrc, to: targetFile });
      }
    }
  }

  // Copy src/assets into dist/src/assets as physical fallback
  const srcAssetsDir = path.resolve(__dirname, '..', 'src', 'assets');
  const distSrcAssetsDir = path.join(distDir, 'src', 'assets');
  if (fs.existsSync(srcAssetsDir)) {
    try {
      fs.cpSync(srcAssetsDir, distSrcAssetsDir, { recursive: true });
      console.log('  📦 Fallback asset directory copied to dist/src/assets/');
    } catch (e) {
      console.warn('  ⚠️ Could not copy fallback src/assets:', e.message);
    }
  }

  // Start Vite custom server to load React modules in SSR environment
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  try {
    // Load App & Page components
    const { default: App } = await vite.ssrLoadModule('/src/App.jsx');
    const { default: AboutPage } = await vite.ssrLoadModule('/src/pages/AboutPage.jsx');
    const { default: ServicesPage } = await vite.ssrLoadModule('/src/pages/ServicesPage.jsx');
    const { default: ServiceDetailPage } = await vite.ssrLoadModule('/src/pages/ServiceDetailPage.jsx');
    const { default: PortfolioPage } = await vite.ssrLoadModule('/src/pages/PortfolioPage.jsx');
    const { default: CaseStudyPage } = await vite.ssrLoadModule('/src/pages/CaseStudyPage.jsx');
    const { default: ContactPage } = await vite.ssrLoadModule('/src/pages/ContactPage.jsx');
    const { default: PrivacyPolicy } = await vite.ssrLoadModule('/src/pages/PrivacyPolicy.jsx');
    const { default: Terms } = await vite.ssrLoadModule('/src/pages/Terms.jsx');
    const { default: Security } = await vite.ssrLoadModule('/src/pages/Security.jsx');

    // Load data & constants
    const { BRAND } = await vite.ssrLoadModule('/src/constants/brand.js');
    const { PAGE_SEO } = await vite.ssrLoadModule('/src/components/layout/PageSEO.jsx');
    const { SERVICES } = await vite.ssrLoadModule('/src/constants/services.jsx');
    const { CASE_STUDIES } = await vite.ssrLoadModule('/src/constants/caseStudies.jsx');

    const BASE_URL = 'https://www.apexspiderinnovation.com';
    const BRAND_NAME = 'Apex Spider Innovation';
    const ALTERNATE_NAME = 'ApexSpider Innovation';

    // Verified official active social profiles
    const VERIFIED_SAME_AS = [
      'https://www.linkedin.com/company/apexspider-innovation',
      'https://www.instagram.com/apex_spider_innovation/',
      'https://www.youtube.com/@ApexSpiderInnovation',
      'https://x.com/Apex_Spider_Ino',
    ];

    // Global Organization Schema
    const organizationSchema = {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: BRAND_NAME,
      alternateName: ALTERNATE_NAME,
      url: `${BASE_URL}/`,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
      },
      description:
        'Apex Spider Innovation builds custom software, scalable web applications, and automation solutions for startups and growing enterprises.',
      email: 'info@apexspiderinnovation.com',
      sameAs: VERIFIED_SAME_AS,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'info@apexspiderinnovation.com',
        availableLanguage: 'English',
      },
    };

    // Global WebSite Schema
    const webSiteSchema = {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: `${BASE_URL}/`,
      name: BRAND_NAME,
      description:
        'Custom software, scalable web applications, and automation solutions for startups and growing enterprises.',
      publisher: {
        '@id': `${BASE_URL}/#organization`,
      },
    };

    // Define all 16 canonical routes with exact rendering, metadata, and structured data
    const routes = [
      {
        path: '/',
        render: () => React.createElement(App),
        seo: PAGE_SEO.home,
        buildJsonLd: () => ({
          '@context': 'https://schema.org',
          '@graph': [
            organizationSchema,
            webSiteSchema,
            {
              '@type': 'WebPage',
              '@id': `${BASE_URL}/#webpage`,
              url: `${BASE_URL}/`,
              name: PAGE_SEO.home.title,
              description: PAGE_SEO.home.description,
              isPartOf: { '@id': `${BASE_URL}/#website` },
              about: { '@id': `${BASE_URL}/#organization` },
            },
          ],
        }),
      },
      {
        path: '/about',
        render: () => React.createElement(AboutPage),
        seo: PAGE_SEO.about,
        buildJsonLd: () => ({
          '@context': 'https://schema.org',
          '@graph': [
            organizationSchema,
            webSiteSchema,
            {
              '@type': 'WebPage',
              '@id': `${BASE_URL}/about#webpage`,
              url: `${BASE_URL}/about`,
              name: PAGE_SEO.about.title,
              description: PAGE_SEO.about.description,
              isPartOf: { '@id': `${BASE_URL}/#website` },
              about: { '@id': `${BASE_URL}/#organization` },
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
                { '@type': 'ListItem', position: 2, name: 'About', item: `${BASE_URL}/about` },
              ],
            },
          ],
        }),
      },
      {
        path: '/services',
        render: () => React.createElement(ServicesPage),
        seo: PAGE_SEO.services,
        buildJsonLd: () => ({
          '@context': 'https://schema.org',
          '@graph': [
            organizationSchema,
            webSiteSchema,
            {
              '@type': 'WebPage',
              '@id': `${BASE_URL}/services#webpage`,
              url: `${BASE_URL}/services`,
              name: PAGE_SEO.services.title,
              description: PAGE_SEO.services.description,
              isPartOf: { '@id': `${BASE_URL}/#website` },
              about: { '@id': `${BASE_URL}/#organization` },
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
                { '@type': 'ListItem', position: 2, name: 'Services', item: `${BASE_URL}/services` },
              ],
            },
          ],
        }),
      },
      ...SERVICES.map((s) => ({
        path: `/services/${s.slug}`,
        render: () =>
          React.createElement(
            Routes,
            null,
            React.createElement(Route, {
              path: '/services/:slug',
              element: React.createElement(ServiceDetailPage),
            })
          ),
        seo: {
          title: `${s.title} Services | ${BRAND_NAME}`,
          description: s.fullDesc,
          canonical: `${BASE_URL}/services/${s.slug}`,
        },
        buildJsonLd: () => ({
          '@context': 'https://schema.org',
          '@graph': [
            organizationSchema,
            webSiteSchema,
            {
              '@type': 'WebPage',
              '@id': `${BASE_URL}/services/${s.slug}#webpage`,
              url: `${BASE_URL}/services/${s.slug}`,
              name: `${s.title} Services | ${BRAND_NAME}`,
              description: s.fullDesc,
              isPartOf: { '@id': `${BASE_URL}/#website` },
              about: { '@id': `${BASE_URL}/#organization` },
            },
            {
              '@type': 'Service',
              name: `${s.title} Services`,
              description: s.fullDesc,
              provider: {
                '@id': `${BASE_URL}/#organization`,
              },
              url: `${BASE_URL}/services/${s.slug}`,
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
                { '@type': 'ListItem', position: 2, name: 'Services', item: `${BASE_URL}/services` },
                { '@type': 'ListItem', position: 3, name: s.title, item: `${BASE_URL}/services/${s.slug}` },
              ],
            },
          ],
        }),
      })),
      {
        path: '/portfolio',
        render: () => React.createElement(PortfolioPage),
        seo: PAGE_SEO.portfolio,
        buildJsonLd: () => ({
          '@context': 'https://schema.org',
          '@graph': [
            organizationSchema,
            webSiteSchema,
            {
              '@type': 'WebPage',
              '@id': `${BASE_URL}/portfolio#webpage`,
              url: `${BASE_URL}/portfolio`,
              name: PAGE_SEO.portfolio.title,
              description: PAGE_SEO.portfolio.description,
              isPartOf: { '@id': `${BASE_URL}/#website` },
              about: { '@id': `${BASE_URL}/#organization` },
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
                { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `${BASE_URL}/portfolio` },
              ],
            },
          ],
        }),
      },
      ...CASE_STUDIES.map((cs) => ({
        path: `/portfolio/${cs.slug}`,
        render: () =>
          React.createElement(
            Routes,
            null,
            React.createElement(Route, {
              path: '/portfolio/:slug',
              element: React.createElement(CaseStudyPage),
            })
          ),
        seo: {
          title: `${cs.title} | Case Study — ${BRAND_NAME}`,
          description: cs.overview,
          canonical: `${BASE_URL}/portfolio/${cs.slug}`,
        },
        buildJsonLd: () => ({
          '@context': 'https://schema.org',
          '@graph': [
            organizationSchema,
            webSiteSchema,
            {
              '@type': 'WebPage',
              '@id': `${BASE_URL}/portfolio/${cs.slug}#webpage`,
              url: `${BASE_URL}/portfolio/${cs.slug}`,
              name: `${cs.title} | Case Study — ${BRAND_NAME}`,
              description: cs.overview,
              isPartOf: { '@id': `${BASE_URL}/#website` },
              about: { '@id': `${BASE_URL}/#organization` },
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
                { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `${BASE_URL}/portfolio` },
                { '@type': 'ListItem', position: 3, name: cs.client, item: `${BASE_URL}/portfolio/${cs.slug}` },
              ],
            },
          ],
        }),
      })),
      {
        path: '/contact',
        render: () => React.createElement(ContactPage),
        seo: PAGE_SEO.contact,
        buildJsonLd: () => ({
          '@context': 'https://schema.org',
          '@graph': [
            organizationSchema,
            webSiteSchema,
            {
              '@type': 'ContactPage',
              '@id': `${BASE_URL}/contact#webpage`,
              url: `${BASE_URL}/contact`,
              name: PAGE_SEO.contact.title,
              description: PAGE_SEO.contact.description,
              isPartOf: { '@id': `${BASE_URL}/#website` },
              about: { '@id': `${BASE_URL}/#organization` },
              mainEntity: {
                '@id': `${BASE_URL}/#organization`,
              },
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
                { '@type': 'ListItem', position: 2, name: 'Contact', item: `${BASE_URL}/contact` },
              ],
            },
          ],
        }),
      },
      {
        path: '/privacy',
        render: () => React.createElement(PrivacyPolicy),
        seo: {
          title: `Privacy Policy | ${BRAND_NAME}`,
          description: `Privacy Policy and data protection practices for ${BRAND_NAME}.`,
          canonical: `${BASE_URL}/privacy`,
        },
        buildJsonLd: () => ({
          '@context': 'https://schema.org',
          '@graph': [
            organizationSchema,
            webSiteSchema,
            {
              '@type': 'WebPage',
              '@id': `${BASE_URL}/privacy#webpage`,
              url: `${BASE_URL}/privacy`,
              name: `Privacy Policy | ${BRAND_NAME}`,
              description: `Privacy Policy and data protection practices for ${BRAND_NAME}.`,
              isPartOf: { '@id': `${BASE_URL}/#website` },
            },
          ],
        }),
      },
      {
        path: '/terms',
        render: () => React.createElement(Terms),
        seo: {
          title: `Terms of Service | ${BRAND_NAME}`,
          description: `Terms of Service and legal agreements for ${BRAND_NAME}.`,
          canonical: `${BASE_URL}/terms`,
        },
        buildJsonLd: () => ({
          '@context': 'https://schema.org',
          '@graph': [
            organizationSchema,
            webSiteSchema,
            {
              '@type': 'WebPage',
              '@id': `${BASE_URL}/terms#webpage`,
              url: `${BASE_URL}/terms`,
              name: `Terms of Service | ${BRAND_NAME}`,
              description: `Terms of Service and legal agreements for ${BRAND_NAME}.`,
              isPartOf: { '@id': `${BASE_URL}/#website` },
            },
          ],
        }),
      },
      {
        path: '/security',
        render: () => React.createElement(Security),
        seo: {
          title: `Security Policy | ${BRAND_NAME}`,
          description: `Security standards, protocols, and data protection practices at ${BRAND_NAME}.`,
          canonical: `${BASE_URL}/security`,
        },
        buildJsonLd: () => ({
          '@context': 'https://schema.org',
          '@graph': [
            organizationSchema,
            webSiteSchema,
            {
              '@type': 'WebPage',
              '@id': `${BASE_URL}/security#webpage`,
              url: `${BASE_URL}/security`,
              name: `Security Policy | ${BRAND_NAME}`,
              description: `Security standards, protocols, and data protection practices at ${BRAND_NAME}.`,
              isPartOf: { '@id': `${BASE_URL}/#website` },
            },
          ],
        }),
      },
    ];

    console.log(`Prerendering ${routes.length} routes with full metadata & JSON-LD…\n`);

    for (const route of routes) {
      // 1. Render React tree to string
      let appHtml = renderToString(
        React.createElement(
          StaticRouter,
          { location: route.path },
          route.render()
        )
      );

      // Replace development /src/assets/... paths with production built /assets/... paths
      for (const rep of assetReplacements) {
        appHtml = appHtml.replaceAll(rep.from, rep.to);
      }

      // 2. Build route-specific HTML from template
      let html = baseTemplate;

      // Also replace in template if any
      for (const rep of assetReplacements) {
        html = html.replaceAll(rep.from, rep.to);
      }

      // Inject rendered markup into #root
      html = html.replace(
        '<div id="root"></div>',
        `<div id="root">${appHtml}</div>`
      );

      const title = route.seo?.title || `${BRAND_NAME} | Custom Software & Web Development`;
      const description =
        route.seo?.description ||
        'Apex Spider Innovation builds custom software, scalable web applications, and automation solutions for startups and growing enterprises.';
      const canonical = route.seo?.canonical || `${BASE_URL}${route.path === '/' ? '/' : route.path}`;

      // Update <title>
      html = html.replace(
        /<title>[\s\S]*?<\/title>/i,
        `<title>${escapeHtml(title)}</title>`
      );

      // Update meta description
      html = html.replace(
        /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/i,
        `<meta name="description" content="${escapeHtml(description)}" />`
      );

      // Update author
      html = html.replace(
        /<meta\s+name="author"\s+content="[\s\S]*?"\s*\/?>/i,
        `<meta name="author" content="${escapeHtml(BRAND_NAME)}" />`
      );

      // Update canonical link
      html = html.replace(
        /<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/?>/i,
        `<link rel="canonical" href="${canonical}" />`
      );

      // Update Open Graph tags
      html = html.replace(
        /<meta\s+property="og:site_name"\s+content="[\s\S]*?"\s*\/?>/i,
        `<meta property="og:site_name" content="${escapeHtml(BRAND_NAME)}" />`
      );
      html = html.replace(
        /<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/?>/i,
        `<meta property="og:title" content="${escapeHtml(title)}" />`
      );
      html = html.replace(
        /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/?>/i,
        `<meta property="og:description" content="${escapeHtml(description)}" />`
      );
      html = html.replace(
        /<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/?>/i,
        `<meta property="og:url" content="${canonical}" />`
      );
      html = html.replace(
        /<meta\s+property="og:image:alt"\s+content="[\s\S]*?"\s*\/?>/i,
        `<meta property="og:image:alt" content="${escapeHtml(BRAND_NAME)} — Custom Software &amp; Web Development" />`
      );

      // Update Twitter tags
      html = html.replace(
        /<meta\s+name="twitter:title"\s+content="[\s\S]*?"\s*\/?>/i,
        `<meta name="twitter:title" content="${escapeHtml(title)}" />`
      );
      html = html.replace(
        /<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/?>/i,
        `<meta name="twitter:description" content="${escapeHtml(description)}" />`
      );
      html = html.replace(
        /<meta\s+name="twitter:image:alt"\s+content="[\s\S]*?"\s*\/?>/i,
        `<meta name="twitter:image:alt" content="${escapeHtml(BRAND_NAME)} — Custom Software &amp; Web Development" />`
      );

      // Remove obsolete keywords and invalid twitter:site/creator if present in template
      html = html.replace(/<meta\s+name="keywords"\s+content="[\s\S]*?"\s*\/?>\s*/gi, '');
      html = html.replace(/<meta\s+name="twitter:site"\s+content="[\s\S]*?"\s*\/?>\s*/gi, '');
      html = html.replace(/<meta\s+name="twitter:creator"\s+content="[\s\S]*?"\s*\/?>\s*/gi, '');

      // Replace JSON-LD block with route-specific structured data graph
      if (route.buildJsonLd) {
        const jsonLdData = route.buildJsonLd();
        const jsonLdScript = `<script type="application/ld+json">\n${JSON.stringify(jsonLdData, null, 2)}\n    </script>`;
        html = html.replace(
          /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i,
          jsonLdScript
        );
      }

      // 3. Write out static HTML files
      if (route.path === '/') {
        const targetFilePath = path.join(distDir, 'index.html');
        fs.writeFileSync(targetFilePath, html, 'utf-8');
        console.log(`  ✅  ${route.path.padEnd(42)} -> index.html (${html.length.toLocaleString()} bytes)`);
      } else {
        const cleanPath = route.path.replace(/^\//, '');
        const routeSubDir = path.join(distDir, cleanPath);
        if (!fs.existsSync(routeSubDir)) {
          fs.mkdirSync(routeSubDir, { recursive: true });
        }
        const subIndexFilePath = path.join(routeSubDir, 'index.html');
        const directHtmlFilePath = path.join(distDir, `${cleanPath}.html`);

        // Ensure parent directory exists for directHtmlFilePath
        const parentDir = path.dirname(directHtmlFilePath);
        if (!fs.existsSync(parentDir)) {
          fs.mkdirSync(parentDir, { recursive: true });
        }

        fs.writeFileSync(subIndexFilePath, html, 'utf-8');
        fs.writeFileSync(directHtmlFilePath, html, 'utf-8');
        console.log(`  ✅  ${route.path.padEnd(42)} -> ${cleanPath}/index.html + ${cleanPath}.html (${html.length.toLocaleString()} bytes)`);
      }
    }

    console.log(`\n✨ Static prerendering complete! All ${routes.length} pages generated in dist/\n`);
  } catch (err) {
    console.error('\n❌ Prerendering failed with error:', err);
    process.exit(1);
  } finally {
    await vite.close();
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

prerender();
