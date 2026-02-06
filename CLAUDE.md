# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Aurigital corporate website — a bilingual (ES/EN) static site for a Costa Rican technology agency. Built with Next.js 15 (App Router) and exported as a fully static site (no SSR/server components in practice).

## Commands

```bash
npm run dev              # Start dev server with Turbopack
npm run build            # Production build (static export to /out)
npm run build:compressed # Build with Gzip + Brotli compression
npm run start            # Serve static /out directory on port 3000
npm run lint             # ESLint (next/core-web-vitals)
```

## Architecture

### Routing & Pages

Uses Next.js App Router with route groups. Pages live under `app/(pages)/`:
- `/` — Home (`app/page.jsx`)
- `/servicios` — Services
- `/proyectos` — Portfolio
- `/sobrenosotros` — About
- `/plan-paz-mental` — Premium support service

### Component Organization

Components in `app/components/` are organized by page:
- `home/`, `servicios/`, `proyectos/`, `sobrenosotros/`, `plan-paz-mental/` — page-specific components
- `ui/` — reusable UI primitives
- Root-level shared components: `Navbar.jsx`, `Footer.jsx`, `ContactModal.jsx`, `ChatBot.jsx`

### Global State (React Context)

Four context providers wrap the app in `app/layout.js`:
- **LanguageProvider** (`app/context/LanguageContext.jsx`) — ES/EN switching, persisted to localStorage
- **LoadingProvider** (`app/context/LoadingContext.jsx`) — initial loading screen
- **ContactModalProvider** (`app/context/ContactModalContext.jsx`) — global contact modal toggle
- **ChatProvider** (`app/context/ChatContext.js`) — chatbot open/close state

### Internationalization

Custom i18n implementation (not next-intl). Translation files:
- `app/i18n/locales/es.json` (~965 lines)
- `app/i18n/locales/en.json` (~966 lines)

Access translations via `useLanguage()` hook from `LanguageContext`. All user-facing text should use translation keys.

### Styling

- **Tailwind CSS 3.4** — primary styling approach
- Brand color: `#B2FF00` (lime green) on dark background `#101010`
- Custom fonts: Qurova (5 weights), Mansfield (9 weights), Questrial — loaded via `@font-face` in `globals.css`
- Path alias: `@/*` maps to project root

### Animation Libraries

Three animation systems are used:
- **Framer Motion** — page transitions and component animations
- **GSAP** — complex scroll-driven animations
- **AOS** — simple scroll-triggered animations

### Performance Patterns

- Almost all components are client components (`"use client"`)
- Heavy use of `next/dynamic` with `ssr: false` for code splitting
- Static export mode (`output: 'export'` in `next.config.js`) — images are unoptimized
- Gzip + Brotli compression available via `build:compressed`

### External Integrations

- **EmailJS** — contact form submissions (configured in `ContactModal.jsx`)
- **Make.com webhook** — chatbot backend (configured in `ChatBot.jsx`)
- **Analytics** — Meta Pixel, Google Ads, Google Analytics, MailerLite (in `layout.js`)

### Static Assets

Large assets directory at `public/assets/` (~102MB of images and videos). Organized by page (`home/`, `ppm/`).

## Known Gotchas

### Images must use `unoptimized={true}`
Since the site uses static export (`output: 'export'`), Next.js image optimization is unavailable. The global config sets `images.unoptimized: true` in `next.config.js`, but per-component `unoptimized={true}` props were also added historically to be safe.

### iOS video autoplay
iOS Safari restricts video autoplay. Components with background videos (e.g., `Hero.jsx`, `CTA.jsx`) detect iOS via user agent and skip `video.play()`. They also set `poster` images as fallbacks and handle `onError` to hide failed videos gracefully.

### Videos: provide both mp4 and webm sources
Video elements should include `<source>` tags for both `.mp4` and `.webm` formats for cross-browser compatibility. Always include `muted`, `loop`, `playsInline`, and `preload="metadata"` attributes.

### Avoid AOS animations on Navbar and above-the-fold elements
AOS (`data-aos`) animations were removed from the Navbar and Footer to fix mobile rendering issues. Navigation elements should not use AOS — use Framer Motion for nav animations if needed.

### Nesting: don't put block elements inside `<p>` tags
Avoid placing `<div>` or other block elements inside `<p>` tags — this causes React hydration warnings. Use `<div>` as the wrapper if children include block-level content.

### Sitemap must be force-static
`app/sitemap.js` uses `export const dynamic = 'force-static'` and hardcoded dates (not `new Date()`) to work with static export.

### Third-party scripts: use lazy loading strategies
MailerLite scripts use `strategy="lazyOnload"` (not `"afterInteractive"`) to avoid blocking initial page load. Analytics scripts (Google Ads, GA) use `strategy="afterInteractive"`.
