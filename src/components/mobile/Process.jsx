import React from 'react';
import { motion } from 'framer-motion';
import { PROCESS_STEPS } from '../../constants/process';
import { EASE } from '../../constants/animations';
import './Process.css';

export default function MobileProcess() {
  return (
    <section className="mobile-process-section section-padding" id="process">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: EASE.premium }}
        >
          <span className="tag">Methodology</span>
          <h2>How We Work</h2>
          <p>A structured, step-by-step engineering cycle designed to minimize risk and accelerate product delivery.</p>
        </motion.div>

        <div className="mobile-process-grid">
          {PROCESS_STEPS.map((step, index) => (
            <motion.div 
              key={index} 
              className="mobile-process-step"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, ease: EASE.premium, delay: index * 0.1 }}
            >
              <div className="mobile-step-badge">
                <div className="mobile-step-number">{step.num}</div>
                <span className="mobile-step-phase">{step.phase}</span>
              </div>
              
              <div className="glass-panel mobile-step-content">
                <h3 className="mobile-step-title">{step.label}</h3>
                <p className="mobile-step-desc">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
