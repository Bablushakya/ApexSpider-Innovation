import React, { useState, useRef, useCallback, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useIsMobile } from './hooks/useIsMobile';

// Desktop Components
import DesktopHeader from './components/desktop/Header';
import DesktopHero from './components/desktop/Hero';
import DesktopServices from './components/desktop/Services';
import DesktopValueProps from './components/desktop/ValueProps';
import DesktopProcess from './components/desktop/Process';
import DesktopCaseStudy from './components/desktop/CaseStudy';
import DesktopAbout from './components/desktop/About';
import DesktopTestimonials from './components/desktop/Testimonials';
import DesktopFAQ from './components/desktop/FAQ';
import DesktopContactCTA from './components/desktop/ContactCTA';
import DesktopFooter from './components/desktop/Footer';
import Preloader from './components/desktop/Preloader';
import ProjectInquiryModal from './components/desktop/ProjectInquiryModal';

// Mobile Components
import MobileHeader from './components/mobile/Header';
import MobileHero from './components/mobile/Hero';
import MobileServices from './components/mobile/Services';
import MobileValueProps from './components/mobile/ValueProps';
import MobileProcess from './components/mobile/Process';
import MobileCaseStudy from './components/mobile/CaseStudy';
import MobileAbout from './components/mobile/About';
import MobileTestimonials from './components/mobile/Testimonials';
import MobileFAQ from './components/mobile/FAQ';
import MobileContactCTA from './components/mobile/ContactCTA';
import MobileFooter from './components/mobile/Footer';

// Lazy-load legal and utility pages — they are never in the initial bundle
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms         = lazy(() => import('./pages/Terms'));
const Security      = lazy(() => import('./pages/Security'));
const NotFound      = lazy(() => import('./pages/NotFound'));

/** Full one-page marketing site - Desktop Version */
function DesktopHomePage({ logoNavRef, navReady, heroReady, onOpenInquiry }) {
  return (
    <>
      <DesktopHeader ref={logoNavRef} navReady={navReady} onOpenInquiry={onOpenInquiry} />
      <main id="main-content">
        <DesktopHero heroReady={heroReady} />
        <DesktopServices />
        <DesktopValueProps />
        <DesktopProcess />
        <DesktopCaseStudy />
        <DesktopAbout />
        <DesktopTestimonials />
        <DesktopFAQ />
        <DesktopContactCTA />
      </main>
      <DesktopFooter />
    </>
  );
}

/** Full one-page marketing site - Mobile Version */
function MobileHomePage({ logoNavRef, navReady, heroReady, onOpenInquiry }) {
  return (
    <>
      <MobileHeader ref={logoNavRef} navReady={navReady} onOpenInquiry={onOpenInquiry} />
      <main id="main-content">
        <MobileHero heroReady={heroReady} />
        <MobileServices />
        <MobileValueProps />
        <MobileProcess />
        <MobileCaseStudy />
        <MobileAbout />
        <MobileTestimonials />
        <MobileFAQ />
        <MobileContactCTA />
      </main>
      <MobileFooter />
    </>
  );
}

/** Page-level loading fallback */
function PageLoader() {
  return (
    <div
      role="status"
      aria-label="Loading page"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'hsl(224, 40%, 7%)',
        color: 'hsl(210, 40%, 98%)',
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.95rem',
      }}
    >
      Loading…
    </div>
  );
}

export default function App() {
  // Detect mobile device
  const isMobile = useIsMobile();

  /*
    Three-stage gate:
    ─────────────────────────────────────────────────────
    showPreloader  — controls whether <Preloader> is mounted
    navReady       — passed to Header; triggers nav stagger
    heroReady      — passed to Hero;   triggers content reveal
    ─────────────────────────────────────────────────────
    Note: Preloader only shown on desktop for cinematic effect
  */
  const [showPreloader, setShowPreloader] = useState(!isMobile);
  const [navReady,      setNavReady]      = useState(isMobile); // Mobile starts ready
  const [heroReady,     setHeroReady]     = useState(isMobile); // Mobile starts ready
  
  // Project Inquiry Modal state
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  /*
    logoNavRef is forwarded into <Header> so that the
    preloader can read the navbar logo's exact position
    (getBoundingClientRect) and fly toward it.
  */
  const logoNavRef = useRef(null);

  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
  }, []);

  const handleNavReady = useCallback(() => {
    setNavReady(true);
  }, []);

  const handleHeroReady = useCallback(() => {
    setHeroReady(true);
  }, []);

  const openInquiryModal = useCallback(() => {
    setIsInquiryOpen(true);
  }, []);

  const closeInquiryModal = useCallback(() => {
    setIsInquiryOpen(false);
  }, []);

  return (
    <>
      {/* Skip-to-content link for keyboard / screen-reader users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Project Inquiry Modal - Desktop only */}
      {!isMobile && (
        <ProjectInquiryModal 
          isOpen={isInquiryOpen} 
          onClose={closeInquiryModal} 
        />
      )}

      <Routes>
        {/* ── Home page with conditional desktop/mobile rendering ── */}
        <Route
          path="/"
          element={
            <>
              {showPreloader && !isMobile && (
                <Preloader
                  onComplete={handlePreloaderComplete}
                  onNavReady={handleNavReady}
                  onHeroReady={handleHeroReady}
                  logoNavRef={logoNavRef}
                />
              )}
              {isMobile ? (
                <MobileHomePage
                  logoNavRef={logoNavRef}
                  navReady={navReady}
                  heroReady={heroReady}
                  onOpenInquiry={openInquiryModal}
                />
              ) : (
                <DesktopHomePage
                  logoNavRef={logoNavRef}
                  navReady={navReady}
                  heroReady={heroReady}
                  onOpenInquiry={openInquiryModal}
                />
              )}
            </>
          }
        />

        {/* ── Legal pages — lazy loaded ── */}
        <Route
          path="/privacy"
          element={
            <Suspense fallback={<PageLoader />}>
              <PrivacyPolicy />
            </Suspense>
          }
        />
        <Route
          path="/terms"
          element={
            <Suspense fallback={<PageLoader />}>
              <Terms />
            </Suspense>
          }
        />
        <Route
          path="/security"
          element={
            <Suspense fallback={<PageLoader />}>
              <Security />
            </Suspense>
          }
        />

        {/* ── 404 catch-all ── */}
        <Route
          path="*"
          element={
            <Suspense fallback={<PageLoader />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}
