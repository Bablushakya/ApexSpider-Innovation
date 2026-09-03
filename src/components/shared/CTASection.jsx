import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EASE } from '../../constants/animations';
import './CTASection.css';

/**
 * CTASection — consistent page-ending call-to-action block.
 * @param {string} [heading]     - Main heading text
 * @param {string} [body]        - Supporting description
 * @param {string} [primaryBtn]  - Primary button label
 * @param {string} [primaryHref] - Primary button destination
 * @param {string} [secondaryBtn]  - Secondary button label
 * @param {string} [secondaryHref] - Secondary button destination
 */
export default function CTASection({
  heading = "Have an idea? Let's turn it into something real.",
  body = "Tell us what you're trying to build, improve or automate.",
  primaryBtn = 'Start a Project',
  primaryHref = '/contact',
  secondaryBtn = 'View Our Work',
  secondaryHref = '/portfolio',
}) {
  return (
    <section className="cta-section section-padding" aria-labelledby="cta-heading">
      <div className="glow-blob glow-blob-indigo cta-blob-1" aria-hidden="true" />
      <div className="glow-blob glow-blob-teal   cta-blob-2" aria-hidden="true" />

      <div className="container cta-container">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: EASE.premium }}
        >
          <h2 id="cta-heading" className="cta-heading text-gradient">
            {heading}
          </h2>
          {body && <p className="cta-body">{body}</p>}

          <div className="cta-actions">
            <Link to={primaryHref} className="btn btn-primary">
              {primaryBtn}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            {secondaryBtn && (
              <Link to={secondaryHref} className="btn btn-secondary">
                {secondaryBtn}
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
