import { useReducedMotion } from 'motion/react'
import { useEffect, useEffectEvent, useLayoutEffect, useRef, useState } from 'react'
import { HoroscopeLeaf } from './HoroscopeLeaf'
import type { ZodiacSign } from './astroway'
import './cinematic-forecast.css'

const openingTime = 3000
const exitTime = 2500

function revealProgress(elapsed: number, start: number, duration: number) {
  return Math.min(1, Math.max(0, (elapsed - start) / duration))
}

function center(element: HTMLElement) {
  const { x, y, width, height } = element.getBoundingClientRect()
  return { x: x + width / 2, y: y + height / 2 }
}

function translate({ x, y }: { x: number; y: number }) {
  return `translate(${x}px, ${y}px) translate(-50%, -50%)`
}

export function CinematicForecast({ sign, origin, closing, onClose, onExit }: {
  sign: ZodiacSign
  origin: HTMLButtonElement
  closing: boolean
  onClose: () => void
  onExit: () => void
}) {
  const reducedMotion = useReducedMotion()
  const [opening, setOpening] = useState(true)
  const light = useRef<HTMLSpanElement>(null)
  const sparks = useRef<HTMLSpanElement>(null)
  const symbol = useRef<HTMLSpanElement>(null)
  const wave = useRef<HTMLSpanElement>(null)
  const lastOrigin = useRef(origin)
  const openingStarted = useRef<number | null>(null)
  const completeExit = useEffectEvent(onExit)

  useEffect(() => {
    if (reducedMotion) return
    const timer = window.setTimeout(() => setOpening(false), openingTime)
    return () => window.clearTimeout(timer)
  }, [reducedMotion])

  useLayoutEffect(() => {
    if (closing && reducedMotion) {
      completeExit()
      return
    }
    if (reducedMotion || !light.current || !sparks.current || !symbol.current || !wave.current) return

    const now = performance.now()
    openingStarted.current ??= now
    if (closing) {
      const elapsed = now - openingStarted.current
      const frame = symbol.current.closest('.lab-horoscope')
      const focused = frame?.contains(document.activeElement)
      const style = light.current.parentElement?.style
      style?.setProperty('--exit-frame-opacity', String(focused ? 1 : revealProgress(elapsed, 1050, 850)))
      style?.setProperty('--exit-header-opacity', String(focused ? 1 : revealProgress(elapsed, 1630, 650)))
      style?.setProperty('--exit-reading-opacity', String(focused ? 1 : revealProgress(elapsed, 2150, 780)))
    }

    const switching = origin !== lastOrigin.current && !closing
    lastOrigin.current = origin
    const medal = center(origin)
    const frame = center(symbol.current)
    const originGlow = origin.animate([
      { boxShadow: '0 0 .55rem #b368d888, inset 0 0 .3rem #e2ac6377' },
      { boxShadow: '0 0 1.1rem #e6adf4bd, inset 0 0 .45rem #f9ca83b0' },
      { boxShadow: '0 0 .55rem #b368d800, inset 0 0 .3rem #e2ac6300' },
    ], { duration: closing ? 430 : 720, delay: closing ? 2060 : 0, easing: 'ease-out' })

    const sparkle = sparks.current.animate([
      { transform: translate(medal) + ' scale(.45)', opacity: 0 },
      { opacity: .72, offset: .32 },
      { transform: translate(medal) + ' scale(1.35)', opacity: 0 },
    ], { duration: closing ? 410 : 810, delay: closing ? 2060 : 0, easing: 'ease-out' })

    const start = closing ? frame : medal
    const end = closing ? medal : frame
    const midpoint = { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 - 18 }
    const flight = switching
      ? wave.current.animate([
        { transform: 'translateX(-100%)', opacity: 0 },
        { opacity: .65, offset: .45 },
        { transform: 'translateX(100%)', opacity: 0 },
      ], { duration: 620, easing: 'ease-out' })
      : light.current.animate([
        { transform: translate(start) + ' scale(.6)', opacity: 0 },
        { transform: translate(start), opacity: .84, offset: .14 },
        { transform: translate(midpoint), opacity: .9, offset: .53 },
        { transform: translate(end), opacity: .85, offset: .86 },
        { transform: translate(end) + (closing ? ' scale(.5)' : ' scale(3.2)'), opacity: 0 },
      ], { duration: closing ? 1160 : 1530, delay: closing ? 1040 : 300, easing: 'ease-in-out' })

    const timer = closing ? window.setTimeout(() => completeExit(), exitTime) : undefined
    return () => {
      window.clearTimeout(timer)
      originGlow.cancel()
      sparkle.cancel()
      flight.cancel()
    }
  }, [sign, origin, closing, reducedMotion])

  return (
    <div className="cinematic-forecast" data-opening={opening} data-exiting={closing}>
      <span className="lab-horoscope-beam cinematic-forecast-light" ref={light} aria-hidden="true" />
      <span className="cinematic-forecast-sparks" ref={sparks} aria-hidden="true" />
      <HoroscopeLeaf sign={sign} symbolRef={symbol} onClose={onClose} ornament={
        <span className="cinematic-forecast-ornament" aria-hidden="true">
          <span className="cinematic-forecast-wave" ref={wave} />
        </span>
      } />
    </div>
  )
}
