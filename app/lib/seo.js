/**
 * Fuente única de verdad para la identidad SEO del sitio.
 *
 * Host canónico: non-www, https, SIN barra final.
 * Nunca escribas una URL absoluta a mano en metadata: usá `canonicalUrl()` o
 * `buildMetadata()`. Así el canonical, el og:url y el sitemap no se pueden
 * desincronizar entre ellos.
 */

export const SITE_URL = 'https://aurigital.com';
export const SITE_NAME = 'Aurigital';
export const SITE_LOCALE = 'es_CR';
export const TWITTER_HANDLE = '@aurigital';

/**
 * Imagen Open Graph del sitio (public/og-image.png).
 * Las dimensiones declaradas tienen que coincidir con el archivo real: si no,
 * Facebook y LinkedIn recortan o descartan la preview.
 */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 650;

/**
 * Ancla de la entidad de marca en Schema.org. El nodo `Organization` completo
 * se declara una sola vez (layout raíz); cualquier otro schema del sitio debe
 * referenciar este `@id` en vez de redeclarar la organización, para que Google
 * consolide una entidad en lugar de varias compitiendo entre sí.
 */
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * URL absoluta canónica a partir de una ruta.
 * canonicalUrl('/')            -> 'https://aurigital.com'
 * canonicalUrl('/sistema-web') -> 'https://aurigital.com/sistema-web'
 * canonicalUrl('sistema-web/') -> 'https://aurigital.com/sistema-web'
 */
export const canonicalUrl = (path = '/') => {
  const clean = String(path).trim().replace(/^\/+|\/+$/g, '');
  return clean ? `${SITE_URL}/${clean}` : SITE_URL;
};

/**
 * Construye el objeto `metadata` de una ruta con canonical y Open Graph
 * siempre apuntando a la misma URL.
 *
 * `robots` se hereda del layout raíz: no lo repitas por página salvo que
 * necesites excluir la ruta del índice.
 *
 * @param {object}       o
 * @param {string}       o.title          <title> y og:title por defecto
 * @param {string}       o.description    meta description y og:description por defecto
 * @param {string}       o.path           ruta de la página, ej. '/sistema-web'
 * @param {string|string[]} [o.keywords]
 * @param {string}       [o.ogTitle]      og/twitter title si querés uno distinto al <title>
 * @param {string}       [o.ogDescription]
 * @param {string}       [o.image]        URL absoluta de la OG. Por defecto la del sitio.
 *                                        Si pasás una propia tiene que ser jpg/png
 *                                        (avif y webp no los lee Facebook/LinkedIn).
 * @param {string}       [o.imageAlt]
 * @param {object}       [o.geo]          meta tags geo heredadas, ej. { 'geo.region': 'CR' }
 * @param {object}       [o.robots]       solo para noindex u overrides puntuales
 */
export function buildMetadata({
  title,
  description,
  path,
  keywords,
  ogTitle,
  ogDescription,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  geo,
  robots,
}) {
  const url = canonicalUrl(path);
  const socialTitle = ogTitle ?? title;
  const socialDescription = ogDescription ?? description;

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: SITE_LOCALE,
      siteName: SITE_NAME,
      url,
      title: socialTitle,
      description: socialDescription,
      images: [
        {
          url: image,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: imageAlt ?? socialTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: socialTitle,
      description: socialDescription,
      images: [image],
    },
    ...(geo ? { other: geo } : {}),
    ...(robots ? { robots } : {}),
  };
}
