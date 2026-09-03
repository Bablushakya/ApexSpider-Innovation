import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASE } from '../../constants/animations';
import DesktopHeader from '../desktop/Header';
import DesktopFooter from '../desktop/Footer';
import MobileHeader from '../mobile/Header';
import MobileFooter from '../mobile/Footer';

/**
 * PageLayout — Wraps Header + Main Content + Footer for multi-page architecture.
 * Automatically serves Mobile or Desktop view based on viewport size.
 * Includes smooth page transition animations.
 */
export default function PageLayout({ children }) {
  const isMobile = useIsMobile();
  const prefersReduced = useReducedMotion();
  const location = useLocation();

  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: prefersReduced ? 0 : 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0.01 : 0.5,
        ease: EASE.smooth,
      },
    },
    exit: {
      opacity: 0,
      y: prefersReduced ? 0 : -10,
      transition: {
        duration: prefersReduced ? 0.01 : 0.3,
        ease: EASE.smooth,
      },
    },
  };

  return (
    <>
      {isMobile ? (
        <MobileHeader navReady={true} />
      ) : (
        <DesktopHeader navReady={true} />
      )}

      <motion.main
        id="main-content"
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        style={{
          minHeight: '80vh',
          paddingTop: isMobile ? '64px' : '90px',
        }}
      >
        {children}
      </motion.main>

      {isMobile ? <MobileFooter /> : <DesktopFooter />}
    </>
  );
}
