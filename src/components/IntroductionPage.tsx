import { ArrowLeft } from 'lucide-react'
import './IntroductionPage.css'

export function IntroductionPage() {
  return (
    <section className="introduction-page" aria-labelledby="introduction-title">
      <div className="shell">
        <a className="projects-page-back" href="#inicio">
          <ArrowLeft size={18} aria-hidden="true" />
          Voltar ao início
        </a>
      </div>
      <article className="introduction-parchment">
        <h1 id="introduction-title" aria-label="Capítulo I — A Introdução">
          <svg viewBox="0 0 600 86" aria-hidden="true">
            <defs>
              <path id="introduction-ribbon-curve" d="M12 72 Q300 3 588 72" />
            </defs>
            <text textAnchor="middle">
              <textPath href="#introduction-ribbon-curve" startOffset="50%">Capítulo I — A Introdução</textPath>
            </text>
          </svg>
        </h1>
        <p className="introduction-subtitle"><em>Quem sou eu</em></p>
        <div className="introduction-reading" role="region" aria-labelledby="introduction-title" tabIndex={0}>
          <p>Olá! Sou <strong>Kettlem Drobinheski</strong>, estudante de Análise e Desenvolvimento de Sistemas.</p>
          <p>Sou uma pessoa curiosa, dedicada e apaixonada por descobrir como as coisas funcionam. Gosto de aprender, explorar novas tecnologias e transformar ideias em soluções.</p>
          <p>Acredito que a tecnologia vai muito além de escrever códigos. Para mim, é uma oportunidade de criar, resolver problemas e desenvolver algo que realmente faça a diferença na vida das pessoas.</p>
        </div>
      </article>
    </section>
  )
}
