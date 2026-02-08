'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Monitor, Server, Zap, Shield, CheckSquare } from 'lucide-react';
import Link from 'next/link';

// B05 - Qué incluye (BASE TÉCNICA)
export default function IncludedServices() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: Monitor,
      title: 'Implementación front-end fiel al diseño (UX/UI)',
      description: 'Convertimos el diseño en una experiencia real: componentes bien construidos, responsive y coherencia visual sin "sorpresas" en producción.',
      hasLink: true
    },
    {
      icon: Server,
      title: 'Back-end y lógica necesaria',
      description: 'Formularios, flujos, validaciones y reglas simples para que la web funcione como un sistema, no como un brochure.'
    },
    {
      icon: Zap,
      title: 'Performance y buenas prácticas',
      description: 'Estructura limpia, optimización base y carga rápida para que el sitio se sienta fluido, especialmente en móvil.'
    },
    {
      icon: Shield,
      title: 'Seguridad esencial (SSL)',
      description: 'Implementación segura con SSL y medidas básicas para reducir riesgos y aumentar confianza.'
    },
    {
      icon: CheckSquare,
      title: 'QA, ambiente de pruebas y publicación',
      description: 'Trabajamos con checklist de salida: pruebas, revisión final y publicación ordenada (idealmente con staging antes de producción).'
    }
  ];

  return (
    <section id="included-services" ref={ref} className="py-20 px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12 text-center leading-tight"
        >
          Qué incluye nuestro{' '}
          <span className="text-[#B2FF00]">desarrollo de páginas web en Costa Rica</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
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
                  {service.hasLink && (
                    <>
                      {' '}
                      <Link href="/diseno-web" className="text-[#B2FF00] hover:underline font-semibold">
                        diseño
                      </Link>
                    </>
                  )}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
