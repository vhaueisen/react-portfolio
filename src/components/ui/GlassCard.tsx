import { glassCard, accentBorder } from '../../styles'
import type { CSSProperties, ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  /** Optional accent color — tints the border when `active` is true. */
  accentColor?: string
  /** When true, applies a stronger border + glow in the accent color. */
  active?: boolean
  style?: CSSProperties
  className?: string
  onClick?: () => void
}

/**
 * A reusable glassmorphism card that encapsulates the repeated
 * `rgba(13,13,31,0.7)` + `backdropFilter` + `border` pattern.
 *
 * Pass `accentColor` + `active` to get the hover/focus accent treatment.
 */
export function GlassCard({
  children,
  accentColor,
  active = false,
  style,
  className,
  onClick,
}: GlassCardProps) {
  const borderStyle: CSSProperties = accentColor ? accentBorder(accentColor, active) : {}

  return (
    <div style={{ ...glassCard, ...borderStyle, ...style }} className={className} onClick={onClick}>
      {children}
    </div>
  )
}
