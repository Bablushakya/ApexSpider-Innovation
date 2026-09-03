/**
 * FadeIn.jsx
 * 
 * Simple fade-in animation component that triggers when the element
 * enters the viewport. No transform, just opacity.
 * 
 * Usage:
 *   <FadeIn>
 *     <YourContent />
 *   </FadeIn>
 * 
 * Props:
 *   - children: React node(s) to animate
 *   - delay: Animation delay in seconds (default: 0)
 *   - duration: Animation duration in seconds (default: 0.5)
 *   - once: Whether animation triggers only once (default: true)
 *   - margin: Intersection observer margin (default: '-10%')
 */

import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASE } from '../../constants/animations';

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  once = true,
  margin = '-10%',
  className = '',
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once, margin }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : duration,
        ease: EASE.smooth,
        delay: prefersReducedMotion ? 0 : delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
