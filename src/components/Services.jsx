import React, { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './Services.css';

const premiumEase = [0.16, 1, 0.3, 1];

const SERVICE_LIST = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Custom Software Development',
    desc: 'High-performance applications engineered to address unique enterprise requirements.',
    bullets: ['Scalable backend architectures', 'Cloud-native deployment pipelines', 'Secure database integrations'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Web Application Design',
    desc: 'Bespoke web applications featuring modern frameworks and interactive visual states.',
    bullets: ['Robust multi-tenant systems', 'Real-time charting & telemetry', 'Smooth interface state updates'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10zM2 12h20" />
      </svg>
    ),
    title: 'UI/UX Design',
    desc: 'User-centered design systems crafted for visual clarity, accessibility, and high adoption.',
    bullets: ['High-fidelity mockup prototypes', 'Structured design component tokens', 'Intuitive user journey flows'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: 'Automation Solutions',
    desc: 'Streamline operational workflows through triggered pipelines and legacy system syncs.',
    bullets: ['Custom event trigger chains', 'Secure API proxy integrations', 'Batch data ETL synchronization'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Branding & Digital Presence',
    desc: 'Establish market presence with consistent visual standards and premium layouts.',
    bullets: ['Unified asset typography rules', 'Scalable vector logo frameworks', 'High-impact landing experiences'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    title: 'Technical Support',
    desc: 'Maintain operational uptime and software health with continuous monitoring systems.',
    bullets: ['Automated server diagnostics', 'Proactive patch deployments', 'Uptime monitoring dashboards'],
  },
];

/**
 * A single service card — rendered for both originals and duplicates.
 * Duplicate cards are aria-hidden so screen readers only see the set once.
 */
function ServiceCard({ service, isDuplicate }) {
  return (
    <div
      className="service-card-wrapper"
      aria-hidden={isDuplicate ? 'true' : undefined}
    >
      <div className="premium-service-card">
        <div className="service-card-header">
          <div className="service-icon-wrapper">
            {service.icon}
          </div>
          <h3 className="service-title">{service.title}</h3>
        </div>

        <div className="service-card-body">
          <p className="service-desc">{service.desc}</p>
          <ul className="service-bullets" aria-label={`${service.title} features`}>
            {service.bullets.map((bullet, idx) => (
              <li key={idx} className="service-bullet-item">
                <svg
                  className="bullet-check"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        <div className="service-card-footer">
          {/*
            Using <a> instead of <button> for better SEO, keyboard nav,
            and right-click "open in new tab" support.
          */}
          <a
            href="#contact"
            className="btn-card-inquire"
            aria-label={`Inquire about ${service.title}`}
          >
            <span>Inquire Now</span>
            <svg
              className="btn-arrow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>

          <a
            href="#contact"
            className="btn-card-secondary"
            title={`Quick inquiry for ${service.title}`}
            aria-label={`Quick inquiry for ${service.title}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const sectionRef  = useRef(null);
  const trackRef    = useRef(null);
  const isVisible   = useIntersectionObserver(sectionRef, '0px', 0);
  const prefersReduced = useReducedMotion();

  // Stable ref so RAF callback can read latest isVisible without restart
  const isVisibleRef = useRef(isVisible);
  useEffect(() => { isVisibleRef.current = isVisible; }, [isVisible]);

  const startMarquee = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    let offset   = 0;
    let rafId    = null;
    let lastTime = null;
    const PX_PER_MS = 0.1; // 100 px / second

    const step = (timestamp) => {
      // Pause when section is not in view or user prefers reduced motion
      if (!isVisibleRef.current) {
        lastTime = null;
        rafId = requestAnimationFrame(step);
        return;
      }

      if (lastTime === null) lastTime = timestamp;
      const delta = timestamp - lastTime;
      lastTime = timestamp;

      offset += delta * PX_PER_MS;

      // Seamless loop: half the total track width = one full set of cards
      const halfWidth = track.scrollWidth / 2;
      if (offset >= halfWidth) offset -= halfWidth;

      track.style.transform = `translateX(-${offset}px)`;
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => { if (rafId) cancelAnimationFrame(rafId); };
  }, []);

  useEffect(() => {
    // Skip animation entirely for reduced-motion preference
    if (prefersReduced) return;
    return startMarquee();
  }, [prefersReduced, startMarquee]);

  return (
    <section
      ref={sectionRef}
      className="services-section section-padding"
      id="services"
      aria-labelledby="services-heading"
    >
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: premiumEase }}
        >
          <span className="tag">Capabilities</span>
          <h2 id="services-heading">Our Services &amp; Solutions</h2>
          <p>
            We deliver robust technical architectures and refined user interfaces to fuel
            product velocity.
          </p>
        </motion.div>
      </div>

      {/*
        Marquee — full-width outside container so cards bleed edge-to-edge.
        The track holds originals + duplicates for seamless infinite loop.
        Duplicate cards are aria-hidden so screen readers encounter each card once.
      */}
      <div
        className="services-marquee-viewport"
        aria-label="Services carousel"
        role="region"
      >
        <div ref={trackRef} className="services-marquee-track" aria-atomic="false">
          {/* Original set — visible to screen readers */}
          {SERVICE_LIST.map((s, i) => (
            <ServiceCard key={i} service={s} isDuplicate={false} />
          ))}
          {/* Duplicate set — hidden from AT for seamless visual loop */}
          {SERVICE_LIST.map((s, i) => (
            <ServiceCard key={`dup-${i}`} service={s} isDuplicate={true} />
          ))}
        </div>
      </div>
    </section>
  );
}
