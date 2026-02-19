'use client'

import BotonServicio from './ui/Boton'

export default function EncabezadoServicios({ title, description, ctaText, secondaryText, onCtaClick, onSecondaryClick }) {
  return (
    <section className="flex flex-col items-center justify-center py-10 lg:py-32 px-6 md:px-10 lg:px-14 bg-[#e9e9e9]">
      <div className="flex flex-col items-center gap-14 max-w-[776px]">
        <div className="flex flex-col items-center gap-10 text-center">
          <h2
            data-aos="fade-up"
            className="font-space-grotesk font-medium text-[#252525] text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.06em]"
          >
            {title}
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="150"
            className="font-red-hat font-semibold text-[#252525]/50 text-base md:text-lg lg:text-xl tracking-[-0.04em] max-w-[636px]"
          >
            {description}
          </p>
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="flex flex-col-reverse lg:flex-row gap-2 items-center"
        >
          <BotonServicio onClick={onCtaClick}>{ctaText}</BotonServicio>
          <BotonServicio onClick={onSecondaryClick} variant="outline">{secondaryText}</BotonServicio>
        </div>
      </div>
    </section>
  )
}
