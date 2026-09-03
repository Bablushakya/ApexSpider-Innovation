import React from 'react';
import { motion } from 'framer-motion';
import { BRAND } from '../../constants/brand';
import { PROJECT_TYPES } from '../../constants/services.jsx';
import { CONTACT_CONTENT, CONTACT_FORM_INITIAL, CONTACT_FORM_VALIDATION } from '../../constants/contact';
import { EASE } from '../../constants/animations';
import { useContactForm } from '../../hooks/useContactForm';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './ContactCTA.css';

export default function MobileContactCTA() {
  const {
    formData,
    errors,
    isSubmitting,
    submitResult,
    handleChange,
    handleSubmit,
    handleReset,
  } = useContactForm(CONTACT_FORM_INITIAL, CONTACT_FORM_VALIDATION);
  
  const prefersReduced = useReducedMotion();

  return (
    <section
      className="mobile-contact-section section-padding"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="container">
        <motion.div
          className="mobile-contact-details"
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: prefersReduced ? 0.01 : 0.8, ease: EASE.premium }}
        >
          <motion.span 
            className="tag"
            initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReduced ? 0.01 : 0.6, ease: EASE.premium, delay: prefersReduced ? 0 : 0.1 }}
          >
            {CONTACT_CONTENT.tag}
          </motion.span>
          
          <motion.h2 
            id="contact-heading" 
            className="mobile-contact-title"
            initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReduced ? 0.01 : 0.7, ease: EASE.premium, delay: prefersReduced ? 0 : 0.15 }}
          >
            {CONTACT_CONTENT.title}{' '}
            <span className="text-gradient-cyan">{CONTACT_CONTENT.titleHighlight}</span>.
          </motion.h2>
          
          <motion.p 
            className="mobile-contact-desc"
            initial={{ opacity: 0, y: prefersReduced ? 0 : 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReduced ? 0.01 : 0.7, ease: EASE.premium, delay: prefersReduced ? 0 : 0.25 }}
          >
            {CONTACT_CONTENT.description}
          </motion.p>

          <motion.div 
            className="mobile-contact-info-block"
            initial={{ opacity: 0, x: prefersReduced ? 0 : -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReduced ? 0.01 : 0.7, ease: EASE.premium, delay: prefersReduced ? 0 : 0.35 }}
          >
            <h3 className="mobile-info-title">{CONTACT_CONTENT.infoTitle}</h3>
            <a href={`mailto:${BRAND.email.primary}`} className="mobile-contact-email-link">
              {BRAND.email.primary}
            </a>
          </motion.div>

          <motion.div 
            className="mobile-contact-status-note"
            initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReduced ? 0.01 : 0.7, ease: EASE.premium, delay: prefersReduced ? 0 : 0.45 }}
          >
            <span className="pulse-dot" aria-hidden="true" />
            <span className="status-text">{CONTACT_CONTENT.statusText}</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="mobile-contact-form-wrapper"
          initial={{ opacity: 0, y: prefersReduced ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: prefersReduced ? 0.01 : 0.8, ease: EASE.premium, delay: prefersReduced ? 0 : 0.15 }}
        >
          <div className="glass-panel mobile-contact-card">
            {submitResult?.success ? (
              <div className="form-success-message" role="alert">
                <div className="success-icon" aria-hidden="true">✓</div>
                <h3>Inquiry Received</h3>
                <p>{submitResult.message}</p>
                <button className="btn btn-primary" onClick={handleReset}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
                  {isSubmitting && 'Submitting your inquiry, please wait…'}
                </div>

                {submitResult?.success === false && (
                  <div className="form-error-banner" role="alert">
                    {submitResult.message}
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Full Name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={`form-input${errors.name ? ' form-input--error' : ''}`}
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    aria-required="true"
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <span id="name-error" className="form-error" role="alert">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address <span aria-hidden="true">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-input${errors.email ? ' form-input--error' : ''}`}
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    aria-required="true"
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <span id="email-error" className="form-error" role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="projectType" className="form-label">
                    Project Category
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    className="form-input form-select"
                    value={formData.projectType}
                    onChange={handleChange}
                  >
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Project Description <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className={`form-input form-textarea${errors.message ? ' form-input--error' : ''}`}
                    placeholder="Describe your architecture requirements, timeline details, or visual preferences…"
                    value={formData.message}
                    onChange={handleChange}
                    aria-required="true"
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <span id="message-error" className="form-error" role="alert">
                      {errors.message}
                    </span>
                  )}
                </div>

                <input
                  type="checkbox"
                  name="botcheck"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  aria-hidden="true"
                  readOnly
                />

                <button
                  type="submit"
                  className="btn btn-primary btn-submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    'Submit Inquiry'
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
