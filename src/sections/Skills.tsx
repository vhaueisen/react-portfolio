import { motion } from 'framer-motion'
import { SectionHeading, GlassCard, TagPill } from '../components/ui'
import { SKILL_GROUPS } from '../data/skills'
import { useSectionInView } from '../hooks/useSectionInView'
import { flexRow, flexWrapRow } from '../styles'
import type { SkillGroup } from '../types'
import type { CSSProperties } from 'react'

// ─── Module-scope style constants ─────────────────────────────────────────────────────

const skillsGridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
}

/** Uppercase label text inside a skill group card. */
const skillGroupLabelStyle: CSSProperties = {
    fontSize: '0.8rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
}

// ─── Skill group card ─────────────────────────────────────────────────────────

interface SkillGroupCardProps {
    group: SkillGroup
    index: number
    /** Passed down from the parent section — avoids spawning a separate IntersectionObserver per card. */
    inView: boolean
}

function SkillGroupCard({ group, index, inView }: SkillGroupCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <GlassCard style={{ padding: '28px' }}>
                {/* Group label */}
                <div style={{ ...flexRow('8px'), marginBottom: '20px', color: group.color }}>
                    {group.icon}
                    <span style={skillGroupLabelStyle}>{group.label}</span>
                </div>

                {/* Skill badges */}
                <div style={flexWrapRow('8px')}>
                    {group.skills.map((skill, i) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.3, delay: index * 0.1 + i * 0.03 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <TagPill label={skill.name} color={group.color} icon={skill.icon} />
                        </motion.div>
                    ))}
                </div>
            </GlassCard>
        </motion.div>
    )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Skills() {
    const [headingRef, inView] = useSectionInView<HTMLDivElement>()

    return (
        <section id="skills" className="section-container">
            <div ref={headingRef}>
                <SectionHeading
                    label="Skills"
                    title="Tech I work with"
                    inView={inView}
                    titleStyle={{ marginBottom: '48px' }}
                />
            </div>

            <div style={skillsGridStyle}>
                {SKILL_GROUPS.map((group, i) => (
                    <SkillGroupCard key={group.label} group={group} index={i} inView={inView} />
                ))}
            </div>
        </section>
    )
}
