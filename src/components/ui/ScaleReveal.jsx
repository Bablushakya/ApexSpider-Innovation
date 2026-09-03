/**
 * ScaleReveal.jsx
 * 
 * Reveals content with a subtle scale + fade animation.
 * Perfect for images, cards, and visual elements.
 * 
 * Usage:
 *   <ScaleReveal>
 *     <img src="..." alt="..." />
 *   </ScaleReveal>
 * 
 * Props:
 *   - children: React node(s) to animate
 *   - delay: Animation delay in seconds (default: 0)
 *   - duration: Animation duration in seconds (default: 0.7)
 *   - scale: Initial scale value (default: 0.96)
 *   - once: Whether animation triggers only once (default: true)
 */

import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASE } from '../../constants/animations';

export default function ScaleReveal({
  children,
  delay = 0,
  duration = 0.7,
  scale = 0.96,
  once = true,
  className = '',
}) {
  const prefersReducedMotion = useReducedMotion();

  const variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0, scale },
        visible: { opacity: 1, scale: 1 },
      };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-10%' }}
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
