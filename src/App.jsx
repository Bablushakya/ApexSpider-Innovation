import React, { useState, useRef, useCallback, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useIsMobile } from './hooks/useIsMobile';
import ScrollToTop from './components/layout/ScrollToTop';

// Desktop Components (Home page) — Header + Hero stay eager (above-fold critical path)
import DesktopHeader from './components/desktop/Header';
import DesktopHero from './components/desktop/Hero';
import DesktopFooter from './components/desktop/Footer';
import Preloader from './components/desktop/Preloader';

// Desktop below-fold sections — lazy loaded (never in initial viewport)
const DesktopServices     = lazy(() => import('./components/desktop/Services'));
const DesktopValueProps   = lazy(() => import('./components/desktop/ValueProps'));
const DesktopProcess      = lazy(() => import('./components/desktop/Process'));
const DesktopCaseStudy    = lazy(() => import('./components/desktop/CaseStudy'));
const DesktopAbout        = lazy(() => import('./components/desktop/About'));
const DesktopTestimonials = lazy(() => import('./components/desktop/Testimonials'));
const DesktopFAQ          = lazy(() => import('./components/desktop/FAQ'));
const DesktopContactCTA   = lazy(() => import('./components/desktop/ContactCTA'));

// Mobile Components (Home page) — Header + Hero stay eager
import MobileHeader from './components/mobile/Header';
import MobileHero from './components/mobile/Hero';
import MobileFooter from './components/mobile/Footer';
import MobileBottomNav from './components/mobile/BottomNav';

// Mobile below-fold sections — lazy loaded
const MobileServices     = lazy(() => import('./components/mobile/Services'));
const MobileValueProps   = lazy(() => import('./components/mobile/ValueProps'));
const MobileProcess      = lazy(() => import('./components/mobile/Process'));
const MobileCaseStudy    = lazy(() => import('./components/mobile/CaseStudy'));
const MobileAbout        = lazy(() => import('./components/mobile/About'));
const MobileTestimonials = lazy(() => import('./components/mobile/Testimonials'));
const MobileFAQ          = lazy(() => import('./components/mobile/FAQ'));
const MobileContactCTA   = lazy(() => import('./components/mobile/ContactCTA'));

// Multi-page pages — lazy loaded so they don't inflate the home bundle
const AboutPage        = lazy(() => import('./pages/AboutPage'));
const ServicesPage     = lazy(() => import('./pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const PortfolioPage    = lazy(() => import('./pages/PortfolioPage'));
const CaseStudyPage    = lazy(() => import('./pages/CaseStudyPage'));
const ContactPage      = lazy(() => import('./pages/ContactPage'));

// Legal / utility pages — lazy loaded
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms         = lazy(() => import('./pages/Terms'));
const Security      = lazy(() => import('./pages/Security'));
const NotFound      = lazy(() => import('./pages/NotFound'));

/** Page-level loading fallback with spinner animation */
function PageLoader() {
  return (
    <div
      role="status"
      aria-label="Loading page"
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        background: 'hsl(224, 40%, 7%)',
        color: 'hsl(210, 40%, 98%)',
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.95rem',
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          border: '3px solid rgba(255, 255, 255, 0.1)',
          borderTop: '3px solid hsl(180, 100%, 50%)',
          borderRadius: '50%',
          animation: 'pageLoaderSpin 0.8s linear infinite',
        }}
      />
      <style>{`
        @keyframes pageLoaderSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <span>Loading…</span>
    </div>
  );
}

/** Full one-page home — Desktop */
function DesktopHomePage({ logoNavRef, navReady, heroReady }) {
  return (
    <>
      <DesktopHeader ref={logoNavRef} navReady={navReady} />
      <main id="main-content">
        <DesktopHero heroReady={heroReady} />
        <Suspense fallback={null}>
          <DesktopServices />
          <DesktopValueProps />
          <DesktopProcess />
          <DesktopCaseStudy />
          <DesktopAbout />
          <DesktopTestimonials />
          <DesktopFAQ />
          <DesktopContactCTA />
        </Suspense>
      </main>
      <DesktopFooter />
    </>
  );
}

/** Full one-page home — Mobile */
function MobileHomePage({ logoNavRef, navReady, heroReady }) {
  return (
    <>
      <MobileHeader ref={logoNavRef} navReady={navReady} />
      <main id="main-content">
        <MobileHero heroReady={heroReady} />
        <Suspense fallback={null}>
          <MobileServices />
          <MobileValueProps />
          <MobileProcess />
          <MobileCaseStudy />
          <MobileAbout />
          <MobileTestimonials />
          <MobileFAQ />
          <MobileContactCTA />
        </Suspense>
      </main>
      <MobileFooter />
    </>
  );
}

export default function App() {
  const isMobile = useIsMobile();
  const location = useLocation();

  const [showPreloader, setShowPreloader] = useState(!isMobile);
  const [navReady,      setNavReady]      = useState(isMobile);
  const [heroReady,     setHeroReady]     = useState(isMobile);

  const logoNavRef = useRef(null);

  const handlePreloaderComplete = useCallback(() => setShowPreloader(false), []);
  const handleNavReady          = useCallback(() => setNavReady(true),       []);
  const handleHeroReady         = useCallback(() => setHeroReady(true),      []);

  return (
    <>
      {/* Skip-to-content link for keyboard / screen-reader users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Scroll to top on every route change */}
      <ScrollToTop />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* ── Home — one-page experience preserved ── */}
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
                  />
                ) : (
                  <DesktopHomePage
                    logoNavRef={logoNavRef}
                    navReady={navReady}
                    heroReady={heroReady}
                  />
                )}
              </>
            }
          />

          {/* ── New multi-page routes ── */}
          <Route
            path="/about"
            element={
              <Suspense fallback={<PageLoader />}>
                <AboutPage />
              </Suspense>
            }
          />
          <Route
            path="/services"
            element={
              <Suspense fallback={<PageLoader />}>
                <ServicesPage />
              </Suspense>
            }
          />
          <Route
            path="/services/:slug"
            element={
              <Suspense fallback={<PageLoader />}>
                <ServiceDetailPage />
              </Suspense>
            }
          />
          <Route
            path="/portfolio"
            element={
              <Suspense fallback={<PageLoader />}>
                <PortfolioPage />
              </Suspense>
            }
          />
          <Route
            path="/portfolio/:slug"
            element={
              <Suspense fallback={<PageLoader />}>
                <CaseStudyPage />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<PageLoader />}>
                <ContactPage />
              </Suspense>
            }
          />

          {/* ── Legal pages ── */}
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

          {/* ── 404 ── */}
          <Route
            path="*"
            element={
              <Suspense fallback={<PageLoader />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </AnimatePresence>

      {/* Mobile Bottom Navigation - Only visible on mobile */}
      {isMobile && <MobileBottomNav />}
    </>
  );
}
