import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageLayout from '../components/layout/PageLayout';
import PageSEO, { PAGE_SEO } from '../components/layout/PageSEO';
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
            <span className="tag">Portfolio</span>
            <h1 className="portfolio-hero-title">
              Real projects, <span className="text-gradient-cyan">real outcomes.</span>
            </h1>
            <p className="portfolio-hero-desc">
              Explore our delivered software engagements — from full digital transformations to high-conversion lead generation systems.
            </p>

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
                  className="glass-panel portfolio-card"
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE.premium, delay: idx * 0.1 }}
                >
                  {/* Project Image */}
                  <div className="portfolio-img-wrapper">
                    <motion.img
                      src={project.image}
                      alt={project.imageAlt}
                      className="portfolio-img"
                      loading="lazy"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: '-10%' }}
                      transition={{ duration: 0.6, ease: EASE.smooth, delay: 0.2 + idx * 0.1 }}
                    />
                    <div className="portfolio-img-overlay">
                      <Link to={`/portfolio/${project.slug}`} className="portfolio-overlay-btn">
                        View Case Study
                      </Link>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="portfolio-card-content">
                    <div className="portfolio-card-meta">
                      <span className="work-badge-tag">{project.category}</span>
                      <span className="portfolio-client">Client: {project.client}</span>
                    </div>

                    <h2 className="portfolio-card-title">{project.title}</h2>
                    <p className="portfolio-card-desc">{project.shortDesc}</p>

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
    </PageLayout>
  );
}
