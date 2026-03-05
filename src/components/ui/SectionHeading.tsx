import { motion } from 'framer-motion'
import { sectionLabel, sectionTitle } from '../../styles'

interface SectionHeadingProps {
    /** Small uppercase category label above the title (e.g. "About"). */
    label: string
    /** Main h2 title. Can include `<span>` for gradient words. */
    title: React.ReactNode
    /** Optional subtitle paragraph below the title. */
    subtitle?: string
    /** Drive entrance animations from a parent `useSectionInView` call. */
    inView: boolean
    /** Tailwind / style overrides on the h2. */
    titleStyle?: React.CSSProperties
    className?: string
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
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5 }}
                style={sectionLabel}
            >
                {label}
            </motion.div>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{ ...sectionTitle, ...titleStyle }}
            >
                {title}
            </motion.h2>

            {subtitle && (
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-[#64748b] text-[0.95rem] mt-4"
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    )
}
