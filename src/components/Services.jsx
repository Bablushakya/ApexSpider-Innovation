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
    desc: 'High-performance applications engineered to address unique business requirements with clean, scalable architecture.',
    bullets: ['Scalable backend architectures', 'Cloud-native deployment pipelines', 'Secure database integrations'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Web Application Design',
    desc: 'Bespoke web applications built with modern frameworks, responsive layouts, and interactive visual states.',
    bullets: ['Robust multi-tenant systems', 'Real-time data & dashboards', 'Smooth interface state updates'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10zM2 12h20" />
      </svg>
    ),
    title: 'UI/UX Design',
    desc: 'User-centered design systems crafted for visual clarity, accessibility, and high adoption rates.',
    bullets: ['High-fidelity mockup prototypes', 'Structured design component tokens', 'Intuitive user journey flows'],
  },
  {
    icon: (
      /* Mobile + Code icon: smartphone with code brackets */
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    title: 'App Development',
    desc: 'Fast, scalable, and secure Android, iOS, and cross-platform mobile applications optimised for performance and long-term growth.',
    bullets: ['Android & iOS Development', 'Cross-platform Apps', 'Firebase & API Integration', 'App Maintenance'],
  },
  {
    icon: (
      /* Analytics / AI icon: bar chart with upward trend */
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
    title: 'Data Analysis & Data Science',
    desc: 'Transform business data into meaningful insights through analytics, visualisation, machine learning, and predictive models.',
    bullets: ['Business Analytics', 'Interactive Dashboards', 'Machine Learning', 'Python Automation'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    title: 'Technical Support & Maintenance',
    desc: 'Keep your digital products healthy with continuous monitoring, proactive updates, and rapid issue resolution.',
    bullets: ['Automated server diagnostics', 'Proactive patch deployments', 'Uptime monitoring dashboards'],
  },
];

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
          <a
            href="#contact"
            className="btn-card-inquire"
            aria-label={`Explore ${service.title}`}
          >
            <span>Explore Service</span>
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
              viewBox="0 0 24 24"
              width={18}
              height={18}
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
  const sectionRef     = useRef(null);
  const trackRef       = useRef(null);
  const isVisible      = useIntersectionObserver(sectionRef, '0px', 0);
  const prefersReduced = useReducedMotion();

  const isVisibleRef = useRef(isVisible);
  useEffect(() => { isVisibleRef.current = isVisible; }, [isVisible]);

  const startMarquee = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    let offset   = 0;
    let rafId    = null;
    let lastTime = null;
    const PX_PER_MS = 0.1;

    const step = (timestamp) => {
      if (!isVisibleRef.current) {
        lastTime = null;
        rafId = requestAnimationFrame(step);
        return;
      }
      if (lastTime === null) lastTime = timestamp;
      const delta = timestamp - lastTime;
      lastTime = timestamp;

      offset += delta * PX_PER_MS;

      const halfWidth = track.scrollWidth / 2;
      if (offset >= halfWidth) offset -= halfWidth;

      track.style.transform = `translateX(-${offset}px)`;
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => { if (rafId) cancelAnimationFrame(rafId); };
  }, []);

  useEffect(() => {
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
            End-to-end digital solutions — from web and mobile development to data science
            and ongoing technical support.
          </p>
        </motion.div>
      </div>

      <div
        className="services-marquee-viewport"
        aria-label="Services carousel"
        role="region"
      >
        <div ref={trackRef} className="services-marquee-track" aria-atomic="false">
          {SERVICE_LIST.map((s, i) => (
            <ServiceCard key={i} service={s} isDuplicate={false} />
          ))}
          {SERVICE_LIST.map((s, i) => (
            <ServiceCard key={`dup-${i}`} service={s} isDuplicate={true} />
          ))}
        </div>
      </div>
    </section>
  );
}
