import React from 'react';
import { motion } from 'framer-motion';
import { ABOUT_CONTENT, CAPABILITIES } from '../../constants/about.jsx';
import { EASE } from '../../constants/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './About.css';

export default function About() {
  const prefersReducedMotion = useReducedMotion();
  const paragraphs = ABOUT_CONTENT.paragraphs || [];
  const standards = ABOUT_CONTENT.standards || [];

  const capabilityContainerVariants = {
    hidden: {},
    visible: { 
      transition: { 
        staggerChildren: prefersReducedMotion ? 0 : 0.1, 
        delayChildren: prefersReducedMotion ? 0 : 0.2 
      } 
    },
  };

  const capabilityItemVariants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 20, 
      filter: prefersReducedMotion ? 'blur(0px)' : 'blur(3px)' 
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { 
        duration: prefersReducedMotion ? 0.01 : 0.6, 
        ease: EASE.premium 
      },
    },
  };

  return (
    <section
      className="about-section section-padding"
      id="about"
      aria-labelledby="about-heading"
    >
      <motion.div 
        className="glow-blob glow-blob-teal about-blob" 
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.15, scale: 1 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ 
          duration: prefersReducedMotion ? 0.01 : 1.5, 
          ease: EASE.smooth 
        }}
      />

      <div className="container about-container">
        {/* ── Left: Story ──────────────────────────────────── */}
        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30, filter: prefersReducedMotion ? 'blur(0px)' : 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.9, ease: EASE.premium }}
        >
          <span className="tag">{ABOUT_CONTENT.tag || 'Company'}</span>
          <h2 id="about-heading" className="about-title">
            {ABOUT_CONTENT.title || 'Building Software with Precision'}
          </h2>
          {paragraphs.map((para, idx) => (
            <motion.p 
              key={idx} 
              className="about-text"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: prefersReducedMotion ? 0.01 : 0.7, 
                ease: EASE.smooth, 
                delay: prefersReducedMotion ? 0 : 0.15 + idx * 0.1 
              }}
            >
              {para}
            </motion.p>
          ))}

          {standards.length > 0 && (
            <motion.div 
              className="about-standards-list"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: prefersReducedMotion ? 0.01 : 0.6, 
                delay: prefersReducedMotion ? 0 : 0.4 
              }}
            >
              {standards.map((standard, idx) => (
                <motion.div 
                  key={idx} 
                  className="standard-item"
                  initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: prefersReducedMotion ? 0.01 : 0.5, 
                    ease: EASE.smooth, 
                    delay: prefersReducedMotion ? 0 : 0.5 + idx * 0.12 
                  }}
                >
                  <span className="standard-icon" aria-hidden="true">✓</span>
                  <div>
                    <h3 className="standard-title">{standard.title}</h3>
                    <p className="standard-desc">{standard.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* ── Right: Capabilities ──────────────────────────── */}
        <motion.div
          className="about-visual"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 35, scale: prefersReducedMotion ? 1 : 0.98, filter: prefersReducedMotion ? 'blur(0px)' : 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.9, ease: EASE.premium, delay: prefersReducedMotion ? 0 : 0.2 }}
        >
          <div className="capabilities-container glass-panel">
            <h3 className="capabilities-title">Engineering Standards</h3>
            <p className="capabilities-subtitle">
              Core benchmarks and architectural standards built into every product.
            </p>

            <motion.div
              className="capabilities-grid"
              variants={capabilityContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {(CAPABILITIES || []).map((capability) => (
                <motion.div
                  key={capability.id}
                  className="capability-card"
                  variants={capabilityItemVariants}
                  whileHover={
                    prefersReducedMotion 
                      ? {} 
                      : {
                          y: -4,
                          borderColor: 'var(--color-accent-teal)',
                          transition: { duration: 0.25, ease: EASE.smooth }
                        }
                  }
                >
                  <motion.div 
                    className="capability-icon"
                    whileHover={
                      prefersReducedMotion 
                        ? {} 
                        : { 
                            scale: 1.1, 
                            rotate: 5,
                            transition: { duration: 0.25, ease: EASE.smooth }
                          }
                    }
                  >
                    {capability.icon}
                  </motion.div>
                  <h4 className="capability-title">{capability.title}</h4>
                  <p className="capability-description">{capability.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
