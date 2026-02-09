'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

// B14 - FAQs Desarrollo Web
export default function FAQAccordion() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: '¿Qué incluye exactamente el "desarrollo web" y qué queda fuera?',
      answer: 'Incluye implementación en producción, performance base, seguridad esencial (SSL), integraciones acordadas, QA y publicación. Queda fuera lo que no esté especificado: funcionalidades con lógica privada, integraciones nuevas no contempladas, contenido masivo y cambios de alcance sin estimación.'
    },
    {
      question: '¿Cómo evitan que el proyecto se convierta en "parches" o quede inestable con el tiempo?',
      answer: 'Con alcance claro, estructura técnica mantenible, QA antes de publicar y control de cambios. La prioridad es que el sitio quede entendible, estable y fácil de evolucionar sin romperse en cada ajuste.'
    },
    {
      question: '¿Qué pasa si durante el proyecto me doy cuenta de que necesito más funcionalidades?',
      answer: 'Se documenta el cambio, se estima y se prioriza. Preferimos formalizar ajustes en vez de "meter cosas" sin control, para proteger estabilidad, tiempos y calidad.'
    },
    {
      question: '¿Puedo contratar desarrollo si ya tengo diseño/prototipo, o si mi web ya existe?',
      answer: 'Sí. Podemos implementar desde un diseño existente o trabajar sobre un sitio ya publicado, siempre que el alcance sea claro. Si la base actual limita rendimiento o mantenimiento, se recomienda re-implementación parcial o total. Nota importante: podemos trabajar sobre un diseño existente pero NO sobre una página web ya hecha. La mayoría están en algún constructor de sitios como Wix o WordPress. No trabajamos ni mantenemos esos sistemas. Incluso si está hecha en código, no podemos garantizar la calidad del código que ntregremos ya que no fue estructurado por nosotros, y muchas veces para hacerlo bien hay que empezar de cero.'
    },
    {
      question: '¿Cómo manejan integraciones y automatizaciones para reducir trabajo manual?',
      answer: 'Las definimos según tu flujo real (captación, agenda, pedidos, comunicación). Implementamos integraciones acordadas (formularios, agenda, pagos, CRM/email) y dejamos el proceso ordenado para que no dependa de chats para todo.'
    },
    {
      question: '¿Qué tan "a medida" puede ser el desarrollo sin volverse un sistema gigante?',
      answer: 'Depende de reglas, roles y flujos. Si son ajustes puntuales, se integran dentro del sitio. Si hay lógica privada o procesos internos (dashboards, portales, tiqueteras con reglas), se aborda como módulo a medida con especificación y estimación propia.'
    },
    {
      question: '¿Cómo garantizan calidad antes de publicar?',
      answer: 'Con checklist de salida: pruebas en móvil, formularios, flujos, integraciones y revisión final de performance y estabilidad. Idealmente usamos ambiente de pruebas antes de producción para validar sin afectar el sitio en vivo.'
    },
    {
      question: '¿Qué acceso y propiedad me queda al final del proyecto?',
      answer: 'Te quedan los accesos y el control operativo del sitio (cuentas, dominios/hosting si aplican, y el entorno de administración). También dejamos documentación mínima para continuidad y handoff.'
    },
    {
      question: '¿Qué pasa después del lanzamiento si necesito cambios, soporte o evolución?',
      answer: 'Podés trabajar mejoras puntuales por alcance, o continuar con mantenimiento/evolución para asegurar continuidad, actualizaciones y mejoras sin improvisación. El objetivo es que el proyecto no quede "botado" con el tiempo.'
    }
  ];

  return (
    <section ref={ref} className="py-20 px-6 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12 text-center leading-tight"
        >
          FAQs —{' '}
          <span className="text-[#B2FF00]">Desarrollo Web</span>
        </motion.h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden hover:border-[#B2FF00] transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <h3 className="text-lg md:text-xl font-semibold text-white pr-8">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-[#B2FF00] flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5">
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
