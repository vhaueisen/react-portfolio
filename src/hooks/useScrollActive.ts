import { useState, useEffect } from 'react'
import { NAV_LINKS } from '../constants/navigation'

interface ScrollActiveState {
    /** True once the page scrolls past 20px. */
    scrolled: boolean
    /** The `id` of the section intersecting the viewport (no `#` prefix). */
    activeSection: string | null
}

/**
 * Tracks both the page scroll position (for the sticky nav background)
 * and the currently visible section (for the active nav indicator).
 *
 * Combines a passive scroll listener with an IntersectionObserver so
 * neither concern needs its own duplicate effect.
 */
export function useScrollActive(): ScrollActiveState {
    const [scrolled, setScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState<string | null>('hero')

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll, { passive: true })

        const observer = new IntersectionObserver(
            (entries) => {
                const intersecting = entries.filter((e) => e.isIntersecting)
                if (intersecting.length === 0) return

                // Pick the entry whose top edge is closest to the viewport top
                const topmost = intersecting.reduce((a, b) =>
                    a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
                )
                setActiveSection(topmost.target.id)
            },
            { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
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

    return { scrolled, activeSection }
}
