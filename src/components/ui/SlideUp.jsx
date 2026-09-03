/**
 * SlideUp.jsx
 * 
 * Slides content upward while fading in when it enters the viewport.
 * Similar to Reveal but with specific preset for upward motion.
 * 
 * Usage:
 *   <SlideUp>
 *     <YourContent />
 *   </SlideUp>
 * 
 * Props:
 *   - children: React node(s) to animate
 *   - delay: Animation delay in seconds (default: 0)
 *   - duration: Animation duration in seconds (default: 0.7)
 *   - distance: Vertical distance in pixels (default: 35)
 *   - once: Whether animation triggers only once (default: true)
 */

import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASE } from '../../constants/animations';

export default function SlideUp({
  children,
  delay = 0,
  duration = 0.7,
  distance = 35,
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
        hidden: { opacity: 0, y: distance },
        visible: { opacity: 1, y: 0 },
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
