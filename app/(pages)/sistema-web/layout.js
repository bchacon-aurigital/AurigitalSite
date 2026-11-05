import { buildMetadata } from '@/app/lib/seo';

export const metadata = buildMetadata({
  title: 'Sistema web a la medida en Costa Rica | Aurigital',
  description:
    'Tienda en línea, catálogo, reservas, tiquetera y dashboards integrados en tu sitio. Aurigital los diseña y programa en código en Costa Rica. Desde $3,500.',
  path: '/sistema-web',
  keywords:
    'sistema web Costa Rica, tienda en línea Costa Rica, ecommerce a la medida, catálogo en línea, tiquetera en línea, control de acceso para eventos, sistema de reservas en línea, cobro por SINPE Móvil, plataforma de cursos en línea, dashboard administrativo, WordPress headless, WooCommerce Costa Rica, desarrollo web Costa Rica',
  ogTitle: 'Un sistema web que trabaja por tu negocio | Aurigital',
  ogDescription:
    'Ecommerce, catálogo en línea, reservas con cobro, tiquetera con control de acceso y dashboards, en un sitio diseñado a la medida y programado en código. Desde $3,500.',
  imageAlt: 'Sistema web a la medida en Costa Rica - Aurigital',
  geo: {
    'geo.region': 'CR',
    'geo.placename': 'Costa Rica',
  },
});

export default function SistemaWebLayout({ children }) {
  return children;
}
