/**
 * useIntersectionObserver
 *
 * Observes a ref element and returns a boolean indicating whether it
 * is currently intersecting with the viewport.
 *
 * Used to pause animations / RAF loops when sections are off-screen.
 *
 * @param {React.RefObject} ref        - Ref to observe
 * @param {string}          rootMargin - IntersectionObserver rootMargin (default: '0px')
 * @param {number}          threshold  - Intersection threshold 0–1 (default: 0)
 * @returns {boolean} isVisible
 */
import { useState, useEffect } from 'react';

export function useIntersectionObserver(ref, rootMargin = '0px', threshold = 0) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin, threshold]);

  return isVisible;
}
