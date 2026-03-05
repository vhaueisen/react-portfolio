import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollActive } from '../hooks/useScrollActive'
import { NAV_LINKS, RESUME_URL } from '../constants/navigation'
import { COLORS } from '../constants/colors'
import { gradientTextShort } from '../styles'

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
                position:       'fixed',
                top:            0,
                left:           0,
                right:          0,
                zIndex:         100,
                padding:        '0 24px',
                height:         '64px',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'space-between',
                transition:     'background 0.3s ease, backdrop-filter 0.3s ease',
                background:     scrolled ? 'rgba(7, 7, 15, 0.85)' : 'transparent',
                backdropFilter:       scrolled ? 'blur(16px)' : 'none',
                WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
                borderBottom:   scrolled
                    ? `1px solid ${COLORS.border}`
                    : '1px solid transparent',
            }}
        >
            {/* Logo */}
            <a
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                style={{ cursor: 'pointer', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em', ...gradientTextShort }}
            >
                VR
            </a>

            {/* Desktop nav */}
            <nav className="nav-desktop" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
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
                style={{
                    background: 'none',
                    border:     'none',
                    color:      COLORS.textPrimary,
                    cursor:     'pointer',
                    fontSize:   '1.5rem',
                    padding:    '4px',
                }}
            >
                {mobileOpen ? '✕' : '☰'}
            </button>

            {/* Mobile dropdown */}
            {mobileOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        position:      'absolute',
                        top:           '64px',
                        left:          0,
                        right:         0,
                        background:    'rgba(7, 7, 15, 0.95)',
                        backdropFilter: 'blur(16px)',
                        borderBottom:  `1px solid ${COLORS.border}`,
                        padding:       '16px 24px',
                        display:       'flex',
                        flexDirection: 'column',
                        gap:           '8px',
                    }}
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

            <style>{`
                .nav-desktop { display: flex; }
                .nav-mobile-toggle { display: none; }
                @media (max-width: 768px) {
                    .nav-desktop { display: none !important; }
                    .nav-mobile-toggle { display: block !important; }
                }
            `}</style>
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
        <button
            key={href}
            onClick={onClick}
            style={{
                background:  'none',
                border:      'none',
                color:       isActive ? COLORS.textPrimary : COLORS.textMuted,
                fontSize:    '0.875rem',
                fontWeight:  isActive ? 600 : 500,
                cursor:      'pointer',
                padding:     '4px 0',
                position:    'relative',
                transition:  'color 0.25s',
                fontFamily:  'inherit',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.textPrimary)}
            onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? COLORS.textPrimary : COLORS.textMuted)}
        >
            {label}
            {isActive && (
                <motion.span
                    layoutId="nav-underline"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    style={{
                        position:     'absolute',
                        bottom:       -2,
                        left:         0,
                        right:        0,
                        height:       '2px',
                        background:   'linear-gradient(90deg, #6366f1, #22d3ee)',
                        borderRadius: '1px',
                    }}
                />
            )}
        </button>
    )
}

function MobileNavButton({ label, href, isActive, onClick }: NavButtonProps) {
    return (
        <button
            key={href}
            onClick={onClick}
            style={{
                background:   'none',
                border:       'none',
                color:        isActive ? COLORS.textPrimary : COLORS.textMuted,
                fontSize:     '1rem',
                fontWeight:   isActive ? 600 : 500,
                cursor:       'pointer',
                textAlign:    'left',
                padding:      '12px 0',
                borderBottom: '1px solid rgba(99,102,241,0.1)',
                fontFamily:   'inherit',
                display:      'flex',
                alignItems:   'center',
                gap:          '8px',
                transition:   'color 0.2s',
            }}
        >
            {isActive && (
                <span style={{
                    width:        '4px',
                    height:       '4px',
                    borderRadius: '50%',
                    background:   COLORS.indigo,
                    flexShrink:   0,
                }} />
            )}
            {label}
        </button>
    )
}

function ResumeButton() {
    return (
        <a
            href={RESUME_URL}
            download
            style={{
                padding:      '8px 20px',
                border:       '1px solid rgba(99, 102, 241, 0.5)',
                borderRadius: '8px',
                color:        COLORS.indigo,
                fontSize:     '0.875rem',
                fontWeight:   600,
                transition:   'all 0.2s',
                cursor:       'pointer',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.background  = 'rgba(99,102,241,0.1)'
                e.currentTarget.style.borderColor = COLORS.indigo
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background  = 'transparent'
                e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'
            }}
        >
            Resume
        </a>
    )
}
