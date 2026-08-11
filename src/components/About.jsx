import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const premiumEase = [0.16, 1, 0.3, 1];

/* ── Core Capabilities ─────────────────────────────────── */
const CAPABILITIES = [
  {
    id: 'web',
    title: 'Web Development',
    description: 'Modern, scalable websites and web applications.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    id: 'mobile',
    title: 'Mobile Development',
    description: 'High-performance mobile applications with polished user experiences.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
  },
  {
    id: 'data',
    title: 'Data Science & AI',
    description: 'Data-driven solutions, analytics, predictive models, and AI-powered systems.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    id: 'design',
    title: 'UI/UX & Product Design',
    description: 'Clean, intuitive interfaces and user-focused digital experiences.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
];

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
    transition: { duration: 0.6, ease: premiumEase },
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
          transition={{ duration: 0.9, ease: premiumEase }}
        >
          <span className="tag">Company</span>
          <h2 id="about-heading" className="about-title">
            Building Software with Precision
          </h2>
          <p className="about-text">
            At ApexSpider Innovation, we believe software should be robust, scalable, and
            visually premium. We partner with growing businesses and startup founders to
            architect custom web and mobile applications, data-driven solutions, and clean
            UI systems that ensure operational efficiency and long-term growth.
          </p>
          <p className="about-text">
            Our approach prioritises design system integrity, rapid prototyping, and
            high-fidelity code execution. We write modular, maintainable code and build
            secure backends to guarantee product velocity.
          </p>

          <div className="about-standards-list">
            <div className="standard-item">
              <span className="standard-icon" aria-hidden="true">✓</span>
              <div>
                <h3 className="standard-title">Clean Code Standards</h3>
                <p className="standard-desc">
                  Consistent component structures, lint validation, and documented codebases.
                </p>
              </div>
            </div>
            <div className="standard-item">
              <span className="standard-icon" aria-hidden="true">✓</span>
              <div>
                <h3 className="standard-title">Design-to-Code Fidelity</h3>
                <p className="standard-desc">
                  Precision styling that matches design guidelines pixel-for-pixel.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Right: Capabilities ──────────────────────────── */}
        <motion.div
          className="about-visual"
          initial={{ opacity: 0, y: 35, scale: 0.98, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: premiumEase, delay: 0.15 }}
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
