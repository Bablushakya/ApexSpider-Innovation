/**
 * formValidation.js — Shared, configurable contact-form validation.
 *
 * Both ContactCTA and ProjectInquiryModal use this module.
 * Each form can pass its own config to keep intentionally different
 * rules (e.g. different minimum message lengths).
 *
 * Usage:
 *   import { validateContactForm } from '../utils/formValidation';
 *
 *   // ContactCTA (min 10 chars)
 *   const errors = validateContactForm(formData, { minMessageLength: 10 });
 *
 *   // ProjectInquiryModal (min 20 chars, projectType required)
 *   const errors = validateContactForm(formData, {
 *     minMessageLength: 20,
 *     requireProjectType: true,
 *   });
 */

/** Reusable email regex — same pattern used everywhere previously */
const EMAIL_REGEX = /\S+@\S+\.\S+/;

/**
 * @typedef {Object} ValidationConfig
 * @property {number}  [minMessageLength=10]   - Minimum characters for the message field.
 * @property {string}  [nameLabel='Name']       - Human-readable label for name errors.
 * @property {string}  [messageLabel='Message'] - Human-readable label for message errors.
 * @property {boolean} [requireProjectType=false] - Whether projectType is a required field.
 */

/**
 * @typedef {Object} FormData
 * @property {string} name
 * @property {string} email
 * @property {string} [message]
 * @property {string} [projectType]
 */

/**
 * Validates contact/inquiry form data and returns a plain error map.
 *
 * @param   {FormData}         data
 * @param   {ValidationConfig} [config]
 * @returns {Record<string, string>}  An object whose keys are field names and
 *                                   values are the human-readable error strings.
 *                                   An empty object means the form is valid.
 */
export function validateContactForm(data, config = {}) {
  const {
    minMessageLength = 10,
    nameLabel        = 'Name',
    messageLabel     = 'Message',
    requireProjectType = false,
  } = config;

  const errors = {};

  // ── Name ──────────────────────────────────────────────────────────────────
  if (!data.name?.trim()) {
    errors.name = `${nameLabel} is required.`;
  }

  // ── Email ─────────────────────────────────────────────────────────────────
  if (!data.email?.trim()) {
    errors.email = 'Email address is required.';
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  // ── Project type (optional gate) ──────────────────────────────────────────
  if (requireProjectType && !data.projectType) {
    errors.projectType = 'Please select a project type.';
  }

  // ── Message ───────────────────────────────────────────────────────────────
  const trimmedMessage = data.message?.trim() ?? '';
  if (!trimmedMessage) {
    errors.message = `${messageLabel} is required.`;
  } else if (trimmedMessage.length < minMessageLength) {
    errors.message = `Please provide at least ${minMessageLength} characters.`;
  }

  return errors;
}
