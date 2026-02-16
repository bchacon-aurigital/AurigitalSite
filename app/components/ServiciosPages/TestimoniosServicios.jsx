'use client'

import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import 'swiper/css'

export default function TestimoniosServicios({ subtitle, title, description, testimonials }) {
  const [swiper, setSwiper] = useState(null)

  return (
    <section className="bg-[#1c1c1c] px-6 md:px-10 lg:px-14 pb-16 lg:pb-28">
      <div className="flex flex-col items-center gap-4 text-center py-16 border-t border-white/10">
        <span
          data-aos="fade-up"
          className="font-space-grotesk font-medium text-white/50 text-base md:text-lg tracking-[-0.36px] uppercase"
        >
          {subtitle}
        </span>
        <h2
          data-aos="fade-up"
          data-aos-delay="100"
          className="font-space-grotesk font-medium text-white/80 text-2xl md:text-3xl lg:text-4xl tracking-[-0.02em] uppercase max-w-3xl leading-[1.18]"
        >
          {title}
        </h2>
        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="font-red-hat font-medium text-white/50 text-base tracking-[-0.36px] max-w-xs"
        >
          {description}
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
