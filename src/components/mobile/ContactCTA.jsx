import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BRAND } from '../../constants/brand';
import { CONTACT_CONTENT } from '../../constants/contact';
import { EASE } from '../../constants/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './ContactCTA.css';

export default function MobileContactCTA() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      className="mobile-contact-section section-padding"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="container">
        <motion.div
          className="mobile-contact-card glass-panel"
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: prefersReduced ? 0.01 : 0.8, ease: EASE.premium }}
        >
          <div className="mobile-contact-status-note">
            <span className="pulse-dot" aria-hidden="true" />
            <span className="status-text">{CONTACT_CONTENT.statusText}</span>
          </div>

          <motion.h2 
            id="contact-heading" 
            className="mobile-contact-title"
            initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReduced ? 0.01 : 0.7, ease: EASE.premium, delay: prefersReduced ? 0 : 0.1 }}
          >
            {CONTACT_CONTENT.title}{' '}
            <span className="text-gradient-cyan">{CONTACT_CONTENT.titleHighlight}</span>
          </motion.h2>
          
          <motion.p 
            className="mobile-contact-desc"
            initial={{ opacity: 0, y: prefersReduced ? 0 : 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReduced ? 0.01 : 0.7, ease: EASE.premium, delay: prefersReduced ? 0 : 0.2 }}
          >
            {CONTACT_CONTENT.description}
          </motion.p>

          <div className="mobile-contact-perks">
            <div className="mobile-perk-item">
              <svg className="perk-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>24–48h Scoping Response</span>
            </div>
            <div className="mobile-perk-item">
              <svg className="perk-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Confidential & NDA Protected</span>
            </div>
          </div>

          <div className="mobile-contact-actions">
            <Link to="/contact" className="btn btn-primary mobile-cta-btn" id="mobile-start-project-btn">
              <span>Start a Project</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <a href={`mailto:${BRAND.email.primary}`} className="mobile-contact-email-link">
              Direct: {BRAND.email.primary}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
