import { useState, useRef, ReactNode } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { SiGoogleplay, SiAppstore } from 'react-icons/si'
import {
    TbStethoscope,
    TbAugmentedReality,
    TbCube,
    TbBus,
    TbRocket,
    TbLink,
} from 'react-icons/tb'

type Category = 'All' | 'Mobile' | '3D / AR' | 'Web'

const PROJECTS: {
    id: string
    name: string
    icon: ReactNode
    description: string
    categories: Category[]
    tags: string[]
    github?: string
    link?: string
    playStore?: string
    appStore?: string
    featured: boolean
    color: string
}[] = [
        {
            id: 'plantao',
            name: 'Plantão 360',
            icon: <TbStethoscope size={22} />,
            description:
                'Full-featured React Native app for doctors to manage shifts, finances, and documents. Includes 60+ analytics events, Fastlane CI/CD, and Firebase backend.',
            categories: ['Mobile'],
            tags: ['React Native', 'Expo', 'Firebase', 'Fastlane', 'TypeScript'],
            github: 'https://github.com/vhaueisen/plantao-360',
            playStore: 'https://play.google.com/store/apps/details?id=com.medfinance.plantao360',
            appStore: 'https://apps.apple.com/br/app/plant%C3%A3o-360/id6748095218',
            featured: true,
            color: '#6366f1',
        },
        {
            id: 'nestle-surpresa',
            name: 'Nestlé Surpresa RA',
            icon: <TbAugmentedReality size={22} />,
            description:
                'Branded web AR experience for Nestlé Chocolates — users scan packaging to bring 6 collectible Brazilian wildlife animals to life in augmented reality, paired with a Roblox integration.',
            categories: ['3D / AR', 'Web'],
            tags: ['Web AR', 'React', 'Three.js', 'Nestlé', 'Roblox'],
            link: 'https://amostras.euqueronestle.com.br/sites/chocolates/surpresa-ra/',
            featured: true,
            color: '#22d3ee',
        },
        {
            id: 'vale-ra',
            name: 'Vale RA',
            icon: <TbCube size={22} />,
            description:
                'Augmented Reality mobile app built in Unity for Vale S.A. — immersive 3D maintenance training with QR code model loading and cross-platform AR support.',
            categories: ['3D / AR'],
            tags: ['Unity', 'C#', 'ARFoundation', 'Android', 'iOS'],
            github: 'https://github.com/vhaueisen/vale-ra',
            featured: true,
            color: '#22d3ee',
        },
        {
            id: 'bulli',
            name: 'Build-Your-Bulli',
            icon: <TbBus size={22} />,
            description:
                'Interactive 3D browser configurator for VW T1 camper vans. Real-time model swapping, live WebGL previews, PDF export, and email delivery via Node.js.',
            categories: ['3D / AR', 'Web'],
            tags: ['React', 'Three.js', 'Node.js', 'jsPDF', 'Webpack'],
            github: 'https://github.com/vhaueisen/build-your-bulli',
            featured: true,
            color: '#a855f7',
        },
        {
            id: 'rogueunit',
            name: 'Rogueunit.gg',
            icon: <TbRocket size={22} />,
            description:
                'Official studio website for Rogue Unit — animated carousels, project case studies, and contact forms. Built with SvelteKit and smooth transitions.',
            categories: ['Web'],
            tags: ['SvelteKit', 'TypeScript', 'Vite', 'CSS'],
            github: 'https://github.com/vhaueisen/rogueunit-gg',
            featured: false,
            color: '#6366f1',
        },
        {
            id: 'realink',
            name: 'Realink.io',
            icon: <TbLink size={22} />,
            description:
                'Institutional SvelteKit website with Gmail OAuth integration, rate-limited quote forms, product pages, and modular content system.',
            categories: ['Web'],
            tags: ['SvelteKit', 'Gmail API', 'OAuth', 'Vite', 'JavaScript'],
            github: 'https://github.com/vhaueisen/realink-io',
            featured: false,
            color: '#22d3ee',
        },
    ]

const TABS: Category[] = ['All', 'Mobile', '3D / AR', 'Web']

