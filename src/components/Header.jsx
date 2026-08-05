import React, { useState, useEffect, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Header.css';
import logoImg from '../assets/logo/icon_logo.png';

/*
  Header accepts two props from App:
  - navReady: boolean — when true, stagger-animate nav items in
  - logoNavRef: forwarded ref — preloader reads this to fly the logo here
*/
const Header = forwardRef(function Header({ navReady = false }, logoNavRef) {
  const [isScrolled, setIsScrolled]         = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const premiumEase = [0.16, 1, 0.3, 1];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Services', href: '#services'    },
    { name: 'Value',    href: '#value-props' },
    { name: 'Process',  href: '#process'     },
    { name: 'Work',     href: '#work'        },
    { name: 'About',    href: '#about'       },
    { name: 'FAQs',     href: '#faq'         },
  ];

  // Nav item entrance: opacity + y slide
  const navItemVariants = {
    hidden:  { opacity: 0, y: -12 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: premiumEase,
        delay: i * 0.08,
      },
    }),
  };

  // CTA button entrance (appears after last nav item)
  const ctaVariants = {
    hidden:  { opacity: 0, y: -12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: premiumEase,
        delay: navLinks.length * 0.08,
      },
    },
  };

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">

        {/* ── Brand Logo ── */}
        {/* logoNavRef lets the preloader measure where to fly the logo */}
        <a href="#" className="brand-logo" aria-label="Apex Spider Innovation Home">
          <motion.img
            ref={logoNavRef}
            src={logoImg}
            alt="Apex Spider Innovation Logo"
            className="logo-img"
            /* Logo starts invisible — preloader's flying logo "lands" here,
               then this fades in seamlessly at the end of the flight */
            initial={{ opacity: 0 }}
            animate={{ opacity: navReady ? 1 : 0 }}
            transition={{ duration: 0.18, ease: 'easeOut', delay: 0.05 }}
          />
        </a>

        {/* ── Desktop Navigation ── */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {navLinks.map((link, i) => (
              <motion.li
                key={link.name}
                custom={i}
                variants={navItemVariants}
                initial="hidden"
                animate={navReady ? 'visible' : 'hidden'}
              >
                <a href={link.href} className="nav-link">
                  {link.name}
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* ── Action Button ── */}
        <div className="header-actions">
          <motion.a
            href="#contact"
            className="btn btn-primary btn-header"
            variants={ctaVariants}
            initial="hidden"
            animate={navReady ? 'visible' : 'hidden'}
          >
            Start Project
          </motion.a>

          {/* Mobile Menu Toggle */}
          <button
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
          </button>
        </div>
      </div>

      {/* ── Mobile Navigation Drawer ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-nav-overlay active"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: premiumEase }}
          >
            <nav className="mobile-nav" aria-label="Mobile Navigation">
              <ul className="mobile-nav-list">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4, ease: premiumEase }}
                  >
                    <a
                      href={link.href}
                      className="mobile-nav-link"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.06, duration: 0.4, ease: premiumEase }}
                >
                  <a
                    href="#contact"
                    className="btn btn-primary mobile-cta"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Start Project
                  </a>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
});

export default Header;
