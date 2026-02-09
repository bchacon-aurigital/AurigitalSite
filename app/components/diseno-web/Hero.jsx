'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function Hero({ onScrollToForm, onScrollToPricing, cta, onCTAClick }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#101010] via-[#1a1a1a] to-[#101010]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(178,255,0,0.05),transparent_50%)]"></div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
        >
          Diseño web en Costa Rica para marcas con{' '}
          <span className="text-[#B2FF00]">autoridad</span>
        </motion.h1>

        {/* Párrafo principal */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed"
        >
          En Aurigital diseñamos páginas web y sitios web a medida (sin plantillas genéricas por defecto) para empresas, PyMEs y emprendedores que necesitan una web que se entienda, se vea profesional y genere contactos reales.
        </motion.p>

        {/* Bullets */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-4 mb-12 max-w-3xl mx-auto"
        >
          {[
            'Prototipo navegable + diseño alineado a tu marca',
            'Experiencia móvil impecable (responsivo) y navegación clara',
            'Sitio rápido, seguro (SSL) y con ruta clara (CTA, formularios)',
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="flex items-start gap-3 text-left"
            >
              <CheckCircle2 className="w-6 h-6 text-[#B2FF00] flex-shrink-0 mt-1" />
              <span className="text-gray-200 text-base md:text-lg">{item}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => {
              onCTAClick?.('hero_primary');
              onScrollToForm();
            }}
            className="px-8 py-4 bg-[#B2FF00] text-[#101010] font-bold rounded-lg hover:bg-[#9FE600] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#B2FF00]/20 text-lg"
          >
            {cta?.primary || 'Solicitar cotización'}
          </button>
          <button
            onClick={() => {
              onCTAClick?.('hero_secondary');
              onScrollToPricing();
            }}
            className="px-8 py-4 bg-transparent border-2 border-[#B2FF00] text-[#B2FF00] font-bold rounded-lg hover:bg-[#B2FF00] hover:text-[#101010] transition-all duration-300 text-lg"
          >
            {cta?.secondary || 'Ver paquetes y precios'}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
