import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [activeSection, setActiveSection] = useState<string | null>(null)

    useEffect(() => {
        // Scroll background
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll, { passive: true })

        // Active section tracking via IntersectionObserver — no flickering at boundaries
        // rootMargin creates a detection strip from 15% to 25% from the top of the viewport,
        // so only the section currently filling that zone is considered "active".
        const intersecting = new Set<string>()

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        intersecting.add(entry.target.id)
                    } else {
                        intersecting.delete(entry.target.id)
                    }
                })
                // Pick the first (topmost) nav section that's visible in the detection zone
                const active = NAV_LINKS.find((l) =>
                    intersecting.has(l.href.replace('#', ''))
                )
                setActiveSection(active ? active.href.replace('#', '') : null)
            },
            {
                rootMargin: '-15% 0px -75% 0px',
                threshold: 0,
            }
        )

        NAV_LINKS.forEach((link) => {
            const el = document.querySelector(link.href)
            if (el) observer.observe(el)
        })

        return () => {
            window.removeEventListener('scroll', handleScroll)
            observer.disconnect()
        }
    }, [])

    const handleNavClick = (href: string) => {
        setMobileOpen(false)
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
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
                background: scrolled
                    ? 'rgba(7, 7, 15, 0.85)'
                    : 'transparent',
                backdropFilter: scrolled ? 'blur(16px)' : 'none',
                WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
                borderBottom: scrolled
                    ? '1px solid rgba(99, 102, 241, 0.15)'
                    : '1px solid transparent',
            }}
        >
            {/* Logo */}
            <a
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                style={{
                    cursor: 'pointer',
                    fontWeight: 800,
                    fontSize: '1.2rem',
                    letterSpacing: '-0.02em',
                    background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                }}
            >
                VR
            </a>

            {/* Desktop nav */}
            <nav
                style={{
                    display: 'flex',
                    gap: '32px',
                    alignItems: 'center',
                }}
                className="hidden-mobile"
            >
                {NAV_LINKS.map((link) => {
                    const isActive = activeSection === link.href.replace('#', '')
                    return (
                        <button
                            key={link.href}
                            onClick={() => handleNavClick(link.href)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: isActive ? '#f1f5f9' : '#64748b',
                                fontSize: '0.875rem',
                                fontWeight: isActive ? 600 : 500,
                                cursor: 'pointer',
                                padding: '4px 0',
                                position: 'relative',
                                transition: 'color 0.25s, font-weight 0.25s',
                                fontFamily: 'inherit',
                            }}
                            onMouseEnter={(e) =>
                                ((e.currentTarget as HTMLButtonElement).style.color = '#f1f5f9')
                            }
                            onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLButtonElement).style.color =
                                isActive ? '#f1f5f9' : '#64748b')
                            }
                        >
                            {link.label}
                            <AnimatePresence>
                                {isActive && (
                                    <motion.span
                                        layoutId="nav-underline"
                                        initial={{ opacity: 0, scaleX: 0 }}
                                        animate={{ opacity: 1, scaleX: 1 }}
                                        exit={{ opacity: 0, scaleX: 0 }}
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                        style={{
                                            position: 'absolute',
                                            bottom: -2,
                                            left: 0,
                                            right: 0,
                                            height: '2px',
                                            background:
                                                'linear-gradient(90deg, #6366f1, #22d3ee)',
                                            borderRadius: '1px',
                                            transformOrigin: 'left',
                                        }}
                                    />
                                )}
                            </AnimatePresence>
                        </button>
                    )
                })}
                <a
                    href="/cv.pdf"
                    download
                    style={{
                        padding: '8px 20px',
                        border: '1px solid rgba(99, 102, 241, 0.5)',
                        borderRadius: '8px',
                        color: '#6366f1',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        transition: 'all 0.2s',
                        cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                        const el = e.currentTarget
                        el.style.background = 'rgba(99, 102, 241, 0.1)'
                        el.style.borderColor = '#6366f1'
                    }}
                    onMouseLeave={(e) => {
                        const el = e.currentTarget
                        el.style.background = 'transparent'
                        el.style.borderColor = 'rgba(99, 102, 241, 0.5)'
                    }}
                >
                    Resume
                </a>
            </nav>

            {/* Mobile hamburger */}
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{
                    background: 'none',
                    border: 'none',
                    color: '#f1f5f9',
                    cursor: 'pointer',
                    fontSize: '1.5rem',
                    display: 'none',
                    padding: '4px',
                }}
                className="show-mobile hamburger-btn"
                aria-label="Toggle menu"
            >
                {mobileOpen ? '✕' : '☰'}
            </button>

            {/* Mobile dropdown */}
            {mobileOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        position: 'absolute',
                        top: '64px',
                        left: 0,
                        right: 0,
                        background: 'rgba(7, 7, 15, 0.95)',
                        backdropFilter: 'blur(16px)',
                        borderBottom: '1px solid rgba(99, 102, 241, 0.15)',
                        padding: '16px 24px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                    }}
                >
                    {NAV_LINKS.map((link) => {
                        const isActive = activeSection === link.href.replace('#', '')
                        return (
                            <button
                                key={link.href}
                                onClick={() => handleNavClick(link.href)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: isActive ? '#f1f5f9' : '#64748b',
                                    fontSize: '1rem',
                                    fontWeight: isActive ? 600 : 500,
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    padding: '12px 0',
                                    borderBottom: '1px solid rgba(99,102,241,0.1)',
                                    fontFamily: 'inherit',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    transition: 'color 0.2s',
                                }}
                            >
                                {isActive && (
                                    <span
                                        style={{
                                            width: '4px',
                                            height: '4px',
                                            borderRadius: '50%',
                                            background: '#6366f1',
                                            flexShrink: 0,
                                        }}
                                    />
                                )}
                                {link.label}
                            </button>
                        )
                    })}
                </motion.div>
            )}

            <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
          .hamburger-btn { display: none !important; }
        }
      `}</style>
        </motion.header>
    )
}
