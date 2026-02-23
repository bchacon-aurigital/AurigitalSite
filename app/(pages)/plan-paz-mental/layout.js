export const metadata = {
  title: "Plan Paz Mental - Soporte Web 24/7 | Aurigital Costa Rica",
  description: "Tu aliado tecnológico 24/7. Mantenimiento web, soporte premium, actualizaciones ilimitadas y tranquilidad total para tu sitio web. Desde $125/mes en Costa Rica.",
  keywords: [
    "plan paz mental",
    "soporte web 24/7 Costa Rica",
    "mantenimiento web Costa Rica",
    "actualizaciones web ilimitadas",
    "soporte técnico premium",
    "hosting administrado Costa Rica",
    "respaldo web automático",
    "monitoreo web continuo",
    "seguridad web Costa Rica",
    "Aurigital soporte",
    "servicio web mensual",
    "tranquilidad tecnológica"
  ],
  openGraph: {
    title: "Plan Paz Mental - Tu Tranquilidad Tecnológica Garantizada",
    description: "Enfócate en hacer crecer tu negocio mientras nosotros nos encargamos de todo lo técnico. Soporte 24/7, actualizaciones ilimitadas y cero costos ocultos.",
    url: "https://aurigital.com/plan-paz-mental",
    siteName: "Aurigital",
    type: "website",
    locale: "es_CR",
    images: [
      {
        url: "https://aurigital.com/assets/plan-paz-mental-og.jpg",
        width: 1200,
        height: 630,
        alt: "Plan Paz Mental - Soporte Web 24/7 por Aurigital"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Plan Paz Mental - Soporte Web 24/7 | Aurigital",
    description: "Tu aliado tecnológico que te permite enfocarte en hacer crecer tu negocio. Soporte premium, actualizaciones ilimitadas desde $125/mes.",
    images: ["https://aurigital.com/assets/plan-paz-mental-og.jpg"]
  },
  alternates: {
    canonical: "https://aurigital.com/plan-paz-mental",
    languages: {
      "es-CR": "https://aurigital.com/plan-paz-mental",
      "en-US": "https://aurigital.com/en/plan-paz-mental"
    }
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function PlanPazMentalLayout({ children }) {
  return children;
}