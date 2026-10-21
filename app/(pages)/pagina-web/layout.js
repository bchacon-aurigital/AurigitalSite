export const metadata = {
  title: 'Página web a la medida en Costa Rica | Aurigital',
  description:
    'Página web diseñada desde cero, sin plantillas y programada en código. Ideal para marcas visuales y portafolios en Costa Rica. Desde $2,000.',
  keywords:
    'página web Costa Rica, diseño de página web a la medida, página web sin plantillas, sitio web profesional, página web para portafolio, diseño web Costa Rica, página web con SEO, correo con dominio propio',
  alternates: {
    canonical: 'https://www.aurigital.com/pagina-web',
  },
  openGraph: {
    title: 'Página web a la medida, a la altura de tu marca | Aurigital',
    description:
      'Aurigital diseña tu página web desde cero en Figma y la programa en código. Rápida, optimizada para SEO y lista para crecer. Desde $2,000.',
    type: 'website',
    url: 'https://www.aurigital.com/pagina-web',
    locale: 'es_CR',
    siteName: 'Aurigital',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Página web a la medida, a la altura de tu marca | Aurigital',
    description:
      'Aurigital diseña tu página web desde cero en Figma y la programa en código. Rápida, optimizada para SEO y lista para crecer. Desde $2,000.',
    creator: '@aurigital',
  },
  other: {
    'geo.region': 'CR',
    'geo.placename': 'Costa Rica',
  },
}

export default function PaginaWebLayout({ children }) {
  return children
}
