import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE } from '../constants/animations';
import { useContactForm } from '../hooks/useContactForm';
import './ProjectInquiryModal.css';

const PROJECT_TYPES = [
  'Web Development',
  'Mobile Development',
  'Data Science & AI',
  'UI/UX & Product Design',
  'Other',
];

const BUDGET_RANGES = [
  'Under ₹25,000',
  '₹25,000 – ₹50,000',
  '₹50,000 – ₹1,00,000',
  '₹1,00,000+',
  'Not sure yet',
];

const INITIAL_FORM = {
  name:        '',
  email:       '',
  phone:       '',
  company:     '',
  projectType: 'Web Development',
  budget:      '',
  message:     '',
};

/**
 * Validation config for the ProjectInquiryModal.
 * Minimum 20-char message — intentionally stricter than the ContactCTA (10).
 * The idPrefix matches the 'inquiry-' prefix used on all input IDs in this modal.
 */
const VALIDATION_CONFIG = {
  minMessageLength:  20,
  nameLabel:         'Name',
  messageLabel:      'Project details',
  requireProjectType: true,
  idPrefix:          'inquiry-',
};

export default function ProjectInquiryModal({ isOpen, onClose }) {
  const {
    formData,
    errors,
    isSubmitting,
    submitResult,
    handleChange,
    handleSubmit,
    handleReset,
  } = useContactForm(INITIAL_FORM, VALIDATION_CONFIG);

  const modalRef      = useRef(null);
  const firstInputRef = useRef(null);

  // Handle body scroll lock when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus first input when modal opens
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 300);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="inquiry-modal-backdrop" onClick={handleBackdropClick}>
          <motion.div
            ref={modalRef}
            className="inquiry-modal-panel"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE.premium }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="inquiry-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="inquiry-modal-close"
              onClick={onClose}
              aria-label="Close project inquiry form"
              type="button"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="inquiry-modal-content">
              {submitResult?.success ? (
                /* Success State */
                <motion.div
                  className="inquiry-success-state"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE.premium }}
                  role="alert"
                  aria-live="assertive"
                >
                  <div className="inquiry-success-icon" aria-hidden="true">
                    <svg
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="8 12 11 15 16 9" />
                    </svg>
                  </div>
                  <h2 className="inquiry-success-title">Project Request Received</h2>
                  <p className="inquiry-success-message">
                    Thank you! Your project request has been sent successfully.
                    Our team will review your requirements and get back to you shortly.
                  </p>
                  <div className="inquiry-success-actions">
                    <button className="btn btn-primary" onClick={handleReset}>
                      Send Another Request
                    </button>
                    <button className="btn btn-secondary" onClick={onClose}>
                      Close
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Form State */
                <>
                  <div className="inquiry-modal-header">
                    <h2 id="inquiry-modal-title" className="inquiry-modal-title">
                      Start Your Project
                    </h2>
                    <p className="inquiry-modal-subtitle">
                      Tell us about your project and our team will get back to you shortly.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="inquiry-form">
                    {/* Accessible live region — announces submission state to screen readers */}
                    <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
                      {isSubmitting && 'Submitting your project request, please wait…'}
                    </div>

                    {/* Error Banner */}
                    {submitResult?.success === false && (
                      <div className="inquiry-error-banner" role="alert" aria-live="assertive">
                        {submitResult.message}
                      </div>
                    )}

                    {/* Name */}
                    <div className="inquiry-form-group">
                      <label htmlFor="inquiry-name" className="inquiry-form-label">
                        Name <span className="inquiry-required" aria-hidden="true">*</span>
                      </label>
                      <input
                        ref={firstInputRef}
                        type="text"
                        id="inquiry-name"
                        name="name"
                        className={`inquiry-form-input${errors.name ? ' inquiry-form-input--error' : ''}`}
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="name"
                        aria-required="true"
                        aria-describedby={errors.name ? 'inquiry-name-error' : undefined}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                        <span id="inquiry-name-error" className="inquiry-form-error" role="alert">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Email */}
                    <div className="inquiry-form-group">
                      <label htmlFor="inquiry-email" className="inquiry-form-label">
                        Email <span className="inquiry-required" aria-hidden="true">*</span>
                      </label>
                      <input
                        type="email"
                        id="inquiry-email"
                        name="email"
                        className={`inquiry-form-input${errors.email ? ' inquiry-form-input--error' : ''}`}
                        placeholder="your.email@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        aria-required="true"
                        aria-describedby={errors.email ? 'inquiry-email-error' : undefined}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <span id="inquiry-email-error" className="inquiry-form-error" role="alert">
                          {errors.email}
                        </span>
                      )}
                    </div>

                    {/* Phone / WhatsApp */}
                    <div className="inquiry-form-group">
                      <label htmlFor="inquiry-phone" className="inquiry-form-label">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        id="inquiry-phone"
                        name="phone"
                        className="inquiry-form-input"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                      />
                    </div>

                    {/* Company / Organization */}
                    <div className="inquiry-form-group">
                      <label htmlFor="inquiry-company" className="inquiry-form-label">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        id="inquiry-company"
                        name="company"
                        className="inquiry-form-input"
                        placeholder="Your company name"
                        value={formData.company}
                        onChange={handleChange}
                        autoComplete="organization"
                      />
                    </div>

                    {/* Project Type */}
                    <div className="inquiry-form-group">
                      <label htmlFor="inquiry-projectType" className="inquiry-form-label">
                        Project Type <span className="inquiry-required" aria-hidden="true">*</span>
                      </label>
                      <select
                        id="inquiry-projectType"
                        name="projectType"
                        className={`inquiry-form-input inquiry-form-select${errors.projectType ? ' inquiry-form-input--error' : ''}`}
                        value={formData.projectType}
                        onChange={handleChange}
                        aria-required="true"
                        aria-describedby={errors.projectType ? 'inquiry-projectType-error' : undefined}
                        aria-invalid={!!errors.projectType}
                      >
                        {PROJECT_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.projectType && (
                        <span id="inquiry-projectType-error" className="inquiry-form-error" role="alert">
                          {errors.projectType}
                        </span>
                      )}
                    </div>

                    {/* Budget Range */}
                    <div className="inquiry-form-group">
                      <label htmlFor="inquiry-budget" className="inquiry-form-label">
                        Budget Range
                      </label>
                      <select
                        id="inquiry-budget"
                        name="budget"
                        className="inquiry-form-input inquiry-form-select"
                        value={formData.budget}
                        onChange={handleChange}
                      >
                        <option value="">Select budget range...</option>
                        {BUDGET_RANGES.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Project Details */}
                    <div className="inquiry-form-group">
                      <label htmlFor="inquiry-message" className="inquiry-form-label">
                        Project Details <span className="inquiry-required" aria-hidden="true">*</span>
                      </label>
                      <textarea
                        id="inquiry-message"
                        name="message"
                        rows={5}
                        className={`inquiry-form-input inquiry-form-textarea${errors.message ? ' inquiry-form-input--error' : ''}`}
                        placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                        value={formData.message}
                        onChange={handleChange}
                        aria-required="true"
                        aria-describedby={errors.message ? 'inquiry-message-error' : undefined}
                        aria-invalid={!!errors.message}
                      />
                      {errors.message && (
                        <span id="inquiry-message-error" className="inquiry-form-error" role="alert">
                          {errors.message}
                        </span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="btn btn-primary inquiry-submit-btn"
                      disabled={isSubmitting}
                      aria-busy={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="inquiry-spinner" aria-hidden="true" />
                          Sending...
                        </>
                      ) : (
                        'Send Project Request'
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
