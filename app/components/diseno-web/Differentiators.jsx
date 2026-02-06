'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';

// B10 - Diferenciadores
export default function Differentiators() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const differentiators = [
    'Diseño a medida: no arrancamos con plantillas genéricas por defecto',
    'Prototipo navegable antes de construir: claridad y control desde el inicio',
    'Claridad de ruta: estructura, mensajes y CTAs para que el usuario sepa exactamente qué hacer para contratarte, agendar o comprar',
    'Experiencia móvil real: no "adaptado", sino diseñado para celular',
    'Proceso ordenado por etapas: entregas, revisiones y control de cambios',
    'Posibilidad de escalar: e-commerce, mejoras y evolutivo con "Paz Mental"'
  ];

  return (
    <section ref={ref} className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12 text-center leading-tight"
        >
          ¿Por qué elegir Aurigital para diseñar tu{' '}
          <span className="text-[#B2FF00]">página web en Costa Rica</span>?
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {differentiators.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex gap-4 p-6 bg-[#1a1a1a] border border-gray-800 rounded-xl hover:border-[#B2FF00] transition-all duration-300"
            >
              <CheckCircle2 className="w-7 h-7 text-[#B2FF00] flex-shrink-0 mt-1" />
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
