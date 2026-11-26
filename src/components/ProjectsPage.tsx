import { ArrowLeft, House, Settings, UserRound } from 'lucide-react'
import { useState } from 'react'
import gessoLiderArt from '../assets/projects/gessolider.png'
import lupoCalibraArt from '../assets/projects/lupocalibra.png'
import userManagementArt from '../assets/projects/user-management.png'
import { projectDetails, type ProjectDetails } from '../data/projectDetails'
import { AlchemyMark } from './AlchemyMark'
import { ProjectCard } from './ProjectCard'
import { ProjectDetailsDialog } from './ProjectDetailsDialog'
import { Reveal } from './Section'

const projects = [
  {
    id: 'gessolider',
    title: 'GessoLider',
    description: 'Aplicativo para elaborar e gerenciar orçamentos de construção a seco.',
    stack: ['Expo', 'React Native', 'TypeScript'],
    icon: House,
    screenshot: { src: gessoLiderArt, alt: 'Arte de apresentação do GessoLider' },
  },
  {
    id: 'lupocalibra',
    title: 'LupoCalibra',
    description: 'Protótipo de ferramenta para auxiliar processos de calibração industrial.',
    stack: ['Next.js', 'TypeScript'],
    icon: Settings,
    screenshot: { src: lupoCalibraArt, alt: 'Arte de apresentação do LupoCalibra' },
  },
  {
    id: 'user-management',
    title: 'User Management',
    description: 'Sistema de gerenciamento de usuários.',
    stack: ['React', 'Node.js', 'PostgreSQL'],
    icon: UserRound,
    screenshot: { src: userManagementArt, alt: 'Arte de apresentação do User Management' },
  },
]

export function ProjectsPage() {
  const [selection, setSelection] = useState<{ details: ProjectDetails; trigger: HTMLButtonElement } | null>(null)

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
          {projects.map(({ id, ...project }) => {
            const details = projectDetails[id]
            return <ProjectCard key={id} {...project}
              onView={details ? (trigger) => setSelection({ details, trigger }) : undefined} />
          })}
        </div>
      </div>
      {selection && (
        <ProjectDetailsDialog project={selection.details} trigger={selection.trigger} onClose={() => {
          setSelection(null)
          selection.trigger.focus({ preventScroll: true })
        }} />
      )}
    </section>
  )
}
