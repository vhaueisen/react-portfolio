/**
 * Design token constants — mirrors the CSS @theme block in index.css.
 * Use these when you need palette values in TypeScript/TSX (e.g. dynamic
 * border colors, Three.js material colors, Framer Motion keyframes).
 */

export const COLORS = {
  // Backgrounds
  void: '#07070f',
  surface: '#0d0d1f',
  surface2: '#13132a',

  // Accents
  indigo: '#6366f1',
  cyan: '#22d3ee',
  purple: '#a855f7',

  // Text
  textPrimary: '#f1f5f9',
  textMuted: '#64748b',
  textSub: '#94a3b8',

  // Borders
  border: 'rgba(99, 102, 241, 0.15)',
  borderSubtle: 'rgba(99, 102, 241, 0.12)',

  // Brand accents (external store links)
  googlePlay: '#34d399',
  appStore: '#60a5fa',

  // Utility
  slate800: '#1e293b',
  slate700: '#334155',
  slate600: '#475569',
} as const

export type ColorKey = keyof typeof COLORS
