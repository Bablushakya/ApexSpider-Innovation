/**
 * Contact form configuration - Single source of truth
 * Used by both Desktop and Mobile ContactCTA components
 */

export const CONTACT_CONTENT = {
  tag: 'Get In Touch',
  title: "Let's build something",
  titleHighlight: 'exceptional',
  description: 'Submit your requirements to initiate an architecture review and obtain a prototype estimate.',
  infoTitle: 'Primary Communications',
  statusText: 'Available for custom sprints'
};

export const CONTACT_FORM_INITIAL = {
  name:        '',
  email:       '',
  projectType: 'Custom Software',
  message:     '',
};

/**
 * Validation config for the ContactCTA form.
 * Minimum 10-char message — intentionally shorter than the modal (20).
 */
export const CONTACT_FORM_VALIDATION = {
  minMessageLength: 10,
  nameLabel:        'Full name',
  messageLabel:     'Project description',
  idPrefix:         '',
};
