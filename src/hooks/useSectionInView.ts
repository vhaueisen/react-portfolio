import { useInView } from 'framer-motion'
import { useRef } from 'react'

/** Extracts the exact `margin` type from Framer Motion's `useInView` signature. */
type InViewMargin = NonNullable<Parameters<typeof useInView>[1]>['margin']

/**
 * Returns a `[ref, inView]` tuple pre-configured with the portfolio's
 * standard entrance animation options (`once: true, margin: '-80px'`).
 *
 * Usage:
 * ```tsx
 * const [ref, inView] = useSectionInView<HTMLDivElement>()
 * ```
 */
export function useSectionInView<T extends Element = HTMLDivElement>(margin = '-80px') {
  const ref = useRef<T>(null)
  const inView = useInView(ref, { once: true, margin: margin as InViewMargin })
  return [ref, inView] as const
}
