/**
 * useScrollAnimation
 * 
 * Custom hook that provides a consistent way to create scroll-triggered
 * animations with accessibility support.
 * 
 * Returns animation props that can be spread directly onto motion components.
 * 
 * Usage:
 *   const animProps = useScrollAnimation({ delay: 0.2 });
 *   <motion.div {...animProps}>Content</motion.div>
 * 
 * @param {Object} options - Animation configuration
 * @param {number} options.delay - Animation delay in seconds (default: 0)
 * @param {number} options.duration - Animation duration in seconds (default: 0.6)
 * @param {number} options.y - Vertical movement distance (default: 30)
 * @param {boolean} options.blur - Add blur effect (default: false)
 * @param {boolean} options.once - Trigger only once (default: true)
 * @param {string} options.margin - Intersection observer margin (default: '-10%')
 * @returns {Object} Animation props for motion component
 */

import { useReducedMotion } from './useReducedMotion';
import { EASE } from '../constants/animations';

export function useScrollAnimation({
  delay = 0,
  duration = 0.6,
  y = 30,
  blur = false,
  once = true,
  margin = '-10%',
} = {}) {
  const prefersReducedMotion = useReducedMotion();

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

  return {
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once, margin },
    variants,
    transition: {
      duration: prefersReducedMotion ? 0.01 : duration,
      ease: EASE.premium,
      delay: prefersReducedMotion ? 0 : delay,
    },
  };
}
