import { Float, useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type * as THREE from 'three'

const ASTRONAUT_URL = 'https://modelviewer.dev/shared-assets/models/Astronaut.glb'

// Preload at module level so the asset request starts before the component mounts
useGLTF.preload(ASTRONAUT_URL)

/**
 * Loads the Astronaut GLB, plays its first idle animation, and applies
 * a slow Y-axis rotation. Wrapped in a `<Float>` for a gentle hover effect.
 */
export function AstronautModel() {
  const groupRef = useRef<THREE.Group>(null!)
  const { scene, animations } = useGLTF(ASTRONAUT_URL)
  const { actions } = useAnimations(animations, groupRef)

  // Play the first clip if it exists and isn't already running
  const firstClip = animations[0]?.name
  if (firstClip && actions[firstClip] && !actions[firstClip].isRunning()) {
    actions[firstClip].play()
  }

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.25
  })

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <group rotation={[-0.25, 0, -0.3]}>
        <group ref={groupRef} scale={2.2} position={[0, -2, 0]}>
          <primitive object={scene} />
        </group>
      </group>
    </Float>
  )
}

/**
 * Shown inside `<Suspense fallback={…}>` while the GLB is loading.
 * A simple rotating wireframe octahedron keeps the canvas active.
 */
export function ModelFallback() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.6
  })

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#6366f1" wireframe />
    </mesh>
  )
}
