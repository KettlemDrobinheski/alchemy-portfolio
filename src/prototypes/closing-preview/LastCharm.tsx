import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import './last-charm.css'

export function LastCharm({ beginReveal }: { beginReveal: () => boolean }) {
  const [revealing, setRevealing] = useState(false)
  const reducedMotion = useReducedMotion()

  return (
    <section className="last-charm" aria-labelledby="last-charm-title" data-revealing={revealing}>
      <article className="last-charm-paper">
        <div className="last-charm-magic" aria-hidden="true">
          <span className="last-charm-trail" />
          <span className="last-charm-orb" />
        </div>
        <motion.header className="last-charm-header" viewport={{ once: true, amount: .5 }}
          onViewportEnter={() => {
            if (!reducedMotion && beginReveal()) setRevealing(true)
          }}>
          <span className="last-charm-seal" aria-hidden="true">△ · ◇ · ▽</span>
          <h2 id="last-charm-title"><span aria-hidden="true">✧ </span>O Último Encanto<span aria-hidden="true"> ✧</span></h2>
          <p><em>“Toda magia nasce de uma pequena faísca de imaginação...”</em></p>
        </motion.header>

        <div className="last-charm-letter">
          <p>Desde sempre, sou fascinada pelo universo medieval, seus castelos, grimórios, mistérios e histórias repletas de magia. E foi dessa paixão que nasceu a inspiração para criar o <strong>ALCHEMY</strong>.</p>
          <p>Não queria desenvolver apenas um portfólio. Queria transformar linhas de código em encantamentos, animações em pequenos feitiços e cada capítulo em uma parte da minha própria história.</p>
          <p>Meu desejo era transmitir um pouco da magia que existe na minha imaginação, unindo duas coisas que tanto me encantam: <strong>a fantasia e a tecnologia</strong>.</p>
          <p>Cada detalhe deste universo foi pensado para que você não apenas conhecesse meus projetos e minha trajetória, mas também pudesse sentir que estava vivendo uma aventura.</p>
          <p>Se você chegou até aqui, espero, de coração, que tenha vivido uma experiência única, envolvente e mágica. Que, por alguns instantes, tenha deixado o mundo comum para trás e mergulhado neste pequeno universo que criei com tanta dedicação.</p>
          <p><strong>Obrigada por fazer parte da minha história e por permitir que um pedacinho da minha magia chegasse até você.</strong></p>
          <p><em>E lembre-se...</em></p>
          <blockquote><strong>“O verdadeiro encanto não está apenas na magia que vemos, mas na coragem de transformar aquilo que imaginamos em realidade.”</strong></blockquote>
          <p className="last-charm-signature"><span aria-hidden="true">✦ </span><em>Com carinho, a criadora do ALCHEMY.</em><span aria-hidden="true"> ✦</span></p>
        </div>

        <footer className="last-charm-actions">
          <a className="last-charm-portal" href="#/floresta-encantada" aria-describedby="last-charm-portal-note">
            <span aria-hidden="true">✧</span> Atravessar o Último Portal <span aria-hidden="true">✧</span>
          </a>
          <p id="last-charm-portal-note">Uma última magia ainda espera por você...</p>
        </footer>
      </article>
    </section>
  )
}
