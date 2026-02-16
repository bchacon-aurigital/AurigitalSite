'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function GreenBadge({ text }) {
  return (
    <span className="font-space-grotesk font-medium text-base text-[#B2FF00] uppercase border-[2px] border-[#B2FF00] rounded-[12px] px-5 py-2 whitespace-nowrap self-start">
      {text}
    </span>
  )
}

function Images({ images }) {
  const wrapperRef = useRef(null)
  const imgsRef = useRef([])

  useEffect(() => {
    const wrapper = wrapperRef.current
    const imgs = imgsRef.current.filter(Boolean)

    if (!wrapper || imgs.length < 2) return

    gsap.set(imgs[0], { scale: 1, zIndex: imgs.length })
    imgs.slice(1).forEach((img, i) => {
      gsap.set(img, { scale: 0, zIndex: imgs.length - 1 - i })
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: 'top 50%',
        end: 'bottom 50%',
        scrub: 0.8,
      }
    })

    for (let i = 0; i < imgs.length - 1; i++) {
      tl.to(imgs[i], { scale: 0, duration: 1, ease: 'expo.inOut' })
        .to(imgs[i + 1], { scale: 1, duration: 1, ease: 'expo.inOut' }, '<')
    }

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [images])

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-[280px] md:h-[400px] lg:h-[536px] rounded-[20px] overflow-hidden bg-[#252525]"
    >
      {images.map((src, i) => (
        <img
          key={i}
          ref={el => imgsRef.current[i] = el}
          src={src}
          alt={`Diseño web ejemplo ${i + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      ))}
    </div>
  )
}

export default function GarantiaResultados({ icon, subtitle, title, description, section1, section2 }) {
  return (
    <section className="bg-[#1c1c1c] px-6 md:px-10 lg:px-14 py-10 lg:py-16">
      <div className="mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16">

        <div className="lg:w-[300px] xl:w-[340px] flex-shrink-0">
          <div className="lg:sticky lg:top-24">
            <div className="flex items-center gap-3 mb-4">
              {icon && <img src={icon} alt="" className="w-[18px] h-[20px]" />}
              <span className="font-space-grotesk text-white/60 text-base md:text-lg tracking-[-0.2px] uppercase">
                {subtitle}
              </span>
            </div>
            <h2 className="font-space-grotesk font-medium text-white/90 text-2xl md:text-3xl lg:text-4xl tracking-[-0.8px] uppercase leading-[1.15] mb-4">
              {title}
            </h2>
            <p className="font-red-hat font-medium text-white/50 text-base leading-[22px] tracking-[-0.32px]">
              {description}
            </p>
          </div>
        </div>

        <div className="flex-1 flex flex-col">

          <div data-aos="fade-up" className="border-b border-[#323232] pb-10">
            <GreenBadge text={section1.badge} />
            <h3 className="font-red-hat font-medium text-white/80 text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-[-0.64px] leading-[1.18] mt-4 mb-3">
              {section1.heading}
            </h3>
            <p className="font-red-hat font-medium text-white/50 text-base md:text-lg leading-[22px] tracking-[-0.32px] mb-6">
              {section1.text}
            </p>

            <Images images={section1.images} />

            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 lg:gap-12 mt-6">
              <span className="font-space-grotesk font-medium text-base text-white/80 uppercase border-[2px] border-white/80 rounded-[12px] px-5 py-2 whitespace-nowrap self-start">
                {section1.importaBadge}
              </span>
              <p className="font-red-hat font-medium text-white/50 text-base md:text-lg leading-[22px] tracking-[-0.32px]">
                {section1.importaText}
              </p>
            </div>
          </div>

          <div data-aos="fade-up" className="pt-10">
            <GreenBadge text={section2.badge} />
            <h3 className="font-red-hat font-medium text-white/80 text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-[-0.64px] leading-[1.18] my-5">
              {section2.heading}
            </h3>
            {section2.texts.map((t, i) => (
              <p key={i} className="ffont-red-hat font-medium text-white/50 text-base md:text-lg leading-[22px] tracking-[-0.32px] mb-3 last:mb-6">
                {t}
              </p>
            ))}

            {section2.secondImage ? (
              <img
                src={section2.secondImage}
                alt="Diseño web para tu marca"
                className="w-full h-[280px] md:h-[400px] lg:h-[536px] object-cover rounded-[20px] mb-6"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-[280px] md:h-[400px] lg:h-[536px] bg-[#252525] rounded-[20px] mb-6" />
            )}

            <p className="font-red-hat font-medium text-white/50 text-base md:text-lg leading-[22px] tracking-[-0.32px] mb-6">
              {section2.bottomText}
            </p>

            <div>
              {section2.concerns.map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className={`flex items-center gap-2.5 py-4 border-t border-[#323232]`}>
                    <Icon size={20} className="text-[#B2FF00] flex-shrink-0" strokeWidth={2} />
                    <p className="font-red-hat font-semibold text-white/60 text-sm md:text-base leading-normal tracking-[-0.16px]">
                      {item.text}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
