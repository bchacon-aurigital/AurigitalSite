export const getLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Aurigital",
  "image": "https://www.aurigital.com/assets/LogoNavbarNegro.svg",
  "url": "https://www.aurigital.com",
  "telephone": "+506-8888-8169",
  "email": "hola@aurigital.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Escazú",
    "addressLocality": "San José",
    "addressRegion": "San José",
    "postalCode": "10203",
    "addressCountry": "CR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 9.9333,
    "longitude": -84.0833
  },
  "sameAs": [
    "https://instagram.com/aurigital",
    "https://twitter.com/aurigital"
  ],
  "priceRange": "$$-$$$"
});

export const getServiceSchema = (serviceName, description, priceRange) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": serviceName,
  "provider": {
    "@type": "Organization",
    "name": "Aurigital",
    "url": "https://www.aurigital.com"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Costa Rica"
  },
  "description": description,
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": `Paquetes de ${serviceName}`,
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Professional Pack"
        },
        "price": "2000",
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Startup Pack"
        },
        "price": "3450",
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Enterprise Pack"
        },
        "price": "6800",
        "priceCurrency": "USD"
      }
    ]
  }
});

export const getFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const getAggregateRatingSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Aurigital",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "ratingCount": "6",
    "reviewCount": "6",
    "bestRating": "5",
    "worstRating": "5"
  }
});

export const getBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});
