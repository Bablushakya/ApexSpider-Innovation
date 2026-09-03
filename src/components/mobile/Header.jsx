import React, { useState, useEffect, useCallback, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import { NAV_LINKS, BRAND } from '../../constants/brand';
import { EASE } from '../../constants/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import logoImg from '../../assets/ApexSpiderLogo.png';
import './Header.css';

const MobileHeader = forwardRef(function MobileHeader({ navReady = false }, logoNavRef) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <header className={`mobile-site-header ${isScrolled ? 'scrolled' : ''}`} role="banner">
      <div className="container mobile-header-container">
        
        <Link
          to="/"
          className="mobile-brand-logo"
          aria-label={`${BRAND.name} — Home`}
        >
          <motion.img
            ref={logoNavRef}
            src={logoImg}
            alt={BRAND.logo.alt}
            className="mobile-logo-img"
            width="36"
            height="36"
            initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.95 }}
            animate={{ opacity: navReady ? 1 : 0, scale: 1 }}
            transition={{ duration: prefersReduced ? 0.01 : 0.4, ease: 'easeOut', delay: prefersReduced ? 0 : 0.05 }}
          />
        </Link>

        <motion.div 
          className="mobile-header-actions"
          initial={{ opacity: 0, y: prefersReduced ? 0 : -12 }}
          animate={navReady ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReduced ? 0 : -12 }}
          transition={{ duration: prefersReduced ? 0.01 : 0.5, ease: EASE.premium, delay: prefersReduced ? 0 : 0.3 }}
        >
          <Link
            to="/contact"
            className="btn btn-primary mobile-header-start-project"
            aria-label="Start a project"
          >
            Start Project
          </Link>
          
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
        </motion.div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav"
            className="mobile-nav-overlay active"
            initial={{ opacity: 0, x: prefersReduced ? 0 : '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: prefersReduced ? 0 : '100%' }}
            transition={{ duration: prefersReduced ? 0.01 : 0.35, ease: EASE.premium }}
          >
            <nav className="mobile-nav" aria-label="Mobile navigation">
              <ul className="mobile-nav-list" role="list">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: prefersReduced ? 0 : i * 0.06, 
                      duration: prefersReduced ? 0.01 : 0.4, 
                      ease: EASE.premium 
                    }}
                  >
                    <NavLink
                      to={link.href}
                      className={({ isActive }) =>
                        `mobile-nav-link${isActive ? ' mobile-nav-link--active' : ''}`
                      }
                      onClick={closeMobileMenu}
                    >
                      {link.name}
                    </NavLink>
                  </motion.li>
                ))}

                <motion.li
                  initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: prefersReduced ? 0 : NAV_LINKS.length * 0.06, 
                    duration: prefersReduced ? 0.01 : 0.4, 
                    ease: EASE.premium 
                  }}
                  className="mobile-nav-cta"
                >
                  <Link
                    to="/contact"
                    className="btn btn-primary mobile-start-project"
                    onClick={closeMobileMenu}
                  >
                    Start a Project
                  </Link>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
});

export default MobileHeader;