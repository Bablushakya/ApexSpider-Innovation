import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Services.css';

export default function Services() {
  const premiumEase = [0.16, 1, 0.3, 1];
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const slider = sliderRef.current;
    if (!section || !slider) return;

    // Convert vertical wheel scrolls to horizontal motion inside the container
    const onWheel = (e) => {
      if (e.deltaY === 0) return;
      
      const isScrollingRight = e.deltaY > 0;
      const isAtEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10;
      const isAtStart = slider.scrollLeft <= 10;

      // Only scroll slider horizontally if bounds are not reached (to let page scroll breathe)
      if ((isScrollingRight && !isAtEnd) || (!isScrollingRight && !isAtStart)) {
        e.preventDefault();
        slider.scrollBy({
          left: e.deltaY * 1.5,
          behavior: 'auto'
        });
      }
    };

    section.addEventListener('wheel', onWheel, { passive: false });
    return () => section.removeEventListener('wheel', onWheel);
  }, []);

  // Autoplay Slider mechanism (pauses on hover anywhere in the section)
  useEffect(() => {
    const el = sliderRef.current;
    const section = sectionRef.current;
    if (!el || !section) return;

    let autoplayId;
    let isHovered = false;

    const startAutoplay = () => {
      autoplayId = setInterval(() => {
        if (isHovered) return;
        
        const firstCard = el.querySelector('.service-card-wrapper');
        const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 352;
        const maxScroll = el.scrollWidth - el.clientWidth;
        
        if (el.scrollLeft >= maxScroll - 15) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          el.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }, 3500);
    };

    const stopAutoplay = () => {
      if (autoplayId) clearInterval(autoplayId);
    };

    const handleMouseEnter = () => { isHovered = true; };
    const handleMouseLeave = () => { isHovered = false; };

    section.addEventListener('mouseenter', handleMouseEnter);
    section.addEventListener('mouseleave', handleMouseLeave);
    
    startAutoplay();

    return () => {
      stopAutoplay();
      section.removeEventListener('mouseenter', handleMouseEnter);
      section.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const servicesList = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      title: 'Custom Software Development',
      desc: 'High-performance applications engineered to address unique enterprise requirements.',
      bullets: ['Scalable backend architectures', 'Cloud native deployment pipelines', 'Secure database integrations']
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
      title: 'Web Application Design',
      desc: 'Bespoke web applications featuring modern frameworks and interactive visual states.',
      bullets: ['Robust multi-tenant systems', 'Real-time charting & telemetry', 'Smooth interface state updates']
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10zM2 12h20" />
        </svg>
      ),
      title: 'UI/UX Design',
      desc: 'User-centered design systems crafted for visual clarity, accessibility, and high adoption.',
      bullets: ['Fidelity mockup prototypes', 'Structured design component tokens', 'Intuitive user journey flows']
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
      title: 'Automation Solutions',
      desc: 'Streamline operational workflows through triggered pipelines and legacy system syncs.',
      bullets: ['Custom event trigger chains', 'Secure API proxy integrations', 'Batch data ETL synchronization']
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: 'Branding & Digital Presence',
      desc: 'Establish market presence with consistent visual standards and premium layouts.',
      bullets: ['Unified asset typography rules', 'Scalable vector logo frameworks', 'High-impact landing experiences']
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
      title: 'Technical Support',
      desc: 'Maintain operational uptime and software health with continuous monitoring systems.',
      bullets: ['Automated server diagnostics', 'Proactive patch deployments', 'Uptime monitoring dashboards']
    }
  ];

  // Animation variants
  const gridContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 35, 
      filter: "blur(5px)" 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { 
        duration: 0.8, 
        ease: premiumEase
      }
    }
  };

  return (
    <section ref={sectionRef} className="services-section section-padding" id="services">
      <div className="container">
        {/* Section Title Header */}
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: premiumEase }}
        >
          <span className="tag">Capabilities</span>
          <h2>Our Services & Solutions</h2>
          <p>We deliver robust technical architectures and refined user interfaces to fuel product velocity.</p>
        </motion.div>

        {/* Services Slider Container */}
        <motion.div 
          ref={sliderRef}
          className="services-slider-container"
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-8%" }}
        >
          {servicesList.map((service, index) => (
            <motion.div 
              key={index} 
              className="service-card-wrapper"
              variants={cardVariants}
            >
              <div className="card">
                <div className="boxshadow" />
                <div className="main">
                  {/* Outer Sliding Doors */}
                  <div className="top" />
                  <div className="left side" />
                  <div className="right side" />
                  
                  {/* Front visual layer (visible when closed) */}
                  <div className="front-content">
                    <div className="service-icon-wrapper">
                      {service.icon}
                    </div>
                    <h3 className="service-title-front">{service.title}</h3>
                    <div className="hover-indicator">
                      <span>Hover to Reveal</span>
                      <svg className="indicator-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </div>
                  </div>

                  {/* Back content layer (revealed on hover) */}
                  <div className="back-content">
                    <h3 className="service-title-back">{service.title}</h3>
                    <p className="service-desc">{service.desc}</p>
                    
                    <ul className="service-bullets">
                      {service.bullets.map((bullet, idx) => (
                        <li key={idx} className="service-bullet-item">
                          <svg className="bullet-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    
                    {/* Action buttons sliding in sequence */}
                    <div className="button-container">
                      <button 
                        className="button" 
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
                        title="Inquire Now"
                      >
                        <svg className="svg" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <rect width={20} height={16} x={2} y={4} rx={2} />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </button>
                      <button 
                        className="button" 
                        title="Quick Inquiry (Support)"
                        onClick={() => {
                          const contactInput = document.getElementById('message');
                          if (contactInput) {
                            contactInput.focus();
                            contactInput.value = `Hi, I am interested in your "${service.title}" services. Please share details.`;
                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                          } else {
                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                      >
                        <svg className="svg" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      </button>
                      <button 
                        className="button" 
                        onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })} 
                        title="View Case Studies"
                      >
                        <svg className="svg" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" x2="21" y1="14" y2="3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
