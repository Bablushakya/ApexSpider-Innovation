import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

export default function About() {
  const premiumEase = [0.16, 1, 0.3, 1];

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

  const techContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const techItemVariants = {
    hidden: { opacity: 0, scale: 0.85, filter: "blur(3px)" },
    visible: { 
      opacity: 1, 
      scale: 1, 
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: premiumEase } 
    }
  };

  return (
    <section className="about-section section-padding" id="about">
      {/* Ambient background blob */}
      <div className="glow-blob glow-blob-teal about-blob"></div>

      <div className="container about-container">
        {/* Left Column: Story text with fade-in and slight slide */}
        <motion.div 
          className="about-content"
          initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: premiumEase }}
        >
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
        </motion.div>

        {/* Right Column: Interactive Tech Stack Grid */}
        <motion.div 
          className="about-visual"
          initial={{ opacity: 0, y: 35, scale: 0.98, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: premiumEase, delay: 0.15 }}
        >
          <div className="tech-stack-container glass-panel">
            <h3 className="tech-grid-title">Our Architecture Stack</h3>
            <p className="tech-grid-subtitle">Sample technologies we utilize for scaling prototypes.</p>
            
            <motion.div 
              className="tech-grid"
              variants={techContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {techStack.map((tech, idx) => (
                <motion.div 
                  key={idx} 
                  className="tech-item" 
                  title={tech.name}
                  variants={techItemVariants}
                  whileHover={{ 
                    scale: 1.08, 
                    y: -3, 
                    borderColor: "var(--color-accent-teal)",
                    boxShadow: "0 4px 15px rgba(0, 255, 255, 0.15)"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <span className="tech-icon" role="img" aria-label={tech.name}>{tech.icon}</span>
                  <span className="tech-name">{tech.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
