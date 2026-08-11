import React, { useState, useRef, useCallback, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header    from './components/Header';
import Hero      from './components/Hero';
import Services  from './components/Services';
import ValueProps  from './components/ValueProps';
import Process   from './components/Process';
import CaseStudy from './components/CaseStudy';
import About     from './components/About';
import Testimonials from './components/Testimonials';
import FAQ       from './components/FAQ';
import ContactCTA  from './components/ContactCTA';
import Footer    from './components/Footer';
import Preloader from './components/Preloader';
import ProjectInquiryModal from './components/ProjectInquiryModal';

// Lazy-load legal and utility pages — they are never in the initial bundle
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms         = lazy(() => import('./pages/Terms'));
const Security      = lazy(() => import('./pages/Security'));
const NotFound      = lazy(() => import('./pages/NotFound'));

/** Full one-page marketing site */
function HomePage({ logoNavRef, navReady, heroReady, onOpenInquiry }) {
  return (
    <>
      <Header ref={logoNavRef} navReady={navReady} />
      <main id="main-content">
        <Hero       heroReady={heroReady} onOpenInquiry={onOpenInquiry} />
        <Services   />
        <ValueProps />
        <Process    />
        <CaseStudy  />
        <About      />
        <Testimonials />
        <FAQ        />
        <ContactCTA />
      </main>
      <Footer />
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
  /*
    Three-stage gate:
    ─────────────────────────────────────────────────────
    showPreloader  — controls whether <Preloader> is mounted
    navReady       — passed to Header; triggers nav stagger
    heroReady      — passed to Hero;   triggers content reveal
    ─────────────────────────────────────────────────────
  */
  const [showPreloader, setShowPreloader] = useState(true);
  const [navReady,      setNavReady]      = useState(false);
  const [heroReady,     setHeroReady]     = useState(false);
  
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

      {/* Project Inquiry Modal */}
      <ProjectInquiryModal 
        isOpen={isInquiryOpen} 
        onClose={closeInquiryModal} 
      />

      <Routes>
        {/* ── Home page with cinematic preloader ── */}
        <Route
          path="/"
          element={
            <>
              {showPreloader && (
                <Preloader
                  onComplete={handlePreloaderComplete}
                  onNavReady={handleNavReady}
                  onHeroReady={handleHeroReady}
                  logoNavRef={logoNavRef}
                />
              )}
              <HomePage
                logoNavRef={logoNavRef}
                navReady={navReady}
                heroReady={heroReady}
                onOpenInquiry={openInquiryModal}
              />
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
