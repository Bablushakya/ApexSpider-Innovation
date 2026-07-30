import React from 'react';
import { motion } from 'framer-motion';
import GlowHorizonFM from './ui/GlowHorizonFM';
import { AnimatedTitleFM } from './ui/AnimatedTitleFM';
import './Hero.css';

export default function Hero() {
  // Premium cubic-bezier transition easing
  const premiumEase = [0.16, 1, 0.3, 1];

  return (
    <section className="hero-section" id="hero">
      {/* Background glow horizon */}
      <GlowHorizonFM variant="top" />

      <div className="container hero-container">
        {/* Centered Content */}
        <div className="hero-content">
          <motion.div 
            className="hero-badge"
            initial={{ opacity: 0, y: -15, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: premiumEase, delay: 0.2 }}
          >
            <span className="badge-tag">Now in Beta</span>
            <span className="badge-text">Scalable Solutions for Modern Teams</span>
          </motion.div>
          
          <AnimatedTitleFM open={true} />
          
          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: premiumEase, delay: 0.45 }}
          >
            Custom web systems, automated workflows, and premium digital interfaces tailored to establish credibility and accelerate performance.
          </motion.p>
          
          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: premiumEase, delay: 0.6 }}
          >
            <a href="#services" className="btn btn-primary">
              Explore Services
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#work" className="btn btn-secondary">
              View Work
            </a>
          </motion.div>

          <motion.div 
            className="hero-social-proof"
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: premiumEase, delay: 0.75 }}
          >
            <p className="social-proof-title">Trusted by growing teams worldwide</p>
            <div className="social-proof-logos">
              <span className="proof-logo">Enterprise Beta</span>
              <span className="proof-logo">SaaS Alpha</span>
              <span className="proof-logo">Digital Delta</span>
            </div>
          </motion.div>
        </div>

        {/* Premium Visual Mockup */}
        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, y: 50, scale: 0.97, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: premiumEase, delay: 0.7 }}
        >
          <motion.div 
            className="glass-panel mock-dashboard"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Dashboard header bar */}
            <div className="dashboard-header">
              <div className="window-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <div className="dashboard-address">https://api.apexspider.io/dashboard</div>
            </div>
            
            {/* Dashboard Content */}
            <div className="dashboard-body">
              <aside className="mock-sidebar">
                <div className="sidebar-item active"></div>
                <div className="sidebar-item"></div>
                <div className="sidebar-item"></div>
              </aside>
              
              <main className="mock-main">
                <div className="mock-metrics-row">
                  <div className="mock-metric-card">
                    <span className="metric-label">System Load</span>
                    <span className="metric-value">0.12ms</span>
                    <span className="metric-chart-up">▲ 12%</span>
                  </div>
                  <div className="mock-metric-card">
                    <span className="metric-label">Efficiency</span>
                    <span className="metric-value">99.4%</span>
                    <span className="metric-chart-up">▲ 4.2%</span>
                  </div>
                </div>

                <div className="mock-chart-container">
                  <div className="chart-header">
                    <span>Performance Matrix</span>
                    <span className="chart-legend">Prototype Outcome</span>
                  </div>
                  <svg className="mock-svg-chart" viewBox="0 0 300 100">
                    <defs>
                      <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-accent-teal)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="var(--color-accent-teal)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Grid lines */}
                    <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(255,255,255,0.03)" />
                    <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.03)" />
                    <line x1="0" y1="80" x2="300" y2="80" stroke="rgba(255,255,255,0.03)" />
                    
                    {/* Area under curve */}
                    <motion.path 
                      d="M 0 100 Q 40 40 80 70 T 160 30 T 240 60 T 300 10 L 300 100 L 0 100 Z" 
                      fill="url(#chartGlow)" 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1.0, delay: 2.2 }}
                    />
                    {/* Curve line */}
                    <motion.path 
                      d="M 0 100 Q 40 40 80 70 T 160 30 T 240 60 T 300 10" 
                      fill="none" 
                      stroke="var(--color-accent-teal)" 
                      strokeWidth="2" 
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.8, ease: "easeInOut", delay: 1.3 }}
                    />
                    {/* Glowing dots */}
                    <motion.circle 
                      cx="160" 
                      cy="30" 
                      r="4" 
                      fill="var(--color-accent-teal)" 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 2.3 }}
                    />
                    <motion.circle 
                      cx="160" 
                      cy="30" 
                      r="8" 
                      fill="none" 
                      stroke="var(--color-accent-teal)" 
                      strokeOpacity="0.5" 
                      strokeWidth="2" 
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 2.5 }}
                    />
                  </svg>
                </div>
              </main>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
