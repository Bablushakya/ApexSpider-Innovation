# ApexSpider Innovation — Issues & Problems

> Generated: August 6, 2026  
> Repository: `Axesspiderinnovations`  
> Total issues documented: **46**

---

## Summary

| Category | Count |
|----------|-------|
| Critical / Assets | 3 |
| Functional Bugs | 4 |
| Navigation / UX | 4 |
| Code Quality | 6 |
| Branding | 3 |
| Content | 4 |
| SEO | 5 |
| Performance | 4 |
| Accessibility | 4 |
| Git / Deployment | 4 |
| Architecture | 5 |
| **Total** | **46** |

---

## Critical / Build & Assets

### 1. Uncommitted logo changes
- **Severity:** High
- **Files:** `src/components/Header.jsx`, `src/components/Footer.jsx`, `src/components/Preloader.jsx`
- **Problem:** Components now import `../assets/ApexSpiderLogo.png`, but these changes are **not committed**. Other developers or CI may still use old logo paths (`assets/logo/full_logo.png`, `assets/logo/icon_logo.png`).

### 2. Unused logo files (dead assets)
- **Severity:** Medium
- **Files:** `src/assets/logo/full_logo.png`, `src/assets/logo/icon_logo.png`, `src/assets/logo/white_logo.png`
- **Problem:** These files are no longer imported anywhere after the logo path change. They add unnecessary size (~300KB+) to the repo.

### 3. Multiple logo files for one brand
- **Severity:** Low
- **Files:** `src/assets/ApexSpiderLogo.png` + 3 files in `src/assets/logo/`
- **Problem:** Four PNG logo files exist for a single brand, causing confusion and maintenance overhead.

---

## Functional Bugs

### 4. "Explore Sample Prototype" button does nothing
- **Severity:** Medium
- **File:** `src/components/CaseStudy.jsx` (line ~296)
- **Problem:** Button exists but has no `onClick` handler or link. Users click it and nothing happens.

### 5. Contact form is simulated (not functional)
- **Severity:** High
- **File:** `src/components/ContactCTA.jsx`
- **Problem:** Form only shows a fake success message after a 1.5s delay. No email service, API, or webhook is connected. User submissions are lost.

### 6. Legal links are dead placeholders
- **Severity:** Medium
- **File:** `src/components/Footer.jsx`
- **Problem:** Privacy Policy, Terms of Service, and Security Code all use `href="#"` with no actual pages.

### 7. Logo/home links point to `#`
- **Severity:** Low
- **Files:** `src/components/Header.jsx`, `src/components/Footer.jsx`
- **Problem:** Clicking the logo jumps to page top via `#` instead of a proper anchor like `#hero` or a dedicated home route.

---

## Navigation & UX

### 8. Testimonials section missing from navigation
- **Severity:** Medium
- **Files:** `src/components/Header.jsx`, `src/components/Footer.jsx`, `src/components/Testimonials.jsx`
- **Problem:** Section exists with `id="testimonials"` but is not linked in Header or Footer nav menus.

### 9. Services cards use `<button>` instead of links
- **Severity:** Low
- **File:** `src/components/Services.jsx`
- **Problem:** "Inquire Now" uses `<button>` with `scrollIntoView`. Should use `<a href="#contact">` for better SEO, keyboard navigation, and right-click "open in new tab" support.

### 10. FAQ accessibility pattern is incorrect
- **Severity:** Medium
- **File:** `src/components/FAQ.jsx`
- **Problem:** Entire `div` is clickable via `onClick`, with a nested `button` inside. This is not keyboard-friendly and violates accessibility best practices. Handler should be on the `button` only.

### 11. Preloader skips on repeat visits (sessionStorage)
- **Severity:** Low
- **File:** `src/components/Preloader.jsx`
- **Problem:** Uses `sessionStorage.setItem('preloader_done', '1')` — animation skips on refresh and new tabs in the same session. May confuse users who expect to see it again.

---

## Code Quality

### 12. Unused imports in Preloader
- **Severity:** Low
- **File:** `src/components/Preloader.jsx` (line 2)
- **Problem:** `animate` and `useMotionValue` are imported from `framer-motion` but never used.
- **Lint:** `eslint(no-unused-vars)`

