/**
 * useReducedMotion
 *
 * Returns `true` when the user has opted into reduced motion via the OS
 * or browser setting (prefers-reduced-motion: reduce).
 *
 * Uses the MediaQueryList API and subscribes to changes so the value
 * stays reactive if the user toggles the setting while the page is open.
 */
import { useState, useEffect } from 'react';

export function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}
