import { useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import type * as THREE from 'three'

type GeometryType = 'icosahedron' | 'octahedron' | 'torus' | 'tetrahedron'

interface FloatingShapeProps {
  position: [number, number, number]
  rotation: [number, number, number]
  geometry: GeometryType
  color: string
  speed: number
}

/**
 * A self-rotating wireframe shape used in the background scene.
 * Accepts `geometry` as a discriminated string so callers don't import
 * individual Three.js geometry types.
 */
export function FloatingShape({ position, rotation, geometry, color, speed }: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  // Memoize the initial rotation so it isn't recalculated on every render
  const initialRotation = useMemo(() => rotation, [rotation])

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * speed * 0.3
      meshRef.current.rotation.y += delta * speed * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={position} rotation={initialRotation}>
      {geometry === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
      {geometry === 'octahedron' && <octahedronGeometry args={[1]} />}
      {geometry === 'torus' && <torusGeometry args={[1, 0.3, 8, 16]} />}
      {geometry === 'tetrahedron' && <tetrahedronGeometry args={[1]} />}
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.25}
        emissive={color}
        emissiveIntensity={0.4}
      />
    </mesh>
  )
}
