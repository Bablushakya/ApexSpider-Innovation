import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageLayout from '../components/layout/PageLayout';
import PageSEO from '../components/layout/PageSEO';
import Breadcrumb from '../components/shared/Breadcrumb';
import CTASection from '../components/shared/CTASection';
import { CASE_STUDY_BY_SLUG } from '../constants/caseStudies.jsx';
import { BRAND } from '../constants/brand';
import { EASE } from '../constants/animations';
import './CaseStudyPage.css';

export default function CaseStudyPage() {
  const { slug } = useParams();
  const project = CASE_STUDY_BY_SLUG[slug];

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

  const seoTitle = project.seoTitle || `${project.title} | Case Study — ${BRAND.name}`;
  const seoDesc = project.seoDesc || project.overview;

  return (
    <PageLayout>
      <PageSEO
        title={seoTitle}
        description={seoDesc}
        canonical={`${BRAND.url}/portfolio/${project.slug}`}
        ogImage={project.ogImage}
      />

      {/* Case Study Hero */}
      <section className="cs-hero section-padding">
        <div className="container">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Portfolio', href: '/portfolio' },
              { label: project.client },
            ]}
          />

          <motion.div
            className="cs-hero-content"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE.premium }}
          >
            <span className="work-badge-tag">{project.tag}</span>
            <h1 className="cs-title">{project.title}</h1>
            <p className="cs-overview">{project.overview}</p>

            <div className="cs-meta-row">
              <div className="cs-meta-item">
                <span className="cs-meta-label">Client</span>
                <span className="cs-meta-value">{project.client}</span>
              </div>
              <div className="cs-meta-item">
                <span className="cs-meta-label">Category</span>
                <span className="cs-meta-value">{project.category}</span>
              </div>
              {project.liveUrl && (
                <div className="cs-meta-item">
                  <span className="cs-meta-label">Live Project</span>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="cs-meta-link">
                    View live ↗
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Image */}
      <section className="cs-image-section">
        <div className="container">
          <div className="cs-browser-mockup">
            <div className="cs-browser-chrome">
              <span className="chrome-dot dot-red" />
              <span className="chrome-dot dot-yellow" />
              <span className="chrome-dot dot-green" />
            </div>
            <motion.img
              src={project.image}
              alt={project.imageAlt}
              className="cs-project-img"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, ease: EASE.smooth, delay: 0.2 }}
            />
          </div>
        </div>
      </section>

      {/* Challenge + Objectives */}
      <section className="cs-section section-padding">
        <div className="container">
          <div className="cs-two-col">
            <div className="glass-panel cs-panel">
              <h2 className="cs-section-title">The Challenge</h2>
              <p>{project.clientChallenge}</p>
            </div>

            <div className="glass-panel cs-panel">
              <h2 className="cs-section-title">Objectives</h2>
              <ul className="cs-objectives-list">
                {project.objectives.map((obj, idx) => (
                  <li key={idx}>
                    <svg className="bullet-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {obj}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="cs-section section-padding">
        <div className="container">
          <div className="glass-panel cs-panel cs-panel-wide">
            <h2 className="cs-section-title">The Solution</h2>
            <p>{project.solution}</p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="cs-section section-padding">
        <div className="container">
          <div className="section-header">
            <span className="tag">What Was Delivered</span>
            <h2>Key Features</h2>
          </div>

          <div className="cs-features-grid">
            {project.keyFeatures.map((feature, idx) => (
              <motion.div
                key={feature}
                className="glass-panel cs-feature-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE.premium, delay: idx * 0.07 }}
              >
                <div className="cs-feature-num">{String(idx + 1).padStart(2, '0')}</div>
                <p>{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services + Technology */}
      <section className="cs-section section-padding">
        <div className="container">
          <div className="cs-tech-row">
            <div className="glass-panel cs-panel">
              <h2 className="cs-section-title">Services Provided</h2>
              <div className="cs-tag-cloud">
                {project.services.map((svc, i) => (
                  <span key={i} className="work-tech-badge">{svc}</span>
                ))}
              </div>
            </div>
            <div className="glass-panel cs-panel">
              <h2 className="cs-section-title">Technology</h2>
              <div className="cs-tag-cloud">
                {project.technology.map((tech, i) => (
                  <span key={i} className="work-tech-badge">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outcome */}
      <section className="cs-section section-padding">
        <div className="container">
          <div className="glass-panel cs-panel cs-outcome-panel">
            <h2 className="cs-section-title">Outcome</h2>
            <p className="cs-outcome-text">{project.outcomes}</p>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                aria-label={project.liveLabel}
              >
                View Live Project ↗
              </a>
            )}
          </div>
        </div>
      </section>

      <CTASection
        heading="Have a similar project?"
        body="Tell us what you need to build or improve."
        primaryBtn="Start a Project"
        secondaryBtn="View More Portfolio"
        secondaryHref="/portfolio"
      />
    </PageLayout>
  );
}
