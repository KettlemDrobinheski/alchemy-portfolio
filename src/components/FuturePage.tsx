import { ArrowLeft } from 'lucide-react'
import futureTarot from '../assets/future-tarot.png'
import './FuturePage.css'

export function FuturePage() {
  return (
    <section id="futuro" className="future-page" aria-labelledby="future-title">
      <div className="shell">
        <a className="projects-page-back" href="#inicio">
          <ArrowLeft size={18} aria-hidden="true" />
          Voltar ao início
        </a>
      </div>
      <article className="future-scene">
        <img className="future-art" src={futureTarot} alt="" />
        <div className="future-transcript">
          <h1 id="future-title">Sobre o Futuro</h1>
          <p>Capítulo IV — Novos Horizontes</p>
          <p>Minha história na tecnologia está apenas começando.</p>
          <p>Hoje, meu objetivo é continuar evoluindo como desenvolvedora de software, aprofundando meus conhecimentos, criando projetos e transformando desafios em oportunidades de aprendizado.</p>
          <p>Quero fazer parte de uma equipe onde possa compartilhar ideias, aprender com profissionais experientes e contribuir para soluções que façam a diferença.</p>
          <ul aria-label="Objetivos profissionais">
            <li>Evoluir como Desenvolvedora (Front-End e Fullstack)</li>
            <li>Aprofundar conhecimentos em novas tecnologias</li>
            <li>Contribuir em projetos reais e em equipe</li>
            <li>Construir uma carreira sólida na tecnologia</li>
          </ul>
          <p>O futuro ainda não está escrito. E é justamente isso que torna essa jornada tão interessante.</p>
        </div>
      </article>
    </section>
  )
}
