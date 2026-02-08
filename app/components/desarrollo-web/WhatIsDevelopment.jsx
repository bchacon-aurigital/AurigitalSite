'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Layers, Settings } from 'lucide-react';

export default function WhatIsDevelopment() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const items = [
    {
      icon: Code2,
      text: 'Convertimos diseño/UX en un sitio funcional, rápido y estable'
    },
    {
      icon: Layers,
      text: 'Implementamos estructura, componentes, formularios e integraciones'
    },
    {
      icon: Settings,
      text: 'Dejamos el sitio listo para operar, medir y mantener sin depender de "parches"'
    }
  ];

  return (
    <section ref={ref} className="py-20 px-6 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-center leading-tight"
        >
          Desarrollo web no es "subir algo": es{' '}
          <span className="text-[#B2FF00]">implementar un sistema que funcione</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-gray-300 mb-12 text-center max-w-3xl mx-auto"
        >
          Cuando hablamos de desarrollo web, hablamos de pasar de intención a producción:
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 hover:border-[#B2FF00] transition-all duration-300"
              >
                <Icon className="w-12 h-12 text-[#B2FF00] mb-4" />
                <p className="text-gray-200 text-base leading-relaxed">{item.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
