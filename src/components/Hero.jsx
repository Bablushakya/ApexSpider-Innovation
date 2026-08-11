import React from 'react';
import { motion } from 'framer-motion';
import GlowHorizonFM from './ui/GlowHorizonFM';
import { AnimatedTitleFM } from './ui/AnimatedTitleFM';
import { EASE } from '../constants/animations';
import './Hero.css';

export default function Hero({ heroReady = false }) {

  const stagger = (delay = 0) => ({
    initial:    { opacity: 0, y: 30, filter: 'blur(8px)' },
    animate:    heroReady
      ? { opacity: 1, y: 0, filter: 'blur(0px)' }
      : { opacity: 0, y: 30, filter: 'blur(8px)' },
    transition: { duration: 0.7, ease: EASE.premium, delay },
  });

  return (
    <section className="hero-section" id="hero" aria-labelledby="hero-heading">

      {/*
        Wrapper shifts the glow coordinate space downward by 25% of the
        section height. GlowHorizonFM still animates y:-100% → y:-50%
        relative to this wrapper, so the effective rest position is
        25% + (-50%) = -25% from top → arc center lands near the bottom
        of the section and only the top arc rim is visible.
        Hidden on mobile for cleaner experience.
      */}
      <div className="hero-glow-wrapper hero-glow-desktop-only" aria-hidden="true">
        <GlowHorizonFM variant="top" className="hero-glow" />
      </div>

      {/* All hero content sits above the glow */}
      <div className="container hero-container">
        <div className="hero-content">

          {/* Badge */}
          <motion.div className="hero-badge" {...stagger(0)}>
            <span className="badge-tag">Custom Software Studio</span>
            <span className="badge-text">Scalable Solutions for Modern Teams</span>
          </motion.div>

          {/* Animated title */}
          <AnimatedTitleFM open={heroReady} />

          {/* Description */}
          <motion.p className="hero-description" {...stagger(0.12)}>
            Custom web systems, mobile applications, and premium digital interfaces
            engineered to establish credibility and accelerate business performance.
          </motion.p>

          {/* CTAs */}
          <motion.div className="hero-actions" {...stagger(0.24)}>
            <a href="#services" className="btn btn-primary">
              Explore Services
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
            </a>
            <a href="#work" className="btn btn-secondary">
              View Our Work
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
