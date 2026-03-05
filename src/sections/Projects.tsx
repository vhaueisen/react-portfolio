import { motion, AnimatePresence } from 'framer-motion'
import { useMemo } from 'react'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { SiGoogleplay, SiAppstore } from 'react-icons/si'
import { SectionHeading, GlassCard, TagPill, AnimatedEntrance } from '../components/ui'
import { COLORS } from '../constants/colors'
import { ProjectFilterProvider, useProjectFilter } from '../context/ProjectFilterContext'
import { PROJECTS, PROJECT_TABS } from '../data/projects'
import { useSectionInView } from '../hooks/useSectionInView'
import { iconBox } from '../styles'
import type { ProjectItem, ProjectCategory } from '../types'

// ─── Project card link row ────────────────────────────────────────────────────

interface ProjectLinksProps {
  /** The project whose store / repo / live links should be rendered. */
  project: ProjectItem
}

function ProjectLinks({ project }: ProjectLinksProps) {
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
          aria-label={`${project.name} source code on GitHub`}
          className="project-link"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.8rem',
            color: COLORS.textMuted,
            fontWeight: 500,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <FiGithub size={14} /> View Code
        </a>
      )}
      {project.playStore && (
        <a
          href={project.playStore}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name} on Google Play`}
          className="project-link project-link--play"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.8rem',
            color: COLORS.textMuted,
            fontWeight: 500,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <SiGoogleplay size={13} /> Google Play
        </a>
      )}
      {project.appStore && (
        <a
          href={project.appStore}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name} on App Store`}
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
          onClick={(e) => e.stopPropagation()}
        >
          <SiAppstore size={13} /> App Store
        </a>
      )}
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${project.name} live site`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.8rem',
            color: project.color,
            fontWeight: 600,
            marginLeft: 'auto',
          }}
          onClick={(e) => e.stopPropagation()}
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

/** Inner card content — shared between the link and non-link wrappers. */
function CardContent({ project }: { project: ProjectItem }) {
  return (
    <GlassCard
      accentColor={project.color}
      style={{
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle corner glow — always present, accent color as reference */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '120px',
          height: '120px',
          pointerEvents: 'none',
          background: `radial-gradient(circle, ${project.color}12 0%, transparent 70%)`,
        }}
      />

      {/* Icon + name */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <span
            style={{ ...iconBox(project.color), transition: 'background 0.3s, border-color 0.3s' }}
          >
            {project.icon}
          </span>
          <h3
            style={{ fontSize: '1.05rem', fontWeight: 700, color: COLORS.textPrimary, margin: 0 }}
          >
            {project.name}
          </h3>
        </div>
        <p
          style={{
            fontSize: '0.875rem',
            color: COLORS.textSub,
            lineHeight: 1.65,
            minHeight: '4lh',
          }}
        >
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
  )
}

/**
 * Project card with semantic navigation markup.
 *
 * When the project has a live URL, the outer wrapper is a `<motion.a>` so the
 * card is keyboard-accessible and right-clickable — a plain `onClick` on a
 * `div` would lack both. The `whileHover` lift replaces the previous
 * `useState(hovered)` approach, eliminating a React re-render per hover event.
 */
function ProjectCard({ project, index }: ProjectCardProps) {
  const liveUrl = project.link ?? project.appStore ?? project.playStore

  const sharedProps = {
    layout: true as const,
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.4, delay: index * 0.06 },
  }

  if (liveUrl) {
    return (
      <motion.a
        {...sharedProps}
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.name}`}
        whileHover={{ y: -6 }}
        style={{ display: 'block', textDecoration: 'none' }}
      >
        <CardContent project={project} />
      </motion.a>
    )
  }

  return (
    <motion.div {...sharedProps}>
      <CardContent project={project} />
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
        border: `1px solid ${active ? COLORS.indigo : COLORS.borderSubtle}`,
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

// ─── Inner section (must be inside ProjectFilterProvider) ─────────────────────

function ProjectsInner() {
  const [headingRef, inView] = useSectionInView<HTMLDivElement>()
  const { state, dispatch } = useProjectFilter()
  const { activeCategory } = state

  const filtered = useMemo(
    () =>
      activeCategory === 'All'
        ? PROJECTS
        : PROJECTS.filter((p) => p.categories.includes(activeCategory)),
    [activeCategory]
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
              active={activeCategory === tab}
              onClick={() => dispatch({ type: 'SET_CATEGORY', payload: tab })}
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

// ─── Section default export ────────────────────────────────────────────────────

/**
 * Projects section — wraps `ProjectsInner` in `<ProjectFilterProvider>` so
 * the filter state is owned at the section level and sub-components can
 * dispatch actions without prop drilling.
 */
export default function Projects() {
  return (
    <ProjectFilterProvider>
      <ProjectsInner />
    </ProjectFilterProvider>
  )
}
