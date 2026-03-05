import { motion } from 'framer-motion'
import { COLORS } from '../../constants/colors'
import { sectionLabel, sectionTitle } from '../../styles'
import type { Variants } from 'framer-motion'
import type { ReactNode, CSSProperties } from 'react'

interface SectionHeadingProps {
  /** Small uppercase category label above the title (e.g. "About"). */
  label: string
  /** Main h2 title. Can include `<span>` for gradient words. */
  title: ReactNode
  /** Optional subtitle paragraph below the title. */
  subtitle?: string
  /** Drive entrance animations from a parent `useSectionInView` call. */
  inView: boolean
  /** Optional style overrides on the h2. */
  titleStyle?: CSSProperties
  className?: string
}

// Animation variants are defined outside the component so they are stable
// references — not recreated on every render (Framer Motion best practice).

const labelVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
}

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
}

const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
}

/**
 * Standardised section heading block used in every portfolio section.
 * Replaces ~20 lines of near-identical Framer Motion boilerplate per section.
 */
export function SectionHeading({
  label,
  title,
  subtitle,
  inView,
  titleStyle,
  className,
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <motion.div
        variants={labelVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        style={sectionLabel}
      >
        {label}
      </motion.div>

      <motion.h2
        variants={titleVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        style={{ ...sectionTitle, ...titleStyle }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={subtitleVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ color: COLORS.textMuted, fontSize: '0.95rem', marginTop: '1rem' }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
