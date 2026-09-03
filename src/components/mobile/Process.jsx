import React from 'react';
import { motion } from 'framer-motion';
import { PROCESS_STEPS } from '../../constants/process';
import { EASE } from '../../constants/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './Process.css';

export default function MobileProcess() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="mobile-process-section section-padding" id="process">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20, filter: prefersReducedMotion ? 'blur(0px)' : 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.8, ease: EASE.premium }}
        >
          <span className="tag">Methodology</span>
          <h2>How We Work</h2>
          <p>A structured, step-by-step engineering cycle designed to minimize risk and accelerate product delivery.</p>
        </motion.div>

        <motion.div 
          className="mobile-process-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.5, delay: prefersReducedMotion ? 0 : 0.2 }}
        >
          {PROCESS_STEPS.map((step, index) => (
            <motion.div 
              key={index} 
              className="mobile-process-step"
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ 
                duration: prefersReducedMotion ? 0.01 : 0.6, 
                ease: EASE.premium, 
                delay: prefersReducedMotion ? 0 : index * 0.15 
              }}
            >
              <div className="mobile-step-badge">
                <motion.div 
                  className="mobile-step-number"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: prefersReducedMotion ? 0.01 : 0.5, 
                    ease: EASE.premium, 
                    delay: prefersReducedMotion ? 0 : index * 0.15 + 0.1 
                  }}
                >
                  {step.num}
                </motion.div>
                <motion.span 
                  className="mobile-step-phase"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: prefersReducedMotion ? 0.01 : 0.4, 
                    delay: prefersReducedMotion ? 0 : index * 0.15 + 0.25 
                  }}
                >
                  {step.phase}
                </motion.span>
              </div>
              
              <div className="glass-panel mobile-step-content">
                <h3 className="mobile-step-title">{step.label}</h3>
                <p className="mobile-step-desc">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
