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
| Forms     | Web3Forms (no backend required)                |
| Fonts     | Inter, Outfit, JetBrains Mono (Google Fonts)   |
| Deploy    | GitHub Actions → GitHub Pages                  |

---

## Folder Structure

```
src/
├── assets/           # Static assets (logo, images)
├── components/       # All React components + companion CSS
│   └── ui/           # Reusable presentational primitives
├── constants/        # brand.js — single source of truth for copy & config
├── hooks/            # Reusable custom React hooks
├── pages/            # Route-level pages (legal pages, 404)
├── services/         # API service layer (contactService.js)
└── test/             # Unit & component tests

public/
├── robots.txt
└── sitemap.xml
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
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

| Variable                    | Description                                | Required |
|-----------------------------|--------------------------------------------|----------|
| `VITE_WEB3FORMS_ACCESS_KEY` | Web3Forms key for contact form delivery    | Yes (for live form) |

Get a free Web3Forms key at [web3forms.com](https://web3forms.com).

Without the key, the form runs in **demo mode** — submissions are acknowledged in the UI but no email is sent.

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
| `npm run build`   | Production build → `dist/`              |
| `npm run preview` | Preview production build locally         |
| `npm run lint`    | Run oxlint                               |
| `npm test`        | Run all tests (single run)               |
| `npm run test:ui` | Vitest UI                                |
| `npm run test:watch` | Vitest in watch mode                  |

---

## Deployment

### GitHub Pages (Automatic)

Pushes to `main` trigger the deploy workflow automatically via GitHub Actions.

**One-time setup:**
1. Go to repository **Settings → Pages → Source** → select `GitHub Actions`
2. Add `VITE_WEB3FORMS_ACCESS_KEY` to **Settings → Secrets → Actions**

### Manual Build

```bash
npm run build
# Output is in /dist — deploy to any static host (Netlify, Vercel, Cloudflare Pages)
```

---

## Branding & Content

All brand copy, company name, emails, and navigation links are centralized in:

```
src/constants/brand.js
```

Update that file once to propagate changes everywhere.

---

## Contact Form

The form uses [Web3Forms](https://web3forms.com) for email delivery. No backend or server is required.

To activate:
1. Create a free account at web3forms.com
2. Copy your access key
3. Add it to `.env` as `VITE_WEB3FORMS_ACCESS_KEY`

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
