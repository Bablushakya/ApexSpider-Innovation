import React from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../components/layout/PageLayout';
import PageSEO, { PAGE_SEO } from '../components/layout/PageSEO';
import Breadcrumb from '../components/shared/Breadcrumb';
import { useContactForm } from '../hooks/useContactForm';
import {
  CONTACT_PAGE_CONTENT,
  CONTACT_FORM_INITIAL,
  BUDGET_OPTIONS,
} from '../constants/contact';
import { PROJECT_TYPES } from '../constants/services.jsx';
import { BRAND } from '../constants/brand';
import { EASE } from '../constants/animations';
import './ContactPage.css';

export default function ContactPage() {
  const {
    formData,
    errors,
    isSubmitting,
    submitResult,
    handleChange,
    handleSubmit,
    handleReset,
  } = useContactForm(CONTACT_FORM_INITIAL, {
    minMessageLength: 10,
    nameLabel: 'Full name',
    messageLabel: 'Project description',
    idPrefix: 'contact-',
    requireProjectType: false,
  });

  const { tag, title, titleHighlight, description, timelineTitle, timelineSteps, guarantees } =
    CONTACT_PAGE_CONTENT;

  return (
    <PageLayout>
      <PageSEO {...PAGE_SEO.contact} />

      <section className="contact-page-section section-padding">
        <div className="container">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />

          <div className="contact-page-grid">
            {/* Left column — consultation overview & timeline */}
            <motion.div
              className="contact-info-col"
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: EASE.premium }}
            >
              <span className="tag">{tag}</span>
              <h1 className="contact-page-title">
                {title} <span className="text-gradient-cyan">{titleHighlight}</span>
              </h1>
              <p className="contact-page-sub">{description}</p>

              {/* Consultation Timeline */}
              <div className="consultation-timeline-block">
                <h2 className="timeline-heading">{timelineTitle}</h2>
                <div className="consultation-steps">
                  {timelineSteps.map((s) => (
                    <div key={s.step} className="consultation-step-item">
                      <span className="consultation-step-num">{s.step}</span>
                      <div className="consultation-step-body">
                        <h3>{s.title}</h3>
                        <p>{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guarantees Badges */}
              <div className="consultation-guarantees">
                {guarantees.map((g) => (
                  <div key={g} className="guarantee-badge">
                    <svg className="bullet-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{g}</span>
                  </div>
                ))}
              </div>

              <div className="contact-info-divider" />

              <div className="contact-detail-block">
                <div className="contact-status-badge">
                  <span className="status-dot" aria-hidden="true" />
                  Available for new project scoping
                </div>
                <a href={`mailto:${BRAND.email.primary}`} className="contact-email-link">
                  {BRAND.email.primary}
                </a>
              </div>
            </motion.div>

            {/* Right column — form */}
            <motion.div
              className="contact-form-col"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: EASE.premium, delay: 0.1 }}
            >
              <div className="glass-panel contact-form-panel">
                {submitResult?.success ? (
                  <div className="contact-success-state">
                    <div className="success-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <h2>Inquiry Received</h2>
                    <p>{submitResult.message}</p>
                    <button className="btn btn-secondary" onClick={handleReset}>
                      Submit another inquiry
                    </button>
                  </div>
                ) : (
                  <form
                    className="contact-form"
                    onSubmit={handleSubmit}
                    noValidate
                    aria-label="Project scoping form"
                  >
                    {/* Honeypot anti-spam field */}
                    <input
                      type="text"
                      name="website"
                      tabIndex="-1"
                      autoComplete="off"
                      aria-hidden="true"
                      style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
                    />

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="contact-name" className="form-label">
                          Full Name <span aria-hidden="true">*</span>
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          className={`form-input${errors.name ? ' form-input--error' : ''}`}
                          placeholder="Jane Smith"
                          value={formData.name}
                          onChange={handleChange}
                          autoComplete="name"
                          required
                        />
                        {errors.name && <p className="form-error" role="alert">{errors.name}</p>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="contact-company" className="form-label">
                          Company / Organisation
                        </label>
                        <input
                          id="contact-company"
                          name="company"
                          type="text"
                          className="form-input"
                          placeholder="Acme Inc. (optional)"
                          value={formData.company}
                          onChange={handleChange}
                          autoComplete="organization"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-email" className="form-label">
                        Email Address <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        className={`form-input${errors.email ? ' form-input--error' : ''}`}
                        placeholder="jane@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                      />
                      {errors.email && <p className="form-error" role="alert">{errors.email}</p>}
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="contact-projectType" className="form-label">
                          Service Area
                        </label>
                        <select
                          id="contact-projectType"
                          name="projectType"
                          className="form-select"
                          value={formData.projectType}
                          onChange={handleChange}
                        >
                          {PROJECT_TYPES.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="contact-budget" className="form-label">
                          Budget Range
                        </label>
                        <select
                          id="contact-budget"
                          name="budget"
                          className="form-select"
                          value={formData.budget}
                          onChange={handleChange}
                        >
                          {BUDGET_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-message" className="form-label">
                        Project Description <span aria-hidden="true">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        className={`form-textarea${errors.message ? ' form-input--error' : ''}`}
                        placeholder="Outline your requirements, target timeline, business workflows, or any existing software stack to be upgraded."
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        required
                      />
                      {errors.message && <p className="form-error" role="alert">{errors.message}</p>}
                    </div>

                    {submitResult?.success === false && (
                      <div className="form-error-banner" role="alert">
                        {submitResult.message}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="btn btn-primary form-submit-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner" aria-hidden="true" />
                          Sending Inquiry…
                        </>
                      ) : (
                        <>
                          Request Project Scoping
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
