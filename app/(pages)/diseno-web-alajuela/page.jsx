'use client'

import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Check, ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import NavbarServicios from '@/app/components/ServiciosPages/NavbarServicios'
import StructuredData from '@/app/components/seo/StructuredData'
import Breadcrumbs from '@/app/components/seo/Breadcrumbs'
import {
  getLocalBusinessSchema,
  getServiceSchema,
  getFAQSchema,
  getAggregateRatingSchema,
  getBreadcrumbSchema,
} from '@/app/lib/structuredData'
import TiposSitios from '@/app/components/ServiciosPages/TiposSitios'
import CasosExito from '@/app/components/ServiciosPages/CasosExito'
import PlanesPrecios from '@/app/components/ServiciosPages/Diseno-web/PlanesPrecios'
import FAQServicios from '@/app/components/ServiciosPages/FAQServicios'
import Footer from '@/app/components/Footer'
import { useLanguage } from '@/app/context/LanguageContext'
import { useContactModal } from '@/app/context/ContactModalContext'

const WA_HREF = 'https://wa.me/50688888169?text=Hola!%20Me%20gustar%C3%ADa%20cotizar%20un%20proyecto%20de%20dise%C3%B1o%20web%20en%20Alajuela'

const breadcrumbItems = [
  { name: 'Inicio', url: 'https://aurigital.com' },
  { name: 'Servicios', url: 'https://aurigital.com/servicios' },
  { name: 'Diseño Web Alajuela', url: 'https://aurigital.com/diseno-web-alajuela' },
]

