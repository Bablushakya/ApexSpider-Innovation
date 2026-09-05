/**
 * Single source of truth for brand identity, contact details, and site metadata.
 * All components must import from here — never hardcode these values.
 */

export const BRAND = {
  name: 'Apex Spider Innovation',
  shortName: 'Apex Spider',
  alternateName: 'ApexSpider Innovation',
  tagline: 'Technology That Moves Your Business Forward.',
  description:
    'Apex Spider Innovation builds custom software, scalable web applications, and automation solutions for startups and growing enterprises.',
  footerContactDesc: 'Have a project or technical inquiry? Connect with our engineering team directly.',
  url: 'https://www.apexspiderinnovation.com',
  email: {
    primary: 'info@apexspiderinnovation.com',
    support: 'info@apexspiderinnovation.com',
  },
  social: {
    youtube: 'https://www.youtube.com/@ApexSpiderInnovation',
    instagram: 'https://www.instagram.com/apex_spider_innovation/',
    linkedin: 'https://www.linkedin.com/company/apexspider-innovation',
    twitter: 'https://x.com/Apex_Spider_Ino',
  },
  logo: {
    alt: 'Apex Spider Innovation',
  },
  founded: '2026',
};

export const SITE_META = {
  title: 'Apex Spider Innovation | Custom Software & Web Development',
  description: BRAND.description,
  ogImage: `${BRAND.url}/og-image.png`,
};

/** Desktop & mobile navigation — uses real routes for multi-page architecture */
export const NAV_LINKS = [
  { name: 'Home',      href: '/'         },
  { name: 'About',     href: '/about'    },
  { name: 'Services',  href: '/services', hasDropdown: true },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Contact',   href: '/contact'  },
];

/** Services shown inside the nav dropdown */
export const SERVICE_NAV_ITEMS = [
  { name: 'Web Development',       href: '/services/web-development',        desc: 'Websites and custom web applications.' },
  { name: 'Mobile App Development', href: '/services/mobile-app-development', desc: 'Android, iOS and cross-platform apps.' },
  { name: 'AI Solutions',          href: '/services/ai-solutions',           desc: 'Practical AI systems for business.' },
  { name: 'Business Applications', href: '/services/business-applications',  desc: 'Admin panels, CRMs and internal tools.' },
  { name: 'Data Analytics',        href: '/services/data-analytics',         desc: 'Dashboards, KPIs and reporting.' },
  { name: 'Automation',            href: '/services/automation',             desc: 'Workflows, integrations and process automation.' },
];

export const FOOTER_NAV_LINKS = [
  { name: 'Home',      href: '/'         },
  { name: 'About',     href: '/about'    },
  { name: 'Services',  href: '/services' },
  { name: 'Portfolio', href: '/portfolio'},
  { name: 'Contact',   href: '/contact'  },
];

export const FOOTER_SERVICE_LINKS = [
  { name: 'Web Development',       href: '/services/web-development'        },
  { name: 'Mobile Apps',           href: '/services/mobile-app-development' },
  { name: 'AI Solutions',          href: '/services/ai-solutions'           },
  { name: 'Business Applications', href: '/services/business-applications'  },
  { name: 'Data Analytics',        href: '/services/data-analytics'         },
  { name: 'Automation',            href: '/services/automation'             },
];

export const LEGAL_LINKS = [
  { name: 'Privacy Policy',   href: '/privacy'   },
  { name: 'Terms of Service', href: '/terms'     },
  { name: 'Security',         href: '/security'  },
];
