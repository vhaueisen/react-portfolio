import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
    { value: '7+', label: 'Years Experience' },
    { value: '2', label: 'App Stores Shipped' },
    { value: '50%', label: 'CI/CD Overhead Cut' },
    { value: '10M+', label: 'Enterprise Users Reached' },
]

function StatCard({ value, label, index }: { value: string; label: string; index: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{
                padding: '28px',
                background: 'rgba(13, 13, 31, 0.7)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                borderRadius: '16px',
                textAlign: 'center',
                flex: '1 1 120px',
                transition: 'border-color 0.3s',
                cursor: 'default',
            }}
            whileHover={{ borderColor: 'rgba(34, 211, 238, 0.4)', y: -4 }}
        >
            <div
                style={{
                    fontSize: '2.2rem',
                    fontWeight: 900,
                    background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 1.1,
                    marginBottom: '8px',
                }}
            >
                {value}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>
                {label}
            </div>
        </motion.div>
    )
}

export default function About() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const inView = useInView(sectionRef, { once: true, margin: '-80px' })

    return (
        <section id="about" style={{ padding: '100px 24px', maxWidth: '1280px', margin: '0 auto' }}>
            <div ref={sectionRef}>
                {/* Section label */}
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
                    About
                </motion.div>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '64px',
                        alignItems: 'start',
                    }}
                >
                    {/* Bio */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            style={{
                                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                                fontWeight: 800,
                                letterSpacing: '-0.03em',
                                lineHeight: 1.15,
                                marginBottom: '24px',
                                color: '#f1f5f9',
                            }}
                        >
                            Mobile dev with a{' '}
                            <span
                                style={{
                                    background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}
                            >
                                game dev soul
                            </span>
                        </motion.h2>

                        {[
                            'Senior Mobile Engineer with 7+ years designing scalable cross-platform architectures using React Native and Expo. Specialized in mobile modernization, white-label platforms, CI/CD automation, and brownfield native integrations.',
                            'Former game developer bringing strong expertise in performance optimization, real-time systems, and polished interactive user experiences. I\'ve shipped products for Nestlé, Coca-Cola, and Vale S.A.',
                            'Based in Vitória, Brazil — overlapping US time zones, fully remote-ready, and actively pursuing US-based opportunities.',
                        ].map((text, i) => (
                            <motion.p
                                key={i}
                                initial={{ opacity: 0, y: 16 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                                style={{
                                    color: '#94a3b8',
                                    lineHeight: 1.75,
                                    fontSize: '0.95rem',
                                    marginBottom: '16px',
                                }}
                            >
                                {text}
                            </motion.p>
                        ))}
                    </div>

                    {/* Stats */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '16px',
                                marginBottom: '32px',
                            }}
                        >
                            {STATS.map((stat, i) => (
                                <StatCard key={stat.label} {...stat} index={i} />
                            ))}
                        </motion.div>

                        {/* Highlights */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            style={{
                                padding: '24px',
                                background: 'rgba(13, 13, 31, 0.7)',
                                backdropFilter: 'blur(12px)',
                                border: '1px solid rgba(99, 102, 241, 0.15)',
                                borderRadius: '16px',
                            }}
                        >
                            <div style={{ fontSize: '0.75rem', color: '#6366f1', fontWeight: 600, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Enterprise Clients</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                {['Nestlé', 'Coca-Cola', 'Palmeiras', 'Vale S.A.'].map((client) => (
                                    <span
                                        key={client}
                                        style={{
                                            padding: '6px 14px',
                                            background: 'rgba(99, 102, 241, 0.08)',
                                            border: '1px solid rgba(99, 102, 241, 0.2)',
                                            borderRadius: '100px',
                                            fontSize: '0.8rem',
                                            color: '#94a3b8',
                                            fontWeight: 500,
                                        }}
                                    >
                                        {client}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
