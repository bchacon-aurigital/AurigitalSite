'use client'

import { Check, RefreshCw, Server, HeadphonesIcon } from 'lucide-react'
import { IoSettings } from "react-icons/io5";

import Link from 'next/link'

function FeatureItem({ text, small }) {
  return (
    <div className="flex gap-2 items-start">
      <Check size={small ? 13 : 14} className="text-[#B2FF00] flex-shrink-0 mt-[5px]" strokeWidth={3} />
      <p className={`font-red-hat font-medium text-white/50 leading-[22px] tracking-[-0.36px] ${small ? 'text-xs md:text-sm' : 'text-sm md:text-[15px]'}`}>
        {text}
      </p>
    </div>
  )
}

function PlanCard({ name, price, timeline, idealPara, features, featured }) {
  return (
    <div className={`bg-[#1c1c1c] rounded-[26px] flex flex-col items-center overflow-hidden ${featured ? 'px-6 md:px-8 lg:px-10 pt-10 lg:pt-[52px] pb-10 lg:pb-[44px] gap-7' : 'px-5 md:px-7 lg:px-8 pt-8 lg:pt-10 pb-8 lg:pb-10 gap-6'}`}>
      <div className="border-b border-[#3b3b3b] pb-5 w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className={`font-space-grotesk font-medium text-white/50 tracking-[-0.36px] uppercase leading-[24px] ${featured ? 'text-sm md:text-base' : 'text-xs md:text-sm'}`}>
            {name}
          </span>
          <span className={`font-space-grotesk font-medium text-white/90 tracking-[-0.64px] uppercase leading-[24px] ${featured ? 'text-xl md:text-2xl lg:text-[28px]' : 'text-lg md:text-xl lg:text-2xl'}`}>
            {price}
          </span>
          <span className={`font-space-grotesk font-medium text-white/50 tracking-[-0.36px] leading-[24px] ${featured ? 'text-sm md:text-base' : 'text-xs md:text-sm'}`}>
            {timeline}
          </span>
        </div>
        <p className={`font-space-grotesk font-medium tracking-[-0.36px] leading-[22px] ${featured ? 'text-sm md:text-base' : 'text-xs md:text-sm'}`}>
          <span className="text-white/80">Ideal para: </span>
          <span className="text-white/50">{idealPara}</span>
        </p>
      </div>

      <div className="flex flex-col gap-6 items-center justify-center w-full">
        <div className={`border-b border-[#3b3b3b] pb-5 w-full flex flex-col ${featured ? 'gap-2.5' : 'gap-2'}`}>
          {features.map((f, i) => (
            <FeatureItem key={i} text={f} small={!featured} />
          ))}
        </div>
        <button className={`border-[1.5px] border-[#b2ff00] rounded-[12px] w-full font-space-grotesk font-medium text-[#b2ff00] cursor-pointer transition-colors hover:bg-[#b2ff00] hover:text-[#1c1c1c] ${featured ? 'px-5 py-3 text-sm md:text-base' : 'px-4 py-2.5 text-xs md:text-sm'}`}>
          PORQUÉ NOSOTROS
        </button>
      </div>
    </div>
  )
}

function PazMentalFeature({ icon, text }) {
  return (
    <div className="flex gap-[10px] items-center">
      {icon}
      <p className="font-red-hat font-medium text-black/50 text-sm md:text-sm lg:text-sm leading-[22px] tracking-[-0.32px]">
        {text}
      </p>
    </div>
  )
}

