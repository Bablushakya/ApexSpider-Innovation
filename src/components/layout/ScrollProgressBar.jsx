import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function ScrollProgressBar() {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 35,
    restDelta: 0.0005,
  });

  if (prefersReduced) return null;

  return (
    <motion.div
      className="scroll-progress-bar"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
