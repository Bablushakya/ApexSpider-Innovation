/**
 * Services data - Single source of truth
 * Used by both Desktop and Mobile Services components
 */

export const SERVICES = [
  {
    id: 'custom-software',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Custom Software Development',
    desc: 'High-performance applications engineered to address unique business requirements with clean, scalable architecture.',
    bullets: ['Scalable backend architectures', 'Cloud-native deployment pipelines', 'Secure database integrations'],
  },
  {
    id: 'web-app',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Web Application Design',
    desc: 'Bespoke web applications built with modern frameworks, responsive layouts, and interactive visual states.',
    bullets: ['Robust multi-tenant systems', 'Real-time data & dashboards', 'Smooth interface state updates'],
  },
  {
    id: 'ui-ux',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10zM2 12h20" />
      </svg>
    ),
    title: 'UI/UX Design',
    desc: 'User-centered design systems crafted for visual clarity, accessibility, and high adoption rates.',
    bullets: ['High-fidelity mockup prototypes', 'Structured design component tokens', 'Intuitive user journey flows'],
  },
  {
    id: 'app-dev',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    title: 'App Development',
    desc: 'Fast, scalable, and secure Android, iOS, and cross-platform mobile applications optimised for performance and long-term growth.',
    bullets: ['Android & iOS Development', 'Cross-platform Apps', 'Firebase & API Integration', 'App Maintenance'],
  },
  {
    id: 'data-science',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
    title: 'Data Analysis & Data Science',
    desc: 'Transform business data into meaningful insights through analytics, visualisation, machine learning, and predictive models.',
    bullets: ['Business Analytics', 'Interactive Dashboards', 'Machine Learning', 'Python Automation'],
  },
  {
    id: 'support',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    title: 'Technical Support & Maintenance',
    desc: 'Keep your digital products healthy with continuous monitoring, proactive updates, and rapid issue resolution.',
    bullets: ['Automated server diagnostics', 'Proactive patch deployments', 'Uptime monitoring dashboards'],
  },
];

export const PROJECT_TYPES = [
  'Custom Software',
  'Web Application',
  'UI/UX Prototyping',
  'Workflow Automation',
  'Technical Consultation',
];
