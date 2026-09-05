/**
 * scripts/prerender.mjs
 * Build-time static prerendering (SSG) for ApexSpider Innovation website.
 *
 * Renders all 16 canonical routes to static HTML files with full semantic
 * markup and route-specific SEO metadata inside dist/ for search engines,
 * crawlers, and instant client page loads.
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
  console.log('\n🚀 Starting static prerendering for all canonical routes…\n');

  if (!fs.existsSync(indexHtmlPath)) {
    console.error('❌ dist/index.html not found! Run "vite build" before prerendering.');
    process.exit(1);
  }

  const baseTemplate = fs.readFileSync(indexHtmlPath, 'utf-8');

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
    const { SERVICES, SERVICE_BY_SLUG } = await vite.ssrLoadModule('/src/constants/services.jsx');
    const { CASE_STUDIES, CASE_STUDY_BY_SLUG } = await vite.ssrLoadModule('/src/constants/caseStudies.jsx');

    const BASE_URL = BRAND.url || 'https://www.apexspiderinnovation.com';

    // Define all 16 canonical routes with exact rendering and metadata configuration
    const routes = [
      {
        path: '/',
        render: () => React.createElement(App),
        seo: PAGE_SEO.home,
      },
      {
        path: '/about',
        render: () => React.createElement(AboutPage),
        seo: PAGE_SEO.about,
      },
      {
        path: '/services',
        render: () => React.createElement(ServicesPage),
        seo: PAGE_SEO.services,
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
          title: `${s.title} Services | ${BRAND.name}`,
          description: s.fullDesc,
          canonical: `${BASE_URL}/services/${s.slug}`,
        },
      })),
      {
        path: '/portfolio',
        render: () => React.createElement(PortfolioPage),
        seo: PAGE_SEO.portfolio,
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
          title: `${cs.title} | Case Study — ${BRAND.name}`,
          description: cs.overview,
          canonical: `${BASE_URL}/portfolio/${cs.slug}`,
        },
      })),
      {
        path: '/contact',
        render: () => React.createElement(ContactPage),
        seo: PAGE_SEO.contact,
      },
      {
        path: '/privacy',
        render: () => React.createElement(PrivacyPolicy),
        seo: {
          title: `Privacy Policy | ${BRAND.name}`,
          description: `Privacy Policy and data practices for ${BRAND.name}.`,
          canonical: `${BASE_URL}/privacy`,
        },
      },
      {
        path: '/terms',
        render: () => React.createElement(Terms),
        seo: {
          title: `Terms of Service | ${BRAND.name}`,
          description: `Terms of Service and legal agreements for ${BRAND.name}.`,
          canonical: `${BASE_URL}/terms`,
        },
      },
      {
        path: '/security',
        render: () => React.createElement(Security),
        seo: {
          title: `Security Policy | ${BRAND.name}`,
          description: `Security standards, protocols, and data protection practices at ${BRAND.name}.`,
          canonical: `${BASE_URL}/security`,
        },
      },
    ];

    console.log(`Prerendering ${routes.length} routes…\n`);

    for (const route of routes) {
      // 1. Render React tree to string
      const appHtml = renderToString(
        React.createElement(
          StaticRouter,
          { location: route.path },
          route.render()
        )
      );

      // 2. Build route-specific HTML from template
      let html = baseTemplate;

      // Inject rendered markup into #root
      html = html.replace(
        '<div id="root"></div>',
        `<div id="root">${appHtml}</div>`
      );

      const title = route.seo?.title || 'ApexSpider Innovation';
      const description = route.seo?.description || '';
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

      // Update canonical link
      html = html.replace(
        /<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/?>/i,
        `<link rel="canonical" href="${canonical}" />`
      );

      // Update Open Graph tags
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

      // Update Twitter tags
      html = html.replace(
        /<meta\s+name="twitter:title"\s+content="[\s\S]*?"\s*\/?>/i,
        `<meta name="twitter:title" content="${escapeHtml(title)}" />`
      );
      html = html.replace(
        /<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/?>/i,
        `<meta name="twitter:description" content="${escapeHtml(description)}" />`
      );

      // 3. Write out static HTML file
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

        // Ensure parent dir exists for directHtmlFilePath (for nested routes like services/web-development.html)
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
