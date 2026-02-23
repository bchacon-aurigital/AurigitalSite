export const dynamic = 'force-static';

export default function sitemap() {
  const baseUrl = 'https://aurigital.com';
  const lastModified = '2025-02-06';

  return [
    {
      url: baseUrl,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          es: `${baseUrl}`,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/diseno-web`,
      lastModified: lastModified,
      changeFrequency: 'weekly',
      priority: 0.95,
      alternates: {
        languages: {
          es: `${baseUrl}/diseno-web`,
          en: `${baseUrl}/en/diseno-web`,
        },
      },
    },
    {
      url: `${baseUrl}/desarrollo-web`,
      lastModified: lastModified,
      changeFrequency: 'weekly',
      priority: 0.95,
      alternates: {
        languages: {
          es: `${baseUrl}/desarrollo-web`,
          en: `${baseUrl}/en/desarrollo-web`,
        },
      },
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          es: `${baseUrl}/servicios`,
          en: `${baseUrl}/en/servicios`,
        },
      },
    },
    {
      url: `${baseUrl}/proyectos`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          es: `${baseUrl}/proyectos`,
          en: `${baseUrl}/en/proyectos`,
        },
      },
    },
    {
      url: `${baseUrl}/sobrenosotros`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          es: `${baseUrl}/sobrenosotros`,
          en: `${baseUrl}/en/sobrenosotros`,
        },
      },
    },
    {
      url: `${baseUrl}/plan-paz-mental`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          es: `${baseUrl}/plan-paz-mental`,
          en: `${baseUrl}/en/plan-paz-mental`,
        },
      },
    },
  ];
} 