### 13. Unused variable in Preloader
- **Severity:** Low
- **File:** `src/components/Preloader.jsx` (line 159)
- **Problem:** `overlayVisible` is declared but never used.
- **Lint:** `eslint(no-unused-vars)`

### 14. Dead CSS file (App.css)
- **Severity:** Low
- **File:** `src/App.css`
- **Problem:** Leftover Vite template styles. Not imported anywhere in the project.

### 15. Unused public asset
- **Severity:** Low
- **File:** `public/icons.svg`
- **Problem:** No references in the codebase. Likely leftover from Vite template.

### 16. Unused ref in Services
- **Severity:** Low
- **File:** `src/components/Services.jsx`
- **Problem:** `sectionRef` is attached to the section element but never used for any logic.

### 17. eslint-disable for exhaustive-deps
- **Severity:** Low
- **File:** `src/components/Preloader.jsx` (line 156)
- **Problem:** Preloader timeline `useEffect` ignores dependency warnings. Could cause stale closure bugs if callbacks change.

---

## Branding & Naming

### 18. Inconsistent company name
- **Severity:** Medium
- **Locations:** Throughout codebase
- **Problem:** Mixed usage of:
  - `ApexSpider Innovation`
  - `Apex Spider Innovation` (with space)
  - Repo/folder name: `Axesspiderinnovations`

### 19. Inconsistent email domains
- **Severity:** Medium
- **Files:** `src/components/ContactCTA.jsx`, `src/components/Footer.jsx`, `src/components/FAQ.jsx`
- **Problem:** Primary email `info@apexspiderinnovation.com` vs alternative `apexspiderinnovation@gmail.com` — unclear which is official.

### 20. Package name typo
- **Severity:** Low
- **File:** `package.json`
- **Problem:** Package name is `axesspiderinnovations` (Ax**ess**) while brand is Apex**Spider**.

---

## Content / Not Production-Ready

### 21. All content is mock/demo placeholder
- **Severity:** High
- **Files:** `Testimonials.jsx`, `CaseStudy.jsx`, `Hero.jsx`, `About.jsx`
- **Problem:** Testimonials, case studies, and social proof logos ("Enterprise Beta", "SaaS Alpha", "Digital Delta") are clearly fake/demo content.

### 22. Hero badge says "Now in Beta"
- **Severity:** Low
- **File:** `src/components/Hero.jsx`
- **Problem:** Unclear if the company/product is actually in beta or if this is placeholder marketing copy.

### 23. README is default Vite template
- **Severity:** Medium
- **File:** `README.md`
- **Problem:** No project-specific documentation — setup, deployment, or contribution instructions missing.

### 24. Form success message exposes internal dev note
- **Severity:** Medium
- **File:** `src/components/ContactCTA.jsx`
- **Problem:** Success message says: *"In production, this form will trigger a secure webhook or database write."* — this should not be shown to end users.

---

## SEO & Meta

### 25. Missing Open Graph tags
- **Severity:** Medium
- **File:** `index.html`
- **Problem:** No `og:title`, `og:description`, `og:image`, or `og:url` for social media sharing.

### 26. Missing Twitter Card meta
- **Severity:** Medium
- **File:** `index.html`
- **Problem:** No Twitter Card tags for link previews on X/Twitter.

### 27. Missing canonical URL
- **Severity:** Low
- **File:** `index.html`
- **Problem:** No `<link rel="canonical">` tag for SEO duplicate-content prevention.

### 28. Missing robots.txt and sitemap
- **Severity:** Low
- **Files:** Not present in `public/`
- **Problem:** No `robots.txt` or `sitemap.xml` for search engine crawlers.

### 29. Missing structured data (JSON-LD)
- **Severity:** Low
- **File:** `index.html`
- **Problem:** No schema.org markup for business/organization info.

---

## Performance

### 30. Services marquee runs continuously
- **Severity:** Medium
- **File:** `src/components/Services.jsx`
- **Problem:** `requestAnimationFrame` loop runs from page load and never pauses, even when the user is not viewing the Services section. Wastes CPU/battery.

### 31. Marquee ignores prefers-reduced-motion
- **Severity:** Medium
- **File:** `src/components/Services.jsx`
- **Problem:** Preloader respects `prefers-reduced-motion`, but the Services carousel does not stop for users who prefer reduced motion.

