import React, { useState, useEffect, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BRAND } from '../../constants/brand';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import logoImg from '../../assets/apexspiderinnovationlogobgremove.webp';
import './Header.css';

const MobileHeader = forwardRef(function MobileHeader({ navReady = false }, logoNavRef) {
  const [isScrolled, setIsScrolled] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
            width="44"
            height="36"
            initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.95 }}
            animate={{ opacity: navReady ? 1 : 0, scale: 1 }}
            transition={{ duration: prefersReduced ? 0.01 : 0.4, ease: 'easeOut', delay: prefersReduced ? 0 : 0.05 }}
          />
        </Link>
      </div>
    </header>
  );
});

export default MobileHeader;