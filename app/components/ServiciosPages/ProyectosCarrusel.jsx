'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import TextCarousel from './ui/TextCarousel'

export default function ProyectosCarrusel() {
  const { translations } = useLanguage()
  const proyectos = translations.proyectosCarrusel.projects

  return (
    <div className="bg-[#ddd] relative px-6 md:px-10 lg:px-14 py-4">
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-row items-center justify-center gap-2 flex-shrink-0">
          <div className="bg-[#B2FF00] rounded-full w-[7px] h-[7px]" />
          <p className="font-space-grotesk font-normal text-[#1c1c1c] text-lg tracking-[-0.36px] uppercase whitespace-nowrap">
            {translations.proyectosCarrusel.nowCreating}
          </p>
        </div>

        <div className="flex-1 overflow-hidden relative h-8">
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-[#ddd] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-[#ddd] to-transparent z-10 pointer-events-none" />

          <TextCarousel
            items={proyectos}
            speed={40}
            className="h-full items-center"
            separator={<span className="w-10 flex-shrink-0" />}
            renderItem={(proyecto) => (
              <div className="flex flex-row items-center gap-3 whitespace-nowrap flex-shrink-0">
                <p className="font-red-hat font-bold text-[#464646] text-base tracking-[-0.32px]">
                  {proyecto.title}
                </p>
                <span className="bg-[#464646] rounded-full w-[3px] h-[3px] flex-shrink-0" />
                <p className="font-red-hat font-medium text-[#707070] text-base tracking-[-0.32px]">
                  {proyecto.description}
                </p>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  )
}
