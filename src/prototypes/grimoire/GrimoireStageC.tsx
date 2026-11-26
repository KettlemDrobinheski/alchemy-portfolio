import { Canvas } from '@react-three/fiber'
import { useReducedMotion } from 'motion/react'
import { useEffect, useReducer, useState } from 'react'
import { FloatingBook } from './FloatingBook'
import { initialBook, navigateBook, pageTitles } from './bookNavigation'
import './prototype.css'
import './stage-c.css'

function SceneFallback({ onUnavailable }: { onUnavailable: (unavailable: boolean) => void }) {
  useEffect(() => {
    onUnavailable(true)
  }, [onUnavailable])

  return <p>WebGL indisponível. Use os controles para ler as páginas em texto.</p>
}

export function GrimoireStageC() {
  const [state, dispatch] = useReducer(navigateBook, initialBook)
  const [paused, setPaused] = useState(false)
  const [webglUnavailable, setWebglUnavailable] = useState(false)
  const reducedMotion = Boolean(useReducedMotion())
  const floating = !paused && !reducedMotion
  const instant = reducedMotion || webglUnavailable
  const closed = state.phase === 'closed'
  const ready = state.phase === 'open'
  const canRead = ready || state.phase === 'turning'

  function openBook() {
    dispatch({ type: 'open', instant })
  }

  return (
    <main className="prototype grimoire-stage-c">
      <h1>Grimório 3D</h1>
      <div className="prototype-scene">

        <Canvas
          aria-label="Grimório de couro roxo com lua dourada e páginas de pergaminho"
          camera={{ position: [3.1, 4.6, 5.3], fov: 47 }}
          dpr={[1, 1.35]}
          shadows
          frameloop="demand"
          fallback={<SceneFallback onUnavailable={setWebglUnavailable} />}
        >
          <color attach="background" args={['#160e20']} />
          <fog attach="fog" args={['#160e20', 9, 21]} />
          <hemisphereLight args={['#f2e3ff', '#46324c', 1.15]} />
          <directionalLight
            castShadow
            position={[3, 6, 4]}
            color="#ffe0bb"
            intensity={2.3}
            shadow-mapSize={[1024, 1024]}
            shadow-camera-left={-4}
            shadow-camera-right={4}
            shadow-camera-top={4}
            shadow-camera-bottom={-4}
            shadow-normalBias={.025}
          />
          <pointLight position={[-2, 2.1, -1.4]} color="#b455ff" intensity={23} distance={8} />
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[32, 32]} />
            <meshStandardMaterial color="#38263c" roughness={1} />
          </mesh>
          <FloatingBook state={state} floating={floating} reducedMotion={reducedMotion}
            onOpen={openBook} onSettled={() => dispatch({ type: 'settled' })} />
        </Canvas>

      </div>
      <div className="grimoire-stage-reading" role="status">
        {canRead ? (
          <>
            <span>Página {state.page + 1} de {pageTitles.length}</span>
            <p>{pageTitles[state.page]}</p>
          </>
        ) : <p>{closed ? 'Grimório fechado' : state.phase === 'opening' ? 'Abrindo grimório…' : 'Fechando grimório…'}</p>}
      </div>
      <div className="grimoire-stage-actions">
        <button type="button" aria-disabled={!closed && !ready} onClick={() => {
          if (closed) openBook()
          else if (ready) dispatch({ type: 'close', instant })
        }}>
          {closed || state.phase === 'opening' ? 'Abrir grimório' : 'Fechar grimório'}
        </button>
        {canRead && (
          <>
            <button type="button" aria-disabled={!ready || state.page === 0}
              onClick={() => dispatch({ type: 'turn', direction: -1, instant })}>Anterior</button>
            <button type="button" aria-disabled={!ready || state.page === pageTitles.length - 1}
              onClick={() => dispatch({ type: 'turn', direction: 1, instant })}>Próxima</button>
          </>
        )}
        {!instant && (
          <button type="button" onClick={() => setPaused((current) => !current)}>
            {paused ? 'Retomar flutuação' : 'Pausar flutuação'}
          </button>
        )}
        <a href={`${import.meta.env.BASE_URL}grimoire-prototype.html`}>Ver protótipo anterior</a>
      </div>

    </main>
  )
}
