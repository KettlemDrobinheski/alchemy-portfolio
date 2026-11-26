import { useId } from 'react'
import './HomeSprites.css'

type SpriteKind = 'butterfly' | 'fairy'

export function HomeSprite({ kind, landing = false }: { kind: SpriteKind; landing?: boolean }) {
  const gradient = useId()
  const butterfly = kind === 'butterfly'

  return (
    <svg className={`home-sprite home-sprite--${kind}${landing ? ' home-sprite--landing' : ''}`}
      viewBox="0 0 36 36" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={gradient} cx="50%" cy="57%" r="60%">
          <stop stopColor="#fff8e8" />
          <stop offset=".5" stopColor="currentColor" stopOpacity={butterfly ? .9 : .65} />
          <stop offset="1" stopColor="currentColor" stopOpacity={butterfly ? .32 : .12} />
        </radialGradient>
      </defs>
      {butterfly ? (
        <>
          <g className="home-sprite-wings">
            <path d="M18 18C11 5 5 4 3 8c-3 5 2 12 11 13-7-1-9 6-5 8 4 2 7-3 9-9m0-2C25 5 31 4 33 8c3 5-2 12-11 13 7-1 9 6 5 8-4 2-7-3-9-9"
              fill={`url(#${gradient})`} stroke="currentColor" strokeWidth=".8" />
            <path d="M16 19C11 17 7 13 5 9m11 12c-4 1-6 3-6 6m10-8c5-2 9-6 11-10m-11 12c4 1 6 3 6 6"
              stroke="#fff4df" strokeWidth=".65" opacity=".65" />
            <circle cx="8" cy="13" r="1" fill="#fff7d7" />
            <circle cx="28" cy="13" r="1" fill="#fff7d7" />
          </g>
          <path d="M18 15c-1.6-3-2.5-4.5-4.4-5m4.4 5c1.6-3 2.5-4.5 4.4-5M18 15v10"
            stroke="#fff1c7" strokeWidth="1.15" strokeLinecap="round" />
        </>
      ) : (
        <>
          <g className="home-sprite-wings">
            <path d="M17 19C10 18 3 11 5 7c2-4 9 2 12 12-6-4-11 0-8 4 2 2 5 0 8-4Zm2 0c7-1 14-8 12-12-2-4-9 2-12 12 6-4 11 0 8 4-2 2-5 0-8-4Z"
              fill={`url(#${gradient})`} stroke="currentColor" strokeWidth=".7" />
            <path d="M7 8c2 4 6 8 9 10M29 8c-2 4-6 8-9 10m-9 3 5-2m9 2-5-2"
              stroke="#fef4d5" strokeWidth=".6" opacity=".65" />
          </g>
          <circle cx="18" cy="13" r="2.1" fill="#fff4d4" />
          <path d="M18 16c-.7 2.3-2.3 5-3.7 7.3 2.4 1 5 1 7.4 0C20.3 21 18.7 18.3 18 16Z" fill="#fff4d4" />
          <path d="m17 23.7-.7 3.3 1.4 1.4m1.3-4.7.7 3.3-1.4 1.4M16.7 17.5l-3.8 2m6.4-2 3.8 2"
            stroke="#fff4d4" strokeWidth=".75" strokeLinecap="round" />
          <path d="M31 1v6m-3-3h6" stroke="currentColor" strokeWidth=".85" strokeLinecap="round" />
        </>
      )}
    </svg>
  )
}

export function HomeSprites({ zone }: { zone: 'hero' | 'footer' }) {
  return (
    <div className={`home-sprites home-sprites--${zone}`} aria-hidden="true">
      <HomeSprite kind="butterfly" />
      <HomeSprite kind="fairy" />
      <HomeSprite kind="butterfly" />
      <HomeSprite kind="fairy" />
    </div>
  )
}
