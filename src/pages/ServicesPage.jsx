import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageLayout from '../components/layout/PageLayout';
import PageSEO from '../components/layout/PageSEO';
import { PAGE_SEO } from '../constants/seo';
import Breadcrumb from '../components/shared/Breadcrumb';
import CTASection from '../components/shared/CTASection';
import { SERVICES } from '../constants/services.jsx';
import { EASE } from '../constants/animations';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './ServicesPage.css';

const FILTER_CATEGORIES = [
  'All Capabilities',
  'Web & Platforms',
  'Mobile Apps',
  'AI & Automation',
  'Data & Analytics',
];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('All Capabilities');
  const prefersReduced = useReducedMotion();

  const filteredServices = SERVICES.filter((service) => {
    if (activeCategory === 'All Capabilities') return true;
    if (activeCategory === 'Web & Platforms') {
      return service.slug === 'web-development' || service.slug === 'business-applications';
    }
    if (activeCategory === 'Mobile Apps') {
      return service.slug === 'mobile-app-development';
    }
    if (activeCategory === 'AI & Automation') {
      return service.slug === 'ai-solutions' || service.slug === 'automation';
    }
    if (activeCategory === 'Data & Analytics') {
      return service.slug === 'data-analytics';
    }
    return true;
  });

  return (
    <PageLayout>
      <PageSEO {...PAGE_SEO.services} />

      <div className="services-page-wrapper">
        {/* ═══════════════════════════════════════════════════════
            HERO SECTION
            ═══════════════════════════════════════════════════════ */}
        <section className="services-page-hero section-padding">
          <div className="container">
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services' }]} />

            <motion.div
              className="services-hero-content"
              initial={{ opacity: 0, y: prefersReduced ? 0 : 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReduced ? 0.01 : 0.8, ease: EASE.premium }}
            >
              <span className="tag">ENGINEERING CAPABILITIES</span>
              <h1 className="services-hero-title">
                Technology built around <span className="text-gradient-cyan">your business.</span>
              </h1>
              <p className="services-hero-desc">
                From customer-facing websites and mobile applications to internal business portals, AI agents, and enterprise data platforms — engineered for velocity, security, and continuous scale.
              </p>

              {/* Hero Status & Metrics Badges */}
              <div className="services-hero-metrics">
                <div className="service-hero-metric-chip">
                  <span className="metric-dot" />
                  <span>6 Core Engineering Disciplines</span>
                </div>
                <div className="service-hero-metric-chip">
                  <span className="metric-dot" />
                  <span>100% Bespoke Codebases</span>
                </div>
                <div className="service-hero-metric-chip">
                  <span className="metric-dot" />
                  <span>Zero Vendor Lock-in</span>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="services-filter-row" role="tablist" aria-label="Filter services by capability">
                {FILTER_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={activeCategory === cat}
                    className={`services-filter-pill${activeCategory === cat ? ' active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SERVICES CARDS GRID
            ═══════════════════════════════════════════════════════ */}
        <section className="services-list-section section-padding">
          <div className="container">
            <div className="services-page-grid">
              <AnimatePresence mode="popLayout">
                {filteredServices.map((service, idx) => (
                  <motion.article
                    key={service.id}
                    className="service-page-card-v2"
                    initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: prefersReduced ? 0.01 : 0.5, ease: EASE.premium, delay: prefersReduced ? 0 : idx * 0.06 }}
                  >
                    <div className="service-page-card-header">
                      <div className="service-icon-box" aria-hidden="true">
                        {service.icon}
                      </div>
                      <div className="service-header-text">
                        <span className="service-num-badge">Service • {service.number}</span>
                        <h2>{service.title}</h2>
                      </div>
                    </div>

                    <p className="service-page-desc">{service.shortDesc || service.fullDesc}</p>

                    {/* Tech Stack Chips */}
                    {service.techStack && (
                      <div className="service-tech-chips-row" aria-label="Primary technologies">
                        {service.techStack.slice(0, 5).map((tech) => (
                          <span key={tech} className="service-tech-chip">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Core Deliverables */}
                    <div className="service-caps-block">
                      <span className="service-caps-title">CORE DELIVERABLES</span>
                      <ul className="service-caps-list">
                        {service.capabilities.slice(0, 6).map((cap) => (
                          <li key={cap}>
                            <svg className="bullet-check" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="service-page-card-footer">
                      <Link to={`/services/${service.slug}`} className="btn btn-primary service-cta-btn">
                        Explore Technical Architecture
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>

            {/* ═══════════════════════════════════════════════════
                ARCHITECTURAL TELEMETRY & STANDARDS BANNER
                ═══════════════════════════════════════════════════ */}
            <motion.div
              className="services-standards-banner"
              initial={{ opacity: 0, y: prefersReduced ? 0 : 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: prefersReduced ? 0.01 : 0.7, ease: EASE.premium }}
            >
              <div className="standards-text-col">
                <span className="standards-tag">ARCHITECTURAL GOVERNANCE</span>
                <h2 className="standards-title">Every line of code is engineered to enterprise standards.</h2>
                <p className="standards-desc">
                  We don't compromise on testing, type-safety, security compliance, or modular code structure. When you partner with Apex Spider Innovation, you receive production codebases that your in-house team or future investors can scale with confidence.
                </p>
              </div>

              <div className="standards-graphic-col">
                <div className="standards-spec-card" aria-hidden="true">
                  <div className="spec-row">
                    <span className="spec-label">Architecture</span>
                    <span className="spec-val">Microservices / Modular Monolith</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Security Protocol</span>
                    <span className="spec-val">OWASP Top 10 • TLS 1.3 Strict</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">API Specification</span>
                    <span className="spec-val">OpenAPI 3.1 &amp; Type-Safe Contracts</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">IP Rights</span>
                    <span className="spec-val" style={{ color: '#27C93F' }}>100% Client Owned Repository</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            FINAL CALL TO ACTION
            ═══════════════════════════════════════════════════════ */}
        <CTASection
          heading="Need a Custom Technical Architecture?"
          body="Let's analyze your operational requirements and define the right technology roadmap for your business."
          primaryBtn="Start a Project"
          secondaryBtn="Explore Our Work"
          secondaryHref="/portfolio"
        />
      </div>
    </PageLayout>
  );
}
