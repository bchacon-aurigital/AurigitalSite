export default function sitemap() {
  const baseUrl = 'https://www.aurigital.com';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
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
      lastModified: new Date(),
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
      lastModified: new Date(),
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
      lastModified: new Date(),
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