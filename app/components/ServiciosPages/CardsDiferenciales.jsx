'use client'

import { Plus } from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from 'react'

function Card({ title, description, isActive }) {
  const cardRef = useRef(null)

  return (
    <div
      ref={cardRef}
      className={`group rounded-[26px] p-8 min-h-[200px] md:min-h-[270px] flex flex-col justify-between overflow-hidden transition-colors duration-300
        ${isActive ? 'bg-[#00BBFF]' : 'bg-[#252525]'}
        md:hover:bg-[#00BBFF] md:bg-[#252525]`}
    >
      <h3 className={`font-space-grotesk font-medium text-lg md:text-xl leading-[26px] tracking-[-0.56px] transition-colors duration-300 mb-2
        ${isActive ? 'text-[#1c1c1c]' : 'text-white/80'}
        md:group-hover:text-[#1c1c1c] md:text-white/80`}>
        {title}
      </h3>

      <div className="flex items-end justify-between gap-6">
        <p className={`font-red-hat font-medium text-[#1c1c1c]/70 text-base lg:text-lg leading-[26px] tracking-[-0.36px] transition-all duration-300
          ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0`}>
          {description}
        </p>

        <div className={`w-[45px] h-[45px] rounded-[12px] flex items-center justify-center flex-shrink-0 transition-colors duration-300
          ${isActive ? 'bg-[#252525]' : 'bg-[#00BBFF]'}
          md:bg-[#00BBFF] md:group-hover:bg-[#252525]`}>
          <Plus size={20} className="text-white" strokeWidth={2.5} />
        </div>
      </div>
    </div>
  )
}

export default function CardsDiferenciales({ subtitle, title, description, badge, cards, columns = 3 }) {
  const [activeIndex, setActiveIndex] = useState(-1)
  const [isMobile, setIsMobile] = useState(false)
  const cardRefs = useRef([])
  const observerRef = useRef(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!isMobile) {
      setActiveIndex(-1)
      return
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target)
            if (index !== -1) setActiveIndex(index)
          }
        })
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    )

    cardRefs.current.forEach((ref) => {
      if (ref) observerRef.current.observe(ref)
    })

    return () => observerRef.current?.disconnect()
  }, [isMobile, cards])

  const setCardRef = useCallback((el, i) => {
    cardRefs.current[i] = el
  }, [])

  return (
    <section className="bg-[#e9e9e9] px-6 md:px-10 lg:px-14 py-10 lg:py-16">
      <div
        data-aos="fade-up"
        className="border-b border-[#aeaeae] pb-10 md:pb-12"
      >
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-14">
          <div className="flex flex-col gap-4 order-2 md:order-1">
            {subtitle && (
              <span className="font-space-grotesk font-medium text-black/50 text-base md:text-lg tracking-[-0.36px] uppercase">
                {subtitle}
              </span>
            )}
            <h2 className="font-space-grotesk font-medium text-black/80 text-2xl md:text-3xl lg:text-4xl tracking-[-0.8px] uppercase leading-[1.1] max-w-[700px]">
              {title}
            </h2>
          </div>

          {badge && (
            <span className="order-1 md:order-2 font-space-grotesk font-medium text-base text-[#252525] uppercase border-[1.5px] border-[#252525] rounded-[12px] px-5 py-2 whitespace-nowrap self-start">
              {badge}
            </span>
          )}

          {description && (
            <div className="order-2 font-red-hat font-medium text-black/70 text-base leading-[24px] tracking-[-0.36px] max-w-[500px] lg:max-w-[587px]">
              {description}
            </div>
          )}
        </div>
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="150"
        className={`grid gap-3 pt-10 md:pt-14 ${columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}
      >
        {cards.map((card, i) => (
          <div key={i} ref={(el) => setCardRef(el, i)}>
            <Card {...card} isActive={isMobile && activeIndex === i} />
          </div>
        ))}
      </div>
    </section>
  )
}
