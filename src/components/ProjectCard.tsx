import type { LucideIcon } from 'lucide-react'
import { Reveal } from './Section'

export function TechList({ items }: { items: readonly string[] }) {
  return <ul role="list" className="tech-list">{items.map((item) => <li key={item}>{item}</li>)}</ul>
}

function ProjectFrame() {
  return (
    <div className="project-frame" aria-hidden="true">
      {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
        <svg key={corner} className={`project-frame-corner project-frame-corner--${corner}`} viewBox="0 0 64 64" fill="none">
          <path d="M3 62V22L22 3H62M8 52V24L24 8H52" />
          <path d="M8 34C16 30 17 16 26 16c5 0 5 7 0 7-2 0-4-2-3-4M34 8c-4 8-18 9-18 18 0 5 7 5 7 0 0-2-2-4-4-3" />
          <path d="m13 13 4-2 2 2-2 4-4 2-2-2Z" fill="currentColor" />
        </svg>
      ))}
      {['top', 'bottom'].map((edge) => (
        <svg key={edge} className={`project-frame-jewel project-frame-jewel--${edge}`} viewBox="0 0 112 54" fill="none">
          <path className="project-jewel-scroll" d="M41 27C29 9 22 14 14 18c-6 3-9 1-12-1 4 10 17 7 24 9 5 1 9 5 14 7m31-6c12-18 19-13 27-9 6 3 9 1 12-1-4 10-17 7-24 9-5 1-9 5-14 7M10 33c12-6 22 3 32 3m60-3c-12-6-22 3-32 3" />
          <path className="project-jewel-setting" d="M56 2 76 27 56 52 36 27Z" />
          <path className="project-jewel-stone" d="M56 7 71 27 56 47 41 27Z" />
          <path className="project-jewel-facet" d="M56 7 61 24 56 47 49 27Z" />
          <path className="project-jewel-shine" d="M56 7 61 24 71 27 56 20 41 27Z" />
        </svg>
      ))}
    </div>
  )
}

type ProjectCardProps = {
  title: string
  description: string
  stack: readonly string[]
  icon: LucideIcon
  screenshot?: { src: string; alt: string }
  repositoryUrl?: string
  demoUrl?: string
}

export function ProjectCard({
  title, description, stack, icon: Icon, screenshot, repositoryUrl, demoUrl,
}: ProjectCardProps) {
  return (
    <Reveal>
      <article className="project-card">
        <ProjectFrame />
        {screenshot ? (
          <div className="project-visual project-visual--art">
            <img className="project-screenshot" src={screenshot.src} alt={screenshot.alt} loading="lazy" />
          </div>
        ) : (
          <div className="project-visual" aria-hidden="true">
            <div className="laptop">
              <div className="laptop-screen">
                <Icon size={28} strokeWidth={1.5} />
                <span>{title}</span>
              </div>
              <div className="laptop-base" />
            </div>
          </div>
        )}
        <div className="project-copy">
          <h3>{title}</h3>
          <p>{description}</p>
          <TechList items={stack} />
          {(repositoryUrl || demoUrl) && (
            <div className="project-links">
              {repositoryUrl && <a href={repositoryUrl} aria-label={`Repositório de ${title}`}>Repositório</a>}
              {demoUrl && <a href={demoUrl} aria-label={`Demonstração de ${title}`}>Demonstração</a>}
            </div>
          )}
        </div>
      </article>
    </Reveal>
  )
}
