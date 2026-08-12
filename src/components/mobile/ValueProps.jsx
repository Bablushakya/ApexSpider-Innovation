import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { VALUE_PROPS } from '../../constants/valueProps';
import { EASE } from '../../constants/animations';
import './ValueProps.css';

function AnimatedNumber({ value, duration = 1.6, delay = 0.1 }) {
  const [displayValue, setDisplayValue] = useState(value.includes(':') ? '0:0' : '0');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  
  const isFloat = value.includes('.');
  const isRatio = value.includes(':');
  
  useEffect(() => {
    if (!isInView) return;
    
    let startTimestamp = null;
    const target = isRatio ? 1 : parseFloat(value);
    
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      const current = progress * target;
      
      if (isRatio) {
        const val = Math.floor(progress * 1);
        setDisplayValue(`${val}:${val}`);
      } else if (isFloat) {
        setDisplayValue(current.toFixed(1));
      } else {
        setDisplayValue(Math.floor(current));
      }
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };
    
    const timer = setTimeout(() => {
      window.requestAnimationFrame(step);
    }, delay * 1000);
    
    return () => clearTimeout(timer);
  }, [isInView, value, duration, delay, isFloat, isRatio]);

  return <span ref={ref}>{displayValue}</span>;
}

export default function MobileValueProps() {
  return (
    <section className="mobile-value-section section-padding" id="value-props">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: EASE.premium }}
        >
          <span className="tag">Value Proposition</span>
          <h2>Why Choose Us</h2>
          <p>We combine deep engineering standards with premium aesthetic execution to launch products faster.</p>
        </motion.div>

        <div className="mobile-value-grid">
          {VALUE_PROPS.map((item, index) => (
            <motion.div 
              key={index} 
              className="glass-panel mobile-value-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, ease: EASE.premium, delay: index * 0.1 }}
            >
              <div className="mobile-metric-header">
                <span className="mobile-metric-number text-gradient-cyan">
                  <AnimatedNumber value={item.metric} delay={0.3 + index * 0.1} />
                  {item.metricSuffix}
                </span>
                <span className="mobile-metric-badge">{item.metricLabel}</span>
              </div>
              <h3 className="mobile-value-title">{item.title}</h3>
              <p className="mobile-value-desc">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
