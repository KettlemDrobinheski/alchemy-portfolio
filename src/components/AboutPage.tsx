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
            <h1 id="about-title">✦ Sobre Mim</h1>
            <p><em>Minha jornada pelo universo da tecnologia</em></p>
          </header>
          <p>Olá! Sou Kettlem Drobinheski, estudante de Análise e Desenvolvimento de Sistemas, apaixonada por tecnologia, inovação e resolução de problemas.</p>
          <p>Meu primeiro contato com computadores aconteceu aos 15 anos, quando meu pai me fez uma pergunta que marcaria minha história: <strong>“Você prefere ganhar um computador ou uma festa de 15 anos?”</strong> Bom, acho que já sabemos qual foi a minha escolha, né? Rs. O que parecia apenas um presente acabou se tornando o início de uma curiosidade que me acompanha até hoje: descobrir como a tecnologia funciona e explorar tudo o que ela pode oferecer.</p>
          <p>Atualmente, venho transformando essa curiosidade em conhecimento prático por meio do desenvolvimento de aplicações web, utilizando tecnologias como React, JavaScript e TypeScript.</p>

          <h2>✦ Minha Trajetória</h2>
          <p>Minha experiência profissional na indústria me ensinou a importância da responsabilidade, da organização, da atenção aos detalhes e do trabalho em equipe.</p>
          <p>Durante essa trajetória, comecei a perceber como a tecnologia poderia solucionar problemas reais do cotidiano.</p>
          <p>Essa percepção despertou meu interesse em desenvolver soluções próprias, conectando minhas experiências profissionais ao universo da programação.</p>

          <h2>✦ Minha Jornada como Desenvolvedora</h2>
          <p>Minha formação acadêmica e meus projetos pessoais têm me permitido explorar diferentes etapas do desenvolvimento de software.</p>
          <p>Busco compreender não apenas como escrever código, mas também como estruturar aplicações, identificar problemas, realizar testes e construir experiências intuitivas.</p>
          <p>Tenho especial interesse em desenvolvimento Full Stack, com foco em criar soluções que sejam funcionais, acessíveis e visualmente interessantes.</p>

          <h2>✦ Projetos que Contam Minha História</h2>
          <p><strong>GessoLider</strong></p>
          <p>Aplicação de orçamentos para serviços de construção a seco, desenvolvida para facilitar cálculos, organização e geração de documentos profissionais.</p>
          <p><strong>LupoCalibra</strong></p>
          <p>Projeto inspirado em desafios observados no ambiente industrial, utilizando tecnologia para explorar uma solução de apoio às atividades operacionais.</p>
          <p><strong>User Management</strong></p>
          <p>Aplicação de gerenciamento de usuários desenvolvida para praticar formulários, validações, integração com APIs e organização de dados.</p>
          <p><strong>Alchemy</strong></p>
          <p>Meu próprio portfólio interativo, que combina desenvolvimento web, criatividade, animações e experiências tridimensionais.</p>

          <h2>✦ Além do Código</h2>
          <p>Sou uma pessoa curiosa, dedicada e persistente. Gosto de aprender, experimentar novas ferramentas e enfrentar desafios que me façam evoluir.</p>
          <p>Valorizo o trabalho em equipe, a troca de conhecimentos e a oportunidade de aprender com profissionais mais experientes.</p>
          <p>Acredito que desenvolver software é muito mais do que escrever código: é transformar ideias em soluções que façam diferença.</p>

          <h2>✦ Meu Próximo Capítulo</h2>
          <p>Meu objetivo é conquistar minha primeira oportunidade profissional na área de tecnologia, continuar aprimorando meus conhecimentos e contribuir para projetos que gerem impacto real.</p>
          <p><em>Cada projeto representa uma descoberta. Cada desafio, uma oportunidade de evolução.</em></p>
        </div>
      </article>
    </section>
  )
}
