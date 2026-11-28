import { Heart } from 'lucide-react'
import { useRef, useState } from 'react'
import portalArtwork from './portal-mistico.png'
import { SecretGrimoire } from './SecretGrimoire'
import './closing.css'

export function CreationBook() {
  const [liked, setLiked] = useState(false)
  const [secretOpen, setSecretOpen] = useState(false)
  const secretButton = useRef<HTMLButtonElement>(null)

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
            <button type="button" aria-pressed={liked} onClick={() => setLiked((value) => !value)}>
              <Heart size={18} aria-hidden="true" /> Gostei desta jornada
            </button>
            <a href="#/floresta-encantada" aria-describedby="portal-destination">Atravessar o último portal</a>
          </div>
          <p id="portal-destination">Destino: Floresta Encantada</p>
        </section>
      </div>
      {secretOpen && <SecretGrimoire onClose={closeSecret} />}
    </section>
  )
}
