import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { CanvasTexture, MathUtils, RepeatWrapping, Shape } from 'three'
import type { Group } from 'three'
import { BookLeaf } from './BookLeaf'
import { pageTitles } from './bookNavigation'
import type { BookState } from './bookNavigation'
import { createPageTexture } from './pageTexture'

const flatRotation = [-Math.PI / 2, 0, 0] as const
const pageGap = .004
const rightHeight = .386
const leftHeight = .439
const cornerSigns = [-1, 1]

function roundedRectangle(width: number, height: number, radius: number) {
  const x = width / 2
  const y = height / 2
  const shape = new Shape()
  shape.moveTo(-x + radius, -y)
  shape.lineTo(x - radius, -y)
  shape.quadraticCurveTo(x, -y, x, -y + radius)
  shape.lineTo(x, y - radius)
  shape.quadraticCurveTo(x, y, x - radius, y)
  shape.lineTo(-x + radius, y)
  shape.quadraticCurveTo(-x, y, -x, y - radius)
  shape.lineTo(-x, -y + radius)
  shape.quadraticCurveTo(-x, -y, -x + radius, -y)
  shape.closePath()
  return shape
}

const coverShape = roundedRectangle(2.02, 2.64, .14)
const spineShape = roundedRectangle(.2, 2.64, .08)
const pageShape = roundedRectangle(1.89, 2.48, .08)
const coverDepth = { depth: .09, bevelEnabled: true, bevelThickness: .025, bevelSize: .025, bevelSegments: 2, curveSegments: 5 }
const spineDepth = { ...coverDepth, depth: .32 }
const pageDepth = { depth: .21, bevelEnabled: false, curveSegments: 4 }
const moon = new Shape()
moon.moveTo(.135, .21)
moon.bezierCurveTo(-.14, .32, -.27, .01, -.12, -.16)
moon.bezierCurveTo(-.04, -.26, .08, -.25, .15, -.19)
moon.bezierCurveTo(-.045, -.19, -.075, .1, .135, .21)
moon.closePath()

function surfaceTexture(grain: number) {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const context = canvas.getContext('2d')
  if (context) {
    const pixels = context.createImageData(canvas.width, canvas.height)
    for (let y = 0; y < canvas.height; y += 1) {
      for (let x = 0; x < canvas.width; x += 1) {
        const index = (y * canvas.width + x) * 4
        const mottling = Math.sin(x * .051) * Math.cos(y * .067) * 15
        const value = 211 + mottling + (Math.random() - .5) * grain
        pixels.data[index] = value
        pixels.data[index + 1] = value
        pixels.data[index + 2] = value
        pixels.data[index + 3] = 255
      }
    }
    context.putImageData(pixels, 0, 0)
  }
  const texture = new CanvasTexture(canvas)
  texture.wrapS = RepeatWrapping
  texture.wrapT = RepeatWrapping
  return texture
}

function FloatingBookOrnaments() {
  return (
    <group>
      {cornerSigns.map((side) => (
        <group key={side}>
          <mesh position={[side * .89, .143, 0]}>
            <boxGeometry args={[.018, .014, 2.2]} />
            <meshStandardMaterial color="#bf8a42" metalness={.58} roughness={.32} />
          </mesh>
          <mesh position={[0, .143, side * 1.11]}>
            <boxGeometry args={[1.8, .014, .018]} />
            <meshStandardMaterial color="#bf8a42" metalness={.58} roughness={.32} />
          </mesh>
          {cornerSigns.map((end) => (
            <mesh key={end} position={[side * .89, .151, end * 1.11]} rotation={[0, Math.PI / 4, 0]}>
              <boxGeometry args={[.095, .022, .095]} />
              <meshStandardMaterial color="#efbe6f" metalness={.52} roughness={.29} />
            </mesh>
          ))}
        </group>
      ))}
      <mesh position={[0, .148, 0]} rotation={flatRotation}>
        <torusGeometry args={[.445, .012, 6, 40]} />
        <meshStandardMaterial color="#d2a45f" metalness={.6} roughness={.34} />
      </mesh>
      <mesh position={[0, .161, 0]} rotation={flatRotation}>
        <shapeGeometry args={[moon, 16]} />
        <meshStandardMaterial color="#ffd389" metalness={.46} roughness={.38} />
      </mesh>
      <mesh position={[.14, .165, -.035]} rotation={flatRotation}>
        <ringGeometry args={[.061, .078, 4, 1, Math.PI / 2]} />
        <meshStandardMaterial color="#ffc779" metalness={.5} roughness={.37} />
      </mesh>
      {cornerSigns.map((side) => (
        <mesh key={side} position={[0, .168, side * .61]} scale={[.8, .55, 1.45]}>
          <octahedronGeometry args={[.094, 0]} />
          <meshStandardMaterial color="#a750ff" emissive="#8c24ff" emissiveIntensity={.75} roughness={.3} />
        </mesh>
      ))}
    </group>
  )
}

