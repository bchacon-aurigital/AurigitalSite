import { buildMetadata } from '@/app/lib/seo';

export const metadata = buildMetadata({
  title: 'Diseño Web Alajuela, Webs Premium a Medida | Aurigital',
  description:
    'Diseño web Alajuela a medida: prototipo navegable, UI alineada a tu marca, web rápida y móvil impecable. Para marcas con reputación.',
  path: '/diseno-web-alajuela',
  keywords: [
    'diseño web Alajuela',
    'páginas web Alajuela',
    'agencia diseño web Alajuela',
    'diseño web Costa Rica',
    'web a medida Alajuela',
    'diseño web profesional Alajuela',
    'agencia web Alajuela Costa Rica',
    'sitios web Alajuela',
  ],
  imageAlt: 'Diseño Web Alajuela - Aurigital',
  geo: {
    'geo.region': 'CR-A',
    'geo.placename': 'Alajuela, Costa Rica',
    'geo.position': '10.0162;-84.2149',
    ICBM: '10.0162, -84.2149',
  },
});

export default function DisenoWebAlajuelaLayout({ children }) {
  return children;
}
