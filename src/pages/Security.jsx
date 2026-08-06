import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND } from '../constants/brand';
import './LegalPage.css';

export default function Security() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <Link to="/" className="legal-back-link" aria-label="Back to home">
          ← Back to Home
        </Link>

        <header className="legal-header">
          <span className="tag">Security</span>
          <h1>Security</h1>
          <p className="legal-meta">Last updated: August 6, 2026</p>
        </header>

        <div className="legal-content">
          <section aria-labelledby="commitment-heading">
            <h2 id="commitment-heading">Our Security Commitment</h2>
            <p>
              {BRAND.name} takes the security of our website and client data seriously. This page
              describes our security practices and responsible disclosure policy.
            </p>
          </section>

          <section aria-labelledby="measures-heading">
            <h2 id="measures-heading">Security Measures</h2>
            <ul>
              <li>All data in transit is encrypted using HTTPS (TLS 1.2 or higher)</li>
              <li>Contact form submissions are processed via a trusted third-party form service</li>
              <li>
                We do not store payment information — billing is handled entirely by
                PCI-compliant payment processors
              </li>
              <li>
                Access to client project data is restricted to authorized team members on a
                need-to-know basis
              </li>
              <li>Dependencies are regularly reviewed and updated to patch known vulnerabilities</li>
            </ul>
          </section>

          <section aria-labelledby="delivery-heading">
            <h2 id="delivery-heading">Secure Software Delivery</h2>
            <p>
              All custom software we deliver follows secure development best practices:
            </p>
            <ul>
              <li>Input validation and sanitization on all user-facing forms</li>
              <li>Parameterized queries to prevent SQL injection</li>
              <li>OWASP Top 10 compliance checks during code review</li>
              <li>Dependency auditing via automated tooling (e.g., npm audit)</li>
              <li>Environment variable management — secrets are never hardcoded</li>
            </ul>
          </section>

          <section aria-labelledby="disclosure-heading">
            <h2 id="disclosure-heading">Responsible Disclosure</h2>
            <p>
              If you discover a security vulnerability in our website or any software we maintain,
              we encourage responsible disclosure. Please email us at{' '}
              <a href={`mailto:${BRAND.email.primary}`}>{BRAND.email.primary}</a> with the subject
              line <strong>&ldquo;Security Disclosure&rdquo;</strong>. We will acknowledge your report
              within 48 hours and work to resolve confirmed issues promptly.
            </p>
            <p>
              Please do not publicly disclose vulnerabilities before we have had reasonable time
              to address them.
            </p>
          </section>

          <section aria-labelledby="contact-heading">
            <h2 id="contact-heading">Security Contact</h2>
            <p>
              <a href={`mailto:${BRAND.email.primary}`}>{BRAND.email.primary}</a>
              <br />
              Subject: Security Disclosure
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