### 32. Large JavaScript bundle
- **Severity:** Low
- **Build output:** ~373 KB JS (114 KB gzip)
- **Problem:** Framer Motion adds significant weight for a static marketing page.

### 33. External Google Fonts load
- **Severity:** Low
- **File:** `index.html`
- **Problem:** Fonts loaded from Google CDN — can block render. Self-hosting would improve performance and privacy.

---

## Accessibility (A11y)

### 34. FAQ items not keyboard-nav friendly
- **Severity:** Medium
- **File:** `src/components/FAQ.jsx`
- **Problem:** Click handler on `div` instead of `button` — keyboard users cannot properly interact with accordion items.

### 35. Services marquee accessibility
- **Severity:** Low
- **File:** `src/components/Services.jsx`
- **Problem:** Duplicate cards correctly use `aria-hidden="true"`, but the marquee as a whole lacks proper landmark/label for screen readers.

### 36. Dead button confuses screen readers
- **Severity:** Medium
- **File:** `src/components/CaseStudy.jsx`
- **Problem:** "Explore Sample Prototype" button appears interactive but does nothing — misleading for assistive technology users.

### 37. Body overflow conflict risk
- **Severity:** Low
- **Files:** `src/components/Preloader.jsx`, `src/components/Header.jsx`
- **Problem:** Both components set `document.body.style.overflow`. Potential conflict if preloader and mobile menu overlap in timing.

---

## Git / Deployment

### 38. Uncommitted changes
- **Severity:** High
- **Files:** `Footer.jsx`, `Header.jsx`, `Preloader.jsx`, `Preloader.css`
- **Problem:** 4 modified files not staged or committed.

### 39. Branch ahead of remote
- **Severity:** Low
- **Problem:** Local `main` branch is 2 commits ahead of `origin/main` — not pushed to remote.

### 40. No CI/CD pipeline
- **Severity:** Medium
- **Problem:** No GitHub Actions, build checks, or automated deployment configured.

### 41. No tests
- **Severity:** Medium
- **Problem:** No unit tests, integration tests, or E2E tests in the project.

---

## Architecture / Missing Features

### 42. No client-side routing
- **Severity:** Low
- **Problem:** Single-page app with anchor links only. No React Router — future pages (blog, privacy policy) would require adding routing.

### 43. No backend or API
- **Severity:** High
- **Problem:** No server, API endpoints, or third-party integrations for form submission, analytics, or CMS.

### 44. TypeScript not used
- **Severity:** Low
- **Problem:** `@types/react` and `@types/react-dom` are in devDependencies but all source files are `.jsx` without type checking.

### 45. No React Error Boundary
- **Severity:** Medium
- **Problem:** If any component crashes, the entire site goes blank with no fallback UI.

### 46. No image loading fallback
- **Severity:** Low
- **Problem:** If logo or other images fail to load, there is no fallback text or placeholder.

---

## Recommended Fix Priority

### P0 — Fix immediately
1. Commit or revert uncommitted logo changes (#1)
2. Connect contact form to real email/API (#5)
3. Remove or fix dead interactive elements (#4, #6, #7)

### P1 — Fix before launch
4. Replace mock/demo content with real content (#21, #24)
5. Add Testimonials to navigation (#8)
6. Fix FAQ accessibility (#10, #34)
7. Add SEO meta tags (#25–#29)
8. Clean up dead assets and unused code (#2, #12–#16)
9. Standardize branding/naming (#18–#20)

### P2 — Improve quality
10. Pause marquee when off-screen + respect reduced motion (#30, #31)
11. Add CI/CD and tests (#40, #41)
12. Update README (#23)
13. Add error boundary (#45)
14. Consider routing for legal pages (#42)

---

## Lint Output (Current)

```
src/components/Preloader.jsx:2:18  warning  'animate' is imported but never used
src/components/Preloader.jsx:2:27  warning  'useMotionValue' is imported but never used
src/components/Preloader.jsx:159:9 warning  'overlayVisible' is declared but never used
```

---

## Build Status

- `npm run build` — **passes** ✓
- `npm run lint` — **passes with 3 warnings** ⚠

---

*This file should be updated as issues are resolved. Mark fixed items with `[FIXED]` prefix and date.*
