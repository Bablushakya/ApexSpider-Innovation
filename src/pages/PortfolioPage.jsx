import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageLayout from '../components/layout/PageLayout';
import PageSEO from '../components/layout/PageSEO';
import { PAGE_SEO } from '../constants/seo';
import Breadcrumb from '../components/shared/Breadcrumb';
import CTASection from '../components/shared/CTASection';
import { CASE_STUDIES } from '../constants/caseStudies.jsx';
import { EASE } from '../constants/animations';
import './PortfolioPage.css';

const CATEGORIES = ['All Projects', 'Travel & Digital Experience', 'E-Commerce & Lead Generation'];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All Projects');

  const filteredProjects =
    activeCategory === 'All Projects'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((p) => p.category === activeCategory);

  return (
    <PageLayout>
      <PageSEO {...PAGE_SEO.portfolio} />

      <div className="portfolio-page-wrapper">
        {/* Hero */}
        <section className="portfolio-hero section-padding">
          <div className="container">
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Portfolio' }]} />

            <motion.div
              className="portfolio-hero-content"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE.premium }}
            >
              <span className="tag">DELIVERED WORK</span>
              <h1 className="portfolio-hero-title">
                Real projects, <span className="text-gradient-cyan">proven outcomes.</span>
              </h1>
              <p className="portfolio-hero-desc">
                Explore our delivered software engagements — from full digital transformations and custom applications to high-conversion lead generation platforms.
              </p>

              {/* Metrics Highlights */}
              <div className="portfolio-hero-metrics">
                <div className="portfolio-metric-badge">
                  <span className="dot" />
                  <span>50+ Projects Delivered</span>
                </div>
                <div className="portfolio-metric-badge">
                  <span className="dot" />
                  <span>100% Client Satisfaction</span>
                </div>
                <div className="portfolio-metric-badge">
                  <span className="dot" />
                  <span>Senior Engineering Standards</span>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="portfolio-filter-row" role="tablist" aria-label="Filter case studies by category">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={activeCategory === cat}
                    className={`portfolio-filter-pill${activeCategory === cat ? ' active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

      {/* Portfolio Grid */}
      <section className="portfolio-projects-section section-padding">
        <div className="container">
          <div className="portfolio-grid">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.article
                  key={project.slug}
                  className="glass-panel portfolio-card-v2"
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE.premium, delay: idx * 0.1 }}
                >
                  {/* Browser Mockup Frame */}
                  <div className="portfolio-browser-mockup">
                    <div className="browser-header-bar">
                      <div className="browser-dots" aria-hidden="true">
                        <span className="dot dot-red" />
                        <span className="dot dot-yellow" />
                        <span className="dot dot-green" />
                      </div>
                      <div className="browser-url-bar">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <span>{project.slug}.apexspider.live</span>
                      </div>
                    </div>

                    <div className="portfolio-img-wrapper">
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        className="portfolio-img"
                        loading="lazy"
                      />
                      <div className="portfolio-img-overlay">
                        <Link to={`/portfolio/${project.slug}`} className="portfolio-overlay-btn">
                          View Case Study
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="portfolio-card-content">
                    <div className="portfolio-card-meta">
                      <span className="work-badge-tag">{project.category}</span>
                      <span className="portfolio-client">Client: <strong>{project.client}</strong></span>
                    </div>

                    <h2 className="portfolio-card-title">{project.title}</h2>
                    <p className="portfolio-card-desc">{project.shortDesc}</p>

                    {/* Metric Highlights */}
                    {project.metrics && (
                      <div className="portfolio-metrics-grid">
                        {project.metrics.map((m, mIdx) => (
                          <div key={mIdx} className="portfolio-metric-chip">
                            <span className="metric-icon">{m.icon}</span>
                            <div className="metric-info">
                              <span className="metric-val">{m.value}</span>
                              <span className="metric-lbl">{m.label}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Service Tags */}
                    <div className="portfolio-service-tags">
                      {project.services.slice(0, 4).map((svc, i) => (
                        <span key={i} className="work-tech-badge">{svc}</span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="portfolio-card-actions">
                      <Link to={`/portfolio/${project.slug}`} className="btn btn-primary">
                        View Case Study
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary"
                          aria-label={project.liveLabel}
                        >
                          Live Project ↗
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <CTASection
        heading="Ready to build your next success story?"
        body="From concept to high-fidelity deployment, let's architect and launch your digital product."
        primaryBtn="Start a Project"
        secondaryBtn="Explore Our Services"
        secondaryHref="/services"
      />
      </div>
    </PageLayout>
  );
}
