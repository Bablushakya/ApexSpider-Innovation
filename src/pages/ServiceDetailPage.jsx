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
import { useReducedMotion } from '../hooks/useReducedMotion';
import './ServiceDetailPage.css';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = SERVICE_BY_SLUG[slug];
  const [activeFaq, setActiveFaq] = useState(null);
  const prefersReduced = useReducedMotion();

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const seoTitle = `${service.title} Services | ${BRAND.name}`;
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

      <div className="service-detail-page-wrapper">
        {/* ═══════════════════════════════════════════════════════
            1. HERO SECTION WITH SPECIFICATION TERMINAL
            ═══════════════════════════════════════════════════════ */}
        <section className="service-detail-hero section-padding">
          <div className="container">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Services', href: '/services' },
                { label: service.title },
              ]}
            />

            <div className="service-hero-layout">
              {/* Left Column: Hero Copy */}
              <motion.div
                className="service-hero-content"
                initial={{ opacity: 0, y: prefersReduced ? 0 : 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReduced ? 0.01 : 0.8, ease: EASE.premium }}
              >
                <div className="service-hero-badge">
                  <span className="badge-dot" aria-hidden="true" />
                  <span className="badge-tag">ENGINEERING SPECIFICATION • {service.number}</span>
                </div>

                <h1 className="service-detail-title">
                  {service.title} <span className="text-gradient-cyan">Architecture</span>
                </h1>
                
                <p className="service-detail-sub">{service.fullDesc}</p>

                {/* Metric Quick-Pills */}
                <div className="service-quick-pills">
                  <span className="quick-pill">
                    <span className="pill-dot" /> 100% Dedicated Senior Team
                  </span>
                  <span className="quick-pill">
                    <span className="pill-dot" /> Clean Modular Codebase
                  </span>
                  <span className="quick-pill">
                    <span className="pill-dot" /> Direct Architect Access
                  </span>
                </div>

                <div className="service-hero-actions">
                  <Link to="/contact" className="btn btn-primary">
                    Discuss Your Project
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <Link to="/portfolio" className="btn btn-secondary">
                    View Portfolio Case Studies
                  </Link>
                </div>
              </motion.div>

              {/* Right Column: High-Tech Spec Terminal */}
              <motion.div
                className="service-hero-graphic"
                initial={{ opacity: 0, x: prefersReduced ? 0 : 35 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: prefersReduced ? 0.01 : 0.85, ease: EASE.premium, delay: prefersReduced ? 0 : 0.15 }}
                aria-hidden="true"
              >
                <div className="glass-spec-terminal">
                  <div className="spec-terminal-header">
                    <div className="spec-dots">
                      <span className="spec-dot dot-red" />
                      <span className="spec-dot dot-yellow" />
                      <span className="spec-dot dot-green" />
                    </div>
                    <div className="spec-tab">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
                      {service.slug}.config.ts
                    </div>
                    <span className="spec-status-led">
                      <span className="pulse-mini" /> PRODUCTION
                    </span>
                  </div>

                  <div className="spec-terminal-code">
                    <p><span className="code-kw">export const</span> <span className="code-var">{service.title.replace(/\s+/g, '')}Service</span> = {'{'}</p>
                    <p style={{ paddingLeft: '16px' }}><span className="code-key">tier</span>: <span className="code-val">'Senior Enterprise'</span>,</p>
                    <p style={{ paddingLeft: '16px' }}><span className="code-key">architecture</span>: <span className="code-val">'Modular Micro-Pipelines'</span>,</p>
                    <p style={{ paddingLeft: '16px' }}><span className="code-key">security</span>: [<span className="code-val">'TLS-1.3'</span>, <span className="code-val">'RBAC'</span>, <span className="code-val">'OWASP'</span>],</p>
                    <p style={{ paddingLeft: '16px' }}><span className="code-key">ownership</span>: <span className="code-val">'100% Client Intellectual Property'</span>,</p>
                    <p style={{ paddingLeft: '16px' }}><span className="code-key">uptimeTarget</span>: <span className="code-num">99.99</span>,</p>
                    <p style={{ paddingLeft: '16px' }}><span className="code-key">status</span>: <span className="code-val">'Live Production-Ready'</span></p>
                    <p>{'};'}</p>
                  </div>

                  <div className="spec-terminal-metrics">
                    <div className="spec-metric-chip">
                      <span className="chip-val">0%</span>
                      <span className="chip-lbl">Tech Debt</span>
                    </div>
                    <div className="spec-metric-chip">
                      <span className="chip-val">&lt; 15ms</span>
                      <span className="chip-lbl">Target Latency</span>
                    </div>
                    <div className="spec-metric-chip">
                      <span className="chip-val">100%</span>
                      <span className="chip-lbl">Custom Build</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            2. CAPABILITIES & BUSINESS VALUE MATRICES
            ═══════════════════════════════════════════════════════ */}
        <section className="service-detail-section section-padding">
          <div className="container">
            <div className="section-header">
              <span className="tag">DELIVERABLES & STRATEGIC VALUE</span>
              <h2>Engineered for Measurable Impact</h2>
              <p>Everything we deliver is designed around operational efficiency and long-term business scalability.</p>
            </div>

            <div className="service-detail-grid">
              {/* Card 1: What We Build */}
              <motion.div
                className="detail-card-wrap"
                initial={{ opacity: 0, y: prefersReduced ? 0 : 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: prefersReduced ? 0.01 : 0.6, ease: EASE.premium }}
              >
                <div className="glass-panel detail-card">
                  <div className="detail-card-badge">
                    <span className="detail-badge-dot" />
                    <span>CAPABILITY SPECIFICATIONS</span>
                  </div>
                  <h3 className="detail-card-title">What We Build</h3>
                  <ul className="detail-feature-list" aria-label="What we build capabilities">
                    {service.capabilities.map((cap) => (
                      <li key={cap} className="detail-feature-item">
                        <div className="feature-icon-wrapper" aria-hidden="true">
                          <svg className="bullet-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span className="feature-text">{cap}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="card-accent-bar" aria-hidden="true" />
                </div>
              </motion.div>

              {/* Card 2: Where This Helps Your Business */}
              <motion.div
                className="detail-card-wrap"
                initial={{ opacity: 0, y: prefersReduced ? 0 : 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: prefersReduced ? 0.01 : 0.6, ease: EASE.premium, delay: prefersReduced ? 0 : 0.15 }}
              >
                <div className="glass-panel detail-card">
                  <div className="detail-card-badge detail-badge-purple">
                    <span className="detail-badge-dot" />
                    <span>STRATEGIC BUSINESS ROI</span>
                  </div>
                  <h3 className="detail-card-title">Where This Moves Your Business Forward</h3>
                  <ul className="detail-problems-list" aria-label="Business impact points">
                    {service.businessProblems.map((problem) => (
                      <li key={problem} className="detail-problem-item">
                        <div className="problem-icon-wrapper" aria-hidden="true">
                          <span className="problem-arrow">→</span>
                        </div>
                        <span className="problem-text">{problem}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="card-accent-bar card-bar-purple" aria-hidden="true" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            3. TECHNOLOGY STACK CONTEXTUAL DISPLAY
            ═══════════════════════════════════════════════════════ */}
        <section className="service-detail-section section-padding">
          <div className="container">
            <div className="section-header">
              <span className="tag">CORE FRAMEWORKS & STACK</span>
              <h2>Technologies We Use for {service.title}</h2>
              <p>Industry-standard, scalable frameworks chosen for maintainability, speed, and zero vendor lock-in.</p>
            </div>

            <div className="tech-badge-container">
              {service.techStack.map((tech) => (
                <div key={tech} className="tech-pill-cyber">
                  <span className="tech-pill-led" aria-hidden="true" />
                  <span className="tech-pill-name">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            4. DEVELOPMENT APPROACH — 5-STEP PIPELINE
            ═══════════════════════════════════════════════════════ */}
        <section className="service-detail-section section-padding">
          <div className="container">
            <div className="section-header">
              <span className="tag">METHODOLOGY & VELOCITY</span>
              <h2>Our Structured Engineering Lifecycle</h2>
              <p>A proven five-stage cycle designed to de-risk development, maintain strict QA, and ship with confidence.</p>
            </div>

            <div className="approach-timeline-track">
              <div className="approach-5step">
                {PROCESS_STEPS.map((step, idx) => (
                  <motion.div
                    key={step.num}
                    className="approach-box-wrap"
                    initial={{ opacity: 0, y: prefersReduced ? 0 : 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-5%' }}
                    transition={{ duration: prefersReduced ? 0.01 : 0.6, ease: EASE.premium, delay: prefersReduced ? 0 : idx * 0.1 }}
                  >
                    <div className="approach-box glass-panel">
                      <div className="approach-header">
                        <span className="approach-num-circle">{step.num}</span>
                        <span className="approach-phase-badge">{step.phase}</span>
                      </div>
                      <h3 className="approach-title">{step.label}</h3>
                      <p className="approach-desc">{step.desc}</p>
                      <div className="approach-bottom-line" aria-hidden="true" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            5. FEATURED WORK & CASE STUDIES
            ═══════════════════════════════════════════════════════ */}
        <section className="service-detail-section section-padding">
          <div className="container">
            <div className="section-header">
              <span className="tag">PROVEN CAPABILITIES</span>
              <h2>{relevantProjects.length > 0 ? 'Featured Case Studies' : 'Related Projects & Portfolio'}</h2>
              <p>Real-world implementations delivered with senior engineering standards and verified outcomes.</p>
            </div>

            <div className="service-work-grid">
              {(relevantProjects.length > 0 ? relevantProjects : CASE_STUDIES).map((project) => (
                <article key={project.slug} className="service-work-card glass-panel">
                  <div className="work-visual-wrapper">
                    <div className="work-browser-mockup">
                      <div className="work-browser-chrome" aria-hidden="true">
                        <span className="chrome-dot dot-red" />
                        <span className="chrome-dot dot-yellow" />
                        <span className="chrome-dot dot-green" />
                      </div>
                      <img 
                        src={project.image} 
                        alt={project.imageAlt} 
                        className="work-project-img" 
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="service-work-content">
                    <div className="service-work-meta">
                      <span className="work-badge-tag">{project.category}</span>
                      <span className="work-client-lbl">Client: <strong>{project.client}</strong></span>
                    </div>

                    <h3 className="service-work-title">{project.title}</h3>
                    <p className="service-work-desc">{project.shortDesc}</p>

                    <div className="service-work-techs">
                      {project.services.slice(0, 3).map((svc, i) => (
                        <span key={i} className="work-mini-tag">{svc}</span>
                      ))}
                    </div>

                    <div className="service-work-action">
                      <Link to={`/portfolio/${project.slug}`} className="btn btn-primary work-btn">
                        <span>View Full Case Study</span>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            6. SERVICE-SPECIFIC FAQ ACCORDION
            ═══════════════════════════════════════════════════════ */}
        {service.faqItems && service.faqItems.length > 0 && (
          <section className="service-detail-section section-padding">
            <div className="container">
              <div className="section-header">
                <span className="tag">QUESTIONS & ANSWERS</span>
                <h2>Frequently Asked Questions — {service.title}</h2>
                <p>Specific architectural and scoping answers for your {service.title.toLowerCase()} project.</p>
              </div>

              <div className="faq-container" role="list">
                {service.faqItems.map((faq, idx) => {
                  const isOpen = activeFaq === idx;
                  const answerId = `service-faq-answer-${idx}`;
                  const questionId = `service-faq-question-${idx}`;

                  return (
                    <div key={idx} role="listitem" className={`glass-panel faq-item${isOpen ? ' active' : ''}`}>
                      <button
                        id={questionId}
                        className="faq-question-btn"
                        aria-expanded={isOpen}
                        aria-controls={answerId}
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                      >
                        <span className="faq-question-text">{faq.q}</span>
                        <span className="faq-arrow-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </span>
                      </button>

                      <div
                        id={answerId}
                        className={`faq-answer${isOpen ? ' open' : ''}`}
                        role="region"
                        aria-labelledby={questionId}
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

        {/* ═══════════════════════════════════════════════════════
            7. CONVERSION CTA BANNER
            ═══════════════════════════════════════════════════════ */}
        <CTASection
          heading={`Ready to build your ${service.title.toLowerCase()} solution?`}
          body="Let's discuss your requirements and architect a high-performance system for your business."
          primaryBtn="Start a Project"
          primaryHref="/contact"
        />
      </div>
    </PageLayout>
  );
}
