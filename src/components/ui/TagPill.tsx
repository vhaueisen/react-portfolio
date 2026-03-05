import { tagPill } from '../../styles'
import type { ReactNode } from 'react'

interface TagPillProps {
  label: string
  /** Accent color for the background tint and border. */
  color: string
  /** Optional leading icon. */
  icon?: ReactNode
}

/**
 * A single tag/badge pill used in Projects (tags), Skills (skill badges),
 * and About (enterprise client names).
 */
export function TagPill({ label, color, icon }: TagPillProps) {
  return (
    <span style={tagPill(color)}>
      {icon && <span style={{ color }}>{icon}</span>}
      {label}
    </span>
  )
}
