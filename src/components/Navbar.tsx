import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FiX, FiMenu } from 'react-icons/fi'
import { COLORS } from '../constants/colors'
import { NAV_LINKS, RESUME_URL } from '../constants/navigation'
import { useScrollActive } from '../hooks/useScrollActive'
import { gradientTextShort, indigoCyanGradient90 } from '../styles'
import type { CSSProperties } from 'react'

// ── Scroll-state style constants ────────────────────────────────────────────────
// Defined at module scope so the objects are stable references (no per-render alloc).

/** Static layout/positioning properties shared by both nav states. */
const navBaseStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    padding: '0 24px',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'background 0.3s ease, backdrop-filter 0.3s ease',
}

const navScrolledStyle: CSSProperties = {
    background: COLORS.navBackground,
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderBottom: `1px solid ${COLORS.border}`,
}

const navTransparentStyle: CSSProperties = {
    background: 'transparent',
    backdropFilter: 'none',
    WebkitBackdropFilter: 'none',
    borderBottom: '1px solid transparent',
}

/** Mobile dropdown panel styles. */
const navMobileDropdownStyle: CSSProperties = {
    position: 'absolute',
    top: '64px',
    left: 0,
    right: 0,
    background: COLORS.navMobileBackground,
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderBottom: `1px solid ${COLORS.border}`,
    padding: '16px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
}

/** Hamburger / close toggle button. */
const navHamburgerStyle: CSSProperties = {
    background: 'none',
    border: 'none',
    color: COLORS.textPrimary,
    cursor: 'pointer',
    fontSize: '1.5rem',
    padding: '4px',
}

/** Active-section indicator dot in the mobile nav. */
const navActiveDotStyle: CSSProperties = {
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    background: COLORS.indigo,
    flexShrink: 0,
}

/** Active nav-link underline bar — horizontal gradient, spring-animated via layoutId. */
const navUnderlineStyle: CSSProperties = {
    position: 'absolute',
    bottom: -2,
    left: 0,
    right: 0,
    height: '2px',
    background: indigoCyanGradient90,
    borderRadius: '1px',
}

/** Desktop nav row. */
const navDesktopNavStyle: CSSProperties = {
    display: 'flex',
    gap: '32px',
    alignItems: 'center',
}

function scrollTo(href: string) {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const { scrolled, activeSection } = useScrollActive()

    const handleNavClick = (href: string) => {
        setMobileOpen(false)
        scrollTo(href)
    }

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
                ...navBaseStyle,
                ...(scrolled ? navScrolledStyle : navTransparentStyle),
            }}
        >
            {/* Logo */}
            <a
                href="#hero"
                onClick={(e) => {
                    e.preventDefault()
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                style={{
                    cursor: 'pointer',
                    fontWeight: 800,
                    fontSize: '1.2rem',
                    letterSpacing: '-0.02em',
                    ...gradientTextShort,
                }}
            >
                VH
            </a>

            {/* Desktop nav */}
            <nav className="nav-desktop" style={navDesktopNavStyle}>
                {NAV_LINKS.map((link) => {
                    const isActive = activeSection === link.href.replace('#', '')
                    return (
                        <NavButton
                            key={link.href}
                            label={link.label}
                            href={link.href}
                            isActive={isActive}
                            onClick={() => handleNavClick(link.href)}
                        />
                    )
                })}
                <ResumeButton />
            </nav>

            {/* Mobile hamburger */}
            <button
                onClick={() => setMobileOpen((o) => !o)}
                className="nav-mobile-toggle"
                aria-label="Toggle menu"
                style={navHamburgerStyle}
            >
                {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>

            {/* Mobile dropdown — AnimatePresence enables the exit animation on close */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        style={navMobileDropdownStyle}
                    >
                        {NAV_LINKS.map((link) => {
                            const isActive = activeSection === link.href.replace('#', '')
                            return (
                                <MobileNavButton
                                    key={link.href}
                                    label={link.label}
                                    href={link.href}
                                    isActive={isActive}
                                    onClick={() => handleNavClick(link.href)}
                                />
                            )
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface NavButtonProps {
    label: string
    href: string
    isActive: boolean
    onClick: () => void
}

function NavButton({ label, href, isActive, onClick }: NavButtonProps) {
    return (
        <a
            href={href}
            onClick={(e) => {
                e.preventDefault()
                onClick()
            }}
            className="nav-link"
            style={{
                color: isActive ? COLORS.textPrimary : COLORS.textMuted,
                fontSize: '0.875rem',
                fontWeight: isActive ? 600 : 500,
                cursor: 'pointer',
                padding: '4px 0',
                position: 'relative',
                transition: 'color 0.25s',
            }}
        >
            {label}
            {isActive && (
                <motion.span
                    layoutId="nav-underline"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    style={navUnderlineStyle}
                />
            )}
        </a>
    )
}

function MobileNavButton({ label, href, isActive, onClick }: NavButtonProps) {
    return (
        <a
            href={href}
            onClick={(e) => {
                e.preventDefault()
                onClick()
            }}
            className="nav-mobile-link"
            style={{
                color: isActive ? COLORS.textPrimary : COLORS.textMuted,
                fontSize: '1rem',
                fontWeight: isActive ? 600 : 500,
                cursor: 'pointer',
                padding: '12px 0',
                borderBottom: `1px solid ${COLORS.borderSubtle}`,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'color 0.2s',
            }}
        >
            {isActive && <span style={navActiveDotStyle} />}
            {label}
        </a>
    )
}

function ResumeButton() {
    return (
        <a
            href={RESUME_URL}
            download
            className="nav-resume-btn"
            style={{
                padding: '8px 20px',
                border: `1px solid ${COLORS.indigo}80`,
                borderRadius: '8px',
                color: COLORS.indigo,
                fontSize: '0.875rem',
                fontWeight: 600,
                transition: 'background 0.2s, border-color 0.2s',
                cursor: 'pointer',
            }}
        >
            Resume
        </a>
    )
}
