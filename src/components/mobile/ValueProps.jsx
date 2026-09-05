import React from 'react';
import { motion } from 'framer-motion';
import { VALUE_PROPS } from '../../constants/valueProps';
import { EASE } from '../../constants/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './ValueProps.css';

export default function MobileValueProps() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="mobile-value-section section-padding" id="value-props">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20, filter: prefersReducedMotion ? 'blur(0px)' : 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.8, ease: EASE.premium }}
        >
          <span className="tag">Why Apex Spider</span>
          <h2>Why Choose Apex Spider?</h2>
          <p>We combine business insight with senior engineering standards to build software that moves your business forward.</p>
        </motion.div>

        <div className="mobile-value-grid">
          {VALUE_PROPS.map((item, index) => (
            <motion.div 
              key={item.number || index} 
              className="glass-panel mobile-value-card"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ 
                duration: prefersReducedMotion ? 0.01 : 0.6, 
                ease: EASE.premium, 
                delay: prefersReducedMotion ? 0 : index * 0.1 
              }}
            >
              <motion.div 
                className="mobile-principle-number text-gradient-cyan"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: prefersReducedMotion ? 0.01 : 0.5, 
                  ease: EASE.premium, 
                  delay: prefersReducedMotion ? 0 : index * 0.1 + 0.15 
                }}
              >
                {item.number}
              </motion.div>
              <h3 className="mobile-value-title">{item.title}</h3>
              {item.subtitle && <div className="mobile-value-subtitle">{item.subtitle}</div>}
              <p className="mobile-value-desc">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
