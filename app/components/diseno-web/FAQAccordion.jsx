'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

// B13 - FAQs
export default function FAQAccordion() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: '¿Cómo sé si realmente necesito una web nueva o si basta con ajustar la que ya tengo?',
      answer: 'Si tu web actual no logra que la gente entienda qué ofrecés en pocos segundos, no genera consultas medibles o funciona mal en celular, normalmente no es un "ajuste menor". Si el problema es solo contenido desactualizado o una sección puntual, sí puede bastar con ajustes.'
    },
    {
      question: '¿Qué información tengo que tener lista antes de contratar diseño web?',
      answer: 'Definición clara de qué vendés, a quién le vendés, servicios/productos principales, zona de atención, objetivo principal del sitio (consultas, ventas, agenda, catálogo) y material base de marca (logo/colores si existen). Si tenés referencias visuales, ayudan a alinear estilo sin improvisar.'
    },
    {
      question: '¿Qué debería entregar una "web de alta calidad" más allá de verse bonita?',
      answer: 'Claridad del mensaje, navegación simple, buena experiencia en celular, tiempos de carga razonables, formularios que funcionen y una estructura que guíe al usuario a una acción concreta.'
    },
    {
      question: '¿Qué puedo esperar como resultado realista después de publicar mi página web?',
      answer: 'Más confianza y credibilidad, mejor capacidad de convertir interesados en consultas y una base sólida para campañas o crecimiento orgánico. No es realista esperar ventas automáticas si no existe una fuente de tráfico o una oferta clara.'
    },
    {
      question: '¿Qué debería quedar claro en una cotización para evitar sorpresas?',
      answer: 'Alcance de secciones/páginas, qué incluye y qué no incluye, rondas de revisión, tiempos por etapa, si incluye e-commerce, si incluye publicación, y cómo se manejarán cambios fuera de alcance.'
    },
    {
      question: '¿Por qué algunas webs cuestan muy barato y otras son más costosas?',
      answer: 'Suele cambiar el nivel de trabajo en estructura, prototipado, diseño a medida, revisiones, calidad del desarrollo, pruebas en móvil y soporte posterior. Muchas webs baratas recortan en esas capas y el costo aparece después en rehacer o "parchar".'
    },
    {
      question: '¿Qué pasa si no tengo fotos profesionales o textos listos?',
      answer: 'Se puede avanzar con material provisional, pero la calidad percibida puede bajar. Lo ideal es definir qué contenido es imprescindible para publicar y qué puede mejorarse luego sin bloquear el lanzamiento.'
    },
    {
      question: '¿En qué casos conviene una landing page y en cuáles un sitio web completo?',
      answer: 'Landing: cuando tenés una oferta clara y querés una sola acción (solicitud/cotización). Sitio completo: cuando el usuario necesita más información para decidir (servicios, confianza, pruebas, preguntas).'
    },
    {
      question: '¿Qué diferencia hay entre "diseño web" y "desarrollo web" en términos prácticos?',
      answer: 'El diseño define estructura, experiencia y cómo se comunica la propuesta de valor. El desarrollo web implementa funcionamiento, rendimiento e integraciones. Son etapas distintas pero complementarias.'
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={ref} className="py-20 px-6 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12 text-center leading-tight"
        >
          Preguntas frecuentes sobre{' '}
          <span className="text-[#B2FF00]">diseño web en Costa Rica</span>
        </motion.h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="border border-gray-800 rounded-xl overflow-hidden bg-[#1a1a1a] hover:border-[#B2FF00] transition-all duration-300"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-5 flex justify-between items-center gap-4 text-left"
              >
                <span className="text-lg md:text-xl font-semibold text-white">
                  {faq.question}
                </span>
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
