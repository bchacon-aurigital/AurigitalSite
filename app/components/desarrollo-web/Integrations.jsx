'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, CreditCard, Mail, FileText } from 'lucide-react';
import Link from 'next/link';

// B06 - Integraciones y automatizaciones
export default function Integrations() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const integrations = [
    {
      icon: Calendar,
      title: 'Agenda y reservas',
      description: 'Configuración de agenda en línea para reducir ida y vuelta y estructurar solicitudes.'
    },
    {
      icon: CreditCard,
      title: 'Pagos y e-commerce',
      description: 'Integración de pago y flujo de compra cuando aplica, para profesionalizar ventas y reducir gestión manual.'
    },
    {
      icon: Mail,
      title: 'CRM, email y mensajería',
      description: 'Conexiones con formularios, notificaciones y seguimiento para que el proceso sea trazable.'
    },
    {
      icon: FileText,
      title: 'Formularios avanzados y rutas de contacto',
      description: 'Formularios con lógica simple (campos, filtros, rutas) para que cada solicitud llegue al lugar correcto.'
    }
  ];

  return (
    <section ref={ref} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-center leading-tight"
        >
          Integraciones y automatizaciones para{' '}
          <span className="text-[#B2FF00]">simplificar tu operación</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-gray-300 mb-12 text-center max-w-4xl mx-auto leading-relaxed"
        >
          La mayoría de marcas con reputación no necesitan "más visitas"; necesitan orden, respuesta ágil y procesos claros. Por eso integramos herramientas y automatizaciones que estructuran solicitudes, reducen la dependencia de chats y dejan la operación lista para escalar sin improvisación.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {integrations.map((integration, index) => {
            const Icon = integration.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="p-8 bg-[#1a1a1a] border border-gray-800 rounded-2xl hover:border-[#B2FF00] transition-all duration-300"
              >
                <Icon className="w-12 h-12 text-[#B2FF00] mb-4" />
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                  {integration.title}
                </h3>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  {integration.description}
                </p>
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
            Estas integraciones se implementan cuando aplican; si el proyecto requiere lógica privada o flujos complejos, se aborda como{' '}
            <Link href="/funcionalidades-web-a-medida" className="text-[#B2FF00] hover:underline font-semibold">
              funcionalidades web a medida
            </Link>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}
