import { motion } from 'framer-motion'
import { SiGoogleplay, SiAppstore } from 'react-icons/si'
import { SectionHeading, GlassCard, TagPill, AnimatedEntrance } from '../components/ui'
import { COLORS } from '../constants/colors'
import { STATS, BIO_PARAGRAPHS, ENTERPRISE_CLIENTS } from '../data/about'
import { useSectionInView } from '../hooks/useSectionInView'
import { gradientText, gradientTextShort } from '../styles'
import type { StatItem } from '../types'

interface StoreCardLink {
  label: string
  sub: string
  icon: React.ReactNode
  href: string
  color: string
  bg: string
  border: string
  hoverBg: string
  hoverBorder: string
}

const STORE_LINKS: StoreCardLink[] = [
  {
    label: 'Google Play',
    sub: '5+ apps published',
    icon: <SiGoogleplay size={18} />,
    href: 'https://play.google.com/store/apps/dev?id=7255636574877532443&hl=pt',
    color: '#34d399',
    bg: 'rgba(52,211,153,0.08)',
    border: 'rgba(52,211,153,0.25)',
    hoverBg: 'rgba(52,211,153,0.15)',
    hoverBorder: 'rgba(52,211,153,0.5)',
  },
  {
    label: 'App Store',
    sub: '5+ apps published',
    icon: <SiAppstore size={18} />,
    href: 'https://apps.apple.com/br/developer/realink-solucoes-em-jogos-eletronicos-ltda/id1563589903',
    color: '#60a5fa',
    bg: 'rgba(96,165,250,0.08)',
    border: 'rgba(96,165,250,0.25)',
    hoverBg: 'rgba(96,165,250,0.15)',
    hoverBorder: 'rgba(96,165,250,0.5)',
  },
]

function StatCard({ value, label, index }: StatItem & { index: number }) {
  const [ref, inView] = useSectionInView<HTMLDivElement>('-60px')

  return (
    <motion.div
      ref={ref}
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
              <AnimatedEntrance key={i} delay={0.2 + i * 0.1} inView={inView}>
                <p
                  style={{
                    color: '#94a3b8',
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
            <AnimatedEntrance delay={0.2} inView={inView}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
                {STATS.map((stat, i) => (
                  <StatCard key={stat.label} {...stat} index={i} />
                ))}
              </div>
            </AnimatedEntrance>

            {/* Enterprise Clients */}
            <AnimatedEntrance delay={0.5} inView={inView}>
              <GlassCard style={{ padding: '24px', marginBottom: '16px' }}>
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: COLORS.indigo,
                    fontWeight: 600,
                    marginBottom: '16px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  Enterprise Clients
                </div>
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
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: COLORS.indigo,
                    fontWeight: 600,
                    marginBottom: '16px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  Published on
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {STORE_LINKS.map(
                    ({ label, sub, icon, href, color, bg, border, hoverBg, hoverBorder }) => (
                      <a
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
                          border: `1px solid ${border}`,
                          borderRadius: '12px',
                          textDecoration: 'none',
                          transition:
                            'background 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s',
                          flex: '1 1 160px',
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget
                          el.style.background = hoverBg
                          el.style.borderColor = hoverBorder
                          el.style.transform = 'translateY(-2px)'
                          el.style.boxShadow = `0 8px 24px ${color}20`
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget
                          el.style.background = bg
                          el.style.borderColor = border
                          el.style.transform = 'translateY(0)'
                          el.style.boxShadow = 'none'
                        }}
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
                      </a>
                    )
                  )}
                </div>
              </GlassCard>
            </AnimatedEntrance>
          </div>
        </div>
      </div>
    </section>
  )
}
