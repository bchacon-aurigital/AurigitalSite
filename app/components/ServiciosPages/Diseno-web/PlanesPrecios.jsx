'use client'

import { Check, RefreshCw, Server, HeadphonesIcon } from 'lucide-react'
import { IoSettings } from "react-icons/io5";
import { useContactModal } from '@/app/context/ContactModalContext'
import Link from 'next/link'

const BORDER = "border-white/[0.07]"

const PLAN_COLORS = [
  { label: "text-[#4dbff0]", border: "border-[#4dbff0]", check: "text-[#4dbff0]", hover: "hover:bg-[#4dbff0] hover:text-[#101010]" },
  { label: "text-[#B2FF00]", border: "border-[#B2FF00]", check: "text-[#B2FF00]", hover: "hover:bg-[#B2FF00] hover:text-[#101010]" },
  { label: "text-[#c084fc]", border: "border-[#c084fc]", check: "text-[#c084fc]", hover: "hover:bg-[#c084fc] hover:text-[#101010]" },
]

function FeatureItem({ text, checkClass }) {
  return (
    <div className="flex gap-2 items-start">
      <Check size={13} className={`${checkClass} flex-shrink-0 mt-[5px]`} strokeWidth={3} />
      <p className="font-red-hat font-light text-white/50 text-sm leading-[22px] tracking-[-0.3px]">
        {text}
      </p>
    </div>
  )
}