function ProjectCard({ project, index }: { project: (typeof PROJECTS)[number]; index: number }) {
    const [hovered, setHovered] = useState(false)

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                padding: '28px',
                background: 'rgba(13, 13, 31, 0.7)',
                backdropFilter: 'blur(12px)',
                border: `1px solid ${hovered ? project.color + '50' : 'rgba(99, 102, 241, 0.12)'}`,
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                cursor: 'default',
                transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
                transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
                boxShadow: hovered ? `0 16px 40px ${project.color}20` : 'none',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Glow accent top-right */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '120px',
                    height: '120px',
                    background: `radial-gradient(circle, ${project.color}15 0%, transparent 70%)`,
                    pointerEvents: 'none',
                    transition: 'opacity 0.3s',
                    opacity: hovered ? 1 : 0,
                }}
            />

            <div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '12px',
                    }}
                >
                    <span
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            background: `${project.color}15`,
                            border: `1px solid ${project.color}30`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: project.color,
                            flexShrink: 0,
                            transition: 'background 0.3s, border-color 0.3s',
                        }}
                    >
                        {project.icon}
                    </span>
                    <h3
                        style={{
                            fontSize: '1.05rem',
                            fontWeight: 700,
                            color: '#f1f5f9',
                            margin: 0,
                        }}
                    >
                        {project.name}
                    </h3>
                </div>
                <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.65 }}>
                    {project.description}
                </p>
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' }}>
                {project.tags.map((tag) => (
                    <span
                        key={tag}
                        style={{
                            padding: '3px 10px',
                            background: `${project.color}12`,
                            border: `1px solid ${project.color}25`,
                            borderRadius: '100px',
                            fontSize: '0.72rem',
                            color: '#94a3b8',
                            fontWeight: 500,
                        }}
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Link */}
            <div style={{ display: 'flex', gap: '12px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.04)', flexWrap: 'wrap' }}>
                {project.github && (
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '0.8rem',
                            color: '#64748b',
                            fontWeight: 500,
                            transition: 'color 0.2s',
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#f1f5f9')}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#64748b')}
                    >
                        <FiGithub size={14} />
                        View Code
                    </a>
                )}
                {project.playStore && (
                    <a
                        href={project.playStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '0.8rem',
                            color: '#64748b',
                            fontWeight: 500,
                            transition: 'color 0.2s',
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#34d399')}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#64748b')}
                    >
                        <SiGoogleplay size={13} />
                        Google Play
                    </a>
                )}
                {project.appStore && (
                    <a
                        href={project.appStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '0.8rem',
                            color: '#64748b',
                            fontWeight: 500,
                            marginLeft: 'auto',
                            transition: 'color 0.2s',
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#60a5fa')}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#64748b')}
                    >
                        <SiAppstore size={13} />
                        App Store
                    </a>
                )}
                {project.link && !project.github && (
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '0.8rem',
                            color: project.color,
                            fontWeight: 600,
                            transition: 'opacity 0.2s',
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.7')}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
                    >
                        <FiExternalLink size={14} />
                        Visit Live
                    </a>
                )}
            </div>
        </motion.div>
    )
}

export default function Projects() {
    const [activeTab, setActiveTab] = useState<Category>('All')
    const headingRef = useRef<HTMLDivElement>(null)
    const inView = useInView(headingRef, { once: true, margin: '-80px' })

    const filtered =
        activeTab === 'All'
            ? PROJECTS
            : PROJECTS.filter((p) => p.categories.includes(activeTab))

    return (
        <section id="projects" style={{ padding: '100px 24px', maxWidth: '1280px', margin: '0 auto' }}>
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
                    Projects
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    style={{
                        fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                        fontWeight: 800,
                        letterSpacing: '-0.03em',
                        marginBottom: '16px',
                        color: '#f1f5f9',
                    }}
                >
                    Things I've built
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '40px' }}
                >
                    From AR enterprise apps to interactive 3D configurators.
                </motion.p>
            </div>

            {/* Filter tabs */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap',
                    marginBottom: '40px',
                }}
            >
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '8px 20px',
                            borderRadius: '100px',
                            border: `1px solid ${activeTab === tab ? '#6366f1' : 'rgba(99,102,241,0.2)'}`,
                            background:
                                activeTab === tab ? 'rgba(99,102,241,0.15)' : 'transparent',
                            color: activeTab === tab ? '#6366f1' : '#64748b',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            fontFamily: 'inherit',
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </motion.div>

            {/* Grid */}
            <motion.div
                layout
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '24px',
                }}
            >
                <AnimatePresence mode="popLayout">
                    {filtered.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                </AnimatePresence>
            </motion.div>
        </section>
    )
}
