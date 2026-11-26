import { BriefcaseBusiness, CodeXml, GitFork, Layers3, UserRound } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AlchemyMark } from './components/AlchemyMark'
import { Brand, Navbar } from './components/Navbar'
import { Portrait } from './components/Portrait'
import profilePhoto from './assets/perfil-alchemy-transparente.png'
import { Reveal, Section } from './components/Section'
import { CursorStars } from './components/CursorStars'
import { HeroBackdrop } from './components/HeroBackdrop'
import { ProjectsPage } from './components/ProjectsPage'
import { AboutPage } from './components/AboutPage'
import { SkillsSection } from './components/SkillsSection'

const profiles: { name: string; icon: LucideIcon; href?: string }[] = [
  { name: 'GitHub', icon: GitFork },
  { name: 'LinkedIn', icon: BriefcaseBusiness },
]

function App() {
  const hero = useRef<HTMLElement>(null)
  const main = useRef<HTMLElement>(null)
  const [hash, setHash] = useState(() => window.location.hash)
  const environment = hash === '#/projetos' || hash === '#projetos' ? 'projetos'
    : hash === '#/sobre' || hash === '#sobre' ? 'sobre'
    : hash === '#/habilidades' || hash === '#habilidades' ? 'habilidades' : null
  const previousPage = useRef(false)

  useEffect(() => {
    function updateHash() {
      setHash(window.location.hash)
    }

    window.addEventListener('hashchange', updateHash)
    return () => window.removeEventListener('hashchange', updateHash)
  }, [])

  useLayoutEffect(() => {
    if (environment) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      main.current?.focus({ preventScroll: true })
    } else if (previousPage.current) {
      const destination = document.getElementById(hash.slice(1) || 'inicio')
      destination?.scrollIntoView({ behavior: 'instant' })
      destination?.focus({ preventScroll: true })
    }

    previousPage.current = environment !== null
  }, [hash, environment])

  return (
    <>
      <a className="skip-link" href="#conteudo" onClick={(event) => {
        event.preventDefault()
        main.current?.focus()
      }}>Pular para o conteúdo</a>
      <Navbar environment={environment} />
      <CursorStars />
      <main id="conteudo" ref={main} tabIndex={-1}>
        {environment === 'projetos' ? <ProjectsPage /> : environment === 'sobre' ? <AboutPage />
          : environment === 'habilidades' ? <SkillsSection /> : (
          <>
            <section ref={hero} id="inicio" className="hero" tabIndex={-1} aria-labelledby="hero-title">
              <HeroBackdrop hero={hero} />
              <div className="shell hero-inner">
                <Portrait src={profilePhoto} />
                <Reveal immediate>
                  <div className="hero-emblem" aria-hidden="true"><AlchemyMark size={39} /></div>
                  <p className="hero-kicker">A arte da criação digital</p>
                  <h1 id="hero-title">Kettlem <span>Drobinheski</span></h1>
                  <p className="role">Desenvolvedora de Software</p>
                  <p className="hero-stack">React <span>◆</span> TypeScript <span>◆</span> Node.js <span>◆</span> Next.js</p>
                  <p className="hero-description">Transformo ideias em soluções digitais, unindo tecnologia, criatividade e propósito.</p>
                  <div className="actions">
                    <a className="button button-primary" href="#/projetos"><CodeXml aria-hidden="true" /> Ver Projetos</a>
                    <a className="button" href="#/sobre"><UserRound aria-hidden="true" /> Sobre Mim</a>
                  </div>
                </Reveal>
              </div>
            </section>

            <div className="shell">
              <div className="home-skills">
                <a className="home-skills-card" href="#/habilidades">
                  <Layers3 size={28} aria-hidden="true" />
                  <span>
                    <strong>Habilidades</strong>
                    <span>Capítulo III — Os Conhecimentos</span>
                  </span>
                </a>
              </div>

              <Section id="contato" title="Contato">
                <div className="actions">
                  {profiles.map(({ name, icon: Icon, href }) => href ? (
                    <a key={name} className="button" href={href}><Icon size={18} aria-hidden="true" />{name}</a>
                  ) : (
                    <span key={name} className="button profile-pending">
                      <Icon size={18} aria-hidden="true" />{name}<small>Em breve</small>
                    </span>
                  ))}
                </div>
              </Section>
            </div>
          </>
        )}
      </main>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <Brand />
          <p>© {new Date().getFullYear()} Kettlem Drobinheski</p>
        </div>
      </footer>
    </>
  )
}

export default App


