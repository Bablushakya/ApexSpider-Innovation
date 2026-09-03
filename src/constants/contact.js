/**
 * Contact & Inquiry configuration - Single source of truth
 * Provides distinct copy for Home CTA vs Dedicated Contact Page
 */

/** Copy for Home page bottom Contact CTA */
export const HOME_CONTACT_CONTENT = {
  tag: 'Start a Project',
  title: 'Ready to build something',
  titleHighlight: 'exceptional?',
  description:
    'Turn your concept into high-performance, production-ready software. Send us your requirements and we will define the optimal architecture.',
  infoTitle: 'Direct Engineering Line',
  statusText: 'Accepting new client engagements',
};

/** Copy for dedicated /contact Page */
export const CONTACT_PAGE_CONTENT = {
  tag: 'Project Consultation',
  title: 'Start your technical',
  titleHighlight: 'scoping.',
  description:
    'Share your requirements, operational goals, or product vision. Our senior engineering team will evaluate your project and prepare a tailored roadmap.',
  timelineTitle: 'What Happens Next',
  timelineSteps: [
    {
      step: '01',
      title: 'Initial Review',
      desc: 'Our tech team analyzes your inquiry within 24 business hours.',
    },
    {
      step: '02',
      title: 'Scoping Call',
      desc: 'A focused discussion with a lead engineer to define architecture & scope.',
    },
    {
      step: '03',
      title: 'Detailed Proposal',
      desc: 'A transparent project estimate, architecture plan, and delivery milestones.',
    },
  ],
  guarantees: [
    '24-Hour Response Guarantee',
    'Direct Access to Senior Engineers',
    'Confidential & NDA Protected',
  ],
};

// Default export for backward compatibility
export const CONTACT_CONTENT = HOME_CONTACT_CONTENT;

export const CONTACT_FORM_INITIAL = {
  name: '',
  company: '',
  email: '',
  projectType: 'Web Development',
  budget: '',
  message: '',
};

/**
 * Validation config for the contact form.
 */
export const CONTACT_FORM_VALIDATION = {
  minMessageLength: 10,
  nameLabel: 'Full name',
  messageLabel: 'Project description',
  idPrefix: '',
};

/** Budget range options */
export const BUDGET_OPTIONS = [
  { value: '', label: 'Prefer not to say' },
  { value: 'under-1k', label: 'Under $1,000' },
  { value: '1k-5k', label: '$1,000 – $5,000' },
  { value: '5k-15k', label: '$5,000 – $15,000' },
  { value: '15k-50k', label: '$15,000 – $50,000' },
  { value: '50k-plus', label: '$50,000+' },
];
