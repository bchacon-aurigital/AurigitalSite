'use client'

import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'

export default function TabsDesarrollo({ subtitle, title, tabs }) {
  const activeRef = useRef(0)
  const progressRefs = useRef([])
  const detailRefs = useRef([])
  const imageRefs = useRef([])
  const tlRef = useRef(null)
  const DURATION = 5

  const goToTab = useCallback((index) => {
    const prev = activeRef.current
    if (tlRef.current) tlRef.current.kill()

    progressRefs.current.forEach(bar => {
      if (bar) gsap.set(bar, { scaleX: 0 })
    })

    if (prev !== index && detailRefs.current[prev]) {
      gsap.to(detailRefs.current[prev], {
        height: 0, opacity: 0, duration: 0.4, ease: 'power2.inOut'
      })
    }

    if (prev !== index && detailRefs.current[index]) {
      const el = detailRefs.current[index]
      gsap.set(el, { height: 'auto' })
      const h = el.scrollHeight
      gsap.fromTo(el,
        { height: 0, opacity: 0 },
        { height: h, opacity: 1, duration: 0.4, ease: 'power2.inOut' }
      )
    }

    if (prev !== index) {
      imageRefs.current.forEach((img, i) => {
        if (!img) return
        gsap.to(img, {
          autoAlpha: i === index ? 1 : 0,
          duration: 0.4
        })
      })
    }

    activeRef.current = index

    const tl = gsap.timeline({
      onComplete: () => goToTab((index + 1) % tabs.length)
    })
    tl.fromTo(
      progressRefs.current[index],
      { scaleX: 0 },
      { scaleX: 1, duration: DURATION, ease: 'none' }
    )
    tlRef.current = tl
  }, [tabs.length])

  useEffect(() => {
    detailRefs.current.forEach((el, i) => {
      if (!el) return
      gsap.set(el, i === 0
        ? { height: 'auto', opacity: 1 }
        : { height: 0, opacity: 0 }
      )
    })

    imageRefs.current.forEach((el, i) => {
      if (!el) return
      gsap.set(el, { autoAlpha: i === 0 ? 1 : 0 })
    })

    const tl = gsap.timeline({
      onComplete: () => goToTab(1 % tabs.length)
    })
    tl.fromTo(
      progressRefs.current[0],
      { scaleX: 0 },
      { scaleX: 1, duration: DURATION, ease: 'none' }
    )
    tlRef.current = tl

    return () => { if (tlRef.current) tlRef.current.kill() }
  }, [goToTab, tabs.length])

  return (
    <section className="bg-[#1c1c1c] px-6 md:px-10 lg:px-14 py-10 lg:py-16">
      <div className="flex flex-col lg:flex-row lg:items-stretch lg:justify-between lg:gap-16">

        <div className="w-full lg:w-[35%]">
          <div data-aos="fade-up" className="mb-8 lg:mb-10">
            {subtitle && (
              <span className="font-space-grotesk font-medium text-white/50 text-base md:text-lg tracking-[-0.36px] uppercase leading-[24px] block mb-4">
                {subtitle}
              </span>
            )}
            <h2 className="font-space-grotesk font-medium text-white/80 text-2xl md:text-3xl lg:text-4xl tracking-[-0.96px] uppercase leading-[1.18] xl:max-w-md">
              {title}
            </h2>
          </div>

          <div data-aos="fade-up" data-aos-delay="150">
            {tabs.map((tab, i) => (
              <div
                key={i}
                onClick={() => { if (i !== activeRef.current) goToTab(i) }}
                className="border-b border-white/20 cursor-pointer relative"
              >
                <div className="flex items-center gap-6 md:gap-8 py-6">
                  <div className="w-[44px] h-[44px] rounded-full border-[2px] border-[#b2ff00] flex items-center justify-center flex-shrink-0">
                    <span className="font-space-grotesk font-medium text-[#b2ff00] text-base uppercase">
                      {tab.number}
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="font-space-grotesk font-medium text-white/80 text-lg md:text-xl tracking-[-0.48px] leading-[36px]">
                      {tab.title}
                    </h3>
                    <div ref={el => detailRefs.current[i] = el} className="overflow-hidden">
                      <p className="mt-3 font-red-hat font-medium text-white/50 text-base tracking-[-0.36px] leading-[26px] pb-2">
                        {tab.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  ref={el => progressRefs.current[i] = el}
                  className="absolute -bottom-px left-0 right-0 h-[2px] bg-[#b2ff00] origin-left z-10"
                  style={{ transform: 'scaleX(0)' }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full aspect-video mt-5 lg:mt-0 lg:w-[55%]">
          <div className="relative w-full h-full bg-[rgba(233,233,233,0.05)] rounded-l-[26px] overflow-hidden">
            {tabs.map((tab, i) => (
              tab.image ? (
                <img
                  key={i}
                  ref={el => imageRefs.current[i] = el}
                  src={tab.image}
                  alt={tab.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div
                  key={i}
                  ref={el => imageRefs.current[i] = el}
                  className="absolute inset-0"
                />
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
