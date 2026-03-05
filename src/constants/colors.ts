/**
 * Design token constants — mirrors the CSS @theme block in index.css.
 * Use these when you need palette values in TypeScript/TSX (e.g. dynamic
 * border colors, Three.js material colors, Framer Motion keyframes).
 */

/**
 * Branded type for verified CSS color values.
 * Prevents raw string literals from being passed where a design token is expected.
 * Use `COLORS.*` or the `css()` helper for computed alpha variants.
 */
export type CSSColor = string & { readonly __brand: 'CSSColor' }

/**
 * Cast a verified CSS color literal to the branded `CSSColor` type.
 * Use for computed alpha variants that can't be expressed as a direct COLORS token:
 * `css(\`rgba(99, 102, 241, 0.15)\`)`
 */
export const css = (v: string): CSSColor => v as CSSColor

export const COLORS = {
    // Backgrounds
    void: css('#07070f'),
    surface: css('#0d0d1f'),
    surface2: css('#13132a'),

    // Accents
    indigo: css('#6366f1'),
    cyan: css('#22d3ee'),
    purple: css('#a855f7'),

    // Text
    textPrimary: css('#f1f5f9'),
    textMuted: css('#64748b'),
    textSub: css('#94a3b8'),

    // Borders
    border: css('rgba(99, 102, 241, 0.15)'),
    borderSubtle: css('rgba(99, 102, 241, 0.12)'),

    // Brand accents (external store links)
    googlePlay: css('#34d399'),
    appStore: css('#60a5fa'),

    // Glass surface variants (surface color with alpha — for glassCard patterns)
    surfaceGlass: css('rgba(13, 13, 31, 0.7)'),
    surfaceGlassDark: css('rgba(13, 13, 31, 0.85)'),
    /** Dimmed glass — used for inactive drum-roll cards in the Experience section. */
    surfaceGlassDim: css('rgba(13, 13, 31, 0.5)'),

    // Navigation hover/scroll backdrops (COLORS.void at different alpha levels)
    /** Navbar scrolled background — void at 85% opacity. */
    navBackground: css('rgba(7, 7, 15, 0.85)'),
    /** Mobile dropdown background — void at 95% opacity. */
    navMobileBackground: css('rgba(7, 7, 15, 0.95)'),

    // Three.js scene lighting — Hero canvas theatrical purples
    deepPurple: css('#2e1065'),
    violetSky: css('#4c1d95'),
    violet: css('#7c3aed'),

    // Utility
    slate950: css('#0f172a'),
    slate800: css('#1e293b'),
    slate700: css('#334155'),
    slate600: css('#475569'),
    slate300: css('#cbd5e1'),
    /** Very faint white — used for subtle card borders/separators on dark surfaces. */
    whiteFaint: css('rgba(255,255,255,0.04)'),
} as const

export type ColorKey = keyof typeof COLORS