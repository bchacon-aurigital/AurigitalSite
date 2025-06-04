export const dynamic = 'force-static';

export default function sitemap() {
  const baseUrl = 'https://www.aurigital.com';
  const lastModified = '2024-01-01';

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
  ];
} 