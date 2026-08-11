/**
 * errorTracking.js — Optional production error tracking.
 *
 * Integrates with Sentry when VITE_SENTRY_DSN is set in the environment.
 * Gracefully degrades to a no-op if the DSN is not configured, so the
 * app works perfectly without any Sentry account.
 *
 * ── Setup (optional) ────────────────────────────────────────────────────────
 * 1. Create a free account at https://sentry.io
 * 2. Create a new "React" project in the Sentry dashboard
 * 3. Copy your DSN from: Project Settings → Client Keys (DSN)
 * 4. Add it to your .env file:
 *      VITE_SENTRY_DSN=https://xxxx@oxxxx.ingest.sentry.io/xxxx
 * 5. Install the package:
 *      npm install @sentry/react
 * 6. Uncomment the Sentry import/init block below and remove the stub.
 * ────────────────────────────────────────────────────────────────────────────
 *
 * Usage:
 *   import { initErrorTracking, reportError } from '../utils/errorTracking';
 *
 *   // Call once at app startup (main.jsx or App.jsx):
 *   initErrorTracking();
 *
 *   // In ErrorBoundary.componentDidCatch:
 *   reportError(error, { componentStack: info.componentStack });
 */

const isDev = import.meta.env.DEV;
const sentryDsn = import.meta.env.VITE_SENTRY_DSN?.trim();
const hasSentry = !!sentryDsn;

// ── Sentry integration ───────────────────────────────────────────────────────
// When you are ready to activate Sentry:
//   1. Run: npm install @sentry/react
//   2. Replace the stub below with the real implementation
//      (uncomment the block marked [SENTRY REAL IMPL])
// ─────────────────────────────────────────────────────────────────────────────

/*
// [SENTRY REAL IMPL] — uncomment after running: npm install @sentry/react
import * as Sentry from '@sentry/react';

export function initErrorTracking() {
  if (!hasSentry || isDev) return;
  Sentry.init({
    dsn: sentryDsn,
    environment: import.meta.env.MODE,
    tracesSampleRate: 0.2,         // 20% of transactions — adjust as needed
    replaysOnErrorSampleRate: 1.0, // Always capture replay on error
  });
}

export function reportError(error, context) {
  if (!hasSentry || isDev) return;
  Sentry.captureException(error, {
    contexts: { react: context },
  });
}
*/

// ── Stub (active until Sentry is installed) ──────────────────────────────────

/**
 * Initialise error tracking.
 * Currently a no-op stub — replace with real Sentry init when ready.
 */
export function initErrorTracking() {
  if (isDev && hasSentry) {
    console.info('[ErrorTracking] VITE_SENTRY_DSN is set. Install @sentry/react and activate the real implementation in errorTracking.js.');
  }
}

/**
 * Report an error to the tracking service.
 * Currently a no-op stub — safe to call anywhere.
 *
 * @param {Error}  error
 * @param {object} [context]
 */
export function reportError(error, context) {
  // No-op until Sentry is installed.
  // In development the logger already prints the error to the console.
  void error;
  void context;
}
