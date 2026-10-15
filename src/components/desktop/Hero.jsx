import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlowHorizonFM from '../ui/GlowHorizonFM';
// import TrustedByMarquee from '../shared/TrustedByMarquee'; // Kept for future use
import { EASE } from '../../constants/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './Hero.css';

// Stats data — Kept in codebase for future use
// const STATS = [
//   { number: '50+',  label: 'Projects Delivered' },
//   { number: '100%', label: 'Client Satisfaction' },
//   { number: '5+',   label: 'Years Experience' },
//   { number: '24h',  label: 'Response Time' },
// ];

const TRUST_TAGS = [
  'Custom Software',
  'AI Solutions',
  'Data & Analytics',
  'Mobile Apps',
  'Business Automation',
];

export default function Hero({ heroReady = false }) {
  const prefersReducedMotion = useReducedMotion();

  const stagger = (delay = 0) => ({
    initial: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 28,
      filter: prefersReducedMotion ? 'blur(0px)' : 'blur(8px)',
    },
    animate: heroReady
      ? { opacity: 1, y: 0, filter: 'blur(0px)' }
      : { opacity: 0, y: prefersReducedMotion ? 0 : 28, filter: prefersReducedMotion ? 'blur(0px)' : 'blur(8px)' },
    transition: {
      duration: prefersReducedMotion ? 0.01 : 0.75,
      ease: EASE.premium,
      delay: prefersReducedMotion ? 0 : delay,
    },
  });

  return (
    <section className="hero-section" id="hero" aria-labelledby="hero-heading">

      {/* Animated background blobs */}
      <div className="hero-blob-1" aria-hidden="true" />
      <div className="hero-blob-2" aria-hidden="true" />

      {/* Horizon glow */}
      <motion.div
        className="hero-glow-wrapper hero-glow-desktop-only"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: heroReady ? 1 : 0 }}
        transition={{ duration: 1.4, ease: EASE.smooth, delay: 0.2 }}
      >
        <GlowHorizonFM variant="top" className="hero-glow" />
      </motion.div>

      <div className="container hero-container">
        <div className="hero-content">

          {/* Eyebrow badge */}
          <motion.div className="hero-badge" {...stagger(0)}>
            <span className="badge-dot" aria-hidden="true" />
            <span className="badge-tag">SOFTWARE • AI • DATA • AUTOMATION</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 id="hero-heading" className="hero-title" {...stagger(0.1)}>
            Build. Automate.{' '}
            <span className="highlight">Scale.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p className="hero-subheadline" {...stagger(0.18)}>
            Scalable software for next-generation businesses.
          </motion.p>

          {/* Description */}
          <motion.p className="hero-description" {...stagger(0.26)}>
            Apex Spider Innovation designs and builds custom digital products, business applications, AI solutions and data systems — engineered around the way your business actually works.
          </motion.p>

          {/* CTAs */}
          <motion.div className="hero-actions" {...stagger(0.34)}>
            <Link to="/contact" className="btn btn-primary">
              Start a Project
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link to="/portfolio" className="btn btn-secondary">
              View Our Work
            </Link>
          </motion.div>

          {/* Stats row — Kept in codebase, commented out for future use
          <motion.div className="hero-stats" {...stagger(0.42)}>
            {STATS.map((stat) => (
              <div key={stat.label} className="hero-stat">
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </motion.div>
          */}

          {/* Trust tags */}
          <motion.div className="trust-strip" {...stagger(0.42)}>
            {TRUST_TAGS.map((tag) => (
              <span key={tag} className="trust-tag">
                <span className="trust-tag-dot" aria-hidden="true" />
                {tag}
              </span>
            ))}
          </motion.div>

        </div>

        {/* Global Trusted By Infinite Marquee — Kept in codebase, commented out for future use
        <motion.div className="hero-trusted-wrapper" {...stagger(0.5)} style={{ width: '100%' }}>
          <TrustedByMarquee title="Trusted by forward-thinking enterprises & global authorities" />
        </motion.div>
        */}
      </div>
    </section>
  );
}
