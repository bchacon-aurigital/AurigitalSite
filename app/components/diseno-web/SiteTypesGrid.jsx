'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { User, Building2, Building, Calendar, Code } from 'lucide-react';

// B06 - Tipos de páginas/sitios web
export default function SiteTypesGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const siteTypes = [
    {
      icon: User,
      title: 'Sitios web para Marcas Personales',
      description: 'Para figuras y profesionales con reputación: una web que traduzca tu autoridad en presencia digital, con narrativa clara, prueba social y rutas de contacto limpias para que la experiencia se sienta premium.'
    },
    {
      icon: Building2,
      title: 'Sitios web para PyMEs',
      description: 'Para negocios con estándar alto: claridad de oferta, estructura ordenada y una base tecnológica que evita improvisación y te permite crecer sin rehacer el sitio después.'
    },
    {
      icon: Building,
      title: 'Sitio web para empresas a gran escala',
      description: 'Para marcas con operación y equipos: arquitectura robusta, secciones estratégicas, consistencia visual y orden de comunicación para sostener credibilidad y facilitar coordinación.'
    },
    {
      icon: Calendar,
      title: 'Sitios web para Eventos',
      description: 'Para lanzamientos, experiencias y fechas específicas: una ruta clara, estética fuerte y tecnología orientada a registro, agenda o control de acceso, según el caso.'
    }
  ];

  const functionalities = [
    'Ecommerce',
    'Blog',
    'Catálogo en línea',
    'Dashboards administrativos',
    'Agenda en línea',
    'Tiquetera con control de acceso'
  ];

  return (
    <section ref={ref} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12 text-center leading-tight"
        >
          Tipos de páginas web y sitios web que diseñamos en{' '}
          <span className="text-[#B2FF00]">Costa Rica</span>
        </motion.h2>

        {/* Grid de tipos de sitios */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {siteTypes.map((site, index) => {
            const Icon = site.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-8 bg-[#1a1a1a] border border-gray-800 rounded-2xl hover:border-[#B2FF00] transition-all duration-300 hover:transform hover:scale-105"
              >
                <Icon className="w-12 h-12 text-[#B2FF00] mb-4" />
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                  {site.title}
                </h3>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  {site.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Tipos de funcionalidades */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="p-8 bg-gradient-to-br from-[#1a1a1a] to-[#252525] border border-[#B2FF00]/30 rounded-2xl"
        >
          <div className="flex items-start gap-4 mb-6">
            <Code className="w-10 h-10 text-[#B2FF00] flex-shrink-0" />
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Tipos de funcionalidades web
              </h3>
              <p className="text-gray-300 text-base md:text-lg mb-4">
                Estas funcionalidades se integran cuando aplican; si el proyecto requiere lógica privada o flujos complejos, lo abordamos como{' '}
                <a href="/funcionalidades-web-a-medida/" className="text-[#B2FF00] hover:underline font-semibold">
                  funcionalidades web a medida
                </a>
                .
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {functionalities.map((func, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                className="px-4 py-3 bg-[#101010] border border-gray-800 rounded-lg text-gray-200 text-center hover:border-[#B2FF00] transition-all duration-300"
              >
                {func}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
