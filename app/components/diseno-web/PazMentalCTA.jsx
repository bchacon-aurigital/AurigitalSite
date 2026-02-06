'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, RefreshCw, Server, HeadphonesIcon } from 'lucide-react';
import Link from 'next/link';

// B12 - Paz Mental add-on
export default function PazMentalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: RefreshCw,
      text: 'Ajustes menores y correcciones rápidas'
    },
    {
      icon: Shield,
      text: 'Actualizaciones y mejoras continuas priorizadas'
    },
    {
      icon: Server,
      text: 'Backups y monitoreo básico'
    },
    {
      icon: HeadphonesIcon,
      text: 'Soporte directo para cambios y evolutivo'
    }
  ];

  return (
    <section ref={ref} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden p-8 md:p-12 bg-gradient-to-br from-[#B2FF00]/10 via-[#1a1a1a] to-[#252525] border-2 border-[#B2FF00] rounded-3xl"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#B2FF00]/5 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
            >
              <span className="text-[#B2FF00]">"Paz Mental"</span>: mantenimiento y evolución
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 mb-8"
            >
              Si querés continuidad sin improvisación, conocé nuestro servicio de mantenimiento y evolución web{' '}
              <Link href="/mantenimiento-y-evolucion-web/" className="text-[#B2FF00] hover:underline font-semibold">
                Paz Mental
              </Link>
              .
            </motion.p>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="flex gap-3 items-start"
                  >
                    <Icon className="w-6 h-6 text-[#B2FF00] flex-shrink-0 mt-1" />
                    <span className="text-gray-300 text-base md:text-lg">{feature.text}</span>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center gap-4 p-6 bg-[#101010] border border-[#B2FF00]/30 rounded-xl"
            >
              <div>
                <p className="text-gray-400 text-sm mb-1">Precio:</p>
                <p className="text-white text-2xl md:text-3xl font-bold">
                  Desde <span className="text-[#B2FF00]">USD $120</span> / mes
                </p>
                <p className="text-gray-400 text-sm mt-1">(según frecuencia y alcance)</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-6 text-center md:text-left"
            >
              <p className="text-gray-300 text-base">
                <span className="font-semibold text-white">Orden y continuidad</span> — no improvisación
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
