import React from 'react';
import { motion } from 'framer-motion';
import { ABOUT_CONTENT, CAPABILITIES } from '../../constants/about.jsx';
import { EASE } from '../../constants/animations';
import './About.css';

export default function MobileAbout() {
  return (
    <section
      className="mobile-about-section section-padding"
      id="about"
      aria-labelledby="about-heading"
    >
      <div className="container">
        <motion.div
          className="mobile-about-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: EASE.premium }}
        >
          <span className="tag">{ABOUT_CONTENT.tag}</span>
          <h2 id="about-heading" className="mobile-about-title">
            {ABOUT_CONTENT.title}
          </h2>
          {ABOUT_CONTENT.paragraphs.map((para, idx) => (
            <p key={idx} className="mobile-about-text">{para}</p>
          ))}

          <div className="mobile-standards-list">
            {ABOUT_CONTENT.standards.map((standard, idx) => (
              <div key={idx} className="mobile-standard-item">
                <span className="standard-icon" aria-hidden="true">✓</span>
                <div>
                  <h3 className="mobile-standard-title">{standard.title}</h3>
                  <p className="mobile-standard-desc">{standard.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mobile-capabilities"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: EASE.premium, delay: 0.15 }}
        >
          <div className="glass-panel mobile-capabilities-container">
            <h3 className="mobile-capabilities-title">Our Capabilities</h3>
            <p className="mobile-capabilities-subtitle">
              Services we use to design, build, and scale digital products.
            </p>

            <div className="mobile-capabilities-grid">
              {CAPABILITIES.map((capability) => (
                <motion.div
                  key={capability.id}
                  className="mobile-capability-card"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE.premium }}
                >
                  <div className="mobile-capability-icon">
                    {capability.icon}
                  </div>
                  <h4 className="mobile-capability-title">{capability.title}</h4>
                  <p className="mobile-capability-description">{capability.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
