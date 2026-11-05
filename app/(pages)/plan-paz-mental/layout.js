import { buildMetadata } from '@/app/lib/seo';

export const metadata = buildMetadata({
  title: 'Plan Paz Mental - Soporte Web 24/7 | Aurigital Costa Rica',
  description:
    'Tu aliado tecnológico 24/7. Mantenimiento web, soporte premium, actualizaciones ilimitadas y tranquilidad total para tu sitio web. Desde $125/mes en Costa Rica.',
  path: '/plan-paz-mental',
  keywords: [
    'plan paz mental',
    'soporte web 24/7 Costa Rica',
    'mantenimiento web Costa Rica',
    'actualizaciones web ilimitadas',
    'soporte técnico premium',
    'hosting administrado Costa Rica',
    'respaldo web automático',
    'monitoreo web continuo',
    'seguridad web Costa Rica',
    'Aurigital soporte',
    'servicio web mensual',
    'tranquilidad tecnológica',
  ],
  ogTitle: 'Plan Paz Mental - Tu Tranquilidad Tecnológica Garantizada',
  ogDescription:
    'Enfócate en hacer crecer tu negocio mientras nosotros nos encargamos de todo lo técnico. Soporte 24/7, actualizaciones ilimitadas y cero costos ocultos.',
  imageAlt: 'Plan Paz Mental - Soporte Web 24/7 por Aurigital',
  geo: {
    'geo.region': 'CR',
    'geo.placename': 'Costa Rica',
  },
});

export default function PlanPazMentalLayout({ children }) {
  return children;
}
