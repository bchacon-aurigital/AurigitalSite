'use client'

import { useEffect, useRef } from 'react'

export default function ParticleCanvas() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const ctx = canvas.getContext('2d')
    let particles = [], animId = null
    const mouse = { x: -9999, y: -9999 }

    class Particle {
      constructor(ox, oy) {
        this.ox = ox; this.oy = oy
        this.x = ox; this.y = oy
        this.vx = 0; this.vy = 0
        this.ease = 0.06 + Math.random() * 0.03
        this.fric = 0.88
        this.sz = Math.random() < 0.2 ? 1.5 : 0.8
        this.bright = Math.random() < 0.12
        this.tw = Math.random() * Math.PI * 2
        this.tws = 0.02 + Math.random() * 0.03
      }
      update() {
        const dx = mouse.x - this.x, dy = mouse.y - this.y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < 40 && d > 0) {
          const a = Math.atan2(dy, dx), s = (40 - d) / 40
          this.vx -= Math.cos(a) * s * 4
          this.vy -= Math.sin(a) * s * 4
        }
        this.vx += (this.ox - this.x) * this.ease
        this.vy += (this.oy - this.y) * this.ease
        this.vx *= this.fric; this.vy *= this.fric
        this.x += this.vx; this.y += this.vy
        this.tw += this.tws
      }
      draw() {
        const dx = mouse.x - this.x, dy = mouse.y - this.y
        const d = Math.sqrt(dx * dx + dy * dy)
        const RADIUS = 120
        if (d > RADIUS) return
        const proximity = 1 - d / RADIUS
        const alpha = proximity * (0.5 + 0.3 * Math.sin(this.tw))
        ctx.globalAlpha = alpha
        ctx.fillStyle = this.bright ? '#ffffff' : '#00bbff'
        ctx.fillRect(this.x - this.sz / 2, this.y - this.sz / 2, this.sz, this.sz)
        ctx.globalAlpha = 1
      }
    }

    function build() {
      const W = canvas.width, H = canvas.height
      const GAP = 12
      particles = []
      for (let y = GAP; y < H; y += GAP)
        for (let x = GAP; x < W; x += GAP)
          particles.push(new Particle(x, y))
    }

    function animate() {
      ctx.fillStyle = 'rgba(37,37,37,0.35)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      if (mouse.x > 0) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 90)
        g.addColorStop(0, 'rgba(0,155,255,0.1)'); g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g; ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
      particles.forEach(p => { p.update(); p.draw() })
      animId = requestAnimationFrame(animate)
    }

    function pos(clientX, clientY) {
      const r = canvas.getBoundingClientRect()
      return { x: (clientX - r.left) * (canvas.width / r.width), y: (clientY - r.top) * (canvas.height / r.height) }
    }

    const trigger = container.parentElement || canvas
    const onMove = e => { const p = pos(e.clientX, e.clientY); mouse.x = p.x; mouse.y = p.y }
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999 }
    const onTouchMove = e => { e.preventDefault(); const p = pos(e.touches[0].clientX, e.touches[0].clientY); mouse.x = p.x; mouse.y = p.y }
    const onTouchEnd = () => { mouse.x = -9999; mouse.y = -9999 }

    trigger.addEventListener('mousemove', onMove)
    trigger.addEventListener('mouseleave', onLeave)
    trigger.addEventListener('touchmove', onTouchMove, { passive: false })
    trigger.addEventListener('touchend', onTouchEnd)

    const ro = new ResizeObserver(() => {
      const r = container.getBoundingClientRect()
      if (r.width && r.height) { canvas.width = Math.round(r.width); canvas.height = Math.round(r.height); build() }
    })
    ro.observe(container)
    const r = container.getBoundingClientRect()
    canvas.width = Math.round(r.width); canvas.height = Math.round(r.height)
    build(); animate()

    return () => {
      cancelAnimationFrame(animId); ro.disconnect()
      trigger.removeEventListener('mousemove', onMove)
      trigger.removeEventListener('mouseleave', onLeave)
      trigger.removeEventListener('touchmove', onTouchMove)
      trigger.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  )
}
