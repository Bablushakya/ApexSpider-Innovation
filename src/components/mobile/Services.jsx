import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SERVICES } from '../../constants/services.jsx';
import { EASE } from '../../constants/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './Services.css';

function MobileServiceCard({ service, index }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="mobile-service-card"
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ 
        duration: prefersReducedMotion ? 0.01 : 0.6, 
        ease: EASE.premium,
        delay: prefersReducedMotion ? 0 : index * 0.12
      }}
    >
      <div className="mobile-service-header">
        <motion.div 
          className="mobile-service-icon"
          whileHover={
            prefersReducedMotion 
              ? {} 
              : { 
                  scale: 1.05,
                  transition: { duration: 0.2, ease: EASE.smooth }
                }
          }
        >
          {service.icon}
        </motion.div>
        <h3 className="mobile-service-title">{service.title}</h3>
      </div>

      <p className="mobile-service-desc">{service.shortDesc}</p>

      <ul className="mobile-service-bullets" aria-label={`${service.title} capabilities`}>
        {service.capabilities.slice(0, 3).map((cap, idx) => (
          <li key={idx} className="mobile-service-bullet-item">
            <svg
              className="bullet-check"
              width="12"
              height="12"
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

      <div className="mobile-service-footer">
        <Link
          to={`/services/${service.slug}`}
          className="mobile-btn-explore"
          aria-label={`Explore ${service.title}`}
        >
          <span>Explore Service</span>
          <svg
            className="arrow-icon"
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
  );
}

export default function MobileServices() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="mobile-services-section section-padding"
      id="services"
      aria-labelledby="services-heading"
    >
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

        <div className="mobile-services-grid">
          {SERVICES.map((service, index) => (
            <MobileServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
