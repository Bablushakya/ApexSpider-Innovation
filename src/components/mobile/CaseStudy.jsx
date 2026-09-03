import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CASE_STUDIES } from '../../constants/caseStudies.jsx';
import { EASE } from '../../constants/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './CaseStudy.css';

export default function MobileCaseStudy() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="mobile-work-section section-padding"
      id="work"
      aria-labelledby="work-heading"
    >
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20, filter: prefersReducedMotion ? 'blur(0px)' : 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.8, ease: EASE.premium }}
        >
          <span className="tag">Portfolio</span>
          <h2 id="work-heading">Featured Portfolio</h2>
          <p>
            Real projects delivered for real businesses — communicating the problem, solution, technology, and outcome.
          </p>
        </motion.div>

        <div className="mobile-work-grid">
          {CASE_STUDIES.map((project, index) => (
            <motion.article
              key={index}
              className="glass-panel mobile-work-card"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ 
                duration: prefersReducedMotion ? 0.01 : 0.7, 
                ease: EASE.premium, 
                delay: prefersReducedMotion ? 0 : index * 0.18 
              }}
              aria-labelledby={`work-card-title-${index}`}
            >
              <div className="mobile-work-visual">
                <motion.div 
                  className="mobile-browser-mockup"
                  initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: prefersReducedMotion ? 0.01 : 0.6, 
                    ease: EASE.premium, 
                    delay: prefersReducedMotion ? 0 : index * 0.18 + 0.15 
                  }}
                >
                  <div className="mobile-browser-chrome">
                    <span className="chrome-dot dot-red" />
                    <span className="chrome-dot dot-yellow" />
                    <span className="chrome-dot dot-green" />
                  </div>
                  <motion.img
                    src={project.image}
                    alt={project.imageAlt}
                    className="mobile-project-img"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: prefersReducedMotion ? 0.01 : 0.5, 
                      ease: EASE.smooth, 
                      delay: prefersReducedMotion ? 0 : index * 0.18 + 0.3 
                    }}
                  />
                </motion.div>
              </div>

              <div className="mobile-work-content">
                <span className="mobile-work-tag">{project.category || project.tag}</span>
                <p className="mobile-work-client">
                  Client: <strong>{project.client}</strong>
                </p>
                <h3
                  id={`work-card-title-${index}`}
                  className="mobile-work-title"
                >
                  {project.title}
                </h3>
                <p className="mobile-work-desc">{project.shortDesc || project.overview}</p>

                <div className="mobile-work-services">
                  {project.services.map((svc, idx) => (
                    <motion.span 
                      key={idx} 
                      className="mobile-service-tag"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: prefersReducedMotion ? 0.01 : 0.4, 
                        ease: EASE.smooth, 
                        delay: prefersReducedMotion ? 0 : index * 0.18 + 0.45 + idx * 0.08 
                      }}
                    >
                      {svc}
                    </motion.span>
                  ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
                  <Link
                    to={`/portfolio/${project.slug}`}
                    className="btn btn-primary mobile-work-btn"
                  >
                    View Case Study
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary mobile-work-btn"
                      aria-label={project.liveLabel}
                    >
                      Live Project ↗
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
