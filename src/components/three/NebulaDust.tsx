import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 80

/**
 * A slowly-rotating point cloud that simulates nebula dust.
 * Count and spread are fixed to match the original design; adjust
 * `PARTICLE_COUNT` above if you want more/fewer particles.
 */
export function NebulaDust() {
    const positions = useMemo(() => {
        const pos = new Float32Array(PARTICLE_COUNT * 3)
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            pos[i * 3]     = (Math.random() - 0.5) * 60
            pos[i * 3 + 1] = (Math.random() - 0.5) * 40
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5
        }
        return pos
    }, [])

    const groupRef = useRef<THREE.Points>(null!)

    useFrame((_, delta) => {
        if (groupRef.current) groupRef.current.rotation.y += delta * 0.02
    })

    return (
        <points ref={groupRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial color="#6366f1" size={0.08} transparent opacity={0.6} sizeAttenuation />
        </points>
    )
}
