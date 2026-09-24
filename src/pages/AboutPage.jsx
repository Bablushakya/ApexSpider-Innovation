import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../components/layout/PageLayout';
import PageSEO, { PAGE_SEO } from '../components/layout/PageSEO';
import Breadcrumb from '../components/shared/Breadcrumb';
import CTASection from '../components/shared/CTASection';
import { ABOUT_CONTENT } from '../constants/about';
import { EASE } from '../constants/animations';
import { useIsMobile } from '../hooks/useIsMobile';
import './AboutPage.css';

// Lazy load Team components
const DesktopTeam = lazy(() => import('../components/desktop/Team'));
const MobileTeam = lazy(() => import('../components/mobile/Team'));

export default function AboutPage() {
  const isMobile = useIsMobile();
  const { hero, whoWeAre, whatWeBelieve, ourApproach, expertise, techStack, cta } = ABOUT_CONTENT;

  return (
    <PageLayout>
      <PageSEO {...PAGE_SEO.about} />

      <section className="about-hero-section section-padding">
        <div className="container">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />

          <motion.div
            className="about-hero-content"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE.premium }}
          >
            <span className="tag">{hero.tag}</span>
            <h1 className="about-hero-title">
              {hero.headline} <span className="text-gradient-cyan">{hero.subheadline}</span>
            </h1>
            <p className="about-hero-desc">{hero.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="about-section section-padding">
        <div className="container">
          <div className="glass-panel about-panel">
            <h2 className="about-section-title">{whoWeAre.heading}</h2>
            <div className="about-body-text">
              {whoWeAre.body.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Believe */}
      <section className="about-section section-padding">
        <div className="container">
          <div className="section-header">
            <span className="tag">Principles</span>
            <h2>{whatWeBelieve.heading}</h2>
          </div>

          <div className="believe-grid">
            {whatWeBelieve.points.map((point, idx) => (
              <motion.div
                key={point.title}
                className="glass-panel believe-card"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE.premium, delay: idx * 0.1 }}
              >
                <h3>{point.title}</h3>
                <p>{point.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach Timeline */}
      <section className="about-section section-padding">
        <div className="container">
          <div className="section-header">
            <span className="tag">Process</span>
            <h2>{ourApproach.heading}</h2>
          </div>

          <div className="approach-timeline">
            {ourApproach.steps.map((step, idx) => (
              <motion.div
                key={step.step}
                className="approach-step-card glass-panel"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE.premium, delay: idx * 0.08 }}
              >
                <div className="step-num">{step.step}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-body">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise & Technology Stack */}
      <section className="about-section section-padding">
        <div className="container">
          <div className="section-header">
            <span className="tag">Stack</span>
            <h2>{techStack.heading}</h2>
          </div>

          <div className="tech-stack-grid">
            {techStack.categories.map((cat, idx) => (
              <div key={cat.name} className="glass-panel tech-cat-card">
                <h3>{cat.name}</h3>
                <div className="tech-tags">
                  {cat.items.map((item) => (
                    <span key={item} className="tech-tag-badge">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet The Team */}
      <Suspense fallback={null}>
        {isMobile ? <MobileTeam /> : <DesktopTeam />}
      </Suspense>

      {/* CTA */}
      <CTASection heading={cta.heading} body={cta.body} primaryBtn={cta.primaryBtn} secondaryBtn={cta.secondaryBtn} />
    </PageLayout>
  );
}
