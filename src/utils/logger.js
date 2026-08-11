/**
 * logger.js — Lightweight production-safe logging utility.
 *
 * In development  → all levels print to the console.
 * In production   → log/warn are silent; errors are forwarded to
 *                   reportError (src/utils/errorTracking.js) so they
 *                   reach Sentry (if configured) without polluting
 *                   the browser console.
 *
 * Usage:
 *   import { logger } from '../utils/logger';
 *   logger.log('...');   // dev only
 *   logger.warn('...');  // dev only
 *   logger.error('...'); // dev only + Sentry in prod
 */

import { reportError } from './errorTracking.js';

const isDev = import.meta.env.DEV;

export const logger = {
  /**
   * Debug / informational output — dev only.
   * @param  {...*} args
   */
  log(...args) {
    if (isDev) console.log(...args);
  },

  /**
   * Non-critical warnings — dev only.
   * @param  {...*} args
   */
  warn(...args) {
    if (isDev) console.warn(...args);
  },

  /**
   * Errors — always forwarded to the error-tracking service;
   * additionally printed to the console in development.
   * @param  {...*} args
   */
  error(...args) {
    if (isDev) {
      console.error(...args);
    } else {
      // In production, forward to the error tracking service (Sentry etc.)
      const [error, ...rest] = args;
      reportError(
        error instanceof Error ? error : new Error(String(error)),
        rest.length ? { extra: rest } : undefined
      );
    }
  },
};
