import { CodeXml, Compass, House, Layers3, Mail, UserRound } from 'lucide-react'
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from 'react'
import { AlchemyMark } from './components/AlchemyMark'
import { Brand, Navbar } from './components/Navbar'
import { Portrait } from './components/Portrait'
import profilePhoto from './assets/perfil-alchemy-transparente.png'
import { Reveal } from './components/Section'
import { CursorStars } from './components/CursorStars'
import { MysticMusicPlayer } from './components/MysticMusicPlayer'
import { PortalEntrance } from './components/PortalEntrance'
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

const entranceKey = 'alchemy.portal.entered'

function shouldShowPortal() {
  try {
    return sessionStorage.getItem(entranceKey) !== 'yes'
  } catch {
    return true
  }
}

function App() {
  const hero = useRef<HTMLElement>(null)
  const main = useRef<HTMLElement>(null)
  const [chapterPortal, setChapterPortal] = useState<{ x: number; y: number } | null>(null)
  const chapterTimers = useRef<{ navigate: number; finish: number } | null>(null)
  const music = useRef<{ playOpeningTrack: () => void }>(null)
  const [portalVisible, setPortalVisible] = useState(shouldShowPortal)
  const completeEntrance = useCallback(() => setPortalVisible(false), [])
  const enteredThroughPortal = useRef(false)
  const [hash, setHash] = useState(() => window.location.hash)
  const environment = hash === '#/projetos' || hash === '#projetos' ? 'projetos'
    : hash === '#/sobre' || hash === '#sobre' ? 'sobre'
    : hash === '#/habilidades' || hash === '#habilidades' ? 'habilidades'
    : hash === '#/introducao' ? 'introducao'
    : hash === '#/futuro' || hash === '#futuro' ? 'futuro'
    : hash === '#/contato' || hash === '#contato' ? 'contato' : null
  const previousPage = useRef(false)

  useEffect(() => {
    const timers = chapterTimers
    return () => {
      if (!timers.current) return
      window.clearTimeout(timers.current.navigate)
      window.clearTimeout(timers.current.finish)
      timers.current = null
    }
  }, [])

  function enterChapter(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    event.preventDefault()
    if (chapterTimers.current) return

    const bounds = event.currentTarget.getBoundingClientRect()
    const startingHash = window.location.hash
    setChapterPortal({
      x: Math.min(window.innerWidth, Math.max(0, bounds.left + bounds.width / 2)),
      y: Math.min(window.innerHeight, Math.max(0, bounds.top + bounds.height / 2)),
    })

    chapterTimers.current = {
      navigate: window.setTimeout(() => {
        if (window.location.hash === startingHash) window.location.hash = href
      }, 380),
      finish: window.setTimeout(() => {
        chapterTimers.current = null
        setChapterPortal(null)
      }, 820),
    }
  }

  useEffect(() => {
    function updateHash() {
      setHash(window.location.hash)
    }

    window.addEventListener('hashchange', updateHash)
    return () => window.removeEventListener('hashchange', updateHash)
  }, [])

  useLayoutEffect(() => {
    if (portalVisible) return

    if (environment) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      main.current?.focus({ preventScroll: true })
    } else if (previousPage.current) {
      const destination = document.getElementById(hash.slice(1) || 'inicio')
      destination?.scrollIntoView({ behavior: 'instant' })
      destination?.focus({ preventScroll: true })
    } else if (enteredThroughPortal.current) {
      main.current?.focus({ preventScroll: true })
    }

    previousPage.current = environment !== null
    enteredThroughPortal.current = false
  }, [hash, environment, portalVisible])

  return (
    <>
      <a className="skip-link" href="#conteudo" onClick={(event) => {
        event.preventDefault()
        main.current?.focus()
      }}>Pular para o conteúdo</a>
      <Navbar environment={environment} musicPlayer={<MysticMusicPlayer ref={music} />} />
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
                <div className="hero-copy">
                  <Reveal immediate>
                    <div className="hero-emblem" aria-hidden="true"><AlchemyMark size={34} /></div>
                    <p className="hero-kicker">A ARTE DA CRIAÇÃO DIGITAL</p>
                    <h1 id="hero-title">Kettlem <span>Drobinheski</span></h1>
                    <p className="role">Desenvolvedora de Software</p>
                    <p className="hero-stack">React <span aria-hidden="true">•</span> TypeScript <span aria-hidden="true">•</span> Node.js <span aria-hidden="true">•</span> Next.js</p>
                    <p className="hero-description">Transformo ideias em soluções digitais, unindo tecnologia, criatividade e propósito.</p>
                  </Reveal>
                </div>
              </div>
            </section>

            <div className="shell">
              <nav className="home-chapters" aria-label="Capítulos do portfólio">
                {chapters.map(({ title, subtitle, href, icon: Icon }, index) => (
                  <a key={href} className="home-chapter-card" href={href} onClick={(event) => enterChapter(event, href)}>
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
      {chapterPortal && (
        <div className="chapter-portal" aria-hidden="true">
          <div className="chapter-portal__ring" style={{ left: chapterPortal.x, top: chapterPortal.y }} />
        </div>
      )}
      {portalVisible && (
        <PortalEntrance
          onEnter={(withMusic) => {
            enteredThroughPortal.current = true
            try {
              sessionStorage.setItem(entranceKey, 'yes')
            } catch {
              // The entry still works when session storage is unavailable.
            }
            if (withMusic) {
              try {
                music.current?.playOpeningTrack()
              } catch (error) {
                console.warn('Alchemy Music: não foi possível iniciar a trilha de entrada', error)
              }
            }
          }}
          onComplete={completeEntrance}
        />
      )}
    </>
  )
}

export default App


