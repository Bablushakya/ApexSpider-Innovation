/**
 * Services data - Single source of truth
 * Used across Services overview, Service detail pages, navigation, and contact form.
 */

export const SERVICES = [
  {
    id: 'web-development',
    slug: 'web-development',
    number: '01',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M9 9l3 3-3 3M13 15h3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Web Development',
    shortDesc: 'Business websites, e-commerce platforms and custom web applications.',
    seoDesc: 'Custom websites and web applications built for usability, scalability and growth. Every project starts with your business requirements — not a template.',
    fullDesc:
      'From high-performance business websites to custom web applications, we build digital experiences designed for usability, scalability and growth. Every project starts with understanding your business — not a template.',
    capabilities: [
      'Corporate and business websites',
      'E-commerce platforms',
      'Custom web applications',
      'Database-driven platforms',
      'Admin dashboards and portals',
      'Landing pages with lead capture',
      'Performance and SEO optimisation',
      'API integrations',
    ],
    businessProblems: [
      'Your current website does not represent your business professionally',
      'You need a custom platform that off-the-shelf tools cannot provide',
      'Your website is slow, hard to maintain or not mobile-friendly',
      'You need a web application connected to your business data',
    ],
    techStack: ['React', 'JavaScript', 'HTML & CSS', 'Node.js', 'Python', 'MySQL', 'MongoDB', 'APIs & REST'],
    faqItems: [
      {
        q: 'What types of websites do you build?',
        a: 'We build corporate websites, business landing pages, e-commerce platforms, custom web applications and database-driven platforms. Every project is built around your specific requirements rather than adapted from a generic template.',
      },
      {
        q: 'Do you handle SEO as part of web development?',
        a: 'Yes. Technical SEO foundations — including clean URL structure, semantic HTML, meta tags, page speed and mobile responsiveness — are built into every website we develop.',
      },
      {
        q: 'Can you build a web application connected to our business data?',
        a: 'Yes. We can build web applications that connect to your existing databases, APIs and backend systems, providing your team and customers with a purpose-built interface for your data.',
      },
      {
        q: 'How long does a web project typically take?',
        a: 'Timelines depend on the scope and complexity. A straightforward business website may take 2–4 weeks, while a custom web application with database integration may take 6–12 weeks. We define the timeline after understanding your specific requirements.',
      },
    ],
  },
  {
    id: 'mobile-app-development',
    slug: 'mobile-app-development',
    number: '02',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <circle cx="12" cy="18" r="1" fill="currentColor" />
        <path d="M9 6h6" strokeLinecap="round" />
      </svg>
    ),
    title: 'Mobile App Development',
    shortDesc: 'Scalable mobile applications designed for real-world business use.',
    seoDesc: 'Android, iOS and cross-platform mobile apps built for real-world business use. We focus on usability, performance and seamless backend integration.',
    fullDesc:
      'We design and develop mobile applications that work reliably in the real world. Whether you need an Android app, iOS app or a cross-platform solution, we focus on usability, performance and seamless backend integration.',
    capabilities: [
      'Android application development',
      'iOS application development',
      'Cross-platform development (Flutter)',
      'Business workflow applications',
      'Customer-facing mobile apps',
      'Backend API integration',
      'Database and authentication systems',
      'App maintenance and updates',
    ],
    businessProblems: [
      'Your team needs a mobile tool to manage operations on the go',
      'Your customers need a mobile interface for your service',
      'You need a mobile app connected to your existing backend',
      'Your current app is outdated or difficult to maintain',
    ],
    techStack: ['Flutter', 'Dart', 'Firebase', 'REST APIs', 'Android SDK', 'iOS SDK', 'MySQL', 'MongoDB'],
    faqItems: [
      {
        q: 'Do you build for Android, iOS or both?',
        a: 'We develop for both Android and iOS. Using cross-platform technologies such as Flutter, we can build a single codebase that runs on both platforms, which is cost-effective and ensures consistent behaviour across devices.',
      },
      {
        q: 'Can the mobile app connect to our existing backend systems?',
        a: 'Yes. We can build the mobile app to integrate with your existing APIs, databases, authentication systems and third-party services.',
      },
      {
        q: 'Do you provide ongoing support after launch?',
        a: 'Yes. We provide ongoing maintenance, bug fixes, performance improvements and feature updates after the initial launch.',
      },
    ],
  },
  {
    id: 'ai-solutions',
    slug: 'ai-solutions',
    number: '03',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" />
        <path d="M12 6v6l4 2" strokeLinecap="round" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
    title: 'AI Solutions',
    shortDesc: 'Practical AI systems built around your business requirements.',
    seoDesc: 'Practical AI systems built for real business problems — customer assistants, intelligent workflows and AI integrations designed around your data and operations.',
    fullDesc:
      'We build AI solutions that solve real business problems — not AI for the sake of AI. From customer-facing assistants to intelligent internal tools, we design AI systems around your workflows and data.',
    capabilities: [
      'AI customer assistants and chatbots',
      'AI-powered product and knowledge search',
      'Intelligent workflow automation',
      'RAG (Retrieval-Augmented Generation) systems',
      'AI-assisted internal tools',
      'Business process automation with AI',
      'API-based AI integrations',
      'Predictive data systems',
    ],
    businessProblems: [
      'Your team spends too much time answering repetitive customer queries',
      'You have business data that could power smarter search or recommendations',
      'You need to automate complex decision-making processes',
      'You want to add intelligent capabilities to an existing application',
    ],
    techStack: ['Python', 'OpenAI API', 'LangChain', 'RAG pipelines', 'REST APIs', 'MySQL', 'MongoDB', 'Automation frameworks'],
    faqItems: [
      {
        q: 'What kinds of AI solutions do you build?',
        a: 'We build AI assistants, intelligent search systems, knowledge assistants, workflow automation tools, and AI integrations built on top of AI APIs. All solutions are designed around real business use cases rather than generic AI features.',
      },
      {
        q: 'Can you integrate AI into our existing business system?',
        a: 'Yes. We can add AI capabilities to existing applications — for example, adding an intelligent search layer to an existing product catalogue, or integrating an AI assistant into your customer support workflow.',
      },
      {
        q: 'Will AI replace our team?',
        a: 'No. AI is most effective when it assists your team rather than replaces it. We build AI tools that handle repetitive, time-consuming tasks — giving your team more time to focus on work that requires human judgement and relationships.',
      },
    ],
  },
  {
    id: 'business-applications',
    slug: 'business-applications',
    number: '04',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
        <path d="M13 13h4M13 17h4" strokeLinecap="round" />
      </svg>
    ),
    title: 'Business Applications',
    shortDesc: 'Admin panels, CRM-style systems, internal tools and workflow platforms.',
    seoDesc: 'Custom admin panels, CRM systems and internal tools built for the way your business operates. Replace spreadsheets with purpose-built software.',
    fullDesc:
      'Custom software built for the way your business actually operates. We design and develop business applications that centralise your operations, connect your data and replace disconnected spreadsheets and manual processes.',
    capabilities: [
      'Admin dashboards and management panels',
      'CRM-style customer management systems',
      'Order and inventory management',
      'Internal workflow platforms',
      'Role-based access management',
      'Database-driven business tools',
      'Reporting and operational dashboards',
      'Multi-user business systems',
    ],
    businessProblems: [
      'Your team manages critical operations in spreadsheets',
      'You need a centralised system to manage customers, orders or inventory',
      'Different parts of your business use disconnected tools',
      'You need role-based access and accountability in your systems',
    ],
    techStack: ['React', 'Node.js', 'Python', 'MySQL', 'MongoDB', 'REST APIs', 'Authentication systems', 'Cloud infrastructure'],
    faqItems: [
      {
        q: 'What makes a custom business application better than off-the-shelf software?',
        a: 'Off-the-shelf software is built for a general audience and often requires your business to adapt its processes to the software. A custom application is built around your actual workflow — so your team gets exactly the tools they need, without the features they do not.',
      },
      {
        q: 'Can you build a system with different permission levels for different users?',
        a: 'Yes. Role-based access control is a standard capability we implement in business applications — ensuring that different users see only the information and actions relevant to their role.',
      },
      {
        q: 'Can the system connect to our existing database or tools?',
        a: 'Yes. We can build applications that connect to existing databases, integrate with third-party tools via API, and interact with your current business systems.',
      },
    ],
  },
  {
    id: 'data-analytics',
    slug: 'data-analytics',
    number: '05',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M18 20V10M12 20V4M6 20v-6" strokeLinecap="round" />
        <path d="M2 20h20" strokeLinecap="round" />
      </svg>
    ),
    title: 'Data Analytics',
    shortDesc: 'Business dashboards, KPI monitoring, reporting and decision-support systems.',
    seoDesc: 'Business intelligence dashboards, KPI monitoring and automated reporting. Turn your data into clear, actionable insight for better decisions.',
    fullDesc:
      'Turn your business data into clear, actionable insight. We build dashboards, reporting systems and analytics tools that give you visibility into what is actually happening in your business — and help you make better decisions.',
    capabilities: [
      'Business intelligence dashboards',
      'KPI monitoring and tracking',
      'Custom reporting systems',
      'Data visualisation',
      'Database design and management',
      'Performance tracking tools',
      'Automated business reports',
      'Data pipeline design',
    ],
    businessProblems: [
      'You cannot see what is happening in your business without manual reporting',
      'Your data is scattered across multiple systems with no unified view',
      'Decision-making is slow because getting the right data takes too long',
      'You want to track key business metrics in real time',
    ],
    techStack: ['Python', 'SQL', 'MySQL', 'MongoDB', 'Power BI', 'Data visualisation libraries', 'REST APIs', 'Automated pipelines'],
    faqItems: [
      {
        q: 'Can you connect data from multiple sources into a single dashboard?',
        a: 'Yes. We can design systems that pull data from multiple databases, APIs and business tools into a single unified dashboard view.',
      },
      {
        q: 'Do you build automated reports?',
        a: 'Yes. We can build reporting systems that automatically generate and distribute business reports on a defined schedule, eliminating the need for manual data collection.',
      },
      {
        q: 'Can you help us organise and structure our existing business data?',
        a: 'Yes. Database design and data organisation are part of what we do. We can help you structure your data in a way that makes it easier to query, analyse and build tools on top of.',
      },
    ],
  },
  {
    id: 'automation',
    slug: 'automation',
    number: '06',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: 'Automation',
    shortDesc: 'Workflow automation, API integrations and repetitive-process optimisation.',
    seoDesc: 'API integrations, workflow automation and process optimisation. Connect your systems and free your team from repetitive manual work.',
    fullDesc:
      'Reduce repetitive work. Connect your systems. Give your team more time to focus on the work that matters. We design and build automation solutions that make your business operations faster, more reliable and easier to manage.',
    capabilities: [
      'API integration and system connectivity',
      'Form-to-database workflows',
      'Email and notification automation',
      'Data synchronisation between systems',
      'Internal business workflow automation',
      'AI-assisted automation',
      'Reporting and document automation',
      'Operational process optimisation',
    ],
    businessProblems: [
      'Your team manually transfers data between systems',
      'Repetitive tasks consume hours that could be spent on higher-value work',
      'Your systems do not communicate with each other effectively',
      'You want processes to trigger automatically based on business events',
    ],
    techStack: ['Python', 'Node.js', 'REST APIs', 'Webhooks', 'MySQL', 'MongoDB', 'Email APIs', 'Task schedulers'],
    faqItems: [
      {
        q: 'What types of automation do you build?',
        a: 'We build API integrations, form-to-database workflows, email automation, data synchronisation between systems, scheduled reporting, and AI-assisted automation tools. The scope depends on your specific workflow requirements.',
      },
      {
        q: 'Can you connect our existing tools and software via API?',
        a: 'Yes. If the tools you use expose an API, we can connect them. We can build the integration layer that allows your systems to communicate and share data automatically.',
      },
      {
        q: 'How do you approach automation projects?',
        a: 'We start by understanding the manual process in detail — who does it, how often, what data is involved, and what the desired outcome is. We then design an automation solution around the actual workflow rather than a generic template.',
      },
    ],
  },
];

/** Service slugs mapped for quick lookup */
export const SERVICE_BY_SLUG = Object.fromEntries(
  SERVICES.map((s) => [s.slug, s])
);

/** Contact form project type options */
export const PROJECT_TYPES = [
  'Web Development',
  'Mobile App Development',
  'AI Solutions',
  'Business Applications',
  'Data Analytics',
  'Automation',
  'Other',
];
