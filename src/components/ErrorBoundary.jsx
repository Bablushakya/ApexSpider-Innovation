/**
 * ErrorBoundary
 *
 * Catches unhandled render errors in the component tree and renders
 * a graceful fallback UI instead of a blank page.
 *
 * Usage:
 *   <ErrorBoundary>
 *     <App />
 *   </ErrorBoundary>
 */
import { Component } from 'react';
import { BRAND } from '../constants/brand';
import { logger } from '../utils/logger';
import { reportError } from '../utils/errorTracking';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Log in development; forward to error-tracking service in production.
    logger.error('[ErrorBoundary] Uncaught error:', error, info.componentStack);
    reportError(error, { componentStack: info.componentStack });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            background: 'hsl(224, 40%, 7%)',
            color: 'hsl(210, 40%, 98%)',
            padding: '24px',
            textAlign: 'center',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="hsl(0, 70%, 60%)"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
            Something went wrong
          </h1>
          <p style={{ color: 'hsl(215, 20%, 65%)', maxWidth: '400px', margin: 0 }}>
            An unexpected error occurred. Please refresh the page or contact us at{' '}
            <a
              href={`mailto:${BRAND.email.primary}`}
              style={{ color: 'hsl(180, 100%, 50%)' }}
            >
              {BRAND.email.primary}
            </a>
            .
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '8px',
              padding: '10px 24px',
              borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(135deg, hsl(180,100%,50%) 0%, hsl(250,100%,65%) 100%)',
              color: 'hsl(224,40%,7%)',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.95rem',
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
