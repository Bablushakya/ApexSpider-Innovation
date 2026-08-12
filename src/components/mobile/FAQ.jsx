import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FAQS } from '../../constants/faq';
import { EASE } from '../../constants/animations';
import './FAQ.css';

export default function MobileFAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

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
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: EASE.premium }}
        >
          <span className="tag">Support</span>
          <h2 id="faq-heading">Frequently Asked Questions</h2>
          <p>
            Common questions about our coding standards, development timelines,
            and integration methodologies.
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
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.6, ease: EASE.premium, delay: idx * 0.05 }}
              >
                <button
                  id={questionId}
                  className="mobile-faq-question-btn"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => handleToggle(idx)}
                >
                  <span className="mobile-faq-question-text">{faq.q}</span>
                  <span className="mobile-faq-arrow-icon" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                <div
                  id={answerId}
                  className={`mobile-faq-answer${isOpen ? ' open' : ''}`}
                  role="region"
                  aria-labelledby={questionId}
                  hidden={!isOpen}
                >
                  <div className="mobile-faq-answer-content">
                    <p className="mobile-faq-answer-text">{faq.a}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
