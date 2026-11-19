import { createReader } from '@keystatic/core/reader';
import config from '../keystatic.schema';
import { canonicalUrl } from './lib/seo';

export const dynamic = 'force-static';

/**
 * Sitemap del sitio.
 *
 * Reglas que no se pueden romper:
 * - Las URLs salen de `canonicalUrl()`, nunca escritas a mano. Si el `loc` del
 *   sitemap no coincide EXACTO con el `<link rel="canonical">` de la página
 *   (host, barra final), Google descarta la señal.
 * - `lastModified` tiene que ser un string literal. `new Date()` rompe el
 *   static export.
 * - Toda ruta listada acá necesita su propio layout.js con buildMetadata().
 */
const routes = [
  { path: '/', lastModified: '2026-11-04', changeFrequency: 'monthly', priority: 1 },

  // Niveles de servicio
  { path: '/pagina-web', lastModified: '2026-11-04', changeFrequency: 'weekly', priority: 0.95 },
  { path: '/sistema-web', lastModified: '2026-11-04', changeFrequency: 'weekly', priority: 0.95 },
  { path: '/ecosistema-web', lastModified: '2026-11-04', changeFrequency: 'weekly', priority: 0.95 },

  // Servicios
  { path: '/diseno-web', lastModified: '2026-11-04', changeFrequency: 'weekly', priority: 0.95 },
  { path: '/desarrollo-web', lastModified: '2026-11-04', changeFrequency: 'weekly', priority: 0.95 },
  { path: '/plan-paz-mental', lastModified: '2026-11-04', changeFrequency: 'monthly', priority: 0.9 },

  // Institucionales
  { path: '/servicios', lastModified: '2026-11-04', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/proyectos', lastModified: '2026-11-04', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/sobrenosotros', lastModified: '2026-11-04', changeFrequency: 'monthly', priority: 0.8 },

  // Landings locales / por nicho
  { path: '/diseno-web-san-jose', lastModified: '2026-11-04', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/diseno-web-alajuela', lastModified: '2026-11-04', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/diseno-web-abogados', lastModified: '2026-11-04', changeFrequency: 'monthly', priority: 0.85 },
];

export default async function sitemap() {
  // Artículos publicados del blog (borradores y papelera no entran).
  // La fecha sale del propio artículo, como string literal.
  const reader = createReader(process.cwd(), config);
  const posts = (await reader.collections.posts.all()).filter(
    (p) => p.entry.status === 'published'
  );

  const blogRoutes = [
    {
      path: '/blog',
      lastModified: posts
        .map((p) => p.entry.publishedDate || '')
        .sort()
        .pop() || '2026-11-04',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...posts.map((p) => ({
      path: `/blog/${p.slug}`,
      lastModified: p.entry.publishedDate || '2026-11-04',
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
  ];

  return [...routes, ...blogRoutes].map(({ path, ...rest }) => ({
    url: canonicalUrl(path),
    ...rest,
  }));
}
