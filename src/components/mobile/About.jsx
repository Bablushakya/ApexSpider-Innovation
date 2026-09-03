import React from 'react';
import { motion } from 'framer-motion';
import { ABOUT_CONTENT, CAPABILITIES } from '../../constants/about.jsx';
import { EASE } from '../../constants/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './About.css';

export default function MobileAbout() {
  const prefersReducedMotion = useReducedMotion();
  const paragraphs = ABOUT_CONTENT.paragraphs || [];
  const standards = ABOUT_CONTENT.standards || [];

  return (
    <section
      className="mobile-about-section section-padding"
      id="about"
      aria-labelledby="about-heading"
    >
      <div className="container">
        <motion.div
          className="mobile-about-content"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.8, ease: EASE.premium }}
        >
          <span className="tag">{ABOUT_CONTENT.tag || 'Company'}</span>
          <h2 id="about-heading" className="mobile-about-title">
            {ABOUT_CONTENT.title || 'Building Software with Precision'}
          </h2>
          {paragraphs.map((para, idx) => (
            <motion.p 
              key={idx} 
              className="mobile-about-text"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: prefersReducedMotion ? 0.01 : 0.6, 
                ease: EASE.smooth, 
                delay: prefersReducedMotion ? 0 : 0.15 + idx * 0.1 
              }}
            >
              {para}
            </motion.p>
          ))}

          {standards.length > 0 && (
            <motion.div 
              className="mobile-standards-list"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: prefersReducedMotion ? 0.01 : 0.5, 
                delay: prefersReducedMotion ? 0 : 0.35 
              }}
            >
              {standards.map((standard, idx) => (
                <motion.div 
                  key={idx} 
                  className="mobile-standard-item"
                  initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: prefersReducedMotion ? 0.01 : 0.5, 
                    ease: EASE.smooth, 
                    delay: prefersReducedMotion ? 0 : 0.4 + idx * 0.12 
                  }}
                >
                  <span className="standard-icon" aria-hidden="true">✓</span>
                  <div>
                    <h3 className="mobile-standard-title">{standard.title}</h3>
                    <p className="mobile-standard-desc">{standard.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="mobile-capabilities"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ 
            duration: prefersReducedMotion ? 0.01 : 0.8, 
            ease: EASE.premium, 
            delay: prefersReducedMotion ? 0 : 0.2 
          }}
        >
          <div className="glass-panel mobile-capabilities-container">
            <h3 className="mobile-capabilities-title">Engineering Standards</h3>
            <p className="mobile-capabilities-subtitle">
              Core benchmarks and architectural standards built into every product.
            </p>

            <div className="mobile-capabilities-grid">
              {(CAPABILITIES || []).map((capability, idx) => (
                <motion.div
                  key={capability.id}
                  className="mobile-capability-card"
                  initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: prefersReducedMotion ? 0.01 : 0.6, 
                    ease: EASE.premium, 
                    delay: prefersReducedMotion ? 0 : idx * 0.1 
                  }}
                >
                  <motion.div 
                    className="mobile-capability-icon"
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: prefersReducedMotion ? 0.01 : 0.5, 
                      delay: prefersReducedMotion ? 0 : idx * 0.1 + 0.15 
                    }}
                  >
                    {capability.icon}
                  </motion.div>
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
