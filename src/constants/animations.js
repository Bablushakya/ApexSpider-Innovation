/**
 * animations.js — Shared animation constants for Framer Motion.
 *
 * Previously `premiumEase` was defined as a local constant in every
 * component that used it (11 occurrences). This file is the single
 * source of truth.
 *
 * Usage:
 *   import { EASE } from '../constants/animations';
 *   transition={{ duration: 0.9, ease: EASE.premium }}
 */

/**
 * Cubic-bezier easing presets.
 * These values match what was previously defined inline in each component.
 */
export const EASE = {
  /** Apple-keynote-style expo out — used for most entrance animations */
  premium: [0.16, 1, 0.3, 1],

  /** Smooth in-out — used for panel/split transitions in the preloader */
  inOut: [0.76, 0, 0.24, 1],

  /** Gentle ease for micro-interactions */
  smooth: [0.25, 0.8, 0.25, 1],
};

/**
 * Duration presets (seconds).
 */
export const DURATION = {
  fast:   0.2,
  normal: 0.4,
  slow:   0.8,
  enter:  0.9,
};
