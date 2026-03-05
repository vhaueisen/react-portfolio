import type { CSSProperties } from 'react'
import { COLORS } from '../constants/colors'

/**
 * Reusable style objects for patterns that appear across 3+ components.
 * Use Tailwind for single-property overrides; use these constants for
 * multi-property compound styles that can't be expressed cleanly as
 * individual utility classes (glassmorphism, gradient-clip, 3D transforms).
 */

// ─── Cards ───────────────────────────────────────────────────────────────────

export const glassCard: CSSProperties = {
    background:           'rgba(13, 13, 31, 0.7)',
    backdropFilter:        'blur(12px)',
    WebkitBackdropFilter:  'blur(12px)',
    border:                '1px solid rgba(99, 102, 241, 0.15)',
    borderRadius:          '16px',
}

export const glassCardActive: CSSProperties = {
    ...glassCard,
    background: 'rgba(13, 13, 31, 0.85)',
}

// ─── Typography ──────────────────────────────────────────────────────────────

export const gradientText: CSSProperties = {
    background:            'linear-gradient(135deg, #6366f1 0%, #22d3ee 50%, #a855f7 100%)',
    WebkitBackgroundClip:  'text',
    backgroundClip:        'text',
    WebkitTextFillColor:   'transparent',
}

export const gradientTextShort: CSSProperties = {
    background:            'linear-gradient(135deg, #6366f1, #22d3ee)',
    WebkitBackgroundClip:  'text',
    backgroundClip:        'text',
    WebkitTextFillColor:   'transparent',
}

export const sectionLabel: CSSProperties = {
    fontSize:       '0.8rem',
    textTransform:  'uppercase',
    letterSpacing:  '0.15em',
    color:          COLORS.indigo,
    fontWeight:     600,
    marginBottom:   '12px',
}

export const sectionTitle: CSSProperties = {
    fontSize:      'clamp(1.8rem, 4vw, 2.5rem)',
    fontWeight:    800,
    letterSpacing: '-0.03em',
    color:         COLORS.textPrimary,
}

// ─── Dynamic style helpers ────────────────────────────────────────────────────

/** Pill/badge style for a given accent color. */
export function tagPill(color: string): CSSProperties {
    return {
        display:      'inline-flex',
        alignItems:   'center',
        gap:          '6px',
        padding:      '3px 10px',
        background:   `${color}12`,
        border:       `1px solid ${color}25`,
        borderRadius: '100px',
        fontSize:     '0.72rem',
        color:        COLORS.textSub,
        fontWeight:   500,
    }
}

/** Period badge style for experience/projects. */
export function periodBadge(color: string): CSSProperties {
    return {
        padding:      '4px 12px',
        background:   `${color}15`,
        border:       `1px solid ${color}35`,
        borderRadius: '100px',
        fontSize:     '0.72rem',
        color,
        fontWeight:   600,
        whiteSpace:   'nowrap',
    }
}

/** Icon container used in cards (glass icon box). */
export function iconBox(color: string): CSSProperties {
    return {
        width:          '40px',
        height:         '40px',
        borderRadius:   '10px',
        background:     `${color}15`,
        border:         `1px solid ${color}30`,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        color,
        flexShrink:     0,
    }
}

/** Accentuated border for hover/active glass cards. */
export function accentBorder(color: string, active = false): CSSProperties {
    return {
        border: `1px solid ${active ? `${color}50` : 'rgba(99,102,241,0.12)'}`,
        boxShadow: active ? `0 16px 40px ${color}20` : 'none',
    }
}

// ─── Gradients ───────────────────────────────────────────────────────────────

export const indigoCyanGradient = 'linear-gradient(135deg, #6366f1, #22d3ee)'
export const indigoPurpleGradient = 'linear-gradient(135deg, #6366f1, #a855f7)'
