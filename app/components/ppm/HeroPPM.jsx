'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(ScrollTrigger, Flip)

export default function HeroPPM({ title, description, features, imageSrc, overlayTitle, overlaySubtitle, overlaySubtitle2, ctaWhatsapp, ctaPaquetes }) {
  const sectionRef = useRef(null)
  const targetRef = useRef(null)
  const smallWrapperRef = useRef(null)
  const bigWrapperRef = useRef(null)
  const overlayRef = useRef(null)
  const overlayTextRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const target = targetRef.current
    const smallWrapper = smallWrapperRef.current
    const bigWrapper = bigWrapperRef.current
    const overlay = overlayRef.current
    const overlayText = overlayTextRef.current
    const img = imgRef.current
    if (!target || !smallWrapper || !bigWrapper || !section) return

    let masterTimeline
    let textTween

    const getScrollRange = ({ trigger, start, endTrigger, end }) => {
      const st = ScrollTrigger.create({ trigger, start, endTrigger, end })
      const range = Math.max(1, st.end - st.start)
      st.kill()
      return range
    }

    function buildTimeline() {
      if (masterTimeline) masterTimeline.kill()
      if (textTween) textTween.kill()
      gsap.set(target, { clearProps: 'all' })
      if (overlayText) gsap.set(overlayText, { clearProps: 'all' })
      if (img) gsap.set(img, { clearProps: 'all' })

      const zoomRange = getScrollRange({
        trigger: smallWrapper,
        start: 'clamp(center center)',
        endTrigger: bigWrapper,
        end: 'center center',
      })

      masterTimeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: smallWrapper,
          start: 'clamp(center center)',
          endTrigger: section,
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      })

      masterTimeline.add(
        Flip.fit(target, bigWrapper, { duration: zoomRange, ease: 'none', scale: false })
      )

      if (overlay) {
        gsap.set(overlay, { opacity: 0 })
        masterTimeline.to(overlay, { opacity: 0.65, duration: zoomRange }, '<')
      }

      const afterRange = getScrollRange({
        trigger: bigWrapper,
        start: 'center center',
        endTrigger: section,
        end: 'bottom top',
      })

      if (img) {
        gsap.set(img, { scale: 1, transformOrigin: '50% 50%' })
        masterTimeline.to(img, { scale: 1.2, duration: afterRange }, '>')
      }

      if (overlayText) {
        gsap.set(overlayText, { opacity: 0, y: 20 })
        textTween = gsap.to(overlayText, {
          opacity: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: bigWrapper,
            start: 'center bottom',
            end: 'center center',
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
      }

      ScrollTrigger.refresh()
    }

    const isDesktop = () => window.innerWidth >= 1024

    if (isDesktop()) buildTimeline()

    let resizeTimer
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        if (isDesktop()) {
          buildTimeline()
        } else {
          if (masterTimeline) { masterTimeline.kill(); masterTimeline = null }
          if (textTween) { textTween.kill(); textTween = null }
          gsap.set(target, { clearProps: 'all' })
          if (overlayText) gsap.set(overlayText, { clearProps: 'all' })
          if (img) gsap.set(img, { clearProps: 'all' })
        }
      }, 100)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (masterTimeline) masterTimeline.kill()
      if (textTween) textTween.kill()
    }
  }, [])

  const waHref = 'https://wa.me/50688888169?text=Hola!%20Me%20gustar%C3%ADa%20consultar%20sobre%20el%20Plan%20Paz%20Mental'

  return (
    <section ref={sectionRef} className="relative bg-[#e9e9e9]">

      {/* ── Text row ─────────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-14 px-6 md:px-10 lg:px-14 pt-28 md:pt-32 pb-8 lg:pb-16">

        <div className="flex flex-col gap-6 lg:max-w-[50%]">
          <h1
            data-aos="fade-up"
            className="font-space-grotesk font-medium text-[#252525] text-[1.9rem] md:text-4xl lg:text-[2.6rem] xl:text-[2.9rem] 2xl:text-[3.2rem] leading-[1.05] tracking-[-0.04em]"
          >
            {title}
          </h1>
          <div data-aos="fade-up" data-aos-delay="100" className="flex flex-wrap gap-3">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#252525] hover:bg-[#101010] text-white font-space-grotesk font-medium text-sm px-6 py-3 rounded-[12px] transition-colors duration-200"
            >
              {ctaWhatsapp ?? 'Activar por WhatsApp'}
            </a>
            <button
              className="inline-flex items-center gap-2 border-[1.5px] border-[#252525] text-[#252525] hover:bg-[#252525] hover:text-white font-space-grotesk font-medium text-sm px-6 py-3 rounded-[12px] transition-colors duration-200"
              onClick={() => document.getElementById('paquetes')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {ctaPaquetes ?? 'Crear mi sitio web'}
            </button>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="150"
          className="flex flex-col justify-between gap-5 lg:max-w-[45%]"
        >
          <p className="font-red-hat font-medium text-[#252525] text-base md:text-lg leading-[1.45] tracking-[-0.03em]">
            {description}
          </p>
          {features && features.length > 0 && (
            <ul className="flex flex-col">
              {features.map((feature, i) => (
                <li
                  key={i}
                  className={`font-space-grotesk font-normal text-black/55 text-sm tracking-[-0.01em] py-2.5 pr-6 border-[#cacaca] ${
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

      {/* ── MOBILE image — full width with gradient overlay ────── */}
      <div className="lg:hidden px-6 md:px-10 pb-10">
        <div
          data-aos="fade-up"
          className="relative w-full rounded-2xl overflow-hidden"
          style={{ aspectRatio: '4/3' }}
        >
          <img
            src={imageSrc}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* overlay text pinned to bottom */}
          {(overlayTitle || overlaySubtitle) && (
            <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-2">
              {overlayTitle && (
                <h2 className="font-space-grotesk font-medium text-white text-lg leading-[1.2] tracking-[-0.03em]">
                  {overlayTitle}
                </h2>
              )}
              {overlaySubtitle && (
                <p className="font-red-hat text-white/65 text-sm leading-[1.5]">
                  {overlaySubtitle}
                </p>
              )}
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 self-start inline-flex items-center gap-2 bg-white text-[#101010] hover:bg-white/90 font-space-grotesk font-medium text-xs px-4 py-2 rounded-[10px] transition-colors duration-200"
              >
                {ctaWhatsapp ?? 'Activar por WhatsApp'}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* ── DESKTOP small image (animation start position) ───────── */}
      <div className="hidden lg:flex justify-end px-6 md:px-10 lg:px-14 pb-10">
        <div className="relative w-full lg:w-[45%] aspect-[16/10] rounded-xl">
          <div ref={smallWrapperRef} className="absolute inset-0">
            <div
              ref={targetRef}
              className="absolute inset-0 rounded-xl overflow-hidden"
              style={{ willChange: 'transform' }}
            >
              <img
                ref={imgRef}
                src={imageSrc}
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div ref={overlayRef} className="absolute inset-0 bg-black" style={{ opacity: 0 }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── DESKTOP full-width target (animation end position) ───── */}
      <div className="hidden lg:block px-6 md:px-10 lg:px-14 pb-16 lg:pb-24">
        <div className="relative w-full aspect-[16/8] rounded-xl">
          <div ref={bigWrapperRef} className="absolute inset-0" />
          {(overlayTitle || overlaySubtitle || overlaySubtitle2) && (
            <div
              ref={overlayTextRef}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center z-10"
              style={{ opacity: 0 }}
            >
              {overlayTitle && (
                <h2 className="font-space-grotesk font-medium text-white/90 text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-[-0.04em] leading-[1.1] max-w-[800px]">
                  {overlayTitle}
                </h2>
              )}
              {overlaySubtitle && (
                <p className="font-red-hat font-medium text-white/70 text-base md:text-lg leading-[1.5] tracking-[-0.02em] max-w-[560px]">
                  {overlaySubtitle}
                </p>
              )}
              {overlaySubtitle2 && (
                <p className="font-red-hat font-medium text-white/50 text-sm md:text-base leading-[1.5] tracking-[-0.02em] max-w-[560px]">
                  {overlaySubtitle2}
                </p>
              )}
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 bg-white text-[#101010] hover:bg-white/90 font-space-grotesk font-medium text-sm px-6 py-3 rounded-[12px] transition-colors duration-200 pointer-events-auto"
              >
                {ctaWhatsapp ?? 'Activar por WhatsApp'}
              </a>
            </div>
          )}
        </div>
      </div>

    </section>
  )
}
