'use client'

import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'

// imageAreaHeight: pixels for the image zone. Can be a number or { sm, md } for responsive.
const ParticleImage = forwardRef(function ParticleImage({ src, className = '', imageInset = 0, imageAreaHeight }, ref) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const cursorRef = useRef(null)

  useImperativeHandle(ref, () => containerRef.current)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    const cursor = cursorRef.current
    if (!container || !canvas || !cursor) return

    const ctx = canvas.getContext('2d')
    let particles = []
    let animId = null
    const mouse = { x: -9999, y: -9999 }

    // ── Particle ──────────────────────────────────────────────────
    class Particle {
      constructor(ox, oy, r, g, b) {
        this.ox = ox; this.oy = oy
        this.x  = Math.random() * canvas.width
        this.y  = Math.random() * canvas.height
        this.vx = 0; this.vy = 0
        this.r = r; this.g = g; this.b = b
        this.sz   = Math.random() * 1.8 + 0.7
        this.ease = 0.055 + Math.random() * 0.028
        this.fric = 0.87
        this.tw   = Math.random() * Math.PI * 2
        this.tws  = 0.02 + Math.random() * 0.04
        this.delay = Math.floor(Math.random() * 100)
        this.age   = 0
      }

      update() {
        this.age++
        if (this.age < this.delay) return
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const d  = Math.sqrt(dx * dx + dy * dy)
        if (d < 130 && d > 0) {
          const a = Math.atan2(dy, dx)
          const s = (130 - d) / 130
          this.vx -= Math.cos(a) * s * 14
          this.vy -= Math.sin(a) * s * 14
        }
        this.vx += (this.ox - this.x) * this.ease
        this.vy += (this.oy - this.y) * this.ease
        this.vx *= this.fric; this.vy *= this.fric
        this.x  += this.vx;   this.y  += this.vy
        this.tw += this.tws
      }

      draw() {
        if (this.age < this.delay) return
        const alpha = 0.65 + 0.35 * Math.sin(this.tw)
        const rr = Math.round(this.r * 0.35)
        const gg = Math.round(this.g * 0.55 + 200 * 0.45)
        const bb = Math.round(this.b * 0.45 + 255 * 0.55)
        ctx.globalAlpha = alpha * 0.92
        ctx.fillStyle   = `rgb(${rr},${gg},${bb})`
        ctx.fillRect(this.x - this.sz / 2, this.y - this.sz / 2, this.sz, this.sz)
        ctx.globalAlpha = 1
      }
    }

    // ── Build from image ──────────────────────────────────────────
    function build(img) {
      const W = canvas.width
      const H = canvas.height
      const areaH   = imageAreaHeight
        ? (typeof imageAreaHeight === 'object'
            ? (W >= 768 ? imageAreaHeight.md : imageAreaHeight.sm)
            : imageAreaHeight)
        : H
      const padX    = typeof imageInset === 'object' ? imageInset.x : imageInset
      const padY    = typeof imageInset === 'object' ? imageInset.y : imageInset
      const areaW   = W - padX * 2
      const drawH   = areaH - padY
      const scale   = Math.min(areaW / img.width, drawH / img.height)
      const iw = Math.floor(img.width  * scale)
      const ih = Math.floor(img.height * scale)
      const ix = Math.floor(padX + (areaW - iw) / 2)
      const iy = Math.floor(padY + (drawH  - ih) / 2)
      const off = document.createElement('canvas')
      off.width = W; off.height = H
      const oc = off.getContext('2d')
      oc.drawImage(img, ix, iy, iw, ih)
      const data = oc.getImageData(0, 0, W, H).data
      particles = []
      const GAP = 3
      for (let y = 0; y < H; y += GAP) {
        for (let x = 0; x < W; x += GAP) {
          const i  = (y * W + x) * 4
          const br = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114
          if (data[i + 3] > 100 && br > 18)
            particles.push(new Particle(x, y, data[i], data[i + 1], data[i + 2]))
        }
      }
    }

    // ── Burst on click ────────────────────────────────────────────
    function burst(cx, cy) {
      particles.forEach(p => {
        const dx = p.x - cx, dy = p.y - cy
        const d  = Math.sqrt(dx * dx + dy * dy)
        if (d < 130) {
          const a = Math.atan2(dy, dx)
          const s = (Math.random() * 10 + 5) * (1 - d / 130)
          p.vx += Math.cos(a) * s
          p.vy += Math.sin(a) * s
        }
      })
    }

    // ── Render loop ───────────────────────────────────────────────
    function animate() {
      const W = canvas.width
      const H = canvas.height

      ctx.fillStyle = 'rgba(2,4,8,0.22)'
      ctx.fillRect(0, 0, W, H)

      // mouse glow
      if (mouse.x > -100 && mouse.x < W) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 110)
        g.addColorStop(0, 'rgba(0,155,255,0.15)')
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, W, H)
      }

      particles.forEach(p => { p.update(); p.draw() })
      animId = requestAnimationFrame(animate)
    }

    // ── Load & start ──────────────────────────────────────────────
    function start() {
      const rect = container.getBoundingClientRect()
      const w = Math.round(rect.width)
      const h = Math.round(rect.height)
      if (w === 0 || h === 0) return
      canvas.width  = w
      canvas.height = h
      cancelAnimationFrame(animId)
      particles = []
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => { build(img); animate() }
      img.src = src
    }

    // ── Cursor helpers ────────────────────────────────────────────
    let lastClientX = 0, lastClientY = 0

    function updateCursorPos(clientX, clientY) {
      const rect = container.getBoundingClientRect()
      cursor.style.transform = `translate(${clientX - rect.left}px, ${clientY - rect.top}px)`
    }

    function showCursor(e) {
      cursor.style.opacity = '1'
      container.style.cursor = 'none'
      updateCursorPos(e.clientX, e.clientY)
    }

    function moveCursor(e) {
      lastClientX = e.clientX
      lastClientY = e.clientY
      updateCursorPos(e.clientX, e.clientY)
    }

    function hideCursor() {
      cursor.style.opacity = '0'
      container.style.cursor = ''
    }

    function onScroll() {
      if (parseFloat(cursor.style.opacity) > 0) {
        updateCursorPos(lastClientX, lastClientY)
      }
    }

    // ── Helpers ───────────────────────────────────────────────────
    function canvasPos(clientX, clientY) {
      const rect = canvas.getBoundingClientRect()
      return {
        x: (clientX - rect.left) * (canvas.width  / rect.width),
        y: (clientY - rect.top)  * (canvas.height / rect.height),
      }
    }

    // ── Mouse events (on canvas to avoid propagation gaps) ────────
    function onMouseMove(e) {
      const p = canvasPos(e.clientX, e.clientY)
      mouse.x = p.x; mouse.y = p.y
      moveCursor(e)
    }
    function onMouseEnter(e) { showCursor(e) }
    function onMouseLeave()  { mouse.x = -9999; mouse.y = -9999; hideCursor() }
    function onMouseClick()  { burst(mouse.x, mouse.y) }

    // ── Touch events ──────────────────────────────────────────────
    function onTouchStart(e) {
      e.preventDefault()
      const p = canvasPos(e.touches[0].clientX, e.touches[0].clientY)
      mouse.x = p.x; mouse.y = p.y
      burst(mouse.x, mouse.y)
    }
    function onTouchMove(e) {
      e.preventDefault()
      const p = canvasPos(e.touches[0].clientX, e.touches[0].clientY)
      mouse.x = p.x; mouse.y = p.y
    }
    function onTouchEnd() { mouse.x = -9999; mouse.y = -9999 }

    canvas.addEventListener('mousemove',  onMouseMove)
    canvas.addEventListener('mouseenter', onMouseEnter)
    canvas.addEventListener('mouseleave', onMouseLeave)
    canvas.addEventListener('click',      onMouseClick)
    window.addEventListener('scroll',     onScroll, { passive: true })
    canvas.addEventListener('touchstart', onTouchStart, { passive: false })
    canvas.addEventListener('touchmove',  onTouchMove,  { passive: false })
    canvas.addEventListener('touchend',   onTouchEnd)

    let hasEntered = false
    let resizeTimer = null

    const ro = new ResizeObserver(() => {
      if (!hasEntered) return
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(start, 300)
    })
    ro.observe(container)

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasEntered) {
        hasEntered = true
        start()
        io.disconnect()
      }
    }, { threshold: 0.15 })
    io.observe(container)

    return () => {
      cancelAnimationFrame(animId)
      clearTimeout(resizeTimer)
      ro.disconnect()
      io.disconnect()
      canvas.removeEventListener('mousemove',  onMouseMove)
      canvas.removeEventListener('mouseenter', onMouseEnter)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      canvas.removeEventListener('click',      onMouseClick)
      window.removeEventListener('scroll',     onScroll)
      canvas.removeEventListener('touchstart', onTouchStart)
      canvas.removeEventListener('touchmove',  onTouchMove)
      canvas.removeEventListener('touchend',   onTouchEnd)
    }
  }, [src])

  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      <div
        ref={cursorRef}
        className="absolute top-0 left-0 pointer-events-none"
        style={{ opacity: 0, transition: 'opacity 0.15s', zIndex: 10, width: 32, height: 32, marginLeft: -16, marginTop: -16 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="2.5" fill="white" opacity="0.95" />
          <line x1="16" y1="1" x2="16" y2="10" stroke="white" strokeWidth="1.5" opacity="0.85" />
          <line x1="16" y1="22" x2="16" y2="31" stroke="white" strokeWidth="1.5" opacity="0.85" />
          <line x1="1" y1="16" x2="10" y2="16" stroke="white" strokeWidth="1.5" opacity="0.85" />
          <line x1="22" y1="16" x2="31" y2="16" stroke="white" strokeWidth="1.5" opacity="0.85" />
        </svg>
      </div>
    </div>
  )
})

export default ParticleImage
