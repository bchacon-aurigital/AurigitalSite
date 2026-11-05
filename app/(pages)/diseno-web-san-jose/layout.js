import { buildMetadata } from '@/app/lib/seo';

export const metadata = buildMetadata({
  title: 'Diseño Web San José, Webs Premium a Medida | Aurigital',
  description:
    'Diseño web San José a medida: prototipo navegable, UI alineada a tu marca, web rápida y móvil impecable. Para marcas con reputación.',
  path: '/diseno-web-san-jose',
  keywords: [
    'diseño web San José',
    'páginas web San José',
    'agencia diseño web San José',
    'diseño web Costa Rica',
    'web a medida San José',
    'diseño web profesional San José',
    'agencia web San José Costa Rica',
    'sitios web San José',
  ],
  imageAlt: 'Diseño Web San José - Aurigital',
  geo: {
    'geo.region': 'CR-SJ',
    'geo.placename': 'San José, Costa Rica',
    'geo.position': '9.9281;-84.0907',
    ICBM: '9.9281, -84.0907',
  },
});

export default function DisenoWebSanJoseLayout({ children }) {
  return children;
}
