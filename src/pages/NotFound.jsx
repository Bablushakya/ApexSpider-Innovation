import React from 'react';
import { Link } from 'react-router-dom';
import PageSEO from '../components/layout/PageSEO';
import './NotFound.css';

export default function NotFound() {
  return (
    <main className="not-found-page" aria-labelledby="not-found-heading">
      {/* noindex: ensures this page is excluded from search indexes
          even if the server ever returns 200 for an unknown URL */}
      <PageSEO
        title="404 — Page Not Found | Apex Spider Innovation"
        description="The page you are looking for does not exist."
        noindex
      />
      <div className="not-found-container">
        <span className="not-found-code" aria-hidden="true">404</span>
        <h1 id="not-found-heading">Page Not Found</h1>
        <p>
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary not-found-cta">
            Return to Home
          </Link>
          <Link to="/services" className="btn btn-secondary">
            Our Services
          </Link>
          <Link to="/contact" className="btn btn-secondary">
            Contact
          </Link>
        </div>
      </div>
    </main>
  );
}
