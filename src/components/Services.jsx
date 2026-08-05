import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Services.css';

export default function Services() {
  const premiumEase = [0.16, 1, 0.3, 1];
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  // Continuous pixel scroll — 1px every 10ms (= 100px/sec), never pauses
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let offset = 0;
    let rafId = null;
    let lastTime = null;
    // Move 1px per 10ms → 100px per second
    const PX_PER_MS = 0.1;

    const step = (timestamp) => {
      if (lastTime === null) lastTime = timestamp;
      const delta = timestamp - lastTime;
      lastTime = timestamp;

      offset += delta * PX_PER_MS;

      // Half the total track width = width of one full set of cards
      const halfWidth = track.scrollWidth / 2;
      if (offset >= halfWidth) {
        offset -= halfWidth; // seamless jump back — no visible cut
      }

      track.style.transform = `translateX(-${offset}px)`;
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const servicesList = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      title: 'Custom Software Development',
      desc: 'High-performance applications engineered to address unique enterprise requirements.',
      bullets: ['Scalable backend architectures', 'Cloud native deployment pipelines', 'Secure database integrations']
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
      title: 'Web Application Design',
      desc: 'Bespoke web applications featuring modern frameworks and interactive visual states.',
      bullets: ['Robust multi-tenant systems', 'Real-time charting & telemetry', 'Smooth interface state updates']
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10zM2 12h20" />
        </svg>
      ),
      title: 'UI/UX Design',
      desc: 'User-centered design systems crafted for visual clarity, accessibility, and high adoption.',
      bullets: ['Fidelity mockup prototypes', 'Structured design component tokens', 'Intuitive user journey flows']
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
      title: 'Automation Solutions',
      desc: 'Streamline operational workflows through triggered pipelines and legacy system syncs.',
      bullets: ['Custom event trigger chains', 'Secure API proxy integrations', 'Batch data ETL synchronization']
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: 'Branding & Digital Presence',
      desc: 'Establish market presence with consistent visual standards and premium layouts.',
      bullets: ['Unified asset typography rules', 'Scalable vector logo frameworks', 'High-impact landing experiences']
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
      title: 'Technical Support',
      desc: 'Maintain operational uptime and software health with continuous monitoring systems.',
      bullets: ['Automated server diagnostics', 'Proactive patch deployments', 'Uptime monitoring dashboards']
    }
  ];

  // Render a single card — used for both original & duplicate sets
  const renderCard = (service, index, isDuplicate = false) => (
    <div
      key={isDuplicate ? `dup-${index}` : index}
      className="service-card-wrapper"
      aria-hidden={isDuplicate ? 'true' : undefined}
    >
      <div className="premium-service-card">
        {/* Header: Icon & Title */}
        <div className="service-card-header">
          <div className="service-icon-wrapper">
            {service.icon}
          </div>
          <h3 className="service-title">{service.title}</h3>
        </div>

        {/* Body: Desc & Bullets */}
        <div className="service-card-body">
          <p className="service-desc">{service.desc}</p>
          <ul className="service-bullets">
            {service.bullets.map((bullet, idx) => (
              <li key={idx} className="service-bullet-item">
                <svg className="bullet-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer: CTAs */}
        <div className="service-card-footer">
          <button
            className="btn-card-inquire"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            title="Inquire Now"
          >
            <span>Inquire Now</span>
            <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <button
            className="btn-card-secondary"
            title="Quick Inquiry"
            onClick={() => {
              const contactInput = document.getElementById('message');
              if (contactInput) {
                contactInput.focus();
                contactInput.value = `Hi, I am interested in your "${service.title}" services. Please share details.`;
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              } else {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <svg className="svg" xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="services-section section-padding" id="services">
      <div className="container">
        {/* Section Title Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: premiumEase }}
        >
          <span className="tag">Capabilities</span>
          <h2>Our Services & Solutions</h2>
          <p>We deliver robust technical architectures and refined user interfaces to fuel product velocity.</p>
        </motion.div>
      </div>

      {/* Marquee Slider — full-width, outside container so cards bleed edge-to-edge */}
      <div className="services-marquee-viewport">
        {/* track holds originals + duplicates for seamless infinite loop */}
        <div ref={trackRef} className="services-marquee-track">
          {servicesList.map((s, i) => renderCard(s, i, false))}
          {servicesList.map((s, i) => renderCard(s, i, true))}
        </div>
      </div>
    </section>
  );
}
