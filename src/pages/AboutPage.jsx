import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../components/layout/PageLayout';
import PageSEO from '../components/layout/PageSEO';
import { PAGE_SEO } from '../constants/seo';
import Breadcrumb from '../components/shared/Breadcrumb';
import CTASection from '../components/shared/CTASection';
// import TrustedByMarquee from '../components/shared/TrustedByMarquee'; // Kept for future use
import { ABOUT_CONTENT } from '../constants/about.jsx';
import { EASE } from '../constants/animations';
import { useIsMobile } from '../hooks/useIsMobile';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './AboutPage.css';

// Lazy load Team components
const DesktopTeam = lazy(() => import('../components/desktop/Team'));
const MobileTeam = lazy(() => import('../components/mobile/Team'));

/* ═══════════════════════════════════════════════════════════
   2. TECH STACK ITEMS (Official Logos & Dual Rows)
   ═══════════════════════════════════════════════════════════ */

/* Row 1: Frontend & Backend (Left to Right) */
const TECH_ROW_1 = [
  {
    name: 'React',
    badge: 'Frontend',
    icon: (
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
        <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#00D8FF" strokeWidth="1.6" transform="rotate(0 16 16)" />
        <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#00D8FF" strokeWidth="1.6" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#00D8FF" strokeWidth="1.6" transform="rotate(120 16 16)" />
        <circle cx="16" cy="16" r="2.4" fill="#00D8FF" />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    badge: 'Backend',
    icon: (
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
        <path d="M16 3L27 9.5V22.5L16 29L5 22.5V9.5L16 3Z" stroke="#539E43" strokeWidth="2" fill="rgba(83,158,67,0.12)" />
        <path d="M16 10V22M16 16L22 19.5M16 16L10 19.5" stroke="#539E43" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Python',
    badge: 'AI & Data',
    icon: (
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
        <path d="M15.5 3C10.5 3 11 5.2 11 5.2V7.4H16V9.1H8.8C6.6 9.1 4.7 10.4 4.7 13.5C4.7 17 6.4 17.5 7.8 17.5H9.5V15.2C9.5 12.8 11.5 12.8 11.5 12.8H16.2C18.6 12.8 18.6 10.8 18.6 10.8V5.3C18.6 5.3 19 3 15.5 3ZM13.2 4.7C13.8 4.7 14.3 5.2 14.3 5.8C14.3 6.4 13.8 6.9 13.2 6.9C12.6 6.9 12.1 6.4 12.1 5.8C12.1 5.2 12.6 4.7 13.2 4.7Z" fill="#387EB8" />
        <path d="M16.5 29C21.5 29 21 26.8 21 26.8V24.6H16V22.9H23.2C25.4 22.9 27.3 21.6 27.3 18.5C27.3 15 25.6 14.5 24.2 14.5H22.5V16.8C22.5 19.2 20.5 19.2 20.5 19.2H15.8C13.4 19.2 13.4 21.2 13.4 21.2V26.7C13.4 26.7 13 29 16.5 29ZM18.8 27.3C18.2 27.3 17.7 26.8 17.7 26.2C17.7 25.6 18.2 25.1 18.8 25.1C19.4 25.1 19.9 25.6 19.9 26.2C19.9 26.8 19.4 27.3 18.8 27.3Z" fill="#FFE052" />
      </svg>
    ),
  },
  {
    name: 'JavaScript',
    badge: 'Core',
    icon: (
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="4" width="24" height="24" rx="4" fill="#F7DF1E" />
        <path d="M15 14V22C15 24.2 13.5 25 11.5 25C9.8 25 8.7 24 8.2 23.2L9.6 21.8C10.1 22.4 10.7 22.9 11.5 22.9C12.4 22.9 12.9 22.4 12.9 21.4V14H15ZM23.5 14C25.5 14 26.8 15.2 26.8 17.2C26.8 18.8 25.8 19.8 24.3 20.3L23.1 20.7C22.1 21.1 21.6 21.4 21.6 22C21.6 22.6 22.2 23 23.1 23C24 23 24.8 22.5 25.3 21.9L26.6 23.2C25.8 24.3 24.5 25 23 25C20.8 25 19.4 23.7 19.4 21.8C19.4 20 20.6 19.1 22.2 18.6L23.4 18.2C24.2 17.9 24.6 17.5 24.6 17C24.6 16.4 24 16 23.2 16C22.4 16 21.8 16.4 21.3 17.1L20 15.8C20.8 14.7 22 14 23.5 14Z" fill="#000000" />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    badge: 'Core',
    icon: (
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="4" width="24" height="24" rx="4" fill="#3178C6" />
        <path d="M9 13H17M13 13V24" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M25 14.5C25 14.5 23.8 13.5 21.8 13.5C19.5 13.5 18.2 14.8 18.2 16.5C18.2 19.5 25.5 18.5 25.5 21.5C25.5 23.5 23.8 24.5 21.5 24.5C19.2 24.5 17.8 23 17.8 23" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'HTML5 & CSS3',
    badge: 'Markup & Style',
    icon: (
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
        <polygon points="6,3 26,3 24,26 16,29 8,26" fill="rgba(227,79,38,0.15)" stroke="#E34F26" strokeWidth="2" />
        <path d="M16 6V26L22.5 24L24 8H16Z" fill="#E34F26" opacity="0.8" />
        <path d="M11 11H21M11.5 15H20.5M12 19H16L19.5 19L19 22.5L16 23.5L13 22.5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Flutter',
    badge: 'Mobile App',
    icon: (
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
        <path d="M19 4L7 16L12 21L27 6L19 4Z" fill="#42A5F5" />
        <path d="M19 18L13 24L17 28L27 18H19Z" fill="#0D47A1" />
        <path d="M12 21L16 25L23 18L19 14L12 21Z" fill="#29B6F6" />
      </svg>
    ),
  },
  {
    name: 'Next.js',
    badge: 'Full Stack',
    icon: (
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="13" fill="#000000" stroke="#FFFFFF" strokeWidth="1.8" />
        <path d="M12 10V22M12 10L23 23M20 10V18" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

/* Row 2: Databases, AI & Infrastructure (Right to Left) */
const TECH_ROW_2 = [
  {
    name: 'MongoDB',
    badge: 'Database',
    icon: (
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
        <path d="M16 3C16 3 9 10 9 17C9 23 13 27 16 29C19 27 23 23 23 17C23 10 16 3 16 3Z" stroke="#47A248" strokeWidth="1.8" fill="rgba(71,162,72,0.15)" />
        <path d="M16 4V28" stroke="#47A248" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Firebase',
    badge: 'Cloud & Auth',
    icon: (
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
        <path d="M6 23L10 8L15 15L6 23Z" fill="#FFA000" />
        <path d="M26 23L22 4L15 15L26 23Z" fill="#FFCA28" />
        <path d="M6 23L16 29L26 23L15 15L6 23Z" fill="#F57C00" />
      </svg>
    ),
  },
  {
    name: 'OpenAI API',
    badge: 'Generative AI',
    icon: (
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="13" stroke="#10A37F" strokeWidth="1.8" fill="rgba(16,163,127,0.12)" />
        <path d="M16 7V13M16 19V25M8 12L13 15M19 17L24 20M8 20L13 17M19 15L24 12" stroke="#10A37F" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="16" cy="16" r="2.5" fill="#10A37F" />
      </svg>
    ),
  },
  {
    name: 'LangChain',
    badge: 'AI Agents',
    icon: (
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
        <circle cx="11" cy="16" r="5" stroke="#00A67E" strokeWidth="2" fill="rgba(0,166,126,0.15)" />
        <circle cx="21" cy="16" r="5" stroke="#00D4FF" strokeWidth="2" fill="rgba(0,212,255,0.15)" />
        <path d="M15 16H17" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Vercel',
    badge: 'Edge Cloud',
    icon: (
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
        <polygon points="16,5 28,26 4,26" fill="#FFFFFF" stroke="#00D4FF" strokeWidth="1" />
      </svg>
    ),
  },
  {
    name: 'Cloud Hosting (AWS)',
    badge: 'Infrastructure',
    icon: (
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
        <path d="M8 21C5.8 21 4 19.2 4 17C4 15 5.5 13.3 7.5 13.1C8.2 9.6 11.3 7 15 7C19.4 7 23 10.6 23 15C25.2 15.2 27 17 27 19.2C27 21.4 25.2 23 23 23H9" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 25C14 28 20 28 24 25" stroke="#FF9900" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    badge: 'Relational DB',
    icon: (
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
        <ellipse cx="16" cy="8" rx="10" ry="4" stroke="#4169E1" strokeWidth="2" fill="rgba(65,105,225,0.15)" />
        <path d="M6 8V16C6 18.2 10.5 20 16 20C21.5 20 26 18.2 26 16V8M6 16V24C6 26.2 10.5 28 16 28C21.5 28 26 26.2 26 24V16" stroke="#4169E1" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: 'Docker',
    badge: 'Containers',
    icon: (
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
        <path d="M4 18C5 17 7 17 9 18C11 19 13 19 15 18C17 17 19 17 21 18C23 19 25 19 28 17C28 23 23 27 16 27C8 27 4 22 4 18Z" stroke="#2496ED" strokeWidth="2" fill="rgba(36,150,237,0.15)" />
        <rect x="7" y="13" width="3" height="3" fill="#2496ED" />
        <rect x="11" y="13" width="3" height="3" fill="#2496ED" />
        <rect x="15" y="13" width="3" height="3" fill="#2496ED" />
        <rect x="11" y="9" width="3" height="3" fill="#2496ED" />
        <rect x="15" y="9" width="3" height="3" fill="#2496ED" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  const isMobile = useIsMobile();
  const prefersReduced = useReducedMotion();
  const { hero, cta } = ABOUT_CONTENT;

  return (
    <PageLayout>
      <PageSEO {...PAGE_SEO.about} />

      <div className="about-page-wrapper">
        {/* ═══════════════════════════════════════════════════════
            1. HERO SECTION (With Trusted By Marquee)
            ═══════════════════════════════════════════════════════ */}
        <section className="about-hero-section section-padding">
          <div className="container">
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />

            <motion.div
              className="about-hero-content"
              initial={{ opacity: 0, y: prefersReduced ? 0 : 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReduced ? 0.01 : 0.8, ease: EASE.premium }}
            >
              <span className="tag">{hero.tag}</span>
              <h1 className="about-hero-title">
                {hero.headline} <span className="text-gradient-cyan">{hero.subheadline}</span>
              </h1>
              <p className="about-hero-desc">{hero.description}</p>
            </motion.div>

            {/* TRUSTED BY HORIZONTAL MARQUEE — Kept in codebase, commented out for future use
            <TrustedByMarquee title="Trusted by modern enterprises & startup founders" />
            */}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            2. THE 3 HORIZONTAL BANNERS (Zig-Zag Alternating Layout)
            ═══════════════════════════════════════════════════════ */}
        <section className="about-banners-section">
          <div className="container about-banners-container">

            {/* ── BANNER 1: Graphic on Left, Text on Right (Slide in from Left) ── */}
            <motion.div
              className="about-banner-card"
              initial={{ opacity: 0, x: prefersReduced ? 0 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: prefersReduced ? 0.01 : 0.75, ease: EASE.premium }}
            >
              {/* Graphic Left: Code Architecture Terminal */}
              <div className="banner-graphic-col">
                <div className="glass-terminal-card" aria-hidden="true">
                  <div className="terminal-header">
                    <div className="terminal-dots">
                      <span className="terminal-dot dot-red" />
                      <span className="terminal-dot dot-yellow" />
                      <span className="terminal-dot dot-green" />
                    </div>
                    <div className="terminal-tab">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
                      architecture.config.ts
                    </div>
                    <div className="terminal-status-badge">
                      <span className="pulse-led" />
                      ACTIVE
                    </div>
                  </div>

                  <div className="terminal-body">
                    <p><span className="code-keyword">export const</span> <span className="code-fn">AppArchitecture</span> = {'{'}</p>
                    <p style={{ paddingLeft: '16px' }}><span className="code-prop">standard</span>: <span className="code-str">'Senior-Engineered'</span>,</p>
                    <p style={{ paddingLeft: '16px' }}><span className="code-prop">paradigm</span>: <span className="code-str">'Business-First Workflows'</span>,</p>
                    <p style={{ paddingLeft: '16px' }}><span className="code-prop">security</span>: [<span className="code-str">'OWASP-Top-10'</span>, <span className="code-str">'TLS-1.3'</span>],</p>
                    <p style={{ paddingLeft: '16px' }}><span className="code-prop">scalability</span>: <span className="code-str">'Infinite Cloud-Native'</span>,</p>
                    <p style={{ paddingLeft: '16px' }}><span className="code-prop">latency</span>: <span className="code-keyword">&lt; 15ms</span>,</p>
                    <p>{'};'}</p>
                  </div>

                  <div className="terminal-metrics-row">
                    <div className="metric-pill">
                      <span className="metric-pill-val">0%</span>
                      <span className="metric-pill-lbl">Tech Debt</span>
                    </div>
                    <div className="metric-pill">
                      <span className="metric-pill-val">99.99%</span>
                      <span className="metric-pill-lbl">Uptime SLA</span>
                    </div>
                    <div className="metric-pill">
                      <span className="metric-pill-val">100%</span>
                      <span className="metric-pill-lbl">Modular</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Right: Who We Are */}
              <div className="banner-content-col">
                <span className="banner-tag">WHO WE ARE</span>
                <h2 className="banner-title">Engineered for Purpose, Not Just Hype.</h2>
                <p className="banner-desc">
                  Apex Spider Innovation is a technology consultancy and custom software house. We partner directly with founders and forward-thinking enterprises who have outgrown generic off-the-shelf software and need digital products engineered around how their business actually operates.
                </p>

                <div className="banner-feature-list">
                  <div className="banner-feature-item">
                    <div className="banner-feature-icon">✓</div>
                    <div className="banner-feature-text">
                      <strong>Workflow-Centric Systems:</strong> Software designed to map your exact operational cadence, eliminating manual bottlenecks.
                    </div>
                  </div>
                  <div className="banner-feature-item">
                    <div className="banner-feature-icon">✓</div>
                    <div className="banner-feature-text">
                      <strong>Senior Engineering Standards:</strong> Documented API contracts, strict typing, clean architecture, and long-term maintainability.
                    </div>
                  </div>
                  <div className="banner-feature-item">
                    <div className="banner-feature-icon">✓</div>
                    <div className="banner-feature-text">
                      <strong>Zero Vendor Lock-In:</strong> You retain 100% intellectual property, full repository access, and unrestricted cloud control.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── BANNER 2: Text on Left, Dashboard Mockup on Right (Slide in from Right) ── */}
            <motion.div
              className="about-banner-card"
              initial={{ opacity: 0, x: prefersReduced ? 0 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: prefersReduced ? 0.01 : 0.75, ease: EASE.premium }}
            >
              {/* Text Left: Our Process */}
              <div className="banner-content-col">
                <span className="banner-tag">OUR PROCESS & VELOCITY</span>
                <h2 className="banner-title">Precision Architecture at Startup Speed.</h2>
                <p className="banner-desc">
                  We eliminate agency fluff, endless committee meetings, and vague timelines. Our streamlined five-stage product lifecycle delivers production-grade software with relentless speed and mathematical precision.
                </p>

                <div className="banner-feature-list">
                  <div className="banner-feature-item">
                    <div className="banner-feature-icon">01</div>
                    <div className="banner-feature-text">
                      <strong>Discover & Architect:</strong> We audit existing workflows, map data schemas, and formulate airtight API contracts before writing code.
                    </div>
                  </div>
                  <div className="banner-feature-item">
                    <div className="banner-feature-icon">02</div>
                    <div className="banner-feature-text">
                      <strong>Interactive Prototyping:</strong> High-fidelity visual interfaces and micro-interactions validated with real stakeholders.
                    </div>
                  </div>
                  <div className="banner-feature-item">
                    <div className="banner-feature-icon">03</div>
                    <div className="banner-feature-text">
                      <strong>Automated CI/CD & Launch:</strong> Zero-downtime rolling releases, end-to-end regression testing, and instant multi-region failover.
                    </div>
                  </div>
                </div>
              </div>

              {/* Graphic Right: Enterprise Dashboard Mockup */}
              <div className="banner-graphic-col">
                <div className="glass-dashboard-card" aria-hidden="true">
                  <div className="dashboard-nav">
                    <div className="dash-title">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2">
                        <line x1="18" y1="20" x2="18" y2="10" />
                        <line x1="12" y1="20" x2="12" y2="4" />
                        <line x1="6" y1="20" x2="6" y2="14" />
                      </svg>
                      Enterprise Telemetry
                    </div>
                    <span className="dash-live-badge">● LIVE METRICS</span>
                  </div>

                  <div className="dashboard-kpi-grid">
                    <div className="kpi-card-mini">
                      <span className="kpi-val">+340%</span>
                      <span className="kpi-lbl">Velocity Lift</span>
                    </div>
                    <div className="kpi-card-mini">
                      <span className="kpi-val">0.18s</span>
                      <span className="kpi-lbl">Global TTFB</span>
                    </div>
                    <div className="kpi-card-mini">
                      <span className="kpi-val">99.8%</span>
                      <span className="kpi-lbl">Automated QA</span>
                    </div>
                  </div>

                  <div className="dashboard-chart-area">
                    <svg className="chart-svg-container" viewBox="0 0 320 80" fill="none">
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.45" />
                          <stop offset="100%" stopColor="#00FFFF" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      {/* Grid lines */}
                      <line x1="0" y1="20" x2="320" y2="20" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                      <line x1="0" y1="50" x2="320" y2="50" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                      {/* Area Fill */}
                      <path d="M0,65 Q40,45 80,50 T160,25 T240,35 T320,12 L320,80 L0,80 Z" fill="url(#chartGrad)" />
                      {/* Stroke Line */}
                      <path d="M0,65 Q40,45 80,50 T160,25 T240,35 T320,12" stroke="#00FFFF" strokeWidth="2.5" strokeLinecap="round" />
                      {/* Points */}
                      <circle cx="80" cy="50" r="3.5" fill="#00FFFF" />
                      <circle cx="160" cy="25" r="3.5" fill="#00FFFF" />
                      <circle cx="240" cy="35" r="3.5" fill="#00FFFF" />
                      <circle cx="320" cy="12" r="4.5" fill="#FFFFFF" stroke="#00FFFF" strokeWidth="2" />
                    </svg>
                  </div>

                  <div className="chart-log-row">
                    <span>✓ GraphQL Edge Cache Synced</span>
                    <span style={{ color: '#00FFFF' }}>0 Errors</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── BANNER 3: Graphic on Left, Text on Right (Slide in from Left) ── */}
            <motion.div
              className="about-banner-card"
              initial={{ opacity: 0, x: prefersReduced ? 0 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: prefersReduced ? 0.01 : 0.75, ease: EASE.premium }}
            >
              {/* Graphic Left: Abstract Neural Network Cluster */}
              <div className="banner-graphic-col">
                <div className="glass-neural-card" aria-hidden="true">
                  <svg className="neural-network-svg" viewBox="0 0 340 160" fill="none">
                    {/* Connecting glowing vectors */}
                    <path d="M50 80 L120 40 L220 40 L290 80" stroke="rgba(0,255,255,0.35)" strokeWidth="1.5" strokeDasharray="4 4" />
                    <path d="M50 80 L120 120 L220 120 L290 80" stroke="rgba(99,102,241,0.35)" strokeWidth="1.5" strokeDasharray="4 4" />
                    <path d="M120 40 L170 80 L220 40" stroke="rgba(0,255,255,0.4)" strokeWidth="1.8" />
                    <path d="M120 120 L170 80 L220 120" stroke="rgba(99,102,241,0.4)" strokeWidth="1.8" />
                    <line x1="50" y1="80" x2="290" y2="80" stroke="rgba(0,255,255,0.2)" strokeWidth="1" />

                    {/* Outer Nodes */}
                    <circle cx="50" cy="80" r="14" fill="rgba(0,255,255,0.12)" stroke="#00FFFF" strokeWidth="2" />
                    <text x="50" y="84" textAnchor="middle" fill="#00FFFF" fontSize="9" fontFamily="monospace">API</text>

                    <circle cx="120" cy="40" r="13" fill="rgba(99,102,241,0.15)" stroke="#6366F1" strokeWidth="2" />
                    <text x="120" y="44" textAnchor="middle" fill="#A5B4FC" fontSize="9" fontFamily="monospace">AI</text>

                    <circle cx="120" cy="120" r="13" fill="rgba(0,255,255,0.12)" stroke="#00FFFF" strokeWidth="2" />
                    <text x="120" y="124" textAnchor="middle" fill="#00FFFF" fontSize="9" fontFamily="monospace">DB</text>

                    {/* Central Core Pulse */}
                    <circle cx="170" cy="80" r="22" fill="rgba(0,255,255,0.15)" stroke="#00FFFF" strokeWidth="2.5" />
                    <circle cx="170" cy="80" r="10" fill="#00FFFF" opacity="0.8" />
                    <text x="170" y="84" textAnchor="middle" fill="#070C1A" fontSize="10" fontWeight="bold" fontFamily="sans-serif">APEX</text>

                    <circle cx="220" cy="40" r="13" fill="rgba(0,255,255,0.12)" stroke="#00FFFF" strokeWidth="2" />
                    <text x="220" y="44" textAnchor="middle" fill="#00FFFF" fontSize="9" fontFamily="monospace">OPS</text>

                    <circle cx="220" cy="120" r="13" fill="rgba(99,102,241,0.15)" stroke="#6366F1" strokeWidth="2" />
                    <text x="220" y="124" textAnchor="middle" fill="#A5B4FC" fontSize="9" fontFamily="monospace">SYNC</text>

                    <circle cx="290" cy="80" r="14" fill="rgba(0,255,255,0.12)" stroke="#00FFFF" strokeWidth="2" />
                    <text x="290" y="84" textAnchor="middle" fill="#00FFFF" fontSize="9" fontFamily="monospace">EDGE</text>
                  </svg>

                  <div className="neural-status-strip">
                    <div className="neural-status-pill">
                      <span className="pulse-led" />
                      <span>Unified Architecture Core</span>
                    </div>
                    <span className="neural-cluster-info">Zero Siloed Vendors</span>
                  </div>
                </div>
              </div>

              {/* Text Right: Why Choose Us */}
              <div className="banner-content-col">
                <span className="banner-tag">WHY CHOOSE US</span>
                <h2 className="banner-title">One Technology Partner, Full Ownership.</h2>
                <p className="banner-desc">
                  Stop managing disconnected design freelancers, outsourced backend developers, and separate AI contractors. We deliver the full technology stack under one unified, senior-led roof with single-point accountability.
                </p>

                <div className="banner-feature-list">
                  <div className="banner-feature-item">
                    <div className="banner-feature-icon">✓</div>
                    <div className="banner-feature-text">
                      <strong>Full-Lifecycle Engineering:</strong> Seamless cohesion between user interfaces, APIs, cloud databases, and automated AI agents.
                    </div>
                  </div>
                  <div className="banner-feature-item">
                    <div className="banner-feature-icon">✓</div>
                    <div className="banner-feature-text">
                      <strong>Direct Senior Access:</strong> Transparent collaboration with seasoned engineers who understand P&L, conversion, and business impact.
                    </div>
                  </div>
                  <div className="banner-feature-item">
                    <div className="banner-feature-icon">✓</div>
                    <div className="banner-feature-text">
                      <strong>Scalable From Day 1:</strong> Architectures configured for effortless scale, multi-region resilience, and minimal cloud maintenance bills.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            3. TECH STACK SECTION (Dual Bi-Directional Marquees)
            ═══════════════════════════════════════════════════════ */}
        <section className="about-tech-stack-section section-padding">
          <div className="container">
            <div className="section-header">
              <span className="tag">POWERING MODERN ENTERPRISE</span>
              <h2>OUR TECH STACK</h2>
              <p>
                Battle-tested frameworks, modern AI integrations, and cloud infrastructure engineered for velocity, reliability, and infinite scale.
              </p>
            </div>

            <div className="tech-marquees-wrapper" aria-label="Technology stack list">
              {/* Row 1: Left to Right (Frontend & Backend) */}
              <div className="tech-marquee-row tech-row-forward">
                {[...TECH_ROW_1, ...TECH_ROW_1].map((tech, idx) => (
                  <div key={`${tech.name}-${idx}`} className="tech-item-card">
                    <div className="tech-item-icon" aria-hidden="true">
                      {tech.icon}
                    </div>
                    <span className="tech-item-name">{tech.name}</span>
                    <span className="tech-item-badge">{tech.badge}</span>
                  </div>
                ))}
              </div>

              {/* Row 2: Right to Left (Databases, AI & Infrastructure) */}
              <div className="tech-marquee-row tech-row-reverse">
                {[...TECH_ROW_2, ...TECH_ROW_2].map((tech, idx) => (
                  <div key={`${tech.name}-${idx}`} className="tech-item-card">
                    <div className="tech-item-icon" aria-hidden="true">
                      {tech.icon}
                    </div>
                    <span className="tech-item-name">{tech.name}</span>
                    <span className="tech-item-badge">{tech.badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            4. MEET THE TEAM SECTION (Preserved)
            ═══════════════════════════════════════════════════════ */}
        <Suspense fallback={null}>
          {isMobile ? <MobileTeam /> : <DesktopTeam />}
        </Suspense>

        {/* ═══════════════════════════════════════════════════════
            5. FINAL CALL TO ACTION (Preserved)
            ═══════════════════════════════════════════════════════ */}
        <CTASection
          heading={cta.heading}
          body={cta.body}
          primaryBtn={cta.primaryBtn}
          secondaryBtn={cta.secondaryBtn}
        />
      </div>
    </PageLayout>
  );
}
