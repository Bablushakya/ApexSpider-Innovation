/**
 * Case Studies / Portfolio data - Single source of truth
 * Used by Portfolio page, CaseStudy components, and individual case-study pages.
 */

import kinImg from '../assets/Our work/Kin webiste.png';
import heritageImg from '../assets/Our work/india heritage travel.png';

export const CASE_STUDIES = [
  {
    slug: 'india-heritage-travel',
    tag: 'Full Digital Transformation',
    category: 'Travel & Digital Experience',
    client: 'India Heritage Travel',
    title: 'India Heritage Travel — Complete Digital Presence',
    shortDesc:
      'A complete digital transformation for a travel company — from website design and development through to SEO and social media management.',
    overview:
      'India Heritage Travel required a complete digital presence that could represent their curated travel offerings with clarity, credibility and strong search visibility. ApexSpider designed and developed the full website while implementing a comprehensive SEO strategy to establish their online presence.',
    clientChallenge:
      'India Heritage Travel had a strong travel offering but lacked a digital presence capable of representing it effectively. The existing setup did not support discoverability through search, and the user experience did not reflect the premium nature of their travel experiences.',
    objectives: [
      'Design and develop a fully responsive website that reflects the quality of their travel offerings',
      'Implement on-page and technical SEO to improve organic discoverability',
      'Build a platform that is easy to navigate for international visitors',
      "Establish a social media presence to support the brand's digital growth",
    ],
    solution:
      'We designed and developed the complete website with a modern, responsive user experience. The project included on-page SEO, technical SEO, performance optimisation, and structured content that presents travel experiences clearly. Social media management was implemented to support ongoing digital presence.',
    keyFeatures: [
      'Fully responsive design across all devices',
      'On-page and technical SEO implementation',
      'Performance-optimised page loading',
      'Structured travel experience presentation',
      'Social media management setup',
      'Off-page SEO foundation',
    ],
    services: [
      'Website Design & Development',
      'Responsive Design',
      'On-page & Technical SEO',
      'Off-page SEO',
      'Performance Optimisation',
      'Social Media Management',
    ],
    technology: ['React', 'JavaScript', 'HTML & CSS', 'SEO tools', 'Performance optimisation'],
    outcomes:
      'Delivered a structured digital presence that presents their travel offerings with clarity. Established an SEO foundation and social media presence to support continued digital growth.',
    liveUrl: 'https://indiaheritagetravel.com/',
    liveLabel: 'View Live Project — India Heritage Travel',
    image: heritageImg,
    imageAlt: 'India Heritage Travel — Complete Digital Presence website screenshot',
  },
  {
    slug: 'elevation-by-kim',
    tag: 'Landing Page Design & Development',
    category: 'E-Commerce & Lead Generation',
    client: 'Kim — Elevation by Kim',
    title: 'India Sourcing Trip Landing Page',
    shortDesc:
      'A dedicated landing page for Elevation by Kim to promote their India Sourcing Trip program, focused on storytelling and lead generation.',
    overview:
      'Elevation by Kim needed a high-quality landing page to promote their India Sourcing Trip program — a curated experience for manufacturers and buyers looking to explore sourcing opportunities in India. The page needed to communicate the value of the program clearly and convert visitors into enquiries.',
    clientChallenge:
      'Elevation by Kim had an established brand and loyal audience, but needed a dedicated landing page that could clearly explain the India Sourcing Trip program, communicate its value, and convert visitors effectively without relying on the existing general website structure.',
    objectives: [
      'Create a focused landing page that communicates the program clearly',
      'Design a premium user experience aligned with the Elevation by Kim brand',
      'Build a lead generation interface that converts page visitors into enquiries',
      'Ensure full responsiveness across desktop and mobile',
    ],
    solution:
      'We designed and developed a focused landing page built around clear storytelling, program benefits, and a lead generation form. The design was aligned with the premium aesthetic of the Elevation by Kim brand while prioritising clarity and conversion.',
    keyFeatures: [
      'Premium landing page design',
      'Storytelling-first content structure',
      'Lead generation form integration',
      'Fully responsive layout',
      'Performance-optimised build',
      'Modern UX aligned with brand identity',
    ],
    services: [
      'Landing Page Design',
      'Responsive Development',
      'Performance Optimisation',
      'Lead Generation UI',
      'Modern UX',
    ],
    technology: ['HTML', 'CSS', 'JavaScript', 'Responsive design', 'Performance optimisation'],
    outcomes:
      'Delivered a landing page that presents the India Sourcing Trip program clearly and provides a stronger lead generation experience for the Elevation by Kim audience.',
    liveUrl: 'https://www.elevationbykim.com/india-sourcing-trip',
    liveLabel: 'View Live Project — Elevation by Kim',
    image: kinImg,
    imageAlt: 'Elevation by Kim — India Sourcing Trip Landing Page screenshot',
  },
];

/** Case studies mapped by slug for quick lookup */
export const CASE_STUDY_BY_SLUG = Object.fromEntries(
  CASE_STUDIES.map((cs) => [cs.slug, cs])
);
