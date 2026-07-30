import React from 'react';
import './ValueProps.css';

export default function ValueProps() {
  const propsList = [
    {
      metric: '99.9%',
      metricLabel: 'Prototype Uptime',
      title: 'Engineering Excellence',
      desc: 'We architect systems with fail-safes and optimized querying to ensure reliability under heavy operational loads.'
    },
    {
      metric: '10x',
      metricLabel: 'Process Speedup',
      title: 'Workflow Automation',
      desc: 'Connect separate tools and operations into unified triggered pipelines, eliminating manual bottlenecks.'
    },
    {
      metric: '1:1',
      metricLabel: 'Design Fidelity',
      title: 'Premium User Interfaces',
      desc: 'We bridge design and engineering seamlessly, ensuring mockups translate identically to the final React application.'
    }
  ];

  return (
    <section className="value-section section-padding" id="value-props">
      <div className="glow-blob glow-blob-indigo value-blob"></div>
      
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="tag">Value Proposition</span>
          <h2>Why Choose Us</h2>
          <p>We combine deep engineering standards with premium aesthetic execution to launch products faster.</p>
        </div>

        {/* Value Cards Grid */}
        <div className="value-grid">
          {propsList.map((item, index) => (
            <div key={index} className="glass-panel value-card">
              <div className="metric-header">
                <span className="metric-number text-gradient-cyan">{item.metric}</span>
                <span className="metric-badge">{item.metricLabel}</span>
              </div>
              <h3 className="value-title">{item.title}</h3>
              <p className="value-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
