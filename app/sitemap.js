export const dynamic = 'force-static';

export default function sitemap() {
  const baseUrl = 'https://www.aurigital.com';
  const lastModified = '2025-02-06';

  return [
    {
      url: baseUrl,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/pagina-web`,
      lastModified: '2026-10-19',
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/diseno-web`,
      lastModified: lastModified,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/desarrollo-web`,
      lastModified: lastModified,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/proyectos`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sobrenosotros`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/plan-paz-mental`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/diseno-web-san-jose`,
      lastModified: '2026-05-06',
      changeFrequency: 'monthly',
      priority: 0.85,
      alternates: {
        languages: {
          es: `${baseUrl}/diseno-web-san-jose`,
        },
      },
    },
    {
      url: `${baseUrl}/diseno-web-alajuela`,
      lastModified: '2026-04-24',
      changeFrequency: 'monthly',
      priority: 0.85,
      alternates: {
        languages: {
          es: `${baseUrl}/diseno-web-alajuela`,
        },
      },
    },
    {
      url: `${baseUrl}/diseno-web-abogados`,
      lastModified: '2026-05-08',
      changeFrequency: 'monthly',
      priority: 0.85,
      alternates: {
        languages: {
          es: `${baseUrl}/diseno-web-abogados`,
        },
      },
    },
  ];
} 