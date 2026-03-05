import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo } from 'react'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { SiGoogleplay, SiAppstore } from 'react-icons/si'
import { SectionHeading, GlassCard, TagPill, AnimatedEntrance } from '../components/ui'
import { COLORS } from '../constants/colors'
import { PROJECTS, PROJECT_TABS } from '../data/projects'
import { useSectionInView } from '../hooks/useSectionInView'
import { iconBox } from '../styles'
import type { ProjectItem, ProjectCategory } from '../types'

// ─── Project card link row ────────────────────────────────────────────────────

function ProjectLinks({ project }: { project: ProjectItem }) {
    return (
        <div
            style={{
                display: 'flex',
                gap: '12px',
                paddingTop: '8px',
                flexWrap: 'wrap',
                borderTop: '1px solid rgba(255,255,255,0.04)',
            }}
        >
            {project.github && (
                <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.8rem',
                        color: COLORS.textMuted,
                        fontWeight: 500,
                    }}
                >
                    <FiGithub size={14} /> View Code
                </a>
            )}
            {project.playStore && (
                <a
                    href={project.playStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link project-link--play"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.8rem',
                        color: COLORS.textMuted,
                        fontWeight: 500,
                    }}
                >
                    <SiGoogleplay size={13} /> Google Play
                </a>
            )}
            {project.appStore && (
                <a
                    href={project.appStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link project-link--appstore"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.8rem',
                        color: COLORS.textMuted,
                        fontWeight: 500,
                        marginLeft: 'auto',
                    }}
                >
                    <SiAppstore size={13} /> App Store
                </a>
            )}
            {project.link && (
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
                        marginLeft: 'auto',
                    }}
                >
                    <FiExternalLink size={14} /> Visit Live
                </a>
            )}
        </div>
    )
}

// ─── Project card ─────────────────────────────────────────────────────────────

interface ProjectCardProps {
    project: ProjectItem
    index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
    const [hovered, setHovered] = useState(false)
    const liveUrl = project.link ?? project.playStore ?? project.appStore

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => liveUrl && window.open(liveUrl, '_blank', 'noopener,noreferrer')}
        >
            <GlassCard
                accentColor={project.color}
                active={hovered}
                style={{
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    cursor: liveUrl ? 'pointer' : 'default',
                    position: 'relative',
                    overflow: 'hidden',
                    transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
                    transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
                }}
            >
                {/* Corner glow accent */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '120px',
                        height: '120px',
                        pointerEvents: 'none',
                        background: `radial-gradient(circle, ${project.color}15 0%, transparent 70%)`,
                        opacity: hovered ? 1 : 0,
                        transition: 'opacity 0.3s',
                    }}
                />

                {/* Icon + name */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <span style={{ ...iconBox(project.color), transition: 'background 0.3s, border-color 0.3s' }}>
                            {project.icon}
                        </span>
                        <h3
                            style={{ fontSize: '1.05rem', fontWeight: 700, color: COLORS.textPrimary, margin: 0 }}
                        >
                            {project.name}
                        </h3>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: COLORS.textSub, lineHeight: 1.65 }}>
                        {project.description}
                    </p>
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' }}>
                    {project.tags.map((tag) => (
                        <TagPill key={tag} label={tag} color={project.color} />
                    ))}
                </div>

                <ProjectLinks project={project} />
            </GlassCard>
        </motion.div>
    )
}

// ─── Filter tab ───────────────────────────────────────────────────────────────

interface FilterTabProps {
    label: ProjectCategory
    active: boolean
    onClick: () => void
}

function FilterTab({ label, active, onClick }: FilterTabProps) {
    return (
        <button
            onClick={onClick}
            style={{
                padding: '8px 20px',
                borderRadius: '100px',
                fontFamily: 'inherit',
                border: `1px solid ${active ? COLORS.indigo : 'rgba(99,102,241,0.2)'}`,
                background: active ? 'rgba(99,102,241,0.15)' : 'transparent',
                color: active ? COLORS.indigo : COLORS.textMuted,
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
            }}
        >
            {label}
        </button>
    )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Projects() {
    const [activeTab, setActiveTab] = useState<ProjectCategory>('All')
    const [headingRef, inView] = useSectionInView<HTMLDivElement>()

    const filtered = useMemo(
        () => (activeTab === 'All' ? PROJECTS : PROJECTS.filter((p) => p.categories.includes(activeTab))),
        [activeTab]
    )

    return (
        <section id="projects" style={{ padding: '100px 24px', maxWidth: '1280px', margin: '0 auto' }}>
            <div ref={headingRef}>
                <SectionHeading
                    label="Projects"
                    title="Things I've built"
                    subtitle="From AR enterprise apps to interactive 3D configurators."
                    inView={inView}
                />
            </div>

            {/* Filter tabs */}
            <AnimatedEntrance delay={0.3} inView={inView}>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '24px 0' }}>
                    {PROJECT_TABS.map((tab) => (
                        <FilterTab
                            key={tab}
                            label={tab}
                            active={activeTab === tab}
                            onClick={() => setActiveTab(tab)}
                        />
                    ))}
                </div>
            </AnimatedEntrance>

            {/* Cards grid */}
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
