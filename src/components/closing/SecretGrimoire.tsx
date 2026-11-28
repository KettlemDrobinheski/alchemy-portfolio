import { X } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import openBook from './grimorio-aberto.png'
import { CinematicForecast } from './CinematicForecast'
import { MagicCreation } from './MagicCreation'
import { zodiac, type ZodiacSign } from './astroway'
import './secret-grimoire.css'

const signs = [
  ['aries', 542, 337], ['taurus', 649, 337], ['gemini', 755, 337], ['cancer', 859, 337],
  ['leo', 532, 473], ['virgo', 643, 473], ['libra', 756, 473], ['scorpio', 867, 473],
  ['sagittarius', 528, 617], ['capricorn', 646, 617], ['aquarius', 762, 617], ['pisces', 879, 617],
] as const satisfies readonly (readonly [ZodiacSign, number, number])[]

export function SecretGrimoire({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const close = useRef<HTMLButtonElement>(null)
  const reveal = useRef<HTMLButtonElement>(null)
  const creationHeading = useRef<HTMLHeadingElement>(null)
  const returningToSigns = useRef(false)
  const reducedMotion = useReducedMotion()
  const [closing, setClosing] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [selection, setSelection] = useState<{ sign: ZodiacSign; origin: HTMLButtonElement } | null>(null)
  const [forecastClosing, setForecastClosing] = useState(false)
  const [magicRevealed, setMagicRevealed] = useState(false)

  function requestClose() {
    if (closing) return
    if (reducedMotion || !loaded || magicRevealed) dialog.current?.close()
    else setClosing(true)
  }

  function finishForecast() {
    setSelection(null)
    setForecastClosing(false)
    if (!magicRevealed && !closing) selection?.origin.focus({ preventScroll: true })
  }

  function closeForecast() {
    if (!reducedMotion) setForecastClosing(true)
    else finishForecast()
  }

  const interceptEscape = Boolean(selection && !magicRevealed && !closing)

  useLayoutEffect(() => {
    const element = dialog.current
    if (!element?.open) element?.showModal()
    close.current?.focus()
  }, [])

  useLayoutEffect(() => {
    if (magicRevealed) creationHeading.current?.focus({ preventScroll: true })
    else if (returningToSigns.current) {
      returningToSigns.current = false
      reveal.current?.focus({ preventScroll: true })
    }
  }, [magicRevealed])

  useEffect(() => {
    if (closing && reducedMotion) dialog.current?.close()
  }, [closing, reducedMotion])

  return (
    <dialog ref={dialog} className="secret-grimoire" aria-label="Grimório do Segredo do Alchemy"
      data-closing={closing} onClose={onClose}
      onKeyDown={(event) => {
        if (event.key !== 'Escape' || !interceptEscape) return
        event.preventDefault()
        closeForecast()
      }}
      onCancel={(event) => {
        event.preventDefault()
        if (interceptEscape) closeForecast()
        else requestClose()
      }}>
      <div className="secret-stage" data-loaded={loaded} hidden={magicRevealed}
        onAnimationEnd={(event) => {
          if (event.target === event.currentTarget && event.animationName === 'secret-retreat') dialog.current?.close()
        }}>
        <img className="secret-art" src={openBook} width={1920} height={1080}
          alt="Grimório aberto com medalhões violetas e ornamentação dourada."
          onLoad={() => setLoaded(true)} />
        {loaded && signs.map(([sign, x, y]) => (
          <button key={sign} type="button" className="secret-sign" disabled={closing}
            style={{ left: (x / 1920 * 100) + '%', top: (y / 1080 * 100) + '%' }}
            aria-pressed={selection?.sign === sign}
            onClick={(event) => {
              const origin = event.currentTarget
              if (selection?.sign === sign && !forecastClosing) closeForecast()
              else {
                setForecastClosing(false)
                setSelection({ sign, origin })
              }
            }}>
            <span>{zodiac[sign][0]}</span>
          </button>
        ))}
        {loaded && (
          <button ref={reveal} type="button" className="secret-reveal-magic"
            disabled={closing} onClick={() => setMagicRevealed(true)}>
            REVELAR MAGIA
          </button>
        )}
      </div>
      {selection && (
        <CinematicForecast sign={selection.sign} origin={selection.origin} closing={forecastClosing}
          onClose={closeForecast} onExit={finishForecast} />
      )}
      {magicRevealed && (
        <MagicCreation headingRef={creationHeading} onBack={() => {
          returningToSigns.current = true
          setMagicRevealed(false)
        }} />
      )}
      <button ref={close} type="button" className="secret-close" aria-label="Fechar grimório"
        aria-disabled={closing} onClick={requestClose}>
        <X aria-hidden="true" size={21} />
      </button>
    </dialog>
  )
}
