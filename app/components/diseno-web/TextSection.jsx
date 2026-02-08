'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

// Componente reutilizable para secciones de texto (B02, B03, B04)
export default function TextSection({
  title,
  paragraphs = [],
  bullets = [],
  note = null,
  footer = null,
  className = ''
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className={`py-20 px-6 ${className}`}>
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight"
        >
          {title}
        </motion.h2>

        {paragraphs.map((paragraph, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
            className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed"
          >
            {paragraph}
          </motion.p>
        ))}

        {bullets.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-3 mb-6 ml-6"
          >
            {bullets.map((bullet, index) => (
              <li key={index} className="text-gray-300 text-base md:text-lg list-disc">
                {bullet}
              </li>
            ))}
          </motion.ul>
        )}

        {note && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 p-6 bg-[#1a1a1a] border border-gray-800 rounded-lg"
          >
            <p className="text-gray-300 text-base md:text-lg">
              {note.text}{' '}
              {note.link && (
                <a
                  href={note.link.href}
                  className="text-[#B2FF00] hover:underline font-semibold"
                >
                  {note.link.text}
                </a>
              )}
            </p>
          </motion.div>
        )}

        {footer && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg md:text-xl text-gray-300 mt-8 leading-relaxed font-semibold"
          >
            {footer}
          </motion.p>
        )}
      </div>
    </section>
  );
}
