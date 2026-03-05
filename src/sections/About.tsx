import { motion } from 'framer-motion'
import { SectionHeading, GlassCard, TagPill, AnimatedEntrance } from '../components/ui'
import { COLORS } from '../constants/colors'
import { STATS, BIO_PARAGRAPHS, ENTERPRISE_CLIENTS, STORE_LINKS } from '../data/about'
import { useSectionInView } from '../hooks/useSectionInView'
import { gradientText, gradientTextShort, cardSectionLabel } from '../styles'
import type { StatItem } from '../types'

/** Named props interface — required by convention; prevents anonymous inline types. */
interface StatCardProps extends StatItem {
    index: number
    inView: boolean
}

function StatCard({ value, label, index, inView }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{
                padding: '28px',
                flex: '1 1 120px',
                textAlign: 'center',
                cursor: 'default',
                transition: 'border-color 0.3s',
            }}
            className="glass"
            whileHover={{ y: -4 }}
        >
            <div
                style={{
                    fontSize: '2.2rem',
                    fontWeight: 900,
                    lineHeight: 1.1,
                    marginBottom: '8px',
                    ...gradientText,
                }}
            >
                {value}
            </div>
            <div style={{ fontSize: '0.8rem', color: COLORS.textMuted, fontWeight: 500 }}>{label}</div>
        </motion.div>
    )
}

export default function About() {
    const [ref, inView] = useSectionInView<HTMLDivElement>()

    return (
        <section id="about" style={{ padding: '100px 24px', maxWidth: '1280px', margin: '0 auto' }}>
            <div ref={ref}>
                <SectionHeading
                    label="About"
                    title={
                        <>
                            Mobile dev with a <span style={gradientTextShort}>game dev soul</span>
                        </>
                    }
                    inView={inView}
                    titleStyle={{ marginBottom: '24px' }}
                />

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '64px',
                        alignItems: 'start',
                        marginTop: '24px',
                    }}
                >
                    {/* Bio — left column */}
                    <div>
                        {BIO_PARAGRAPHS.map((text, i) => (
                            <AnimatedEntrance key={text.slice(0, 30)} delay={0.2 + i * 0.1} inView={inView}>
                                <p
                                    style={{
                                        color: COLORS.textSub,
                                        lineHeight: 1.75,
                                        fontSize: '0.95rem',
                                        marginBottom: '16px',
                                    }}
                                >
                                    {text}
                                </p>
                            </AnimatedEntrance>
                        ))}
                    </div>

                    {/* Stats + cards — right column */}
                    <div>
                        {/* Stats */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
                            {STATS.map((stat, i) => (
                                <StatCard key={stat.label} {...stat} index={i} inView={inView} />
                            ))}
                        </div>

                        {/* Enterprise Clients */}
                        <AnimatedEntrance delay={0.5} inView={inView}>
                            <GlassCard style={{ padding: '24px', marginBottom: '16px' }}>
                                <div style={cardSectionLabel()}>Enterprise Clients</div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                    {ENTERPRISE_CLIENTS.map((client) => (
                                        <TagPill key={client} label={client} color={COLORS.indigo} />
                                    ))}
                                </div>
                            </GlassCard>
                        </AnimatedEntrance>

                        {/* Published on */}
                        <AnimatedEntrance delay={0.65} inView={inView}>
                            <GlassCard style={{ padding: '24px' }}>
                                <div style={cardSectionLabel()}>Published on</div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                                    {STORE_LINKS.map(({ label, sub, icon, href, color, bg, border, hoverBg, hoverBorder }) => (
                                        // motion.a + whileHover replaces onMouseEnter/onMouseLeave imperative mutations.
                                        // Per-link accent colors are safely passed as Framer Motion animated values.
                                        <motion.a
                                            key={label}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                padding: '12px 18px',
                                                background: bg,
                                                borderWidth: '1px',
                                                borderStyle: 'solid',
                                                borderColor: border,
                                                borderRadius: '12px',
                                                textDecoration: 'none',
                                                flex: '1 1 160px',
                                            }}
                                            whileHover={{
                                                background: hoverBg,
                                                borderColor: hoverBorder,
                                                y: -2,
                                                boxShadow: `0 8px 24px ${color}20`,
                                            }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <span style={{ color, flexShrink: 0 }}>{icon}</span>
                                            <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                                <span
                                                    style={{
                                                        fontSize: '0.85rem',
                                                        fontWeight: 700,
                                                        color: COLORS.textPrimary,
                                                    }}
                                                >
                                                    {label}
                                                </span>
                                                <span style={{ fontSize: '0.72rem', color, opacity: 0.85 }}>{sub}</span>
                                            </span>
                                        </motion.a>
                                    ))}
                                </div>
                            </GlassCard>
                        </AnimatedEntrance>
                    </div>
                </div>
            </div>
        </section>
    )
}
