'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import BotonServicio from './ui/Boton'
import ParticleImage from '@/app/components/ui/ParticleImage'
import 'swiper/css'

export default function CardsCarrusel({ subtitle, title, description, cards, ctaText, onCtaClick, desktopSlides = 3, note, cardImageHeight }) {
  return (
    <section className="bg-[#e9e9e9] px-6 md:px-10 lg:px-14 py-10 lg:py-16">

      <div className="">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-14 pb-10 md:pb-12">
          <div className="flex flex-col gap-4 lg:max-w-[50%]">
            {subtitle && (
              <span
                data-aos="fade-up"
                className="font-space-grotesk font-medium text-black/50 text-base md:text-lg tracking-[-0.36px] uppercase leading-[24px]"
              >
                {subtitle}
              </span>
            )}
            <h2
              data-aos="fade-up"
              data-aos-delay="100"
              className="font-space-grotesk font-medium text-black/80 text-2xl md:text-3xl lg:text-4xl tracking-[-0.8px] uppercase leading-[1.18]"
            >
              {title}
            </h2>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="flex flex-col items-start gap-6 lg:max-w-[538px]"
          >
            <p className="font-red-hat font-medium text-black/50 text-base leading-[24px] tracking-[-0.36px]">
              {description}
            </p>
            {ctaText && (
              <BotonServicio onClick={onCtaClick}>{ctaText}</BotonServicio>
            )}
          </div>
        </div>
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="300"
        className="pt-6 md:pt-10"
      >
        <Swiper
          spaceBetween={12}
          slidesPerView={1.15}
          breakpoints={{
            768: { slidesPerView: 2.2 },
            1024: { slidesPerView: desktopSlides },
          }}
          className="w-full [&_.swiper-slide]:!h-auto [&_.swiper-wrapper]:!items-center"
        >
          {cards.map((card, i) => (
            <SwiperSlide key={i} className="!h-auto">
              {card.particleEffect ? (
                <div className="relative bg-[#020408] rounded-2xl md:rounded-[26px] overflow-hidden cursor-pointer">
                  {/* Canvas cubre toda la tarjeta; la imagen se dibuja solo en la zona superior */}
                  <div className="absolute inset-0">
                    <ParticleImage
                      src={card.svg}
                      imageInset={card.imageInset ?? { x: 16, y: 60 }}
                      imageAreaHeight={card.imageAreaHeight ?? cardImageHeight ?? { sm: 280, md: 340 }}
                      imageAlign={card.imageAlign}
                      className="w-full h-full"
                    />
                  </div>
                  {/* Contenido en flujo: da altura a la tarjeta y queda encima del canvas */}
                  {(() => {
                    const h = card.imageAreaHeight ?? cardImageHeight ?? { sm: 280, md: 340 }
                    const sm = typeof h === 'object' ? (h.sm ?? 280) : h
                    const md = typeof h === 'object' ? (h.md ?? 340) : h
                    return <>
                      <div className="block md:hidden" style={{ height: sm }} />
                      <div className="hidden md:block" style={{ height: md }} />
                    </>
                  })()}
                  <p className="md:hidden relative z-10 text-center text-white/55 text-[10px] tracking-[0.2em] uppercase animate-pulse pt-4">[ Presiona ]</p>
                  <div className="relative z-10 px-6 pb-8 pt-3 md:pt-4">
                    <span className="font-space-grotesk mb-4 inline-block font-black text-[#0bf] text-sm md:text-base uppercase border-[2px] border-[#0bf] rounded-xl w-fit p-2">
                      {card.number}
                    </span>
                    <h3 className="font-space-grotesk font-medium text-white/80 text-2xl leading-[26px] tracking-[-0.64px]">
                      {card.title}
                    </h3>
                    <p className="font-red-hat font-medium text-white/50 text-base leading-[26px] tracking-[-0.4px]">
                      {card.description}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="group bg-[#252525] hover:bg-[#00BBFF] rounded-2xl md:rounded-[26px] px-6 py-8 h-full flex flex-col gap-6 md:gap-8 transition-colors duration-300 cursor-pointer overflow-hidden">
                  <div className="h-[250px] md:h-[300px] flex items-center justify-center rounded-2xl overflow-hidden">
                    <img
                      src={card.svg}
                      alt={card.title}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain group-hover:brightness-0 transition-[filter] duration-300"
                    />
                  </div>
                  <div className="flex flex-col mt-auto">
                    <span className="font-space-grotesk mb-4 font-black text-[#0bf] group-hover:text-black text-sm md:text-base uppercase border-[2px] border-[#0bf] group-hover:border-black rounded-xl w-fit p-2 transition-colors duration-300">
                      {card.number}
                    </span>
                    <h3 className="font-space-grotesk font-medium text-white/80 group-hover:text-black text-2xl leading-[26px] tracking-[-0.64px] transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="font-red-hat font-medium text-white/50 group-hover:text-black/60 text-base leading-[26px] tracking-[-0.4px] transition-colors duration-300">
                      {card.description}
                    </p>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {note && (
        <div data-aos="fade-up" data-aos-delay="350" className="mt-8">
          <div className="bg-[#ddd] rounded-[16px] px-6 py-5">
            <p className="font-red-hat font-medium text-black/60 text-base leading-[24px] tracking-[-0.36px]">
              {note}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
