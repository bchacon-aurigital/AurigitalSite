'use client'

import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import 'swiper/css'

export default function CarruselMedida({ subtitle, title, description, cards }) {
  const swiperRef = useRef(null)

  return (
    <section className="bg-[#e9e9e9] px-6 md:px-10 lg:px-14 py-10 lg:py-16 overflow-x-hidden">
      <div
        data-aos="fade-up"
        className="flex flex-col items-center gap-4 text-center pb-10 md:pb-14"
      >
        {subtitle && (
          <span className="font-space-grotesk font-medium text-black/50 text-base md:text-lg tracking-[-0.36px] uppercase leading-[24px]">
            {subtitle}
          </span>
        )}
        <h2 className="font-space-grotesk font-medium text-black/80 text-2xl md:text-3xl lg:text-4xl tracking-[-1.12px] uppercase leading-[1.02] max-w-[700px]">
          {title}
        </h2>
        {description && (
          <p className="font-red-hat font-medium text-black/50 text-base tracking-[-0.36px] leading-[24px] max-w-[550px]">
            {description}
          </p>
        )}
      </div>

      <div data-aos="fade-up" data-aos-delay="150" className="relative">
        <div className="absolute left-1/2 -translate-x-1/2 w-[200vw] h-px bg-[#00BBFF]/30 z-0 top-[59px] md:top-[75px]" />
        
        <div className="-mx-6 md:mx-0">
          <Swiper
            onSwiper={(swiper) => { swiperRef.current = swiper }}
            loop={true}
            slidesPerView={1}
            centeredSlides={true}
            spaceBetween={20}
            allowTouchMove={false} 
            speed={800}            
            breakpoints={{
              768: { 
                slidesPerView: 2, 
                centeredSlides: false,
                spaceBetween: 30 
              },
              1024: { 
                slidesPerView: 3, 
                centeredSlides: false,
                spaceBetween: 0 
              },
            }}
            className="w-full !overflow-visible lg:!overflow-hidden"
          >
            {cards.map((card, i) => (
              <SwiperSlide key={i} className="!h-auto group">
                <div className="flex flex-col gap-12 items-center text-center py-8 md:py-12 h-full px-4">
                  
                  <div
                    className="w-[53px] h-[53px] bg-[#0bf] rounded-[12px] flex items-center justify-center flex-shrink-0 border-[1.5px] border-[#0bf] relative z-10
                    transition-all duration-[2000ms] ease-in-out
                    
                    group-[.swiper-slide-active]:shadow-[0_0_0_15px_rgba(0,187,255,0.25)] 
                    
                    lg:group-[.swiper-slide-active]:shadow-none 
                    lg:group-[.swiper-slide-next]:shadow-[0_0_0_15px_rgba(0,187,255,0.25)]"
                  >
                    {card.icon}
                  </div>

                  <div className="flex flex-col gap-4 items-center max-w-sm">
                    <h3 className="font-space-grotesk font-medium text-black/80 text-xl tracking-[-0.48px] uppercase leading-[26px]">
                      {card.title}
                    </h3>
                    <p className="font-red-hat font-medium text-black/50 text-base md:text-sm lg:text-base tracking-[-0.36px] leading-[22px] md:leading-[26px] max-w-[280px] md:max-w-[480px]">
                      {card.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="200"
        className="flex items-center justify-center gap-2 mt-8"
      >
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="w-[71px] h-10 rounded-lg bg-[#252525] flex items-center justify-center text-white/60 hover:text-white hover:bg-[#333] transition-all duration-300 cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="w-[71px] h-10 rounded-lg bg-[#252525] flex items-center justify-center text-white/60 hover:text-white hover:bg-[#333] transition-all duration-300 cursor-pointer"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  )
}