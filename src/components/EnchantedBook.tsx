import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { AlchemyMark } from './AlchemyMark'

type UnlockPhase = 'locked' | 'turning' | 'sparkling' | 'unlocked'

const sparks = [[-24, -25], [0, -39], [23, -28], [33, -4], [19, 20], [-13, 24], [-30, 4]]

export function EnchantedBook() {
  const [phase, setPhase] = useState<UnlockPhase>('locked')
  const reducedMotion = useReducedMotion()

  function turnKey() {
    setPhase((current) => current === 'locked'
      ? (reducedMotion ? 'unlocked' : 'turning')
      : current)
  }

  function finishTurn() {
    setPhase((current) => {
      if (current !== 'turning') return current
      return reducedMotion ? 'unlocked' : 'sparkling'
    })
  }

  return (
    <div className="enchanted-book-stage">
      <span className="enchanted-book-status" role="status">
        {phase === 'unlocked' ? 'Grimório destrancado.' : ''}
      </span>
      <div className="enchanted-book">
        <div className="enchanted-book-pages" />
        <div className="enchanted-book-spine" />
        <div className="enchanted-book-cover">
          <svg className="enchanted-book-frame" viewBox="0 0 300 390" preserveAspectRatio="none" fill="none" aria-hidden="true">
            <path d="M35 12h230l23 23v320l-23 23H35l-23-23V35Z" />
            <path d="M42 23h216l19 19v306l-19 19H42l-19-19V42Z" opacity=".55" />
            <path d="M23 79c34-3 17-31 54-56m200 56c-34-3-17-31-54-56M23 311c34 3 17 31 54 56m200-56c-34 3-17 31-54 56" />
            <path d="m32 33 11-3-3 11-11 3Zm236 0-11-3 3 11 11 3ZM32 357l11 3-3-11-11-3Zm236 0-11 3 3-11 11-3Z" fill="currentColor" />
          </svg>
          <div className="enchanted-book-emblem">
            <AlchemyMark size={80} />
            <svg className="enchanted-book-crystal" viewBox="0 0 50 74" aria-hidden="true">
              <path d="M25 2 48 36 25 72 2 36Z" fill="#320846" stroke="#f6cb79" strokeWidth="2" />
              <path d="M25 8 41 36 25 65 9 36Z" fill="#a92cdb" />
              <path d="M25 8 41 36 25 32 9 36Z" fill="#f5c2ff" />
              <path d="M25 8 25 65 32 36Z" fill="#e47cff" />
            </svg>
          </div>
          <div className="enchanted-book-lock">
            <svg viewBox="0 0 100 64" fill="none" aria-hidden="true">
              <path d="m2 32 13-20 18 1L50 5l17 8 18-1 13 20-13 20-18-1-17 8-17-8-18 1Z" fill="#3b1d17" stroke="currentColor" strokeWidth="2" />
              <path d="M12 32 22 21l14 1 14-7 14 7 14-1 10 11-10 11-14-1-14 7-14-7-14 1Z" stroke="currentColor" opacity=".5" />
              <circle cx="50" cy="32" r="9" fill="#170a18" stroke="currentColor" />
            </svg>
            {phase === 'sparkling' && (
              <>
                <motion.span
                  aria-hidden="true"
                  className="enchanted-book-glow"
                  initial={{ opacity: 0, scale: .5 }}
                  animate={{ opacity: [0, 1, 0], scale: [.5, 1.1, 1.4] }}
                  transition={{ duration: reducedMotion ? 0 : .55 }}
                  onAnimationComplete={() => setPhase((current) => current === 'sparkling' ? 'unlocked' : current)}
                />
                {!reducedMotion && sparks.map(([x, y]) => (
                  <motion.span
                    key={x}
                    aria-hidden="true"
                    className="enchanted-book-spark"
                    initial={{ x: 0, y: 0, opacity: 0, scale: .5 }}
                    animate={{ x, y, opacity: [0, 1, 0], scale: [.5, 1, .2] }}
                    transition={{ duration: .42, delay: .1, ease: 'easeOut' }}
                  />
                ))}
              </>
            )}
            <button type="button" className="enchanted-book-key-button"
              aria-label="Vire a chave" aria-disabled={phase !== 'locked'} onClick={turnKey}>
              {phase === 'locked' && <span className="enchanted-book-key-label">✦ Vire a chave ✦</span>}
              <motion.svg className="enchanted-book-key" viewBox="0 0 88 42" fill="none" aria-hidden="true"
                initial={false}
                animate={{ rotate: phase === 'locked' || reducedMotion ? 0 : -90 }}
                transition={{ duration: reducedMotion ? 0 : .45, ease: 'easeInOut' }}
                onAnimationComplete={finishTurn}
              >
              <path d="M8 21h47m-36 0v8h8v-8m7 0v6h7v-6" stroke="#6b361c" strokeWidth="7" />
              <path d="M8 20h47m-36 0v8h8v-8m7 0v6h7v-6" stroke="currentColor" strokeWidth="4" />
              <path d="M54 21c7-16 24-21 31-5 4 10-8 22-19 16-4-2-9-6-12-11Z" stroke="currentColor" strokeWidth="3" />
              <path d="m69 14 7 7-7 7-7-7Z" stroke="#ffedb9" strokeWidth="2" />
              </motion.svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
