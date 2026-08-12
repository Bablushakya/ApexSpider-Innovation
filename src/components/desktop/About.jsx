import React from 'react';
import { motion } from 'framer-motion';
import { ABOUT_CONTENT, CAPABILITIES } from '../../constants/about.jsx';
import { EASE } from '../../constants/animations';
import './About.css';

const capabilityContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const capabilityItemVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(3px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: EASE.premium },
  },
};

export default function About() {
  return (
    <section
      className="about-section section-padding"
      id="about"
      aria-labelledby="about-heading"
    >
      {/* Ambient background blob */}
      <div className="glow-blob glow-blob-teal about-blob" aria-hidden="true" />

      <div className="container about-container">

        {/* ── Left: Story ──────────────────────────────────── */}
        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: EASE.premium }}
        >
          <span className="tag">{ABOUT_CONTENT.tag}</span>
          <h2 id="about-heading" className="about-title">
            {ABOUT_CONTENT.title}
          </h2>
          {ABOUT_CONTENT.paragraphs.map((para, idx) => (
            <p key={idx} className="about-text">{para}</p>
          ))}

          <div className="about-standards-list">
            {ABOUT_CONTENT.standards.map((standard, idx) => (
              <div key={idx} className="standard-item">
                <span className="standard-icon" aria-hidden="true">✓</span>
                <div>
                  <h3 className="standard-title">{standard.title}</h3>
                  <p className="standard-desc">{standard.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Right: Capabilities ──────────────────────────── */}
        <motion.div
          className="about-visual"
          initial={{ opacity: 0, y: 35, scale: 0.98, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: EASE.premium, delay: 0.15 }}
        >
          <div className="capabilities-container glass-panel">
            <h3 className="capabilities-title">Our Capabilities</h3>
            <p className="capabilities-subtitle">
              Services we use to design, build, and scale digital products.
            </p>

            {/* Capabilities grid */}
            <motion.div
              className="capabilities-grid"
              variants={capabilityContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {CAPABILITIES.map((capability) => (
                <motion.div
                  key={capability.id}
                  className="capability-card"
                  variants={capabilityItemVariants}
                  whileHover={{
                    y: -4,
                    borderColor: 'var(--color-accent-teal)',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <div className="capability-icon">
                    {capability.icon}
                  </div>
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