export function FloatingBook({ state, floating, reducedMotion, onOpen, onSettled }: {
  state: BookState
  floating: boolean
  reducedMotion: boolean
  onOpen: () => void
  onSettled: () => void
}) {
  const book = useRef<Group>(null)
  const hinge = useRef<Group>(null)
  const leaf = useRef<Group>(null)
  const elapsed = useRef(0)
  const turnTime = useRef(0)
  const completed = useRef(false)
  const invalidate = useThree((state) => state.invalidate)
  const targetAngle = state.phase === 'closed' || state.phase === 'closing' ? 0 : Math.PI
  const turn = state.phase === 'turning' ? state : null
  const backward = turn?.direction === -1
  const movingPage = backward ? state.page - 1 : state.page
  const restRight = turn && !backward ? state.page + 1 : state.page
  const leftCount = backward ? state.page - 1 : state.page
  const leafRightY = rightHeight - movingPage * pageGap
  const leafLeftY = leftHeight + movingPage * pageGap
  const leather = useMemo(() => surfaceTexture(75), [])
  const parchment = useMemo(() => surfaceTexture(24), [])
  const faces = useMemo(() => pageTitles.map((title, index) => createPageTexture(title, index + 1)), [])
  const blank = useMemo(() => createPageTexture(), [])

  useEffect(() => () => {
    leather.dispose()
    parchment.dispose()
    faces.forEach((face) => face.dispose())
    blank.dispose()
  }, [leather, parchment, faces, blank])

  useLayoutEffect(() => {
    turnTime.current = 0
    completed.current = false
    invalidate()
  }, [state, invalidate])

  useEffect(() => {
    invalidate()
  }, [floating, invalidate, reducedMotion, targetAngle])

  useFrame((_, delta) => {
    if (!book.current || !hinge.current) return
    const step = Math.min(delta, .05)
    if (floating) elapsed.current += step

    const wave = Math.sin(elapsed.current * 1.55)
    const reading = state.phase !== 'closed' && state.phase !== 'closing'
    const amplitude = reading ? .027 : .085
    const tilt = reading ? .008 : .025
    const targetY = .24 + wave * amplitude
    book.current.position.y = reducedMotion ? .24 : MathUtils.damp(book.current.position.y, targetY, 8, step)
    book.current.rotation.x = reducedMotion ? 0 : MathUtils.damp(book.current.rotation.x, wave * tilt, 8, step)

    const next = MathUtils.damp(hinge.current.rotation.z, targetAngle, 5.5, step)
    const settled = reducedMotion || Math.abs(next - targetAngle) < .002
    hinge.current.rotation.z = settled ? targetAngle : next

    let finished = settled
    if (turn && leaf.current) {
      const duration = turn.returning ? .38 : .85
      turnTime.current += step
      const progress = reducedMotion ? 1 : Math.min(1, turnTime.current / duration)
      const eased = progress * progress * (3 - 2 * progress)
      const angleProgress = backward ? 1 - eased : eased
      leaf.current.rotation.z = Math.PI * angleProgress
      leaf.current.position.y = MathUtils.lerp(leafRightY, leafLeftY, angleProgress)
      finished = progress === 1
    }
    const changing = state.phase === 'opening' || state.phase === 'closing' || turn !== null
    if (changing && finished && !completed.current) {
      completed.current = true
      onSettled()
    }
    if (floating || (changing && !finished)) invalidate()
  })

  return (
    <group ref={book} position={[0, .24, 0]}>
      <mesh castShadow receiveShadow position={[0, .026, 0]} rotation={flatRotation}>
        <extrudeGeometry args={[coverShape, coverDepth]} />
        <meshStandardMaterial color="#2c1539" roughness={.86} bumpMap={leather} bumpScale={.042} />
      </mesh>
      <mesh castShadow receiveShadow position={[-1, .05, 0]} rotation={flatRotation}>
        <extrudeGeometry args={[spineShape, spineDepth]} />
        <meshStandardMaterial color="#3b204b" roughness={.84} bumpMap={leather} bumpScale={.04} />
      </mesh>
      <mesh castShadow receiveShadow position={[.05, .142, 0]} rotation={flatRotation}>
        <extrudeGeometry args={[pageShape, pageDepth]} />
        <meshStandardMaterial color="#ebd1a0" map={parchment} roughness={.95} />
      </mesh>
      {Array.from({ length: 9 }, (_, index) => (
        <group key={index} position={[0, .153 + index * .025, 0]}>
          <mesh position={[.996, 0, 0]}>
            <boxGeometry args={[.004, .003, 2.32]} />
            <meshStandardMaterial color="#a88457" roughness={1} />
          </mesh>
          <mesh position={[.05, 0, 1.241]}>
            <boxGeometry args={[1.73, .004, .004]} />
            <meshStandardMaterial color="#a88457" roughness={1} />
          </mesh>
        </group>
      ))}
      <group ref={hinge} position={[-1.02, .405, 0]}>
        <group position={[1.02, 0, 0]}>
          <mesh castShadow receiveShadow position={[0, .026, 0]} rotation={flatRotation}
            onClick={state.phase === 'closed' ? onOpen : undefined}>
            <extrudeGeometry args={[coverShape, coverDepth]} />
            <meshStandardMaterial color="#351a46" roughness={.78} bumpMap={leather} bumpScale={.048} />
          </mesh>
          <mesh position={[0, -.009, 0]} rotation={flatRotation}>
            <boxGeometry args={[1.91, 2.53, .018]} />
            <meshStandardMaterial color="#51305e" roughness={.93} bumpMap={leather} bumpScale={.013} />
          </mesh>
          <FloatingBookOrnaments />
        </group>
      </group>
      <group position={[-.91, rightHeight - restRight * pageGap, 0]}>
        <BookLeaf front={state.phase === 'open' || turn ? faces[restRight] : blank} back={blank} />
      </group>
      {leftCount > 0 && (
        <group position={[-.91, leftHeight + (leftCount - 1) * pageGap, 0]} rotation={[0, 0, Math.PI]}>
          <BookLeaf front={blank} back={blank} />
        </group>
      )}
      {turn && (
        <group key={movingPage} ref={leaf} position={[-.91, backward ? leafLeftY : leafRightY, 0]}
          rotation={[0, 0, backward ? Math.PI : 0]}>
          <BookLeaf front={faces[movingPage]} back={blank} />
        </group>
      )}
    </group>
  )
}
