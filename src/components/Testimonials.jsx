import React from 'react';
import { motion } from 'framer-motion';
import './Testimonials.css';

export default function Testimonials() {
  const premiumEase = [0.16, 1, 0.3, 1];

  const testimonials = [
    {
      quote: "The component layouts provided were highly structured and integrated seamlessly into our web systems. Excellent attention to clean styling parameters.",
      author: "Lead Architect",
      company: "Startup Alpha Demo",
      initials: "SA"
    },
    {
      quote: "A highly collaborative and transparent engineering cycle. The resulting dashboard prototype has become the blueprint for our internal production tools.",
      author: "VP of Engineering",
      company: "Enterprise Beta Concept",
      initials: "EB"
    },
    {
      quote: "Refined visual styling, solid React file structures, and rapid development cycles. An exceptional engineering resource for teams looking to build and iterate quickly.",
      author: "Product Director",
      company: "Digital Delta Sample",
      initials: "DD"
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
    <section className="testimonials-section section-padding" id="testimonials">
      <div className="container">
        {/* Section Header */}
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: premiumEase }}
        >
          <span className="tag">Testimonials</span>
          <h2>Client Feedback Mockup</h2>
          <p>Sample reviews representing design feedback, engineering quality, and collaboration outcomes.</p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div 
          className="testimonials-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-8%" }}
        >
          {testimonials.map((t, idx) => (
            <motion.div 
              key={idx} 
              className="glass-panel testimonial-card"
              variants={cardVariants}
              whileHover={{ y: -6, borderColor: "var(--color-accent-teal)" }}
              transition={{ duration: 0.3 }}
            >
              {/* Quote mark icon */}
              <span className="quote-mark">“</span>
              
              <p className="testimonial-quote">{t.quote}</p>
              
              <div className="testimonial-footer">
                <div className="author-avatar">
                  {t.initials}
                </div>
                <div className="author-info">
                  <h4 className="author-name">{t.author}</h4>
                  <span className="author-company">{t.company}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
