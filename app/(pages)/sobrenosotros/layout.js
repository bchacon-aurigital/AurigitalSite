import { buildMetadata } from '@/app/lib/seo';

export const metadata = buildMetadata({
  title: 'Sobre Nosotros, Agencia de Desarrollo Web en Costa Rica | Aurigital',
  description:
    'Nacimos entre cafés de San José para ayudar a marcas con propósito a tener presencia digital real. Sin plantillas, sin promesas vacías. Conocé al equipo de Aurigital.',
  path: '/sobrenosotros',
  keywords: [
    'sobre Aurigital',
    'agencia de desarrollo web Costa Rica',
    'equipo desarrollo web Costa Rica',
    'agencia digital San José',
    'quiénes somos Aurigital',
  ],
  ogTitle: 'Somos el puente entre la tecnología y la gente que la necesita',
  ogDescription:
    'Pensá en nosotros como tu fuente de experiencia tecnológica: inteligencia, análisis y soporte técnico para que te enfoqués en tu negocio.',
  imageAlt: 'El equipo de Aurigital, agencia de desarrollo web en Costa Rica',
  geo: {
    'geo.region': 'CR-SJ',
    'geo.placename': 'San José, Costa Rica',
  },
});

export default function SobreNosotrosLayout({ children }) {
  return children;
}
