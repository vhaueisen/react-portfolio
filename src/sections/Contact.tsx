import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import { WireframeSphere } from '../components/three'
import { SectionHeading, AnimatedEntrance } from '../components/ui'
import { useSectionInView } from '../hooks/useSectionInView'
import { CONTACT_LINKS } from '../data/contact'
import { COLORS } from '../constants/colors'
import { gradientTextShort } from '../styles'
import type { ContactLink } from '../types'

// ─── Single contact link row ──────────────────────────────────────────────────

function ContactRow({ link, index, inView }: { link: ContactLink; index: number; inView: boolean }) {
    return (
        <motion.a
            href={link.href}
            target={link.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            style={{
                display: 'flex', alignItems: 'center', gap: '16px',
                padding: '16px 20px',
                background: 'rgba(13,13,31,0.7)', backdropFilter: 'blur(12px)',
                border: '1px solid rgba(99,102,241,0.12)',
                borderRadius: '12px', textDecoration: 'none', transition: 'all 0.3s',
            }}
            whileHover={{ borderColor: `${link.color}50`, x: 4, boxShadow: `0 4px 20px ${link.color}15` }}
        >
            {/* Icon badge */}
            <span style={{
                width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                background: `${link.color}15`, border: `1px solid ${link.color}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: link.color,
            }}>
                {link.icon}
            </span>

            {/* Label + value */}
            <div>
                <div style={{ fontSize: '0.75rem', color: COLORS.textMuted, fontWeight: 500, marginBottom: '2px' }}>
                    {link.label}
                </div>
                <div style={{ fontSize: '0.9rem', color: COLORS.textPrimary, fontWeight: 500 }}>
                    {link.value}
                </div>
            </div>

            <FiArrowRight size={16} style={{ marginLeft: 'auto', color: COLORS.slate600 }} />
        </motion.a>
    )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Contact() {
    const [sectionRef, inView] = useSectionInView<HTMLDivElement>()

    return (
        <section id="contact" style={{ padding: '100px 24px 140px', maxWidth: '1280px', margin: '0 auto' }}>
            <div
                ref={sectionRef}
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '64px', alignItems: 'center',
                }}
            >
                {/* Left: text + links */}
                <div>
                    <SectionHeading
                        label="Contact"
                        title={
                            <>
                                Let's build something{' '}
                                <span style={gradientTextShort}>great together</span>
                            </>
                        }
                        inView={inView}
                        titleStyle={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: 1.15, marginBottom: '20px' }}
                    />

                    <AnimatedEntrance delay={0.2} inView={inView}>
                        <p style={{
                            color: COLORS.textSub, lineHeight: 1.7, fontSize: '0.95rem',
                            marginBottom: '40px', maxWidth: '420px',
                        }}>
                            I'm open to senior mobile engineering roles and remote positions with US-based teams.
                            Reach out — I'm quick to respond.
                        </p>
                    </AnimatedEntrance>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {CONTACT_LINKS.map((link, i) => (
                            <ContactRow key={link.label} link={link} index={i} inView={inView} />
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
                        <pointLight position={[4, 4, 4]}   color={COLORS.indigo} intensity={2} />
                        <pointLight position={[-4, -4, 2]} color={COLORS.cyan}   intensity={1} />
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
                    textAlign: 'center', marginTop: '80px', paddingTop: '40px',
                    borderTop: '1px solid rgba(99,102,241,0.1)',
                    color: COLORS.slate700, fontSize: '0.8rem',
                }}
            >
                Built with React · Three.js · Framer Motion · 2026
            </motion.div>
        </section>
    )
}
