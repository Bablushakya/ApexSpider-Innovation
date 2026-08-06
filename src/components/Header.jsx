import React, { useState, useEffect, useCallback, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, BRAND } from '../constants/brand';
import logoImg from '../assets/ApexSpiderLogo.png';
import './Header.css';

/*
  Header accepts two props from App:
  - navReady: boolean — when true, stagger-animate nav items in
  - logoNavRef: forwarded ref — preloader reads this to fly the logo here
*/
const Header = forwardRef(function Header({ navReady = false }, logoNavRef) {
  const [isScrolled, setIsScrolled]             = useState(false);
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

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  // Nav item entrance: opacity + y slide
  const navItemVariants = {
    hidden:  { opacity: 0, y: -12 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: premiumEase, delay: i * 0.08 },
    }),
  };

  // CTA button entrance (appears after last nav item)
  const ctaVariants = {
    hidden:  { opacity: 0, y: -12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: premiumEase, delay: NAV_LINKS.length * 0.08 },
    },
  };

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
  // const ctaVariants = {
  //   hidden:  { opacity: 0, y: -12 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       duration: 0.5,
  //       ease: premiumEase,
  //       delay: navLinks.length * 0.08,
  //     },
  //   },
  // };

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`} role="banner">
      <div className="container header-container">

        {/* ── Brand Logo — links to #hero (home anchor) ── */}
        <a href="#hero" className="brand-logo" aria-label={`${BRAND.name} — return to top`}>
          <motion.img
            ref={logoNavRef}
            src={logoImg}
            alt={BRAND.logo.alt}
            className="logo-img"
            width="46"
            height="46"
            initial={{ opacity: 0 }}
            animate={{ opacity: navReady ? 1 : 0 }}
            transition={{ duration: 0.18, ease: 'easeOut', delay: 0.05 }}
          />
        </a>

        {/* ── Desktop Navigation ── */}
        <nav className="desktop-nav" aria-label="Main navigation">
          <ul className="nav-list" role="list">
            {NAV_LINKS.map((link, i) => (
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
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
          >
            <span className="hamburger-bar" aria-hidden="true" />
            <span className="hamburger-bar" aria-hidden="true" />
            <span className="hamburger-bar" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* ── Mobile Navigation Drawer ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav"
            className="mobile-nav-overlay active"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: premiumEase }}
            aria-modal="false"
          >
            <nav className="mobile-nav" aria-label="Mobile navigation">
              <ul className="mobile-nav-list" role="list">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4, ease: premiumEase }}
                  >
                    <a
                      href={link.href}
                      className="mobile-nav-link"
                      onClick={closeMobileMenu}
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.06, duration: 0.4, ease: premiumEase }}
                >
                  <a
                    href="#contact"
                    className="btn btn-primary mobile-cta"
                    onClick={closeMobileMenu}
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
