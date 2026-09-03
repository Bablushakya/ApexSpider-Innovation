import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQS } from '../../constants/faq';
import { EASE } from '../../constants/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './FAQ.css';

export default function MobileFAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  const prefersReduced = useReducedMotion();

  const handleToggle = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      className="mobile-faq-section section-padding"
      id="faq"
      aria-labelledby="faq-heading"
    >
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20, filter: prefersReduced ? 'blur(0px)' : 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: prefersReduced ? 0.01 : 0.8, ease: EASE.premium }}
        >
          <span className="tag">FAQ</span>
          <h2 id="faq-heading">Frequently Asked Questions</h2>
          <p>
            Common business questions about our development process, technology capabilities, timelines, and ongoing support.
          </p>
        </motion.div>

        <div className="mobile-faq-container">
          {FAQS.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            const answerId = `faq-answer-${idx}`;
            const questionId = `faq-question-${idx}`;

            return (
              <motion.div
                key={idx}
                className={`glass-panel mobile-faq-item${isOpen ? ' active' : ''}`}
                initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: prefersReduced ? 0.01 : 0.7, ease: EASE.premium, delay: prefersReduced ? 0 : idx * 0.08 }}
              >
                <button
                  id={questionId}
                  className="mobile-faq-question-btn"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => handleToggle(idx)}
                >
                  <span className="mobile-faq-question-text">{faq.q}</span>
                  <motion.span 
                    className="mobile-faq-arrow-icon" 
                    aria-hidden="true"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: prefersReduced ? 0.01 : 0.3, ease: EASE.smooth }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={answerId}
                      className="mobile-faq-answer open"
                      role="region"
                      aria-labelledby={questionId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: 'auto', 
                        opacity: 1,
                        transition: {
                          height: { duration: prefersReduced ? 0.01 : 0.35, ease: EASE.smooth },
                          opacity: { duration: prefersReduced ? 0.01 : 0.25, delay: prefersReduced ? 0 : 0.1 }
                        }
                      }}
                      exit={{ 
                        height: 0, 
                        opacity: 0,
                        transition: {
                          height: { duration: prefersReduced ? 0.01 : 0.3, ease: EASE.smooth },
                          opacity: { duration: prefersReduced ? 0.01 : 0.15 }
                        }
                      }}
                    >
                      <motion.div 
                        className="mobile-faq-answer-content"
                        initial={{ y: prefersReduced ? 0 : -8 }}
                        animate={{ y: 0 }}
                        transition={{ duration: prefersReduced ? 0.01 : 0.3, delay: prefersReduced ? 0 : 0.1 }}
                      >
                        <p className="mobile-faq-answer-text">{faq.a}</p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
