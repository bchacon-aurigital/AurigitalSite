"use client";

import EncabezadoServicios from '@/app/components/ServiciosPages/EncabezadoServicios';
import HeroServicios from '@/app/components/ServiciosPages/HeroServicios';
import TestimoniosServicios from '@/app/components/ServiciosPages/TestimoniosServicios';
import Footer from '@/app/components/ServiciosPages/Footer';

const Servicios = () => {
  return (
    <main className="bg-[#E9E9E9]">

      {/* Hero Diseño Web → video se achica y cae sobre el Encabezado */}
      <HeroServicios
        title={<>Diseño web en<br />Costa Rica para<br />marcas con autoridad</>}
        description="En Aurigital diseñamos páginas web y sitios web a medida (sin plantillas genéricas por defecto) para empresas, PyMEs y emprendedores que necesitan una web que se entienda, se vea profesional y genere contactos reales."
        features={[
          "Prototipo navegable + diseño alineado a tu marca",
          "Experiencia móvil impecable (responsivo) y navegación clara",
          "Sitio rápido, seguro (SSL) y con ruta clara (CTA, formularios)"
        ]}
        videoSrc="/assets/servicios/servicios-pages/VideoHero.mp4"
      />

      <EncabezadoServicios
        title="Agencia de diseño web en Costa Rica para marcas con reputación"
        description="Aurigital es una empresa de diseño web en Costa Rica orientada a negocios top: diseñamos páginas web y sitios web que comunican valor, sostienen tu reputación y guían al usuario a una acción clara (cotizar, agendar o comprar). Presencia visual premium, más claridad, estructura y propósito."
        ctaText="Solicitar cotización"
        secondaryText="Ver paquetes"
        onCtaClick={() => { }}
        onSecondaryClick={() => { }}
      />

      {/* Hero Desarrollo Web → video se achica y cae sobre el Encabezado */}
      <HeroServicios
        title={<>Desarrollo web en<br />Costa Rica para marcas<br />que necesitan una web<br />sólida y lista para operar</>}
        description="En Aurigital hacemos desarrollo web con estándar de producción: implementamos tu sitio desde un prototipo (UX/UI) o desde cero, con performance, seguridad e integraciones que ordenan la operación. Hacemos desarrollo de páginas web principalmente en Costa Rica, y también de forma remota cuando el alcance encaja."
        features={[
          "Implementación fiel al diseño (UX/UI) con navegación clara y móvil impecable",
          "Sitio rápido, estable y seguro (SSL) para sostener reputación y confianza",
          "Integraciones y automatizaciones para reducir trabajo manual (formularios, agenda, pagos)"
        ]}
        videoSrc="/assets/servicios/servicios-pages/VideoHero.mp4"
      />

      <EncabezadoServicios
        title="Servicios de desarrollo web para empresas y marcas personales con reputación"
        description="Aurigital es una agencia de desarrollo web en Costa Rica que ofrece servicio de desarrollo web para empresas, PyMEs y figuras públicas que no pueden improvisar con su presencia digital. Construimos sitios mantenibles, estables y listos para operar, con un proceso claro y continuidad real."
        ctaText="Solicitar cotización"
        secondaryText="Ver paquetes"
        onCtaClick={() => { }}
        onSecondaryClick={() => { }}
      />

      <TestimoniosServicios />

      <Footer />
    </main>
  );
};

export default Servicios;
