import { X } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import openBook from './grimorio-aberto.png'
import { MagicCreation } from './MagicCreation'
import './secret-grimoire.css'

const signs = [
  ['Áries', 542, 337], ['Touro', 649, 337], ['Gêmeos', 755, 337], ['Câncer', 859, 337],
  ['Leão', 532, 473], ['Virgem', 643, 473], ['Libra', 756, 473], ['Escorpião', 867, 473],
  ['Sagitário', 528, 617], ['Capricórnio', 646, 617], ['Aquário', 762, 617], ['Peixes', 879, 617],
] as const

type Sign = (typeof signs)[number][0]

export function SecretGrimoire({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const close = useRef<HTMLButtonElement>(null)
  const reveal = useRef<HTMLButtonElement>(null)
  const creationHeading = useRef<HTMLHeadingElement>(null)
  const returningToSigns = useRef(false)
  const reducedMotion = useReducedMotion()
  const [closing, setClosing] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [selectedSign, setSelectedSign] = useState<Sign | null>(null)
  const [magicRevealed, setMagicRevealed] = useState(false)

  function requestClose() {
    if (closing) return
    if (reducedMotion || !loaded || magicRevealed) dialog.current?.close()
    else setClosing(true)
  }

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
      onCancel={(event) => {
        event.preventDefault()
        requestClose()
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
            aria-pressed={selectedSign === sign}
            onClick={() => setSelectedSign((current) => current === sign ? null : sign)}>
            <span>{sign}</span>
          </button>
        ))}
        {loaded && (
          <button ref={reveal} type="button" className="secret-reveal-magic"
            disabled={closing} onClick={() => setMagicRevealed(true)}>
            REVELAR MAGIA
          </button>
        )}
        <output className="secret-sign-selection">{selectedSign}</output>
      </div>
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
