import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import iconLogo  from '../assets/logo/icon_logo.png';
import whiteLogo from '../assets/logo/white_logo.png';
import './Preloader.css';

/*
  ╔══════════════════════════════════════════════════════════════╗
  ║  CINEMATIC PRELOADER — Apex Spider Innovation               ║
  ║  Award-worthy. Premium. Intentional.                        ║
  ╠══════════════════════════════════════════════════════════════╣
  ║  TIMELINE                                                   ║
  ║  0.00s  Background alive (#090B12 + drifting glows)         ║
  ║  0.30s  icon_logo materialises — centre screen              ║
  ║  0.85s  Energy line expands from centre                     ║
  ║  1.25s  Energy line fades                                   ║
  ║  1.40s  Glass panels begin diagonal split                   ║
  ║         Laser edge glows on the moving seam                 ║
  ║  2.05s  Panels fully off-screen                             ║
  ║  2.10s  icon_logo flies from centre → navbar slot           ║
  ║  2.45s  Logo lands, nav items stagger in                    ║
  ║  2.65s  Hero content stages in                              ║
  ╚══════════════════════════════════════════════════════════════╝
*/

// ── Easing ──────────────────────────────────────────────────
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];
const EASE_CINEMATIC = [0.76, 0, 0.24, 1];   // deep deceleration, premium feel

// ── Phase state machine ─────────────────────────────────────
const PHASE = {
  IDLE:        'idle',
  LOGO_IN:     'logo_in',
  ENERGY_LINE: 'energy_line',
  SPLIT:       'split',
  LOGO_TRAVEL: 'logo_travel',
  DONE:        'done',
};

