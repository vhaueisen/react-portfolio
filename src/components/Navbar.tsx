import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { COLORS } from '../constants/colors'
import { NAV_LINKS, RESUME_URL } from '../constants/navigation'
import { useScrollActive } from '../hooks/useScrollActive'
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
        background: scrolled ? 'rgba(7, 7, 15, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? `1px solid ${COLORS.border}` : '1px solid transparent',
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
          border: 'none',
          color: COLORS.textPrimary,
          cursor: 'pointer',
          fontSize: '1.5rem',
          padding: '4px',
        }}
      >
        {mobileOpen ? '✕' : '☰'}
      </button>

      {/* Mobile dropdown — AnimatePresence enables the exit animation on close */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: '64px',
              left: 0,
              right: 0,
              background: 'rgba(7, 7, 15, 0.95)',
              backdropFilter: 'blur(16px)',
              borderBottom: `1px solid ${COLORS.border}`,
              padding: '16px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
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
          style={{
            position: 'absolute',
            bottom: -2,
            left: 0,
            right: 0,
            height: '2px',
            background: `linear-gradient(90deg, ${COLORS.indigo}, ${COLORS.cyan})`,
            borderRadius: '1px',
          }}
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
      {isActive && (
        <span
          style={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: COLORS.indigo,
            flexShrink: 0,
          }}
        />
      )}
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
        border: `1px solid rgba(99, 102, 241, 0.5)`,
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
