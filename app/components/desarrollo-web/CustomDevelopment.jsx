'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { LayoutDashboard, Users, Workflow, Wrench } from 'lucide-react';

// B07 - Desarrollo web a medida
export default function CustomDevelopment() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const examples = [
    { icon: LayoutDashboard, text: 'Paneles o dashboards administrativos' },
    { icon: Users, text: 'Portales con roles (usuarios, permisos, estados)' },
    { icon: Workflow, text: 'Automatizaciones específicas e integraciones de datos (APIs)' },
    { icon: Wrench, text: 'Procesos internos que no deben quedar "a mano"' }
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
          Desarrollo web a medida para{' '}
          <span className="text-[#B2FF00]">necesidades específicas y privadas</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-gray-300 mb-10 text-center max-w-3xl mx-auto leading-relaxed"
        >
          Cuando el proyecto necesita reglas propias (y no solo "una web"), entramos a desarrollo web a medida: módulos y flujos hechos para tu operación.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl font-semibold text-[#B2FF00] mb-6 text-center"
        >
          Ejemplos típicos:
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {examples.map((example, index) => {
            const Icon = example.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="flex items-start gap-4 p-6 bg-[#1a1a1a] border border-gray-800 rounded-xl hover:border-[#B2FF00] transition-all duration-300"
              >
                <Icon className="w-8 h-8 text-[#B2FF00] flex-shrink-0 mt-1" />
                <p className="text-gray-200 text-base md:text-lg">{example.text}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="p-6 bg-gradient-to-r from-[#1a1a1a] to-[#252525] border border-[#B2FF00]/30 rounded-xl text-center"
        >
          <p className="text-gray-300 text-base md:text-lg leading-relaxed">
            Si tu caso requiere este nivel, se cotiza por alcance y complejidad, con especificación clara desde el inicio.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
