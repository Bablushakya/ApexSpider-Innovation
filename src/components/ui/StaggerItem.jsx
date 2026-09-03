/**
 * StaggerItem.jsx
 * 
 * Individual item to be used inside a StaggerContainer.
 * Automatically animates in sequence with siblings.
 * 
 * Usage:
 *   <StaggerContainer>
 *     <StaggerItem>First</StaggerItem>
 *     <StaggerItem>Second</StaggerItem>
 *   </StaggerContainer>
 * 
 * Props:
 *   - children: React node(s) to animate
 *   - duration: Animation duration in seconds (default: 0.6)
 *   - y: Vertical distance to travel (default: 25)
 *   - blur: Whether to add blur effect (default: false)
 *   - className: Additional CSS classes
 */

import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASE } from '../../constants/animations';

export default function StaggerItem({
  children,
  duration = 0.6,
  y = 25,
  blur = false,
  className = '',
}) {
  const prefersReducedMotion = useReducedMotion();

  const itemVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    : {
        hidden: {
          opacity: 0,
          y,
          ...(blur && { filter: 'blur(3px)' }),
        },
        visible: {
          opacity: 1,
          y: 0,
          ...(blur && { filter: 'blur(0px)' }),
        },
      };

  return (
    <motion.div
      variants={itemVariants}
      transition={{
        duration: prefersReducedMotion ? 0.01 : duration,
        ease: EASE.premium,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
