/**
 * Case Studies / Portfolio data - Single source of truth
 * Used by both Desktop and Mobile CaseStudy components
 */

import kinImg from '../assets/Our work/Kin webiste.png';
import heritageImg from '../assets/Our work/india heritage travel.png';

export const CASE_STUDIES = [
  {
    tag: 'Landing Page Design & Development',
    client: 'Kim — Elevation by Kim',
    title: 'India Sourcing Trip Landing Page',
    desc: 'Designed and developed a dedicated landing page for Elevation by Kim to promote the India Sourcing Trip program. The page focuses on storytelling, lead generation, responsive design, and a premium user experience that encourages manufacturers and buyers to join the sourcing journey.',
    services: [
      'Landing Page Design',
      'Responsive Development',
      'Performance Optimisation',
      'Lead Generation UI',
      'Modern UX',
    ],
    liveUrl: 'https://www.elevationbykim.com/india-sourcing-trip',
    liveLabel: 'View Live Project — Elevation by Kim',
    image: kinImg,
    imageAlt: 'Elevation by Kim — India Sourcing Trip Landing Page screenshot',
  },
  {
    tag: 'Full Digital Transformation',
    client: 'India Heritage Travel',
    title: 'India Heritage Travel — Complete Digital Presence',
    desc: 'Designed and developed the complete travel website with a fully responsive user experience while implementing comprehensive SEO strategies. Our work included modern UI design, on-page SEO, technical SEO, off-page SEO, website optimisation, and ongoing social media management to strengthen the company\'s digital presence.',
    services: [
      'Website Design & Development',
      'Responsive Design',
      'On-page & Technical SEO',
      'Off-page SEO',
      'Performance Optimisation',
      'Social Media Management',
    ],
    liveUrl: 'https://indiaheritagetravel.com/',
    liveLabel: 'View Live Project — India Heritage Travel',
    image: heritageImg,
    imageAlt: 'India Heritage Travel — Complete Digital Presence website screenshot',
  },
];
