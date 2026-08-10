/**
 * Single source of truth for brand identity, contact details, and site metadata.
 * All components must import from here — never hardcode these values.
 */

export const BRAND = {
  name: 'ApexSpider Innovation',
  shortName: 'ApexSpider',
  tagline: 'Architecting premium custom web applications and scalable enterprise software solutions.',
  description:
    'ApexSpider Innovation develops premium custom software, scalable web applications, and intelligent digital systems for next-gen startups and growing enterprises.',
  url: 'https://www.apexspiderinnovation.com',
  email: {
    primary: 'info@apexspiderinnovation.com',
    support: 'info@apexspiderinnovation.com',
  },
  social: {
    youtube: 'https://www.youtube.com/@ApexSpiderInnovation',
    instagram: 'https://www.instagram.com/apex_spider_innovation/',
    linkedin: 'https://www.linkedin.com/company/apexspider-innovation',
    twitter: 'https://twitter.com/apexspider',
  },
  logo: {
    alt: 'ApexSpider Innovation Logo',
  },
  founded: '2024',
};

export const SITE_META = {
  title: 'ApexSpider Innovation | Premium Custom Software & Web Solutions',
  description: BRAND.description,
  keywords:
    'ApexSpider Innovation, Custom Software Development, Web Application Design, UI/UX Design, Automation Solutions, React Development, Enterprise Software, Tech Startup',
  ogImage: `${BRAND.url}/og-image.png`,
  twitterHandle: '@apexspider',
};

export const NAV_LINKS = [
  { name: 'Services',     href: '#services'     },
  { name: 'Value',        href: '#value-props'  },
  { name: 'Process',      href: '#process'      },
  { name: 'Work',         href: '#work'         },
  { name: 'About',        href: '#about'        },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'FAQs',         href: '#faq'          },
];

export const FOOTER_NAV_LINKS = [
  { name: 'Services',     href: '#services'     },
  { name: 'Value',        href: '#value-props'  },
  { name: 'Process',      href: '#process'      },
  { name: 'Work',         href: '#work'         },
  { name: 'About',        href: '#about'        },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'FAQs',         href: '#faq'          },
];

export const LEGAL_LINKS = [
  { name: 'Privacy Policy',    href: '/privacy'   },
  { name: 'Terms of Service',  href: '/terms'     },
  { name: 'Security',          href: '/security'  },
];
