'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div
      className="bg-[#1c1c1c] border-[1.5px] border-black/[0.16] rounded-[26px] overflow-hidden cursor-pointer"
      onClick={onToggle}
    >
      <div className="flex gap-5 items-center p-6 md:p-8">
        <div className="w-[46px] h-[46px] rounded-full bg-[#B2FF00] flex items-center justify-center flex-shrink-0">
          <Plus
            size={20}
            className={`text-black transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
          />
        </div>
        <h3 className="font-space-grotesk font-medium text-white/80 text-lg leading-[1.1] tracking-[-0.72px]">
          {question}
        </h3>
      </div>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <p className="font-red-hat font-medium text-white/50 text-base md:text-lg leading-[1.4] tracking-[-0.36px] px-6 md:px-8 pb-6 md:pb-8 pt-0 pl-[82px] md:pl-[86px]">
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function FAQServicios({ subtitle, title, description, faqs, layout = 'centered' }) {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const isSplit = layout === 'split'

  const midpoint = Math.ceil(faqs.length / 2)
  const leftFaqs = faqs.slice(0, midpoint)
  const rightFaqs = faqs.slice(midpoint)

  return (
    <section className="bg-[#e9e9e9] px-6 md:px-10 lg:px-14 py-10 lg:py-16">
      {isSplit ? (
        <div className="">
          <div
            data-aos="fade-up"
            className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6 xl:gap-14 pb-10 md:pb-16"
          >
            <div className="flex flex-col gap-4 xl:max-w-[38%]">
              {subtitle && (
                <span className="font-space-grotesk font-medium text-black/50 text-base md:text-lg tracking-[-0.36px] uppercase leading-[24px]">
                  {subtitle}
                </span>
              )}
              <h2 className="font-space-grotesk font-medium text-black/80 text-2xl md:text-3xl lg:text-4xl tracking-[-0.8px] uppercase leading-[1.18]">
                {title}
              </h2>
            </div>
            {description && (
              <p className="font-red-hat font-medium text-black/50 text-base leading-[24px] tracking-[-0.36px] lg:max-w-[638px]">
                {description}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div
          data-aos="fade-up"
          className="flex flex-col items-center gap-4 text-center pb-10 md:pb-16"
        >
          {subtitle && (
            <span className="font-space-grotesk font-medium text-black/50 text-base md:text-lg tracking-[-0.36px] uppercase leading-[24px]">
              {subtitle}
            </span>
          )}
          <h2 className="font-space-grotesk font-medium text-black/80 text-2xl md:text-3xl lg:text-4xl tracking-[-0.96px] uppercase leading-[1.18] max-w-[600px]">
            {title}
          </h2>
        </div>
      )}

      {/* FAQ Items */}
      <div data-aos="fade-up" data-aos-delay="150">
        {isSplit ? (
          <div className="grid md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-3 flex-1">
              {leftFaqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === i}
                  onToggle={() => toggleFAQ(i)}
                />
              ))}
            </div>
            <div className="flex flex-col gap-3 flex-1 lg:flex-none">
              {rightFaqs.map((faq, i) => {
                const globalIndex = midpoint + i
                return (
                  <FAQItem
                    key={globalIndex}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIndex === globalIndex}
                    onToggle={() => toggleFAQ(globalIndex)}
                  />
                )
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 max-w-[892px] mx-auto">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onToggle={() => toggleFAQ(i)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
