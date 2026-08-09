import React from 'react';
import { motion } from 'framer-motion';
import './CaseStudy.css';

const premiumEase = [0.16, 1, 0.3, 1];

const caseStudies = [
  {
    tag: 'Landing Page Design & Development',
    client: 'Kim — Elevation by Kim',
    title: 'India Sourcing Trip Landing Page',
    desc: 'Designed and developed a dedicated landing page for Elevation by Kim to promote the India Sourcing Trip program. The page focuses on storytelling, lead generation, responsive design, and a premium user experience that encourages manufacturers and buyers to join the sourcing journey.',
    services: [
      'Landing Page Design',
      'Responsive Development',
      'Performance Optimisation',
      'Lead Generation UI',
      'Modern UX',
    ],
    liveUrl: 'https://www.elevationbykim.com/india-sourcing-trip',
    liveLabel: 'View Live Project — Elevation by Kim',
    visual: (
      <svg viewBox="0 0 350 200" fill="none" className="visual-svg" aria-hidden="true">
        {/* Browser chrome */}
        <rect width="350" height="200" rx="8" fill="rgba(255,255,255,0.01)" />
        <rect x="10" y="10" width="330" height="180" rx="6" fill="rgba(15,23,42,0.6)" stroke="var(--border-glass)" />
        <line x1="10" y1="36" x2="340" y2="36" stroke="var(--border-glass)" />
        <circle cx="24" cy="23" r="4" fill="#ef4444" />
        <circle cx="36" cy="23" r="4" fill="#f59e0b" />
        <circle cx="48" cy="23" r="4" fill="#10b981" />
        {/* URL bar */}
        <rect x="70" y="16" width="210" height="14" rx="3" fill="rgba(255,255,255,0.03)" stroke="var(--border-glass)" />
        <text x="175" y="26" fill="rgba(255,255,255,0.3)" fontSize="7" textAnchor="middle" fontFamily="monospace">elevationbykim.com/india-sourcing-trip</text>
        {/* Hero text block */}
        <motion.rect x="60" y="50" width="180" height="10" rx="2" fill="var(--color-accent-teal)" opacity="0.7"
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
          style={{ originX: '60px' }} transition={{ duration: 0.8, ease: premiumEase, delay: 0.3 }} />
        <motion.rect x="60" y="66" width="140" height="7" rx="2" fill="rgba(255,255,255,0.15)"
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
          style={{ originX: '60px' }} transition={{ duration: 0.8, ease: premiumEase, delay: 0.5 }} />
        <motion.rect x="60" y="79" width="160" height="7" rx="2" fill="rgba(255,255,255,0.1)"
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
          style={{ originX: '60px' }} transition={{ duration: 0.8, ease: premiumEase, delay: 0.6 }} />
        {/* CTA button */}
        <motion.rect x="60" y="96" width="90" height="20" rx="4"
          fill="var(--color-accent-teal)" opacity="0.85"
          initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.85 }}
          viewport={{ once: true }} transition={{ type: 'spring', delay: 0.8 }} />
        <text x="105" y="110" fill="rgba(0,0,0,0.8)" fontSize="7" textAnchor="middle" fontFamily="monospace" fontWeight="700">Join the Trip</text>
        {/* Right image placeholder */}
        <motion.rect x="255" y="48" width="74" height="88" rx="6"
          fill="rgba(0,255,255,0.06)" stroke="var(--color-accent-teal)" strokeOpacity="0.3"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }} />
        <motion.circle cx="292" cy="80" r="18" fill="rgba(0,255,255,0.05)" stroke="var(--color-accent-teal)" strokeOpacity="0.2"
          initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
          transition={{ type: 'spring', delay: 0.6 }} />
        <line x1="284" y1="80" x2="300" y2="80" stroke="var(--color-accent-teal)" strokeOpacity="0.4" strokeWidth="1.5" />
        <line x1="292" y1="72" x2="292" y2="88" stroke="var(--color-accent-teal)" strokeOpacity="0.4" strokeWidth="1.5" />
        {/* Feature row */}
        {[0,1,2].map(i => (
          <motion.rect key={i} x={20 + i * 105} y="155" width="95" height="24" rx="4"
            fill="rgba(255,255,255,0.02)" stroke="var(--border-glass)"
            initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }} />
        ))}
        <text x="68"  y="170" fill="rgba(255,255,255,0.3)" fontSize="6" textAnchor="middle" fontFamily="monospace">Responsive</text>
        <text x="173" y="170" fill="rgba(255,255,255,0.3)" fontSize="6" textAnchor="middle" fontFamily="monospace">Lead Gen</text>
        <text x="278" y="170" fill="rgba(255,255,255,0.3)" fontSize="6" textAnchor="middle" fontFamily="monospace">Premium UX</text>
      </svg>
    ),
  },
  {
    tag: 'Full Digital Transformation',
    client: 'India Heritage Travel',
    title: 'India Heritage Travel — Complete Digital Presence',
    desc: 'Designed and developed the complete travel website with a fully responsive user experience while implementing comprehensive SEO strategies. Our work included modern UI design, on-page SEO, technical SEO, off-page SEO, website optimisation, and ongoing social media management to strengthen the company\'s digital presence.',
    services: [
      'Website Design & Development',
      'Responsive Design',
      'On-page & Technical SEO',
      'Off-page SEO',
      'Performance Optimisation',
      'Social Media Management',
    ],
    liveUrl: 'https://indiaheritagetravel.com/',
    liveLabel: 'View Live Project — India Heritage Travel',
    visual: (
      <svg viewBox="0 0 350 200" fill="none" className="visual-svg" aria-hidden="true">
        {/* Browser chrome */}
        <rect width="350" height="200" rx="8" fill="rgba(255,255,255,0.01)" />
        <rect x="10" y="10" width="330" height="180" rx="6" fill="rgba(15,23,42,0.6)" stroke="var(--border-glass)" />
        <line x1="10" y1="36" x2="340" y2="36" stroke="var(--border-glass)" />
        <circle cx="24" cy="23" r="4" fill="#ef4444" />
        <circle cx="36" cy="23" r="4" fill="#f59e0b" />
        <circle cx="48" cy="23" r="4" fill="#10b981" />
        <rect x="70" y="16" width="210" height="14" rx="3" fill="rgba(255,255,255,0.03)" stroke="var(--border-glass)" />
        <text x="175" y="26" fill="rgba(255,255,255,0.3)" fontSize="7" textAnchor="middle" fontFamily="monospace">indiaheritagetravel.com</text>
        {/* Nav bar */}
        <rect x="20" y="44" width="310" height="18" rx="2" fill="rgba(255,255,255,0.02)" stroke="var(--border-glass)" />
        {['Home','Tours','About','Blog','Contact'].map((label, i) => (
          <text key={label} x={42 + i * 58} y="56" fill="rgba(255,255,255,0.3)" fontSize="6" fontFamily="monospace">{label}</text>
        ))}
        {/* Hero image block */}
        <motion.rect x="20" y="68" width="310" height="60" rx="4"
          fill="rgba(99,102,241,0.06)" stroke="var(--color-accent-indigo)" strokeOpacity="0.2"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }} />
        <motion.rect x="40" y="78" width="120" height="8" rx="2" fill="var(--color-accent-indigo)" opacity="0.6"
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
          style={{ originX: '40px' }} transition={{ duration: 0.7, ease: premiumEase, delay: 0.5 }} />
        <motion.rect x="40" y="92" width="90" height="6" rx="2" fill="rgba(255,255,255,0.15)"
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
          style={{ originX: '40px' }} transition={{ duration: 0.7, ease: premiumEase, delay: 0.65 }} />
        <motion.rect x="40" y="104" width="70" height="14" rx="3"
          fill="var(--color-accent-indigo)" opacity="0.8"
          initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.8 }}
          viewport={{ once: true }} transition={{ type: 'spring', delay: 0.8 }} />
        <text x="75" y="114" fill="rgba(255,255,255,0.8)" fontSize="6" textAnchor="middle" fontFamily="monospace">Explore Tours</text>
        {/* SEO metrics row */}
        <motion.circle cx="175" cy="100" r="22" fill="none" stroke="var(--color-accent-indigo)" strokeOpacity="0.1"
          initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }} />
        {/* Tour cards */}
        {[0,1,2].map(i => (
          <motion.rect key={i} x={20 + i * 108} y="140" width="96" height="42" rx="4"
            fill="rgba(255,255,255,0.02)" stroke="var(--border-glass)"
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }} />
        ))}
        {['Golden Triangle','Rajasthan Tour','Kerala Backwaters'].map((t, i) => (
          <text key={t} x={68 + i * 108} y="168" fill="rgba(255,255,255,0.25)" fontSize="5.5" textAnchor="middle" fontFamily="monospace">{t}</text>
        ))}
        {/* Animated SEO bar */}
        <text x="200" y="152" fill="rgba(255,255,255,0.2)" fontSize="5.5" fontFamily="monospace">SEO Score</text>
        <rect x="200" y="156" width="60" height="4" rx="2" fill="rgba(255,255,255,0.05)" />
        <motion.rect x="200" y="156" width="0" height="4" rx="2" fill="var(--color-accent-teal)"
          initial={{ width: 0 }} whileInView={{ width: 52 }} viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 1 }} />
      </svg>
    ),
  },
];

const gridContainerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 40, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: premiumEase },
  },
};

export default function CaseStudy() {
  return (
    <section
      className="work-section section-padding"
      id="work"
      aria-labelledby="work-heading"
    >
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: premiumEase }}
        >
          <span className="tag">Client Work</span>
          <h2 id="work-heading">Our Work</h2>
          <p>
            Real projects delivered for real clients — explore the work we have built
            and the results we have achieved together.
          </p>
        </motion.div>

        {/* Case Studies */}
        <motion.div
          className="work-container"
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-8%' }}
        >
          {caseStudies.map((project, index) => (
            <motion.article
              key={index}
              className="glass-panel work-card"
              variants={cardVariants}
              aria-labelledby={`work-card-title-${index}`}
            >
              {/* Visual */}
              <div className="work-visual-wrapper">
                {project.visual}
              </div>

              {/* Content */}
              <div className="work-content-wrapper">
                <span className="work-badge-tag">{project.tag}</span>
                <p className="work-client-label">
                  Client: <strong>{project.client}</strong>
                </p>
                <h3
                  id={`work-card-title-${index}`}
                  className="work-card-title"
                >
                  {project.title}
                </h3>
                <p className="work-card-desc">{project.desc}</p>

                {/* Service tags */}
                <div className="work-techs-row" aria-label="Services delivered">
                  {project.services.map((svc, idx) => (
                    <span key={idx} className="work-tech-badge">{svc}</span>
                  ))}
                </div>

                {/* Live project CTA */}
                <motion.a
                  href={project.liveUrl}
                  className="btn btn-primary work-live-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={project.liveLabel}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                >
                  View Live Project
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </motion.a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
