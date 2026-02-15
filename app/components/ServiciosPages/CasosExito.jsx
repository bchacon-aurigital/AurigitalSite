'use client'

import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import 'swiper/css'

function DetailRow({ label, text }) {
  return (
    <div className="border-t border-black/[0.12] flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0 py-3">
      <span className="font-space-grotesk text-black/90 text-sm md:text-base tracking-[-0.18px] uppercase shrink-0 sm:w-[160px]">
        {label}
      </span>
      <p className="font-red-hat font-medium text-black/60 text-xs md:text-sm leading-[20px]">
        {text}
      </p>
    </div>
  )
}

function CaseCard({ logo, client, problem, solution, result, href }) {
  return (
    <div className="bg-[#e9e9e9] rounded-[26px] px-6 md:px-10 py-8 md:py-[52px] flex flex-col justify-between h-full min-h-[500px] md:min-h-[600px]">
      <div className="self-start">
        <div className="bg-[#1c1c1c] rounded-[8px] p-3 inline-flex items-center justify-center">
          <img
            src={logo}
            alt={client}
            className="h-[30px] w-auto object-contain"
            loading="lazy"
          />
        </div>
      </div>

      <div className="h-[250px]"/>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h3 className="font-space-grotesk text-black/80 text-base md:text-lg leading-[28px] uppercase">
            {client}
          </h3>
          {href && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-space-grotesk font-medium text-[#808080] text-sm border-[1.5px] border-[#bdbdbd] rounded-[8px] px-4 py-1.5 whitespace-nowrap self-start transition-colors duration-300 hover:bg-black hover:text-white"
            >
              Ver detalles
            </a>
          )}
        </div>

        <div className="flex flex-col">
          <DetailRow label="PROBLEMA" text={problem} />
          <DetailRow label="SOLUCIÓN:" text={solution} />
          <DetailRow label="RESULTADO:" text={result} />
        </div>
      </div>
    </div>
  )
}

export default function CasosExito({ subtitle, title, description, cases }) {
  const swiperRef = useRef(null)

  return (
    <section className="bg-[#1c1c1c] px-6 md:px-10 lg:px-14 py-10 lg:py-16">
      <div
        data-aos="fade-up"
        className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6 xl:gap-14 pb-10 md:pb-14"
      >
        <div className="flex flex-col gap-4">
          {subtitle && (
            <span className="font-space-grotesk font-medium text-white/50 text-base md:text-lg tracking-[-0.36px] uppercase">
              {subtitle}
            </span>
          )}
          <h2 className="font-space-grotesk font-medium text-white/80 text-2xl md:text-3xl lg:text-4xl tracking-[-0.8px] uppercase leading-[1.1] max-w-[700px]">
            {title}
          </h2>
        </div>

        <div className="flex flex-col gap-6 max-w-[500px] lg:max-w-[590px]">
          {description && (
            <p className="font-red-hat font-medium text-white/50 text-base leading-[24px] tracking-[-0.36px]">
              {description}
            </p>
          )}
          <div className="flex gap-2">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-[71px] h-10 rounded-lg bg-[#252525] flex items-center justify-center text-white/60 hover:text-white hover:bg-[#333] transition-colors cursor-pointer"
              aria-label="Anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-[71px] h-10 rounded-lg bg-[#252525] flex items-center justify-center text-white/60 hover:text-white hover:bg-[#333] transition-colors cursor-pointer"
              aria-label="Siguiente"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div data-aos="fade-up" data-aos-delay="150">
        <Swiper
          onSwiper={(swiper) => { swiperRef.current = swiper }}
          spaceBetween={12}
          slidesPerView={1.05}
          breakpoints={{
            768: { slidesPerView: 1.5 },
            1024: { slidesPerView: 2.2 }
          }}
          className="[&_.swiper-slide]:!h-auto"
        >
          {cases.map((c, i) => (
            <SwiperSlide key={i}>
              <CaseCard {...c} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
