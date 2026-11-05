import { buildMetadata } from '@/app/lib/seo';

export const metadata = buildMetadata({
  title: 'Desarrollo Web Costa Rica, Páginas Web a Medida | Aurigital',
  description:
    'Desarrollo web en Costa Rica para marcas con reputación: implementación sólida, performance y automatizaciones para darte más libertad operativa.',
  path: '/desarrollo-web',
  keywords:
    'desarrollo web costa rica, desarrollo de páginas web, desarrollo web profesional, programación web costa rica, desarrollo web a medida',
  imageAlt: 'Desarrollo web a medida en Costa Rica - Aurigital',
  geo: {
    'geo.region': 'CR',
    'geo.placename': 'Costa Rica',
  },
});

export default function DesarrolloWebLayout({ children }) {
  return children;
}
