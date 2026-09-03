import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageLayout from '../components/layout/PageLayout';
import PageSEO, { PAGE_SEO } from '../components/layout/PageSEO';
import Breadcrumb from '../components/shared/Breadcrumb';
import CTASection from '../components/shared/CTASection';
import { SERVICES } from '../constants/services.jsx';
import { EASE } from '../constants/animations';
import './ServicesPage.css';

export default function ServicesPage() {
  return (
    <PageLayout>
      <PageSEO {...PAGE_SEO.services} />

      <section className="services-page-hero section-padding">
        <div className="container">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services' }]} />

          <motion.div
            className="services-hero-content"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE.premium }}
          >
            <span className="tag">Services &amp; Capabilities</span>
            <h1 className="services-hero-title">
              Technology built around <span className="text-gradient-cyan">your business.</span>
            </h1>
            <p className="services-hero-desc">
              From customer-facing websites to internal business systems, AI solutions and data platforms, we build technology designed around real operational needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Detailed Cards Grid */}
      <section className="services-list-section section-padding">
        <div className="container">
          <div className="services-page-grid">
            {SERVICES.map((service, idx) => (
              <motion.article
                key={service.id}
                className="glass-panel service-page-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE.premium, delay: idx * 0.08 }}
              >
                <div className="service-page-card-header">
                  <div className="service-num-badge">{service.number}</div>
                  <div className="service-icon-box">{service.icon}</div>
                  <h2>{service.title}</h2>
                </div>

                <p className="service-page-desc">{service.fullDesc}</p>

                <div className="service-caps-block">
                  <h3>Key Capabilities</h3>
                  <ul className="service-caps-list">
                    {service.capabilities.map((cap) => (
                      <li key={cap}>
                        <svg className="bullet-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="service-page-card-footer">
                  <Link to={`/services/${service.slug}`} className="btn btn-primary">
                    Explore Service Detail
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Need a Custom Technical Architecture?"
        body="Let's analyze your operational requirements and define the right technology roadmap for your business."
        primaryBtn="Start a Project"
        secondaryBtn="Explore Our Work"
        secondaryHref="/portfolio"
      />
    </PageLayout>
  );
}
