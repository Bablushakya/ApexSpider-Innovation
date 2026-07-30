import React from "react";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];
const DURATION = 2;

const VARIANTS = {
  top:    { axis: "y", scaleAxis: "scaleY", enterPct: "-100%", restPct: "-50%" },
  bottom: { axis: "y", scaleAxis: "scaleY", enterPct:  "100%", restPct:  "50%" },
  left:   { axis: "x", scaleAxis: "scaleX", enterPct:  "100%", restPct:  "50%" },
  right:  { axis: "x", scaleAxis: "scaleX", enterPct: "-100%", restPct: "-50%" },
};

export default function GlowHorizonFM({ className, variant = "top" }) {
  const variantData = VARIANTS[variant] || VARIANTS.top;
  const { axis, scaleAxis, enterPct, restPct } = variantData;

  return (
    <motion.div
      className={className ?? ""}
      style={{ 
        isolation: "isolate",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1
      }}
      initial={{ [axis]: enterPct, [scaleAxis]: 1.5, opacity: 0, filter: "blur(15px)" }}
      animate={{ [axis]: restPct,  [scaleAxis]: 1,   opacity: 1, filter: "blur(0px)"  }}
      transition={{ duration: DURATION, ease: EASE }}
    >
      <Arc variant={variant} color="#FFFFFF" size="132%" boxShadow="0px -4px 23px 0px #ffffffb5" delay={1.2} />
      <Arc variant={variant} color="#A558FB" size="120%" initialOffset="10%" blur={31} delay={0.6} />
      <Arc variant={variant} color="#4922E5" size="124%" initialOffset="10%" blur={21} delay={0}   />
      <Arc variant={variant} color="#000000" size="120%" initialOffset="10%" blur={51} delay={0}   />
    </motion.div>
  );
}

function Arc({
  variant,
  color,
  size,
  initialOffset,
  blur,
  boxShadow,
  delay,
}) {
  const scale = parseFloat(size) / 100;
  const variantData = VARIANTS[variant] || VARIANTS.top;
  const { axis, enterPct } = variantData;
  const sign = enterPct.startsWith("-") ? -1 : 1;
  const startPct = initialOffset
    ? `${sign * Math.abs(parseFloat(initialOffset) - 50)}%`
    : undefined;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: "100%",
        scale,
        background: color,
        pointerEvents: "none",
        ...(blur !== undefined && { filter: `blur(${blur}px)` }),
        ...(boxShadow && { boxShadow }),
      }}
      initial={startPct ? { [axis]: startPct } : false}
      animate={startPct ? { [axis]: 0 } : undefined}
      transition={{ duration: DURATION, ease: EASE, delay }}
    />
  );
}
