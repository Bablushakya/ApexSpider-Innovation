import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SERVICES } from '../../constants/services.jsx';
import { EASE } from '../../constants/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './Services.css';

export default function Services() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="services-section section-padding" id="services" aria-labelledby="services-heading">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20, filter: prefersReducedMotion ? 'blur(0px)' : 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.8, ease: EASE.premium }}
        >
          <span className="tag">Services</span>
          <h2 id="services-heading">Technology built around your business.</h2>
          <p>
            From customer-facing websites to internal business systems, AI solutions and data platforms — we build custom technology designed around real operational needs.
          </p>
        </motion.div>

        <div className="services-grid">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              className="service-card-wrapper"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ 
                duration: prefersReducedMotion ? 0.01 : 0.6, 
                ease: EASE.premium, 
                delay: prefersReducedMotion ? 0 : i * 0.1 
              }}
            >
              <motion.div 
                className="premium-service-card"
                whileHover={
                  prefersReducedMotion 
                    ? {} 
                    : { 
                        y: -6,
                        borderColor: 'rgba(0, 255, 255, 0.35)',
                        transition: { duration: 0.3, ease: EASE.smooth }
                      }
                }
              >
                <div className="service-card-number">{service.number}</div>
                <div className="service-card-header">
                  <motion.div 
                    className="service-icon-wrapper"
                    whileHover={
                      prefersReducedMotion 
                        ? {} 
                        : { 
                            scale: 1.05,
                            rotate: 5,
                            transition: { duration: 0.25, ease: EASE.smooth }
                          }
                    }
                  >
                    {service.icon}
                  </motion.div>
                  <h3 className="service-title">{service.title}</h3>
                </div>

                <div className="service-card-body">
                  <p className="service-desc">{service.shortDesc}</p>
                  <ul className="service-bullets" aria-label={`${service.title} capabilities`}>
                    {service.capabilities.slice(0, 3).map((cap, idx) => (
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
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="service-card-footer">
                  <Link
                    to={`/services/${service.slug}`}
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
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
