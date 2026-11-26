import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { MathUtils } from 'three'
import type { Group } from 'three'
import './prototype.css'

const openingAngle = MathUtils.degToRad(150)

function Book({ open, reducedMotion }: { open: boolean; reducedMotion: boolean }) {
  const hinge = useRef<Group>(null)
  const invalidate = useThree((state) => state.invalidate)
  const targetAngle = open ? openingAngle : 0

  useEffect(() => {
    invalidate()
  }, [invalidate, reducedMotion, targetAngle])

  useFrame(({ invalidate }, delta) => {
    if (!hinge.current) return
    const current = hinge.current.rotation.z
    const next = MathUtils.damp(current, targetAngle, 5.5, Math.min(delta, .05))
    const settled = reducedMotion || Math.abs(next - targetAngle) < .002

    hinge.current.rotation.z = settled ? targetAngle : next
    if (!settled) invalidate()
  })

  return (
    <group>
      <mesh castShadow receiveShadow position={[0, .07, 0]}>
        <boxGeometry args={[2.1, .14, 2.65]} />
        <meshStandardMaterial color="#291632" roughness={.82} />
      </mesh>
      <mesh castShadow receiveShadow position={[.05, .27, 0]}>
        <boxGeometry args={[1.94, .26, 2.47]} />
        <meshStandardMaterial color="#dfc797" roughness={.93} />
      </mesh>
      {Array.from({ length: 5 }, (_, index) => (
        <mesh key={index} position={[1.021, .16 + index * .05, 0]}>
          <boxGeometry args={[.004, .008, 2.46]} />
          <meshStandardMaterial color="#a38158" roughness={1} />
        </mesh>
      ))}
      <mesh castShadow position={[-1.05, .24, 0]}>
        <boxGeometry args={[.17, .48, 2.65]} />
        <meshStandardMaterial color="#3b2449" roughness={.75} />
      </mesh>

      {/* Everything inside this group rotates around the left edge of the book. */}
      <group ref={hinge} position={[-1.05, .405, 0]}>
        <mesh castShadow receiveShadow position={[1.05, .075, 0]}>
          <boxGeometry args={[2.1, .15, 2.65]} />
          <meshStandardMaterial color="#352043" roughness={.78} />
        </mesh>
        <mesh position={[1.08, .155, 0]} rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[.56, .02, .56]} />
          <meshStandardMaterial color="#b98c48" metalness={.48} roughness={.3} />
        </mesh>
      </group>
    </group>
  )
}

export function GrimoirePrototype() {
  const [open, setOpen] = useState(false)
  const reducedMotion = useReducedMotion()

  return (
    <main className="prototype">
      <h1>Protótipo 3D do grimório</h1>
      <div className="prototype-scene">
        <Canvas
          aria-label="Livro tridimensional sobre uma mesa"
          camera={{ position: [3.8, 3.6, 5], fov: 46 }}
          dpr={[1, 1.5]}
          shadows
          frameloop="demand"
          fallback={<p>O WebGL está indisponível neste navegador.</p>}
        >
          <color attach="background" args={['#160f20']} />
          <ambientLight intensity={.75} />
          <directionalLight
            castShadow
            position={[3, 6, 4]}
            color="#ffe1aa"
            intensity={2.1}
            shadow-mapSize={[1024, 1024]}
            shadow-normalBias={.02}
          />
          <pointLight position={[-3, 2, -2]} color="#b96cff" intensity={18} />
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -.01, 0]}>
            <planeGeometry args={[30, 30]} />
            <meshStandardMaterial color="#321e2b" roughness={1} />
          </mesh>
          <Book open={open} reducedMotion={Boolean(reducedMotion)} />
        </Canvas>
      </div>
      <button type="button" onClick={() => setOpen((current) => !current)}>
        {open ? 'Fechar capa' : 'Abrir capa'}
      </button>
    </main>
  )
}
