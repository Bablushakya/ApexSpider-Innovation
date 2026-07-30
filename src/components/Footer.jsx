import React from 'react';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: 'Services', href: '#services' },
    { name: 'Value', href: '#value-props' },
    { name: 'Process', href: '#process' },
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'FAQs', href: '#faq' }
  ];

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        
        {/* Logo and Brand column */}
        <div className="footer-brand-column">
          <a href="#" className="footer-logo" aria-label="ApexSpider Home">
            <svg className="footer-logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" fill="currentColor" />
              <path d="M12 2v20M2 12h20M12 2l7 7M12 2L5 9M12 22l7-7M12 22l-7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="brand-name">ApexSpider<span className="brand-dot">.</span></span>
          </a>
          <p className="footer-tagline">Architecting premium custom web applications and scalable enterprise software solutions.</p>
        </div>

        {/* Navigation column */}
        <div className="footer-links-column">
          <h4 className="footer-col-title">Navigation</h4>
          <ul className="footer-list">
            {links.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="footer-link">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact column */}
        <div className="footer-contact-column">
          <h4 className="footer-col-title">Contact Inquiry</h4>
          <p className="footer-contact-desc">Let's discuss custom specifications for your next sprint.</p>
          <a href="mailto:info@apexspiderinnovation.com" className="footer-email-link">
            info@apexspiderinnovation.com
          </a>
          <span className="footer-email-sub">Alternative: apexspiderinnovation@gmail.com</span>
        </div>

      </div>

      {/* Bottom Legal bar */}
      <div className="footer-bottom">
        <div className="container bottom-container">
          <p className="footer-copyright">
            &copy; {currentYear} ApexSpider Innovation. All rights reserved.
          </p>
          
          <div className="footer-legal-links">
            <a href="#" className="legal-link">Privacy Policy</a>
            <a href="#" className="legal-link">Terms of Service</a>
            <a href="#" className="legal-link">Security Code</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
