import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './Testimonials.css';

/* ─────────────────────────────────────────────────────────
   DATA  — update this array to add / change testimonials
───────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    name:    'Ravi Menon',
    role:    'Head of Engineering · Orbyx Labs',
    initials: 'RM',
    accent:  '#00ffff',
    quote:
      'ApexSpider delivered a polished React dashboard that our team integrated without friction. The component architecture was clean, well-documented, and easy to extend. Highly recommended for serious product work.',
  },
  {
    name:    'Sarah Ellington',
    role:    'VP of Product · NovaSphere',
    initials: 'SE',
    accent:  '#6366f1',
    quote:
      'The collaboration was transparent and technically rigorous throughout. They identified performance bottlenecks we had missed and delivered a 40 % faster load time. The resulting interface became the foundation of our internal tooling.',
  },
  {
    name:    'James Okafor',
    role:    'CTO · Stackpoint Systems',
    initials: 'JO',
    accent:  '#10b981',
    quote:
      'Exceptional attention to accessibility and design detail. Every component met WCAG standards, and the animation work felt premium without impacting performance. A dependable engineering partner.',
  },
];

/* ─────────────────────────────────────────────────────────
   SLIDE VARIANTS
───────────────────────────────────────────────────────── */
const slideVariants = {
  enter:  { opacity: 0, y: 20,  scale: 0.98, filter: 'blur(4px)' },
  center: { opacity: 1, y: 0,   scale: 1,    filter: 'blur(0px)' },
  exit:   { opacity: 0, y: -20, scale: 0.98, filter: 'blur(4px)' },
};

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
  const count          = TESTIMONIALS.length;
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

  const item = TESTIMONIALS[index];

  /* section-header entrance */
  const premiumEase = [0.16, 1, 0.3, 1];

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
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: premiumEase }}
        >
          <span className="tag">Testimonials</span>
          <h2 id="testimonials-heading">What Clients Say</h2>
          <p>Feedback from engineering leads and product teams we have worked with.</p>
        </motion.div>

        {/* ── Carousel wrapper ── */}
        <motion.div
          className="tc-wrapper"
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.9, ease: premiumEase, delay: 0.1 }}
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
                transition={{ duration: 0.28, ease: 'easeOut' }}
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
            {TESTIMONIALS.map((_, i) => (
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
