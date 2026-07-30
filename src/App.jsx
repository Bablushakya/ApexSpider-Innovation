import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import ValueProps from './components/ValueProps';
import Process from './components/Process';
import CaseStudy from './components/CaseStudy';
import About from './components/About';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.99 }}
        animate={{ 
          opacity: isLoading ? 0 : 1, 
          y: isLoading ? 15 : 0, 
          scale: isLoading ? 0.99 : 1 
        }}
        transition={{ 
          duration: 0.7, 
          ease: [0.215, 0.61, 0.355, 1], // easeOutCubic
          delay: 0.1 
        }}
        style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
      >
        <Header />
        <main>
          <Hero />
          <Services />
          <ValueProps />
          <Process />
          <CaseStudy />
          <About />
          <Testimonials />
          <FAQ />
          <ContactCTA />
        </main>
        <Footer />
      </motion.div>
    </>
  );
}

