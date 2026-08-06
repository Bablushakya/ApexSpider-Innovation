import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <main className="not-found-page" aria-labelledby="not-found-heading">
      <div className="not-found-container">
        <span className="not-found-code" aria-hidden="true">404</span>
        <h1 id="not-found-heading">Page Not Found</h1>
        <p>
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary not-found-cta">
          Return to Home
        </Link>
      </div>
    </main>
  );
}
