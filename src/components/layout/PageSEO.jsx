/**
 * PageSEO — Injects per-page SEO metadata into document.head.
 * Manages title, meta description, canonical URL, and Open Graph tags.
 */
import { useEffect } from 'react';
import { PAGE_SEO } from '../../constants/seo';

export { PAGE_SEO };

/**
 * @param {object} props
 * @param {string} props.title        - Page <title>
 * @param {string} props.description  - Meta description
 * @param {string} [props.canonical]  - Canonical URL (full URL)
 * @param {string} [props.ogTitle]    - OG title (falls back to title)
 * @param {string} [props.ogDesc]     - OG description (falls back to description)
 * @param {string} [props.ogImage]    - OG image URL
 * @param {boolean} [props.noindex]   - When true, sets meta robots to noindex
 */
export default function PageSEO({
  title,
  description,
  canonical,
  ogTitle,
  ogDesc,
  ogImage,
  noindex = false,
}) {
  useEffect(() => {
    // Title
    if (title) document.title = title;

    // Helper to set meta tag
    const setMeta = (selector, content) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        const [attr, val] = selector.replace(/[[\]"]/g, ' ').trim().split(/\s+/);
        el.setAttribute(attr, val);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    if (description) {
      setMeta('meta[name="description"]', description);
      setMeta('meta[property="og:description"]', ogDesc || description);
      setMeta('meta[name="twitter:description"]', ogDesc || description);
    }

    if (title || ogTitle) {
      setMeta('meta[property="og:title"]', ogTitle || title);
      setMeta('meta[name="twitter:title"]', ogTitle || title);
    }

    if (ogImage) {
      setMeta('meta[property="og:image"]', ogImage);
      setMeta('meta[name="twitter:image"]', ogImage);
    }

    // noindex — used on 404 / error pages as belt-and-suspenders
    const robotsEl = document.querySelector('meta[name="robots"]');
    if (noindex) {
      if (robotsEl) robotsEl.setAttribute('content', 'noindex');
      else setMeta('meta[name="robots"]', 'noindex');
    } else if (robotsEl && robotsEl.getAttribute('content') === 'noindex') {
      // Reset if navigating away from a noindex page
      robotsEl.setAttribute('content', 'index, follow');
    }

    // Canonical
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      if (!canonicalEl) {
        canonicalEl = document.createElement('link');
        canonicalEl.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.setAttribute('href', canonical);
    }

    // OG URL
    if (canonical) {
      setMeta('meta[property="og:url"]', canonical);
    }

    return () => {
      // Reset to site defaults on unmount
      document.title = 'Apex Spider Innovation | Custom Software & Web Development';
    };
  }, [title, description, canonical, ogTitle, ogDesc, ogImage, noindex]);

  return null;
}
