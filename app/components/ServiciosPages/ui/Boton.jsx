'use client'

import { useRef, useCallback, useId } from 'react'

export default function BotonServicio({ children, onClick, variant = 'solid', dark = false }) {
  const circleRef = useRef(null)
  const id = `btn-${useId().replace(/:/g, '')}`
  const isSolid = variant === 'solid'

  const colors = dark
    ? {
        circleBg: isSolid ? '#101010' : '#e9e9e9',
        textHover: isSolid ? '#B2FF00' : '#101010',
        base: isSolid ? 'bg-[#B2FF00] text-black border-[#B2FF00]' : 'bg-transparent text-[#e9e9e9] border-[#e9e9e9]',
      }
    : {
        circleBg: isSolid ? '#e9e9e9' : '#252525',
        textHover: isSolid ? '#252525' : '#e9e9e9',
        base: isSolid ? 'bg-[#252525] text-[#e9e9e9] border-[#252525]' : 'bg-transparent text-[#252525] border-[#252525]',
      }

  const handleHover = useCallback((e) => {
    const circle = circleRef.current
    if (!circle) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    const offsetFromCenter = Math.abs(((e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)) * 50)

    circle.style.left = `${x.toFixed(1)}%`
    circle.style.top = `${y.toFixed(1)}%`
    circle.style.width = `${115 + offsetFromCenter * 2}%`
  }, [])

  return (
    <>
      <style>{`
        .${id} .circle {
          pointer-events: none;
          background-color: ${colors.circleBg};
          border-radius: 50%;
          width: 100%;
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          transition: transform 0.7s cubic-bezier(0.625, 0.05, 0, 1),
                      background-color 0.4s cubic-bezier(0.625, 0.05, 0, 1);
          transform: translate(-50%, -50%) scale(0) rotate(0.001deg);
        }
        .${id}:hover .circle {
          transform: translate(-50%, -50%) scale(1) rotate(0.001deg);
        }
        .${id} .text {
          transition: color 0.7s cubic-bezier(0.625, 0.05, 0, 1);
        }
        .${id}:hover .text {
          color: ${colors.textHover};
        }
      `}</style>
      <button
        onClick={onClick}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        className={`${id} font-space-grotesk font-medium text-base px-5 py-2 rounded-xl border-[2px] cursor-pointer relative flex items-center justify-center ${colors.base}`}
      >
        <div className="absolute inset-0 rounded-[10px] overflow-hidden">
          <div ref={circleRef} className="circle">
            <div className="pt-[100%]" />
          </div>
        </div>
        <span className="text relative whitespace-nowrap">{children}</span>
      </button>
    </>
  )
}
