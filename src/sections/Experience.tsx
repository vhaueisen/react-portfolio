import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EXPERIENCE = [
    {
        role: 'Mobile Developer',
        company: 'Geoforce',
        period: 'Sep 2025 – Present',
        type: 'Remote',
        color: '#6366f1',
        bullets: [
            "Architected the company's first mobile white-label platform — single codebase, multiple branded apps, 50% reduction in dev overhead.",
            'Automated multi-flavor Fastlane pipeline for code signing, environment config, and Play/App Store deployment.',
            'Led React Native 0.74 → 0.82 migration with zero business disruption.',
            'Directed migration from bare RN workflow to Expo managed workflow.',
        ],
    },
    {
        role: 'Mobile Developer',
        company: 'Slate Teams',
        period: 'Mar 2025 – Sep 2025',
        type: 'Remote',
        color: '#22d3ee',
        bullets: [
            'Led brownfield React Native integration into production Swift/Kotlin apps, designing the bridging strategy.',
            'Implemented feature flagging for controlled rollouts and safer experimentation.',
            'Developed robust E2E test coverage across native and RN components.',
            'Leveraged Cursor and AI-assisted workflows to accelerate implementation.',
        ],
    },
    {
        role: 'Software Engineer & Co-Founder',
        company: 'Rogue Unit',
        period: 'Feb 2020 – Jul 2025',
        type: 'Remote',
        color: '#a855f7',
        bullets: [
            'Led a team of 4 developers, mentoring engineers and coordinating delivery across concurrent client projects.',
            'Directed interactive web & mobile experiences for Nestlé, Coca-Cola, and Palmeiras.',
            'Designed scalable front-end architectures and animation systems inspired by game dev.',
            'Structured CI/CD pipelines and deployment workflows for multi-platform projects.',
        ],
    },
    {
        role: 'Mobile & Web Developer',
        company: 'IndustriALL',
        period: 'May 2022 – Oct 2022',
        type: 'Vitória, Brazil',
        color: '#22d3ee',
        bullets: [
            'Refactored Angular/Ionic app — 50% performance improvement, 90% faster load times.',
            'Created CI/CD pipelines and deployed the solution on-site.',
        ],
    },
    {
        role: 'Mobile Developer Intern',
        company: 'Vale S.A.',
        period: 'Oct 2019 – Aug 2021',
        type: 'Vitória, Brazil',
        color: '#6366f1',
        bullets: [
            'Developed and deployed Vale RA — a gamified AR mobile training app for field maintenance.',
            'Built GC Digital, a web learning platform with dynamic content features.',
        ],
    },
]

function ExperienceCard({
    item,
    index,
    isLast,
}: {
    item: (typeof EXPERIENCE)[number]
    index: number
    isLast: boolean
}) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-40px' })

    return (
        <div ref={ref} style={{ display: 'flex', gap: '24px' }}>
            {/* Timeline */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexShrink: 0,
                }}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    style={{
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        background: item.color,
                        boxShadow: `0 0 12px ${item.color}`,
                        flexShrink: 0,
                        marginTop: '6px',
                    }}
                />
                {!isLast && (
                    <motion.div
                        initial={{ scaleY: 0 }}
                        animate={inView ? { scaleY: 1 } : {}}
                        transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                        style={{
                            width: '1px',
                            flex: 1,
                            minHeight: '40px',
                            background: `linear-gradient(to bottom, ${item.color}60, transparent)`,
                            transformOrigin: 'top',
                            marginTop: '8px',
                        }}
                    />
                )}
            </div>

            {/* Card */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
                style={{
                    flex: 1,
                    padding: '24px',
                    background: 'rgba(13, 13, 31, 0.6)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(99, 102, 241, 0.12)',
                    borderRadius: '16px',
                    marginBottom: isLast ? 0 : '24px',
                    transition: 'border-color 0.3s',
                }}
                whileHover={{ borderColor: `${item.color}50` }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        flexWrap: 'wrap',
                        gap: '8px',
                        marginBottom: '12px',
                    }}
                >
                    <div>
                        <h3
                            style={{
                                fontSize: '1.05rem',
                                fontWeight: 700,
                                color: '#f1f5f9',
                                marginBottom: '4px',
                            }}
                        >
                            {item.role}
                        </h3>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <span style={{ color: item.color, fontWeight: 600, fontSize: '0.9rem' }}>
                                {item.company}
                            </span>
                            <span style={{ color: '#475569', fontSize: '0.75rem' }}>·</span>
                            <span style={{ color: '#475569', fontSize: '0.8rem' }}>{item.type}</span>
                        </div>
                    </div>
                    <span
                        style={{
                            padding: '4px 12px',
                            background: `${item.color}15`,
                            border: `1px solid ${item.color}30`,
                            borderRadius: '100px',
                            fontSize: '0.75rem',
                            color: item.color,
                            fontWeight: 500,
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {item.period}
                    </span>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {item.bullets.map((bullet, i) => (
                        <li
                            key={i}
                            style={{
                                display: 'flex',
                                gap: '10px',
                                fontSize: '0.875rem',
                                color: '#94a3b8',
                                lineHeight: 1.6,
                            }}
                        >
                            <span style={{ color: item.color, flexShrink: 0, marginTop: '2px' }}>▸</span>
                            {bullet}
                        </li>
                    ))}
                </ul>
            </motion.div>
        </div>
    )
}

export default function Experience() {
    const headingRef = useRef<HTMLDivElement>(null)
    const inView = useInView(headingRef, { once: true, margin: '-80px' })

    return (
        <section id="experience" style={{ padding: '100px 24px', maxWidth: '900px', margin: '0 auto' }}>
            <div ref={headingRef}>
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
                    Experience
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    style={{
                        fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                        fontWeight: 800,
                        letterSpacing: '-0.03em',
                        marginBottom: '56px',
                        color: '#f1f5f9',
                    }}
                >
                    Where I've worked
                </motion.h2>
            </div>

            {EXPERIENCE.map((item, i) => (
                <ExperienceCard
                    key={item.company + item.period}
                    item={item}
                    index={i}
                    isLast={i === EXPERIENCE.length - 1}
                />
            ))}
        </section>
    )
}
