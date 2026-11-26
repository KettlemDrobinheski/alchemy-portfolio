import { motion, useSpring } from 'motion/react'
import { useEffect } from 'react'
import type { RefObject } from 'react'

const spring = { stiffness: 95, damping: 24, mass: 0.65 }
const pointerQuery = '(any-hover: hover) and (any-pointer: fine) and (prefers-reduced-motion: no-preference)'

export function HeroBackdrop({ hero }: { hero: RefObject<HTMLElement | null> }) {
  const backgroundX = useSpring(0, spring)
  const backgroundY = useSpring(0, spring)
  const particlesX = useSpring(0, spring)
  const particlesY = useSpring(0, spring)

  useEffect(() => {
    const section = hero.current
    if (!section) return

    const preference = window.matchMedia(pointerQuery)

    function center() {
      backgroundX.set(0)
      backgroundY.set(0)
      particlesX.set(0)
      particlesY.set(0)
    }

    function move(event: PointerEvent) {
      if (event.pointerType !== 'mouse') {
        center()
        return
      }

      const bounds = section?.getBoundingClientRect()
      if (!bounds?.width || !bounds.height) return

      const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1))
      const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1))

      backgroundX.set(x * 6)
      backgroundY.set(y * 4)
      particlesX.set(x * 14)
      particlesY.set(y * 10)
    }

    function disable() {
      section?.removeEventListener('pointermove', move)
      section?.removeEventListener('pointerleave', center)
      backgroundX.jump(0)
      backgroundY.jump(0)
      particlesX.jump(0)
      particlesY.jump(0)
    }

    function update() {
      if (preference.matches) {
        section?.addEventListener('pointermove', move, { passive: true })
        section?.addEventListener('pointerleave', center)
      } else {
        disable()
      }
    }

    update()
    preference.addEventListener('change', update)
    return () => {
      preference.removeEventListener('change', update)
      disable()
    }
  }, [hero, backgroundX, backgroundY, particlesX, particlesY])

  return (
    <>
      <div className="hero-backdrop" aria-hidden="true">
        <motion.div className="hero-backdrop-image" style={{ x: backgroundX, y: backgroundY }} />
      </div>
      <div className="hero-particles" aria-hidden="true">
        <motion.div className="hero-particles-layer" style={{ x: particlesX, y: particlesY }}>
          <span /><span /><span /><span /><span /><span />
        </motion.div>
      </div>
    </>
  )
}
