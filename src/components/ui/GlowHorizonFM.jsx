/**
 * GlowHorizonFM
 *
 * Ported from the original TypeScript/Tailwind reference to plain JSX
 * with inline styles. Zero new dependencies. Zero CSS classes on arcs.
 *
 * How it works
 * ────────────
 * The outer motion.div fills 100% × 100% of its parent (absolute).
 * For variant="top" it starts at y:"-100%" (fully above the fold) and
 * animates to y:"-50%" — so exactly the bottom half is visible, placing
 * the ellipse arcs centred right at the bottom edge of the hero section.
 *
 * Each Arc is a rounded-100% div (= ellipse) scaled relative to the
 * parent size. They stack on top of each other to build the glow layers.
 */

import React from 'react';
import { motion } from 'framer-motion';

const EASE     = [0.16, 1, 0.3, 1];
const DURATION = 2;

const VARIANTS = {
  top:    { axis: 'y', scaleAxis: 'scaleY', enterPct: '-100%', restPct: '-50%' },
  bottom: { axis: 'y', scaleAxis: 'scaleY', enterPct:  '100%', restPct:  '50%' },
  left:   { axis: 'x', scaleAxis: 'scaleX', enterPct:  '100%', restPct:  '50%' },
  right:  { axis: 'x', scaleAxis: 'scaleX', enterPct: '-100%', restPct: '-50%' },
};

/** Individual arc layer */
function Arc({ variant, color, size, initialOffset, blur, boxShadow, delay }) {
  const scale = parseFloat(size) / 100;
  const { axis, enterPct } = VARIANTS[variant];
  const sign = enterPct.startsWith('-') ? -1 : 1;

  const startPct = initialOffset
    ? `${sign * Math.abs(parseFloat(initialOffset) - 50)}%`
    : undefined;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position:     'absolute',
        inset:        0,
        borderRadius: '100%',
        scale,
        background:   color,
        ...(blur      !== undefined && { filter:    `blur(${blur}px)` }),
        ...(boxShadow !== undefined && { boxShadow }),
      }}
      initial={startPct ? { [axis]: startPct } : false}
      animate={startPct ? { [axis]: 0 }        : undefined}
      transition={{ duration: DURATION, ease: EASE, delay }}
    />
  );
}

/** Main component */
export default function GlowHorizonFM({ variant = 'top', className }) {
  const { axis, scaleAxis, enterPct, restPct } = VARIANTS[variant];

  return (
    <motion.div
      aria-hidden="true"
      className={className}
      style={{
        position:  'absolute',
        width:     '100%',
        height:    '100%',
        isolation: 'isolate',
      }}
      initial={{ [axis]: enterPct, [scaleAxis]: 1.5, opacity: 0, filter: 'blur(15px)' }}
      animate={{ [axis]: restPct,  [scaleAxis]: 1,   opacity: 1, filter: 'blur(0px)'  }}
      transition={{ duration: DURATION, ease: EASE }}
    >
      {/* White rim — thin bright arc, delayed for cinematic entry */}
      <Arc
        variant={variant}
        color="#FFFFFF"
        size="132%"
        boxShadow="0px -4px 23px 0px #ffffffb5"
        delay={1.2}
      />
      {/* Purple bloom */}
      <Arc
        variant={variant}
        color="#A558FB"
        size="120%"
        initialOffset="10%"
        blur={31}
        delay={0.6}
      />
      {/* Deep violet core */}
      <Arc
        variant={variant}
        color="#4922E5"
        size="124%"
        initialOffset="10%"
        blur={21}
        delay={0}
      />
      {/* Black fill — masks the interior, blends with dark bg */}
      <Arc
        variant={variant}
        color="#000"
        size="120%"
        initialOffset="10%"
        blur={51}
        delay={0}
      />
    </motion.div>
  );
}
