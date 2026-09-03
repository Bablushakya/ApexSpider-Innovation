/**
 * AnimatedSection.jsx
 * 
 * Wrapper for entire sections that provides consistent viewport-based
 * reveal animation. Simplifies section animation implementation.
 * 
 * Usage:
 *   <AnimatedSection>
 *     <section>
 *       <h2>Section Title</h2>
 *       <p>Content...</p>
 *     </section>
 *   </AnimatedSection>
 * 
 * Props:
 *   - children: React node(s) to animate
 *   - delay: Animation delay in seconds (default: 0)
 *   - duration: Animation duration in seconds (default: 0.7)
 *   - y: Vertical distance to travel (default: 30)
 *   - once: Whether animation triggers only once (default: true)
 *   - as: HTML element type (default: 'div')
 */

import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASE } from '../../constants/animations';

export default function AnimatedSection({
  children,
  delay = 0,
  duration = 0.7,
  y = 30,
  once = true,
  as = 'div',
  className = '',
}) {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as] || motion.div;

  const variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0, y, filter: 'blur(5px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
      };

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-10%', amount: 0.1 }}
      variants={variants}
      transition={{
        duration: prefersReducedMotion ? 0.01 : duration,
        ease: EASE.premium,
        delay: prefersReducedMotion ? 0 : delay,
      }}
      className={className}
    >
      {children}
    </Component>
  );
}
