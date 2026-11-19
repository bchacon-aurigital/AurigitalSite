import { buildMetadata } from '@/app/lib/seo';

export const metadata = buildMetadata({
  title: 'Blog de Diseño y Desarrollo Web | Aurigital',
  description:
    'Ideas, tendencias y conocimientos sobre diseño UI/UX, desarrollo web y noticias, escritos por el equipo de Aurigital en Costa Rica.',
  path: '/blog',
  keywords: [
    'blog diseño web',
    'blog desarrollo web',
    'diseño UI/UX',
    'diseño web Costa Rica',
    'desarrollo web Costa Rica',
    'Aurigital',
  ],
});

export default function BlogLayout({ children }) {
  return children;
}
