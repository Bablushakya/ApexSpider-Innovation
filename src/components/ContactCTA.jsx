import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BRAND } from '../constants/brand';
import { submitContactForm } from '../services/contactService';
import './ContactCTA.css';

const PROJECT_TYPES = [
  'Custom Software',
  'Web Application',
  'UI/UX Prototyping',
  'Workflow Automation',
  'Technical Consultation',
];

const INITIAL_FORM = {
  name:        '',
  email:       '',
  projectType: 'Custom Software',
  message:     '',
};

function validate(data) {
  const errors = {};
  if (!data.name.trim()) {
    errors.name = 'Full name is required.';
  }
  if (!data.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!data.message.trim()) {
    errors.message = 'Project description is required.';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Please provide at least 10 characters.';
  }
  return errors;
}

export default function ContactCTA() {
  const premiumEase = [0.16, 1, 0.3, 1];

  const [formData,     setFormData]     = useState(INITIAL_FORM);
  const [errors,       setErrors]       = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null); // { success, message }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-level error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      // Focus the first field with an error for screen readers
      const firstErrorKey = Object.keys(formErrors)[0];
      document.getElementById(firstErrorKey)?.focus();
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    const result = await submitContactForm(formData);
    setIsSubmitting(false);
    setSubmitResult(result);

    if (result.success) {
      setFormData(INITIAL_FORM);
    }
  };

  const handleReset = () => {
    setSubmitResult(null);
    setFormData(INITIAL_FORM);
    setErrors({});
  };

  return (
    <section
      className="contact-section section-padding"
      id="contact"
      aria-labelledby="contact-heading"
    >
      {/* Glow background blobs */}
      <div className="glow-blob glow-blob-indigo contact-blob-1" aria-hidden="true" />
      <div className="glow-blob glow-blob-teal contact-blob-2"   aria-hidden="true" />

      <div className="container contact-container">
        {/* Left Column */}
        <motion.div
          className="contact-details"
          initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: premiumEase }}
        >
          <span className="tag">Get In Touch</span>
          <h2 id="contact-heading" className="contact-title">
            Let&rsquo;s build something{' '}
            <span className="text-gradient-cyan">exceptional</span>.
          </h2>
          <p className="contact-desc">
            Submit your requirements to initiate an architecture review and obtain a
            prototype estimate.
          </p>

          <div className="contact-info-block">
            <h3 className="info-title">Primary Communications</h3>
            <a href={`mailto:${BRAND.email.primary}`} className="contact-email-link">
              {BRAND.email.primary}
            </a>
          </div>

          <div className="contact-status-note" role="status" aria-live="polite">
            <span className="pulse-dot" aria-hidden="true" />
            <span className="status-text">Available for custom sprints</span>
          </div>
        </motion.div>

        {/* Right Column: Contact Form */}
        <motion.div
          className="contact-form-wrapper"
          initial={{ opacity: 0, y: 35, scale: 0.98, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: premiumEase, delay: 0.15 }}
        >
          <div className="glass-panel contact-card">
            {submitResult?.success ? (
              /* ── Success state ── */
              <div
                className="form-success-message"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
              >
                <div className="success-icon" aria-hidden="true">✓</div>
                <h3>Inquiry Received</h3>
                <p>{submitResult.message}</p>
                <button className="btn btn-primary" onClick={handleReset}>
                  Send Another Message
                </button>
              </div>
            ) : (
              /* ── Form ── */
              <form onSubmit={handleSubmit} noValidate aria-label="Project inquiry form">
                {/* Error summary — only shown after a failed submit */}
                {submitResult?.success === false && (
                  <div
                    className="form-error-banner"
                    role="alert"
                    aria-live="assertive"
                  >
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

                {/* Honeypot — hidden from real users */}
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
