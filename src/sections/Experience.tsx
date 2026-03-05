import { useState, useRef, useEffect } from 'react'
import { motion, useInView, useScroll } from 'framer-motion'

const ITEM_HEIGHT = 110
const SCROLL_PER_ITEM = 320

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

export default function Experience() {
    const headingRef = useRef<HTMLDivElement>(null)
    const scrollTrackRef = useRef<HTMLDivElement>(null)
    const inView = useInView(headingRef, { once: true, margin: '-80px' })

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [drumPos, setDrumPos] = useState(0)

    const { scrollYProgress } = useScroll({
        target: scrollTrackRef,
        offset: ['start start', 'end end'],
    })

    useEffect(() => {
        return scrollYProgress.on('change', (v) => {
            const pos = Math.max(0, Math.min(EXPERIENCE.length - 1, v * (EXPERIENCE.length - 1)))
            setDrumPos(pos)
            setSelectedIndex(Math.round(pos))
        })
    }, [scrollYProgress])

    const item = EXPERIENCE[selectedIndex]

    return (
        // Outer element carries the section id for the navbar observer
        <section id="experience">
            <div
                ref={scrollTrackRef}
                style={{ height: `calc(100vh + ${(EXPERIENCE.length - 1) * SCROLL_PER_ITEM}px)` }}
            >
                <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
                    <div style={{
                        height: '100%',
                        maxWidth: '1100px',
                        margin: '0 auto',
                        padding: '0 24px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        gap: '48px',
                    }}>

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
                                    color: '#f1f5f9',
                                }}
                            >
                                Where I've worked
                            </motion.h2>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'minmax(220px, 300px) 1fr',
                                gap: '48px',
                                alignItems: 'center',
                            }}
                        >
                            {/* ── Timeline + drum-roll tilt (driven by page scroll) ── */}
                            <div style={{
                                position: 'relative',
                                height: EXPERIENCE.length * ITEM_HEIGHT,
                                userSelect: 'none',
                            }}>
                                {/* Background track */}
                                <div style={{
                                    position: 'absolute',
                                    left: '6px',
                                    top: ITEM_HEIGHT / 2,
                                    width: '2px',
                                    height: (EXPERIENCE.length - 1) * ITEM_HEIGHT,
                                    background: '#1e293b',
                                    zIndex: 1,
                                }} />
                                {/* Progress fill — animates smoothly with drumPos */}
                                <div style={{
                                    position: 'absolute',
                                    left: '6px',
                                    top: ITEM_HEIGHT / 2,
                                    width: '2px',
                                    height: `${Math.min(drumPos * ITEM_HEIGHT, (EXPERIENCE.length - 1) * ITEM_HEIGHT)}px`,
                                    background: `linear-gradient(to bottom, #6366f1, ${item.color})`,
                                    zIndex: 1,
                                    transition: 'height 0.25s ease, background 0.4s',
                                }} />
                                {/* Dots — static, not tilted */}
                                {EXPERIENCE.map((exp, i) => (
                                    <div
                                        key={exp.company + '-dot'}
                                        style={{
                                            position: 'absolute',
                                            left: 0,
                                            top: i * ITEM_HEIGHT + ITEM_HEIGHT / 2 - 7,
                                            width: '14px',
                                            height: '14px',
                                            borderRadius: '50%',
                                            background: i <= selectedIndex ? exp.color : '#0f172a',
                                            border: `2px solid ${i <= selectedIndex ? exp.color : '#334155'}`,
                                            boxShadow: i === selectedIndex ? `0 0 14px ${exp.color}` : 'none',
                                            zIndex: 3,
                                            transition: 'background 0.4s, border-color 0.4s, box-shadow 0.4s',
                                        }}
                                    />
                                ))}

                                {/* Text rows — perspective tilt driven by drumPos */}
                                <div style={{ perspective: '400px', perspectiveOrigin: '50% 50%' }}>
                                    {EXPERIENCE.map((exp, i) => {
                                        const dist = i - drumPos
                                        const absDist = Math.abs(dist)
                                        const opacity = Math.max(0.18, 1 - absDist * 0.26)
                                        const rotateX = dist * -11
                                        const isActive = i === selectedIndex

                                        return (
                                            <div
                                                key={exp.company}
                                                style={{
                                                    height: ITEM_HEIGHT,
                                                    paddingLeft: '30px',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    opacity,
                                                    transform: `rotateX(${rotateX}deg)`,
                                                    transformOrigin: 'center center',
                                                    transformStyle: 'preserve-3d',
                                                    willChange: 'transform, opacity',
                                                }}
                                            >
                                                <div style={{
                                                    fontWeight: 700,
                                                    fontSize: '0.95rem',
                                                    color: isActive ? exp.color : '#cbd5e1',
                                                    transition: 'color 0.35s',
                                                    lineHeight: 1.2,
                                                }}>
                                                    {exp.company}
                                                </div>
                                                <div style={{
                                                    fontSize: '0.75rem',
                                                    color: isActive ? '#64748b' : '#334155',
                                                    marginTop: '2px',
                                                    transition: 'color 0.35s',
                                                }}>
                                                    {exp.role}
                                                </div>
                                                <span style={{
                                                    display: 'inline-block',
                                                    marginTop: '5px',
                                                    padding: '2px 10px',
                                                    background: isActive ? `${exp.color}15` : 'transparent',
                                                    border: `1px solid ${isActive ? exp.color + '35' : 'transparent'}`,
                                                    borderRadius: '100px',
                                                    fontSize: '0.68rem',
                                                    color: isActive ? exp.color : '#475569',
                                                    fontWeight: 500,
                                                    width: 'fit-content',
                                                    transition: 'all 0.35s',
                                                }}>
                                                    {exp.period}
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* ── Detail panel — true drum-roll cylinder ── */}
                            <div style={{
                                position: 'relative',
                                height: '380px',
                                perspective: '1200px',
                                perspectiveOrigin: '50% 50%',
                                overflow: 'hidden',
                            }}>
                                {/* Top/bottom fades to sell the cylinder illusion */}
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    background: 'linear-gradient(to bottom, rgba(7,7,15,0.92) 0%, transparent 18%, transparent 82%, rgba(7,7,15,0.92) 100%)',
                                    pointerEvents: 'none', zIndex: 10,
                                }} />
                                {EXPERIENCE.map((exp, i) => {
                                    const dist = i - drumPos
                                    const absDist = Math.abs(dist)
                                    // STEP = container height so each card occupies exactly one slot
                                    const SLOT = 300
                                    const TILT = 32  // degrees per slot — strong tilt sells the cylinder
                                    const translateY = dist * SLOT
                                    const rotateX = dist * -TILT
                                    const opacity = Math.max(0, 1 - absDist * 0.55)
                                    const scale = Math.max(0.82, 1 - absDist * 0.08)
                                    const isActive = i === selectedIndex

                                    return (
                                        <div
                                            key={exp.company}
                                            style={{
                                                position: 'absolute',
                                                top: 0, left: 0, right: 0,
                                                height: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                transform: `translateY(${translateY}px) rotateX(${rotateX}deg) scale(${scale})`,
                                                transformStyle: 'preserve-3d',
                                                transformOrigin: 'center center',
                                                opacity,
                                                willChange: 'transform, opacity',
                                                pointerEvents: isActive ? 'auto' : 'none',
                                            }}
                                        >
                                            <div style={{
                                                width: '100%',
                                                padding: '28px 32px',
                                                background: isActive
                                                    ? 'rgba(13, 13, 31, 0.85)'
                                                    : 'rgba(13, 13, 31, 0.5)',
                                                backdropFilter: 'blur(12px)',
                                                border: `1px solid ${exp.color}${isActive ? '40' : '18'}`,
                                                borderRadius: '20px',
                                                boxShadow: isActive ? `0 0 48px ${exp.color}15` : 'none',
                                                transition: 'border-color 0.4s, background 0.4s, box-shadow 0.4s',
                                            }}>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'flex-start',
                                                    flexWrap: 'wrap',
                                                    gap: '10px',
                                                    marginBottom: '16px',
                                                }}>
                                                    <div>
                                                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '5px' }}>
                                                            {exp.role}
                                                        </h3>
                                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                                                            <span style={{ color: exp.color, fontWeight: 700, fontSize: '0.88rem' }}>{exp.company}</span>
                                                            <span style={{ color: '#334155' }}>·</span>
                                                            <span style={{ color: '#475569', fontSize: '0.78rem' }}>{exp.type}</span>
                                                        </div>
                                                    </div>
                                                    <span style={{
                                                        padding: '4px 12px',
                                                        background: `${exp.color}15`,
                                                        border: `1px solid ${exp.color}35`,
                                                        borderRadius: '100px',
                                                        fontSize: '0.72rem',
                                                        color: exp.color,
                                                        fontWeight: 600,
                                                        whiteSpace: 'nowrap',
                                                    }}>
                                                        {exp.period}
                                                    </span>
                                                </div>

                                                <div style={{
                                                    height: '1px',
                                                    background: `linear-gradient(to right, ${exp.color}35, transparent)`,
                                                    marginBottom: '14px',
                                                }} />

                                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                    {exp.bullets.map((bullet, bi) => (
                                                        <li
                                                            key={bi}
                                                            style={{ display: 'flex', gap: '9px', fontSize: '0.82rem', color: isActive ? '#94a3b8' : '#475569', lineHeight: 1.6, transition: 'color 0.4s' }}
                                                        >
                                                            <span style={{ color: exp.color, flexShrink: 0, marginTop: '3px', opacity: isActive ? 1 : 0.4 }}>▸</span>
                                                            {bullet}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    )
}