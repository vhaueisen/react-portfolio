import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { motion } from 'framer-motion'
import { Suspense } from 'react'
import { FiArrowDown, FiGithub, FiLinkedin } from 'react-icons/fi'
import { AstronautModel, ModelFallback } from '../components/three'
import { SocialIconLink, CanvasErrorBoundary } from '../components/ui'
import { COLORS } from '../constants/colors'
import { heroBadge, heroNameGradient, bodyText, flexRow, flexWrapRow } from '../styles'
import type { CSSProperties } from 'react'

const NAME_CHARS = 'VITOR HAUEISEN'.split('')

// ─── Module-scope style constants ─────────────────────────────────────────────────────

const heroSectionStyle: CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    padding: '0 24px',
    paddingTop: '80px',
    maxWidth: '1280px',
    margin: '0 auto',
    gap: '48px',
    position: 'relative',
}

const heroNameContainerStyle: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    fontSize: 'clamp(1.5rem, 9vw, 4.5rem)',
    fontWeight: 900,
    lineHeight: 1,
    letterSpacing: '-0.04em',
    marginBottom: '24px',
    perspective: '600px',
}

const heroPulseDotStyle: CSSProperties = {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: COLORS.cyan,
    animation: 'pulse 2s infinite',
}

const heroCanvasStyle: CSSProperties = {
    position: 'absolute',
    right: 40,
    top: 40,
    width: 'calc(50% - 40px)',
    height: 'calc(100% - 80px)',
    display: 'none',
    zIndex: 1,
    pointerEvents: 'none',
}

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
        <section id="hero" style={heroSectionStyle}>
            {/* Left: text content */}
            <div style={{ flex: 1, zIndex: 2, position: 'relative' }}>
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={heroBadge}
                >
                    <span style={heroPulseDotStyle} />
                    Available for US Remote Roles
                </motion.div>

                {/* Animated name */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={heroNameContainerStyle}
                >
                    {NAME_CHARS.map((char, i) => (
                        <motion.span
                            key={i}
                            variants={charVariants}
                            style={{
                                ...heroNameGradient,
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
                        ...bodyText,
                        fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
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
                    style={{ ...bodyText, marginBottom: '40px', maxWidth: '480px' }}
                >
                    7+ years architecting mobile experiences. Former game dev with a passion for performance,
                    real-time systems, and polished interactive UIs.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                    style={{ ...flexWrapRow('16px'), marginBottom: '48px' }}
                >
                    <button
                        className="btn-primary"
                        onClick={() =>
                            document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                        }
                    >
                        View Projects <FiArrowDown size={16} />
                    </button>
                    <a href="mailto:vitorhaueisen@gmail.com" className="btn-secondary">
                        Get in Touch
                    </a>
                </motion.div>

                {/* Social */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.3 }}
                    style={flexRow('20px')}
                >
                    <SocialIconLink
                        href="https://github.com/vhaueisen"
                        label="GitHub profile"
                        icon={<FiGithub size={22} />}
                        hoverColor={COLORS.textPrimary}
                    />
                    <SocialIconLink
                        href="https://linkedin.com/in/vitor-ruas"
                        label="LinkedIn profile"
                        icon={<FiLinkedin size={22} />}
                        hoverColor={COLORS.indigo}
                    />
                </motion.div>
            </div>

            {/* Right: 3D canvas — absolutely fills the right half, sits behind text */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                style={heroCanvasStyle}
                className="hero-canvas-wrapper"
            >
                <CanvasErrorBoundary>
                    <Canvas camera={{ position: [0, 0, 5], fov: 55 }} shadows>
                        {/* Dark ambient — low intensity keeps the scene moody */}
                        <ambientLight color={COLORS.slate300} intensity={0.5} />
                        {/* Hemisphere: deep violet sky / near-black ground */}
                        <hemisphereLight args={[COLORS.violetSky, COLORS.surface, 0.6]} />
                        {/* Key light: soft violet from upper-left */}
                        <directionalLight
                            position={[-4, 6, 4]}
                            color={COLORS.violet}
                            intensity={2.0}
                            castShadow
                        />
                        {/* Indigo rim from the left */}
                        <pointLight position={[-4, 2, 4]} color={COLORS.indigo} intensity={5} />
                        {/* Cyan accent from lower-right for contrast */}
                        <pointLight position={[4, -3, 2]} color={COLORS.cyan} intensity={1.5} />
                        <Suspense fallback={<ModelFallback />}>
                            <AstronautModel />
                        </Suspense>
                        <EffectComposer>
                            <Bloom intensity={0.5} luminanceThreshold={0.3} luminanceSmoothing={0.9} mipmapBlur />
                        </EffectComposer>
                    </Canvas>
                </CanvasErrorBoundary>
            </motion.div>
        </section>
    )
}