export default function PlanesPrecios({ plans, pazMental }) {
  return (
    <section className="bg-[#e9e9e9] px-6 md:px-10 lg:px-14 py-10 lg:py-16">
      <div className="max-w-7xl mx-auto">
        <div
          data-aos="fade-up"
          className="flex flex-col items-center gap-4 text-center pb-10 md:pb-14"
        >
          <span className="font-space-grotesk font-medium text-black/50 text-base md:text-lg tracking-[-0.36px] uppercase leading-[24px]">
            PLANES AURIGITAL
          </span>
          <h2 className="font-space-grotesk font-medium text-black/80 text-2xl md:text-3xl lg:text-4xl tracking-[-0.96px] uppercase leading-[1.18] max-w-[900px]">
            Precios de diseño web en Costa Rica: diseño, estructura y tecnología alineadas a tu marca
          </h2>
          <p className="font-red-hat font-medium text-black/50 text-base leading-[24px] tracking-[-0.36px] max-w-[704px]">
            Si tus clientes ya te buscan por reputación; tu web tiene que estar a la altura y además facilitarte la operación. Elegí el paquete que mejor se adapte a tu negocio.
          </p>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="150"
          className="grid lg:grid-cols-3 gap-3 items-center"
        >
          {plans.map((plan, i) => (
            <PlanCard key={i} {...plan} featured={i === 1} />
          ))}
        </div>

        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="font-red-hat font-medium text-black/50 text-base md:text-lg leading-[24px] tracking-[-0.36px] text-center mt-10 md:mt-14 max-w-[410px] mx-auto"
        >
          Los precios son estimados. Cada proyecto es único y el precio final depende del alcance específico
        </p>

        {/* Paz Mental */}
        {pazMental && (
          <div
            data-aos="fade-up"
            data-aos-delay="250"
            className="border border-black/40 rounded-[26px] px-6 md:px-8 lg:px-10 mt-10 lg:mt-16 py-10 overflow-hidden"
          >
            {/* PM Header */}
            <div className="border-b border-[#cacaca] pb-6 mb-8">
              <span className="font-space-grotesk font-medium text-black/50 text-sm md:text-base lg:text-base tracking-[-0.36px] uppercase leading-[24px] block mb-3">
                {pazMental.subtitle}
              </span>
              <h3 className="font-space-grotesk font-medium text-black/80 text-xl md:text-2xl lg:text-[26px] tracking-[-0.64px] uppercase leading-[1.2] max-w-[850px]">
                Si querés continuidad sin improvisación, conocé nuestro servicio de{' '}
                <Link className='font-black italic' href="/plan-paz-mental">
                  mantenimiento y evolución web Paz Mental
                </Link>
              </h3>
            </div>

            {/* PM Features */}
            <div className="border-b border-[#cacaca] pb-8 mb-6 flex flex-wrap gap-6 lg:gap-8">
              <PazMentalFeature
                icon={<IoSettings size={20} className="text-black flex-shrink-0" />}
                text="Ajustes menores y correcciones rápidas"
              />
              <PazMentalFeature
                icon={<HeadphonesIcon size={20} className="text-black flex-shrink-0" />}
                text="Soporte directo para cambios y evolutivo"
              />
              <PazMentalFeature
                icon={<RefreshCw size={20} className="text-black flex-shrink-0" />}
                text="Actualizaciones y mejoras continuas priorizadas"
              />
              <PazMentalFeature
                icon={<Server size={18} className="text-black flex-shrink-0" />}
                text="Backups y monitoreo básico"
              />
            </div>

            <div className="border border-[#252525]/40 rounded-[12px] px-5 md:px-7 py-6 md:py-8 mb-6">
              <span className="font-space-grotesk font-medium text-[#2f2f2f]/50 text-base md:text-lg lg:text-lg tracking-[-0.2px] uppercase leading-[24px] block mb-1.5">
                Precio:
              </span>
              <div className="flex flex-wrap items-end gap-3">
                <span className="font-space-grotesk font-medium text-[#252525] text-xl md:text-xl lg:text-xl">
                  Desde USD $120 / mes
                </span>
                <span className="font-red-hat font-medium text-[#2f2f2f] text-sm md:text-base leading-[24px]">
                  (según frecuencia y alcance)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-space-grotesk font-medium text-black/70 text-base md:text-lg lg:text-lg tracking-[-0.4px] leading-[26px]">
                Orden y continuidad
              </span>
              <span className="w-1 h-1 rounded-full bg-black/40" />
              <span className="font-red-hat font-medium text-black/40 text-sm md:text-base lg:text-base tracking-[-0.36px] leading-[26px]">
                no improvisación
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
