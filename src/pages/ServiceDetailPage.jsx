import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageLayout from '../components/layout/PageLayout';
import PageSEO from '../components/layout/PageSEO';
import Breadcrumb from '../components/shared/Breadcrumb';
import CTASection from '../components/shared/CTASection';
import { SERVICE_BY_SLUG } from '../constants/services.jsx';
import { CASE_STUDIES } from '../constants/caseStudies.jsx';
import { PROCESS_STEPS } from '../constants/process';
import { EASE } from '../constants/animations';
import { BRAND } from '../constants/brand';
import './ServiceDetailPage.css';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = SERVICE_BY_SLUG[slug];
  const [activeFaq, setActiveFaq] = useState(null);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const seoTitle = `${service.title} Services | ${BRAND.name}`;
  // Use the dedicated SEO description (≤160 chars) rather than the full body copy
  const seoDesc = service.seoDesc || service.fullDesc;
  const canonicalUrl = `${BRAND.url}/services/${service.slug}`;

  // Filter case studies relevant to this service
  const relevantProjects = CASE_STUDIES.filter((cs) => {
    if (slug === 'web-development') return true;
    if (slug === 'mobile-app-development' && cs.category.toLowerCase().includes('mobile')) return true;
    if (slug === 'ai-solutions' && cs.category.toLowerCase().includes('ai')) return true;
    if (slug === 'business-applications' && cs.category.toLowerCase().includes('business')) return true;
    if (slug === 'data-analytics' && cs.category.toLowerCase().includes('analytics')) return true;
    if (slug === 'automation' && cs.category.toLowerCase().includes('automation')) return true;
    return false;
  });

  return (
    <PageLayout>
      <PageSEO title={seoTitle} description={seoDesc} canonical={canonicalUrl} />

      {/* Service Detail Hero */}
      <section className="service-detail-hero section-padding">
        <div className="container">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: service.title },
            ]}
          />

          <motion.div
            className="service-hero-content"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE.premium }}
          >
            <span className="tag">Service Detail • {service.number}</span>
            <h1 className="service-detail-title">{service.title}</h1>
            <p className="service-detail-sub">{service.fullDesc}</p>

            <div className="service-hero-actions">
              <Link to="/contact" className="btn btn-primary">
                Discuss Your Project
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link to="/portfolio" className="btn btn-secondary">
                View All Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Capabilities & What We Build */}
      <section className="service-detail-section section-padding">
        <div className="container">
          <div className="service-detail-grid">
            <div className="glass-panel detail-card">
              <h2 className="detail-card-title">What We Build</h2>
              <ul className="detail-feature-list">
                {service.capabilities.map((cap) => (
                  <li key={cap}>
                    <svg className="bullet-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-panel detail-card">
              <h2 className="detail-card-title">Where This Helps Your Business</h2>
              <ul className="detail-problems-list">
                {service.businessProblems.map((problem) => (
                  <li key={problem}>
                    <span className="problem-icon">→</span>
                    <span>{problem}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Contextual Display */}
      <section className="service-detail-section section-padding">
        <div className="container">
          <div className="section-header">
            <span className="tag">Technology</span>
            <h2>Technologies We Use for {service.title}</h2>
          </div>

          <div className="tech-badge-container">
            {service.techStack.map((tech) => (
              <span key={tech} className="tech-badge-large glass-panel">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Development Approach — Single Source of Truth */}
      <section className="service-detail-section section-padding">
        <div className="container">
          <div className="section-header">
            <span className="tag">Approach</span>
            <h2>Our Development Approach</h2>
          </div>

          <div className="approach-5step">
            {PROCESS_STEPS.map((step) => (
              <div key={step.num} className="glass-panel approach-box">
                <span className="approach-num">{step.num}</span>
                <h3>{step.phase}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work — Contextual or General Portfolio */}
      <section className="service-detail-section section-padding">
        <div className="container">
          <div className="section-header">
            <span className="tag">Proof of Capability</span>
            <h2>{relevantProjects.length > 0 ? 'Featured Projects' : 'Related Projects & Portfolio'}</h2>
          </div>

          <div className="work-container">
            {(relevantProjects.length > 0 ? relevantProjects : CASE_STUDIES).map((project) => (
              <div key={project.slug} className="glass-panel work-card">
                <div className="work-visual-wrapper">
                  <div className="work-browser-mockup">
                    <motion.img 
                      src={project.image} 
                      alt={project.imageAlt} 
                      className="work-project-img" 
                      loading="lazy"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: '-10%' }}
                      transition={{ duration: 0.6, ease: EASE.smooth, delay: 0.15 }}
                    />
                  </div>
                </div>
                <div className="work-content-wrapper">
                  <span className="work-badge-tag">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.shortDesc}</p>
                  <Link to={`/portfolio/${project.slug}`} className="btn btn-primary">
                    View Case Study
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Specific FAQ */}
      {service.faqItems && service.faqItems.length > 0 && (
        <section className="service-detail-section section-padding">
          <div className="container">
            <div className="section-header">
              <span className="tag">Questions</span>
              <h2>{service.title} FAQ</h2>
            </div>

            <div className="faq-container">
              {service.faqItems.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div key={idx} className={`glass-panel faq-item${isOpen ? ' active' : ''}`}>
                    <button
                      className="faq-question-btn"
                      aria-expanded={isOpen}
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                    >
                      <span className="faq-question-text">{faq.q}</span>
                      <span className="faq-arrow-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </button>
                    {/* Answer is always in the DOM so crawlers can index the text.
                        CSS controls visibility; aria-hidden hides it from AT when closed. */}
                    <div
                      className={`faq-answer${isOpen ? ' open' : ''}`}
                      aria-hidden={!isOpen}
                    >
                      <div className="faq-answer-content">
                        <p className="faq-answer-text">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <CTASection
        heading={`Ready to build your ${service.title.toLowerCase()} solution?`}
        body="Let's discuss your requirements and define the right architecture for your business."
        primaryBtn="Start a Project"
        primaryHref="/contact"
      />
    </PageLayout>
  );
}
