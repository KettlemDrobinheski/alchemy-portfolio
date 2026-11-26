import { useEffect, useRef } from 'react'

type Point = { x: number; y: number }
type Particle = Point & {
  born: number
  lifetime: number
  size: number
  driftX: number
  driftY: number
  color: string
}

const MAX_PARTICLES = 360
const POINT_SPACING = 2
const TRAIL_GAP = 180
const TIP_RADIUS = 30

export function CursorStars() {
  const layer = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = layer.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    const surface = canvas
    const brush = context
    const enabled = window.matchMedia('(any-hover: hover) and (any-pointer: fine) and (prefers-reduced-motion: no-preference)')
    let previous: Point | undefined
    let lastMove = -Infinity
    let frame: number | undefined
    let particles: Particle[] = []

    function scheduleDraw() {
      if (frame === undefined) frame = window.requestAnimationFrame(draw)
    }

    function resize() {
      const scale = Math.min(window.devicePixelRatio || 1, 1.5)
      surface.width = Math.ceil(surface.clientWidth * scale)
      surface.height = Math.ceil(surface.clientHeight * scale)
      brush.setTransform(scale, 0, 0, scale, 0, 0)
      if (previous || particles.length) scheduleDraw()
    }

    function draw(now: number) {
      frame = undefined
      brush.clearRect(0, 0, surface.clientWidth, surface.clientHeight)

      particles = particles.filter((particle) => now - particle.born < particle.lifetime)
      for (const particle of particles) {
        const progress = Math.max(0, now - particle.born) / particle.lifetime
        const x = particle.x + particle.driftX * progress
        const y = particle.y + particle.driftY * progress
        const size = particle.size * (1 - progress * 0.6)
        brush.globalAlpha = (1 - progress) ** 1.5 * 0.78
        brush.fillStyle = particle.color
        brush.beginPath()
        brush.arc(x, y, size, 0, Math.PI * 2)
        brush.fill()
      }

      if (previous) {
        const { x, y } = previous
        const glow = brush.createRadialGradient(x, y, 0, x, y, TIP_RADIUS)
        glow.addColorStop(0, '#ffffff')
        glow.addColorStop(0.15, '#ffffff')
        glow.addColorStop(0.28, '#e3c1ff')
        glow.addColorStop(0.55, '#ad79f382')
        glow.addColorStop(1, '#8148f100')
        brush.globalAlpha = 1
        brush.fillStyle = glow
        brush.fillRect(x - TIP_RADIUS, y - TIP_RADIUS, TIP_RADIUS * 2, TIP_RADIUS * 2)
      }

      brush.globalAlpha = 1
      if (particles.length) scheduleDraw()
    }

    function move(event: PointerEvent) {
      if (event.pointerType !== 'mouse') {
        forgetPointer()
        return
      }

      const now = performance.now()
      const current = { x: event.clientX, y: event.clientY }
      const start = previous && now - lastMove < TRAIL_GAP ? previous : current
      const dx = current.x - start.x
      const dy = current.y - start.y
      const distance = Math.hypot(dx, dy)
      const steps = Math.min(32, Math.max(1, Math.ceil(distance / POINT_SPACING)))

      for (let step = 1; step <= steps; step += 1) {
        const progress = step / steps
        const x = start.x + dx * progress
        const y = start.y + dy * progress

        particles.push({
          x: x + (Math.random() - 0.5) * 4,
          y: y + (Math.random() - 0.5) * 4,
          born: now,
          lifetime: 460 + Math.random() * 290,
          size: 0.55 + Math.random() * 0.85,
          driftX: (Math.random() - 0.5) * 34,
          driftY: (Math.random() - 0.5) * 30,
          color: Math.random() < 0.3 ? '#e7d4ff' : '#a67bf9',
        })
      }

      if (particles.length > MAX_PARTICLES) particles.splice(0, particles.length - MAX_PARTICLES)
      previous = current
      lastMove = now
      document.documentElement.classList.add('has-light-cursor')
      scheduleDraw()
    }

    function forgetPointer() {
      const hadPointer = previous !== undefined
      previous = undefined
      lastMove = -Infinity
      document.documentElement.classList.remove('has-light-cursor')
      if (hadPointer) scheduleDraw()
    }

    function stop() {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('resize', resize)
      window.removeEventListener('blur', forgetPointer)
      document.documentElement.removeEventListener('pointerleave', forgetPointer)
      forgetPointer()
      if (frame !== undefined) window.cancelAnimationFrame(frame)
      frame = undefined
      particles = []
      surface.width = 0
      surface.height = 0
    }

    function update() {
      if (!enabled.matches) {
        stop()
        return
      }

      resize()
      window.addEventListener('pointermove', move, { passive: true })
      window.addEventListener('resize', resize)
      window.addEventListener('blur', forgetPointer)
      document.documentElement.addEventListener('pointerleave', forgetPointer)
    }

    update()
    enabled.addEventListener('change', update)
    return () => {
      stop()
      enabled.removeEventListener('change', update)
    }
  }, [])

  return <canvas className="cursor-stars" ref={layer} width={0} height={0} aria-hidden="true" />
}
