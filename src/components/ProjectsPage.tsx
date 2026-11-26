import { ArrowLeft, House, Settings, UserRound } from 'lucide-react'
import gessoLiderArt from '../assets/projects/gessolider.png'
import lupoCalibraArt from '../assets/projects/lupocalibra.png'
import userManagementArt from '../assets/projects/user-management.png'
import { AlchemyMark } from './AlchemyMark'
import { ProjectCard } from './ProjectCard'
import { Reveal } from './Section'

const projects = [
  {
    title: 'GessoLider',
    description: 'Aplicativo para elaborar e gerenciar orçamentos de construção a seco.',
    stack: ['Expo', 'React Native', 'TypeScript'],
    icon: House,
    screenshot: { src: gessoLiderArt, alt: 'Arte de apresentação do GessoLider' },
  },
  {
    title: 'LupoCalibra',
    description: 'Protótipo de ferramenta para auxiliar processos de calibração industrial.',
    stack: ['Next.js', 'TypeScript'],
    icon: Settings,
    screenshot: { src: lupoCalibraArt, alt: 'Arte de apresentação do LupoCalibra' },
  },
  {
    title: 'User Management',
    description: 'Sistema de gerenciamento de usuários.',
    stack: ['React', 'Node.js', 'PostgreSQL'],
    icon: UserRound,
    screenshot: { src: userManagementArt, alt: 'Arte de apresentação do User Management' },
  },
]

export function ProjectsPage() {
  return (
    <section id="projetos" className="projects-page" aria-labelledby="projects-title">
      <div className="shell projects-page-content">
        <a className="projects-page-back" href="#inicio">
          <ArrowLeft size={18} aria-hidden="true" />
          Voltar ao início
        </a>
        <Reveal immediate>
          <header className="projects-page-heading">
            <div className="projects-page-ornament" aria-hidden="true"><AlchemyMark size={36} /></div>
            <h1 id="projects-title">Meus Projetos</h1>
            <p>Aplicações reais que unem propósito, tecnologia e solução.</p>
          </header>
        </Reveal>
        <div className="project-grid">
          {projects.map((project) => <ProjectCard key={project.title} {...project} />)}
        </div>
      </div>
    </section>
  )
}
