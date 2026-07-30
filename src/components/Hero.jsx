import React from 'react';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero-section" id="hero">
      {/* Background glow blobs */}
      <div className="glow-blob glow-blob-teal pulse-glow-teal hero-blob-1"></div>
      <div className="glow-blob glow-blob-indigo pulse-glow-indigo hero-blob-2"></div>

      <div className="container hero-container">
        {/* Left Column: Context / Content */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-tag">Now in Beta</span>
            <span className="badge-text">Scalable Solutions for Modern Teams</span>
          </div>
          
          <h1 className="hero-title">
            We build <span className="text-gradient-cyan">scalable software</span> for next-gen enterprises.
          </h1>
          
          <p className="hero-description">
            Custom web systems, automated workflows, and premium digital interfaces tailored to establish credibility and accelerate performance.
          </p>
          
          <div className="hero-actions">
            <a href="#services" className="btn btn-primary">
              Explore Services
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#work" className="btn btn-secondary">
              View Work
            </a>
          </div>

          <div className="hero-social-proof">
            <p className="social-proof-title">Trusted by growing teams worldwide</p>
            <div className="social-proof-logos">
              <span className="proof-logo">Enterprise Beta</span>
              <span className="proof-logo">SaaS Alpha</span>
              <span className="proof-logo">Digital Delta</span>
            </div>
          </div>
        </div>

        {/* Right Column: Premium Visual Placeholder Mockup */}
        <div className="hero-visual">
          <div className="glass-panel mock-dashboard">
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
                    <path d="M 0 100 Q 40 40 80 70 T 160 30 T 240 60 T 300 10 L 300 100 L 0 100 Z" fill="url(#chartGlow)" />
                    {/* Curve line */}
                    <path d="M 0 100 Q 40 40 80 70 T 160 30 T 240 60 T 300 10" fill="none" stroke="var(--color-accent-teal)" strokeWidth="2" />
                    {/* Glowing dots */}
                    <circle cx="160" cy="30" r="4" fill="var(--color-accent-teal)" />
                    <circle cx="160" cy="30" r="8" fill="none" stroke="var(--color-accent-teal)" strokeOpacity="0.5" strokeWidth="2" />
                  </svg>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
