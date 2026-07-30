import React from 'react';
import { motion } from 'framer-motion';
import './CaseStudy.css';

export default function CaseStudy() {
  const premiumEase = [0.16, 1, 0.3, 1];

  const caseStudies = [
    {
      tag: 'Custom SaaS Portal',
      title: 'Project Alpha Dashboard',
      desc: 'A premium data analytics cockpit concept built to demonstrate real-time telemetry metrics and system loading flows.',
      metrics: [
        { label: 'Efficiency Gain (Demo)', val: '+42%' },
        { label: 'Data Sync Latency', val: '0.12ms' }
      ],
      techs: ['React', 'CSS Grid', 'SVG Charts'],
      visual: (
        <svg viewBox="0 0 350 200" fill="none" className="visual-svg">
          <rect width="350" height="200" rx="8" fill="rgba(255,255,255,0.01)" />
          {/* Main card box */}
          <rect x="20" y="20" width="310" height="160" rx="6" fill="rgba(15,23,42,0.6)" stroke="var(--border-glass)" />
          {/* Header bar */}
          <line x1="20" y1="50" x2="330" y2="50" stroke="var(--border-glass)" />
          <circle cx="35" cy="35" r="4" fill="#ef4444" />
          <circle cx="47" cy="35" r="4" fill="#f59e0b" />
          <circle cx="59" cy="35" r="4" fill="#10b981" />
          {/* Metric block visuals */}
          <rect x="35" y="65" width="80" height="50" rx="4" fill="rgba(255,255,255,0.02)" stroke="var(--border-glass)" />
          <rect x="125" y="65" width="80" height="50" rx="4" fill="rgba(255,255,255,0.02)" stroke="var(--border-glass)" />
          <rect x="215" y="65" width="100" height="110" rx="4" fill="rgba(255,255,255,0.02)" stroke="var(--border-glass)" />
          
          <line x1="45" y1="80" x2="85" y2="80" stroke="rgba(255,255,255,0.1)" strokeWidth="4" strokeLinecap="round" />
          <motion.line 
            x1="45" 
            y1="95" 
            x2="105" 
            y2="95" 
            stroke="var(--color-accent-teal)" 
            strokeWidth="6" 
            strokeLinecap="round" 
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: premiumEase, delay: 0.6 }}
          />
          
          <line x1="135" y1="80" x2="175" y2="80" stroke="rgba(255,255,255,0.1)" strokeWidth="4" strokeLinecap="round" />
          <motion.line 
            x1="135" 
            y1="95" 
            x2="195" 
            y2="95" 
            stroke="var(--color-accent-indigo)" 
            strokeWidth="6" 
            strokeLinecap="round" 
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: premiumEase, delay: 0.8 }}
          />

          {/* Graph lines in third box */}
          <motion.path 
            d="M225 150 Q 245 110 265 130 T 305 85" 
            fill="none" 
            stroke="var(--color-accent-teal)" 
            strokeWidth="2" 
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.circle 
            cx="305" 
            cy="85" 
            r="3" 
            fill="var(--color-accent-teal)" 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 1.6 }}
          />
          
          {/* Bottom lists */}
          <line x1="35" y1="135" x2="155" y2="135" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
          <line x1="35" y1="148" x2="195" y2="148" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
          <line x1="35" y1="161" x2="115" y2="161" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
        </svg>
      )
    },
    {
      tag: 'Distributed Infrastructure',
      title: 'Synergy Web Platform',
      desc: 'An enterprise service integration portal layout built to demonstrate multi-node api calls and secure cloud sync states.',
      metrics: [
        { label: 'Data Processing (Concept)', val: '5.2x' },
        { label: 'Uptime Integrity (Result)', val: '99.9%' }
      ],
      techs: ['API Integration', 'Cloud Orchestration', 'Node Map'],
      visual: (
        <svg viewBox="0 0 350 200" fill="none" className="visual-svg">
          <rect width="350" height="200" rx="8" fill="rgba(255,255,255,0.01)" />
          
          {/* Outer glow rings */}
          <motion.circle 
            cx="175" 
            cy="100" 
            r="32" 
            fill="none" 
            stroke="var(--color-accent-indigo)" 
            strokeWidth="1" 
            strokeOpacity="0.15" 
            initial={{ scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.15 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: premiumEase, delay: 0.6 }}
          />
          <motion.circle 
            cx="175" 
            cy="100" 
            r="48" 
            fill="none" 
            stroke="var(--color-accent-indigo)" 
            strokeWidth="1" 
            strokeOpacity="0.08" 
            strokeDasharray="5 5" 
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.08 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: premiumEase, delay: 0.8 }}
          />

          {/* Main network graph nodes */}
          <motion.circle 
            cx="175" 
            cy="100" 
            r="18" 
            fill="rgba(99, 102, 241, 0.2)" 
            stroke="var(--color-accent-indigo)" 
            strokeWidth="2" 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.3 }}
          />
          <text x="175" y="104" fill="var(--color-accent-indigo)" fontSize="10" textAnchor="middle" fontFamily="var(--font-mono)">HUB</text>
          
          {/* Surrounding nodes */}
          <motion.circle cx="90" cy="60" r="10" fill="rgba(0, 255, 255, 0.15)" stroke="var(--color-accent-teal)" strokeWidth="1.5" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", delay: 0.5 }} />
          <motion.circle cx="260" cy="60" r="10" fill="rgba(255,255,255,0.05)" stroke="var(--border-glass)" strokeWidth="1.5" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", delay: 0.7 }} />
          <motion.circle cx="90" cy="140" r="10" fill="rgba(255,255,255,0.05)" stroke="var(--border-glass)" strokeWidth="1.5" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", delay: 0.9 }} />
          <motion.circle cx="260" cy="140" r="10" fill="rgba(0, 255, 255, 0.15)" stroke="var(--color-accent-teal)" strokeWidth="1.5" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", delay: 1.1 }} />
          
          {/* Connecting node lines */}
          <motion.line 
            x1="100" 
            y1="65" 
            x2="160" 
            y2="90" 
            stroke="var(--color-accent-teal)" 
            strokeWidth="1.5" 
            strokeDasharray="3 3" 
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />
          <motion.line 
            x1="250" 
            y1="65" 
            x2="190" 
            y2="90" 
            stroke="rgba(255,255,255,0.1)" 
            strokeWidth="1" 
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.0 }}
          />
          <motion.line 
            x1="100" 
            y1="135" 
            x2="160" 
            y2="110" 
            stroke="rgba(255,255,255,0.1)" 
            strokeWidth="1" 
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.2 }}
          />
          <motion.line 
            x1="250" 
            y1="135" 
            x2="190" 
            y2="110" 
            stroke="var(--color-accent-teal)" 
            strokeWidth="1.5" 
            strokeDasharray="3 3" 
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.4 }}
          />
        </svg>
      )
    }
  ];

  const gridContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40, 
      filter: "blur(6px)" 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { 
        duration: 0.9, 
        ease: premiumEase
      }
    }
  };

  return (
    <section className="work-section section-padding" id="work">
      <div className="container">
        {/* Section Header */}
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: premiumEase }}
        >
          <span className="tag">Project Spotlight</span>
          <h2>Prototype Results</h2>
          <p>Explore mock project outputs designed to demonstrate platform speed, UI styling, and structural modularity.</p>
        </motion.div>

        {/* Case Studies Container */}
        <motion.div 
          className="work-container"
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-8%" }}
        >
          {caseStudies.map((project, index) => (
            <motion.div 
              key={index} 
              className="glass-panel work-card"
              variants={cardVariants}
            >
              {/* Left Column: Visual Graph representation */}
              <div className="work-visual-wrapper">
                {project.visual}
              </div>
              
              {/* Right Column: Case study specs */}
              <div className="work-content-wrapper">
                <span className="work-badge-tag">{project.tag}</span>
                <h3 className="work-card-title">{project.title}</h3>
                <p className="work-card-desc">{project.desc}</p>
                
                {/* Metrics Row */}
                <div className="work-metrics-row">
                  {project.metrics.map((metric, idx) => (
                    <div key={idx} className="work-metric-item">
                      <span className="work-metric-value text-gradient">{metric.val}</span>
                      <span className="work-metric-label">{metric.label}</span>
                    </div>
                  ))}
                </div>

                {/* Tech tags */}
                <div className="work-techs-row">
                  {project.techs.map((tech, idx) => (
                    <span key={idx} className="work-tech-badge">{tech}</span>
                  ))}
                </div>

                {/* Explore prototype button */}
                <motion.button 
                  className="btn-text work-action-btn"
                  whileHover={{ gap: "12px", color: "var(--color-text-primary)" }}
                >
                  Explore Sample Prototype
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
