import React from 'react';
import './Footer.css';
import logoImg from '../assets/logo/full_logo.png';

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
          <a href="#" className="footer-logo" aria-label="Apex Spider Innovation Home">
            <img src={logoImg} alt="Apex Spider Innovation Logo" className="footer-logo-img" />
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
