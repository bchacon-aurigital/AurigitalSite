'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function TextCarousel({ items, separator, renderItem, speed = 60, className = '' }) {
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let tween
    document.fonts.ready.then(() => {
      tween = gsap.to(track, {
        x: -track.scrollWidth / 2,
        ease: 'none',
        duration: speed,
        repeat: -1,
      })
    })

    return () => {
      if (tween) tween.kill()
      gsap.killTweensOf(track)
    }
  }, [speed])

  const repeated = [...items, ...items, ...items, ...items]

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        ref={trackRef}
        className="flex whitespace-nowrap w-max items-center"
      >
        {repeated.map((item, i) => (
          <div key={i} className="flex items-center">
            {renderItem(item, i)}
            {separator}
          </div>
        ))}
      </div>
    </div>
  )
}
