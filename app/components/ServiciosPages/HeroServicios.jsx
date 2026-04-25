'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(ScrollTrigger, Flip)

export default function HeroServicios({ title, description, features, videoSrc, imageSrc }) {
  const targetRef = useRef(null)
  const bigWrapperRef = useRef(null)
  const smallWrapperRef = useRef(null)

  useEffect(() => {
    const target = targetRef.current
    const bigWrapper = bigWrapperRef.current
    const smallWrapper = smallWrapperRef.current
    if (!target || !bigWrapper || !smallWrapper) return

    let tl

    function buildTimeline() {
      if (tl) {
        tl.kill()
        gsap.set(target, { clearProps: 'all' })
      }

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: bigWrapper,
          start: 'center center',
          endTrigger: smallWrapper,
          end: 'center center',
          scrub: 0.25,
        },
      })

      const bigRect = bigWrapper.getBoundingClientRect()
      const smallRect = smallWrapper.getBoundingClientRect()
      const offset =
        smallRect.top + window.pageYOffset + smallWrapper.offsetHeight / 2 -
        (bigRect.top + window.pageYOffset + bigWrapper.offsetHeight / 2)

      tl.add(
        Flip.fit(target, smallWrapper, {
          duration: offset,
          ease: 'none',
        })
      )
    }

    const isDesktop = () => window.innerWidth >= 1024

    if (isDesktop()) buildTimeline()

    let resizeTimer
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        if (isDesktop()) {
          buildTimeline()
        } else if (tl) {
          tl.kill()
          gsap.set(target, { clearProps: 'all' })
          tl = null
        }
      }, 100)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (tl) tl.kill()
    }
  }, [])

  return (
    <section className="relative bg-[#e9e9e9]">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-14 px-6 md:px-10 lg:px-14 pt-32 pb-16">
        <h1
          data-aos="fade-up"
          className="font-space-grotesk font-medium text-[#252525] text-3xl md:text-5xl lg:text-[3rem] xl:text-[3.4rem] 2xl:text-[3.9rem] leading-[0.93] tracking-[-0.04em] lg:max-w-[50%]"
        >
          {title}
        </h1>

        <div
          data-aos="fade-up"
          data-aos-delay="150"
          className="flex flex-col justify-between gap-4 lg:max-w-[45%]"
        >
          <p className="font-red-hat font-medium text-[#252525] text-base md:text-lg leading-[1.14] tracking-[-0.04em]">
            {description}
          </p>
          {features && features.length > 0 && (
            <ul className="flex flex-col">
              {features.map((feature, i) => (
                <li
                  key={i}
                  className={`font-space-grotesk font-normal text-black/60 text-sm tracking-[-0.01em] py-2 pr-6 border-[#cacaca] ${
                    i === 0 ? 'border-t' : ''
                  } ${i < features.length - 1 ? 'border-b' : ''}`}
                >
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="px-6 md:px-10 lg:px-14 pb-16 lg:pb-24">
        <div className="relative w-full aspect-[16/8] rounded-xl">
          <div ref={bigWrapperRef} className="absolute inset-0 w-full h-full">
            <div
              ref={targetRef}
              className="absolute inset-0 w-full h-full rounded-xl overflow-hidden"
              style={{ willChange: 'transform' }}
            >
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              ) : (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 -translate-y-1 w-full h-full object-cover object-center"
                >
                  <source src={videoSrc} type="video/webm" />
                </video>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex justify-center px-6 md:px-10 lg:px-14 relative z-10 -mb-20">
        <div className="relative w-[24em] h-[12em] rounded-xl">
          <div ref={smallWrapperRef} className="absolute inset-0 w-full h-full" />
        </div>
      </div>
    </section>
  )
}
