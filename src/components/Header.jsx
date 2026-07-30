import React, { useState, useEffect } from 'react';
import './Header.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Value', href: '#value-props' },
    { name: 'Process', href: '#process' },
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'FAQs', href: '#faq' }
  ];

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        {/* Brand Logo */}
        <a href="#" className="brand-logo" aria-label="ApexSpider Home">
          <svg className="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" fill="currentColor" />
            <path d="M12 2v20M2 12h20M12 2l7 7M12 2L5 9M12 22l7-7M12 22l-7-7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 3l18 18M3 21L21 3" strokeOpacity="0.4" />
          </svg>
          <span className="brand-name">ApexSpider<span className="brand-dot">.</span></span>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="nav-link">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Button */}
        <div className="header-actions">
          <a href="#contact" className="btn btn-primary btn-header">
            Start Project
          </a>
          
          {/* Mobile Menu Toggle Button */}
          <button 
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'active' : ''}`}>
        <nav className="mobile-nav" aria-label="Mobile Navigation">
          <ul className="mobile-nav-list">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className="mobile-nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <a 
                href="#contact" 
                className="btn btn-primary mobile-cta"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Start Project
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
