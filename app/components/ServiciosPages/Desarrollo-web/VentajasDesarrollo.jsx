'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

export default function VentajasDesarrollo({ subtitle, title, ctaText, cards }) {
  return (
    <section className="bg-[#e9e9e9] px-6 md:px-10 lg:px-14 py-10 lg:py-16">
      <div
        data-aos="fade-up"
        className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-14 pb-8 md:pb-10 border-b border-[#aeaeae]"
      >
        <div className="flex flex-col gap-4">
          {subtitle && (
            <span className="font-space-grotesk font-medium text-black/50 text-base md:text-lg tracking-[-0.36px] uppercase leading-[24px]">
              {subtitle}
            </span>
          )}
          <h2 className="font-space-grotesk font-medium text-black/80 text-2xl md:text-3xl lg:text-4xl tracking-[-1.12px] uppercase leading-[0.96] max-w-[592px]">
            {title}
          </h2>
        </div>
        {ctaText && (
          <span className="font-space-grotesk font-medium text-base text-[#252525] uppercase border-[1.5px] border-[#252525] rounded-[12px] px-5 py-2 whitespace-nowrap self-center">
            {ctaText}
          </span>
        )}
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="150"
        className="pt-10 md:pt-14"
      >
        <Swiper
          spaceBetween={12}
          loop
          autoplay={{
            delay: 2500,
            disableOnInteraction: true,
          }}
          slidesPerView={1.15}
          breakpoints={{
            768: { slidesPerView: 2.4 },
          }}
          className="w-full [&_.swiper-slide]:!h-auto"
        >
          {cards.map((card, i) => (
            <SwiperSlide key={i} className="!h-auto">
              <div className="bg-[#252525] rounded-2xl px-6 md:px-8 py-8 md:py-10 h-full flex flex-col justify-between gap-16 md:gap-20 min-h-[280px] md:min-h-[398px] overflow-hidden">
                <div className="flex items-start justify-between gap-4">
                  <h3 className=" max-w-xs font-space-grotesk font-medium text-[#e9e9e9] text-xl md:text-2xl lg:text-[32px] uppercase leading-[0.89]">
                    {card.title}
                  </h3>
                  <div className="bg-[#e9e9e9] rounded-[12px] w-[44px] h-[44px] md:w-[51px] md:h-[51px] flex items-center justify-center flex-shrink-0">
                    {card.icon}
                  </div>
                </div>
                <p className="font-red-hat font-medium text-white/80 text-base md:text-xl tracking-[-0.4px] leading-[26px]">
                  {card.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
