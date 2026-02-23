# Aurigital Site — CLAUDE.md

## Project Overview
Corporate website for Aurigital, a Costa Rican web development agency. Bilingual (ES/EN) static site built with Next.js 15 App Router and static export.

**Base URL:** https://www.aurigital.com
**Build output:** `/out` (static export, no SSR)

---

## Tech Stack
- **Framework:** Next.js 15.3.x (App Router, `output: 'export'`)
- **React:** 19.0.0
- **Styling:** Tailwind CSS 3.4.x
- **Animations:** Framer Motion, GSAP + ScrollTrigger, AOS, Lenis (smooth scroll)
- **Icons:** Lucide React, React Icons
- **Carousel:** Swiper
- **Email:** EmailJS Browser
- **i18n:** Custom React Context (not next-intl)
- **Analytics:** Google Analytics, Google Ads, Meta Pixel, Rybbit, MailerLite

---

## Commands
```bash
npm run dev              # Dev server with Turbopack
npm run build            # Static export to /out
npm run build:compressed # Build + Gzip + Brotli compression
npm run start            # Serve /out on port 3000
npm run lint             # ESLint (next/core-web-vitals)
```

---

## Project Structure
```
app/
├── (pages)/             # Route groups
│   ├── page.jsx         # / Home
│   ├── servicios/       # /servicios
│   ├── proyectos/       # /proyectos
│   ├── sobrenosotros/   # /sobrenosotros
│   ├── plan-paz-mental/ # /plan-paz-mental
│   ├── diseno-web/      # /diseno-web
│   └── desarrollo-web/  # /desarrollo-web
├── components/
│   ├── home/            # Home page components
│   ├── servicios/       # Services page components
│   ├── proyectos/       # Portfolio components
│   ├── sobrenosotros/   # About page components
│   ├── plan-paz-mental/ # PPM page components
│   ├── ServiciosPages/  # Reusable service detail components
│   ├── ui/              # Shared UI primitives
│   ├── seo/             # SEO components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ContactModal.jsx
│   ├── LanguageSwitcher.jsx
│   ├── SmoothScroll.jsx
│   └── LoadingScreen.jsx
├── context/
│   ├── LanguageContext.jsx      # ES/EN switching (localStorage)
│   ├── ContactModalContext.jsx  # Global contact modal
│   └── LoadingContext.jsx       # Initial loading state (1s delay)
├── hooks/
│   └── useContactAction.js      # Utilities to open contact modal
├── lib/
│   ├── structuredData.js        # Schema.org helpers (LocalBusiness, FAQ, etc.)
│   └── analytics.js             # GA/Ads event tracking utilities
├── i18n/locales/
│   ├── es.json                  # ~1500 lines — Spanish translations
│   └── en.json                  # ~1500 lines — English translations
├── layout.js                    # Root layout, all providers, metadata, scripts
├── globals.css                  # @font-face declarations, Tailwind directives
└── sitemap.js                   # Static sitemap (force-static)
```

---

## Key Patterns & Conventions

### Components
- All components use `"use client"` — no server components in practice
- PascalCase filenames: `Hero.jsx`, `ContactModal.jsx`
- Heavy use of `next/dynamic` with `ssr: false` for code splitting:
  ```jsx
  const Component = dynamic(() => import("./path/Component"), { ssr: false });
  ```

### Internationalization
- Custom i18n via `LanguageContext.jsx` (NOT next-intl)
- Hook: `useLanguage()` → returns `{ t, language, changeLanguage }`
- All user-facing text must use translation keys from `i18n/locales/`
- Language persisted to `localStorage`

### Global State (React Context only — no Redux/Zustand)
- `useLanguage()` — language + translations
- `useContactModal()` — open/close contact modal

### Contact / Email
- EmailJS: `service_ba3ue64` / `template_l7fbzsj` / key `MFxAFrK4GqfW_l4gZ`
- Open modal via `useContactAction()` hook or `withContactAction(Component)` HOC
- Honeypot field for spam prevention

### Brand Colors & Fonts
- Primary: `#B2FF00` (lime green)
- Background: `#101010` (dark)
- Custom fonts: `font-qurova`, `font-mansfield`, `font-questrial`, `font-redhat`, `font-space`

### Animations
- **AOS:** `data-aos` attributes — avoid on Navbar and Footer (mobile rendering issues)
- **Framer Motion:** Page transitions, modals, navigation animations
- **GSAP:** Scroll-triggered animations
- **Lenis:** Smooth scroll setup in `SmoothScroll.jsx`

### Images & Videos
- All `next/image` require `unoptimized={true}` (static export has no image optimization)
- Videos: always include `.mp4` + `.webm` sources, plus `muted loop playsInline preload="metadata"` and a `poster` image
- iOS autoplay: detect via `navigator.userAgent`, skip `video.play()` on iOS, use poster as fallback

### SEO
- Schema.org helpers in `lib/structuredData.js`
- Sitemap: must use `export const dynamic = 'force-static'` and hardcoded date strings (not `new Date()`)
- hreflang alternates configured in `layout.js` metadata

---

## Analytics IDs
- Google Analytics: `G-F79B9ETYTY`
- Google Ads: `AW-17131483110`
- Meta Pixel: `1416522006230127`
- Rybbit: `c60e1086b6da`
- MailerLite: `1023137`

---

## Common Gotchas
- Never nest `<div>` inside `<p>` — causes React hydration warnings
- Modals must set `document.body.style.overflow = 'hidden'` and clean up on unmount
- Scripts: MailerLite → `strategy="lazyOnload"`, Analytics → `strategy="afterInteractive"`
- `new Date()` in sitemap breaks static export — use hardcoded date strings
- `output: 'export'` means no ISR, no API routes, no server actions
