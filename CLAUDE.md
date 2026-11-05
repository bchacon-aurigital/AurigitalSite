# Aurigital Site — CLAUDE.md

## Project Overview
Corporate website for Aurigital, a Costa Rican web development agency. Bilingual (ES/EN) static site built with Next.js 15 App Router and static export.

**Base URL:** https://aurigital.com (non-www, sin barra final — definido en `app/lib/seo.js`)
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
│   ├── seo.js                   # SITE_URL, canonicalUrl(), buildMetadata() — fuente única
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

**Regla #1 — toda ruta nueva necesita su propio `layout.js`.**
Las páginas son `"use client"`, así que no pueden exportar `metadata`: va en el
`layout.js` de la carpeta. Y la metadata del layout raíz **se hereda**,
`alternates.canonical` incluido. Una ruta sin layout propio hereda el canonical
del home y Google deja de indexarla. Así se desindexaron `/servicios`,
`/proyectos` y `/sobrenosotros` hasta nov 2026.

```js
// app/(pages)/mi-ruta/layout.js
import { buildMetadata } from '@/app/lib/seo';

export const metadata = buildMetadata({
  title: 'Título | Aurigital',
  description: '...',
  path: '/mi-ruta',          // canonical y og:url salen de acá, siempre iguales
});

export default function MiRutaLayout({ children }) { return children; }
```

- **URLs:** nunca escribas `https://aurigital.com` a mano. Usá `SITE_URL` o
  `canonicalUrl()` de `app/lib/seo.js`. Host canónico: non-www, sin barra final.
- **`robots`:** se hereda del layout raíz. No lo repitas por página salvo para `noindex`.
- **Open Graph:** una sola imagen para el sitio (`public/og-image.png`), declarada
  en `seo.js`. Si cambiás el archivo, actualizá `OG_IMAGE_WIDTH/HEIGHT`: las
  dimensiones declaradas tienen que coincidir con el archivo real.
- **Schema.org:** helpers en `lib/structuredData.js`. Los schemas referencian la
  organización por `ORG_ID`, no la redeclaran. Nada de `aggregateRating`
  auto-declarado — Google lo trata como reseña falsa.
- **Sitemap:** `export const dynamic = 'force-static'` y fechas como string
  literal (`new Date()` rompe el export). Los `loc` salen de `canonicalUrl()`.
- **`.htaccess`:** vive en `public/.htaccess` y se copia a `out/`. Es lo que
  colapsa www/.html/barra-final a una sola URL. Si no se sube, el sitio vuelve a
  servir 6 URLs por página.
- **Idioma:** el sitio se indexa solo en español (es-CR). El switcher ES/EN es
  client-side sobre la misma URL, así que el inglés **no** es indexable y no hay
  hreflang. Para que el inglés tenga valor SEO harían falta rutas `/en/` reales.

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
