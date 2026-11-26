import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import portalArtwork from '../assets/portal-medieval.jpg'
import './PortalEntrance.css'

export function PortalEntrance({ onEnter, onComplete }: {
  onEnter: (withMusic: boolean) => void
  onComplete: () => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const primaryButton = useRef<HTMLButtonElement>(null)
  const entering = useRef(false)
  const [opening, setOpening] = useState(false)

  useLayoutEffect(() => {
    const element = dialog.current
    element?.showModal()
    primaryButton.current?.focus({ preventScroll: true })
    return () => element?.close()
  }, [])

  useEffect(() => {
    if (!opening) return
    const fallback = window.setTimeout(onComplete, 1950)
    return () => window.clearTimeout(fallback)
  }, [opening, onComplete])

  function enter(withMusic: boolean) {
    if (entering.current) return
    entering.current = true
    onEnter(withMusic)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) onComplete()
    else setOpening(true)
  }

  return (
    <dialog ref={dialog} className="portal-entrance" aria-labelledby="portal-title" aria-describedby="portal-description"
      data-opening={opening} onCancel={(event) => event.preventDefault()}
      onAnimationEnd={(event) => {
        if (opening && event.target === event.currentTarget && event.animationName === 'portal-reveal') onComplete()
      }}>
      <div className="portal-entrance__scene" aria-hidden="true">
        <div className="portal-entrance__camera">
          <img className="portal-entrance__image" src={portalArtwork} alt="" width={1600} height={900} fetchPriority="high" />
          <div className="portal-entrance__energy" />
          <div className="portal-entrance__embers" />
        </div>
      </div>
      <div className="portal-entrance__content">
        <p className="portal-entrance__eyebrow">PORTFÓLIO DE DESENVOLVIMENTO DE SOFTWARE</p>
        <h1 id="portal-title">ALCHEMY</h1>
        <p className="portal-entrance__subtitle">Bem-vindo ao meu universo digital</p>
        <p id="portal-description" className="portal-entrance__description">
          Explore meus projetos, habilidades e minha jornada na tecnologia, onde cada linha de código é parte de uma nova criação.
        </p>
        <div className="portal-entrance__actions">
          <button ref={primaryButton} type="button" aria-disabled={opening} onClick={() => enter(true)}>
            Explorar portfólio
          </button>
          <button type="button" aria-disabled={opening} onClick={() => enter(false)}>
            Entrar sem música
          </button>
        </div>
      </div>
    </dialog>
  )
}
