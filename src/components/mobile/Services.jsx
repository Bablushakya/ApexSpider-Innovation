import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../../constants/services.jsx';
import { EASE } from '../../constants/animations';
import './Services.css';

function MobileServiceCard({ service }) {
  return (
    <motion.div
      className="mobile-service-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6, ease: EASE.premium }}
    >
      <div className="mobile-service-header">
        <div className="mobile-service-icon">
          {service.icon}
        </div>
        <h3 className="mobile-service-title">{service.title}</h3>
      </div>

      <p className="mobile-service-desc">{service.desc}</p>

      <div className="mobile-service-footer">
        <a
          href="#contact"
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
        </a>
      </div>
    </motion.div>
  );
}

export default function MobileServices() {
  return (
    <section
      className="mobile-services-section section-padding"
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

        <div className="mobile-services-grid">
          {SERVICES.map((service) => (
            <MobileServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
