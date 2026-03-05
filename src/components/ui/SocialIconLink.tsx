import { COLORS } from '../../constants/colors'
import type { ReactNode } from 'react'

interface SocialIconLinkProps {
  href: string
  icon: ReactNode
  /** Accessible label for screen readers. */
  label: string
  /** Color the icon transitions to on hover. Defaults to textPrimary. */
  hoverColor?: string
  /** Whether to open in a new tab (default: true). */
  newTab?: boolean
}

/**
 * An anchor wrapper for icon-based social/external links with a
 * CSS-transition hover color swap — replaces the verbose `onMouseEnter` /
 * `onMouseLeave` handler pattern scattered across Hero, Navbar, and Contact.
 *
 * Uses a CSS custom property on the element so a single `transition` rule
 * handles the color change without JS state.
 */
export function SocialIconLink({
  href,
  icon,
  label,
  hoverColor = COLORS.textPrimary,
  newTab = true,
}: SocialIconLinkProps) {
  return (
    <a
      href={href}
      aria-label={label}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noopener noreferrer' : undefined}
      className="social-icon-link"
      style={
        {
          color: COLORS.textMuted,
          display: 'flex',
          alignItems: 'center',
          '--hover-color': hoverColor,
        } as React.CSSProperties
      }
    >
      {icon}
      <style>{`
                .social-icon-link {
                    transition: color 0.2s;
                }
                .social-icon-link:hover {
                    color: var(--hover-color) !important;
                }
            `}</style>
    </a>
  )
}
