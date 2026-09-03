import React from 'react';
import { motion } from 'framer-motion';
import { VALUE_PROPS } from '../../constants/valueProps';
import { EASE } from '../../constants/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './ValueProps.css';

export default function ValueProps() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="value-section section-padding" id="why-apexspider" aria-labelledby="why-heading">
      <motion.div 
        className="glow-blob glow-blob-indigo value-blob" 
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.15, scale: 1 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 1.5, ease: EASE.smooth }}
      />
      
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20, filter: prefersReducedMotion ? 'blur(0px)' : 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.8, ease: EASE.premium }}
        >
          <span className="tag">Why ApexSpider</span>
          <h2 id="why-heading">Why Choose ApexSpider?</h2>
          <p>We combine business insight with senior engineering standards to build software that moves your business forward.</p>
        </motion.div>

        <div className="value-grid">
          {VALUE_PROPS.map((principle, index) => (
            <motion.div 
              key={principle.number} 
              className="glass-panel value-card"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ 
                duration: prefersReducedMotion ? 0.01 : 0.7, 
                ease: EASE.premium, 
                delay: prefersReducedMotion ? 0 : index * 0.12 
              }}
              whileHover={
                prefersReducedMotion 
                  ? {} 
                  : { 
                      y: -4,
                      borderColor: 'rgba(0, 255, 255, 0.25)',
                      transition: { duration: 0.3, ease: EASE.smooth }
                    }
              }
            >
              <motion.div 
                className="principle-number"
                whileHover={
                  prefersReducedMotion 
                    ? {} 
                    : { 
                        scale: 1.05,
                        backgroundColor: 'rgba(0, 255, 255, 0.25)',
                        transition: { duration: 0.2, ease: EASE.smooth }
                      }
                }
              >
                {principle.number}
              </motion.div>
              <h3 className="value-title">{principle.title}</h3>
              <div className="value-subtitle">{principle.subtitle}</div>
              <p className="value-desc">{principle.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
