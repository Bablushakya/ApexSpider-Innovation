# ApexSpider Innovation

Premium custom software, scalable web applications, and intelligent digital systems for next-gen startups and growing enterprises.

**Live site:** [www.apexspiderinnovation.com](https://www.apexspiderinnovation.com)
**Contact:** [info@apexspiderinnovation.com](mailto:info@apexspiderinnovation.com)

---

## Tech Stack

| Layer     | Technology                                     |
|-----------|------------------------------------------------|
| UI        | React 19, Framer Motion 12                     |
| Build     | Vite 8, @vitejs/plugin-react                   |
| Routing   | React Router DOM 7                             |
| Linting   | oxlint                                         |
| Testing   | Vitest + React Testing Library + jsdom         |
| Forms     | EmailJS (client-side email service)            |
| Fonts     | Inter, Outfit, JetBrains Mono (Google Fonts)   |
| Deploy    | Vercel (Automatic deployment from main branch) |

---

## Folder Structure

```
src/
├── assets/           # Static assets (logo images in WebP format)
├── components/       # All React components + companion CSS
│   ├── desktop/      # Desktop-optimized components
│   ├── mobile/       # Mobile-optimized components
│   ├── layout/       # Layout components (PageLayout, PageSEO, ScrollToTop)
│   ├── shared/       # Shared components (Breadcrumb, CTASection)
│   ├── ui/           # Reusable UI primitives (GlowHorizonFM)
│   └── ErrorBoundary.jsx
├── constants/        # Data constants and configuration
├── hooks/            # Custom React hooks
├── pages/            # Route-level pages
├── services/         # API service layer (contactService.js)
├── test/             # Unit & component tests
└── utils/            # Utility functions

public/
├── images/           # Team photos and case study images
├── robots.txt        # SEO crawler instructions
├── sitemap.xml       # Generated sitemap (auto-updated on build)
├── llms.txt          # AI crawler documentation
└── [favicons, OG images, manifest]

api/
└── indexnow.js       # Vercel serverless function for IndexNow submission

scripts/
├── prerender.mjs     # SSR prerendering (runs during build)
├── generate-sitemap.mjs  # Sitemap generator (runs during build)
└── indexnow.mjs      # Manual IndexNow submission script
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 22 (specified in `.nvmrc`)
- npm ≥ 9

### Installation

```bash
git clone https://github.com/apexspider-innovation/apexspider-innovation.git
cd apexspider-innovation
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable                       | Description                                | Required |
|--------------------------------|--------------------------------------------|----------|
| `VITE_EMAILJS_SERVICE_ID`      | EmailJS service ID for contact forms       | Yes (for live form) |
| `VITE_EMAILJS_TEMPLATE_ID`     | EmailJS template ID                        | Yes (for live form) |
| `VITE_EMAILJS_PUBLIC_KEY`      | EmailJS public key                         | Yes (for live form) |
| `INDEXNOW_API_KEY`             | Bing IndexNow API key (server-side only)  | Optional |
| `INDEXNOW_TRIGGER_SECRET`      | Secret for /api/indexnow endpoint         | Optional |
| `VITE_SENTRY_DSN`              | Sentry error tracking DSN                  | Optional |

Get a free EmailJS account at [emailjs.com](https://www.emailjs.com).

Without the EmailJS keys, the form runs in **demo mode** — submissions are acknowledged in the UI but no email is sent.

---

## Development

```bash
npm run dev      # Start Vite dev server at http://localhost:5173
```

---

## Available Commands

| Command           | Description                              |
|-------------------|------------------------------------------|
| `npm run dev`     | Start development server                 |
| `npm run build`   | Production build with SSR prerendering   |
| `npm run preview` | Preview production build locally         |
| `npm run lint`    | Run oxlint                               |
| `npm test`        | Run all tests (single run)               |
| `npm run test:ui` | Vitest UI                                |
| `npm run test:watch` | Vitest in watch mode                  |
| `npm run indexnow` | Submit URLs to Bing IndexNow (manual)  |
| `npm run verify-deploy` | Pre-deployment verification script |

---

## Deployment

### Vercel (Automatic)

Pushes to `main` branch trigger automatic deployment via Vercel.

**One-time setup:**
1. Connect repository to Vercel
2. Add environment variables in **Vercel Dashboard → Settings → Environment Variables**
3. Vercel will automatically build and deploy on every push to main

### Environment Variables on Vercel

Add these in the Vercel Dashboard:

**Required (client-side):**
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

**Optional (server-side for IndexNow API):**
- `INDEXNOW_API_KEY`
- `INDEXNOW_TRIGGER_SECRET`

---

## Branding & Content

All brand copy, company name, emails, and navigation links are centralized in:

```
src/constants/brand.js
```

Update that file once to propagate changes everywhere.

---

## Contact Form

The form uses [EmailJS](https://www.emailjs.com) for email delivery. No backend server is required.

To activate:
1. Create a free account at emailjs.com
2. Configure an email service connected to info@apexspiderinnovation.com
3. Create a template with required variables (see `.env.example`)
4. Add credentials to `.env` and Vercel environment variables

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push to the branch: `git push origin feat/my-feature`
5. Open a pull request against `main`

Please ensure `npm run lint` and `npm test` both pass before submitting.

---

## License

Copyright © 2026 ApexSpider Innovation. All rights reserved.

This codebase is proprietary. No part may be reproduced, distributed, or used without express written permission from ApexSpider Innovation.
