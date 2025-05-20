import "./globals.css";
import { LoadingProvider } from './context/LoadingContext';
import { ContactModalProvider } from './context/ContactModalContext';
import Script from 'next/script';

export const metadata = {
  metadataBase: new URL('https://www.aurigital.com/'),
  title: '',
  keywords: "",
  openGraph: {
    title: "",
    description: "",
    url: "",
    siteName: "",
    images: [
      {
        url: './',
        width: 1200,
        height: 630,
        alt: ""
      }
    ],
    locale: "es_ES",
    type: "website"
  },
  alternates: {
    canonical: ""
  }
};

const schemaData = {
  "@context": "",
  "@type": "",
  "name": "",
  "description": "",
  "telephone": "",
  "address": {
    "@type": "",
    "streetAddress": "",
    "addressLocality": "",
    "addressRegion": "",
    "postalCode": "",
    "addressCountry": ""
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "17:00"
    }
  ],
  "sameAs": [
    "",
    "",
    ""
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&family=Questrial&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ContactModalProvider>
          <LoadingProvider>
            {children}
          </LoadingProvider>
        </ContactModalProvider>
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