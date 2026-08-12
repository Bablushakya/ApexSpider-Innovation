import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FAQS } from '../../constants/faq';
import { EASE } from '../../constants/animations';
import './FAQ.css';

const FAQS_DATA = FAQS;

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const containerVariants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden:  { opacity: 0, y: 25, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: EASE.premium },
    },
  };

  return (
    <section
      className="faq-section section-padding"
      id="faq"
      aria-labelledby="faq-heading"
    >
      <div className="container">
        {/* Section Header */}
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

        {/* Accordion list */}
        <motion.div
          className="faq-container"
          role="list"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-8%' }}
        >
          {FAQS_DATA.map((faq, idx) => {
            const isOpen    = activeIndex === idx;
            const answerId  = `faq-answer-${idx}`;
            const questionId = `faq-question-${idx}`;

            return (
              <motion.div
                key={idx}
                role="listitem"
                className={`glass-panel faq-item${isOpen ? ' active' : ''}`}
                variants={itemVariants}
              >
                {/*
                  The button is the ONLY interactive element.
                  The outer div has no onClick — keyboard and pointer
                  users both interact exclusively via the button.
                */}
                <button
                  id={questionId}
                  className="faq-question-btn"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => handleToggle(idx)}
                >
                  <span className="faq-question-text">{faq.q}</span>
                  <span className="faq-arrow-icon" aria-hidden="true">
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

                {/* CSS grid-template-rows height animation */}
                <div
                  id={answerId}
                  className={`faq-answer${isOpen ? ' open' : ''}`}
                  role="region"
                  aria-labelledby={questionId}
                  hidden={!isOpen}
                >
                  <div className="faq-answer-content">
                    <p className="faq-answer-text">{faq.a}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
