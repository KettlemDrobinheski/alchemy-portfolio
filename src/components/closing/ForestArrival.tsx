import { useEffect, useRef, useState, type CSSProperties } from 'react'
import forestArtwork from './floresta-luar.png'
import './closing.css'

const fireflies = [
  [9, 63], [17, 39], [24, 71], [32, 49], [37, 59], [44, 43], [47, 68],
  [52, 55], [58, 48], [62, 64], [68, 36], [72, 57], [77, 71], [83, 45],
  [91, 32], [95, 62], [13, 79], [28, 55], [56, 72], [88, 77],
]

export function ForestArrival({ onReturnToEntrance }: { onReturnToEntrance: () => void }) {
  const [loaded, setLoaded] = useState(false)
  const filterClock = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const clock = filterClock.current
    function syncWind() {
      if (preference.matches) clock?.pauseAnimations?.()
      else clock?.unpauseAnimations?.()
    }
    syncWind()
    preference.addEventListener('change', syncWind)
    return () => preference.removeEventListener('change', syncWind)
  }, [])

  return (
    <section className="forest-page" aria-labelledby="forest-title">
      <svg ref={filterClock} className="forest-wind-filter" aria-hidden="true">
        <defs>
          <filter id="forest-canopy-wind" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency=".013 .025" numOctaves={1} seed={7} result="wind">
              <animate attributeName="baseFrequency" values=".013 .025;.018 .021;.013 .025" dur="11s" repeatCount="indefinite" />
            </feTurbulence>
            <feFlood floodColor="#808080" result="still" />
            <feComposite in="wind" in2="still" operator="over" x="0" y="0" width="100%" height="28%" result="canopy" />
            <feGaussianBlur in="canopy" stdDeviation="18" result="softCanopy" />
            <feComposite in="softCanopy" in2="still" operator="over" result="displacement" />
            <feDisplacementMap in="SourceGraphic" in2="displacement" scale={11} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <div className="forest-arrival" data-loaded={loaded}>
        <div className="forest-static" aria-hidden="true"><div className="still-path" /><div className="still-woods" /></div>
        <div className="forest-arrival-view">
          <img className="forest-arrival-art" src={forestArtwork}
            alt="Caminho de pedras entre árvores antigas, cristais violetas e flores iluminadas pela lua."
            onLoad={() => setLoaded(true)} />
          {loaded && (
            <div className="forest-arrival-effects" aria-hidden="true">
              <div className="forest-ground-mist" />
              {fireflies.map(([x, y], index) => (
                <span className="forest-firefly" key={x} style={{
                  '--x': x + '%',
                  '--size': (y > 60 ? 4 : y > 48 ? 3 : 2) + 'px',
                  '--glow': (y > 60 ? 10 : y > 48 ? 7 : 4) + 'px',
                  '--y': y + '%',
                  '--delay': -(index * 1.37) + 's',
                  '--flight-x': (x > 80 || (x > 20 && index % 2) ? -1 : 1) * ((y > 60 ? 74 : 39) + index % 5 * 5) + 'px',
                  '--flight-y': (index % 3 ? -1 : 1) * (25 + index % 4 * 9) + 'px',
                  '--duration': 4.4 + index % 7 * .65 + 's',
                } as CSSProperties} />
              ))}
            </div>
          )}
        </div>
        {loaded && <div className="forest-arrival-ring" aria-hidden="true" />}
      </div>
      <div className="forest-caption">
        <h1 id="forest-title">Floresta Encantada</h1>
        <a className="home-chapter-card forest-return-card" href={import.meta.env.BASE_URL} onClick={onReturnToEntrance}>
          <span className="home-chapter-frame" aria-hidden="true" />
          <span className="home-chapter-copy"><strong>Portal inicial</strong></span>
        </a>
      </div>
    </section>
  )
}
