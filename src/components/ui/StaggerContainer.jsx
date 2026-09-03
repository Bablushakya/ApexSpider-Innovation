/**
 * StaggerContainer.jsx
 * 
 * Container that orchestrates staggered animations for its children.
 * Use with StaggerItem components for coordinated sequential reveals.
 * 
 * Usage:
 *   <StaggerContainer>
 *     <StaggerItem>First</StaggerItem>
 *     <StaggerItem>Second</StaggerItem>
 *     <StaggerItem>Third</StaggerItem>
 *   </StaggerContainer>
 * 
 * Props:
 *   - children: React node(s) to animate (typically StaggerItem components)
 *   - stagger: Delay between each child animation in seconds (default: 0.1)
 *   - delayChildren: Initial delay before first child animates (default: 0)
 *   - once: Whether animation triggers only once (default: true)
 *   - className: Additional CSS classes
 */

import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function StaggerContainer({
  children,
  stagger = 0.1,
  delayChildren = 0,
  once = true,
  margin = '-10%',
  className = '',
}) {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : stagger,
        delayChildren: prefersReducedMotion ? 0 : delayChildren,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
