import "./globals.css";
import { LoadingProvider } from './context/LoadingContext';
import { ContactModalProvider } from './context/ContactModalContext';
import { LanguageProvider } from './context/LanguageContext';
import LanguageSwitcher from './components/LanguageSwitcher';
import ChatBot from './components/ChatBot';
import Script from 'next/script';

export const metadata = {
  metadataBase: new URL('https://www.aurigital.com/'),
  title: {
    default: 'Aurigital - Sitios Web para Marcas que se Destacan | Desarrollo Web Costa Rica',
    template: '%s | Aurigital'
  },
  description: 'Creamos sitios web estratégicos para marcas líderes en Costa Rica. Desarrollo web a medida, diseño profesional y experiencias digitales que impulsan tu crecimiento online.',
  keywords: [
    'desarrollo web Costa Rica',
    'diseño web profesional',
    'sitios web a medida',
    'agencia digital Costa Rica',
    'desarrollo web San José',
    'páginas web empresariales',
    'e-commerce Costa Rica',
    'blog profesional',
    'catálogo online',
    'agenda web',
    'landing pages',
    'SEO Costa Rica',
    'programación web',
    'marcas digitales'
  ],
  authors: [{ name: 'Aurigital Team' }],
  creator: 'Aurigital',
  publisher: 'Aurigital',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_CR',
    url: 'https://www.aurigital.com',
    siteName: 'Aurigital',
    title: 'Aurigital - Sitios Web para Marcas que se Destacan',
    description: 'Creamos sitios web estratégicos para marcas líderes en Costa Rica. Desarrollo web a medida, diseño profesional y experiencias digitales que impulsan tu crecimiento online.',
  },
  alternates: {
    canonical: 'https://www.aurigital.com',
    languages: {
      'es-CR': 'https://www.aurigital.com',
      'en-US': 'https://www.aurigital.com/en',
    },
  }
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Aurigital",
  "description": "Agencia de desarrollo web especializada en sitios web estratégicos para marcas líderes en Costa Rica",
  "url": "https://www.aurigital.com",
  "logo": "https://www.aurigital.com/assets/logo.svg",
  "email": "info@aurigital.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "San José",
    "addressLocality": "San José",
    "addressRegion": "San José",
    "postalCode": "10101",
    "addressCountry": "CR"
  },
  "foundingDate": "2023",
  "numberOfEmployees": "5-10",
  "serviceArea": {
    "@type": "Country",
    "name": "Costa Rica"
  },
  "areaServed": "Costa Rica",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios de Desarrollo Web",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Desarrollo Web",
          "description": "Desarrollo de sitios web a medida"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Diseño Web",
          "description": "Diseño web profesional y estratégico"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "E-commerce",
          "description": "Tiendas online intuitivas y seguras"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Blog Profesional",
          "description": "Blogs integrados para posicionamiento"
        }
      }
    ]
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "08:00",
      "closes": "17:00"
    }
  ],
  "sameAs": [
    "https://www.instagram.com/aurigital",
    "https://www.facebook.com/aurigital",
    "https://www.linkedin.com/company/aurigital"
  ],
  "knowsAbout": [
    "Desarrollo Web",
    "Diseño Web",
    "E-commerce",
    "SEO",
    "Landing Pages",
    "Blogs Profesionales",
    "Catálogos Online",
    "Sistemas de Agendamiento"
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&family=Questrial&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <LanguageProvider>
          <ContactModalProvider>
            <LoadingProvider>
              {children}
              <LanguageSwitcher />
              <ChatBot />
            </LoadingProvider>
          </ContactModalProvider>
        </LanguageProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-F79B9ETYTY" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F79B9ETYTY');
          `}
        </Script>
      </body>
    </html>
  );
}