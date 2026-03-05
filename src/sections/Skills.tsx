import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
    SiReact,
    SiTypescript,
    SiJavascript,
    SiExpo,
    SiFirebase,
    SiGithubactions,
    SiAngular,
    SiSvelte,
    SiPython,
    SiUnity,
} from 'react-icons/si'
import { TbBrandReactNative } from 'react-icons/tb'
import { FiZap, FiBox, FiCloud, FiTool } from 'react-icons/fi'

const SKILL_GROUPS = [
    {
        label: 'Mobile',
        icon: <TbBrandReactNative size={16} />,
        color: '#6366f1',
        skills: [
            { name: 'React Native', icon: <SiReact size={14} /> },
            { name: 'Expo', icon: <SiExpo size={14} /> },
            { name: 'Reanimated', icon: <FiZap size={14} /> },
            { name: 'Gesture Handler', icon: <FiBox size={14} /> },
            { name: 'React Navigation', icon: null },
            { name: 'Feature Flagging', icon: null },
            { name: 'App Store / Play Store', icon: null },
        ],
    },
    {
        label: 'Web / Frontend',
        icon: <FiBox size={16} />,
        color: '#22d3ee',
        skills: [
            { name: 'React', icon: <SiReact size={14} /> },
            { name: 'SvelteKit', icon: <SiSvelte size={14} /> },
            { name: 'Angular', icon: <SiAngular size={14} /> },
            { name: 'Three.js', icon: <FiBox size={14} /> },
            { name: 'Framer Motion', icon: <FiZap size={14} /> },
            { name: 'Tailwind CSS', icon: null },
        ],
    },
    {
        label: 'DevOps & CI/CD',
        icon: <FiTool size={16} />,
        color: '#a855f7',
        skills: [
            { name: 'Fastlane', icon: <FiZap size={14} /> },
            { name: 'GitHub Actions', icon: <SiGithubactions size={14} /> },
            { name: 'EAS Build', icon: <SiExpo size={14} /> },
            { name: 'CI/CD Pipelines', icon: null },
            { name: 'White-label Builds', icon: null },
        ],
    },
    {
        label: 'Backend & Cloud',
        icon: <FiCloud size={16} />,
        color: '#22d3ee',
        skills: [
            { name: 'Firebase', icon: <SiFirebase size={14} /> },
            { name: 'Firestore', icon: <SiFirebase size={14} /> },
            { name: 'Cloud Functions', icon: <SiFirebase size={14} /> },
            { name: 'REST APIs', icon: null },
            { name: 'React Query', icon: null },
            { name: 'Zustand', icon: null },
        ],
    },
    {
        label: 'Languages',
        icon: <FiZap size={16} />,
        color: '#6366f1',
        skills: [
            { name: 'TypeScript', icon: <SiTypescript size={14} /> },
            { name: 'JavaScript', icon: <SiJavascript size={14} /> },
            { name: 'C# / Unity', icon: <SiUnity size={14} /> },
            { name: 'Python', icon: <SiPython size={14} /> },
        ],
    },
]

function SkillGroup({
    group,
    index,
}: {
    group: (typeof SKILL_GROUPS)[number]
    index: number
}) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-40px' })

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
                border: '1px solid rgba(99, 102, 241, 0.12)',
                borderRadius: '16px',
            }}
        >
            {/* Group header */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '20px',
                    color: group.color,
                }}
            >
                {group.icon}
                <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {group.label}
                </span>
            </div>

            {/* Skills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {group.skills.map((skill, i) => (
                    <motion.span
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.3, delay: index * 0.1 + i * 0.03 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '6px 12px',
                            background: `${group.color}0d`,
                            border: `1px solid ${group.color}25`,
                            borderRadius: '100px',
                            fontSize: '0.8rem',
                            color: '#94a3b8',
                            fontWeight: 500,
                            transition: 'all 0.2s',
                            cursor: 'default',
                        }}
                        whileHover={{
                            background: `${group.color}20`,
                            borderColor: `${group.color}50`,
                            color: '#f1f5f9',
                        }}
                    >
                        {skill.icon && <span style={{ color: group.color }}>{skill.icon}</span>}
                        {skill.name}
                    </motion.span>
                ))}
            </div>
        </motion.div>
    )
}

export default function Skills() {
    const headingRef = useRef<HTMLDivElement>(null)
    const inView = useInView(headingRef, { once: true, margin: '-80px' })

    return (
        <section id="skills" style={{ padding: '100px 24px', maxWidth: '1280px', margin: '0 auto' }}>
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
                    Skills
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    style={{
                        fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                        fontWeight: 800,
                        letterSpacing: '-0.03em',
                        marginBottom: '48px',
                        color: '#f1f5f9',
                    }}
                >
                    Tech I work with
                </motion.h2>
            </div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '20px',
                }}
            >
                {SKILL_GROUPS.map((group, i) => (
                    <SkillGroup key={group.label} group={group} index={i} />
                ))}
            </div>
        </section>
    )
}
