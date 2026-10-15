import { BRAND } from './brand';

const BASE_URL = BRAND.url;

/** Pre-built SEO configs for every route */
export const PAGE_SEO = {
  home: {
    title: 'Apex Spider Innovation | Custom Software & Web Development',
    description:
      'Apex Spider Innovation builds custom software, scalable web applications, and automation solutions for startups and growing enterprises.',
    canonical: BASE_URL + '/',
  },
  about: {
    title: 'About Apex Spider Innovation | Technology Partner',
    description:
      'Apex Spider Innovation builds custom digital products and business systems — websites, apps, AI solutions and automation designed around how your business operates.',
    canonical: BASE_URL + '/about',
  },
  services: {
    title: 'Software Development Services | Apex Spider Innovation',
    description:
      'Web development, mobile apps, AI solutions, business applications, data analytics and automation — technology built around your business.',
    canonical: BASE_URL + '/services',
  },
  webDevelopment: {
    title: 'Web Development Services | Apex Spider Innovation',
    description:
      'From high-performance business websites to custom web applications, we build digital experiences designed for usability, scalability and growth.',
    canonical: BASE_URL + '/services/web-development',
  },
  mobileApp: {
    title: 'Mobile App Development Services | Apex Spider Innovation',
    description:
      'Android, iOS and cross-platform mobile application development. Business apps designed for real-world use.',
    canonical: BASE_URL + '/services/mobile-app-development',
  },
  aiSolutions: {
    title: 'AI Solutions for Business | Apex Spider Innovation',
    description:
      'Practical AI systems — assistants, intelligent workflows, AI-powered search and business automation built around your data and operations.',
    canonical: BASE_URL + '/services/ai-solutions',
  },
  businessApps: {
    title: 'Business Applications & Custom Software | Apex Spider Innovation',
    description:
      'Admin panels, CRM systems, internal tools and workflow platforms. Custom software built for the way your business operates.',
    canonical: BASE_URL + '/services/business-applications',
  },
  dataAnalytics: {
    title: 'Data Analytics & Business Intelligence | Apex Spider Innovation',
    description:
      'Business dashboards, KPI monitoring, data visualisation and reporting systems. Turn your data into clear business insight.',
    canonical: BASE_URL + '/services/data-analytics',
  },
  automation: {
    title: 'Workflow Automation & API Integrations | Apex Spider Innovation',
    description:
      'API integrations, workflow automation and process optimisation. Connect your systems and reduce repetitive manual work.',
    canonical: BASE_URL + '/services/automation',
  },
  portfolio: {
    title: 'Portfolio | Apex Spider Innovation',
    description:
      'Real projects built by Apex Spider Innovation — websites, landing pages and digital experiences designed around business goals.',
    canonical: BASE_URL + '/portfolio',
  },
  contact: {
    title: 'Start a Project | Apex Spider Innovation',
    description:
      'Tell us what you\'re trying to build, improve or automate. Start your project with Apex Spider Innovation.',
    canonical: BASE_URL + '/contact',
  },
  privacy: {
    title: 'Privacy Policy | Apex Spider Innovation',
    description: 'Privacy Policy and data protection practices for Apex Spider Innovation.',
    canonical: BASE_URL + '/privacy',
  },
  terms: {
    title: 'Terms of Service | Apex Spider Innovation',
    description: 'Terms of Service and legal agreements for Apex Spider Innovation.',
    canonical: BASE_URL + '/terms',
  },
  security: {
    title: 'Security Policy | Apex Spider Innovation',
    description: 'Security standards, protocols, and data protection practices at Apex Spider Innovation.',
    canonical: BASE_URL + '/security',
  },
};
