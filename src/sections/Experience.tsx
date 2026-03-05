import { motion } from 'framer-motion'
import { useRef, useState, useLayoutEffect, useMemo } from 'react'
import { COLORS, css } from '../constants/colors'
import { EXPERIENCE } from '../data/experience'
import { useScrollDrum, ITEM_HEIGHT, SCROLL_PER_ITEM } from '../hooks/useScrollDrum'
import { useSectionInView } from '../hooks/useSectionInView'
import { sectionLabel, sectionTitle, periodBadge, listReset, cardTitle } from '../styles'
import type { CSSProperties } from 'react'

// ── Layout constants ──────────────────────────────────────────────────────────
/** Gap between stacked detail cards in the right panel (px). */
const CARD_GAP = 0
/** Half the fixed 380 px viewport height — used to centre the active card. */
const CONTAINER_CENTER = 190

// ── Stable animation variants (module-scope prevents per-render re-allocation) ─
const labelVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
} as const

const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
} as const

const gridVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
} as const

// ── Module-scope style constants ──────────────────────────────────────────────
// void at 92% opacity — used for the top/bottom fade gradient edges
const voidAlpha92 = css('rgba(7,7,15,0.92)')

const expStickyContainerStyle: CSSProperties = {
    position: 'sticky',
    top: 0,
    height: '100vh',
    overflow: 'hidden',
}

const expInnerLayoutStyle: CSSProperties = {
    height: '100%',
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '48px',
}

const expPerspectiveStyle: CSSProperties = {
    perspective: '400px',
    perspectiveOrigin: '50% 50%',
}

const expDetailPanelStyle: CSSProperties = {
    position: 'relative',
    height: '380px',
    perspective: '1200px',
    perspectiveOrigin: '50% 50%',
    overflow: 'hidden',
}

const expDetailFadeStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(to bottom, ${voidAlpha92} 0%, transparent 18%, transparent 82%, ${voidAlpha92} 100%)`,
    pointerEvents: 'none',
    zIndex: 10,
}

const expCardHeaderStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '16px',
}

const expCompanyRowStyle: CSSProperties = {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    flexWrap: 'wrap',
}

const expBulletListStyle: CSSProperties = {
    ...listReset,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
}

/** Experience role `<h3>` — extends cardTitle with a bottom margin. */
const expRoleHeadingStyle: CSSProperties = {
    ...cardTitle,
    marginBottom: '5px',
}

export default function Experience() {
    const [headingRef, inView] = useSectionInView<HTMLDivElement>()
    const { scrollTrackRef, selectedIndex, drumPos } = useScrollDrum<HTMLDivElement>(
        EXPERIENCE.length
    )

    // ── Measure actual card heights so the stack centres correctly ──────────────
    const cardRefs = useRef<(HTMLDivElement | null)[]>([])
    const [cardHeights, setCardHeights] = useState<number[]>([])

    useLayoutEffect(() => {
        const measure = () => setCardHeights(cardRefs.current.map((el) => el?.offsetHeight ?? 0))
        measure()
        const ro = new ResizeObserver(measure)
        cardRefs.current.forEach((el) => el && ro.observe(el))
        return () => ro.disconnect()
    }, [])

    // ── Memoised geometry computations (driven by drumPos state at ~60fps) ───────
    const { cumOffsets, measured, activeCenter, stackTranslateY } = useMemo(() => {
        const offsets: number[] = []
        for (let i = 0; i < EXPERIENCE.length; i++) {
            offsets.push(i === 0 ? 0 : (offsets[i - 1] ?? 0) + (cardHeights[i - 1] ?? 0) + CARD_GAP)
        }
        const isMeasured = cardHeights.some((h) => h > 0)

        const floorIdx = Math.floor(drumPos)
        const ceilIdx = Math.min(Math.ceil(drumPos), EXPERIENCE.length - 1)
        const frac = drumPos - floorIdx
        const centerOf = (idx: number) => (offsets[idx] ?? 0) + (cardHeights[idx] ?? 0) / 2
        const center = isMeasured
            ? centerOf(floorIdx) + frac * (centerOf(ceilIdx) - centerOf(floorIdx))
            : floorIdx * 300

        return {
            cumOffsets: offsets,
            measured: isMeasured,
            activeCenter: center,
            stackTranslateY: isMeasured ? CONTAINER_CENTER - center : 0,
        }
    }, [cardHeights, drumPos])

    const item = EXPERIENCE[selectedIndex]

    return (
        // Outer element carries the section id for the navbar observer
        <section id="experience">
            <div
                ref={scrollTrackRef}
                style={{ height: `calc(100vh + ${(EXPERIENCE.length - 1) * SCROLL_PER_ITEM}px)` }}
            >
                <div style={expStickyContainerStyle}>
                    <div style={expInnerLayoutStyle}>
                        <div ref={headingRef}>
                            <motion.div
                                variants={labelVariants}
                                initial="hidden"
                                animate={inView ? 'visible' : 'hidden'}
                                transition={{ duration: 0.5 }}
                                style={sectionLabel}
                            >
                                Experience
                            </motion.div>
                            <motion.h2
                                variants={titleVariants}
                                initial="hidden"
                                animate={inView ? 'visible' : 'hidden'}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                style={sectionTitle}
                            >
                                Where I&#39;ve worked
                            </motion.h2>
                        </div>

                        <motion.div
                            className="exp-grid"
                            variants={gridVariants}
                            initial="hidden"
                            animate={inView ? 'visible' : 'hidden'}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            style={{ display: 'grid', alignItems: 'center' }}
                        >
                            {/* ── Vertical timeline (desktop) ── */}
                            <div
                                className="exp-timeline-vert"
                                style={{
                                    position: 'relative',
                                    height: EXPERIENCE.length * ITEM_HEIGHT,
                                    userSelect: 'none',
                                }}
                            >
                                {/* Background track */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        left: '6px',
                                        top: ITEM_HEIGHT / 2,
                                        width: '2px',
                                        height: (EXPERIENCE.length - 1) * ITEM_HEIGHT,
                                        background: COLORS.slate800,
                                        zIndex: 1,
                                    }}
                                />
                                {/* Progress fill — animates smoothly with drumPos */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        left: '6px',
                                        top: ITEM_HEIGHT / 2,
                                        width: '2px',
                                        height: `${Math.min(drumPos * ITEM_HEIGHT, (EXPERIENCE.length - 1) * ITEM_HEIGHT)}px`,
                                        background: `linear-gradient(to bottom, ${COLORS.indigo}, ${item.color})`,
                                        zIndex: 1,
                                    }}
                                />
                                {/* Dots — static, not tilted */}
                                {EXPERIENCE.map((exp, i) => (
                                    <div
                                        key={exp.company + '-dot'}
                                        style={{
                                            position: 'absolute',
                                            left: 0,
                                            top: i * ITEM_HEIGHT + ITEM_HEIGHT / 2 - 7,
                                            width: '14px',
                                            height: '14px',
                                            borderRadius: '50%',
                                            background: i <= selectedIndex ? exp.color : COLORS.slate950,
                                            border: `2px solid ${i <= selectedIndex ? exp.color : COLORS.slate700}`,
                                            boxShadow: i === selectedIndex ? `0 0 14px ${exp.color}` : 'none',
                                            zIndex: 3,
                                            transition: 'background 0.4s, border-color 0.4s, box-shadow 0.4s',
                                        }}
                                    />
                                ))}

                                {/* Text rows — perspective tilt driven by drumPos */}
                                <div style={expPerspectiveStyle}>
                                    {EXPERIENCE.map((exp, i) => {
                                        const dist = i - drumPos
                                        const absDist = Math.abs(dist)
                                        const opacity = Math.max(0.18, 1 - absDist * 0.26)
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
                                                        color: isActive ? exp.color : COLORS.slate300,
                                                        transition: 'color 0.35s',
                                                        lineHeight: 1.2,
                                                    }}
                                                >
                                                    {exp.company}
                                                </div>
                                                <div
                                                    style={{
                                                        fontSize: '0.75rem',
                                                        color: isActive ? COLORS.textMuted : COLORS.slate700,
                                                        marginTop: '2px',
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

                            {/* ── Horizontal timeline (mobile) ── */}
                            <div className="exp-timeline-horiz" style={{ userSelect: 'none' }}>
                                {/* Background track */}
                                <div style={{ position: 'relative' }}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            position: 'relative',
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: 'absolute',
                                                left: '7px',
                                                right: '7px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                height: '2px',
                                                background: COLORS.slate800,
                                                zIndex: 1,
                                            }}
                                        />
                                        {/* Progress fill — anchored right, grows left as we go deeper in history */}
                                        <div
                                            style={{
                                                position: 'absolute',
                                                right: '7px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                height: '2px',
                                                width:
                                                    EXPERIENCE.length > 1
                                                        ? `calc(${(Math.min(drumPos, EXPERIENCE.length - 1) / (EXPERIENCE.length - 1)) * 100}% - 14px)`
                                                        : '0',
                                                background: `linear-gradient(to left, ${COLORS.indigo}, ${item.color})`,
                                                zIndex: 2,
                                            }}
                                        />
                                        {/* Dots — oldest left, newest right */}
                                        {[...EXPERIENCE].reverse().map((exp, j) => {
                                            const origIndex = EXPERIENCE.length - 1 - j
                                            const isActive = origIndex === selectedIndex
                                            const isFilled = origIndex <= selectedIndex
                                            return (
                                                <div
                                                    key={exp.company + '-hdot'}
                                                    style={{
                                                        flex: 1,
                                                        display: 'flex',
                                                        justifyContent:
                                                            j === 0
                                                                ? 'flex-start'
                                                                : j === EXPERIENCE.length - 1
                                                                    ? 'flex-end'
                                                                    : 'center',
                                                        position: 'relative',
                                                        zIndex: 3,
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            width: '14px',
                                                            height: '14px',
                                                            borderRadius: '50%',
                                                            background: isFilled ? exp.color : COLORS.slate950,
                                                            border: `2px solid ${isFilled ? exp.color : COLORS.slate700}`,
                                                            boxShadow: isActive ? `0 0 14px ${exp.color}` : 'none',
                                                            transition: 'background 0.4s, border-color 0.4s, box-shadow 0.4s',
                                                        }}
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                    {/* Company labels */}
                                    <div style={{ display: 'flex', marginTop: '10px' }}>
                                        {[...EXPERIENCE].reverse().map((exp, j) => {
                                            const origIndex = EXPERIENCE.length - 1 - j
                                            const isActive = origIndex === selectedIndex
                                            return (
                                                <div
                                                    key={exp.company + '-hlabel'}
                                                    style={{
                                                        flex: 1,
                                                        fontSize: '0.65rem',
                                                        fontWeight: isActive ? 700 : 400,
                                                        color: isActive ? exp.color : COLORS.slate600,
                                                        transition: 'color 0.35s',
                                                        textAlign:
                                                            j === 0 ? 'left' : j === EXPERIENCE.length - 1 ? 'right' : 'center',
                                                    }}
                                                >
                                                    {exp.company}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* ── Detail panel — stacked cards, centred on active ── */}
                            <div style={expDetailPanelStyle}>
                                {/* Top/bottom fades */}
                                <div style={expDetailFadeStyle} />
                                {/* Whole stack slides so active card is always centred */}
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: `${CARD_GAP}px`,
                                        transform: `translateY(${stackTranslateY}px)`,
                                        willChange: 'transform',
                                    }}
                                >
                                    {EXPERIENCE.map((exp, i) => {
                                        // Pixel distance from this card's centre to the active centre
                                        const cardCenter = (cumOffsets[i] ?? 0) + (cardHeights[i] ?? 0) / 2
                                        const pixelDist = measured ? cardCenter - activeCenter : (i - drumPos) * 300
                                        const norm = pixelDist / 300
                                        const rotateX = pixelDist * -0.107 // ~32deg per 300px
                                        const opacity = Math.max(0, 1 - Math.abs(norm) * 0.55)
                                        const scale = Math.max(0.82, 1 - Math.abs(norm) * 0.08)
                                        const isActive = i === selectedIndex

                                        return (
                                            <div
                                                ref={(el) => {
                                                    cardRefs.current[i] = el
                                                }}
                                                key={exp.company}
                                                style={{
                                                    transform: `rotateX(${rotateX}deg) scale(${scale})`,
                                                    transformStyle: 'preserve-3d',
                                                    transformOrigin: 'center center',
                                                    opacity,
                                                    willChange: 'transform, opacity',
                                                    pointerEvents: isActive ? 'auto' : 'none',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        padding: '28px 32px',
                                                        background: isActive ? COLORS.surfaceGlassDark : COLORS.surfaceGlassDim,
                                                        backdropFilter: 'blur(12px)',
                                                        border: `1px solid ${exp.color}${isActive ? '40' : '18'}`,
                                                        borderRadius: '20px',
                                                        boxShadow: isActive ? `0 0 48px ${exp.color}15` : 'none',
                                                        transition: 'border-color 0.4s, background 0.4s, box-shadow 0.4s',
                                                    }}
                                                >
                                                    <div style={expCardHeaderStyle}>
                                                        <div>
                                                            <h3 style={expRoleHeadingStyle}>{exp.role}</h3>
                                                            <div style={expCompanyRowStyle}>
                                                                <span
                                                                    style={{ color: exp.color, fontWeight: 700, fontSize: '0.88rem' }}
                                                                >
                                                                    {exp.company}
                                                                </span>
                                                                <span style={{ color: COLORS.slate700 }}>·</span>
                                                                <span style={{ color: COLORS.slate600, fontSize: '0.78rem' }}>
                                                                    {exp.type}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <span style={periodBadge(exp.color)}>{exp.period}</span>
                                                    </div>

                                                    <div
                                                        style={{
                                                            height: '1px',
                                                            background: `linear-gradient(to right, ${exp.color}35, transparent)`,
                                                            marginBottom: '14px',
                                                        }}
                                                    />

                                                    <ul style={expBulletListStyle}>
                                                        {exp.bullets.map((bullet) => (
                                                            <li
                                                                key={bullet.slice(0, 40)}
                                                                style={{
                                                                    display: 'flex',
                                                                    gap: '9px',
                                                                    fontSize: '0.82rem',
                                                                    color: isActive ? COLORS.textSub : COLORS.slate600,
                                                                    lineHeight: 1.6,
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
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
