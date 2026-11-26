import { ArrowLeft } from 'lucide-react'
import './AboutPage.css'

export function AboutPage() {
  return (
    <section id="sobre" className="about-scroll-page" tabIndex={-1} aria-labelledby="about-title">
      <div className="shell">
        <a className="projects-page-back" href="#inicio">
          <ArrowLeft size={18} aria-hidden="true" />
          Voltar ao início
        </a>
      </div>
      <article className="about-scroll">
        <div className="about-scroll-reading" role="region" aria-labelledby="about-title" tabIndex={0}>
          <header>
            <h1 id="about-title">Capítulo II — A Jornada</h1>
            <p><em>Os caminhos que me trouxeram até aqui</em></p>
          </header>
          <p>Meu primeiro contato com computadores aconteceu aos 15 anos, quando meu pai me fez uma pergunta que nunca esqueci: <strong>"Você prefere uma festa de 15 anos ou um computador?"</strong></p>
          <p>Bom, acho que já sabemos qual foi minha escolha! rs.</p>
          <p>Naquele momento, eu não imaginava que aquele computador seria o início de uma história que, anos depois, me aproximaria novamente da tecnologia.</p>
          <p>Minha trajetória, porém, não seguiu uma linha reta.</p>
          <p>Por desejo dos meus pais, iniciei a faculdade de Pedagogia. Durante esse período, tive a oportunidade de estagiar em uma escola municipal, auxiliando professoras e pedagogos nas atividades escolares. Também realizei estágio na Secretaria Municipal de Educação da prefeitura da cidade onde morava.</p>
          <p>Foram experiências que me ensinaram sobre responsabilidade, comunicação, organização e a importância de trabalhar com pessoas.</p>
          <p>Mas, faltando apenas seis meses para concluir a graduação, decidi trancar a faculdade. Apesar de tudo que havia aprendido, percebi que aquele não era o caminho profissional que desejava seguir.</p>
          <p>E, como acontece em tantas histórias, os ventos acabaram me levando por outros caminhos.</p>
          <p>Trabalhei como vendedora, garçonete, frentista de posto de gasolina, atendente de oficina e também na área industrial.</p>
          <p>Cada profissão trouxe seus próprios desafios e aprendizados. Conheci diferentes ambientes de trabalho, desenvolvi minha capacidade de adaptação, aprendi a lidar com pessoas e descobri a importância de ter persistência diante das dificuldades.</p>
          <p>Até que, em meio a tantas experiências, decidi dar uma nova oportunidade àquela curiosidade que começou aos 15 anos, diante do meu primeiro computador.</p>
          <p>Hoje, curso <strong>Análise e Desenvolvimento de Sistemas</strong> e venho construindo meus conhecimentos em programação por meio dos estudos e de projetos pessoais.</p>
          <p>Minha trajetória pode não ter sido convencional, mas cada experiência contribuiu para formar a pessoa que sou.</p>
          <p><strong>E agora, pela primeira vez, sinto que estou escrevendo um capítulo que escolhi para mim.</strong></p>
        </div>
      </article>
    </section>
  )
}
