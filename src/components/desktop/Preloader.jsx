import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { EASE } from '../../constants/animations';
import logoImg from '../../assets/ApexSPiderInnovationLogoBGRemove.png';
import './Preloader.css';

/*
  CINEMATIC PRELOADER — Timeline:
  ──────────────────────────────────────────────────────
  0.00s  Dark screen visible
  0.30s  Logo fades in (center, scale 0.92 → 1, blur 10px → 0)
  0.80s  Energy line expands from center beneath logo
  1.20s  Energy line fades out
  1.30s  Diagonal split begins (clip-path panels slide apart)
  1.80s  Panels fully gone — homepage revealed
  1.85s  Logo starts travel from center → navbar position
  2.20s  Logo lands in navbar, nav items stagger in
  2.40s  Hero content stages in
  ──────────────────────────────────────────────────────
*/

// Animation easing values imported from constants/animations.js

// ── Animation phases ──
const PHASE = {
  IDLE:        'idle',
  LOGO_IN:     'logo_in',
  ENERGY_LINE: 'energy_line',
  SPLIT:       'split',
  LOGO_TRAVEL: 'logo_travel',
  DONE:        'done',
};

export default function Preloader({ onComplete, onNavReady, onHeroReady, logoNavRef }) {
  const [phase, setPhase]             = useState(PHASE.IDLE);
  const [linePhase, setLinePhase]     = useState('hidden'); // hidden | expand | fade
  const [panelGone, setPanelGone]     = useState(false);

  // Flying logo state: position + size
  const [logoStyle, setLogoStyle]     = useState(null);  // null = not flying yet
  const [logoFlying, setLogoFlying]   = useState(false);

  // Ref for the centered logo (used to measure start position)
  const centerLogoRef = useRef(null);
  // Ref to skip on reduced motion
  const prefersReduced = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // Store callbacks as refs so the timeline effect can use them
  // without them being listed as reactive dependencies
  const onCompleteRef  = useRef(onComplete);
  const onNavReadyRef  = useRef(onNavReady);
  const onHeroReadyRef = useRef(onHeroReady);
  useEffect(() => { onCompleteRef.current  = onComplete;  }, [onComplete]);
  useEffect(() => { onNavReadyRef.current  = onNavReady;  }, [onNavReady]);
  useEffect(() => { onHeroReadyRef.current = onHeroReady; }, [onHeroReady]);

  // ── Skip handler ──
  const skipAll = useCallback(() => {
    setPhase(PHASE.DONE);
    setPanelGone(true);
    setLogoFlying(false);
    setLogoStyle(null);
    document.body.style.overflow = '';
    onCompleteRef.current?.();
    onNavReadyRef.current?.();
    setTimeout(() => onHeroReadyRef.current?.(), 80);
  }, []);

  // ── Skip button visibility ──
  const [showSkip, setShowSkip] = useState(false);

  // ── sessionStorage guard — skip on repeat visits ──
  useEffect(() => {
    if (prefersReduced.current) { skipAll(); return; }
    const done = sessionStorage.getItem('preloader_done');
    if (done) { skipAll(); return; }

    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => setShowSkip(true), 1000);
    return () => clearTimeout(t);
  }, [skipAll]);

  // ── Main timeline orchestration ──
  useEffect(() => {
    if (prefersReduced.current) return;
    const done = sessionStorage.getItem('preloader_done');
    if (done) return;

    let timers = [];
    const add = (fn, delay) => { timers.push(setTimeout(fn, delay)); };

    // Phase 1 — Logo entrance
    add(() => setPhase(PHASE.LOGO_IN), 300);

    // Phase 2 — Energy line
    add(() => {
      setPhase(PHASE.ENERGY_LINE);
      setLinePhase('expand');
    }, 800);

    // Energy line fades after expanding
    add(() => setLinePhase('fade'), 1200);

    // Phase 3 — Diagonal split
    add(() => setPhase(PHASE.SPLIT), 1350);

    // Panels fully off screen → reveal page
    add(() => {
      setPanelGone(true);
      document.body.style.overflow = '';
    }, 1900);

    // Phase 4 — Logo flight from center to navbar
    add(() => {
      const centerEl = centerLogoRef.current;
      const navEl    = logoNavRef?.current;
      if (!centerEl || !navEl) {
        // Fallback — just finish
        onCompleteRef.current?.();
        onNavReadyRef.current?.();
        setTimeout(() => onHeroReadyRef.current?.(), 80);
        return;
      }

      const fromRect = centerEl.getBoundingClientRect();
      const toRect   = navEl.getBoundingClientRect();

      // Snapshot starting position (fixed coords)
      setLogoStyle({
        x:        fromRect.left,
        y:        fromRect.top,
        width:    fromRect.width,
        height:   fromRect.height,
        size:     fromRect.height,
        toX:      toRect.left,
        toY:      toRect.top,
        toWidth:  toRect.width,
        toHeight: toRect.height,
        toSize:   toRect.height,
      });
      setLogoFlying(true);
      setPhase(PHASE.LOGO_TRAVEL);
    }, 1950);

    // Nav items appear
    add(() => {
      onCompleteRef.current?.();   // hides the preloader overlay
      onNavReadyRef.current?.();   // triggers nav stagger
    }, 2300);

    // Hero content starts revealing
    add(() => {
      onHeroReadyRef.current?.();
      sessionStorage.setItem('preloader_done', '1');
    }, 2500);

    // Flying logo cleans itself up
    add(() => {
      setLogoFlying(false);
      setLogoStyle(null);
      setPhase(PHASE.DONE);
    }, 2600);

    return () => timers.forEach(clearTimeout);
  }, [logoNavRef]); // logoNavRef is a stable ref object — listed to satisfy exhaustive-deps

  // ── Don't render overlay once fully done ──
  const logoVisible = phase === PHASE.LOGO_IN ||
                      phase === PHASE.ENERGY_LINE ||
                      phase === PHASE.SPLIT;

  return (
    <>
      {/* ──────── OVERLAY PANELS (diagonal split) ──────── */}
      {!panelGone && (
        <div className="pl-root" aria-hidden="true" role="presentation">
          {/* Ambient background — alive but not distracting */}
          <div className="pl-bg">
            <div className="pl-bg-glow pl-bg-glow--a" />
            <div className="pl-bg-glow pl-bg-glow--b" />
            <div className="pl-bg-glow pl-bg-glow--c" />
            <div className="pl-noise" />
            <div className="pl-vignette" />
          </div>

          {/* ── TOP-RIGHT panel ── */}
          <motion.div
            className="pl-panel pl-panel--top"
            initial={false}
            animate={
              phase === PHASE.SPLIT
                ? { x: '40vw', y: '-40vh', transition: { duration: 0.65, ease: EASE.inOut } }
                : {}
            }
            onAnimationComplete={() => {
              if (phase === PHASE.SPLIT) setPanelGone(true);
            }}
          />

          {/* ── BOTTOM-LEFT panel ── */}
          <motion.div
            className="pl-panel pl-panel--bottom"
            initial={false}
            animate={
              phase === PHASE.SPLIT
                ? { x: '-40vw', y: '40vh', transition: { duration: 0.65, ease: EASE.inOut } }
                : {}
            }
          />

          {/* ── CENTER LOGO ── */}
          <div className="pl-center">
            {/* Logo */}
            <motion.div
              className="pl-logo-wrap"
              ref={centerLogoRef}
              initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)' }}
              animate={
                logoVisible
                  ? { opacity: 1, scale: 1, filter: 'blur(0px)',
                      transition: { duration: 0.5, ease: EASE.premium } }
                  : {}
              }
            >
              <img src={logoImg} alt="Apex Spider Innovation" className="pl-logo-img" />
              {/* Subtle cyan glow ring behind logo */}
              <div className="pl-logo-glow" />
            </motion.div>

            {/* Energy line */}
            <div className="pl-line-track">
              <motion.div
                className="pl-energy-line"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={
                  linePhase === 'expand'
                    ? { scaleX: 1, opacity: 1,
                        transition: { duration: 0.4, ease: EASE.premium } }
                    : linePhase === 'fade'
                    ? { opacity: 0,
                        transition: { duration: 0.35, ease: 'easeOut' } }
                    : {}
                }
              />
            </div>
          </div>

          {/* Skip button */}
          <motion.button
            className="pl-skip"
            initial={{ opacity: 0 }}
            animate={{ opacity: showSkip ? 0.5 : 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            onClick={skipAll}
            aria-label="Skip intro animation"
          >
            Skip
          </motion.button>
        </div>
      )}

      {/* ──────── FLYING LOGO (outside overlay, fixed, travels to navbar) ──────── */}
      {logoFlying && logoStyle && (
        <FlyingLogo style={logoStyle} />
      )}
    </>
  );
}

/* ── Flying Logo: animates from center screen to navbar slot ── */
function FlyingLogo({ style }) {
  const { x, y, width, height, size, toX, toY, toWidth, toHeight, toSize } = style;

  return (
    <motion.div
      className="pl-flying-logo"
      style={{
        width: width || size,
        height: height || size,
        top: 0,
        left: 0,
      }}
      initial={{ x, y }}
      animate={{
        x:      toX,
        y:      toY,
        width:  toWidth || toSize,
        height: toHeight || toSize,
      }}
      transition={{ duration: 0.45, ease: EASE.premium }}
    >
      <img
        src={logoImg}
        alt=""
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </motion.div>
  );
}
