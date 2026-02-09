'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { TrendingUp, Target, Award, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';

// B08 - Casos de éxito
export default function CaseStudies({ onScrollToForm, cta, onCTAClick }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [allExpanded, setAllExpanded] = useState(false);

  const toggleExpand = () => {
    setAllExpanded(!allExpanded);
  };

  const cases = [
    {
      icon: Award,
      client: 'CIOCR - Congreso Internacional Odontológico',
      image: 'CIOCR.avif',
      href: 'https://ciocr.org',
      problem: 'Necesitaban un proveedor local que manejara tanto la web como el sistema de control de acceso para su congreso anual',
      solution: 'Sistema completo de inscripciones, ventas de entradas, integración de pagos y dashboard administrativo dinámico',
      result: 'Actualización en tiempo real, transacciones resueltas el mismo día, cronograma dinámico del evento',
      detailedInfo: 'El Colegio de Cirujanos Dentistas de Costa Rica organiza anualmente el Congreso Internacional Odontológico. Para la edición 2026, buscaban un proveedor local después de trabajar con empresas internacionales. Desarrollamos el diseño completo alineado a su público meta (odontólogos y empresas patrocinadoras), implementamos un sistema de reservaciones y compra de inscripciones, integramos pagos, y creamos un dashboard administrativo donde pueden ver transacciones por día, configurar conferencias y horarios. Todo es dinámico y se mantiene actualizado en tiempo real. El cliente está muy satisfecho con el soporte continuo y resolución de problemas en cuestión de horas.',
      color: '#B2FF00'
    },
    {
      icon: Target,
      client: 'Grupo Columbia - Cadena de Emisoras',
      image: 'columbia.avif',
      href: '#',
      problem: 'Sitios pesados, llenos de captchas y publicidad, experiencia móvil terrible, WordPress se caía con tráfico alto',
      solution: 'Rediseño headless con Next.js (frontend) + WordPress (backend), reproductor tipo Spotify, integración con Cloudinary',
      result: 'Cero caídas del servidor, experiencia similar a Spotify, picos masivos en elecciones sin problemas',
      detailedInfo: 'Grupo Columbia opera cuatro estaciones de radio con sitios web pesados, llenos de captchas y publicidad invasiva. La experiencia móvil era terrible y el WordPress se caía con tráfico alto. Rediseñamos los cuatro sitios con arquitectura headless: frontend en Next.js y backend en WordPress para que los editores mantuvieran su flujo de trabajo conocido. Implementamos un reproductor avanzado similar a Spotify (funciona con pantalla bloqueada, permite navegación sin pausar transmisión), hosteamos podcasts en Cloudinary, y desplegamos en Vercel. Ahora el sitio escala automáticamente ante picos de tráfico (especialmente en época de elecciones) sin caerse nunca. Cada emisora tiene su blog de noticias, lista de programas y señal en vivo.',
      color: '#9FE600'
    },
    {
      icon: TrendingUp,
      client: 'Servidental - Equipamiento Médico Dental',
      image: 'servidental.avif',
      href: 'https://servidentalcr.com/',
      problem: 'WordPress desactualizado, sin tiempo para mantenerlo, catálogo limitado y sin funcionalidad de ventas',
      solution: 'Catálogo en Next.js, rediseño con WordPress headless, blog para SEO, e-commerce completo con WooCommerce',
      result: 'De catálogo básico a e-commerce funcional con ventas automáticas, integración Tilopay, evolución constante mes a mes',
      detailedInfo: 'Servidental importa equipo médico especializado (tomógrafos, sillas dentales, taladros) para clínicas y universidades. Desde 2022 trabajamos con ellos. Iniciamos con un catálogo en línea en Next.js desplegado en Vercel. Al ver tracción (consultas mediante screenshots de productos), en 2024 hicimos un rediseño completo con WordPress headless como CMS. Expandimos el catálogo dramáticamente, agregamos repuestos, filtros avanzados, información de servicios técnicos y certificación de equipos de rayos X. Implementamos un blog para SEO y finalmente agregamos e-commerce completo con WooCommerce + Tilopay (0% intereses en tarjetas). El sitio evoluciona constantemente: cupones de descuento, programas de loyalty con puntos, promociones personalizadas. Cada mes agregamos features y el sitio se ha convertido en un asset crítico del negocio.',
      color: '#8FCC00'
    }
  ];

  return (
    <section ref={ref} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-center leading-tight"
        >
          Casos reales: diseño web que eleva la marca y{' '}
          <span className="text-[#B2FF00]">ordena la operación</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-gray-400 mb-12 text-center max-w-3xl mx-auto"
        >
          Resultados medibles con clientes reales
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {cases.map((caseItem, index) => {
            const Icon = caseItem.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-[#1a1a1a] border border-gray-800 rounded-2xl hover:border-[#B2FF00] transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Image Section */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={`/assets/${caseItem.image}`}
                    alt={caseItem.client}
                    fill
                    className="object-cover"
                    unoptimized={true}
                    onError={(e) => {
                      e.target.src = "/assets/AurigitalChat2.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
                  <Icon className="absolute bottom-4 right-4 w-10 h-10" style={{ color: caseItem.color }} />
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {caseItem.client}
                  </h3>

                  <div className="space-y-4 flex-grow">
                    <div>
                      <p className="text-sm font-semibold text-[#B2FF00] mb-1">Problema:</p>
                      <p className="text-gray-300 text-base">{caseItem.problem}</p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#B2FF00] mb-1">Solución:</p>
                      <p className="text-gray-300 text-base">{caseItem.solution}</p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#B2FF00] mb-1">Resultado:</p>
                      <p className="text-white font-semibold text-base">{caseItem.result}</p>
                    </div>

                    {/* Expanded Details */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: allExpanded ? 'auto' : 0,
                        opacity: allExpanded ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-gray-700 mt-4">
                        <p className="text-sm font-semibold text-[#B2FF00] mb-2">Detalles del proyecto:</p>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {caseItem.detailedInfo}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Ver más button - Only show on first card */}
                  {index === 0 && (
                    <button
                      onClick={toggleExpand}
                      className="mt-6 flex items-center justify-center gap-2 text-[#B2FF00] hover:text-[#9FE600] text-sm font-semibold transition-colors"
                    >
                      {allExpanded ? (
                        <>
                          Ver menos <ChevronUp className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          Ver más detalles <ChevronDown className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <button
            onClick={() => {
              onCTAClick?.('case_studies');
              onScrollToForm();
            }}
            className="px-8 py-4 bg-[#B2FF00] text-[#101010] font-bold rounded-lg hover:bg-[#9FE600] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#B2FF00]/20 text-lg"
          >
            {cta?.primary || 'Solicitar cotización'}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