function DWLink({ children }) {
  return (
    <a href="/diseno-web/" className="text-inherit underline underline-offset-2 hover:opacity-70 transition-opacity">
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

export default function DisenoWebAlajuela() {
  const { translations } = useLanguage()
  const { openModal } = useContactModal()
  const t = translations.disenoWebAlajuela ?? {}
  const shared = translations.serviciosShared ?? {}
  const tDW = translations.disenoWeb ?? {}
  const [swiper, setSwiper] = useState(null)

  useEffect(() => {
    AOS.init({ once: true, offset: 80 })
  }, [])

  const handleCTA = () => openModal()

  const faqItems = (t.faq?.items ?? []).slice(0, 5)

  return (
    <>
      <StructuredData data={getLocalBusinessSchema()} />
      <StructuredData data={getServiceSchema(
        'Diseño Web Alajuela',
        'Diseño web Alajuela a medida: prototipo navegable, UI alineada a tu marca, web rápida y móvil impecable. Para marcas con reputación.',
        '$$-$$$'
      )} />
      <StructuredData data={getFAQSchema(faqItems)} />
      <StructuredData data={getAggregateRatingSchema()} />
      <StructuredData data={getBreadcrumbSchema(breadcrumbItems)} />

      <div className="sr-only">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

    <main className="bg-[#E9E9E9] overflow-x-hidden">
      <NavbarServicios />

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section className="relative px-6 md:px-10 lg:px-14 pt-28 md:pt-36 pb-16 lg:pb-24 bg-[#E9E9E9]">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12 lg:gap-16">
          <div className="lg:max-w-[55%]">
            <p data-aos="fade-up" className="font-space-grotesk text-[#252525]/40 text-xs tracking-[0.18em] uppercase mb-5">
              Aurigital · Alajuela, Costa Rica
            </p>
            <h1
              data-aos="fade-up"
              data-aos-delay="50"
              className="font-space-grotesk font-medium text-[#252525] text-[2rem] md:text-[2.6rem] lg:text-[3rem] xl:text-[3.4rem] leading-[1.04] tracking-[-0.04em] mb-8"
            >
              {wrapDisenoWeb(t.hero?.h1)}
            </h1>
            <div data-aos="fade-up" data-aos-delay="100" className="flex flex-wrap gap-3">
              <button
                onClick={handleCTA}
                className="inline-flex items-center gap-2 bg-[#252525] hover:bg-[#101010] text-white font-space-grotesk font-medium text-sm px-6 py-3 rounded-[12px] transition-colors duration-200"
              >
                {t.hero?.ctaPrimary}
              </button>
              <button
                onClick={() => document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 border-[1.5px] border-[#252525] text-[#252525] hover:bg-[#252525] hover:text-white font-space-grotesk font-medium text-sm px-6 py-3 rounded-[12px] transition-colors duration-200"
              >
                {t.hero?.ctaSecondary}
              </button>
            </div>
          </div>

          <div className="lg:max-w-[42%] flex flex-col gap-6">
            <p data-aos="fade-up" data-aos-delay="120" className="font-red-hat font-medium text-[#252525]/70 text-base md:text-lg leading-[1.5] tracking-[-0.02em]">
              {t.hero?.description}
            </p>
            <ul data-aos="fade-up" data-aos-delay="160" className="flex flex-col gap-3">
              {(t.hero?.features ?? []).map((f, i) => (
                <li key={i} className="flex items-start gap-3 font-red-hat text-[#252525]/60 text-sm leading-[1.5]">
                  <span className="w-5 h-5 rounded-full bg-[#B2FF00] flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={11} className="text-[#101010]" strokeWidth={2.5} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Hero video */}
        <div data-aos="fade-up" data-aos-delay="200" className="max-w-[1400px] mx-auto mt-12 lg:mt-16">
          <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden">
            <video
              autoPlay muted loop playsInline preload="metadata"
              className="w-full h-full object-cover"
            >
              <source src="/assets/servicios/servicios-pages/video-Hero.webm" type="video/webm" />
              <source src="/assets/servicios/servicios-pages/video-Hero.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* ── QUIÉNES SOMOS ──────────────────────────────────────────── */}
      <section className="bg-[#1a1a1a] px-6 md:px-10 lg:px-14 py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row lg:gap-20">
          <div className="lg:w-[40%] shrink-0 mb-12 lg:mb-0">
            <p data-aos="fade-up" className="font-space-grotesk text-white/30 text-xs tracking-[0.18em] uppercase mb-5">
              {t.quienesSomos?.label}
            </p>
            <h2 data-aos="fade-up" data-aos-delay="50" className="font-space-grotesk font-medium text-white uppercase text-2xl md:text-3xl lg:text-4xl tracking-[-0.03em] leading-[1.1] mb-6">
              {wrapDisenoWeb(t.quienesSomos?.h2)}
            </h2>
            <h3 data-aos="fade-up" data-aos-delay="80" className="font-red-hat font-medium text-white/50 text-base md:text-lg leading-[1.5] tracking-[-0.02em]">
              {t.quienesSomos?.h3}
            </h3>
          </div>
          <div className="flex-1 flex flex-col gap-6">
            {[t.quienesSomos?.p1, t.quienesSomos?.p2, t.quienesSomos?.p3].map((p, i) => (
              <p key={i} data-aos="fade-up" data-aos-delay={i * 60} className="font-red-hat text-white/50 text-base md:text-lg leading-[1.65] tracking-[-0.02em]">
                {p}
              </p>
            ))}
            <div data-aos="fade-up" data-aos-delay="180" className="w-full aspect-[16/8] rounded-xl overflow-hidden mt-4">
              <img
                src="/assets/servicios/servicios-pages/DisenoWeb/GarantiaResultados3.avif"
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESO ────────────────────────────────────────────────── */}
      <section className="bg-[#E9E9E9] px-6 md:px-10 lg:px-14 py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto">
          <p data-aos="fade-up" className="font-space-grotesk text-[#252525]/40 text-xs tracking-[0.18em] uppercase mb-5">
            {t.proceso?.label}
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 lg:mb-16">
            <h2 data-aos="fade-up" data-aos-delay="50" className="font-space-grotesk font-medium text-[#252525] uppercase text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-[-0.03em] leading-[1.1] max-w-[560px]">
              {t.proceso?.h2}
            </h2>
            <p data-aos="fade-up" data-aos-delay="80" className="font-red-hat text-[#252525]/55 text-base leading-[1.6] max-w-[400px]">
              {t.proceso?.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(t.proceso?.steps ?? []).map((step, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 60}
                className="bg-white/60 border border-[#252525]/[0.08] rounded-2xl p-7 flex flex-col gap-4"
              >
                <span className="font-space-grotesk font-medium text-[#B2FF00] text-xs tracking-[0.15em] bg-[#252525] rounded-full px-3 py-1 self-start">
                  {step.number}
                </span>
                <h3 className="font-space-grotesk font-medium text-[#252525] text-lg leading-[1.2] tracking-[-0.02em]">
                  {step.h3}
                </h3>
                <p className="font-red-hat text-[#252525]/55 text-sm leading-[1.6]">{step.desc}</p>
              </div>
            ))}
          </div>

          <p data-aos="fade-up" className="font-red-hat text-[#252525]/55 text-sm mt-10 leading-[1.6]">
            {t.proceso?.auditoriaPrefix}
            <a href="/auditoria-web-tecnica/" className="text-[#252525] underline underline-offset-2 hover:opacity-70 transition-opacity font-medium">
              {t.proceso?.auditoriaLink}
            </a>
            {t.proceso?.auditoriaSuffix}
          </p>

          {/* CTA callout */}
          <div data-aos="fade-up" className="mt-10 bg-[#252525] rounded-2xl px-8 py-8 md:px-10 md:py-9 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="font-space-grotesk font-medium text-white uppercase text-lg md:text-xl lg:text-2xl tracking-[-0.03em] leading-[1.15] mb-2">
                {t.cta1?.h2}
              </p>
              <p className="font-red-hat text-white/45 text-sm leading-[1.55] max-w-[480px]">
                {t.cta1?.desc}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={handleCTA}
                className="inline-flex items-center justify-center gap-2 bg-[#B2FF00] hover:bg-[#c8ff33] text-[#101010] font-space-grotesk font-medium text-sm px-6 py-3 rounded-[10px] transition-colors duration-200"
              >
                {t.cta1?.cta} <ArrowRight size={15} />
              </button>
              <a
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white hover:bg-white/10 font-space-grotesk font-medium text-sm px-6 py-3 rounded-[10px] transition-colors duration-200"
              >
                Escribir a WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TIPOS DE SITIOS ─────────────────────────────────────────── */}
      <TiposSitios
        title={wrapDisenoWeb(t.tiposSitios?.h2)}
        badge={shared?.tiposSitios?.badge}
        items={shared?.tiposSitios?.items ?? []}
        note={
          <>
            {shared?.tiposSitios?.notePrefix}
            <a href="/funcionalidades-web-a-medida/" className="text-black/80 underline font-semibold hover:text-black transition-colors">
              {shared?.tiposSitios?.noteLink}
            </a>
            {shared?.tiposSitios?.noteSuffix}
          </>
        }
      />

      {/* ── FUNCIONALIDADES ─────────────────────────────────────────── */}
      <section className="bg-[#1e1e1e] px-6 md:px-10 lg:px-14 py-20 lg:py-24">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row lg:gap-20">
          <div className="lg:w-[42%] shrink-0 mb-12 lg:mb-0">
            <p data-aos="fade-up" className="font-space-grotesk text-white/30 text-xs tracking-[0.18em] uppercase mb-5">
              {t.funcionalidades?.label}
            </p>
            <h2 data-aos="fade-up" data-aos-delay="50" className="font-space-grotesk font-medium text-white uppercase text-2xl md:text-3xl lg:text-4xl tracking-[-0.03em] leading-[1.1] mb-6">
              {t.funcionalidades?.h2}
            </h2>
            <p data-aos="fade-up" data-aos-delay="80" className="font-red-hat text-white/45 text-sm md:text-base leading-[1.65]">
              {t.funcionalidades?.introPrefix}
              <a href="/funcionalidades-web-a-medida/" className="text-white/70 underline underline-offset-2 hover:text-white transition-colors font-medium">
                {t.funcionalidades?.introLink}
              </a>
              {t.funcionalidades?.introSuffix}
            </p>
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(t.funcionalidades?.items ?? []).map((item, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 50}
                className="flex items-center gap-4 bg-white/[0.05] border border-white/[0.07] rounded-2xl px-6 py-5"
              >
                <span className="w-8 h-8 rounded-full bg-[#B2FF00] flex items-center justify-center shrink-0">
                  <Check size={14} className="text-[#101010]" strokeWidth={2.5} />
                </span>
                <span className="font-space-grotesk font-medium text-white text-sm md:text-base tracking-[-0.01em]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTORES ────────────────────────────────────────────────── */}
      <section className="bg-[#E9E9E9] px-6 md:px-10 lg:px-14 py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto">
          <p data-aos="fade-up" className="font-space-grotesk text-[#252525]/40 text-xs tracking-[0.18em] uppercase mb-5">
            {t.sectores?.label}
          </p>
          <h2 data-aos="fade-up" data-aos-delay="50" className="font-space-grotesk font-medium text-[#252525] uppercase text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-[-0.03em] leading-[1.1] mb-4 max-w-[720px]">
            {wrapDisenoWeb(t.sectores?.h2)}
          </h2>
          <p data-aos="fade-up" data-aos-delay="80" className="font-red-hat text-[#252525]/55 text-base mb-12">
            {t.sectores?.intro}
          </p>
          <div data-aos="fade-up" data-aos-delay="120" className="flex flex-wrap gap-3">
            {(t.sectores?.items ?? []).map((item, i) => (
              <span
                key={i}
                className="font-space-grotesk font-medium text-[#252525] text-sm tracking-[-0.01em] border border-[#252525]/20 rounded-full px-5 py-2 bg-white/60 hover:bg-[#252525] hover:text-white transition-colors duration-200 cursor-default"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARA QUIÉN ──────────────────────────────────────────────── */}
      <section className="bg-[#252525] px-6 md:px-10 lg:px-14 py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row lg:gap-20">
          <div className="lg:w-[40%] shrink-0 mb-12 lg:mb-0 lg:sticky lg:top-28 lg:self-start">
            <p data-aos="fade-up" className="font-space-grotesk text-white/30 text-xs tracking-[0.18em] uppercase mb-5">
              {t.paraQuien?.label}
            </p>
            <h2 data-aos="fade-up" data-aos-delay="50" className="font-space-grotesk font-medium text-white uppercase text-2xl md:text-3xl lg:text-4xl tracking-[-0.03em] leading-[1.1]">
              {t.paraQuien?.h2}
            </h2>
          </div>
          <div className="flex-1">
            <p data-aos="fade-up" className="font-red-hat font-medium text-white/50 text-base mb-6">
              {t.paraQuien?.intro}
            </p>
            <ul className="flex flex-col divide-y divide-white/10">
              {(t.paraQuien?.items ?? []).map((item, i) => (
                <li
                  key={i}
                  data-aos="fade-up"
                  data-aos-delay={i * 50}
                  className="flex items-start gap-5 py-6"
                >
                  <span className="w-7 h-7 rounded-full bg-[#B2FF00] flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={13} className="text-[#101010]" strokeWidth={2.5} />
                  </span>
                  <span className="font-red-hat text-white/70 text-base md:text-lg leading-[1.55]">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA callout */}
            <div data-aos="fade-up" className="mt-8 bg-[#B2FF00] rounded-2xl px-8 py-8 md:px-10 md:py-10 flex flex-col gap-6">
              <div>
                <p className="font-space-grotesk font-medium text-[#101010] uppercase text-2xl md:text-3xl lg:text-4xl tracking-[-0.03em] leading-[1.1] mb-3">
                  {t.cta2?.h2}
                </p>
                <p className="font-red-hat text-[#101010]/60 text-sm md:text-base leading-[1.55] max-w-[520px]">
                  {t.cta2?.desc}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleCTA}
                  className="inline-flex items-center justify-center gap-2 bg-[#101010] hover:bg-[#252525] text-white font-space-grotesk font-medium text-sm px-6 py-3 rounded-[10px] transition-colors duration-200"
                >
                  {t.cta2?.cta} <ArrowRight size={15} />
                </button>
                <a
                  href={WA_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-[#101010]/30 text-[#101010] hover:bg-[#101010]/10 font-space-grotesk font-medium text-sm px-6 py-3 rounded-[10px] transition-colors duration-200"
                >
                  Escribir a WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CASOS DE ÉXITO ──────────────────────────────────────────── */}
      <CasosExito
        subtitle={t.casos?.label}
        title={t.casos?.h2}
        description={t.casos?.desc}
        cases={t.casos?.items ?? []}
      />

      {/* ── POR QUÉ ELEGIRNOS ───────────────────────────────────────── */}
      <section className="bg-[#1a1a1a] px-6 md:px-10 lg:px-14 py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto">
          <p data-aos="fade-up" className="font-space-grotesk text-white/30 text-xs tracking-[0.18em] uppercase mb-5">
            {t.porQue?.label}
          </p>
          <h2 data-aos="fade-up" data-aos-delay="50" className="font-space-grotesk font-medium text-white uppercase text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-[-0.03em] leading-[1.1] mb-14 max-w-[680px]">
            {wrapDisenoWeb(t.porQue?.h2)}
          </h2>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {(t.porQue?.stats ?? []).map((s, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 60}
                className="bg-white/[0.05] border border-white/[0.07] rounded-2xl p-7 flex flex-col gap-2"
              >
                <span className="font-space-grotesk font-medium text-[#B2FF00] text-4xl md:text-5xl tracking-[-0.04em] leading-none">{s.stat}</span>
                <span className="font-red-hat text-white/45 text-sm leading-[1.4]">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Features list */}
          <ul className="flex flex-col divide-y divide-white/10">
            {(t.porQue?.features ?? []).map((f, i) => (
              <li
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 40}
                className="flex items-center gap-5 py-5"
              >
                <span className="w-6 h-6 rounded-full bg-[#B2FF00] flex items-center justify-center shrink-0">
                  <Check size={12} className="text-[#101010]" strokeWidth={2.5} />
                </span>
                <span className="font-red-hat text-white/70 text-base md:text-lg leading-[1.4]">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── PRECIOS ─────────────────────────────────────────────────── */}
      <div id="planes">
        <PlanesPrecios
          subtitle={shared?.planesPrecios?.subtitle}
          sectionTitle={t.precios?.h2}
          sectionDescription={t.precios?.intro}
          pricingNote={shared?.planesPrecios?.pricingNote}
          idealParaLabel={shared?.planesPrecios?.idealParaLabel}
          buttonText={shared?.planesPrecios?.buttonText}
          plans={tDW?.planes?.plans ?? []}
          pazMental={{
            subtitle: tDW?.planes?.pazMentalSubtitle,
            heading: shared?.planesPrecios?.pazMental?.heading,
            headingLink: shared?.planesPrecios?.pazMental?.headingLink,
            features: shared?.planesPrecios?.pazMental?.features,
            priceLabel: shared?.planesPrecios?.pazMental?.priceLabel,
            priceValue: shared?.planesPrecios?.pazMental?.priceValue,
            priceNote: shared?.planesPrecios?.pazMental?.priceNote,
            footerLeft: shared?.planesPrecios?.pazMental?.footerLeft,
            footerRight: shared?.planesPrecios?.pazMental?.footerRight,
          }}
        />
      </div>

      {/* CTA callout — after precios */}
      <section className="bg-[#E9E9E9] px-6 md:px-10 lg:px-14 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto">
          <div data-aos="fade-up" className="bg-[#101010] rounded-2xl px-8 py-8 md:px-10 md:py-9 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="font-space-grotesk font-medium text-white uppercase text-lg md:text-xl lg:text-2xl tracking-[-0.03em] leading-[1.15] mb-2">
                {t.cta3?.h2}
              </p>
              <p className="font-red-hat text-white/45 text-sm leading-[1.55] max-w-[480px]">
                {t.cta3?.desc}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={handleCTA}
                className="inline-flex items-center justify-center gap-2 bg-[#B2FF00] hover:bg-[#c8ff33] text-[#101010] font-space-grotesk font-medium text-sm px-6 py-3 rounded-[10px] transition-colors duration-200"
              >
                {t.cta3?.cta} <ArrowRight size={15} />
              </button>
              <a
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white hover:bg-white/10 font-space-grotesk font-medium text-sm px-6 py-3 rounded-[10px] transition-colors duration-200"
              >
                Escribir a WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ─────────────────────────────────────────────────── */}
      <section className="bg-[#1c1c1c] px-6 md:px-10 lg:px-14 py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col items-center text-center mb-14">
            <p data-aos="fade-up" className="font-space-grotesk text-white/30 text-xs tracking-[0.18em] uppercase mb-5">
              {t.reviews?.label}
            </p>
            <h2 data-aos="fade-up" data-aos-delay="50" className="font-space-grotesk font-medium text-white uppercase text-2xl md:text-3xl lg:text-4xl tracking-[-0.03em] leading-[1.1] max-w-[600px]">
              {t.reviews?.h2}
            </h2>
            <div data-aos="fade-up" data-aos-delay="80" className="flex gap-1 mt-5">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} className="text-[#B2FF00] fill-[#B2FF00]" />)}
            </div>
          </div>

          <div data-aos="fade-up" data-aos-delay="120" className="flex items-center gap-4 max-w-4xl mx-auto">
            <button
              onClick={() => swiper?.slidePrev()}
              className="hidden md:flex w-[60px] h-10 rounded-lg bg-white/[0.06] items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors shrink-0"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex-1 min-w-0">
              <Swiper onSwiper={setSwiper} loop spaceBetween={16} slidesPerView={1} className="w-full">
                {(t.reviews?.items ?? []).map((r, i) => (
                  <SwiperSlide key={i}>
                    <div className="bg-[#252525] rounded-2xl px-8 md:px-12 py-10 md:py-14 flex flex-col gap-5">
                      <p className="font-red-hat font-medium text-white/55 text-base md:text-lg text-center leading-[1.5] tracking-[-0.02em]">
                        &ldquo;{r.quote}&rdquo;
                      </p>
                      <div className="flex items-center justify-center gap-2 border-t border-white/10 pt-5">
                        <span className="font-space-grotesk font-medium text-white/80 text-base">{r.name}</span>
                        <span className="w-1 h-1 rounded-full bg-[#B2FF00]" />
                        <span className="font-red-hat text-white/40 text-sm">{r.company}</span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <button
              onClick={() => swiper?.slideNext()}
              className="hidden md:flex w-[60px] h-10 rounded-lg bg-white/[0.06] items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors shrink-0"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="flex md:hidden justify-center gap-3 mt-5">
            <button onClick={() => swiper?.slidePrev()} className="w-12 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/50">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => swiper?.slideNext()} className="w-12 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/50">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* ── CANTONES ────────────────────────────────────────────────── */}
      <section className="bg-[#E9E9E9] px-6 md:px-10 lg:px-14 py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto">
          <p data-aos="fade-up" className="font-space-grotesk text-[#252525]/40 text-xs tracking-[0.18em] uppercase mb-5">
            {t.cantones?.label}
          </p>
          <h2 data-aos="fade-up" data-aos-delay="50" className="font-space-grotesk font-medium text-[#252525] uppercase text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-[-0.03em] leading-[1.1] mb-12 max-w-[680px]">
            {wrapDisenoWeb(t.cantones?.h2)}
          </h2>
          <div data-aos="fade-up" data-aos-delay="100" className="flex flex-wrap gap-3">
            {(t.cantones?.items ?? []).map((canton, i) => (
              <span
                key={i}
                className="font-space-grotesk text-[#252525] text-sm tracking-[-0.01em] border border-[#252525]/15 rounded-full px-5 py-2 bg-white/60"
              >
                {canton}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <FAQServicios
        layout="split"
        subtitle={t.faq?.label}
        title={wrapDisenoWeb(t.faq?.h2)}
        faqs={(t.faq?.items ?? []).map(item => ({ question: item.question, answer: item.answer }))}
      />

      <Footer />
    </main>
    </>
  )
}
