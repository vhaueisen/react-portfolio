import { motion } from 'framer-motion'
import { SectionHeading, GlassCard, TagPill } from '../components/ui'
import { useSectionInView } from '../hooks/useSectionInView'
import { SKILL_GROUPS } from '../data/skills'
import type { SkillGroup } from '../types'

// ─── Skill group card ─────────────────────────────────────────────────────────

interface SkillGroupCardProps {
    group: SkillGroup
    index: number
}

function SkillGroupCard({ group, index }: SkillGroupCardProps) {
    const [ref, inView] = useSectionInView<HTMLDivElement>('-40px')

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <GlassCard style={{ padding: '28px' }}>
                {/* Group label */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    marginBottom: '20px', color: group.color,
                }}>
                    {group.icon}
                    <span style={{
                        fontSize: '0.8rem', fontWeight: 700,
                        textTransform: 'uppercase', letterSpacing: '0.1em',
                    }}>
                        {group.label}
                    </span>
                </div>

                {/* Skill badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {group.skills.map((skill, i) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.3, delay: index * 0.1 + i * 0.03 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <TagPill label={skill.name} color={group.color} icon={skill.icon ?? undefined} />
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
        <section id="skills" style={{ padding: '100px 24px', maxWidth: '1280px', margin: '0 auto' }}>
            <div ref={headingRef}>
                <SectionHeading
                    label="Skills"
                    title="Tech I work with"
                    inView={inView}
                    titleStyle={{ marginBottom: '48px' }}
                />
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px',
            }}>
                {SKILL_GROUPS.map((group, i) => (
                    <SkillGroupCard key={group.label} group={group} index={i} />
                ))}
            </div>
        </section>
    )
}
