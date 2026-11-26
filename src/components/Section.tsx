import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

export function Reveal({ children, immediate = false }: { children: ReactNode; immediate?: boolean }) {
  const reduced = useReducedMotion()
  const target = { opacity: 1, y: 0 }

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 14 }}
      animate={immediate || reduced ? target : undefined}
      whileInView={immediate || reduced ? undefined : target}
      viewport={{ once: true }}
      transition={{ duration: reduced ? 0 : 0.48, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="section" tabIndex={-1} aria-labelledby={id + '-title'}>
      <Reveal>
        <h2 id={id + '-title'}>{title}</h2>
        {children}
      </Reveal>
    </section>
  )
}
