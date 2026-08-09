import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND, FOOTER_NAV_LINKS, LEGAL_LINKS } from '../constants/brand';
import logoImg from '../assets/ApexSpiderLogo.png';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-container">

        {/* Logo and Brand column */}
        <div className="footer-brand-column">
          <a href="#hero" className="footer-logo" aria-label={`${BRAND.name} — return to top`}>
            <img
              src={logoImg}
              alt={BRAND.logo.alt}
              className="footer-logo-img"
              width="140"
              height="42"
            />
          </a>
          <p className="footer-tagline">{BRAND.tagline}</p>
        </div>

        {/* Navigation column */}
        <nav className="footer-links-column" aria-label="Footer navigation">
          <h2 className="footer-col-title">Navigation</h2>
          <ul className="footer-list" role="list">
            {FOOTER_NAV_LINKS.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="footer-link">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact column */}
        <div className="footer-contact-column">
          <h2 className="footer-col-title">Contact</h2>
          <p className="footer-contact-desc">
            Let&rsquo;s discuss custom specifications for your next sprint.
          </p>
          <a href={`mailto:${BRAND.email.primary}`} className="footer-email-link">
            {BRAND.email.primary}
          </a>
        </div>

      </div>

      {/* Bottom Legal bar */}
      <div className="footer-bottom">
        <div className="container bottom-container">
          <p className="footer-copyright">
            &copy; {currentYear} {BRAND.name}. All rights reserved.
          </p>

          <nav className="footer-legal-links" aria-label="Legal links">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.name} to={link.href} className="legal-link">
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
