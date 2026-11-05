import { buildMetadata } from '@/app/lib/seo';

export const metadata = buildMetadata({
  title: 'Servicios de Diseño y Desarrollo Web en Costa Rica | Aurigital',
  description:
    'Diseño web, desarrollo a medida, ecommerce y mantenimiento continuo. Conocé los servicios con los que Aurigital construye la presencia digital de marcas líderes en Costa Rica.',
  path: '/servicios',
  keywords: [
    'servicios de diseño web Costa Rica',
    'servicios de desarrollo web',
    'agencia web Costa Rica',
    'desarrollo web a medida',
    'ecommerce Costa Rica',
    'mantenimiento web Costa Rica',
  ],
  ogTitle: 'Servicios que hacen que aproveches la tecnología con un acabado de primera',
  ogDescription:
    'Acompañamiento estratégico, soluciones en evolución constante y diseño a medida. Así trabajamos en Aurigital.',
  imageAlt: 'Servicios de diseño y desarrollo web de Aurigital',
  geo: {
    'geo.region': 'CR',
    'geo.placename': 'Costa Rica',
  },
});

export default function ServiciosLayout({ children }) {
  return children;
}
