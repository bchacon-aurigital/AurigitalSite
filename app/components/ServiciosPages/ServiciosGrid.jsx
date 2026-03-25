'use client'

function Card({ icon, title, description, highlighted }) {
  return (
    <div className={`${highlighted ? 'bg-[#B2FF00]' : 'bg-[#252525]'} rounded-[26px] px-6 md:px-8 py-8 md:py-10 min-h-[240px] md:min-h-[260px] flex flex-col justify-between overflow-hidden`}>
      <div className={`mb-12 w-[44px] h-[44px] rounded-[10px] border-[2px] ${highlighted ? 'border-[#1c1c1c]' : 'border-[#B2FF00]'} flex items-center justify-center flex-shrink-0`}>
        {highlighted
          ? <span className="[&_svg]:text-[#1c1c1c]">{icon}</span>
          : icon}
      </div>
      <div className="flex flex-col">
        <h3 className={`font-space-grotesk font-medium ${highlighted ? 'text-[#1c1c1c]' : 'text-white/80'} text-lg md:text-xl lg:text-2xl leading-[26px] tracking-[-0.48px]`}>
          {title}
        </h3>
        <p className={`font-red-hat font-medium ${highlighted ? 'text-[#1c1c1c]/70' : 'text-white/50'} text-sm md:text-base leading-[24px] tracking-[-0.36px]`}>
          {description}
        </p>
      </div>
    </div>
  )
}

export default function ServiciosGrid({ subtitle, title, description, cards, layout = 'grid', columns = 3 }) {
  const isFeatured = layout === 'featured'

  const topCards = isFeatured ? cards.slice(0, 3) : cards
  const bottomCard = isFeatured ? cards[cards.length - 1] : null

  const gridCols = columns === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'lg:grid-cols-3'

  return (
    <section className="bg-[#1c1c1c] px-6 md:px-10 lg:px-14 py-10 lg:py-16">
      <div
        data-aos="fade-up"
        className="flex flex-col items-center gap-4 text-center pb-10 md:pb-14"
      >
        {subtitle && (
          <span className="font-space-grotesk font-medium text-white/50 text-base md:text-lg tracking-[-0.36px] uppercase leading-[24px]">
            {subtitle}
          </span>
        )}
        <h2 className="font-space-grotesk font-medium text-white/80 text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-[-0.8px] uppercase leading-[1.1] max-w-[900px]">
          {title}
        </h2>
        {description && (
          <div className="font-red-hat font-medium text-white/50 text-base leading-[24px] tracking-[-0.36px] max-w-[462px]">
            {description}
          </div>
        )}
      </div>

      <div data-aos="fade-up" data-aos-delay="150" className="flex flex-col gap-3">
        {isFeatured ? (
          <>
            <div className="grid lg:grid-cols-3 gap-3">
              {topCards.map((card, i) => (
                <Card key={i} {...card} />
              ))}
            </div>
            {bottomCard && (
              <Card {...bottomCard} />
            )}
          </>
        ) : (
          <div className={`grid ${gridCols} gap-3`}>
            {cards.map((card, i) => (
              <Card key={i} {...card} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
