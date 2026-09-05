import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlowHorizonFM from '../ui/GlowHorizonFM';
import { EASE } from '../../constants/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './Hero.css';

export default function Hero({ heroReady = false }) {
  const prefersReducedMotion = useReducedMotion();

  const stagger = (delay = 0) => ({
    initial: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 30, 
      filter: prefersReducedMotion ? 'blur(0px)' : 'blur(8px)' 
    },
    animate: heroReady
      ? { 
          opacity: 1, 
          y: 0, 
          filter: 'blur(0px)' 
        }
      : { 
          opacity: 0, 
          y: prefersReducedMotion ? 0 : 30, 
          filter: prefersReducedMotion ? 'blur(0px)' : 'blur(8px)' 
        },
    transition: { 
      duration: prefersReducedMotion ? 0.01 : 0.7, 
      ease: EASE.premium, 
      delay: prefersReducedMotion ? 0 : delay 
    },
  });

  return (
    <section className="hero-section" id="hero" aria-labelledby="hero-heading">

      <motion.div 
        className="hero-glow-wrapper hero-glow-desktop-only" 
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: heroReady ? 1 : 0 }}
        transition={{ duration: 1.2, ease: EASE.smooth, delay: 0.1 }}
      >
        <GlowHorizonFM variant="top" className="hero-glow" />
      </motion.div>

      <div className="container hero-container">
        <div className="hero-content">

          {/* Badge Eyebrow */}
          <motion.div className="hero-badge" {...stagger(0)}>
            <span className="badge-tag">SOFTWARE • AI • DATA • AUTOMATION</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 id="hero-heading" className="hero-title" {...stagger(0.1)}>
            Build. Automate. <span className="text-gradient-cyan">Scale.</span>
          </motion.h1>

          <motion.p className="hero-subheadline" {...stagger(0.18)}>
            Scalable software for next-generation businesses.
          </motion.p>

          {/* Description */}
          <motion.p className="hero-description" {...stagger(0.26)}>
            Apex Spider Innovation designs and builds custom digital products, business applications, AI solutions and data systems around the way your business actually works.
          </motion.p>

          {/* CTAs */}
          <motion.div className="hero-actions" {...stagger(0.34)}>
            <Link to="/contact" className="btn btn-primary">
              Start a Project
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link to="/portfolio" className="btn btn-secondary">
              View Our Work
            </Link>
          </motion.div>

          {/* Trust / Capability Strip */}
          <motion.div className="trust-strip" {...stagger(0.42)}>
            <div className="trust-item">
              <span className="trust-label">CUSTOM SOFTWARE</span>
            </div>
            <div className="trust-divider">•</div>
            <div className="trust-item">
              <span className="trust-label">AI SOLUTIONS</span>
            </div>
            <div className="trust-divider">•</div>
            <div className="trust-item">
              <span className="trust-label">DATA & ANALYTICS</span>
            </div>
            <div className="trust-divider">•</div>
            <div className="trust-item">
              <span className="trust-label">BUSINESS AUTOMATION</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
