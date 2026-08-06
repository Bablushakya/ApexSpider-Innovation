import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BRAND } from '../constants/brand';
import './FAQ.css';

const FAQS = [
  {
    q: 'What is the typical development timeline?',
    a: 'We engineer prototypes in 2–4 week iteration sprints, while larger custom enterprise software platforms take 3–6 months depending on technical scope and system integrations.',
  },
  {
    q: 'How do you handle codebase scaling and code standards?',
    a: 'All code compiles with modern strict linting rules and modular component layouts. We deliver fully documented React systems and clean stylesheet definitions to facilitate future expansion without technical debt.',
  },
  {
    q: 'Can you integrate with our existing APIs and infrastructure?',
    a: 'Yes, we construct custom event-driven pipelines, REST API proxies, and batch ETL integrations to sync data securely between new interfaces and your legacy databases.',
  },
  {
    q: 'What React frameworks and state management do you support?',
    a: 'We leverage Vite or Next.js for compiler performance. For state management, we align with vanilla React Context, Zustand, or Redux, adapting strictly to project complexity.',
  },
  {
    q: 'How do we initiate a collaboration?',
    a: `Submit your project requirements via the contact form below or email us at ${BRAND.email.primary}. We will initiate a technical scoping call within 24 hours.`,
  },
];

export default function FAQ() {
  const premiumEase   = [0.16, 1, 0.3, 1];
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
      transition: { duration: 0.8, ease: premiumEase },
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
          transition={{ duration: 0.8, ease: premiumEase }}
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
          {FAQS.map((faq, idx) => {
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
