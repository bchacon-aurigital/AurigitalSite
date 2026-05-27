'use client'

import { useEffect, useRef } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { ArrowRight } from 'lucide-react'
import NavbarServicios from '@/app/components/ServiciosPages/NavbarServicios'
import StructuredData from '@/app/components/seo/StructuredData'
import Breadcrumbs from '@/app/components/seo/Breadcrumbs'
import {
  getLocalBusinessSchema,
  getServiceSchema,
  getAggregateRatingSchema,
  getBreadcrumbSchema,
} from '@/app/lib/structuredData'
import CasosExito from '@/app/components/ServiciosPages/CasosExito'
import Footer from '@/app/components/Footer'
import { useLanguage } from '@/app/context/LanguageContext'
import { useContactModal } from '@/app/context/ContactModalContext'

const WA_HREF =
  'https://wa.me/50688888169?text=Hola!%20Me%20gustar%C3%ADa%20consultar%20sobre%20dise%C3%B1o%20web%20para%20abogados'

const breadcrumbItems = [
  { name: 'Inicio', url: 'https://aurigital.com' },
  { name: 'Servicios', url: 'https://aurigital.com/servicios' },
  { name: 'Diseño Web para Abogados', url: 'https://aurigital.com/diseno-web-abogados' },
]

function DWLink({ children }) {
  return (
    <a href="/diseno-web/" className="text-inherit underline underline-offset-2 hover:opacity-70 transition-opacity">
      {children}
    </a>
  )
}

function DevLink({ children }) {
  return (
    <a href="/desarrollo-web/" className="text-inherit underline underline-offset-2 hover:opacity-70 transition-opacity">
      {children}
    </a>
  )
}

function wrapDisenoWeb(text) {
  if (!text) return null
  const lower = text.toLowerCase()
  const idx = lower.indexOf('diseño web')
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <DWLink>{text.slice(idx, idx + 10)}</DWLink>
      {text.slice(idx + 10)}
    </>
  )
}

function wrapDesarrolloWeb(text) {
  if (!text) return null
  const lower = text.toLowerCase()
  const idx = lower.indexOf('desarrollo web')
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <DevLink>{text.slice(idx, idx + 14)}</DevLink>
      {text.slice(idx + 14)}
    </>
  )
}

