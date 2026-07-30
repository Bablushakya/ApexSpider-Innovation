import React from 'react';
import './Services.css';

export default function Services() {
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

  return (
    <section className="services-section section-padding" id="services">
      <div className="container">
        {/* Section Title Header */}
        <div className="section-header">
          <span className="tag">Capabilities</span>
          <h2>Our Services & Solutions</h2>
          <p>We deliver robust technical architectures and refined user interfaces to fuel product velocity.</p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {servicesList.map((service, index) => (
            <div key={index} className="glass-panel service-card">
              <div className="service-icon-wrapper">
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
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
          ))}
        </div>
      </div>
    </section>
  );
}
