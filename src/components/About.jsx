import React from 'react';
import './About.css';

export default function About() {
  const techStack = [
    { name: 'React', icon: '⚛️' },
    { name: 'Vite', icon: '⚡' },
    { name: 'Vanilla CSS', icon: '🎨' },
    { name: 'HTML5', icon: '🌐' },
    { name: 'JavaScript', icon: '🟨' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Git', icon: '💾' },
    { name: 'Postgres', icon: '🐬' },
    { name: 'AWS Cloud', icon: '☁️' }
  ];

  return (
    <section className="about-section section-padding" id="about">
      {/* Ambient background blob */}
      <div className="glow-blob glow-blob-teal about-blob"></div>

      <div className="container about-container">
        {/* Left Column: Story text */}
        <div className="about-content">
          <span className="tag">Company</span>
          <h2 className="about-title">Building Software with Precision</h2>
          <p className="about-text">
            At ApexSpider Innovation, we believe that software should be robust, scalable, and visually premium. We partner with growing enterprises and startup founders to architect custom web applications, automation layers, and clean UI components that ensure operational efficiency.
          </p>
          <p className="about-text">
            Our approach prioritizes design system integrity, rapid prototyping, and high-fidelity code execution. We write modular, maintainable React code and build secure backends to guarantee product velocity.
          </p>

          <div className="about-standards-list">
            <div className="standard-item">
              <span className="standard-icon">✓</span>
              <div>
                <h4 className="standard-title">Clean Code Standards</h4>
                <p className="standard-desc">Consistent component structures and lint validation rules.</p>
              </div>
            </div>
            <div className="standard-item">
              <span className="standard-icon">✓</span>
              <div>
                <h4 className="standard-title">Design-to-React Fidelity</h4>
                <p className="standard-desc">Precision styling matching design guidelines pixel-for-pixel.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Tech Stack Grid */}
        <div className="about-visual">
          <div className="tech-stack-container glass-panel">
            <h3 className="tech-grid-title">Our Architecture Stack</h3>
            <p className="tech-grid-subtitle">Sample technologies we utilize for scaling prototypes.</p>
            
            <div className="tech-grid">
              {techStack.map((tech, idx) => (
                <div key={idx} className="tech-item" title={tech.name}>
                  <span className="tech-icon" role="img" aria-label={tech.name}>{tech.icon}</span>
                  <span className="tech-name">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
