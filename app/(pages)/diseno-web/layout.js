import { buildMetadata } from '@/app/lib/seo';

export const metadata = buildMetadata({
  title: 'Diseño Web Costa Rica, Páginas Web a Medida | Aurigital',
  description:
    'Diseño web en Costa Rica para marcas con reputación: UX/UI alineado a tu identidad y automatizaciones (agenda, formularios, pagos) para darte más libertad.',
  path: '/diseno-web',
  keywords:
    'diseño web costa rica, páginas web costa rica, sitios web costa rica, desarrollo web, diseño web profesional',
  imageAlt: 'Diseño web a medida en Costa Rica - Aurigital',
  geo: {
    'geo.region': 'CR',
    'geo.placename': 'Costa Rica',
  },
});

export default function DisenoWebLayout({ children }) {
  return children;
}
