import { buildMetadata } from '@/app/lib/seo';

export const metadata = buildMetadata({
  title: 'Ecosistema web y software a la medida en Costa Rica | Aurigital',
  description:
    'Conectá tu sitio, tus ventas y tu operación en un solo sistema. Aurigital desarrolla plataformas 100% en código, integraciones y monitoreo en tiempo real.',
  path: '/ecosistema-web',
  keywords:
    'ecosistema web, software a la medida Costa Rica, desarrollo de plataformas web a la medida, integración de sistemas, automatización de procesos, plataforma de operaciones, sistema de monitoreo en tiempo real, integración con Google Drive, Google Apps Script, arquitectura headless, sitios de alto tráfico, red de sitios web, desarrollo web Costa Rica',
  ogTitle: 'Un ecosistema web que conecta toda tu operación | Aurigital',
  ogDescription:
    'Plataformas a la medida, integración con las herramientas que ya usás, operación interna y datos en tiempo real, diseñados y programados en código por Aurigital en Costa Rica.',
  imageAlt: 'Ecosistema web y software a la medida en Costa Rica - Aurigital',
  geo: {
    'geo.region': 'CR',
    'geo.placename': 'Costa Rica',
  },
});

export default function EcosistemaWebLayout({ children }) {
  return children;
}
