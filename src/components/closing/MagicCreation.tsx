import { ArrowLeft, Atom, Box, CodeXml, Shield, Waves } from 'lucide-react'
import type { Ref } from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '../../assets/vite.svg'
import { AlchemyMark } from '../AlchemyMark'
import './magic-creation.css'

const technologies = [
  { name: 'React', image: reactLogo, detail: 'Organiza a interface em componentes.' },
  { name: 'TypeScript', mark: 'TS', detail: 'Verifica os tipos do código.' },
  { name: 'Vite', image: viteLogo, detail: 'Serve o projeto localmente e gera o site.' },
  { name: 'CSS', icon: Shield, detail: 'Cria pergaminhos, brilhos e layouts responsivos.' },
  { name: 'Motion', icon: Waves, detail: 'Anima revelações e o parallax da Home.' },
  { name: 'SVG', icon: CodeXml, detail: 'Desenha símbolos, molduras e ícones.' },
  { name: 'Three.js', icon: Box, detail: 'Define geometria, materiais e luz nos protótipos 3D.' },
  { name: 'React Three Fiber', icon: Atom, detail: 'Organiza as cenas Three.js em componentes React.' },
]

export function MagicCreation({ headingRef, onBack }: { headingRef: Ref<HTMLHeadingElement>; onBack: () => void }) {
  return (
    <div className="magic-creation">
      <article className="magic-creation-book" aria-labelledby="magic-creation-title">
        <section className="magic-creation-leaf" aria-labelledby="magic-technologies">
          <h3 id="magic-technologies">Tecnologias do Alchemy</h3>
          <ul className="magic-technology-grid">
            {technologies.map(({ name, image, mark, icon: Icon, detail }) => (
              <li key={name}>
                <span className="magic-technology-mark" aria-hidden="true">
                  {image && <img src={image} alt="" />}
                  {Icon && <Icon />}
                  {mark && <strong>{mark}</strong>}
                </span>
                <strong>{name}</strong>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="magic-creation-leaf magic-creation-story">
          <AlchemyMark size={44} />
          <h2 id="magic-creation-title" tabIndex={-1} ref={headingRef}>Como o Alchemy foi criado</h2>
          <p>O Alchemy nasceu da vontade de contar minha jornada de aprendizado como desenvolvedora em um portfólio que pudesse ser explorado capítulo por capítulo.</p>
          <p>Montei as páginas com componentes React e TypeScript. A navegação pelo trecho da URL depois do # permite abrir cada capítulo diretamente e usar o histórico do navegador.</p>
          <p>Usei CSS, SVG e Motion para dar forma à biblioteca, aos símbolos e às transições. Em protótipos separados, explorei geometria, luz e movimento com Three.js e React Three Fiber.</p>
          <button type="button" className="magic-creation-back" onClick={onBack}>
            <ArrowLeft size={17} aria-hidden="true" /> Voltar aos signos
          </button>
        </section>
      </article>
    </div>
  )
}
