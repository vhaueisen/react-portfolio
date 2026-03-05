import { useFrame } from '@react-three/fiber'
import { useRef, useMemo, useEffect } from 'react'
import * as THREE from 'three'

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
  const meshRef = useRef<THREE.Mesh | null>(null)
  // `rotation` is always a static constant literal from SpaceBackground —
  // passing it directly as the mesh's initial orientation is safe.

  const geo = useMemo(() => {
    switch (geometry) {
      case 'icosahedron':
        return new THREE.IcosahedronGeometry(1, 0)
      case 'octahedron':
        return new THREE.OctahedronGeometry(1)
      case 'torus':
        return new THREE.TorusGeometry(1, 0.3, 8, 16)
      case 'tetrahedron':
        return new THREE.TetrahedronGeometry(1)
    }
  }, [geometry])

  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
        emissive: new THREE.Color(color),
        emissiveIntensity: 0.4,
      }),
    [color]
  )

  // Dispose Three.js objects when the component unmounts or deps change
  useEffect(
    () => () => {
      geo.dispose()
      mat.dispose()
    },
    [geo, mat]
  )

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * speed * 0.3
      meshRef.current.rotation.y += delta * speed * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} geometry={geo} material={mat} />
  )
}
