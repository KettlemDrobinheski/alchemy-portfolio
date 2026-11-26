import { CodeXml, House, Layers3, Mail, Menu, UserRound, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { AlchemyMark } from './AlchemyMark'

const links = [
  { id: 'inicio', label: 'Início', icon: House },
  { id: 'sobre', label: 'Sobre Mim', icon: UserRound },
  { id: 'projetos', label: 'Projetos', icon: CodeXml },
  { id: 'habilidades', label: 'Habilidades', icon: Layers3 },
  { id: 'contato', label: 'Contato', icon: Mail },
]

export function Brand() {
  return (
    <a className="brand" href="#inicio">
      <AlchemyMark size={51} />
      <span>ALCHEMY<small>Portfólio de Desenvolvimento</small></span>
    </a>
  )
}

export function Navbar({ environment }: { environment: 'projetos' | 'sobre' | 'habilidades' | 'introducao' | 'futuro' | 'contato' | null }) {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const toggle = useRef<HTMLButtonElement>(null)
  const header = useRef<HTMLElement>(null)

  useEffect(() => {
    if (environment) return

    const sections = document.querySelectorAll<HTMLElement>('main section[id]')
    let frame: number | undefined

    function updateSection() {
      frame = undefined
      const readingLine = (header.current?.offsetHeight ?? 0) + 40
      const atBottom = window.scrollY > 0 &&
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
      let current = 'inicio'

      for (const section of sections) {
        if (atBottom || section.getBoundingClientRect().top <= readingLine) {
          current = section.id
        }
      }

      setActiveSection(current)
    }

    function scheduleUpdate() {
      if (frame === undefined) frame = window.requestAnimationFrame(updateSection)
    }

    scheduleUpdate()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      if (frame !== undefined) window.cancelAnimationFrame(frame)
    }
  }, [environment])

  return (
    <header ref={header} className="site-header" onKeyDown={(event) => {
      if (event.key === 'Escape' && open) {
        setOpen(false)
        toggle.current?.focus()
      }
    }}>
      <div className="shell header-inner">
        <Brand />
        <button
          ref={toggle}
          className="menu-toggle"
          type="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <nav id="navigation" className={open ? 'navigation is-open' : 'navigation'} aria-label="Principal">
          {links.map(({ id, label, icon: Icon }) => (
            <a key={id} href={id === 'inicio' ? '#inicio' : '#/' + id}
              aria-current={environment ? (id === environment ? 'page' : undefined) : (activeSection === id ? 'location' : undefined)}
              onClick={() => {
              document.getElementById(id)?.focus({ preventScroll: true })
              setActiveSection(id)
              setOpen(false)
            }}><Icon size={21} strokeWidth={1.6} aria-hidden="true" />{label}</a>
          ))}
        </nav>
      </div>
    </header>
  )
}
