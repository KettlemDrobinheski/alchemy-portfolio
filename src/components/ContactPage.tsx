import { HomeLink } from './HomeLink'
import { ExternalLink, Mail } from 'lucide-react'
import contactDesk from '../assets/contact-magic-desk.png'
import './ContactPage.css'

const contacts = [
  { name: 'GitHub', address: 'github.com/KettlemDrobinheski', href: 'https://github.com/KettlemDrobinheski', kind: 'github' },
  { name: 'LinkedIn', address: 'linkedin.com/in/kettlem-drobinheski', href: 'https://www.linkedin.com/in/kettlem-drobinheski', kind: 'linkedin' },
  { name: 'E-mail', address: 'kettlemdrobinheskidev@gmail.com', href: 'mailto:kettlemdrobinheskidev@gmail.com', kind: 'email' },
] as const

export function ContactPage() {
  return (
    <section id="contato" className="contact-page" aria-labelledby="contact-title">
      <div className="shell">
        <HomeLink />
      </div>
      <article className="contact-scene">
        <img className="contact-art" src={contactDesk} alt="" width={1671} height={941} />
        <div className="contact-content">
          <header className="contact-intro">
            <h1 id="contact-title">Contato</h1>
            <h2>Vamos conversar?</h2>
            <p>Fique à vontade para entrar em contato, trocar ideias, conhecer meus projetos ou conversar sobre oportunidades na área de tecnologia.</p>
          </header>
          <ul className="contact-links">
            {contacts.map(({ name, address, href, kind }) => (
              <li key={kind}>
                <a className="contact-link" href={href}>
                  {kind === 'github' ? (
                    <svg className="contact-github" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.32-3.79-1.32-.51-1.3-1.25-1.65-1.25-1.65-1.03-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1.01 1.72 2.64 1.22 3.28.93.1-.73.4-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.15a10.8 10.8 0 0 1 5.65 0c2.15-1.45 3.1-1.15 3.1-1.15.61 1.55.23 2.7.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.63 5.27-5.14 5.55.4.35.76 1.03.76 2.08v3.1c0 .3.2.65.77.54A11.25 11.25 0 0 0 12 .75Z" />
                    </svg>
                  ) : kind === 'linkedin' ? (
                    <span className="contact-linkedin" aria-hidden="true">in</span>
                  ) : <Mail className="contact-mail" aria-hidden="true" />}
                  <strong>{name}</strong>
                  <span className="contact-address">{address}</span>
                  <ExternalLink className="contact-link-arrow" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </section>
  )
}
