/**
 * About section data - Single source of truth
 * Used by both Desktop and Mobile About components
 */

export const ABOUT_CONTENT = {
  tag: 'Company',
  title: 'Building Software with Precision',
  paragraphs: [
    'At ApexSpider Innovation, we believe software should be robust, scalable, and visually premium. We partner with growing businesses and startup founders to architect custom web and mobile applications, data-driven solutions, and clean UI systems that ensure operational efficiency and long-term growth.',
    'Our approach prioritises design system integrity, rapid prototyping, and high-fidelity code execution. We write modular, maintainable code and build secure backends to guarantee product velocity.'
  ],
  standards: [
    {
      title: 'Clean Code Standards',
      desc: 'Consistent component structures, lint validation, and documented codebases.'
    },
    {
      title: 'Design-to-Code Fidelity',
      desc: 'Precision styling that matches design guidelines pixel-for-pixel.'
    }
  ]
};

export const CAPABILITIES = [
  {
    id: 'web',
    title: 'Web Development',
    description: 'Modern, scalable websites and web applications.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    id: 'mobile',
    title: 'Mobile Development',
    description: 'High-performance mobile applications with polished user experiences.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
  },
  {
    id: 'data',
    title: 'Data Science & AI',
    description: 'Data-driven solutions, analytics, predictive models, and AI-powered systems.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    id: 'design',
    title: 'UI/UX & Product Design',
    description: 'Clean, intuitive interfaces and user-focused digital experiences.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
];
