import React, { useEffect, useState, startTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

// -------------------------------------------------------------
// Sub-Component: StaggeredTextCycle (Recreated from Framer source)
// -------------------------------------------------------------
function StaggeredTextCycle({
  texts = ["Hello", "World", "Framer"],
  interval = 1700,
  staggerDelay = 0.01,
  duration = 0.2,
  entryYOffset = 40,
  exitYOffset = -40,
  loop = true,
  className = ""
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      startTransition(() => {
        setCurrentIndex((prev) => {
          const nextIndex = prev + 1;
          if (!loop && nextIndex >= texts.length) {
            return prev;
          }
          return nextIndex % texts.length;
        });
      });
    }, interval);

    return () => clearInterval(timer);
  }, [texts.length, interval, loop]);

  const currentText = texts[currentIndex] || "";
  const textParts = currentText.split("");

  return (
    <div style={{ position: 'relative', display: 'inline-flex', overflow: 'hidden', width: 'max-content' }} className={className}>
      <AnimatePresence mode="wait">
        <motion.p
          key={currentIndex}
          style={{ display: "flex", margin: 0 }}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {textParts.map((char, index) => (
            <motion.span
              key={`${currentIndex}-${index}`}
              variants={{
                hidden: { opacity: 0, y: entryYOffset },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: index * staggerDelay,
                    duration: duration
                  }
                },
                exit: {
                  opacity: 0,
                  y: exitYOffset,
                  transition: {
                    delay: index * staggerDelay,
                    duration: duration
                  }
                }
              }}
              style={{ display: "inline-block", whiteSpace: "pre" }}
            >
              {char}
            </motion.span>
          ))}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

// -------------------------------------------------------------
// Main Component: Preloader
// -------------------------------------------------------------
export default function Preloader({ onComplete }) {
  const brandName = "ApexSpider";
  const brandChars = brandName.split("");

  useEffect(() => {
    // Lock scroll on mount
    document.body.style.overflow = 'hidden';

    // Auto-complete loading and start exit transition after 2.7s
    const timer = setTimeout(() => {
      onComplete();
    }, 2700);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  // Framer animation configs
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.4
      }
    }
  };

  const charVariants = {
    hidden: {
      opacity: 0.001,
      filter: "blur(10px)",
      scale: 3,
      skewY: 3,
      x: 100,
      y: 0
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      skewY: 0,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        mass: 1
      }
    }
  };

  return (
    <motion.div
      className="preloader-overlay"
      initial={{ y: 0 }}
      exit={{ 
        y: '-100vh',
        transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] }
      }}
    >
      {/* Visual cybernetic backdrop */}
      <div className="preloader-grid" />
      <div className="preloader-glow-bl" />
      <div className="preloader-glow-tr" />

      <div className="preloader-content">
        {/* Main Title Entrance Animation */}
        <motion.h1 
          className="preloader-title"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {brandChars.map((char, index) => (
            <motion.span
              key={index}
              variants={charVariants}
              className="preloader-title-char"
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Scrolling Slogans Cycle */}
        <div className="preloader-slogan-wrapper">
          <StaggeredTextCycle
            texts={[
              "We Craft Digital Experiences",
              "We Build, Optimize, and Scale",
              "ApexSpider Innovation"
            ]}
            className="preloader-slogan"
            interval={1700}
            staggerDelay={0.01}
            duration={0.2}
            entryYOffset={25}
            exitYOffset={-25}
          />
        </div>
      </div>
    </motion.div>
  );
}
