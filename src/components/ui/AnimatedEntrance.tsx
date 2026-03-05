import { motion } from 'framer-motion'
import type { ReactNode, CSSProperties } from 'react'

interface AnimatedEntranceProps {
  children: ReactNode
  /** Additional delay in seconds on top of any stagger from the parent. */
  delay?: number
  /**
   * Starting Y offset in pixels. Defaults to 20.
   * Pass 0 for fade-only, negative for slide-down-in.
   */
  yOffset?: number
  /** Drive the animation from a parent `inView` boolean. */
  inView?: boolean
  style?: CSSProperties
  className?: string
}

/**
 * Standard `{ opacity: 0, y } → { opacity: 1, y: 0 }` entrance animation.
 *
 * Eliminates boilerplate Framer Motion `initial` / `animate` repetition
 * across every section. When `inView` is omitted the animation fires
 * immediately on mount (useful for Hero where there is no scroll trigger).
 */
export function AnimatedEntrance({
  children,
  delay = 0,
  yOffset = 20,
  inView,
  style,
  className,
}: AnimatedEntranceProps) {
  const shouldAnimate = inView === undefined ? true : inView

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  )
}
