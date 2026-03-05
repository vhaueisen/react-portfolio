import { useFrame } from '@react-three/fiber'
import { useRef, useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { COLORS } from '../../constants/colors'

const PARTICLE_COUNT = 80

/**
 * A slowly-rotating point cloud that simulates nebula dust.
 * Count and spread are fixed to match the original design; adjust
 * `PARTICLE_COUNT` above if you want more/fewer particles.
 */
export function NebulaDust() {
  // Build the full geometry (positions + BufferAttribute) once — never reallocated
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [])

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: COLORS.indigo,
        size: 0.08,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true,
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

  const groupRef = useRef<THREE.Points | null>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.02
  })

  return <points ref={groupRef} geometry={geometry} material={material} />
}
