import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

type Category = 'All' | 'Mobile' | '3D / AR' | 'Web'

const PROJECTS = [
    {
        id: 'plantao',
        name: '🩺 Plantão 360',
        description:
            'Full-featured React Native app for doctors to manage shifts, finances, and documents. Includes 60+ analytics events, Fastlane CI/CD, and Firebase backend.',
        categories: ['Mobile'] as Category[],
        tags: ['React Native', 'Expo', 'Firebase', 'Fastlane', 'TypeScript'],
        github: 'https://github.com/vhaueisen/plantao-360',
        featured: true,
        color: '#6366f1',
    },
    {
        id: 'vale-ra',
        name: '📱 Vale RA',
        description:
            'Augmented Reality mobile app built in Unity for Vale S.A. — immersive 3D maintenance training with QR code model loading and cross-platform AR support.',
        categories: ['3D / AR'] as Category[],
        tags: ['Unity', 'C#', 'ARFoundation', 'Android', 'iOS'],
        github: 'https://github.com/vhaueisen/vale-ra',
        featured: true,
        color: '#22d3ee',
    },
    {
        id: 'bulli',
        name: '🚐 Build-Your-Bulli',
        description:
            'Interactive 3D browser configurator for VW T1 camper vans. Real-time model swapping, live WebGL previews, PDF export, and email delivery via Node.js.',
        categories: ['3D / AR', 'Web'] as Category[],
        tags: ['React', 'Three.js', 'Node.js', 'jsPDF', 'Webpack'],
        github: 'https://github.com/vhaueisen/build-your-bulli',
        featured: true,
        color: '#a855f7',
    },
    {
        id: 'rogueunit',
        name: '🛰️ Rogueunit.gg',
        description:
            'Official studio website for Rogue Unit — animated carousels, project case studies, and contact forms. Built with SvelteKit and smooth transitions.',
        categories: ['Web'] as Category[],
        tags: ['SvelteKit', 'TypeScript', 'Vite', 'CSS'],
        github: 'https://github.com/vhaueisen/rogueunit-gg',
        featured: false,
        color: '#6366f1',
    },
    {
        id: 'realink',
        name: '🔗 Realink.io',
        description:
            'Institutional SvelteKit website with Gmail OAuth integration, rate-limited quote forms, product pages, and modular content system.',
        categories: ['Web'] as Category[],
        tags: ['SvelteKit', 'Gmail API', 'OAuth', 'Vite', 'JavaScript'],
        github: 'https://github.com/vhaueisen/realink-io',
        featured: false,
        color: '#22d3ee',
    },
    {
        id: 'iall',
        name: '🔍 Inspection Routes',
        description:
            'QR code-powered field inspection app for IndustriALL. Operators scan equipment QR codes to access checklists, answer structured forms, and submit reports.',
        categories: ['Mobile'] as Category[],
        tags: ['Angular', 'Ionic', 'TypeScript', 'REST API'],
        github: 'https://github.com/vhaueisen/Desafio-iAll',
        featured: false,
        color: '#a855f7',
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
                <h3
                    style={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: '#f1f5f9',
                        marginBottom: '8px',
                    }}
                >
                    {project.name}
                </h3>
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
            <div style={{ display: 'flex', gap: '12px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
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
                <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.8rem',
                        color: project.color,
                        fontWeight: 500,
                        marginLeft: 'auto',
                        transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.7')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
                >
                    <FiExternalLink size={13} />
                    GitHub
                </a>
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
