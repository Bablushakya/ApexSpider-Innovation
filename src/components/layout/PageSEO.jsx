/**
 * PageSEO — Injects per-page SEO metadata into document.head.
 * Manages title, meta description, canonical URL, and Open Graph tags.
 */
import { useEffect } from 'react';
import { BRAND } from '../../constants/brand';

const BASE_URL = BRAND.url;

/**
 * @param {object} props
 * @param {string} props.title        - Page <title>
 * @param {string} props.description  - Meta description
 * @param {string} [props.canonical]  - Canonical URL (full URL)
 * @param {string} [props.ogTitle]    - OG title (falls back to title)
 * @param {string} [props.ogDesc]     - OG description (falls back to description)
 * @param {string} [props.ogImage]    - OG image URL
 */
export default function PageSEO({
  title,
  description,
  canonical,
  ogTitle,
  ogDesc,
  ogImage,
}) {
  useEffect(() => {
    // Title
    if (title) document.title = title;

    // Helper to set meta tag
    const setMeta = (selector, content) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        const [attr, val] = selector.replace(/[\[\]"]/g, ' ').trim().split(/\s+/);
        el.setAttribute(attr, val);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    if (description) {
      setMeta('meta[name="description"]', description);
      setMeta('meta[property="og:description"]', ogDesc || description);
      setMeta('meta[name="twitter:description"]', ogDesc || description);
    }

    if (title || ogTitle) {
      setMeta('meta[property="og:title"]', ogTitle || title);
      setMeta('meta[name="twitter:title"]', ogTitle || title);
    }

    if (ogImage) {
      setMeta('meta[property="og:image"]', ogImage);
      setMeta('meta[name="twitter:image"]', ogImage);
    }

    // Canonical
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      if (!canonicalEl) {
        canonicalEl = document.createElement('link');
        canonicalEl.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.setAttribute('href', canonical);
    }

    // OG URL
    if (canonical) {
      setMeta('meta[property="og:url"]', canonical);
    }

    return () => {
      // Reset to site defaults on unmount
      document.title = 'ApexSpider Innovation | Custom Software, AI & Digital Solutions';
    };
  }, [title, description, canonical, ogTitle, ogDesc, ogImage]);

  return null;
}

/** Pre-built SEO configs for every route */
export const PAGE_SEO = {
  home: {
    title: 'ApexSpider Innovation | Custom Software, AI & Digital Solutions',
    description:
      'Custom software, web applications, AI solutions, data analytics and automation built around your business.',
    canonical: BASE_URL + '/',
  },
  about: {
    title: 'About ApexSpider Innovation | Technology Partner',
    description:
      'ApexSpider Innovation builds custom digital products and business systems — websites, apps, AI solutions and automation designed around how your business operates.',
    canonical: BASE_URL + '/about',
  },
  services: {
    title: 'Software Development Services | ApexSpider Innovation',
    description:
      'Web development, mobile apps, AI solutions, business applications, data analytics and automation — technology built around your business.',
    canonical: BASE_URL + '/services',
  },
  webDevelopment: {
    title: 'Web Development Services | ApexSpider Innovation',
    description:
      'Business websites, custom web applications and database-driven platforms. Built for performance, scalability and your specific business requirements.',
    canonical: BASE_URL + '/services/web-development',
  },
  mobileApp: {
    title: 'Mobile App Development | ApexSpider Innovation',
    description:
      'Android, iOS and cross-platform mobile application development. Business apps designed for real-world use.',
    canonical: BASE_URL + '/services/mobile-app-development',
  },
  aiSolutions: {
    title: 'AI Solutions for Business | ApexSpider Innovation',
    description:
      'Practical AI systems — assistants, intelligent workflows, AI-powered search and business automation built around your data and operations.',
    canonical: BASE_URL + '/services/ai-solutions',
  },
  businessApps: {
    title: 'Business Applications & Custom Software | ApexSpider Innovation',
    description:
      'Admin panels, CRM systems, internal tools and workflow platforms. Custom software built for the way your business operates.',
    canonical: BASE_URL + '/services/business-applications',
  },
  dataAnalytics: {
    title: 'Data Analytics & Business Intelligence | ApexSpider Innovation',
    description:
      'Business dashboards, KPI monitoring, data visualisation and reporting systems. Turn your data into clear business insight.',
    canonical: BASE_URL + '/services/data-analytics',
  },
  automation: {
    title: 'Workflow Automation & API Integrations | ApexSpider Innovation',
    description:
      'API integrations, workflow automation and process optimisation. Connect your systems and reduce repetitive manual work.',
    canonical: BASE_URL + '/services/automation',
  },
  portfolio: {
    title: 'Portfolio | ApexSpider Innovation',
    description:
      'Real projects built by ApexSpider Innovation — websites, landing pages and digital experiences designed around business goals.',
    canonical: BASE_URL + '/portfolio',
  },
  contact: {
    title: 'Start a Project | ApexSpider Innovation',
    description:
      'Tell us what you\'re trying to build, improve or automate. Start your project with ApexSpider Innovation.',
    canonical: BASE_URL + '/contact',
  },
};
