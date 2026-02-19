'use client'

function SitioRow({ number, title, description, tags, image, video, isLast }) {
  return (
    <div className={`flex flex-col lg:flex-row gap-6 lg:gap-6 py-4 ${!isLast ? 'border-b border-[#cacaca]' : ''}`}>
      <div className="w-full lg:w-1/2 flex-shrink-0">
        {video ? (
          <video
            src={video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-[280px] md:h-[400px] lg:h-[450px] object-cover rounded-[12px]"
          />
        ) : image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-[280px] md:h-[400px] lg:h-[450px] object-cover rounded-[12px]"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-[280px] md:h-[400px] lg:h-[450px] bg-[#d8d8d8] rounded-[12px]" />
        )}
      </div>

      <div className="flex flex-col justify-between flex-1 min-h-0">
        <div className="flex items-center justify-between font-space-grotesk text-black/80 text-lg md:text-xl lg:text-2xl leading-[51px]">
          <span>{number}</span>
          <span className="uppercase text-right text-sm md:text-xl lg:text-2xl">{title}</span>
        </div>

        <div className="flex flex-col gap-6">
          <p className="font-red-hat font-medium text-black/80 text-base md:text-lg leading-[24px]">
            {description}
          </p>

          <div className="border-t border-[#cacaca] pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <span className="font-space-grotesk text-black/80 text-xs md:text-sm tracking-[-0.18px]">
              TIPOS DE FUNCIONALIDADES WEB
            </span>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="font-red-hat font-medium text-[#616161] text-sm md:text-base bg-[#ddd] rounded-full px-3 py-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TiposSitios({ title, badge, items, note }) {
  return (
    <section className="bg-[#e9e9e9] px-6 md:px-10 lg:px-14 py-10 lg:py-16">
      <div
        data-aos="fade-up"
        className="border-b border-[#aeaeae] pb-10 md:pb-12"
      >
        <div className="flex flex-col-reverse md:flex-row items-end justify-between gap-6">
          <h2 className="font-space-grotesk font-medium text-black/80 text-2xl md:text-3xl lg:text-4xl tracking-[-0.8px] uppercase leading-[1.1] max-w-[700px]">
            {title}
          </h2>
          {badge && (
            <span className="font-space-grotesk font-medium text-base text-[#252525] uppercase border-[1.5px] border-[#252525] rounded-[12px] px-5 py-2 whitespace-nowrap self-start">
              {badge}
            </span>
          )}
        </div>
      </div>

      <div data-aos="fade-up" data-aos-delay="100" className="pt-4">
        {items.map((item, i) => (
          <SitioRow key={i} {...item} isLast={i === items.length - 1} />
        ))}
      </div>

      {note && (
        <div data-aos="fade-up" data-aos-delay="200" className="mt-8">
          <div className="bg-[#ddd] rounded-[16px] px-6 py-5">
            <div className="font-red-hat font-medium text-black/60 text-base leading-[24px] tracking-[-0.36px]">
              {note}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
