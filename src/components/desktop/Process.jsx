import React from 'react';
import { motion } from 'framer-motion';
import { PROCESS_STEPS } from '../../constants/process';
import { EASE } from '../../constants/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './Process.css';

export default function Process() {
  const prefersReducedMotion = useReducedMotion();
  const steps = PROCESS_STEPS;

  const gridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.18
      }
    }
  };

  const stepVariants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 35, 
      filter: prefersReducedMotion ? 'blur(0px)' : 'blur(5px)' 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { 
        duration: prefersReducedMotion ? 0.01 : 0.8, 
        ease: EASE.premium 
      }
    }
  };

  return (
    <section className="process-section section-padding" id="process">
      <div className="container">
        {/* Section Header */}
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

        {/* Process Timeline */}
        <div className="process-timeline">
          {/* Animated horizontal timeline line growing left-to-right */}
          <motion.div 
            className="timeline-line"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            style={{ originX: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ 
              duration: prefersReducedMotion ? 0.01 : 1.8, 
              ease: 'easeInOut', 
              delay: prefersReducedMotion ? 0 : 0.3 
            }}
          />
          
          <motion.div 
            className="process-grid"
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-8%' }}
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
                    whileHover={
                      prefersReducedMotion 
                        ? {} 
                        : { 
                            scale: 1.1, 
                            borderColor: 'var(--color-accent-teal)',
                            transition: { type: 'spring', stiffness: 300, damping: 15 }
                          }
                    }
                  >
                    <span className="step-num">{step.num}</span>
                  </motion.div>
                  <motion.span 
                    className="step-phase"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: prefersReducedMotion ? 0.01 : 0.5, 
                      delay: prefersReducedMotion ? 0 : index * 0.18 + 0.4 
                    }}
                  >
                    {step.phase}
                  </motion.span>
                </div>
                
                <motion.div 
                  className="glass-panel step-content-card"
                  whileHover={
                    prefersReducedMotion 
                      ? {} 
                      : { 
                          y: -4,
                          borderColor: 'rgba(0, 255, 255, 0.25)',
                          transition: { duration: 0.25, ease: EASE.smooth }
                        }
                  }
                >
                  <h3 className="step-title" data-category={step.phase}>{step.label}</h3>
                  <p className="step-desc">{step.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
