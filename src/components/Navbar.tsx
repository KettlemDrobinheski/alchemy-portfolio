import { CodeXml, House, Layers3, Mail, UserRound } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AlchemyMark } from './AlchemyMark'

const links = [
  { id: 'inicio', label: 'Início', icon: House },
  { id: 'sobre', label: 'Sobre Mim', icon: UserRound },
  { id: 'projetos', label: 'Projetos', icon: CodeXml },
  { id: 'habilidades', label: 'Habilidades', icon: Layers3 },
  { id: 'contato', label: 'Contato', icon: Mail },
]

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a className="brand" href="#inicio">
      <AlchemyMark size={compact ? 28 : 51} />
      <span>ALCHEMY{!compact && <small>Portfólio de Desenvolvimento</small>}</span>
    </a>
  )
}

export function Navbar({ environment, musicPlayer }: { musicPlayer: ReactNode; environment: 'projetos' | 'sobre' | 'habilidades' | 'introducao' | 'futuro' | 'contato' | null }) {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const toggle = useRef<HTMLButtonElement>(null)
  const header = useRef<HTMLElement>(null)
  const navigation = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!open) return

    function closeFromOutside(event: MouseEvent) {
      if (!(event.target instanceof Node)) return
      if (toggle.current?.contains(event.target) || navigation.current?.contains(event.target)) return

      if (navigation.current?.contains(document.activeElement)) toggle.current?.focus()
      setOpen(false)
    }

    function closeFromEscape(event: KeyboardEvent) {
      if (event.key !== 'Escape' || event.defaultPrevented) return

      event.preventDefault()
      setOpen(false)
      toggle.current?.focus()
    }

    function closeOnNavigation() {
      setOpen(false)
    }

    document.addEventListener('click', closeFromOutside)
    document.addEventListener('keydown', closeFromEscape)
    window.addEventListener('hashchange', closeOnNavigation)
    return () => {
      document.removeEventListener('click', closeFromOutside)
      document.removeEventListener('keydown', closeFromEscape)
      window.removeEventListener('hashchange', closeOnNavigation)
    }
  }, [open])

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
    <header ref={header} className="site-header">
      <div className="shell header-inner">
        <Brand compact />
        {musicPlayer}
        <button
          ref={toggle}
          className="menu-toggle"
          type="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="navigation"
          onClick={() => setOpen((wasOpen) => !wasOpen)}
        >
          <span className="menu-toggle-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
        <nav ref={navigation} id="navigation" className="navigation" hidden={!open} aria-label="Principal">
          {links.map(({ id, label, icon: Icon }) => (
            <a key={id} href={id === 'inicio' ? '#inicio' : '#/' + id}
              aria-current={environment ? (id === environment ? 'page' : undefined) : (activeSection === id ? 'location' : undefined)}
              onClick={() => {
                const destination = document.getElementById(id) ?? toggle.current
                destination?.focus({ preventScroll: true })
                setActiveSection(id)
                setOpen(false)
              }}><Icon size={21} strokeWidth={1.6} aria-hidden="true" />{label}</a>
          ))}
        </nav>
      </div>
    </header>
  )
}
