import { motion } from 'framer-motion'
import { SectionHeading } from '../components/ui'
import { COLORS } from '../constants/colors'
import { EXPERIENCE, ITEM_HEIGHT, SCROLL_PER_ITEM } from '../data/experience'
import { useScrollDrum } from '../hooks/useScrollDrum'
import { useSectionInView } from '../hooks/useSectionInView'
import type { ExperienceItem } from '../types'

// ─── Timeline column ──────────────────────────────────────────────────────────

interface TimelineProps {
  items: ExperienceItem[]
  selectedIndex: number
  drumPos: number
}

function Timeline({ items, selectedIndex, drumPos }: TimelineProps) {
  const activeItem = items[selectedIndex]

  return (
    <div style={{ position: 'relative', height: items.length * ITEM_HEIGHT, userSelect: 'none' }}>
      {/* Background track */}
      <div
        style={{
          position: 'absolute',
          left: '6px',
          top: ITEM_HEIGHT / 2,
          width: '2px',
          height: (items.length - 1) * ITEM_HEIGHT,
          background: COLORS.slate800,
          zIndex: 1,
        }}
      />

      {/* Progress fill */}
      <div
        style={{
          position: 'absolute',
          left: '6px',
          top: ITEM_HEIGHT / 2,
          width: '2px',
          height: `${Math.min(drumPos * ITEM_HEIGHT, (items.length - 1) * ITEM_HEIGHT)}px`,
          background: `linear-gradient(to bottom, ${COLORS.indigo}, ${activeItem.color})`,
          zIndex: 1,
          transition: 'height 0.25s ease, background 0.4s',
        }}
      />

      {/* Step dots */}
      {items.map((exp, i) => (
        <div
          key={`${exp.company}-dot`}
          style={{
            position: 'absolute',
            left: 0,
            top: i * ITEM_HEIGHT + ITEM_HEIGHT / 2 - 7,
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            background: i <= selectedIndex ? exp.color : '#0f172a',
            border: `2px solid ${i <= selectedIndex ? exp.color : COLORS.slate700}`,
            boxShadow: i === selectedIndex ? `0 0 14px ${exp.color}` : 'none',
            zIndex: 3,
            transition: 'background 0.4s, border-color 0.4s, box-shadow 0.4s',
          }}
        />
      ))}

      {/* Text rows with perspective tilt */}
      <div style={{ perspective: '400px', perspectiveOrigin: '50% 50%' }}>
        {items.map((exp, i) => {
          const dist = i - drumPos
          const opacity = Math.max(0.18, 1 - Math.abs(dist) * 0.26)
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
              <div
                style={{
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  lineHeight: 1.2,
                  color: isActive ? exp.color : '#cbd5e1',
                  transition: 'color 0.35s',
                }}
              >
                {exp.company}
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  marginTop: '2px',
                  color: isActive ? COLORS.textMuted : COLORS.slate700,
                  transition: 'color 0.35s',
                }}
              >
                {exp.role}
              </div>
              <span
                style={{
                  display: 'inline-block',
                  marginTop: '5px',
                  padding: '2px 10px',
                  background: isActive ? `${exp.color}15` : 'transparent',
                  border: `1px solid ${isActive ? exp.color + '35' : 'transparent'}`,
                  borderRadius: '100px',
                  fontSize: '0.68rem',
                  color: isActive ? exp.color : COLORS.slate600,
                  fontWeight: 500,
                  width: 'fit-content',
                  transition: 'all 0.35s',
                }}
              >
                {exp.period}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Detail drum panel ────────────────────────────────────────────────────────

interface DetailDrumProps {
  items: ExperienceItem[]
  selectedIndex: number
  drumPos: number
}

function DetailDrum({ items, selectedIndex, drumPos }: DetailDrumProps) {
  const SLOT = 300
  const TILT = 32

  return (
    <div
      style={{
        position: 'relative',
        height: '380px',
        perspective: '1200px',
        perspectiveOrigin: '50% 50%',
        overflow: 'hidden',
      }}
    >
      {/* Cylinder fades */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 10,
          background:
            'linear-gradient(to bottom, rgba(7,7,15,0.92) 0%, transparent 18%, transparent 82%, rgba(7,7,15,0.92) 100%)',
        }}
      />

      {items.map((exp, i) => {
        const dist = i - drumPos
        const absDist = Math.abs(dist)
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
              top: 0,
              left: 0,
              right: 0,
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
            <div
              style={{
                width: '100%',
                padding: '28px 32px',
                background: isActive ? 'rgba(13,13,31,0.85)' : 'rgba(13,13,31,0.5)',
                backdropFilter: 'blur(12px)',
                border: `1px solid ${exp.color}${isActive ? '40' : '18'}`,
                borderRadius: '20px',
                boxShadow: isActive ? `0 0 48px ${exp.color}15` : 'none',
                transition: 'border-color 0.4s, background 0.4s, box-shadow 0.4s',
              }}
            >
              {/* Card header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '10px',
                  marginBottom: '16px',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: COLORS.textPrimary,
                      marginBottom: '5px',
                    }}
                  >
                    {exp.role}
                  </h3>
                  <div
                    style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}
                  >
                    <span style={{ color: exp.color, fontWeight: 700, fontSize: '0.88rem' }}>
                      {exp.company}
                    </span>
                    <span style={{ color: COLORS.slate700 }}>·</span>
                    <span style={{ color: COLORS.slate600, fontSize: '0.78rem' }}>{exp.type}</span>
                  </div>
                </div>
                <span
                  style={{
                    padding: '4px 12px',
                    background: `${exp.color}15`,
                    border: `1px solid ${exp.color}35`,
                    borderRadius: '100px',
                    fontSize: '0.72rem',
                    color: exp.color,
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {exp.period}
                </span>
              </div>

              {/* Accent divider */}
              <div
                style={{
                  height: '1px',
                  marginBottom: '14px',
                  background: `linear-gradient(to right, ${exp.color}35, transparent)`,
                }}
              />

              {/* Bullet points */}
              <ul
                style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}
              >
                {exp.bullets.map((bullet, bi) => (
                  <li
                    key={bi}
                    style={{
                      display: 'flex',
                      gap: '9px',
                      lineHeight: 1.6,
                      fontSize: '0.82rem',
                      color: isActive ? COLORS.textSub : COLORS.slate600,
                      transition: 'color 0.4s',
                    }}
                  >
                    <span
                      style={{
                        color: exp.color,
                        flexShrink: 0,
                        marginTop: '3px',
                        opacity: isActive ? 1 : 0.4,
                      }}
                    >
                      ▸
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Experience() {
  const [headingRef, inView] = useSectionInView<HTMLDivElement>()
  const { scrollTrackRef, selectedIndex, drumPos } = useScrollDrum(EXPERIENCE.length)

  return (
    <section id="experience">
      {/*
       * The outer div is intentionally tall:
       *   100vh (sticky panel) + (n–1) * SCROLL_PER_ITEM (scroll budget per item)
       * The inner sticky panel stays fixed while the browser scrolls through that
       * extra height, which maps to drumPos via useScrollDrum.
       */}
      <div
        ref={scrollTrackRef}
        style={{ height: `calc(100vh + ${(EXPERIENCE.length - 1) * SCROLL_PER_ITEM}px)` }}
      >
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              maxWidth: '1100px',
              margin: '0 auto',
              padding: '0 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '48px',
            }}
          >
            <div ref={headingRef}>
              <SectionHeading label="Experience" title="Where I've worked" inView={inView} />
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
              <Timeline items={EXPERIENCE} selectedIndex={selectedIndex} drumPos={drumPos} />
              <DetailDrum items={EXPERIENCE} selectedIndex={selectedIndex} drumPos={drumPos} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
