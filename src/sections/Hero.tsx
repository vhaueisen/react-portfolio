import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { motion } from 'framer-motion'
import { FiArrowDown, FiGithub, FiLinkedin } from 'react-icons/fi'
import { AstronautModel, ModelFallback } from '../components/three'
import { SocialIconLink, AnimatedEntrance } from '../components/ui'
import { COLORS } from '../constants/colors'
import { gradientTextShort } from '../styles'

const NAME_CHARS = 'VITOR RUAS'.split('')

const containerVariants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.04, delayChildren: 0.4 } },
}

const charVariants = {
    hidden:  { opacity: 0, y: 60, rotateX: -90 },
    visible: {
        opacity: 1, y: 0, rotateX: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
}

export default function Hero() {
    return (
        <section
            id="hero"
            style={{
                minHeight:  '100vh',
                display:    'flex',
                alignItems: 'center',
                padding:    '0 24px',
                paddingTop: '80px',
                maxWidth:   '1280px',
                margin:     '0 auto',
                gap:        '48px',
                position:   'relative',
            }}
        >
            {/* Left: text content */}
            <div style={{ flex: '0 0 55%', zIndex: 10 }}>

                {/* Status badge */}
                <AnimatedEntrance delay={0.2} yOffset={0}>
                    <div style={{
                        display:      'inline-flex',
                        alignItems:   'center',
                        gap:          '8px',
                        padding:      '6px 14px',
                        background:   'rgba(99, 102, 241, 0.12)',
                        border:       '1px solid rgba(99, 102, 241, 0.3)',
                        borderRadius: '100px',
                        fontSize:     '0.8rem',
                        color:        COLORS.cyan,
                        fontWeight:   500,
                        marginBottom: '24px',
                    }}>
                        <span style={{
                            width:        '6px',
                            height:       '6px',
                            borderRadius: '50%',
                            background:   COLORS.cyan,
                            animation:    'pulse 2s infinite',
                        }} />
                        Available for US Remote Roles
                    </div>
                </AnimatedEntrance>

                {/* Animated name — per-character flip-in */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{
                        display:      'flex',
                        flexWrap:     'wrap',
                        fontSize:     'clamp(3rem, 8vw, 7rem)',
                        fontWeight:   900,
                        lineHeight:   1,
                        letterSpacing: '-0.02em',
                        marginBottom: '24px',
                        perspective:  '600px',
                        fontFamily:   "'Space Grotesk', sans-serif",
                    }}
                >
                    {NAME_CHARS.map((char, i) => (
                        <motion.span
                            key={i}
                            variants={charVariants}
                            style={{
                                display:   'inline-block',
                                ...gradientTextShort,
                                whiteSpace: char === ' ' ? 'pre' : 'normal',
                                minWidth:   char === ' ' ? '0.35em' : undefined,
                            }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </motion.div>

                {/* Subtitle lines */}
                <AnimatedEntrance delay={0.9}>
                    <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: '#94a3b8', lineHeight: 1.6, marginBottom: '16px', maxWidth: '520px' }}>
                        Senior Mobile Engineer · React Native · Interactive 3D
                    </p>
                </AnimatedEntrance>

                <AnimatedEntrance delay={1.0}>
                    <p style={{ fontSize: '0.95rem', color: COLORS.textMuted, lineHeight: 1.6, marginBottom: '40px', maxWidth: '480px' }}>
                        7+ years architecting mobile experiences. Former game dev with a
                        passion for performance, real-time systems, and polished interactive UIs.
                    </p>
                </AnimatedEntrance>

                {/* CTAs */}
                <AnimatedEntrance delay={1.1}>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '48px' }}>
                        <button
                            className="btn-primary"
                            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            View Projects <FiArrowDown size={16} />
                        </button>
                        <a href="mailto:vitorhaueisen@gmail.com" className="btn-secondary">
                            Get in Touch
                        </a>
                    </div>
                </AnimatedEntrance>

                {/* Social links */}
                <AnimatedEntrance delay={1.3} yOffset={0}>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <SocialIconLink
                            href="https://github.com/vhaueisen"
                            icon={<FiGithub size={22} />}
                            label="GitHub"
                            hoverColor={COLORS.textPrimary}
                        />
                        <SocialIconLink
                            href="https://linkedin.com/in/vitor-ruas"
                            icon={<FiLinkedin size={22} />}
                            label="LinkedIn"
                            hoverColor={COLORS.indigo}
                        />
                    </div>
                </AnimatedEntrance>
            </div>

            {/* Right: 3D Astronaut canvas */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                className="hero-canvas-wrapper"
                style={{
                    display:       'none',
                    position:      'absolute',
                    right:         '-40px',
                    top:           '9em',
                    transform:     'translateY(-50%)',
                    width:         '620px',
                    height:        '620px',
                    pointerEvents: 'none',
                }}
            >
                <Canvas camera={{ position: [0, 0, 5], fov: 55 }} shadows>
                    <ambientLight intensity={0.2} />
                    <directionalLight position={[5, 8, 5]} intensity={0.5} castShadow />
                    <pointLight position={[-2, 2, 3]}  color="#a855f7" intensity={8} />
                    <pointLight position={[3, -2, -2]} color="#22d3ee" intensity={3} />
                    <pointLight position={[0, 5, 2]}   color="#c084fc" intensity={4} />
                    <Environment preset="city" />
                    <Suspense fallback={<ModelFallback />}>
                        <AstronautModel />
                    </Suspense>
                    <EffectComposer>
                        <Bloom intensity={0.5} luminanceThreshold={0.3} luminanceSmoothing={0.9} mipmapBlur />
                    </EffectComposer>
                </Canvas>
            </motion.div>

            <style>{`
                @media (min-width: 900px) {
                    .hero-canvas-wrapper { display: block !important; }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50%       { opacity: 0.4; }
                }
            `}</style>
        </section>
    )
}
