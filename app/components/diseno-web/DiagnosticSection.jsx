'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Search, BarChart3, Smartphone, Shield, Settings } from 'lucide-react';

// B05 - Diagnóstico tecnológico
export default function DiagnosticSection({ onScrollToForm, cta, onCTAClick }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const diagnosticItems = [
    {
      icon: Search,
      text: 'Estructura y navegación: ¿qué busca el usuario y qué encuentra?'
    },
    {
      icon: BarChart3,
      text: 'Mensaje y claridad: propuesta de valor, secciones y CTAs'
    },
    {
      icon: Smartphone,
      text: 'Experiencia móvil: lectura, botones, formularios y velocidad real'
    },
    {
      icon: Shield,
      text: 'Confianza: coherencia visual, orden, seguridad y claridad'
    },
    {
      icon: Settings,
      text: 'Estructura tecnológica: licencias, herramientas y mini-funciones que te quitan trabajo y ordenan la operación'
    }
  ];

  return (
    <section ref={ref} className="py-20 px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
        >
          Diagnóstico tecnológico: verificamos si tu web aprovecha la tecnología{' '}
          <span className="text-[#B2FF00]">(y qué la frena)</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed"
        >
          Antes de diseñar, revisamos lo que define la experiencia, la claridad del mensaje y la tranquilidad operativa. La idea es simple: que tu web represente tu marca y funcione con criterio, sin fricción.
        </motion.p>

        {/* Diagnostic items grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {diagnosticItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="flex gap-4 p-6 bg-[#1a1a1a] border border-gray-800 rounded-xl hover:border-[#B2FF00] transition-all duration-300"
              >
                <Icon className="w-8 h-8 text-[#B2FF00] flex-shrink-0" />
                <p className="text-gray-300 text-base md:text-lg">{item.text}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Note with internal link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="p-6 bg-gradient-to-r from-[#1a1a1a] to-[#252525] border border-[#B2FF00]/30 rounded-xl mb-8"
        >
          <p className="text-gray-300 text-base md:text-lg">
            Si tu sitio ya existe y querés un diagnóstico puntual antes de rediseñar, podés solicitar una{' '}
            <a href="/auditoria-web-tecnica/" className="text-[#B2FF00] hover:underline font-semibold">
              auditoría web técnica
            </a>
            .
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-center"
        >
          <button
            onClick={() => {
              onCTAClick?.('diagnostic_section');
              onScrollToForm();
            }}
            className="px-8 py-4 bg-[#B2FF00] text-[#101010] font-bold rounded-lg hover:bg-[#9FE600] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#B2FF00]/20 text-lg"
          >
            {cta?.primary || 'Solicitar diagnóstico y cotización'}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
