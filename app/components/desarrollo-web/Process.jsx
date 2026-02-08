'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FileText, Cog, Code, CheckCircle2, Rocket, Book } from 'lucide-react';
import Link from 'next/link';

// B09 - Proceso
export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      icon: FileText,
      number: '1',
      title: 'Definición de alcance',
      description: 'Qué incluye / qué no incluye (sin ambigüedades)'
    },
    {
      icon: Cog,
      title: 'Plan técnico',
      number: '2',
      description: 'Estructura, integraciones y entorno de pruebas'
    },
    {
      icon: Code,
      number: '3',
      title: 'Implementación por iteraciones',
      description: 'Avances visibles y revisión ordenada'
    },
    {
      icon: CheckCircle2,
      number: '4',
      title: 'QA y pruebas',
      description: 'Estabilidad, móvil, formularios, flujos e integraciones'
    },
    {
      icon: Rocket,
      number: '5',
      title: 'Lanzamiento',
      description: 'Checklist final y publicación'
    },
    {
      icon: Book,
      number: '6',
      title: 'Documentación y continuidad',
      description: 'Base mantenible para evolutivo o mantenimiento',
      hasLink: true
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
          Proceso de desarrollo web:{' '}
          <span className="text-[#B2FF00]">orden, control y entregas claras</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative p-8 bg-[#1a1a1a] border border-gray-800 rounded-2xl hover:border-[#B2FF00] transition-all duration-300"
              >
                {/* Number badge */}
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#B2FF00] rounded-full flex items-center justify-center font-bold text-black text-lg">
                  {step.number}
                </div>

                <Icon className="w-10 h-10 text-[#B2FF00] mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-300 text-base leading-relaxed">
                  {step.description}
                  {step.hasLink && (
                    <>
                      {' '}
                      <Link href="/mantenimiento-y-evolucion-web" className="text-[#B2FF00] hover:underline font-semibold">
                        mantenimiento
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
