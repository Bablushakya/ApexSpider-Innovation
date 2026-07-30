import React from 'react';
import './Process.css';

export default function Process() {
  const steps = [
    {
      num: '01',
      phase: 'Architect',
      label: 'Strategy & Requirements',
      desc: 'We map data schemas, outline user scenarios, and finalize architecture blueprints before writing a single line of code.'
    },
    {
      num: '02',
      phase: 'Design',
      label: 'High-Fidelity Mockups',
      desc: 'Crafting responsive user interfaces and building clickable prototypes to align on interactions and styling.'
    },
    {
      num: '03',
      phase: 'Engineer',
      label: 'Agile Implementation',
      desc: 'Coding custom solutions in sprints with daily checks, lint audits, automated test suites, and strict version control.'
    },
    {
      num: '04',
      phase: 'Deploy',
      label: 'Staging & Integration',
      desc: 'Running load tests, security scans, and system audits on staging before conducting a seamless production launch.'
    }
  ];

  return (
    <section className="process-section section-padding" id="process">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="tag">Methodology</span>
          <h2>How We Work</h2>
          <p>A structured, step-by-step engineering cycle designed to minimize risk and accelerate product delivery.</p>
        </div>

        {/* Process Timeline */}
        <div className="process-timeline">
          <div className="timeline-line"></div>
          
          <div className="process-grid">
            {steps.map((step, index) => (
              <div key={index} className="process-step">
                <div className="step-badge-wrapper">
                  <div className="step-number-circle">
                    <span className="step-num">{step.num}</span>
                  </div>
                  <span className="step-phase">{step.phase}</span>
                </div>
                
                <div className="glass-panel step-content-card">
                  <h3 className="step-title">{step.label}</h3>
                  <p className="step-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
