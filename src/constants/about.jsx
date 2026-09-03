/**
 * About page & Home about section content — Single source of truth
 */

export const ABOUT_CONTENT = {
  // Home About Section fields
  tag: 'Company',
  title: 'Building Software with Precision',
  paragraphs: [
    'At ApexSpider Innovation, we believe software should be robust, scalable, and built around real business workflows. We partner with growing businesses and startup founders to architect custom web and mobile applications, data-driven solutions, and clean UI systems that ensure operational efficiency and long-term growth.',
    'Our approach prioritises clean architecture, business-first design, and high-fidelity code execution. We write modular, maintainable code and build secure backends to guarantee product velocity.'
  ],
  standards: [
    {
      title: 'Business-First Architecture',
      desc: 'Workflows analyzed before development to ensure software fits your exact operational needs.'
    },
    {
      title: 'Senior Engineering Standards',
      desc: 'Modular, maintainable codebases with documented API contracts and scalable databases.'
    }
  ],

  // Dedicated /about Page fields
  hero: {
    tag: 'About ApexSpider',
    headline: 'Technology should solve real problems.',
    subheadline: 'Not just look impressive.',
    description:
      'ApexSpider Innovation builds custom digital products and business systems for companies that need technology designed around how they actually operate.',
  },

  whoWeAre: {
    heading: 'Who We Are',
    body: [
      'ApexSpider Innovation is a software and technology company that designs and builds custom digital solutions — from business websites and web applications to mobile apps, AI solutions, data systems and business automation.',
      'We work with businesses that need more than off-the-shelf tools. Our focus is on understanding your business first, then designing and building technology that fits the way you work.',
    ],
  },

  whatWeBelieve: {
    heading: 'What We Believe',
    points: [
      {
        title: 'Technology should fit the business',
        body: 'Software works best when it is designed around your actual workflow — not when your team has to adapt to generic software.',
      },
      {
        title: 'Clarity before complexity',
        body: 'We spend time understanding the problem before proposing a solution. The right answer is not always the most technically complex one.',
      },
      {
        title: 'Build to last',
        body: 'Every system we build is designed with future growth in mind. Technology that cannot scale becomes a liability.',
      },
      {
        title: 'One partner, end to end',
        body: 'From website to application to database to AI to automation — we can handle the full technology layer so you are not coordinating multiple vendors.',
      },
    ],
  },

  ourApproach: {
    heading: 'Our Approach',
    steps: [
      { step: '01', title: 'Discover',  body: 'Analyze business workflows, operational goals, and technical requirements.' },
      { step: '02', title: 'Plan',      body: 'Map data schemas, API contracts, security protocols, and system architecture.' },
      { step: '03', title: 'Design',    body: 'Craft responsive user interfaces and interactive prototypes for seamless usability.' },
      { step: '04', title: 'Build',     body: 'Develop modular codebases, integrate databases/APIs, and perform QA testing.' },
      { step: '05', title: 'Launch',    body: 'Execute staging audits, production rollout, and provide ongoing support.' },
    ],
  },

  expertise: {
    heading: 'What We Build',
    areas: [
      { title: 'Web Development',        desc: 'Websites, web applications and database-driven platforms.' },
      { title: 'Mobile Apps',            desc: 'Android, iOS and cross-platform mobile applications.' },
      { title: 'AI Solutions',           desc: 'Assistants, automation and intelligent business tools.' },
      { title: 'Business Applications',  desc: 'Admin systems, CRMs, internal tools and workflow platforms.' },
      { title: 'Data Analytics',         desc: 'Dashboards, KPI monitoring and business reporting.' },
      { title: 'Automation',             desc: 'API integrations, workflow automation and process optimisation.' },
    ],
  },

  techStack: {
    heading: 'Technology We Work With',
    categories: [
      { name: 'Frontend',       items: ['React', 'JavaScript', 'HTML & CSS', 'Flutter'] },
      { name: 'Backend',        items: ['Node.js', 'Python', 'REST APIs'] },
      { name: 'Databases',      items: ['MySQL', 'MongoDB', 'Firebase'] },
      { name: 'AI & Data',      items: ['OpenAI API', 'LangChain', 'Python', 'Power BI'] },
      { name: 'Infrastructure', items: ['Vercel', 'Cloud hosting', 'Version control'] },
    ],
  },

  cta: {
    heading: 'Partner with Senior Engineers.',
    body: "Let's architect a technology foundation designed for scale and long-term reliability.",
    primaryBtn: 'Start a Project',
    secondaryBtn: 'View Our Work',
  },
};

/** Engineering and Quality Standards for the Home About section (replaces duplicate services) */
export const ENGINEERING_STANDARDS = [
  {
    id: 'senior-eng',
    title: 'Senior Engineering',
    description: 'Modular, maintainable codebases with documented API contracts.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: 'biz-first',
    title: 'Business-First Design',
    description: 'Workflows analyzed prior to coding so systems match real operations.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    id: 'security',
    title: 'Built-in Security',
    description: 'Input sanitization, parameterized queries, and OWASP compliance.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: 'performance',
    title: 'Speed & Optimization',
    description: 'Sub-second page speeds, optimized querying, and lightweight bundles.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    id: 'integration',
    title: 'Seamless Integrations',
    description: 'Connecting external APIs, payment gateways, and business databases.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    id: 'direct-comms',
    title: 'Direct Lead Access',
    description: 'Transparent communication directly with technical engineers.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

// Alias for backward compatibility if imported elsewhere
export const CAPABILITIES = ENGINEERING_STANDARDS;
