import { Atom, BookOpen, CodeXml, Database, FlaskConical, Layers3, Monitor, Server, UsersRound, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AlchemyMark } from './AlchemyMark'
import './SkillsSection.css'

type Skill = {
  name: string
  mark: string
  color: string
  status?: 'Estudando'
  description: string
  icon?: LucideIcon
}

const frontend: Skill[] = [
  { name: 'HTML5 e CSS3', mark: '5', color: 'html', description: 'Estruturação e estilização de páginas web, criação de layouts responsivos e organização de interfaces.' },
  { name: 'JavaScript', mark: 'JS', color: 'javascript', description: 'Desenvolvimento de funcionalidades interativas, manipulação de dados, validações e lógica de programação.' },
  { name: 'TypeScript', mark: 'TS', color: 'typescript', description: 'Utilização de tipagem estática para organizar o código, melhorar sua manutenção e identificar possíveis erros durante o desenvolvimento.' },
  { name: 'React', mark: '', color: 'react', icon: Atom, description: 'Criação de componentes reutilizáveis, gerenciamento de estados, navegação e construção de interfaces dinâmicas.' },
]

const backend: Skill = {
  name: 'Node.js e Express', mark: 'JS', color: 'node',
  description: 'Construção de servidores, desenvolvimento de rotas e APIs REST, integração entre Front-End e Back-End e processamento de requisições.',
}
const database: Skill = {
  name: 'PostgreSQL', mark: '', color: 'database', icon: Database, status: 'Estudando',
  description: 'Estudo de bancos de dados relacionais, armazenamento de informações, consultas SQL e integração com aplicações.',
}
const testing: Skill = {
  name: 'Vitest', mark: '', color: 'vitest', icon: FlaskConical,
  description: 'Criação e execução de testes automatizados para verificar funcionalidades, identificar comportamentos inesperados e contribuir para a qualidade do código.',
}

function SkillCard({ skill }: { skill: Skill }) {
  const { name, mark, color, status = 'Praticando', description, icon: Icon } = skill

  return (
    <details className="skills-entry">
      <summary>
        <span className={`skills-mark skills-mark--${color}`} aria-hidden="true">
          {Icon ? <Icon size={28} strokeWidth={1.8} /> : mark}
        </span>
        <strong>{name}</strong>
        <span className="skills-seal">
          {status === 'Estudando' ? <BookOpen size={14} aria-hidden="true" /> : <FlaskConical size={14} aria-hidden="true" />}
          {status}
        </span>
      </summary>
      <p>{description}</p>
    </details>
  )
}

function SkillHeading({ icon: Icon, children }: { icon: LucideIcon; children: string }) {
  return <h2 className="skills-heading"><Icon aria-hidden="true" size={23} />{children}</h2>
}

export function SkillsSection() {
  return (
    <section id="habilidades" className="skills-section" tabIndex={-1} aria-labelledby="habilidades-title">
      <div className="shell skills-return">
        <a className="projects-page-back" href="#inicio">Voltar ao início</a>
      </div>
      <article className="skills-book">
        <div className="skills-leaf skills-intro" role="region" aria-label="Introdução e filosofia de aprendizado" tabIndex={0}>
          <header>
            <AlchemyMark size={64} />
            <h1 id="habilidades-title"><span>Capítulo III</span>Os Conhecimentos</h1>
            <div className="skills-flourish" aria-hidden="true">✦</div>
            <p className="skills-quote"><em>“Cada linha de código é um novo conhecimento adquirido. Cada projeto, uma oportunidade de transformar ideias em realidade.”</em></p>
          </header>
          <div className="skills-preface">
            <h2>Minha Caixa de Ferramentas</h2>
            <p>Ao longo da minha jornada como desenvolvedora, venho construindo conhecimentos em tecnologias de Front-End, Back-End, banco de dados e testes de software.</p>
            <p>Gosto de aprender colocando a mão na massa, experimentando soluções, enfrentando desafios e entendendo como cada tecnologia contribui para o desenvolvimento de aplicações.</p>
          </div>
          <div className="skills-illustration" aria-hidden="true">
            <BookOpen />
            <span><CodeXml /></span>
            <AlchemyMark size={70} />
          </div>
          <div className="skills-philosophy">
            <h2>✦ Minha Filosofia de Aprendizado</h2>
            <p>Acredito que aprender programação vai muito além de conhecer uma linguagem ou ferramenta. Para mim, significa compreender problemas, investigar possibilidades, testar soluções e evoluir continuamente.</p>
            <p>Cada tecnologia que estudo representa uma nova oportunidade de construir algo útil, criativo e significativo.</p>
          </div>
        </div>

        <div className="skills-leaf skills-catalog" role="region" aria-label="Catálogo de habilidades" tabIndex={0}>
          <div>
            <SkillHeading icon={Monitor}>Desenvolvimento Front-End</SkillHeading>
            <div className="skills-front-grid">
              {frontend.map((skill) => <SkillCard key={skill.name} skill={skill} />)}
            </div>
          </div>

          <div className="skills-backend">
            <SkillHeading icon={Server}>Desenvolvimento Back-End</SkillHeading>
            <SkillCard skill={backend} />
          </div>

          <div className="skills-pair">
            <div>
              <SkillHeading icon={Database}>Banco de Dados</SkillHeading>
              <SkillCard skill={database} />
            </div>
            <div>
              <SkillHeading icon={FlaskConical}>Testes e Qualidade</SkillHeading>
              <SkillCard skill={testing} />
            </div>
          </div>

          <div className="skills-pair skills-reference-lists">
            <div>
              <SkillHeading icon={Wrench}>Ferramentas de Desenvolvimento</SkillHeading>
              <ul className="skills-notes">
                <li>Git e GitHub — Versionamento e organização de projetos.</li>
                <li>Visual Studio Code — Ambiente de desenvolvimento.</li>
                <li>Vite — Ferramenta de desenvolvimento e compilação de aplicações web.</li>
                <li>Ferramentas de IA — Apoio à pesquisa, ao aprendizado, à análise de código e à resolução de problemas.</li>
              </ul>
            </div>
            <div>
              <SkillHeading icon={UsersRound}>Habilidades Profissionais</SkillHeading>
              <ul className="skills-notes skills-checklist">
                <li>Resolução de problemas e pensamento analítico.</li>
                <li>Trabalho em equipe e colaboração.</li>
                <li>Organização e atenção aos detalhes.</li>
                <li>Comunicação e disposição para receber feedback.</li>
                <li>Curiosidade e aprendizado contínuo.</li>
                <li>Persistência diante de desafios.</li>
              </ul>
            </div>
          </div>
          <div className="skills-flourish skills-catalog-end" aria-hidden="true"><Layers3 size={22} /></div>
        </div>
      </article>
    </section>
  )
}
