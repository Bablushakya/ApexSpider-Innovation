import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS } from '../../constants/testimonials';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASE } from '../../constants/animations';
import './Testimonials.css';

const getSlideVariants = (prefersReduced) => ({
  enter:  { 
    opacity: 0, 
    y: prefersReduced ? 0 : 20,  
    scale: prefersReduced ? 1 : 0.98, 
    filter: prefersReduced ? 'blur(0px)' : 'blur(4px)' 
  },
  center: { 
    opacity: 1, 
    y: 0,   
    scale: 1,    
    filter: 'blur(0px)' 
  },
  exit:   { 
    opacity: 0, 
    y: prefersReduced ? 0 : -20, 
    scale: prefersReduced ? 1 : 0.98, 
    filter: prefersReduced ? 'blur(0px)' : 'blur(4px)' 
  },
});

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export default function MobileTestimonials() {
  const count = TESTIMONIALS.length;
  const [index, setIndex] = useState(0);
  const prefersReduced = useReducedMotion();

  const wrap = useCallback((n) => ((n % count) + count) % count, [count]);
  const go = useCallback((delta) => setIndex((i) => wrap(i + delta)), [wrap]);

  useEffect(() => {
    if (prefersReduced || count <= 1) return;
    const id = setInterval(() => go(1), 6000);
    return () => clearInterval(id);
  }, [prefersReduced, count, go]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft')  go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  const item = TESTIMONIALS[index];
  const slideVariants = getSlideVariants(prefersReduced);

  return (
    <section
      className="mobile-testimonials-section section-padding"
      id="testimonials"
      aria-labelledby="testimonials-heading"
    >
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20, filter: prefersReduced ? 'blur(0px)' : 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: prefersReduced ? 0.01 : 0.8, ease: EASE.premium }}
        >
          <span className="tag">Testimonials</span>
          <h2 id="testimonials-heading">What Clients Say</h2>
          <p>Honest feedback from the clients we have built real products for.</p>
        </motion.div>

        <motion.div
          className="mobile-tc-wrapper"
          initial={{ opacity: 0, y: prefersReduced ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: prefersReduced ? 0.01 : 0.9, ease: EASE.premium, delay: prefersReduced ? 0 : 0.15 }}
        >
          {/* Slide card */}
          <div className="mobile-tc-slide-area">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.article
                key={index}
                className="mobile-tc-card"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ 
                  duration: prefersReduced ? 0.01 : 0.32, 
                  ease: 'easeOut' 
                }}
              >
                <span
                  className="mobile-tc-quote-badge"
                  style={{ background: item.accent }}
                  aria-hidden="true"
                >
                  &ldquo;
                </span>

                <div className="mobile-tc-avatar-wrap">
                  <div
                    className="mobile-tc-avatar"
                    style={{ boxShadow: `0 0 0 3px ${item.accent}44` }}
                    aria-hidden="true"
                  >
                    {item.initials}
                  </div>
                </div>

                <h3 className="mobile-tc-name">{item.name}</h3>
                <p className="mobile-tc-role" style={{ color: item.accent }}>
                  {item.role}
                </p>

                <blockquote className="mobile-tc-quote">
                  <p>{item.quote}</p>
                </blockquote>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* Controls: prev · dots · next — all on one row */}
          <div className="mobile-tc-controls">
            <button
              type="button"
              className="mobile-tc-arrow mobile-tc-arrow--prev"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
            >
              <ChevronLeft />
            </button>

            <div className="mobile-tc-dots" role="tablist" aria-label="Testimonial navigation">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  className={`mobile-tc-dot${i === index ? ' mobile-tc-dot--active' : ''}`}
                  onClick={() => setIndex(i)}
                  aria-selected={i === index}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              className="mobile-tc-arrow mobile-tc-arrow--next"
              onClick={() => go(1)}
              aria-label="Next testimonial"
            >
              <ChevronRight />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