function PlanCard({ name, forWho, result, features, price, timeline, colorIndex, priceLabel, buttonText, onButtonClick }) {
  const color = PLAN_COLORS[colorIndex] ?? PLAN_COLORS[0]

  return (
    <div className="flex flex-col h-full p-8 lg:p-10">

      {/* Pack name + who it's for */}
      <div className={`border-b border-dashed ${BORDER} pb-6 mb-6 flex flex-col gap-3`}>
        <span className={`font-space-grotesk font-medium ${color.label} text-xs uppercase tracking-widest`}>
          {name}
        </span>
        <p className="font-space-grotesk font-medium text-white/80 text-base md:text-[17px] leading-snug tracking-[-0.02em]">
          {forWho}
        </p>
      </div>

      {/* Benefits — what you actually get */}
      <div className={`border-b border-dashed ${BORDER} pb-6 mb-6 flex flex-col gap-2.5 flex-1`}>
        {features.map((f, i) => (
          <FeatureItem key={i} text={f} checkClass={color.check} />
        ))}
      </div>

      {/* Result — aspirational close */}
      <div className={`border-b border-dashed ${BORDER} pb-6 mb-6`}>
        <p className={`font-red-hat font-medium ${color.label} text-sm leading-relaxed`}>
          {result}
        </p>
      </div>

      {/* Price + CTA */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="font-space-grotesk text-white/20 text-[10px] uppercase tracking-widest">
            {priceLabel}
          </span>
          <span className={`font-space-grotesk font-medium ${color.label} text-base`}>
            {price}
          </span>
          <span className="font-red-hat text-white/25 text-xs">
            · {timeline}
          </span>
        </div>
        <button
          onClick={onButtonClick}
          className={`border ${color.border} rounded-[10px] w-full font-space-grotesk font-medium ${color.label} cursor-pointer transition-all duration-200 ${color.hover} px-4 py-2.5 text-sm`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}

function PazMentalFeature({ icon, text }) {
  return (
    <div className="flex gap-[10px] items-center">
      {icon}
      <p className="font-red-hat font-light text-white/40 text-sm leading-[22px] tracking-[-0.32px]">
        {text}
      </p>
    </div>
  )
}

export default function PlanesPrecios({ plans, pazMental, subtitle, sectionTitle, sectionDescription, pricingNote, priceLabel, buttonText }) {
  const { openModal } = useContactModal()

  return (
    <section className="bg-[#101010] px-6 md:px-10 lg:px-14 py-10 lg:py-16">
      <div className="max-w-7xl mx-auto">

        <div className={`border border-dashed ${BORDER} rounded-sm`} data-aos="fade-up">

          {/* Section header */}
          <div className={`grid grid-cols-1 lg:grid-cols-2 border-b border-dashed ${BORDER}`}>
            <div className={`p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-dashed ${BORDER}`}>
              <span className="font-space-grotesk font-medium text-white/30 text-sm uppercase tracking-widest block mb-4">
                {subtitle}
              </span>
              <h2 className="font-space-grotesk font-medium text-white/90 text-2xl md:text-3xl lg:text-4xl tracking-tight uppercase leading-[1.15]">
                {sectionTitle}
              </h2>
            </div>
            <div className="p-8 lg:p-12 flex items-center">
              <p className="font-red-hat font-light text-white/40 text-base leading-relaxed max-w-md">
                {sectionDescription}
              </p>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3">
            {plans.map((plan, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className={i < plans.length - 1 ? `border-b md:border-b-0 md:border-r border-dashed ${BORDER}` : ''}
              >
                <PlanCard
                  {...plan}
                  colorIndex={i}
                  priceLabel={priceLabel}
                  buttonText={buttonText}
                  onButtonClick={openModal}
                />
              </div>
            ))}
          </div>
        </div>

        <p
          data-aos="fade-up"
          className="font-red-hat font-light text-white/30 text-sm leading-[24px] tracking-[-0.36px] text-center mt-8 max-w-[440px] mx-auto"
        >
          {pricingNote}
        </p>

        {/* Paz Mental */}
        {pazMental && (
          <div
            data-aos="fade-up"
            className={`border border-dashed ${BORDER} rounded-sm px-8 md:px-10 lg:px-12 mt-10 lg:mt-14 py-10`}
          >
            <div className={`border-b border-dashed ${BORDER} pb-6 mb-8`}>
              <span className="font-space-grotesk font-medium text-white/30 text-xs uppercase tracking-widest block mb-3">
                {pazMental.subtitle}
              </span>
              <h3 className="font-space-grotesk font-medium text-white/80 text-xl md:text-2xl lg:text-[26px] tracking-tight uppercase leading-[1.2] max-w-[850px]">
                {pazMental.heading}{' '}
                <Link className="text-[#B2FF00] font-bold italic hover:underline" href="/mantenimiento-y-evolucion-web/">
                  {pazMental.headingLink}
                </Link>
              </h3>
            </div>

            <div className={`border-b border-dashed ${BORDER} pb-8 mb-6 flex flex-wrap gap-6 lg:gap-10`}>
              <PazMentalFeature icon={<IoSettings size={18} className="text-white/50 flex-shrink-0" />} text={pazMental.features[0]} />
              <PazMentalFeature icon={<HeadphonesIcon size={18} className="text-white/50 flex-shrink-0" />} text={pazMental.features[1]} />
              <PazMentalFeature icon={<RefreshCw size={18} className="text-white/50 flex-shrink-0" />} text={pazMental.features[2]} />
              <PazMentalFeature icon={<Server size={16} className="text-white/50 flex-shrink-0" />} text={pazMental.features[3]} />
            </div>

            <div className={`border border-dashed ${BORDER} rounded-sm px-6 md:px-8 py-6 mb-6`}>
              <span className="font-space-grotesk font-medium text-white/30 text-xs uppercase tracking-widest block mb-2">
                {pazMental.priceLabel}
              </span>
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="font-space-grotesk font-medium text-white/80 text-lg md:text-xl">
                  {pazMental.priceValue}
                </span>
                <span className="font-red-hat font-light text-white/40 text-sm">
                  {pazMental.priceNote}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-space-grotesk font-medium text-white/60 text-base tracking-tight">
                {pazMental.footerLeft}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="font-red-hat font-light text-white/30 text-sm">
                {pazMental.footerRight}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
