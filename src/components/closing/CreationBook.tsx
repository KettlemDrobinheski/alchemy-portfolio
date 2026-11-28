import { Heart, Sparkles } from 'lucide-react'
import { useState } from 'react'
import portalArtwork from './portal-mistico.png'
import './closing.css'

const zodiac = [
  ['Áries', 'M12 19V9c0-5-7-6-7-1v2m7-1c0-5 7-6 7-1v2'],
  ['Touro', 'M7 4c0 4 2 5 5 5s5-1 5-5m0 10a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z'],
  ['Gêmeos', 'M5 5q7 4 14 0M5 19q7-4 14 0M9 7v10m6-10v10'],
  ['Câncer', 'M4 9q7-7 16 0M4 15q9 7 16 0M9 9a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Zm11 6a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z'],
  ['Leão', 'M8 15a3 3 0 1 1-3-3c2 0 4 2 6 0s-1-5 1-7c3-2 6 0 6 3 0 5-5 7-4 10 1 2 4 2 6 0'],
  ['Virgem', 'M4 6q3-2 3 2v8m0-8q4-5 5 0v8m0-8q4-5 5 0v7q0 5-5 5m3-3 5-4'],
  ['Libra', 'M4 19h16M4 14h5a4 4 0 1 1 6 0h5'],
  ['Escorpião', 'M4 6q3-2 3 2v9m0-9q4-5 5 0v9m0-9q4-5 5 0v8q0 4 4 2m-2-2 2 2-2 2'],
  ['Sagitário', 'M5 19 19 5m-7 0h7v7M7 10l7 7'],
  ['Capricórnio', 'M4 7q2-4 4 0l2 7 3-8q3-3 4 1c1 4-5 9-3 12 1 2 6 1 6-2s-4-4-7-1'],
  ['Aquário', 'm4 10 4-4 4 4 4-4 4 4M4 17l4-4 4 4 4-4 4 4'],
  ['Peixes', 'M6 4q7 8 0 16M18 4q-7 8 0 16M4 12h16'],
]

export function CreationBook() {
  const [liked, setLiked] = useState(false)
  const [secretOpen, setSecretOpen] = useState(false)

  return (
    <section className="closing-hall" aria-label="O Último Capítulo">
      <div className="closing-book-art">
        <img className="closing-artwork" src={portalArtwork} width={1672} height={941}
          alt="Grimório dourado sobre um pilar de pedra, ao lado de um portal violeta que revela a floresta sob o luar." />
        <ul className="book-zodiac" role="list" aria-label="Signos do zodíaco">
          {zodiac.map(([name, path]) => (
            <li key={name}>
              <svg className="book-zodiac-symbol" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path className="book-zodiac-frame" d="M16 1.5 30.5 16 16 30.5 1.5 16Z" />
                <path d={path} transform="translate(4 4)" />
              </svg>
              <span>{name}</span>
            </li>
          ))}
        </ul>
        <div className="book-secret">
          <button type="button" aria-expanded={secretOpen} aria-controls="alchemy-secret"
            onClick={() => setSecretOpen((open) => !open)}>
            <Sparkles aria-hidden="true" />
            <span>Segredo do Alchemy</span>
          </button>
          <p id="alchemy-secret" hidden={!secretOpen}>
            O Alchemy nasceu quando minha curiosidade pela programação encontrou a vontade de contar histórias.
          </p>
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
    </section>
  )
}
