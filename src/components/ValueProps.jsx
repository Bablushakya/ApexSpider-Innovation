import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './ValueProps.css';

// Custom sub-component to animate numeric metrics count-up dynamically on scroll
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
        // Count up ratios like 0:0 -> 1:1
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

export default function ValueProps() {
  const premiumEase = [0.16, 1, 0.3, 1];

  const propsList = [
    {
      metric: '99.9',
      metricSuffix: '%',
      metricLabel: 'Prototype Uptime',
      title: 'Engineering Excellence',
      desc: 'We architect systems with fail-safes and optimized querying to ensure reliability under heavy operational loads.'
    },
    {
      metric: '99',
      metricSuffix: '+',
      metricLabel: 'Projects Optimised',
      title: 'Web Development',
      desc: 'We build high-performance websites and web applications focused on speed, responsiveness, SEO, security, and exceptional user experience using modern development technologies.'
    },
    {
      metric: '1:1',
      metricSuffix: '',
      metricLabel: 'Design Fidelity',
      title: 'Premium User Interfaces',
      desc: 'We bridge design and engineering seamlessly, ensuring mockups translate identically to the final React application.'
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const cardVariants = {
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
        duration: 0.85, 
        ease: premiumEase
      }
    }
  };

  return (
    <section className="value-section section-padding" id="value-props">
      <div className="glow-blob glow-blob-indigo value-blob"></div>
      
      <div className="container">
        {/* Section Header */}
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: premiumEase }}
        >
          <span className="tag">Value Proposition</span>
          <h2>Why Choose Us</h2>
          <p>We combine deep engineering standards with premium aesthetic execution to launch products faster.</p>
        </motion.div>

        {/* Value Cards Grid */}
        <motion.div 
          className="value-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          {propsList.map((item, index) => (
            <motion.div 
              key={index} 
              className="glass-panel value-card"
              variants={cardVariants}
            >
              <div className="metric-header">
                <span className="metric-number text-gradient-cyan">
                  <AnimatedNumber value={item.metric} delay={0.2 + index * 0.1} />
                  {item.metricSuffix}
                </span>
                <span className="metric-badge">{item.metricLabel}</span>
              </div>
              <h3 className="value-title">{item.title}</h3>
              <p className="value-desc">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
