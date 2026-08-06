import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND } from '../constants/brand';
import './LegalPage.css';

export default function Terms() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <Link to="/" className="legal-back-link" aria-label="Back to home">
          ← Back to Home
        </Link>

        <header className="legal-header">
          <span className="tag">Legal</span>
          <h1>Terms of Service</h1>
          <p className="legal-meta">Last updated: August 6, 2026</p>
        </header>

        <div className="legal-content">
          <section aria-labelledby="agreement-heading">
            <h2 id="agreement-heading">Agreement to Terms</h2>
            <p>
              By accessing the website of {BRAND.name} (&ldquo;Company&rdquo;), you agree to be bound
              by these Terms of Service. If you do not agree to these terms, please do not use our
              website.
            </p>
          </section>

          <section aria-labelledby="services-heading">
            <h2 id="services-heading">Services</h2>
            <p>
              {BRAND.name} provides custom software development, web application design, UI/UX
              design, workflow automation, and related technical consulting services. All services are
              subject to a separate written engagement agreement between the Company and the client.
            </p>
          </section>

          <section aria-labelledby="ip-heading">
            <h2 id="ip-heading">Intellectual Property</h2>
            <p>
              All content on this website — including text, graphics, logos, and code — is the
              property of {BRAND.name} and is protected under applicable copyright and trademark
              laws. You may not reproduce, distribute, or create derivative works without express
              written permission.
            </p>
            <p>
              Upon full payment for a completed project, the client receives ownership of all
              custom deliverables as specified in the engagement agreement. We retain the right to
              reference the work in our portfolio unless the client requests otherwise in writing.
            </p>
          </section>

          <section aria-labelledby="disclaimer-heading">
            <h2 id="disclaimer-heading">Disclaimer of Warranties</h2>
            <p>
              This website is provided &ldquo;as is&rdquo; without warranties of any kind. We do not
              guarantee uninterrupted or error-free operation of the website.
            </p>
          </section>

          <section aria-labelledby="liability-heading">
            <h2 id="liability-heading">Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, {BRAND.name} shall not be liable for any
              indirect, incidental, or consequential damages arising from your use of this website
              or our services.
            </p>
          </section>

          <section aria-labelledby="law-heading">
            <h2 id="law-heading">Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with applicable law. Any
              disputes shall be resolved through good-faith negotiation before pursuing formal legal
              action.
            </p>
          </section>

          <section aria-labelledby="changes-heading">
            <h2 id="changes-heading">Changes to Terms</h2>
            <p>
              We reserve the right to update these Terms at any time. Continued use of the website
              after changes constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section aria-labelledby="contact-heading">
            <h2 id="contact-heading">Contact</h2>
            <p>
              Questions about these Terms? Contact us at{' '}
              <a href={`mailto:${BRAND.email.primary}`}>{BRAND.email.primary}</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
