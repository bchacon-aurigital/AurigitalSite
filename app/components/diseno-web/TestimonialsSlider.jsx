'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

// B09 - Testimonios slider
export default function TestimonialsSlider() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      text: 'Después de mucho tiempo y malas experiencias con manejadores web, apareció Aurigital. Excelente servicio, full cumplimiento y siempre acompañando en todos los procesos. Recomendados a todo nivel… gracias equipo.',
      author: 'Daniel Hernandez',
      role: 'Agua de la Sierra'
    },
    {
      text: 'En Servidental CR, contratamos los servicios de Aurigital para la actualización de nuestro sitio web, y no podríamos estar más satisfechos. Desde el primer momento, el equipo demostró gran profesionalismo y tiempos de respuesta sumamente eficientes. Nos acompañaron en todo el proceso, escuchando nuestras ideas y ayudándonos a plasmarlas de manera clara y efectiva en la web. Gracias a su atención personalizada, logramos transmitir nuestro mensaje a los clientes tal como lo habíamos imaginado. Recomiendo a Aurigital sin reservas; su servicio es excepcional.',
      author: 'Allan Chan',
      role: 'Servidental CR'
    },
    {
      text: 'Haber elegido a Aurigital como creadores de la página web para mi proyecto Pranayama Costa Rica ha sido de las mejores decisiones del año. Desde el inicio he sentido respaldo total, compromiso, creatividad, apertura en comunicación y la sensación de que somos un equipo buscando elevar el proyecto a un nuevo plano. Aplaudo el profesionalismo y la superación de la marca Aurigital, y estoy seguro que cada uno de sus proyectos es mejor que el anterior. 100% recomendados.',
      author: 'Kenneth Chacón',
      role: 'Pranayama'
    },
    {
      text: 'He sido barbero profesional por más de 8 años y mi mayor problema ha sido el manejo de citas para mis clientes. Muchos me escriben o llaman durante mis horas de trabajo, y se me complicaba atender sus consultas, lo que ocasiona la pérdida de clientes. Aurigital me ha ahorrado tiempo, facilitando la agenda con un solo click. Su diseño web y facilidad de uso logran que la experiencia sea siempre positiva. Yo personalmente solo puedo compartir felicidad y completo respaldo y admiración a esta gran empresa. Siempre agradecido y recomendado, Gracias Aurigital.',
      author: 'Abraham Corella',
      role: 'Abraham Studio'
    },
    {
      text: 'Aurigital me ayudó a conocer mis necesidades en el mundo digital y se han encargado de acompañarme en el proceso. Junto a ellos he podido desarrollar no solo una página web estética, sino funcional. Me ayudaron a organizar mi proceso de agendar clientes, venta de libros, promoción de talleres nuevos y creación de un blog para explotar mi creatividad. Estoy segura de que puedo seguir confiando en su trabajo para seguir construyendo plataformas de crecimiento, conocimiento y amor.',
      author: 'Tulsi Diaz',
      role: 'Tulsi Psicóloga'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={ref} className="py-20 px-6 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-center leading-tight"
        >
          Nuestros clientes valoran nuestro servicio de diseño web con{' '}
          <span className="text-[#B2FF00]">5 estrellas</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center gap-1 mb-12"
        >
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-8 h-8 fill-[#B2FF00] text-[#B2FF00]" />
          ))}
        </motion.div>

        <div className="relative">
          {/* Testimonial card */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="p-8 md:p-12 bg-[#1a1a1a] border border-gray-800 rounded-2xl"
          >
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#B2FF00] text-[#B2FF00]" />
              ))}
            </div>

            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed text-center italic">
              "{testimonials[currentIndex].text}"
            </p>

            <div className="text-center">
              <p className="text-white font-bold text-lg mb-1">
                {testimonials[currentIndex].author}
              </p>
              <p className="text-gray-400 text-base">
                {testimonials[currentIndex].role}
              </p>
            </div>
          </motion.div>

          {/* Navigation buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="p-3 bg-[#1a1a1a] border border-gray-800 rounded-full hover:border-[#B2FF00] hover:bg-[#252525] transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-[#B2FF00]" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-[#B2FF00] w-8'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 bg-[#1a1a1a] border border-gray-800 rounded-full hover:border-[#B2FF00] hover:bg-[#252525] transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-[#B2FF00]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
