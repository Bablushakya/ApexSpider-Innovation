/**
 * useContactForm — Shared React hook for contact/inquiry form state.
 *
 * Replaces the duplicated useState / handleChange / handleSubmit /
 * handleReset pattern that previously existed in both ContactCTA.jsx
 * and ProjectInquiryModal.jsx.
 *
 * Each form can still pass its own config (e.g. different minimum message
 * lengths, field labels, etc.) so business rules remain independent.
 *
 * Usage:
 *   import { useContactForm } from '../hooks/useContactForm';
 *
 *   const {
 *     formData, errors, isSubmitting, submitResult,
 *     handleChange, handleSubmit, handleReset,
 *   } = useContactForm(INITIAL_FORM, {
 *     minMessageLength: 10,
 *     idPrefix: '',          // '' for ContactCTA, 'inquiry-' for Modal
 *   });
 */

import { useState } from 'react';
import { submitContactForm } from '../services/contactService';
import { validateContactForm } from '../utils/formValidation';

/**
 * @typedef {Object} ContactFormConfig
 * @property {number}  [minMessageLength=10]   - Minimum message character count.
 * @property {string}  [nameLabel='Name']       - Human-readable label for the name field.
 * @property {string}  [messageLabel='Message'] - Human-readable label for the message field.
 * @property {boolean} [requireProjectType=false] - Validate the projectType field.
 * @property {string}  [idPrefix='']           - Prefix for field IDs (e.g. 'inquiry-').
 */

/**
 * @param {Object}            initialForm   - Initial form data object.
 * @param {ContactFormConfig} [config={}]   - Validation and field configuration.
 */
export function useContactForm(initialForm, config = {}) {
  const { idPrefix = '' } = config;

  const [formData,     setFormData]     = useState(initialForm);
  const [errors,       setErrors]       = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  /** Clear a field's error as the user types. */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  /** Validate → submit → handle result. */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateContactForm(formData, config);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      // Move keyboard focus to the first invalid field for accessibility.
      const firstErrorKey = Object.keys(formErrors)[0];
      document.getElementById(`${idPrefix}${firstErrorKey}`)?.focus();
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    const result = await submitContactForm(formData);
    setIsSubmitting(false);
    setSubmitResult(result);

    if (result.success) {
      setFormData(initialForm);
    }
  };

  /** Reset to initial state (used by "Send Another Message" buttons). */
  const handleReset = () => {
    setSubmitResult(null);
    setFormData(initialForm);
    setErrors({});
  };

  return {
    formData,
    errors,
    isSubmitting,
    submitResult,
    handleChange,
    handleSubmit,
    handleReset,
  };
}
