import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { motion, useInView } from 'framer-motion'
import * as THREE from 'three'
import { FiMail, FiLinkedin, FiGithub, FiArrowRight } from 'react-icons/fi'

function WireframeSphere() {
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

const LINKS = [
    {
        icon: <FiMail size={20} />,
        label: 'Email',
        value: 'vitorhaueisen@gmail.com',
        href: 'mailto:vitorhaueisen@gmail.com',
        color: '#6366f1',
    },
    {
        icon: <FiLinkedin size={20} />,
        label: 'LinkedIn',
        value: 'in/vitor-ruas',
        href: 'https://linkedin.com/in/vitor-ruas',
        color: '#22d3ee',
    },
    {
        icon: <FiGithub size={20} />,
        label: 'GitHub',
        value: 'vhaueisen',
        href: 'https://github.com/vhaueisen',
        color: '#a855f7',
    },
]

export default function Contact() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const inView = useInView(sectionRef, { once: true, margin: '-80px' })

    return (
        <section
            id="contact"
            style={{ padding: '100px 24px 140px', maxWidth: '1280px', margin: '0 auto' }}
        >
            <div
                ref={sectionRef}
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '64px',
                    alignItems: 'center',
                }}
            >
                {/* Left: Text + links */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        style={{
                            fontSize: '0.8rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.15em',
                            color: '#6366f1',
                            fontWeight: 600,
                            marginBottom: '12px',
                        }}
                    >
                        Contact
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        style={{
                            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.03em',
                            lineHeight: 1.15,
                            marginBottom: '20px',
                            color: '#f1f5f9',
                        }}
                    >
                        Let's build something{' '}
                        <span
                            style={{
                                background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            great together
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        style={{
                            color: '#94a3b8',
                            lineHeight: 1.7,
                            fontSize: '0.95rem',
                            marginBottom: '40px',
                            maxWidth: '420px',
                        }}
                    >
                        I'm open to senior mobile engineering roles and remote positions with US-based
                        teams. Reach out — I'm quick to respond.
                    </motion.p>

                    {/* Contact links */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {LINKS.map((link, i) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, x: -20 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    padding: '16px 20px',
                                    background: 'rgba(13, 13, 31, 0.7)',
                                    backdropFilter: 'blur(12px)',
                                    border: '1px solid rgba(99, 102, 241, 0.12)',
                                    borderRadius: '12px',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s',
                                }}
                                whileHover={{
                                    borderColor: `${link.color}50`,
                                    x: 4,
                                    boxShadow: `0 4px 20px ${link.color}15`,
                                }}
                            >
                                <span
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '10px',
                                        background: `${link.color}15`,
                                        border: `1px solid ${link.color}25`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: link.color,
                                        flexShrink: 0,
                                    }}
                                >
                                    {link.icon}
                                </span>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500, marginBottom: '2px' }}>
                                        {link.label}
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: '#f1f5f9', fontWeight: 500 }}>
                                        {link.value}
                                    </div>
                                </div>
                                <FiArrowRight
                                    size={16}
                                    style={{ marginLeft: 'auto', color: '#475569' }}
                                />
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Right: 3D canvas */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                    style={{ height: '360px', width: '100%' }}
                >
                    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                        <ambientLight intensity={0.2} />
                        <pointLight position={[4, 4, 4]} color="#6366f1" intensity={2} />
                        <pointLight position={[-4, -4, 2]} color="#22d3ee" intensity={1} />
                        <WireframeSphere />
                        <EffectComposer>
                            <Bloom intensity={0.8} luminanceThreshold={0.05} luminanceSmoothing={0.9} mipmapBlur />
                        </EffectComposer>
                    </Canvas>
                </motion.div>
            </div>

            {/* Footer note */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
                style={{
                    textAlign: 'center',
                    marginTop: '80px',
                    paddingTop: '40px',
                    borderTop: '1px solid rgba(99,102,241,0.1)',
                    color: '#334155',
                    fontSize: '0.8rem',
                }}
            >
                Built with React · Three.js · Framer Motion · 2026
            </motion.div>
        </section>
    )
}
