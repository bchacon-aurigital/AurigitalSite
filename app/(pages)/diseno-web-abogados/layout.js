import { buildMetadata } from '@/app/lib/seo';

export const metadata = buildMetadata({
  title: 'Diseño Web para Abogados Costa Rica | Aurigital',
  description:
    'Tu bufete necesita un sitio web que transmita autoridad y confianza. Diseño a medida para abogados y firmas legales. Sin plantillas. Con estrategia.',
  path: '/diseno-web-abogados',
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
  imageAlt: 'Diseño Web para Abogados - Aurigital',
  geo: {
    'geo.region': 'CR-SJ',
    'geo.placename': 'San José, Costa Rica',
    'geo.position': '9.9281;-84.0907',
    ICBM: '9.9281, -84.0907',
  },
});

export default function DisenoWebAbogadosLayout({ children }) {
  return children;
}
