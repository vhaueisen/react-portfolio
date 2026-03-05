import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

function FloatingShape({
    position,
    rotation,
    geometry,
    color,
    speed,
}: {
    position: [number, number, number]
    rotation: [number, number, number]
    geometry: 'icosahedron' | 'octahedron' | 'torus' | 'tetrahedron'
    color: string
    speed: number
}) {
    const meshRef = useRef<THREE.Mesh>(null!)
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

function NebulaDust() {
    const count = 80
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 60
            pos[i * 3 + 1] = (Math.random() - 0.5) * 40
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5
        }
        return pos
    }, [])

    const groupRef = useRef<THREE.Points>(null!)
    useFrame((_, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.02
        }
    })

    return (
        <points ref={groupRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#6366f1"
                size={0.08}
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    )
}

function Scene() {
    return (
        <>
            <ambientLight intensity={0.1} />
            <pointLight position={[10, 10, 10]} intensity={0.5} color="#6366f1" />
            <pointLight position={[-10, -5, -5]} intensity={0.3} color="#22d3ee" />

            <Stars
                radius={100}
                depth={60}
                count={4000}
                factor={3}
                saturation={0.2}
                speed={0.5}
                fade
            />

            <NebulaDust />

            <FloatingShape
                position={[-8, 3, -8]}
                rotation={[0.5, 0.3, 0]}
                geometry="icosahedron"
                color="#6366f1"
                speed={0.4}
            />
            <FloatingShape
                position={[9, -2, -10]}
                rotation={[0.2, 0.8, 0.3]}
                geometry="octahedron"
                color="#22d3ee"
                speed={0.3}
            />
            <FloatingShape
                position={[-5, -5, -6]}
                rotation={[1, 0.2, 0.5]}
                geometry="torus"
                color="#a855f7"
                speed={0.5}
            />
            <FloatingShape
                position={[6, 5, -9]}
                rotation={[0.8, 0.5, 0.2]}
                geometry="tetrahedron"
                color="#22d3ee"
                speed={0.35}
            />
            <FloatingShape
                position={[0, -7, -12]}
                rotation={[0.3, 1.2, 0.4]}
                geometry="icosahedron"
                color="#a855f7"
                speed={0.25}
            />

            <EffectComposer>
                <Bloom
                    intensity={0.6}
                    luminanceThreshold={0.1}
                    luminanceSmoothing={0.9}
                    mipmapBlur
                />
            </EffectComposer>
        </>
    )
}

export default function SpaceBackground() {
    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none',
            }}
        >
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                gl={{ antialias: true, alpha: false }}
                style={{ background: '#07070f' }}
            >
                <Scene />
            </Canvas>
        </div>
    )
}
