import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './About.css';

const premiumEase = [0.16, 1, 0.3, 1];

/* ── Real technology stack, grouped by category ─────────── */
const TECH_CATEGORIES = [
  {
    label: 'Frontend',
    items: ['React.js', 'Next.js', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Express.js', 'Python', 'FastAPI'],
  },
  {
    label: 'Database',
    items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Firebase', 'Supabase'],
  },
  {
    label: 'Cloud & Hosting',
    items: ['Vercel', 'Netlify', 'AWS', 'Cloudflare'],
  },
  {
    label: 'Dev Tools',
    items: ['Git', 'GitHub', 'Docker', 'Postman', 'VS Code'],
  },
  {
    label: 'Analytics & SEO',
    items: ['Google Analytics', 'Search Console', 'Tag Manager', 'Ahrefs', 'SEMrush'],
  },
  {
    label: 'UI Design',
    items: ['Figma', 'Adobe XD', 'Photoshop'],
  },
];

/* All items flattened for the animated grid */
const ALL_ITEMS = TECH_CATEGORIES.flatMap((cat) =>
  cat.items.map((name) => ({ name, category: cat.label }))
);

const techContainerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.15 } },
};

const techItemVariants = {
  hidden:  { opacity: 0, scale: 0.85, filter: 'blur(3px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: premiumEase },
  },
};

export default function About() {
  const [activeCategory, setActiveCategory] = useState(null);

  /* Determine which items are "active" for the hover filter */
  const isHighlighted = (item) =>
    activeCategory === null || item.category === activeCategory;

  return (
    <section
      className="about-section section-padding"
      id="about"
      aria-labelledby="about-heading"
    >
      {/* Ambient background blob */}
      <div className="glow-blob glow-blob-teal about-blob" aria-hidden="true" />

      <div className="container about-container">

        {/* ── Left: Story ──────────────────────────────────── */}
        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: premiumEase }}
        >
          <span className="tag">Company</span>
          <h2 id="about-heading" className="about-title">
            Building Software with Precision
          </h2>
          <p className="about-text">
            At ApexSpider Innovation, we believe software should be robust, scalable, and
            visually premium. We partner with growing businesses and startup founders to
            architect custom web and mobile applications, data-driven solutions, and clean
            UI systems that ensure operational efficiency and long-term growth.
          </p>
          <p className="about-text">
            Our approach prioritises design system integrity, rapid prototyping, and
            high-fidelity code execution. We write modular, maintainable code and build
            secure backends to guarantee product velocity.
          </p>

          <div className="about-standards-list">
            <div className="standard-item">
              <span className="standard-icon" aria-hidden="true">✓</span>
              <div>
                <h3 className="standard-title">Clean Code Standards</h3>
                <p className="standard-desc">
                  Consistent component structures, lint validation, and documented codebases.
                </p>
              </div>
            </div>
            <div className="standard-item">
              <span className="standard-icon" aria-hidden="true">✓</span>
              <div>
                <h3 className="standard-title">Design-to-Code Fidelity</h3>
                <p className="standard-desc">
                  Precision styling that matches design guidelines pixel-for-pixel.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Right: Tech Stack ────────────────────────────── */}
        <motion.div
          className="about-visual"
          initial={{ opacity: 0, y: 35, scale: 0.98, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: premiumEase, delay: 0.15 }}
        >
          <div className="tech-stack-container glass-panel">
            <h3 className="tech-grid-title">Our Architecture Stack</h3>
            <p className="tech-grid-subtitle">
              Technologies we use to build, deploy, and scale your product.
            </p>

            {/* Category filter pills */}
            <div className="tech-filter-row" role="group" aria-label="Filter by technology category">
              <button
                className={`tech-filter-pill${activeCategory === null ? ' active' : ''}`}
                onClick={() => setActiveCategory(null)}
                aria-pressed={activeCategory === null}
              >
                All
              </button>
              {TECH_CATEGORIES.map((cat) => (
                <button
                  key={cat.label}
                  className={`tech-filter-pill${activeCategory === cat.label ? ' active' : ''}`}
                  onClick={() =>
                    setActiveCategory((prev) => (prev === cat.label ? null : cat.label))
                  }
                  aria-pressed={activeCategory === cat.label}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Animated tech grid */}
            <motion.div
              className="tech-grid"
              variants={techContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {ALL_ITEMS.map((tech, idx) => (
                <motion.div
                  key={idx}
                  className="tech-item"
                  title={tech.category}
                  variants={techItemVariants}
                  animate={{ opacity: isHighlighted(tech) ? 1 : 0.2 }}
                  whileHover={{
                    scale: 1.08,
                    y: -3,
                    borderColor: 'var(--color-accent-teal)',
                    boxShadow: '0 4px 15px rgba(0, 255, 255, 0.15)',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  <span className="tech-name">{tech.name}</span>
                  <span className="tech-category-badge">{tech.category}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
