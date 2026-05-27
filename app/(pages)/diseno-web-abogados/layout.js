export const metadata = {
  title: 'Diseño Web para Abogados Costa Rica | Aurigital',
  description:
    'Tu bufete necesita un sitio web que transmita autoridad y confianza. Diseño a medida para abogados y firmas legales. Sin plantillas. Con estrategia.',
  keywords: [
    'diseño web para abogados',
    'páginas web para abogados Costa Rica',
    'sitio web para bufete',
    'diseño web jurídico Costa Rica',
    'web para firmas legales',
    'agencia diseño web abogados',
    'diseño web profesional abogados',
    'sitio web bufete Costa Rica',
  ],
  alternates: {
    canonical: 'https://aurigital.com/diseno-web-abogados/',
  },
  openGraph: {
    title: 'Diseño Web para Abogados Costa Rica | Aurigital',
    description:
      'Tu bufete necesita un sitio web que transmita autoridad y confianza. Diseño a medida para abogados y firmas legales. Sin plantillas. Con estrategia.',
    type: 'website',
    url: 'https://aurigital.com/diseno-web-abogados/',
    images: [
      {
        url: 'https://aurigital.com/assets/og-diseno-web-abogados.jpg',
        width: 1200,
        height: 630,
        alt: 'Diseño Web para Abogados - Aurigital',
      },
    ],
    locale: 'es_CR',
    siteName: 'Aurigital',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diseño Web para Abogados Costa Rica | Aurigital',
    description:
      'Tu bufete necesita un sitio web que transmita autoridad y confianza. Diseño a medida para abogados y firmas legales. Sin plantillas. Con estrategia.',
    images: ['https://aurigital.com/assets/og-diseno-web-abogados.jpg'],
    creator: '@aurigital',
  },
  other: {
    'geo.region': 'CR-SJ',
    'geo.placename': 'San José, Costa Rica',
    'geo.position': '9.9281;-84.0907',
    'ICBM': '9.9281, -84.0907',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function DisenoWebAbogadosLayout({ children }) {
  return children
}
