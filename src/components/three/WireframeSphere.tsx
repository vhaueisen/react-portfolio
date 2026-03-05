import { Float } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { COLORS } from '../../constants/colors'

/**
 * The animated wireframe icosahedron used in the Contact section.
 * Rotates on both axes inside a `<Float>` bobbing envelope.
 */
export function WireframeSphere() {
  const meshRef = useRef<THREE.Mesh | null>(null)

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.5, 1), [])
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: COLORS.indigo,
        wireframe: true,
        emissive: new THREE.Color(COLORS.indigo),
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.4,
      }),
    []
  )

  useEffect(
    () => () => {
      geometry.dispose()
      material.dispose()
    },
    [geometry, material]
  )

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2
      meshRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} geometry={geometry} material={material} />
    </Float>
  )
}
