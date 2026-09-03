/**
 * Reveal.jsx
 * 
 * A reusable component that wraps children with a viewport-triggered
 * reveal animation. Elements fade in and slide up when they enter
 * the viewport.
 * 
 * Usage:
 *   <Reveal>
 *     <YourContent />
 *   </Reveal>
 * 
 * Props:
 *   - children: React node(s) to animate
 *   - delay: Animation delay in seconds (default: 0)
 *   - duration: Animation duration in seconds (default: 0.6)
 *   - y: Vertical distance to travel (default: 30)
 *   - blur: Whether to add blur effect (default: false)
 *   - once: Whether animation triggers only once (default: true)
 *   - margin: Intersection observer margin (default: '-10%')
 *   - amount: How much of element must be visible (default: 0.15)
 */

import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASE } from '../../constants/animations';

export default function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  y = 30,
  blur = false,
  once = true,
  margin = '-10%',
  amount = 0.15,
  className = '',
}) {
  const prefersReducedMotion = useReducedMotion();

  // If user prefers reduced motion, skip transform/blur effects
  const variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    : {
        hidden: {
          opacity: 0,
          y,
          ...(blur && { filter: 'blur(4px)' }),
        },
        visible: {
          opacity: 1,
          y: 0,
          ...(blur && { filter: 'blur(0px)' }),
        },
      };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin, amount }}
      variants={variants}
      transition={{
        duration: prefersReducedMotion ? 0.01 : duration,
        ease: EASE.premium,
        delay: prefersReducedMotion ? 0 : delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
