/**
 * useIsMobile
 *
 * Returns `true` when the viewport width is below the mobile breakpoint.
 * Uses the MediaQueryList API and subscribes to changes so the value
 * stays reactive if the user resizes the browser or changes orientation.
 *
 * Breakpoint: 1024px (matches the existing project's tablet/mobile threshold)
 *
 * @returns {boolean} isMobile - true if viewport is below 1024px
 */
import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = '(max-width: 1023px)';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(MOBILE_BREAKPOINT).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT);
    const handler = (e) => setIsMobile(e.matches);
    
    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
    // Fallback for older browsers
    else {
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, []);

  return isMobile;
}
