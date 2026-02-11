'use client'

import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import 'swiper/css'

const testimonials = [
  {
    quote: "Después de mucho tiempo y malas experiencias con manejadores web, apareció Aurigital. Excelente servicio, full cumplimiento y siempre acompañando en todos los procesos. Recomendados a todo nivel… gracias equipo.",
    name: "Daniel Hernandez",
    company: "Agua de la Sierra"
  },
  {
    quote: "En Servidental CR, contratamos los servicios de Aurigital para la actualización de nuestro sitio web, y no podríamos estar más satisfechos. Desde el primer momento, el equipo demostró gran profesionalismo y tiempos de respuesta sumamente eficientes. Nos acompañaron en todo el proceso, escuchando nuestras ideas y ayudándonos a plasmarlas de manera clara y efectiva en la web. Gracias a su atención personalizada, logramos transmitir nuestro mensaje a los clientes tal como lo habíamos imaginado. Recomiendo a Aurigital sin reservas; su servicio es excepcional.",
    name: "Allan Chan",
    company: "Servidental CR"
  },
  {
    quote: "Haber elegido a Aurigital como creadores de la página web para mi proyecto Pranayama Costa Rica ha sido de las mejores decisiones del año. Desde el inicio he sentido respaldo total, compromiso, creatividad, apertura en comunicación y la sensación de que somos un equipo buscando elevar el proyecto a un nuevo plano. Aplaudo el profesionalismo y la superación de la marca Aurigital, y estoy seguro que cada uno de sus proyectos es mejor que el anterior. 100% recomendados.",
    name: "Kenneth Chacón",
    company: "Pranayama"
  },
  {
    quote: "He sido barbero profesional por más de 8 años y mi mayor problema ha sido el manejo de citas para mis clientes. Muchos me escriben o llaman durante mis horas de trabajo, y se me complicaba atender sus consultas, lo que ocasiona la pérdida de clientes. Aurigital me ha ahorrado tiempo, facilitando la agenda con un solo click. Su diseño web y facilidad de uso logran que la experiencia sea siempre positiva. Yo personalmente solo puedo compartir felicidad y completo respaldo y admiración a esta gran empresa. Siempre agradecido y recomendado, Gracias Aurigital.",
    name: "Abraham Corella",
    company: "Abraham Studio"
  },
  {
    quote: "Aurigital me ayudó a conocer mis necesidades en el mundo digital y se han encargado de acompañarme en el proceso. Junto a ellos he podido desarrollar no solo una página web estética, sino funcional. Me ayudaron a organizar mi proceso de agendar clientes, venta de libros, promoción de talleres nuevos y creación de un blog para explotar mi creatividad. Estoy segura de que puedo seguir confiando en su trabajo para seguir construyendo plataformas de crecimiento, conocimiento y amor.",
    name: "Tulsi Diaz",
    company: "Tulsi Psicóloga"
  },
]

export default function TestimoniosServicios() {
  const [swiper, setSwiper] = useState(null)

  return (
    <section className="bg-[#1c1c1c] px-6 md:px-10 lg:px-14 py-24 md:pt-40 md:pb-48">
      <div className="flex flex-col items-center gap-4 text-center pb-10">
        <span
          data-aos="fade-up"
          className="font-space-grotesk font-medium text-white/50 text-base md:text-lg tracking-[-0.36px] uppercase"
        >
          TESTIMONIOS
        </span>
        <h2
          data-aos="fade-up"
          data-aos-delay="100"
          className="font-space-grotesk font-medium text-white/80 text-2xl md:text-4xl tracking-[-0.02em] uppercase max-w-3xl leading-[1.18]"
        >
          Nuestros clientes valoran nuestro servicio de diseño web con 5 estrellas
        </h2>
        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="font-red-hat font-medium text-white/50 text-base md:text-lg tracking-[-0.36px] max-w-md"
        >
          Conoce las opiniones de nuestros clientes y su satisfacción con los resultados finales
        </p>
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="300"
        className="max-w-5xl mx-auto"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => swiper?.slidePrev()}
            className="hidden md:flex w-[71px] h-10 rounded-lg bg-[#252525] items-center justify-center text-white/60 hover:text-white hover:bg-[#333] transition-colors cursor-pointer flex-shrink-0"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex-1 min-w-0">
            <Swiper
              onSwiper={setSwiper}
              loop
              spaceBetween={16}
              slidesPerView={1}
              className="w-full [&_.swiper-slide]:!h-auto"
            >
              {testimonials.map((t, i) => (
                <SwiperSlide key={i} className="!h-auto">
                  <div className="bg-[#252525] rounded-2xl md:rounded-[26px] px-6 md:px-11 py-8 md:py-16 h-full flex items-center justify-center">
                    <div className="flex flex-col gap-4 md:gap-5">
                      <div className="border-b border-[#3b3b3b] pb-4 md:pb-6">
                        <p className="font-red-hat font-medium text-white/50 text-sm md:text-lg text-center leading-[1.4] md:leading-[1.3] tracking-[-0.4px]">
                          &ldquo;{t.quote}&rdquo;
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-space-grotesk font-medium text-white/80 text-base md:text-xl tracking-[-0.4px]">
                          {t.name}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-[#B2FF00]" />
                        <span className="font-red-hat font-medium text-white/40 text-sm md:text-lg tracking-[-0.36px]">
                          {t.company}
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <button
            onClick={() => swiper?.slideNext()}
            className="hidden md:flex w-[71px] h-10 rounded-lg bg-[#252525] items-center justify-center text-white/60 hover:text-white hover:bg-[#333] transition-colors cursor-pointer flex-shrink-0"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="flex md:hidden items-center justify-center gap-3 mt-6">
          <button
            onClick={() => swiper?.slidePrev()}
            className="w-12 h-10 rounded-lg bg-[#252525] flex items-center justify-center text-white/60 hover:text-white hover:bg-[#333] transition-colors cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => swiper?.slideNext()}
            className="w-12 h-10 rounded-lg bg-[#252525] flex items-center justify-center text-white/60 hover:text-white hover:bg-[#333] transition-colors cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}
