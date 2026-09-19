import React, { useState, useEffect, useCallback, useRef, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { NAV_LINKS, SERVICE_NAV_ITEMS, BRAND } from '../../constants/brand';
import { EASE } from '../../constants/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import logoImg from '../../assets/apexspiderinnovationlogobgremove.webp';
import './Header.css';

const Header = forwardRef(function Header({ navReady = false }, logoNavRef) {
  const [isScrolled, setIsScrolled]         = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate    = useNavigate();
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItemVariants = {
    hidden:  { opacity: 0, y: prefersReduced ? 0 : -12 },
    visible: (i) => ({
      opacity: 1, 
      y: 0,
      transition: { 
        duration: prefersReduced ? 0.01 : 0.5, 
        ease: EASE.premium, 
        delay: prefersReduced ? 0 : i * 0.08 
      },
    }),
  };

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`} role="banner">
      <div className="container header-container">

        {/* Logo */}
        <Link to="/" className="brand-logo" aria-label={`${BRAND.name} — Home`}>
          <motion.img
            ref={logoNavRef}
            src={logoImg}
            alt={BRAND.logo.alt}
            className="logo-img"
            width="50"
            height="40"
            initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.95 }}
            animate={{ opacity: navReady ? 1 : 0, scale: 1 }}
            transition={{ duration: prefersReduced ? 0.01 : 0.4, ease: 'easeOut', delay: prefersReduced ? 0 : 0.05 }}
          />
        </Link>

        {/* Desktop Nav — always visible on desktop */}
        <nav className="desktop-nav" aria-label="Main navigation">
          <ul className="nav-list" role="list">
            {NAV_LINKS.map((link, i) => (
              <motion.li
                key={link.name}
                custom={i}
                variants={navItemVariants}
                initial="hidden"
                animate={navReady ? 'visible' : 'hidden'}
                className={link.hasDropdown ? 'nav-item-dropdown' : ''}
                ref={link.hasDropdown ? dropdownRef : null}
              >
                {link.hasDropdown ? (
                  <button
                    className={`nav-link nav-link-btn ${isDropdownOpen ? 'active' : ''}`}
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                  >
                    {link.name}
                    <motion.svg 
                      className="dropdown-chevron" 
                      width="12" 
                      height="12" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      aria-hidden="true"
                      animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                      transition={{ duration: prefersReduced ? 0.01 : 0.25, ease: EASE.smooth }}
                    >
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  </button>
                ) : (
                  <NavLink
                    to={link.href}
                    className={({ isActive }) => `nav-link${isActive ? ' nav-link--active' : ''}`}
                  >
                    {link.name}
                  </NavLink>
                )}

                {/* Services Dropdown */}
                {link.hasDropdown && (
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        className="nav-dropdown"
                        initial={{ opacity: 0, y: prefersReduced ? 0 : -8, scale: prefersReduced ? 1 : 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: prefersReduced ? 0 : -8, scale: prefersReduced ? 1 : 0.98 }}
                        transition={{ duration: prefersReduced ? 0.01 : 0.25, ease: 'easeOut' }}
                      >
                        <div className="nav-dropdown-header">
                          <span className="nav-dropdown-label">Services</span>
                          <NavLink
                            to="/services"
                            className="nav-dropdown-all-link"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            All Services &rarr;
                          </NavLink>
                        </div>
                        <ul className="nav-dropdown-list" role="list">
                          {SERVICE_NAV_ITEMS.map((item, idx) => (
                            <motion.li 
                              key={item.name}
                              initial={{ opacity: 0, x: prefersReduced ? 0 : -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ 
                                duration: prefersReduced ? 0.01 : 0.25, 
                                delay: prefersReduced ? 0 : idx * 0.05,
                                ease: EASE.smooth 
                              }}
                            >
                              <NavLink
                                to={item.href}
                                className="nav-dropdown-item"
                                onClick={() => setIsDropdownOpen(false)}
                              >
                                <span className="dropdown-item-name">{item.name}</span>
                                <span className="dropdown-item-desc">{item.desc}</span>
                              </NavLink>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </motion.li>
            ))}
          </ul>
        </nav>


      </div>
    </header>
  );
});

export default Header;