export default function DisenoWebAbogados() {
  const { translations } = useLanguage()
  const { openModal } = useContactModal()
  const t = translations.disenoWebAbogados ?? {}
  const shared = translations.serviciosShared ?? {}
  const videoRef = useRef(null)

  useEffect(() => {
    AOS.init({ once: true, offset: 80 })
  }, [])

  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    if (!videoRef.current || isIOS) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) videoRef.current?.play().catch(() => {})
        else videoRef.current?.pause()
      },
      { threshold: 0.1 }
    )
    observer.observe(videoRef.current)
    return () => observer.disconnect()
  }, [])

  const handleCTA = () => openModal()

  return (
    <>
      <StructuredData data={getLocalBusinessSchema()} />
      <StructuredData
        data={getServiceSchema(
          'Diseño Web para Abogados',
          'Tu bufete necesita un sitio web que transmita autoridad y confianza. Diseño a medida para abogados y firmas legales. Sin plantillas. Con estrategia.',
          '$$-$$$'
        )}
      />
      <StructuredData data={getAggregateRatingSchema()} />
      <StructuredData data={getBreadcrumbSchema(breadcrumbItems)} />

      <div className="sr-only">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <main className="bg-[#E9E9E9] overflow-x-hidden">
        <NavbarServicios />

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section className="px-6 md:px-10 lg:px-14 pt-28 md:pt-36 pb-16 lg:pb-24 bg-[#E9E9E9]">
          <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12 lg:gap-16">
            <div className="lg:max-w-[55%]">
              <p data-aos="fade-up" className="font-space-grotesk text-[#252525]/40 text-xs tracking-[0.18em] uppercase mb-5">
                {t.hero?.label}
              </p>
              <h1
                data-aos="fade-up"
                data-aos-delay="50"
                className="font-space-grotesk font-medium text-[#252525] text-[2rem] md:text-[2.6rem] lg:text-[3rem] xl:text-[3.4rem] leading-[1.04] tracking-[-0.04em] mb-8"
              >
                {t.hero?.h1}
              </h1>
              <div data-aos="fade-up" data-aos-delay="100" className="flex flex-wrap gap-3">
                <button
                  onClick={handleCTA}
                  className="inline-flex items-center gap-2 bg-[#252525] hover:bg-[#101010] text-white font-space-grotesk font-medium text-sm px-6 py-3 rounded-[12px] transition-colors duration-200"
                >
                  {t.hero?.cta} <ArrowRight size={15} />
                </button>
                <a
                  href={WA_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-[1.5px] border-[#252525] text-[#252525] hover:bg-[#252525] hover:text-white font-space-grotesk font-medium text-sm px-6 py-3 rounded-[12px] transition-colors duration-200"
                >
                  Escribir a WhatsApp
                </a>
              </div>
            </div>

            <div className="lg:max-w-[42%] flex flex-col gap-5">
              <p data-aos="fade-up" data-aos-delay="120" className="font-red-hat font-medium text-[#252525]/70 text-base md:text-lg leading-[1.55] tracking-[-0.02em]">
                {t.hero?.p1}
              </p>
              <p data-aos="fade-up" data-aos-delay="150" className="font-red-hat text-[#252525]/50 text-base leading-[1.55]">
                {t.hero?.p2}
              </p>
            </div>
          </div>

          {/* Hero image placeholder */}
          <div data-aos="fade-up" data-aos-delay="200" className="max-w-[1400px] mx-auto mt-12 lg:mt-16">
            <div className="w-full aspect-[16/9] bg-[#d0d0d0] rounded-2xl" />
          </div>
        </section>

        {/* ── PROBLEMA ──────────────────────────────────────────────── */}
        <section className="bg-[#1a1a1a] px-6 md:px-10 lg:px-14 py-20 lg:py-28">
          <div className="max-w-[1400px] mx-auto flex flex-col items-center text-center">
            <p data-aos="fade-up" className="font-space-grotesk text-white/30 text-xs tracking-[0.18em] uppercase mb-5">
              {t.problema?.label}
            </p>
            <h2
              data-aos="fade-up"
              data-aos-delay="50"
              className="font-space-grotesk font-medium text-white uppercase text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-[-0.03em] leading-[1.1] mb-8 max-w-[780px]"
            >
              {t.problema?.h2}
            </h2>
            <p data-aos="fade-up" data-aos-delay="80" className="font-red-hat text-white/45 text-base md:text-lg leading-[1.65] max-w-[760px] mb-12">
              {t.problema?.intro}
            </p>

            <div className="w-full grid md:grid-cols-2 gap-4">
              {(t.problema?.items ?? []).map((item, i) => (
                <div
                  key={i}
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                  className="bg-white/[0.05] border border-white/[0.07] rounded-2xl p-8 lg:p-10 flex flex-col gap-4"
                >
                  <h3 className="font-space-grotesk font-medium text-white text-lg md:text-xl leading-[1.2] tracking-[-0.02em]">
                    {item.h3}
                  </h3>
                  <p className="font-red-hat text-white/45 text-sm md:text-base leading-[1.65]">{item.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOLUCIÓN ──────────────────────────────────────────────── */}
        <section className="bg-[#E9E9E9] px-6 md:px-10 lg:px-14 py-20 lg:py-28">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-14">
              <div className="lg:max-w-[55%]">
                <p data-aos="fade-up" className="font-space-grotesk text-[#252525]/40 text-xs tracking-[0.18em] uppercase mb-5">
                  {t.solucion?.label}
                </p>
                <h2
                  data-aos="fade-up"
                  data-aos-delay="50"
                  className="font-space-grotesk font-medium text-[#252525] uppercase text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-[-0.03em] leading-[1.1]"
                >
                  {t.solucion?.h2}
                </h2>
              </div>
              <p data-aos="fade-up" data-aos-delay="80" className="font-red-hat text-[#252525]/55 text-sm leading-[1.65] lg:max-w-[40%]">
                {t.solucion?.intro}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {(t.solucion?.items ?? []).map((item, i) => (
                <div
                  key={i}
                  data-aos="fade-up"
                  data-aos-delay={i * 70}
                  className="bg-white/60 border border-[#252525]/[0.08] rounded-2xl p-7 lg:p-8 flex flex-col gap-4"
                >
                  <span className="w-10 h-10 rounded-xl bg-[#252525] flex items-center justify-center shrink-0">
                    <span className="font-space-grotesk font-medium text-[#B2FF00] text-sm">0{i + 1}</span>
                  </span>
                  <h3 className="font-space-grotesk font-medium text-[#252525] text-lg leading-[1.2] tracking-[-0.02em]">
                    {item.h3}
                  </h3>
                  <p className="font-red-hat text-[#252525]/55 text-sm leading-[1.65]">{item.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESO ───────────────────────────────────────────────── */}
        <section className="bg-[#252525] px-6 md:px-10 lg:px-14 py-20 lg:py-28">
          <div className="max-w-[1400px] mx-auto">
            <p data-aos="fade-up" className="font-space-grotesk text-white/30 text-xs tracking-[0.18em] uppercase mb-5">
              {t.proceso?.label}
            </p>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 lg:mb-16">
              <h2
                data-aos="fade-up"
                data-aos-delay="50"
                className="font-space-grotesk font-medium text-white uppercase text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-[-0.03em] leading-[1.1] max-w-[560px]"
              >
                {t.proceso?.h2}
              </h2>
              <p data-aos="fade-up" data-aos-delay="80" className="font-red-hat text-white/45 text-base leading-[1.6] max-w-[420px]">
                {t.proceso?.intro}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {(t.proceso?.items ?? []).map((item, i) => (
                <div
                  key={i}
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                  className="bg-white/[0.06] border border-white/[0.08] rounded-2xl p-8 lg:p-10 flex flex-col gap-5"
                >
                  <span className="font-space-grotesk font-medium text-[#B2FF00] text-xs tracking-[0.15em] bg-[#B2FF00]/10 border border-[#B2FF00]/20 rounded-full px-3 py-1 self-start">
                    {item.number}
                  </span>
                  <h3 className="font-space-grotesk font-medium text-white text-xl md:text-2xl leading-[1.2] tracking-[-0.03em]">
                    {item.h3}
                  </h3>
                  <p className="font-red-hat text-white/45 text-sm md:text-base leading-[1.65]">{item.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BENEFICIOS ────────────────────────────────────────────── */}
        <section className="bg-[#E9E9E9] px-6 md:px-10 lg:px-14 py-20 lg:py-28">
          <div className="max-w-[1400px] mx-auto">
            <p data-aos="fade-up" className="font-space-grotesk text-[#252525]/40 text-xs tracking-[0.18em] uppercase mb-5">
              {t.beneficios?.label}
            </p>
            <h2
              data-aos="fade-up"
              data-aos-delay="50"
              className="font-space-grotesk font-medium text-[#252525] uppercase text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-[-0.03em] leading-[1.1] mb-14 max-w-[700px]"
            >
              {t.beneficios?.h2}
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {(t.beneficios?.items ?? []).map((item, i) => (
                <div
                  key={i}
                  data-aos="fade-up"
                  data-aos-delay={i * 60}
                  className={`rounded-2xl p-8 lg:p-10 flex flex-col gap-4 ${
                    i === 3
                      ? 'bg-[#252525] border border-[#252525]'
                      : 'bg-white/60 border border-[#252525]/[0.08]'
                  }`}
                >
                  <h3
                    className={`font-space-grotesk font-medium text-lg md:text-xl leading-[1.2] tracking-[-0.02em] ${
                      i === 3 ? 'text-white' : 'text-[#252525]'
                    }`}
                  >
                    {wrapDisenoWeb(item.h3)}
                  </h3>
                  <p
                    className={`font-red-hat text-sm md:text-base leading-[1.65] ${
                      i === 3 ? 'text-white/50' : 'text-[#252525]/55'
                    }`}
                  >
                    {item.p}
                  </p>
                  {i === 3 && (
                    <a
                      href="/plan-paz-mental/"
                      className="mt-2 self-start inline-flex items-center gap-2 bg-[#B2FF00] hover:bg-[#c8ff33] text-[#101010] font-space-grotesk font-medium text-sm px-5 py-2.5 rounded-[10px] transition-colors duration-200"
                    >
                      Conocer el plan <ArrowRight size={14} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CASOS DE ÉXITO ────────────────────────────────────────── */}
        <CasosExito
          subtitle={shared?.casosExito?.subtitle}
          title={<>{shared?.casosExito?.titlePart1} <br className="hidden lg:block" /> {shared?.casosExito?.titlePart2}</>}
          description={shared?.casosExito?.description}
          cases={shared?.casosExito?.cases}
        />

        {/* ── CTA FINAL — video background ──────────────────────────── */}
        <section className="relative h-[90vh] w-full overflow-hidden bg-black" aria-label="CTA final">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="metadata"
            poster="/assets/Soluciones.avif"
          >
            <source src="/assets/4.webm" type="video/webm" />
            <source src="/assets/2.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#101010]/75" />

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 md:px-10 lg:px-14">
            <p data-aos="fade-up" className="font-space-grotesk text-white/30 text-xs tracking-[0.18em] uppercase mb-6">
              {t.ctaFinal?.label}
            </p>
            <h2
              data-aos="fade-up"
              data-aos-delay="80"
              className="font-space-grotesk font-medium text-white uppercase text-3xl md:text-5xl lg:text-6xl tracking-[-0.04em] leading-[1.05] mb-6 max-w-[900px]"
            >
              {t.ctaFinal?.h2}
            </h2>
            <p
              data-aos="fade-up"
              data-aos-delay="140"
              className="font-red-hat text-white/50 text-base md:text-lg leading-[1.6] max-w-[580px] mb-10"
            >
              {t.ctaFinal?.desc}
            </p>
            <div data-aos="fade-up" data-aos-delay="200" className="flex flex-col sm:flex-row gap-4">
              <a
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#B2FF00] hover:bg-[#c8ff33] text-[#101010] font-space-grotesk font-medium text-sm px-7 py-3.5 rounded-[12px] transition-colors duration-200"
              >
                Contactar por WhatsApp
              </a>
              <a
                href="/diseno-web/#planes"
                className="inline-flex items-center justify-center gap-2 border border-white/25 text-white hover:bg-white/10 font-space-grotesk font-medium text-sm px-7 py-3.5 rounded-[12px] transition-colors duration-200"
              >
                Ver planes <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
