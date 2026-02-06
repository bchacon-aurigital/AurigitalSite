'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check } from 'lucide-react';

// B11 - Paquetes y precios
export default function PricingCards({ onSelectPackage }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const packages = [
    {
      name: 'Professional Pack',
      price: 'Desde $2,000',
      duration: '2 meses',
      ideal: 'Marcas personales y pequeños negocios',
      features: [
        '1 página única sin límite de secciones',
        'Diseño web personalizado y único para la marca',
        'Diseño adaptable a todos los dispositivos (escritorio, tablet, celular)',
        'SEO básico optimizado',
        'Revisiones ilimitadas',
        'Dominio y Hosting incluidos',
        'Formulario de contacto',
        'Microanimaciones simples',
        'Hasta 3 funcionalidades básicas'
      ],
      highlighted: false
    },
    {
      name: 'Startup Pack',
      price: 'Desde $3,450',
      duration: '3-4 meses',
      ideal: 'PyMEs y empresas establecidas',
      features: [
        'Incluye todo lo del Professional Pack',
        'Hasta 4 páginas sin límite de secciones',
        'Prototipo Navegable',
        'SEO Intermedio Optimizado',
        'Animaciones y microanimaciones',
        'Integraciones headless personalizadas',
        'Generación de contenido IA',
        'Funcionalidades básicas ilimitadas',
        'Primera funcionalidad premium sin costo extra'
      ],
      highlighted: true,
      badge: 'MÁS POPULAR'
    },
    {
      name: 'Enterprise Pack',
      price: 'Desde $6,800',
      duration: '4-6 meses',
      ideal: 'Empresas grandes y proyectos complejos',
      features: [
        'Incluye todo lo del Startup Pack',
        'Hasta 8 páginas completamente personalizadas',
        'SEO Avanzado Optimizado',
        'Multilenguaje',
        'Consultoría técnica para integraciones dentro y fuera del sitio web',
        'Integración completa con ecosistema digital',
        'Dos funcionalidades premium sin costo extra'
      ],
      highlighted: false
    }
  ];

  return (
    <section id="pricing" ref={ref} className="py-20 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-center leading-tight"
        >
          Precios de diseño web en Costa Rica:{' '}
          <span className="text-[#B2FF00]">diseño, estructura y tecnología</span> alineadas a tu marca
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-gray-300 mb-12 text-center max-w-4xl mx-auto"
        >
          Si tus clientes ya te buscan por reputación; tu web tiene que estar a la altura y además facilitarte la operación. Elegí el paquete que mejor se adapte a tu negocio.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative p-8 rounded-2xl transition-all duration-300 ${
                pkg.highlighted
                  ? 'bg-gradient-to-br from-[#1a1a1a] to-[#252525] border-2 border-[#B2FF00] transform scale-105'
                  : 'bg-[#1a1a1a] border border-gray-800 hover:border-[#B2FF00]'
              }`}
            >
              {pkg.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="px-4 py-1 bg-[#B2FF00] text-[#101010] text-sm font-bold rounded-full">
                    {pkg.badge}
                  </span>
                </div>
              )}

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {pkg.name}
              </h3>

              <p className="text-3xl md:text-4xl font-bold text-[#B2FF00] mb-2">
                {pkg.price}
              </p>

              {pkg.duration && (
                <p className="text-gray-400 text-base mb-4">
                  {pkg.duration}
                </p>
              )}

              <p className="text-gray-400 text-base mb-6">
                Ideal para: <span className="text-gray-300 font-semibold">{pkg.ideal}</span>
              </p>

              <div className="space-y-3 mb-8">
                {pkg.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#B2FF00] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-base">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onSelectPackage(pkg.name)}
                className={`w-full py-3 rounded-lg font-bold text-lg transition-all duration-300 ${
                  pkg.highlighted
                    ? 'bg-[#B2FF00] text-[#101010] hover:bg-[#9FE600]'
                    : 'bg-transparent border-2 border-[#B2FF00] text-[#B2FF00] hover:bg-[#B2FF00] hover:text-[#101010]'
                }`}
              >
                Seleccionar
              </button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-gray-400 text-base"
        >
          Los precios son estimados. Cada proyecto es único y el precio final depende del alcance específico.
        </motion.p>
      </div>
    </section>
  );
}
