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
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <motion.div
      className="animated-title-container"
      variants={containerVariants}
      initial="hidden"
      animate={open ? "visible" : "hidden"}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        width: "100%"
      }}
    >
      <div className="animated-line-mask" style={{ overflow: "hidden", width: "100%", display: "flex", justifyContent: "center" }}>
        <motion.h1 className="hero-title" variants={lineVariants} style={{ margin: 0, lineHeight: 1.15 }}>
          We build <span className="text-gradient-cyan">scalable software</span>
        </motion.h1>
      </div>
      <div className="animated-line-mask" style={{ overflow: "hidden", width: "100%", display: "flex", justifyContent: "center" }}>
        <motion.h1 className="hero-title" variants={lineVariants} style={{ margin: 0, lineHeight: 1.15 }}>
          for next-gen enterprises.
        </motion.h1>
      </div>
    </motion.div>
  );
}
