import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS } from '../../constants/testimonials';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASE } from '../../constants/animations';
import './Testimonials.css';

/* ─────────────────────────────────────────────────────────
   DATA  — update this array to add / change testimonials
───────────────────────────────────────────────────────── */
const TESTIMONIALS_DATA = TESTIMONIALS;

/* ─────────────────────────────────────────────────────────
   SLIDE VARIANTS
───────────────────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────────────────
   ARROW ICON (inline — no external icon library needed)
───────────────────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────── */
export default function Testimonials() {
  const count          = TESTIMONIALS_DATA.length;
  const [index, setIndex] = useState(0);
  const prefersReduced = useReducedMotion();

  /* safe modulo — always returns 0…count-1 */
  const wrap = useCallback(
    (n) => ((n % count) + count) % count,
    [count]
  );

  const go = useCallback(
    (delta) => setIndex((i) => wrap(i + delta)),
    [wrap]
  );

  /* Autoplay — paused on reduced-motion */
  useEffect(() => {
    if (prefersReduced || count <= 1) return;
    const id = setInterval(() => go(1), 6000);
    return () => clearInterval(id);
  }, [prefersReduced, count, go]);

  /* Keyboard navigation */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft')  go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  const item = TESTIMONIALS_DATA[index];
  const slideVariants = getSlideVariants(prefersReduced);

  /* section-header entrance */

  return (
    <section
      className="testimonials-section section-padding"
      id="testimonials"
      aria-labelledby="testimonials-heading"
    >
      <div className="container">

        {/* ── Section header ── */}
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

        {/* ── Carousel wrapper ── */}
        <motion.div
          className="tc-wrapper"
          initial={{ opacity: 0, y: prefersReduced ? 0 : 30, filter: prefersReduced ? 'blur(0px)' : 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: prefersReduced ? 0.01 : 0.9, ease: EASE.premium, delay: prefersReduced ? 0 : 0.15 }}
          aria-roledescription="carousel"
          aria-label="Client testimonials"
        >

          {/* ── Prev arrow ── */}
          <button
            type="button"
            className="tc-arrow tc-arrow--prev"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
          >
            <ChevronLeft />
          </button>

          {/* ── Slide panel ── */}
          <div className="tc-slide-area">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.article
                key={index}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${count}`}
                className="tc-card"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ 
                  duration: prefersReduced ? 0.01 : 0.32, 
                  ease: 'easeOut' 
                }}
              >
                {/* Decorative quote badge */}
                <span
                  className="tc-quote-badge"
                  style={{ background: item.accent }}
                  aria-hidden="true"
                >
                  &ldquo;
                </span>

                {/* Avatar initials + accent ring */}
                <div className="tc-avatar-wrap">
                  <div
                    className="tc-avatar"
                    style={{ boxShadow: `0 0 0 3px ${item.accent}44` }}
                    aria-hidden="true"
                  >
                    {item.initials}
                  </div>
                </div>

                {/* Name + Role */}
                <h3 className="tc-name">{item.name}</h3>
                <p
                  className="tc-role"
                  style={{ color: item.accent }}
                >
                  {item.role}
                </p>

                {/* Quote */}
                <blockquote className="tc-quote">
                  <p>{item.quote}</p>
                </blockquote>

              </motion.article>
            </AnimatePresence>
          </div>

          {/* ── Next arrow ── */}
          <button
            type="button"
            className="tc-arrow tc-arrow--next"
            onClick={() => go(1)}
            aria-label="Next testimonial"
          >
            <ChevronRight />
          </button>

          {/* ── Dot indicators ── */}
          <div className="tc-dots" role="tablist" aria-label="Testimonial navigation">
            {TESTIMONIALS_DATA.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`tc-dot${i === index ? ' tc-dot--active' : ''}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
