import React, { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { SERVICES } from '../../constants/services.jsx';
import { EASE } from '../../constants/animations';
import './Services.css';


const SERVICE_LIST = SERVICES;

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
          transition={{ duration: 0.8, ease: EASE.premium }}
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
