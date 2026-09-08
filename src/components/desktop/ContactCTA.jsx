import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BRAND } from '../../constants/brand';
import { CONTACT_CONTENT } from '../../constants/contact';
import { EASE } from '../../constants/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './ContactCTA.css';

export default function ContactCTA() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      className="contact-section section-padding"
      id="contact"
      aria-labelledby="contact-heading"
    >
      {/* Glow background blobs */}
      <motion.div 
        className="glow-blob glow-blob-indigo contact-blob-1" 
        aria-hidden="true"
        initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.8 }}
        whileInView={{ opacity: 0.6, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: prefersReduced ? 0.01 : 1.5, ease: EASE.premium }}
      />
      <motion.div 
        className="glow-blob glow-blob-teal contact-blob-2" 
        aria-hidden="true"
        initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.8 }}
        whileInView={{ opacity: 0.6, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: prefersReduced ? 0.01 : 1.5, ease: EASE.premium, delay: prefersReduced ? 0 : 0.2 }}
      />

      <div className="container contact-cta-container">
        <motion.div
          className="contact-cta-card glass-panel"
          initial={{ opacity: 0, y: prefersReduced ? 0 : 35, scale: prefersReduced ? 1 : 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: prefersReduced ? 0.01 : 0.9, ease: EASE.premium }}
        >
          <div className="contact-cta-content">
            <motion.div 
              className="contact-status-note" 
              role="status" 
              aria-live="polite"
              initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReduced ? 0.01 : 0.6, ease: EASE.premium }}
            >
              <span className="pulse-dot" aria-hidden="true" />
              <span className="status-text">{CONTACT_CONTENT.statusText}</span>
            </motion.div>

            <motion.h2 
              id="contact-heading" 
              className="contact-cta-title"
              initial={{ opacity: 0, y: prefersReduced ? 0 : 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReduced ? 0.01 : 0.7, ease: EASE.premium, delay: prefersReduced ? 0 : 0.1 }}
            >
              {CONTACT_CONTENT.title}{' '}
              <span className="text-gradient-cyan">{CONTACT_CONTENT.titleHighlight}</span>
            </motion.h2>
            
            <motion.p 
              className="contact-cta-desc"
              initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReduced ? 0.01 : 0.7, ease: EASE.premium, delay: prefersReduced ? 0 : 0.2 }}
            >
              {CONTACT_CONTENT.description}
            </motion.p>

            <motion.div 
              className="contact-cta-perks"
              initial={{ opacity: 0, y: prefersReduced ? 0 : 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReduced ? 0.01 : 0.7, ease: EASE.premium, delay: prefersReduced ? 0 : 0.25 }}
            >
              <div className="contact-perk-item">
                <svg className="perk-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>24–48h Scoping Turnaround</span>
              </div>
              <div className="contact-perk-item">
                <svg className="perk-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Direct Principal Architect Access</span>
              </div>
              <div className="contact-perk-item">
                <svg className="perk-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Confidential NDA Protected</span>
              </div>
            </motion.div>

            <motion.div 
              className="contact-cta-actions"
              initial={{ opacity: 0, y: prefersReduced ? 0 : 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReduced ? 0.01 : 0.7, ease: EASE.premium, delay: prefersReduced ? 0 : 0.3 }}
            >
              <Link to="/contact" className="btn btn-primary contact-main-btn" id="home-start-project-btn">
                <span>Start a Project</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <a href={`mailto:${BRAND.email.primary}`} className="btn btn-secondary contact-email-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>{BRAND.email.primary}</span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
