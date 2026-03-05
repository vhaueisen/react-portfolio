import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { FiArrowDown, FiGithub, FiLinkedin } from 'react-icons/fi'

function HeroOrb() {
    const meshRef = useRef<THREE.Mesh>(null!)
    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.4
            meshRef.current.rotation.x += delta * 0.15
        }
    })
    return (
        <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
            <mesh ref={meshRef} scale={1.4}>
                <torusKnotGeometry args={[1, 0.32, 128, 32]} />
                <MeshDistortMaterial
                    color="#6366f1"
                    emissive="#6366f1"
                    emissiveIntensity={0.6}
                    roughness={0.1}
                    metalness={0.8}
                    distort={0.3}
                    speed={2}
                />
            </mesh>
        </Float>
    )
}

function HeroRing() {
    const ringRef = useRef<THREE.Mesh>(null!)
    useFrame((_, delta) => {
        if (ringRef.current) {
            ringRef.current.rotation.z += delta * 0.3
        }
    })
    return (
        <mesh ref={ringRef} position={[0, 0, -0.5]}>
            <torusGeometry args={[2.2, 0.04, 8, 80]} />
            <meshStandardMaterial
                color="#22d3ee"
                emissive="#22d3ee"
                emissiveIntensity={1}
                transparent
                opacity={0.5}
            />
        </mesh>
    )
}

const NAME_CHARS = 'VÍTOR RUAS'.split('')

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.04, delayChildren: 0.4 },
    },
}

const charVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -90 },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
}

export default function Hero() {
    return (
        <section
            id="hero"
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                padding: '0 24px',
                paddingTop: '80px',
                maxWidth: '1280px',
                margin: '0 auto',
                gap: '48px',
            }}
        >
            {/* Left: text content */}
            <div style={{ flex: 1, zIndex: 10 }}>
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 14px',
                        background: 'rgba(99, 102, 241, 0.12)',
                        border: '1px solid rgba(99, 102, 241, 0.3)',
                        borderRadius: '100px',
                        fontSize: '0.8rem',
                        color: '#22d3ee',
                        fontWeight: 500,
                        marginBottom: '24px',
                    }}
                >
                    <span
                        style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: '#22d3ee',
                            animation: 'pulse 2s infinite',
                        }}
                    />
                    Available for US Remote Roles
                </motion.div>

                {/* Animated name */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        fontSize: 'clamp(3rem, 8vw, 7rem)',
                        fontWeight: 900,
                        lineHeight: 1,
                        letterSpacing: '-0.04em',
                        marginBottom: '24px',
                        perspective: '600px',
                    }}
                >
                    {NAME_CHARS.map((char, i) => (
                        <motion.span
                            key={i}
                            variants={charVariants}
                            style={{
                                display: 'inline-block',
                                background:
                                    'linear-gradient(135deg, #f1f5f9 30%, #6366f1 80%, #22d3ee 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                whiteSpace: char === ' ' ? 'pre' : 'normal',
                                minWidth: char === ' ' ? '0.35em' : undefined,
                            }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    style={{
                        fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                        color: '#94a3b8',
                        lineHeight: 1.6,
                        marginBottom: '16px',
                        maxWidth: '520px',
                    }}
                >
                    Senior Mobile Engineer · React Native · Interactive 3D
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    style={{
                        fontSize: '0.95rem',
                        color: '#64748b',
                        lineHeight: 1.6,
                        marginBottom: '40px',
                        maxWidth: '480px',
                    }}
                >
                    7+ years architecting mobile experiences. Former game dev with a
                    passion for performance, real-time systems, and polished interactive UIs.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                    style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '48px' }}
                >
                    <button
                        className="btn-primary"
                        onClick={() =>
                            document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                        }
                    >
                        View Projects <FiArrowDown size={16} />
                    </button>
                    <a
                        href="mailto:vitorhaueisen@gmail.com"
                        className="btn-secondary"
                    >
                        Get in Touch
                    </a>
                </motion.div>

                {/* Social */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.3 }}
                    style={{ display: 'flex', gap: '20px', alignItems: 'center' }}
                >
                    <a
                        href="https://github.com/vhaueisen"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: '#64748b',
                            transition: 'color 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLAnchorElement).style.color = '#f1f5f9')
                        }
                        onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLAnchorElement).style.color = '#64748b')
                        }
                    >
                        <FiGithub size={22} />
                    </a>
                    <a
                        href="https://linkedin.com/in/vitor-ruas"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: '#64748b',
                            transition: 'color 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLAnchorElement).style.color = '#6366f1')
                        }
                        onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLAnchorElement).style.color = '#64748b')
                        }
                    >
                        <FiLinkedin size={22} />
                    </a>
                    <span style={{ color: '#1e293b', fontSize: '0.75rem', marginLeft: '4px' }}>
                    </span>
                </motion.div>
            </div>

            {/* Right: 3D canvas */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                style={{
                    flex: '0 0 420px',
                    height: '420px',
                    display: 'none',
                    position: 'relative',
                }}
                className="hero-canvas-wrapper"
            >
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <ambientLight intensity={0.3} />
                    <pointLight position={[5, 5, 5]} color="#6366f1" intensity={2} />
                    <pointLight position={[-5, -5, 3]} color="#22d3ee" intensity={1.5} />
                    <HeroOrb />
                    <HeroRing />
                    <EffectComposer>
                        <Bloom intensity={1.2} luminanceThreshold={0.05} luminanceSmoothing={0.9} mipmapBlur />
                    </EffectComposer>
                </Canvas>
            </motion.div>

            <style>{`
        @media (min-width: 900px) {
          .hero-canvas-wrapper { display: block !important; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
        </section>
    )
}
