import { Component } from 'react'
import type { ReactNode, ErrorInfo, CSSProperties } from 'react'
import { COLORS } from '../../constants/colors'
import { glassCard } from '../../styles'

// ─── Props & State ────────────────────────────────────────────────────────────

export interface CanvasErrorBoundaryProps {
    /** The Three.js / R3F canvas subtree to protect. */
    children: ReactNode
    /**
     * Optional custom fallback UI.
     * Defaults to a centred glass-card message when omitted.
     */
    fallback?: ReactNode
}

interface CanvasErrorBoundaryState {
    hasError: boolean
    /** Error message surfaced only in development via console.error. */
    message: string
}

// ─── Stable style constant ────────────────────────────────────────────────────

const fallbackStyle: CSSProperties = {
    ...glassCard,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    gap: '8px',
    color: COLORS.textMuted,
    fontSize: '0.875rem',
    userSelect: 'none',
}

const iconStyle: CSSProperties = {
    fontSize: '1.5rem',
    color: COLORS.textSub,
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Class-based error boundary wrapping any Three.js / R3F `<Canvas>` subtree.
 *
 * Catches WebGL context failures and runtime Three.js errors so they do not
 * propagate to the root React tree and crash the entire portfolio.
 * Uses a class component because React's error boundary API (`getDerivedStateFromError` /
 * `componentDidCatch`) is only available on class components.
 */
export class CanvasErrorBoundary extends Component<
    CanvasErrorBoundaryProps,
    CanvasErrorBoundaryState
> {
    constructor(props: CanvasErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false, message: '' }
    }

    static getDerivedStateFromError(error: Error): CanvasErrorBoundaryState {
        return { hasError: true, message: error.message }
    }

    override componentDidCatch(error: Error, info: ErrorInfo): void {
        // Surface the full stack in development without crashing the app.
        console.error('[CanvasErrorBoundary] 3D rendering failed:', error, info)
    }

    override render(): ReactNode {
        if (this.state.hasError) {
            return (
                this.props.fallback ?? (
                    <div style={fallbackStyle} aria-label="3D content unavailable">
                        <span style={iconStyle} aria-hidden="true">⚠</span>
                        <span>3D rendering not available</span>
                    </div>
                )
            )
        }

        return this.props.children
    }
}
