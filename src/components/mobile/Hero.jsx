import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedTitleFM } from '../ui/AnimatedTitleFM';
import { EASE } from '../../constants/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './Hero.css';

export default function MobileHero({ heroReady = false }) {
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
    <section className="mobile-hero-section" id="hero" aria-labelledby="hero-heading">
      <div className="container mobile-hero-container">
        <div className="mobile-hero-content">

          {/* Badge */}
          <motion.div className="mobile-hero-badge" {...stagger(0)}>
            <span className="badge-tag">Custom Software Studio</span>
            <span className="badge-text">Scalable Solutions for Modern Teams</span>
          </motion.div>

          {/* Animated title */}
          <AnimatedTitleFM open={heroReady} />

          {/* Description */}
          <motion.p className="mobile-hero-description" {...stagger(0.16)}>
            Custom web systems, mobile applications, and premium digital interfaces
            engineered to establish credibility and accelerate business performance.
          </motion.p>

          {/* CTAs */}
          <motion.div className="mobile-hero-actions" {...stagger(0.28)}>
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
