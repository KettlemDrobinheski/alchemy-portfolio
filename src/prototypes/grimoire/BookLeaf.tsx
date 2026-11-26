import type { CanvasTexture } from 'three'
import { LEAF_WIDTH, LEAF_LENGTH } from './pageTexture'

export function BookLeaf({ front, back }: { front: CanvasTexture; back: CanvasTexture }) {
  return (
    <>
      <mesh position={[LEAF_WIDTH / 2, .001, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[LEAF_WIDTH, LEAF_LENGTH]} />
        <meshStandardMaterial map={front} roughness={.94} />
      </mesh>
      <mesh position={[LEAF_WIDTH / 2, -.001, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[LEAF_WIDTH, LEAF_LENGTH]} />
        <meshStandardMaterial map={back} roughness={.94} />
      </mesh>
    </>
  )
}
