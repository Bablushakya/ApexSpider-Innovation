import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND } from '../constants/brand';
import './LegalPage.css';

export default function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <Link to="/" className="legal-back-link" aria-label="Back to home">
          ← Back to Home
        </Link>

        <header className="legal-header">
          <span className="tag">Legal</span>
          <h1>Privacy Policy</h1>
          <p className="legal-meta">Last updated: August 6, 2026</p>
        </header>

        <div className="legal-content">
          <section aria-labelledby="overview-heading">
            <h2 id="overview-heading">Overview</h2>
            <p>
              {BRAND.name} (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your
              privacy. This Privacy Policy explains how we collect, use, and protect information when
              you visit our website at{' '}
              <a href={BRAND.url} rel="noopener noreferrer">
                {BRAND.url}
              </a>{' '}
              or contact us through our inquiry form.
            </p>
          </section>

          <section aria-labelledby="collect-heading">
            <h2 id="collect-heading">Information We Collect</h2>
            <p>We collect information you provide directly when you:</p>
            <ul>
              <li>Submit our contact or project inquiry form (name, email, project details)</li>
              <li>Send us an email at {BRAND.email.primary}</li>
            </ul>
            <p>
              We do not use third-party analytics trackers, advertising networks, or cookies beyond
              those technically necessary to serve the website.
            </p>
          </section>

          <section aria-labelledby="use-heading">
            <h2 id="use-heading">How We Use Your Information</h2>
            <p>Information collected through the contact form is used exclusively to:</p>
            <ul>
              <li>Respond to your project inquiry</li>
              <li>Schedule technical scoping calls</li>
              <li>Deliver project estimates and proposals</li>
            </ul>
            <p>
              We do not sell, rent, or share your personal information with third parties for
              marketing purposes.
            </p>
          </section>

          <section aria-labelledby="security-heading">
            <h2 id="security-heading">Data Security</h2>
            <p>
              Form submissions are processed through Web3Forms, a secure form processing service.
              All data in transit is encrypted via HTTPS (TLS 1.2+). We retain inquiry data only
              for the duration necessary to complete the requested scoping or project engagement.
            </p>
          </section>

          <section aria-labelledby="rights-heading">
            <h2 id="rights-heading">Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Request a copy of the personal data we hold about you</li>
              <li>Request correction or deletion of your personal data</li>
              <li>Withdraw consent for processing at any time</li>
            </ul>
            <p>
              To exercise these rights, contact us at{' '}
              <a href={`mailto:${BRAND.email.primary}`}>{BRAND.email.primary}</a>.
            </p>
          </section>

          <section aria-labelledby="contact-heading">
            <h2 id="contact-heading">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please reach out to:
              <br />
              <strong>{BRAND.name}</strong>
              <br />
              <a href={`mailto:${BRAND.email.primary}`}>{BRAND.email.primary}</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
