import React from 'react';
import { motion } from 'framer-motion';
import GlowHorizonFM from './ui/GlowHorizonFM';
import { AnimatedTitleFM } from './ui/AnimatedTitleFM';
import './Hero.css';

/*
  Hero accepts heroReady prop from App.
  When false (during preloader) all elements stay at
  their initial (invisible) state.
  When true, they stage in with the cinematic stagger.
*/
export default function Hero({ heroReady = false }) {
  const premiumEase = [0.16, 1, 0.3, 1];

  // Shared reveal variant — opacity + y + blur
  const stagger = (delay = 0) => ({
    initial:  { opacity: 0, y: 30, filter: 'blur(8px)' },
    animate:  heroReady
      ? { opacity: 1, y: 0, filter: 'blur(0px)' }
      : { opacity: 0, y: 30, filter: 'blur(8px)' },
    transition: { duration: 0.7, ease: premiumEase, delay },
  });

  return (
    <section className="hero-section" id="hero">
      {/* Background glow horizon */}
      <GlowHorizonFM variant="top" />

      <div className="container hero-container">
        {/* Centered Content */}
        <div className="hero-content">

          {/* Badge — first in */}
          <motion.div className="hero-badge" {...stagger(0)}>
            <span className="badge-tag">Now in Beta</span>
            <span className="badge-text">Scalable Solutions for Modern Teams</span>
          </motion.div>

          {/* Animated title — gated by heroReady */}
          <AnimatedTitleFM open={heroReady} />

          {/* Description — 120ms after title */}
          <motion.p className="hero-description" {...stagger(0.12)}>
            Custom web systems, automated workflows, and premium digital interfaces
            tailored to establish credibility and accelerate performance.
          </motion.p>

          {/* CTAs — 240ms after title */}
          <motion.div className="hero-actions" {...stagger(0.24)}>
            <a href="#services" className="btn btn-primary">
              Explore Services
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#work" className="btn btn-secondary">
              View Work
            </a>
          </motion.div>

          {/* Social proof — 360ms after title */}
          <motion.div className="hero-social-proof" {...stagger(0.36)}>
            <p className="social-proof-title">Trusted by growing teams worldwide</p>
            <div className="social-proof-logos">
              <span className="proof-logo">Enterprise Beta</span>
              <span className="proof-logo">SaaS Alpha</span>
              <span className="proof-logo">Digital Delta</span>
            </div>
          </motion.div>

        </div>

        {/* Premium Visual Mockup — 480ms after title */}
        <motion.div
          className="hero-visual"
          {...stagger(0.48)}
          /* Override y and scale for the visual */
          initial={{ opacity: 0, y: 50, scale: 0.97, filter: 'blur(8px)' }}
          animate={
            heroReady
              ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
              : { opacity: 0, y: 50, scale: 0.97, filter: 'blur(8px)' }
          }
          transition={{ duration: 1.1, ease: premiumEase, delay: 0.48 }}
        >
          <motion.div
            className="glass-panel mock-dashboard"
            animate={{ y: heroReady ? [0, -8, 0] : 0 }}
            transition={{
              duration: 6,
              repeat: heroReady ? Infinity : 0,
              ease: 'easeInOut',
              delay: 1.2,
            }}
          >
            {/* Dashboard Header Bar */}
            <div className="dashboard-header">
              <div className="window-dots">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <div className="dashboard-address">
                https://api.apexspider.io/dashboard
              </div>
            </div>

            {/* Dashboard Body */}
            <div className="dashboard-body">

              {/* Sidebar */}
              <aside className="mock-sidebar">
                <div className="sidebar-item active" title="Dashboard">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                </div>
                <div className="sidebar-item" title="Analytics">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <div className="sidebar-item" title="Database">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                  </svg>
                </div>
                <div className="sidebar-item" title="Settings">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83
                      2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1
                      1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0
                      0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0
                      0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65
                      1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1
                      2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0
                      1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65
                      0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65
                      0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65
                      1.65 0 0 0-1.51 1z" />
                  </svg>
                </div>
              </aside>

              {/* Main Content */}
              <main className="mock-main">

                {/* Metric Cards */}
                <div className="mock-metrics-row">

                  <div className="mock-metric-card">
                    <div className="metric-card-top">
                      <span className="metric-label">API Response</span>
                      <span className="metric-status-badge">
                        <span className="status-dot pulse-green" />
                        Active
                      </span>
                    </div>
                    <span className="metric-value">14<span className="metric-unit">ms</span></span>
                    <span className="metric-trend metric-up">▲ 12% faster</span>
                  </div>

                  <div className="mock-metric-card">
                    <div className="metric-card-top">
                      <span className="metric-label">Process Speed</span>
                      <span className="metric-tag-badge">AUTO</span>
                    </div>
                    <span className="metric-value">98.6<span className="metric-unit">%</span></span>
                    <div className="metric-progress-bar">
                      <motion.div
                        className="metric-progress-fill"
                        initial={{ width: 0 }}
                        animate={{ width: heroReady ? '98.6%' : 0 }}
                        transition={{ duration: 1.8, ease: 'easeOut', delay: heroReady ? 0.8 : 0 }}
                      />
                    </div>
                  </div>

                  <div className="mock-metric-card">
                    <div className="metric-card-top">
                      <span className="metric-label">Data Ingest</span>
                      <span className="metric-trend metric-up" style={{ fontSize: '0.58rem' }}>▲ 8.1%</span>
                    </div>
                    <span className="metric-value">4.2<span className="metric-unit">TB</span></span>
                    <svg className="sparkline-svg" viewBox="0 0 80 24" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%"   stopColor="var(--color-accent-indigo)" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="var(--color-accent-indigo)" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <motion.path
                        d="M0 20 L10 16 L20 18 L30 10 L40 14 L50 6 L60 10 L70 4 L80 8 L80 24 L0 24 Z"
                        fill="url(#sparkGrad)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: heroReady ? 1 : 0 }}
                        transition={{ duration: 0.8, delay: heroReady ? 1.0 : 0 }}
                      />
                      <motion.path
                        d="M0 20 L10 16 L20 18 L30 10 L40 14 L50 6 L60 10 L70 4 L80 8"
                        fill="none"
                        stroke="var(--color-accent-indigo)"
                        strokeWidth="1.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: heroReady ? 1 : 0 }}
                        transition={{ duration: 1.4, ease: 'easeInOut', delay: heroReady ? 0.8 : 0 }}
                      />
                    </svg>
                  </div>

                </div>

                {/* Chart */}
                <div className="mock-chart-container">
                  <div className="chart-header">
                    <span className="chart-title">Performance Matrix</span>
                    <div className="chart-legend-row">
                      <span className="legend-dot teal-dot" />
                      <span className="chart-legend-label">Query Speed</span>
                      <span className="legend-dot indigo-dot" />
                      <span className="chart-legend-label">Throughput</span>
                    </div>
                  </div>

                  <div className="chart-area-wrap">
                    <svg className="mock-svg-chart" viewBox="0 0 300 90" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%"   stopColor="var(--color-accent-teal)"   stopOpacity="0.35" />
                          <stop offset="100%" stopColor="var(--color-accent-teal)"   stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="indigoGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%"   stopColor="var(--color-accent-indigo)" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="var(--color-accent-indigo)" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {[18, 38, 58, 78].map((y) => (
                        <line key={y} x1="0" y1={y} x2="300" y2={y}
                          stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                      ))}

                      <motion.line
                        x1="185" y1="0" x2="185" y2="90"
                        stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3 3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: heroReady ? 1 : 0 }}
                        transition={{ delay: heroReady ? 1.4 : 0, duration: 0.4 }}
                      />

                      <motion.path
                        d="M0 80 C40 60 60 50 90 55 S140 28 185 32 S240 50 270 42 S290 30 300 25 L300 90 L0 90 Z"
                        fill="url(#tealGrad)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: heroReady ? 1 : 0 }}
                        transition={{ duration: 1.0, delay: heroReady ? 0.8 : 0 }}
                      />
                      <motion.path
                        d="M0 80 C40 60 60 50 90 55 S140 28 185 32 S240 50 270 42 S290 30 300 25"
                        fill="none" stroke="var(--color-accent-teal)" strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: heroReady ? 1 : 0 }}
                        transition={{ duration: 2.0, ease: 'easeInOut', delay: heroReady ? 0.6 : 0 }}
                      />

                      <motion.path
                        d="M0 88 C30 75 70 68 100 72 S160 48 185 52 S230 65 265 58 S285 48 300 44 L300 90 L0 90 Z"
                        fill="url(#indigoGrad)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: heroReady ? 1 : 0 }}
                        transition={{ duration: 1.0, delay: heroReady ? 1.0 : 0 }}
                      />
                      <motion.path
                        d="M0 88 C30 75 70 68 100 72 S160 48 185 52 S230 65 265 58 S285 48 300 44"
                        fill="none" stroke="var(--color-accent-indigo)"
                        strokeWidth="1.5" strokeDasharray="5 3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: heroReady ? 1 : 0 }}
                        transition={{ duration: 2.0, ease: 'easeInOut', delay: heroReady ? 0.8 : 0 }}
                      />

                      <motion.circle cx="185" cy="32" r="3.5" fill="var(--color-accent-teal)"
                        initial={{ scale: 0 }}
                        animate={{ scale: heroReady ? 1 : 0 }}
                        transition={{ type: 'spring', delay: heroReady ? 1.4 : 0 }}
                      />
                      <motion.circle cx="185" cy="32" r="7"
                        fill="none" stroke="var(--color-accent-teal)"
                        strokeOpacity="0.4" strokeWidth="1.5"
                        initial={{ scale: 0 }}
                        animate={{ scale: heroReady ? [0, 1.4, 1] : 0 }}
                        transition={{ duration: 1.4, repeat: heroReady ? Infinity : 0, delay: heroReady ? 1.6 : 0 }}
                      />
                    </svg>

                    <motion.div
                      className="chart-tooltip"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: heroReady ? 1 : 0, y: heroReady ? 0 : 6 }}
                      transition={{ delay: heroReady ? 1.6 : 0, duration: 0.5 }}
                    >
                      <div className="tooltip-row">
                        <span className="legend-dot teal-dot sm" />
                        <span className="tooltip-label">Speed</span>
                        <span className="tooltip-value">14ms</span>
                      </div>
                      <div className="tooltip-row">
                        <span className="legend-dot indigo-dot sm" />
                        <span className="tooltip-label">CPU</span>
                        <span className="tooltip-value">18%</span>
                      </div>
                    </motion.div>
                  </div>
                </div>

              </main>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