export default function Preloader({ onComplete, onNavReady, onHeroReady, logoNavRef }) {
  const [phase,       setPhase]       = useState(PHASE.IDLE);
  const [linePhase,   setLinePhase]   = useState('hidden'); // hidden | expand | fade
  const [panelGone,   setPanelGone]   = useState(false);
  const [logoStyle,   setLogoStyle]   = useState(null);
  const [logoFlying,  setLogoFlying]  = useState(false);
  const [showSkip,    setShowSkip]    = useState(false);

  const centerLogoRef  = useRef(null);
  const prefersReduced = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // ── Skip ─────────────────────────────────────────────────
  const skipAll = useCallback(() => {
    setPhase(PHASE.DONE);
    setPanelGone(true);
    setLogoFlying(false);
    setLogoStyle(null);
    document.body.style.overflow = '';
    sessionStorage.setItem('preloader_done', '1');
    onComplete?.();
    onNavReady?.();
    setTimeout(() => onHeroReady?.(), 80);
  }, [onComplete, onNavReady, onHeroReady]);

  // ── Session guard & skip-button delay ────────────────────
  useEffect(() => {
    if (prefersReduced.current) { skipAll(); return; }
    if (sessionStorage.getItem('preloader_done')) { skipAll(); return; }

    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => setShowSkip(true), 1000);
    return () => clearTimeout(t);
  }, [skipAll]);

  // ── Main timeline ─────────────────────────────────────────
  useEffect(() => {
    if (prefersReduced.current) return;
    if (sessionStorage.getItem('preloader_done')) return;

    const timers = [];
    const at = (fn, ms) => timers.push(setTimeout(fn, ms));

    at(() => setPhase(PHASE.LOGO_IN), 300);

    at(() => {
      setPhase(PHASE.ENERGY_LINE);
      setLinePhase('expand');
    }, 850);

    at(() => setLinePhase('fade'), 1250);

    at(() => setPhase(PHASE.SPLIT), 1400);

    // Panels fully out — page visible
    at(() => {
      setPanelGone(true);
      document.body.style.overflow = '';
    }, 2050);

    // Measure + launch flying logo
    at(() => {
      const fromEl = centerLogoRef.current;
      const toEl   = logoNavRef?.current;

      if (!fromEl || !toEl) {
        onComplete?.();
        onNavReady?.();
        setTimeout(() => onHeroReady?.(), 80);
        return;
      }

      const fr = fromEl.getBoundingClientRect();
      const tr = toEl.getBoundingClientRect();

      setLogoStyle({
        x:      fr.left,
        y:      fr.top,
        size:   fr.height,
        toX:    tr.left,
        toY:    tr.top + (tr.height - 46) / 2,
        toSize: 46,
      });
      setLogoFlying(true);
      setPhase(PHASE.LOGO_TRAVEL);
    }, 2100);

    // Nav stagger starts
    at(() => {
      onComplete?.();
      onNavReady?.();
    }, 2450);

    // Hero reveals
    at(() => {
      onHeroReady?.();
      sessionStorage.setItem('preloader_done', '1');
    }, 2650);

    // Cleanup flying logo DOM node
    at(() => {
      setLogoFlying(false);
      setLogoStyle(null);
      setPhase(PHASE.DONE);
    }, 2800);

    return () => timers.forEach(clearTimeout);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const logoVisible =
    phase === PHASE.LOGO_IN ||
    phase === PHASE.ENERGY_LINE ||
    phase === PHASE.SPLIT;

  return (
    <>
      {/* ═══ GLASS PANELS + BACKGROUND ═══ */}
      {!panelGone && (
        <div className="pl-root" aria-hidden="true">

          {/* ── Live background ── */}
          <div className="pl-bg">
            <div className="pl-bg-glow pl-bg-glow--tr" />
            <div className="pl-bg-glow pl-bg-glow--bl" />
            <div className="pl-bg-glow pl-bg-glow--center" />
            <div className="pl-noise" />
            <div className="pl-vignette" />
          </div>

          {/* ── Glass panel: TOP-RIGHT half ── */}
          <motion.div
            className="pl-panel pl-panel--top"
            initial={false}
            animate={
              phase === PHASE.SPLIT
                ? {
                    x: '42vw',
                    y: '-42vh',
                    transition: { duration: 0.72, ease: EASE_CINEMATIC },
                  }
                : {}
            }
            onAnimationComplete={() => {
              if (phase === PHASE.SPLIT) setPanelGone(true);
            }}
          >
            {/* Laser edge — the diagonal seam that glows */}
            <div className="pl-laser" />
          </motion.div>

          {/* ── Glass panel: BOTTOM-LEFT half ── */}
          <motion.div
            className="pl-panel pl-panel--bottom"
            initial={false}
            animate={
              phase === PHASE.SPLIT
                ? {
                    x: '-42vw',
                    y: '42vh',
                    transition: { duration: 0.72, ease: EASE_CINEMATIC },
                  }
                : {}
            }
          >
            {/* Laser edge on the bottom panel */}
            <div className="pl-laser" />
          </motion.div>

          {/* ── Centre: logo + energy line ── */}
          <div className="pl-center">

            <motion.div
              className="pl-logo-wrap"
              ref={centerLogoRef}
              initial={{ opacity: 0, scale: 0.88, filter: 'blur(12px)' }}
              animate={
                logoVisible
                  ? {
                      opacity: 1,
                      scale:   1,
                      filter:  'blur(0px)',
                      transition: { duration: 0.55, ease: EASE_OUT_EXPO },
                    }
                  : {}
              }
            >
              {/* Outer ambient light */}
              <div className="pl-logo-ambient" />
              {/* Inner glow ring */}
              <div className="pl-logo-glow" />
              {/* The icon logo — white_logo variant so it pops on dark bg */}
              <img
                src={whiteLogo}
                alt="Apex Spider Innovation"
                className="pl-logo-img"
                draggable={false}
              />
            </motion.div>

            {/* Energy line */}
            <div className="pl-line-track">
              <motion.div
                className="pl-energy-line"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={
                  linePhase === 'expand'
                    ? {
                        scaleX: 1,
                        opacity: 1,
                        transition: { duration: 0.45, ease: EASE_OUT_EXPO },
                      }
                    : linePhase === 'fade'
                    ? {
                        opacity: 0,
                        transition: { duration: 0.3, ease: 'easeOut' },
                      }
                    : {}
                }
              />
            </div>

          </div>

          {/* ── Skip ── */}
          <motion.button
            className="pl-skip"
            initial={{ opacity: 0 }}
            animate={{ opacity: showSkip ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            onClick={skipAll}
            aria-label="Skip intro"
          >
            Skip intro
          </motion.button>

        </div>
      )}

      {/* ═══ FLYING LOGO — travels centre → navbar ═══ */}
      {logoFlying && logoStyle && (
        <FlyingLogo logoStyle={logoStyle} />
      )}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   FlyingLogo
   Fixed element that physically moves from the preloader
   centre position to the exact navbar logo slot.
   Uses icon_logo (same as navbar) so the swap is invisible.
───────────────────────────────────────────────────────────── */
function FlyingLogo({ logoStyle }) {
  const { x, y, size, toX, toY, toSize } = logoStyle;

  return (
    <motion.div
      className="pl-flying-logo"
      style={{ width: size, height: size }}
      initial={{ x, y }}
      animate={{
        x:      toX,
        y:      toY,
        width:  toSize,
        height: toSize,
      }}
      transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
    >
      <img
        src={iconLogo}
        alt=""
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        draggable={false}
      />
    </motion.div>
  );
}
