import "./globals.css";
import { LoadingProvider } from "./context/LoadingContext";
import { ContactModalProvider } from "./context/ContactModalContext";
import { LanguageProvider } from "./context/LanguageContext";
import LanguageSwitcher from "./components/LanguageSwitcher";
import SmoothScroll from "./components/SmoothScroll";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import Script from "next/script";
export const metadata = {
  metadataBase: new URL("https://aurigital.com/"),
  title: {
    default:
      "Aurigital - Sitios Web para Marcas que se Destacan | Desarrollo Web Costa Rica",
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  description:
    "Creamos sitios web estratégicos para marcas líderes en Costa Rica. Desarrollo web a medida, diseño profesional y experiencias digitales que impulsan tu crecimiento online.",
  keywords: [
    "desarrollo web Costa Rica",
    "diseño web profesional",
    "sitios web a medida",
    "agencia digital Costa Rica",
    "desarrollo web San José",
    "páginas web empresariales",
    "ecommerce Costa Rica",
    "blog profesional",
    "catálogo online",
    "agenda web",
    "landing pages",
    "SEO Costa Rica",
    "programación web",
    "marcas digitales",
    "plan paz mental",
    "soporte web 24/7",
    "mantenimiento web Costa Rica",
  ],
  authors: [{ name: "Aurigital Team" }],
  creator: "Aurigital",
  publisher: "Aurigital",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CR",
    url: "https://aurigital.com",
    siteName: "Aurigital",
    title: "Aurigital - Sitios Web para Marcas que se Destacan",
    description:
      "Creamos páginas web estratégicas para marcas líderes en Costa Rica. Desarrollo web a medida, diseño web profesional y experiencias digitales que impulsan tu crecimiento online.",
  },
  alternates: {
    canonical: "https://aurigital.com",
    languages: {
      "es-CR": "https://aurigital.com",
      "en-US": "https://aurigital.com/en",
    },
  },
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Aurigital",
  description:
    "Agencia de desarrollo web especializada en sitios web estratégicos para marcas líderes en Costa Rica",
  url: "https://aurigital.com",
  logo: "https://aurigital.com/assets/logo.svg",
  email: "hola@aurigital.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "San José",
    addressLocality: "San José",
    addressRegion: "San José",
    postalCode: "10101",
    addressCountry: "CR",
  },
  foundingDate: "2023",
  numberOfEmployees: "5-10",
  serviceArea: {
    "@type": "Country",
    name: "Costa Rica",
  },
  areaServed: "Costa Rica",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de Desarrollo Web",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Desarrollo Web",
          description: "Desarrollo de sitios web a medida",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Diseño Web",
          description: "Diseño web profesional y estratégico",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Ecommerce",
          description: "Tiendas online intuitivas y seguras",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Blog Profesional",
          description: "Blogs integrados para posicionamiento",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Plan Paz Mental",
          description: "Servicio de mantenimiento y soporte web 24/7",
        },
      },
    ],
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com/aurigital",
    "https://www.facebook.com/aurigital",
    "https://www.linkedin.com/company/aurigital",
  ],
  knowsAbout: [
    "Desarrollo Web",
    "Diseño Web",
    "E-commerce",
    "SEO",
    "Landing Pages",
    "Blogs Profesionales",
    "Catálogos Online",
    "Sistemas de Agendamiento",
    "Plan Paz Mental",
    "Soporte Web 24/7",
    "Mantenimiento Web",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Performance optimizations */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#101010" />

        {/* Links and meta tags only - NO SCRIPTS */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&family=Questrial&family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body>
        <GoogleTagManager gtmId="GTM-54NM6CMV" />
        {/* ALL SCRIPTS MOVED TO BODY */}
        
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1416522006230127');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* Meta Pixel noscript fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1416522006230127&ev=PageView&noscript=1"
          />
        </noscript>

        {/* Google Ads */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17131483110"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17131483110', {
              'send_page_view': true
            });
          `}
        </Script>

        {/* Google Analytics */}

        {/* Rybbit Analytics */}
        <Script
          src="https://app.rybbit.io/api/script.js"
          data-site-id="c60e1086b6da"
          strategy="afterInteractive"
        />

        {/* MailerLite */}
        <Script id="mailerlite" strategy="afterInteractive">
          {`
            (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
            .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
            n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
            (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
            ml('account', '1023137');
          `}
        </Script>

        {/* MailerLite Forms */}
        <Script
          src="https://groot.mailerlite.com/js/w/webforms.min.js?v176e10baa5e7ed80d35ae235be3d5024"
          strategy="lazyOnload"
        />

        <Script id="mailerlite-form-load" strategy="lazyOnload">
          {`
            if (typeof ml !== 'undefined') {
              setTimeout(() => {
                fetch("https://assets.mailerlite.com/jsonp/1023137/forms/156290847285970148/takel")
                  .catch(err => console.log('MailerLite form load failed:', err));
              }, 2000);
            }
          `}
        </Script>

        {/* React Components */}
        <LanguageProvider>
          <ContactModalProvider>
            <LoadingProvider>
              <SmoothScroll />
              {children}
              <LanguageSwitcher />
            </LoadingProvider>
          </ContactModalProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}