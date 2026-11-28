import { BookOpen, CodeXml, ExternalLink, Flag, Images, Lightbulb, ListChecks, Mountain, Settings, X } from 'lucide-react'
import { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import type { ProjectDetails } from '../data/projectDetails'
import { TechList } from './ProjectCard'
import { CursorStars } from './CursorStars'
import { ProjectScreenshotGallery } from './ProjectScreenshotGallery'
import './ProjectDetailsDialog.css'

function visibleCard(trigger: HTMLButtonElement) {
  const rect = trigger.getBoundingClientRect()
  return trigger.isConnected && rect.width && rect.height
    && rect.right > 0 && rect.left < window.innerWidth && rect.bottom > 0 && rect.top < window.innerHeight
    ? rect : null
}

export function ProjectDetailsDialog({ project, trigger, onClose }: {
  project: ProjectDetails
  trigger: HTMLButtonElement
  onClose: () => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  const cardFace = useRef<HTMLDivElement>(null)
  const titleId = useId()
  const subtitleId = useId()
  const Seal = project.seal?.icon
  const [flight, setFlight] = useState(() => Seal && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? visibleCard(trigger) : null)
  const [phase, setPhase] = useState<'opening' | 'open' | 'closing'>(() => flight ? 'opening' : 'open')
  const showFlight = Boolean(flight && Seal && phase !== 'open')

  useLayoutEffect(() => {
    const element = dialog.current
    if (element && !element.open) element.showModal()
    closeButton.current?.focus({ preventScroll: true })
  }, [])

  useLayoutEffect(() => {
    const front = cardFace.current
    const original = trigger.closest('.project-card')
    if (!front || !original) return

    const clone = original.cloneNode(true) as HTMLElement
    clone.querySelector('.project-card__details-trigger')?.remove()
    clone.querySelectorAll('img[loading="lazy"]').forEach((image) => {
      image.setAttribute('loading', 'eager')
    })
    clone.inert = true
    front.replaceChildren(clone)
    return () => front.replaceChildren()
  }, [Seal, trigger])

  useEffect(() => {
    if (phase === 'open') return

    const timeout = window.setTimeout(() => {
      if (phase === 'opening') setPhase('open')
      else dialog.current?.close()
    }, 570)
    return () => window.clearTimeout(timeout)
  }, [phase])

  function requestClose() {
    if (phase === 'closing') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      dialog.current?.close()
      return
    }

    closeButton.current?.focus({ preventScroll: true })
    setFlight(Seal ? visibleCard(trigger) : null)
    setPhase('closing')
  }

  return (
    <dialog ref={dialog} className="project-details-dialog" aria-labelledby={titleId} aria-describedby={subtitleId}
      data-phase={phase} data-flight={showFlight} onClose={onClose}
      onCancel={(event) => {
        event.preventDefault()
        requestClose()
      }}
      onClick={(event) => {
        if (phase === 'open' && event.target === event.currentTarget) requestClose()
      }}>
      <CursorStars />
      {Seal && (
        <div className="project-card-flight" aria-hidden="true" hidden={!showFlight} style={flight ? {
          left: flight.left, top: flight.top, width: flight.width, height: flight.height,
          '--flight-x': `${window.innerWidth / 2 - flight.left - flight.width / 2}px`,
          '--flight-y': `${window.innerHeight / 2 - flight.top - flight.height / 2}px`,
        } as CSSProperties : undefined} onAnimationEnd={(event) => {
          if (event.target !== event.currentTarget) return
          if (phase === 'opening' && event.animationName === 'project-flight') setPhase('open')
          else if (phase === 'closing' && event.animationName === 'project-flight-return') dialog.current?.close()
        }}>
          <div className="project-card-flight__turn">
            <div ref={cardFace} className="project-card-flight__front" />
            <div className="project-card-flight__back">
              <div className="project-card-flight__seal"><Seal size={52} strokeWidth={1.3} /></div>
              <strong>{project.title}</strong>
            </div>
          </div>
        </div>
      )}
      <div className="project-details-panel" onAnimationEnd={(event) => {
        if (phase === 'closing' && !showFlight && event.target === event.currentTarget
          && event.animationName === 'project-details-dismiss') dialog.current?.close()
      }}>
        <span className="project-details-crystal project-details-crystal--top" aria-hidden="true" />
        <span className="project-details-crystal project-details-crystal--bottom" aria-hidden="true" />
        <span className="project-details-corners" aria-hidden="true" />
        <svg className="project-details-circuits" viewBox="0 0 140 124" fill="none" aria-hidden="true">
          <path d="M0 19h58l17 17h49M0 26h48l17 17h39M9 117V94l24-24h25l13-13h34M23 117V99l22-22h30l15-15h39M103 48l5 5-5 5-5-5 5-5Z" />
          <circle cx="124" cy="36" r="3" /><circle cx="104" cy="43" r="2" /><circle cx="129" cy="62" r="3" />
          <path d="M43 48l4 6-4 6-4-6 4-6ZM22 43v15m-5-8h10M116 79l9 14h-18Z" />
        </svg>
        <button ref={closeButton} className="project-details-close" type="button" aria-label="Fechar detalhes do projeto"
          onClick={requestClose}>
          <X size={20} aria-hidden="true" />
        </button>
        <div className="project-details-content" role="region" aria-labelledby={titleId} tabIndex={0} inert={phase !== 'open'}>
          <header className="project-details-heading">
            <h2 id={titleId}>{project.title}</h2>
            <p id={subtitleId}>{project.subtitle}</p>
            <p className="project-details-status"><Settings size={15} aria-hidden="true" />{project.status}</p>
          </header>

          {Seal && (
            <div className="project-details-banner" aria-hidden="true">
              <span><Seal size={44} strokeWidth={1.3} /></span>
            </div>
          )}
          <section className="project-details-gallery-section">
            <h3><Images aria-hidden="true" /> Galeria do sistema</h3>
            {project.screenshots.length ? (
              <ProjectScreenshotGallery screenshots={project.screenshots} />
            ) : (
              <div className="project-details-gallery-frame">
                <div className="project-details-gallery-slot" aria-hidden="true"><Images size={28} /></div>
                <p className="project-details-placeholder"><Images size={24} aria-hidden="true" /> Espaço reservado para capturas reais do sistema.</p>
                <div className="project-details-gallery-slot" aria-hidden="true"><Images size={28} /></div>
              </div>
            )}
          </section>
          <section className="project-details-about">
            <h3><BookOpen aria-hidden="true" /> Sobre o projeto</h3>
            {project.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
          <section className="project-details-features">
            <h3><ListChecks aria-hidden="true" /> Principais funcionalidades</h3>
            <ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
          </section>
          <section className="project-details-tech">
            <h3><CodeXml aria-hidden="true" /> Tecnologias</h3>
            <TechList items={project.stack} />
          </section>
          <div className="project-details-notes">
            <section>
              <h3><Mountain aria-hidden="true" /> Desafios</h3>
              {project.challenges.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
            <section>
              <h3><Lightbulb aria-hidden="true" /> Aprendizados</h3>
              <p>{project.learnings}</p>
            </section>
            <section>
              <h3><Flag aria-hidden="true" /> Próximos passos</h3>
              <p>{project.nextSteps}</p>
            </section>
          </div>
          <section className="project-details-links">
            <h3>Links do projeto</h3>
            {project.links.length ? (
              <ul>
                {project.links.map(({ href, label, kind }) => (
                  <li key={href} className={kind === 'github' ? 'project-details-repository-item' : kind === 'demo' ? 'project-details-demo-item' : undefined}>
                    {kind === 'github' ? (
                      <a className="project-details-repository" href={href} target="_blank" rel="noopener noreferrer"
                        aria-label={`${label} (abre em nova aba)`}>
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.32-3.79-1.32-.51-1.3-1.25-1.65-1.25-1.65-1.03-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1.01 1.72 2.64 1.22 3.28.93.1-.73.4-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.15a10.8 10.8 0 0 1 5.65 0c2.15-1.45 3.1-1.15 3.1-1.15.61 1.55.23 2.7.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.63 5.27-5.14 5.55.4.35.76 1.03.76 2.08v3.1c0 .3.2.65.77.54A11.25 11.25 0 0 0 12 .75Z" />
                        </svg>
                        {label}
                      </a>
                    ) : kind === 'demo' ? (
                      <a className="project-details-demo" href={href} target="_blank" rel="noopener noreferrer"
                        aria-label={label + " (abre em nova aba)"}>
                        <ExternalLink aria-hidden="true" />
                        {label}
                      </a>
                    ) : <a href={href}>{label}</a>}
                  </li>
                ))}
              </ul>
            ) : <p>Links públicos ainda indisponíveis.</p>}
          </section>
        </div>
      </div>
    </dialog>
  )
}
