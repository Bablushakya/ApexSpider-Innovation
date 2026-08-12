import React from 'react';
import { motion } from 'framer-motion';
import { CASE_STUDIES } from '../../constants/caseStudies.jsx';
import { EASE } from '../../constants/animations';
import './CaseStudy.css';

export default function MobileCaseStudy() {
  return (
    <section
      className="mobile-work-section section-padding"
      id="work"
      aria-labelledby="work-heading"
    >
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: EASE.premium }}
        >
          <span className="tag">Client Work</span>
          <h2 id="work-heading">Our Work</h2>
          <p>
            Real projects delivered for real clients - explore the work we have built
            and the results we have achieved together.
          </p>
        </motion.div>

        <div className="mobile-work-grid">
          {CASE_STUDIES.map((project, index) => (
            <motion.article
              key={index}
              className="glass-panel mobile-work-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, ease: EASE.premium, delay: index * 0.15 }}
              aria-labelledby={`work-card-title-${index}`}
            >
              <div className="mobile-work-visual">
                <div className="mobile-browser-mockup">
                  <div className="mobile-browser-chrome">
                    <span className="chrome-dot dot-red" />
                    <span className="chrome-dot dot-yellow" />
                    <span className="chrome-dot dot-green" />
                  </div>
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    className="mobile-project-img"
                  />
                </div>
              </div>

              <div className="mobile-work-content">
                <span className="mobile-work-tag">{project.tag}</span>
                <p className="mobile-work-client">
                  Client: <strong>{project.client}</strong>
                </p>
                <h3
                  id={`work-card-title-${index}`}
                  className="mobile-work-title"
                >
                  {project.title}
                </h3>
                <p className="mobile-work-desc">{project.desc}</p>

                <div className="mobile-work-services">
                  {project.services.map((svc, idx) => (
                    <span key={idx} className="mobile-service-tag">{svc}</span>
                  ))}
                </div>

                <a
                  href={project.liveUrl}
                  className="btn btn-primary mobile-work-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={project.liveLabel}
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
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
