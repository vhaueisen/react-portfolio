import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

/**
 * The animated wireframe icosahedron used in the Contact section.
 * Rotates on both axes inside a `<Float>` bobbing envelope.
 */
export function WireframeSphere() {
    const meshRef = useRef<THREE.Mesh>(null!)

    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2
            meshRef.current.rotation.y += delta * 0.3
        }
    })

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
            <mesh ref={meshRef}>
                <icosahedronGeometry args={[1.5, 1]} />
                <meshStandardMaterial
                    color="#6366f1"
                    wireframe
                    emissive="#6366f1"
                    emissiveIntensity={0.5}
                    transparent
                    opacity={0.4}
                />
            </mesh>
        </Float>
    )
}
