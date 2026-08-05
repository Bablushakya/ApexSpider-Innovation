import React, { useState, useRef, useCallback } from 'react';
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

  /*
    logoNavRef is forwarded into <Header> so that the
    preloader can read the navbar logo's exact position
    (getBoundingClientRect) and fly toward it.
  */
  const logoNavRef = useRef(null);

  // Called when diagonal panels are fully gone → remove preloader from DOM
  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
  }, []);

  // Called when logo lands in navbar → fade in nav items
  const handleNavReady = useCallback(() => {
    setNavReady(true);
  }, []);

  // Called ~200ms after nav → start hero content staging
  const handleHeroReady = useCallback(() => {
    setHeroReady(true);
  }, []);

  return (
    <>
      {/* Cinematic preloader — unmounts itself after onComplete */}
      {showPreloader && (
        <Preloader
          onComplete={handlePreloaderComplete}
          onNavReady={handleNavReady}
          onHeroReady={handleHeroReady}
          logoNavRef={logoNavRef}
        />
      )}

      {/* Main site — always rendered (behind preloader panels) so
          getBoundingClientRect works for the logo morph */}
      <Header
        ref={logoNavRef}
        navReady={navReady}
      />

      <main>
        <Hero       heroReady={heroReady} />
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
