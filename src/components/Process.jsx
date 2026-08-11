import React from 'react';
import { motion } from 'framer-motion';
import './Process.css';

export default function Process() {
  const premiumEase = [0.16, 1, 0.3, 1];

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
      phase: 'Develop',
      label: 'Development',
      desc: 'Approved designs are transformed into high-performance digital solutions using clean architecture, secure coding, version control, continuous testing, and agile development practices.'
    },
    {
      num: '04',
      phase: 'Deploy',
      label: 'Staging & Integration',
      desc: 'Running load tests, security scans, and system audits on staging before conducting a seamless production launch.'
    }
  ];

  const gridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const stepVariants = {
    hidden: { 
      opacity: 0, 
      y: 35, 
      filter: "blur(5px)" 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { 
        duration: 0.8, 
        ease: premiumEase 
      }
    }
  };

  return (
    <section className="process-section section-padding" id="process">
      <div className="container">
        {/* Section Header */}
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: premiumEase }}
        >
          <span className="tag">Methodology</span>
          <h2>How We Work</h2>
          <p>A structured, step-by-step engineering cycle designed to minimize risk and accelerate product delivery.</p>
        </motion.div>

        {/* Process Timeline */}
        <div className="process-timeline">
          {/* Animated horizontal timeline line growing left-to-right */}
          <motion.div 
            className="timeline-line"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            style={{ originX: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
          />
          
          <motion.div 
            className="process-grid"
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-8%" }}
          >
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                className="process-step"
                variants={stepVariants}
              >
                <div className="step-badge-wrapper">
                  <motion.div 
                    className="step-number-circle"
                    whileHover={{ scale: 1.1, borderColor: "var(--color-accent-teal)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <span className="step-num">{step.num}</span>
                  </motion.div>
                  <span className="step-phase">{step.phase}</span>
                </div>
                
                <div className="glass-panel step-content-card">
                  <h3 className="step-title">{step.label}</h3>
                  <p className="step-desc">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
