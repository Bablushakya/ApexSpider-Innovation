import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CASE_STUDIES } from '../../constants/caseStudies.jsx';
import { EASE } from '../../constants/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './CaseStudy.css';

export default function CaseStudy() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="work-section section-padding"
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

        <div className="work-container">
          {CASE_STUDIES.map((project, index) => (
            <motion.article
              key={project.slug}
              className="glass-panel work-card"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ 
                duration: prefersReducedMotion ? 0.01 : 0.8, 
                ease: EASE.premium, 
                delay: prefersReducedMotion ? 0 : index * 0.18 
              }}
              aria-labelledby={`work-card-title-${index}`}
            >
              {/* Visual screenshot inside browser mockup */}
              <div className="work-visual-wrapper">
                <motion.div 
                  className="work-browser-mockup"
                  initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: prefersReducedMotion ? 0.01 : 0.7, 
                    ease: EASE.premium, 
                    delay: prefersReducedMotion ? 0 : index * 0.18 + 0.2 
                  }}
                >
                  <div className="work-browser-chrome">
                    <span className="chrome-dot dot-red" />
                    <span className="chrome-dot dot-yellow" />
                    <span className="chrome-dot dot-green" />
                  </div>
                  <motion.img
                    src={project.image}
                    alt={project.imageAlt}
                    className="work-project-img"
                    loading="lazy"
                    initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: prefersReducedMotion ? 0.01 : 0.6, 
                      ease: EASE.smooth, 
                      delay: prefersReducedMotion ? 0 : index * 0.18 + 0.35 
                    }}
                    whileHover={
                      prefersReducedMotion 
                        ? {} 
                        : { 
                            scale: 1.03,
                            transition: { duration: 0.4, ease: EASE.smooth }
                          }
                    }
                  />
                </motion.div>
              </div>

              {/* Content */}
              <div className="work-content-wrapper">
                <span className="work-badge-tag">{project.category}</span>
                <p className="work-client-label">
                  Client: <strong>{project.client}</strong>
                </p>
                <h3
                  id={`work-card-title-${index}`}
                  className="work-card-title"
                >
                  {project.title}
                </h3>
                <p className="work-card-desc">{project.shortDesc}</p>

                <div className="work-techs-row" aria-label="Technology & services">
                  {project.services.slice(0, 4).map((svc, idx) => (
                    <motion.span 
                      key={idx} 
                      className="work-tech-badge"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: prefersReducedMotion ? 0.01 : 0.4, 
                        ease: EASE.smooth, 
                        delay: prefersReducedMotion ? 0 : index * 0.18 + 0.5 + idx * 0.08 
                      }}
                    >
                      {svc}
                    </motion.span>
                  ))}
                </div>

                <div className="work-actions-row">
                  <Link
                    to={`/portfolio/${project.slug}`}
                    className="btn btn-primary work-live-btn"
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
                      className="btn btn-secondary work-ext-btn"
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
