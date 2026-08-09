import React from 'react';
import { motion } from 'framer-motion';
import kinImg from '../assets/Our work/Kin webiste.png';
import heritageImg from '../assets/Our work/india heritage travel.png';
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
    image: kinImg,
    imageAlt: 'Elevation by Kim — India Sourcing Trip Landing Page screenshot',
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
    image: heritageImg,
    imageAlt: 'India Heritage Travel — Complete Digital Presence website screenshot',
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
              {/* Visual — real project screenshot inside browser chrome */}
              <div className="work-visual-wrapper">
                <div className="work-browser-mockup">
                  {/* Browser chrome dots */}
                  <div className="work-browser-chrome">
                    <span className="chrome-dot dot-red" />
                    <span className="chrome-dot dot-yellow" />
                    <span className="chrome-dot dot-green" />
                  </div>
                  {/* Actual screenshot */}
                  <motion.img
                    src={project.image}
                    alt={project.imageAlt}
                    className="work-project-img"
                    initial={{ opacity: 0, scale: 1.04 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: premiumEase, delay: 0.2 }}
                  />
                </div>
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
