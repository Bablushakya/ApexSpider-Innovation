import React from 'react';
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

export default function App() {
  return (
    <>
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
    </>
  );
}
