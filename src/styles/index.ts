import { COLORS } from '../constants/colors'
import type { CSSColor } from '../constants/colors'
import type { CSSProperties } from 'react'

// ─── Cards ───────────────────────────────────────────────────────────────────

export const glassCard: CSSProperties = {
  background: COLORS.surfaceGlass,
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: `1px solid ${COLORS.border}`,
  borderRadius: '16px',
}

export const glassCardActive: CSSProperties = {
  ...glassCard,
  background: COLORS.surfaceGlassDark,
}

// ─── Typography ──────────────────────────────────────────────────────────────

export const gradientText: CSSProperties = {
  background: `linear-gradient(135deg, ${COLORS.indigo} 0%, ${COLORS.cyan} 50%, ${COLORS.purple} 100%)`,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}

export const gradientTextShort: CSSProperties = {
  background: `linear-gradient(135deg, ${COLORS.indigo}, ${COLORS.cyan})`,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}

export const sectionLabel: CSSProperties = {
  fontSize: '0.8rem',
  textTransform: 'uppercase',
  letterSpacing: '0.15em',
  color: COLORS.indigo,
  fontWeight: 600,
  marginBottom: '12px',
}

export const sectionTitle: CSSProperties = {
  fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
  fontWeight: 800,
  letterSpacing: '-0.03em',
  color: COLORS.textPrimary,
}

// ─── Dynamic style helpers ────────────────────────────────────────────────────

/** Pill/badge style for a given accent color. */
export function tagPill(color: string): CSSProperties {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '3px 10px',
    background: `${color}12`,
    border: `1px solid ${color}25`,
    borderRadius: '100px',
    fontSize: '0.72rem',
    color: COLORS.textSub,
    fontWeight: 500,
  }
}

/** Period badge style for experience/projects. */
export function periodBadge(color: string): CSSProperties {
  return {
    padding: '4px 12px',
    background: `${color}15`,
    border: `1px solid ${color}35`,
    borderRadius: '100px',
    fontSize: '0.72rem',
    color,
    fontWeight: 600,
    whiteSpace: 'nowrap',
  }
}

/** Icon container used in cards (glass icon box). */
export function iconBox(color: string): CSSProperties {
  return {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: `${color}15`,
    border: `1px solid ${color}30`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color,
    flexShrink: 0,
  }
}

/** Accentuated border for hover/active glass cards. */
export function accentBorder(color: string, active = false): CSSProperties {
  return {
    border: `1px solid ${active ? `${color}50` : COLORS.borderSubtle}`,
    boxShadow: active ? `0 16px 40px ${color}20` : 'none',
  }
}

// ─── Gradients ───────────────────────────────────────────────────────────────

export const indigoCyanGradient = `linear-gradient(135deg, ${COLORS.indigo}, ${COLORS.cyan})`
export const indigoPurpleGradient = `linear-gradient(135deg, ${COLORS.indigo}, ${COLORS.purple})`

// ─── Hero ────────────────────────────────────────────────────────────────────

/**
 * Gradient clip applied to each animated character in the Hero name.
 * Starts at textPrimary (near-white) so early chars appear white before
 * transitioning into the indigo → cyan brand palette.
 * Dynamic `whiteSpace`/`minWidth` overrides are spread at the call site.
 */
export const heroNameGradient: CSSProperties = {
  display: 'inline-block',
  background: `linear-gradient(135deg, ${COLORS.textPrimary} 30%, ${COLORS.indigo} 80%, ${COLORS.cyan} 100%)`,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}

/**
 * Glass pill badge for the Hero "Available for Remote Roles" indicator.
 * Uses hex-alpha notation on COLORS.indigo to avoid repeating raw rgba literals.
 */
export const heroBadge: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '6px 14px',
  background: `${COLORS.indigo}1f`, // ~12% opacity
  border: `1px solid ${COLORS.indigo}4d`, // ~30% opacity
  borderRadius: '100px',
  fontSize: '0.8rem',
  color: COLORS.cyan,
  fontWeight: 500,
  marginBottom: '24px',
}

// ─── Utility helpers ─────────────────────────────────────────────────────────

/**
 * Small uppercase sub-label used inside glass cards
 * (e.g. “Enterprise Clients”, “Published on”).
 * Extracted here to prevent the ~6-property object from being duplicated
 * per call site in the About section (and any future cards).
 */
export function cardSectionLabel(color: CSSColor = COLORS.indigo): CSSProperties {
  return {
    fontSize: '0.75rem',
    color,
    fontWeight: 600,
    marginBottom: '16px',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  }
}
