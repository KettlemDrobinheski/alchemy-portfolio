import { FlaskRound, Heart } from 'lucide-react'
import { useRef, useState } from 'react'
import { AlchemyMark } from '../AlchemyMark'
import portalArtwork from './portal-mistico.png'
import { SecretGrimoire } from './SecretGrimoire'
import './closing.css'

const journeyLikeKey = 'alchemy.journey.liked'

function hasLikedJourney() {
  try {
    return window.localStorage.getItem(journeyLikeKey) === 'yes'
  } catch {
    return false
  }
}

export function CreationBook() {
  const [reaction, setReaction] = useState<'saved' | 'new' | null>(() => hasLikedJourney() ? 'saved' : null)
  const liked = reaction !== null
  const [secretOpen, setSecretOpen] = useState(false)
  const secretButton = useRef<HTMLButtonElement>(null)

  function likeJourney() {
    if (liked) return
    setReaction('new')
    try {
      window.localStorage.setItem(journeyLikeKey, 'yes')
    } catch {
      // The current page keeps the like when storage is unavailable.
    }
  }

  function closeSecret() {
    setSecretOpen(false)
    secretButton.current?.focus({ preventScroll: true })
  }

  return (
    <section className="closing-hall" aria-label="O Último Capítulo">
      <div className="closing-book-art">
        <div className="closing-artwork-stage">
          <img className="closing-artwork" src={portalArtwork} width={1672} height={941}
            alt="Grimório fechado com cristal violeta sobre um pilar, ao lado do portal da floresta." />
          <button ref={secretButton} type="button" className="book-secret-crystal"
            aria-label="Abrir o Segredo do Alchemy" aria-haspopup="dialog" aria-expanded={secretOpen}
            onClick={() => setSecretOpen(true)} />
        </div>
        <section className="closing-farewell" aria-labelledby="farewell-title">
          <h2 id="farewell-title">Toda linha de código conta uma história.</h2>
          <p>Você conheceu um pouco da minha. Obrigada por explorar meu universo e fazer parte desta jornada.</p>
          <div className="closing-actions">
            <button type="button" aria-pressed={liked} aria-disabled={liked} onClick={likeJourney}>
              <Heart size={17} aria-hidden="true" /> <span>Gostei desta jornada</span>
            </button>
            <a href="#/floresta-encantada" aria-describedby="portal-destination">
              <AlchemyMark size={17} /> <span>Atravessar o último portal</span>
            </a>
          </div>
          <p className="closing-like-count" aria-live="polite" aria-atomic="true">
            <span key={String(reaction)} className="closing-like-display" data-changed={reaction === 'new'}>
              <FlaskRound className="closing-like-potion" size={19} aria-hidden="true" />
              <span aria-label={liked ? '1 curtida' : '0 curtidas'}>{liked ? 1 : 0}</span>
            </span>
          </p>
          <p id="portal-destination">Destino: Floresta Encantada</p>
        </section>
      </div>
      {secretOpen && <SecretGrimoire onClose={closeSecret} />}
    </section>
  )
}
