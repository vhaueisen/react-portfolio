import { useInView } from 'framer-motion'
import { useRef } from 'react'

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inView = useInView(ref, { once: true, margin: margin as any })
  return [ref, inView] as const
}
