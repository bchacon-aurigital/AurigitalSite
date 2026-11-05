import { SITE_URL, SITE_NAME, ORG_ID } from './seo';

/**
 * Helpers de Schema.org.
 *
 * Reglas:
 * - Las URLs salen de `SITE_URL`, nunca escritas a mano (ver app/lib/seo.js).
 * - Los schemas que representan a Aurigital referencian `ORG_ID` en vez de
 *   redeclarar la organización, para no fragmentar la entidad.
 * - Nada de `aggregateRating` auto-declarado: Google prohíbe las reseñas que
 *   un negocio se pone a sí mismo y es motivo de acción manual.
 */

export const getLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#localbusiness`,
  "name": SITE_NAME,
  "parentOrganization": { "@id": ORG_ID },
  "image": `${SITE_URL}/assets/LogoNavbarNegro.svg`,
  "url": SITE_URL,
  "telephone": "+506-8888-8169",
  "email": "hola@aurigital.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Escazú",
    "addressLocality": "Escazú",
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
    "https://www.instagram.com/aurigital",
    "https://www.facebook.com/aurigital",
    "https://www.linkedin.com/company/aurigital"
  ],
  "priceRange": "$$-$$$"
});

export const getServiceSchema = (serviceName, description) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": serviceName,
  "provider": { "@id": ORG_ID },
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

// `getAggregateRatingSchema` se eliminó a propósito (nov 2026). Declaraba
// 5★/6 reseñas sobre Aurigital misma, sin nodos `Review` ni reseñas visibles
// en la página, y con `worstRating: "5"` (inválido). Google no permite que un
// negocio publique reseñas sobre sí mismo: es motivo de acción manual.
// Si querés estrellas en los resultados, necesitás reseñas reales de terceros
// marcadas con `Review` individuales y visibles en la página.

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

// Service con precio de entrada — para las páginas de nivel (Página web, Sistema web, Ecosistema web)
export const getLevelServiceSchema = ({
  name,
  serviceType,
  description,
  url,
  price,
  priceCurrency = 'USD'
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": name,
  "serviceType": serviceType,
  "description": description,
  ...(url ? { "url": url } : {}),
  "provider": { "@id": ORG_ID },
  "areaServed": {
    "@type": "Country",
    "name": "Costa Rica"
  },
  // Sin `price` no se emite oferta: el nivel se cotiza según alcance
  ...(price == null ? {} : {
    "offers": {
      "@type": "Offer",
      "price": String(price),
      "priceCurrency": priceCurrency,
      ...(url ? { "url": url } : {}),
      "priceSpecification": {
        "@type": "PriceSpecification",
        "minPrice": String(price),
        "priceCurrency": priceCurrency
      }
    }
  })
});

// HowTo — pasos del proceso de trabajo
export const getHowToSchema = ({ name, description, steps }) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": name,
  ...(description ? { "description": description } : {}),
  "step": steps.map((step, index) => ({
    "@type": "HowToStep",
    "position": index + 1,
    "name": step.name,
    "text": step.text
  }))
});

// ItemList genérico — listados de proyectos, niveles, etc.
export const getItemListSchema = ({ name, items }) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  ...(name ? { "name": name } : {}),
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    ...(item.url ? { "url": item.url } : {})
  }))
});
