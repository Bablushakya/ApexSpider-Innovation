import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BRAND } from '../constants/brand';
import './FAQ.css';

const FAQS = [
  {
    q: 'How can AI agents automate business workflows and operations?',
    a: 'AI agents can perform repetitive workflow activities like data management, customer service, documentation management, reporting, and internal functions. The AI-based workflows are designed keeping in view the existing workflows of yours to lessen the manual efforts.',
  },
  {
    q: 'Can you build AI-powered applications using our business data?',
    a: 'Yes. It is possible to develop applications that use artificial intelligence by leveraging structured as well as unstructured data from businesses, and such applications may include intelligent search, knowledge assistants, RAG, predictive models, and others.',
  },
  {
    q: 'Can you integrate our existing APIs, databases, and cloud infrastructure?',
    a: 'Indeed. We can incorporate any existing APIs, databases, authentications, third-party services, and even cloud into new applications or old ones. It is our aim to expand your existing technological environment without interfering with your core business processes.',
  },
  {
    q: 'How do you build scalable and secure web applications?',
    a: 'We use modular architecture, secure API designs, database optimization, authentication, validation, testing, and scalable infrastructure to create robust web applications. Our architecture is planned based on current needs but future growth is considered.',
  },
  {
    q: 'Can you develop custom mobile applications for our business?',
    a: `Yes. We develop custom mobile applications based on your business requirements, user workflows, and target platforms. We focus on responsive interfaces, reliable performance, secure backend integration, and maintainable architecture.`,
  },
  {
    q: 'Can you turn our business data into dashboards, predictive models, or AI solutions?',
    a: 'Absolutely! It is possible to convert raw data from the business into dashboards, analytical solutions, predictive models, and AI-based solutions. It starts with understanding the business problem and then picking the right data and technology.',
  },
  {
    q: 'How do you approach UI/UX design for digital products?',
    a: 'We start by understanding users, business goals, and product requirements. We then create user flows, wireframes, high-fidelity interfaces, and prototypes before development to ensure the final product is intuitive, consistent, and aligned with the brand.',},
    {
      q: 'What does the development process look like from idea to production?',
      a: 'Our process typically follows four stages: Strategy & Requirements → Design → Development → Staging & Integration. We validate requirements and designs before development, test the product during implementation, and perform final checks before production deployment.',
    },
    {
      q: 'How do you maintain, monitor, and scale applications after launch?',
      a: 'We can provide ongoing maintenance, performance monitoring, security updates, bug fixes, infrastructure optimization, and feature development. As usage grows, we can also optimize the application architecture and infrastructure to support increased traffic and workloads.',
    }
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
