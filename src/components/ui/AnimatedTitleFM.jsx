import React from 'react';
import { motion } from 'framer-motion';

export function AnimatedTitleFM({ open = true }) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const lineVariants = {
    hidden: { y: "110%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <motion.h1
      id="hero-heading"
      className="hero-title animated-title-container"
      variants={containerVariants}
      initial="hidden"
      animate={open ? "visible" : "hidden"}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        width: "100%",
        margin: 0,
        lineHeight: 1.2
      }}
    >
      <span className="animated-line-mask" style={{ overflow: "hidden", width: "100%", display: "block", paddingBottom: "2px" }}>
        <motion.span variants={lineVariants} style={{ display: "inline-block" }}>
          We build <span className="text-gradient-cyan">scalable software</span>
        </motion.span>
      </span>
      <span className="animated-line-mask" style={{ overflow: "hidden", width: "100%", display: "block", paddingBottom: "2px" }}>
        <motion.span variants={lineVariants} style={{ display: "inline-block" }}>
          for next-gen enterprises.
        </motion.span>
      </span>
    </motion.h1>
  );
}

