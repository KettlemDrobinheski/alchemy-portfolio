import { CodeXml, Compass, House, Layers3, Mail, UserRound } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AlchemyMark } from './components/AlchemyMark'
import { Brand, Navbar } from './components/Navbar'
import { Portrait } from './components/Portrait'
import profilePhoto from './assets/perfil-alchemy-transparente.png'
import { Reveal } from './components/Section'
import { CursorStars } from './components/CursorStars'
import { MysticMusicPlayer } from './components/MysticMusicPlayer'
import { HeroBackdrop } from './components/HeroBackdrop'
import { ProjectsPage } from './components/ProjectsPage'
import { AboutPage } from './components/AboutPage'
import { SkillsSection } from './components/SkillsSection'
import { IntroductionPage } from './components/IntroductionPage'
import { FuturePage } from './components/FuturePage'
import { ContactPage } from './components/ContactPage'
import { HomeSprite, HomeSprites } from './components/HomeSprites'

const chapters = [
  { title: 'O Início', subtitle: 'Capítulo I — A Introdução', href: '#/introducao', icon: House },
  { title: 'Sobre Mim', subtitle: 'Capítulo II — A Jornada', href: '#/sobre', icon: UserRound },
  { title: 'Habilidades', subtitle: 'Capítulo III — Os Conhecimentos', href: '#/habilidades', icon: Layers3 },
  { title: 'Projetos', subtitle: 'Capítulo IV — As Criações', href: '#/projetos', icon: CodeXml },
  { title: 'O Futuro', subtitle: 'Capítulo V — O Próximo Capítulo', href: '#/futuro', icon: Compass },
  { title: 'Contato', subtitle: 'Capítulo VI — Novas Conexões', href: '#/contato', icon: Mail },
]

function App() {
  const hero = useRef<HTMLElement>(null)
  const main = useRef<HTMLElement>(null)
  const [hash, setHash] = useState(() => window.location.hash)
  const environment = hash === '#/projetos' || hash === '#projetos' ? 'projetos'
    : hash === '#/sobre' || hash === '#sobre' ? 'sobre'
    : hash === '#/habilidades' || hash === '#habilidades' ? 'habilidades'
    : hash === '#/introducao' ? 'introducao'
    : hash === '#/futuro' || hash === '#futuro' ? 'futuro'
    : hash === '#/contato' || hash === '#contato' ? 'contato' : null
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
      <Navbar environment={environment} musicPlayer={<MysticMusicPlayer />} />
      <CursorStars />
      <main id="conteudo" ref={main} tabIndex={-1}>
        {environment === 'projetos' ? <ProjectsPage /> : environment === 'sobre' ? <AboutPage />
          : environment === 'habilidades' ? <SkillsSection />
          : environment === 'introducao' ? <IntroductionPage />
          : environment === 'futuro' ? <FuturePage />
          : environment === 'contato' ? <ContactPage /> : (
          <>
            <section ref={hero} id="inicio" className="hero" tabIndex={-1} aria-labelledby="hero-title">
              <HeroBackdrop hero={hero} />
              <HomeSprites zone="hero" />
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
              <nav className="home-chapters" aria-label="Capítulos do portfólio">
                {chapters.map(({ title, subtitle, href, icon: Icon }, index) => (
                  <a key={href} className="home-chapter-card" href={href}>
                    <HomeSprite kind={index % 2 === 0 ? 'butterfly' : 'fairy'} landing />
                    <span className="home-chapter-frame" aria-hidden="true">
                      {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
                        <svg key={corner} className={`home-chapter-corner home-chapter-corner--${corner}`}
                          viewBox="0 0 40 40" fill="none">
                          <path d="M2 38V17C2 8 8 2 17 2H38M5 28C8 18 10 8 22 8c8 0 8 10 2 10-3 0-4-3-2-4M28 5c-6 4-12 6-15 11-3 4-2 8 1 9 3 2 6 0 6-3" />
                          <path d="m8 8 2-4 2 4-2 4Z" fill="currentColor" />
                        </svg>
                      ))}
                    </span>
                    <span className="home-chapter-medallion" aria-hidden="true">
                      <Icon size={22} />
                    </span>
                    <span className="home-chapter-copy">
                      <strong>{title}</strong>
                      <span>{subtitle}</span>
                    </span>
                  </a>
                ))}
              </nav>

            </div>
          </>
        )}
      </main>

      <footer className="site-footer">
        <div className="shell footer-inner home-sprite-zone">
          {!environment && <HomeSprites zone="footer" />}
          <Brand />
          <p>© {new Date().getFullYear()} Kettlem Drobinheski</p>
        </div>
      </footer>
    </>
  )
}

export default App


