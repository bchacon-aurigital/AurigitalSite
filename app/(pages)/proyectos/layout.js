import { buildMetadata } from '@/app/lib/seo';

export const metadata = buildMetadata({
  title: 'Portafolio de Proyectos Web en Costa Rica | Aurigital',
  description:
    'Casos reales de marcas líderes que confiaron su presencia digital a Aurigital: sitios a medida, ecommerce, sistemas de reservas y plataformas en código.',
  path: '/proyectos',
  keywords: [
    'portafolio diseño web Costa Rica',
    'proyectos web Costa Rica',
    'casos de éxito desarrollo web',
    'ejemplos de páginas web profesionales',
    'agencia web portafolio',
  ],
  ogTitle: 'Inspiración en acción, el portafolio de Aurigital',
  ogDescription:
    'La visión digital de marcas que entienden el poder de una presencia online excepcional. Cada proyecto, una colaboración profunda.',
  imageAlt: 'Portafolio de proyectos web de Aurigital',
  geo: {
    'geo.region': 'CR',
    'geo.placename': 'Costa Rica',
  },
});

export default function ProyectosLayout({ children }) {
  return children;
}
