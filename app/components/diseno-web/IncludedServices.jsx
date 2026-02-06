'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Figma, Smartphone, Zap, Lightbulb } from 'lucide-react';

// B07 - Servicios incluidos
export default function IncludedServices() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: Figma,
      title: 'Diseño UX/UI y prototipo navegable',
      description: 'Definimos secciones, jerarquía de contenido y diseño visual antes de construir, para evitar "adivinar" en producción.'
    },
    {
      icon: Smartphone,
      title: 'Diseño responsivo (mobile first)',
      description: 'Tu web debe funcionar perfecta en celular: lectura, botones, formularios y navegación.'
    },
    {
      icon: Zap,
      title: 'Base técnica esencial',
      description: 'Sitio rápido, seguro (SSL) y bien estructurado para que cargue bien y se sienta confiable.'
    },
    {
      icon: Lightbulb,
      title: 'Consultoría tecnológica integral',
      description: 'Te orientamos desde el inicio para alinear la web con las herramientas que ya usás y definir qué necesitás para simplificar procesos (captación, agenda, pedidos, comunicación) incluyendo automatizaciones y configuración de herramientas cuando aplican. El objetivo es que la tecnología te quite carga operativa, no que te agregue trabajo.'
    }
  ];

  return (
    <section ref={ref} className="py-20 px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12 text-center leading-tight"
        >
          Servicios de diseño web profesional{' '}
          <span className="text-[#B2FF00]">(lo que incluye tu proyecto)</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-8 bg-[#1a1a1a] border border-gray-800 rounded-2xl hover:border-[#B2FF00] transition-all duration-300"
              >
                <Icon className="w-12 h-12 text-[#B2FF00] mb-4" />
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="p-6 bg-gradient-to-r from-[#1a1a1a] to-[#252525] border border-[#B2FF00]/30 rounded-xl text-center"
        >
          <p className="text-gray-300 text-base md:text-lg">
            Si el proyecto requiere lógica privada, integraciones o flujos complejos, lo abordamos como{' '}
            <a href="/desarrollo-web/" className="text-[#B2FF00] hover:underline font-semibold">
              desarrollo web
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}
