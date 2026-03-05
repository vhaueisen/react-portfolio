import { useScroll } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

/** Height (px) of one timeline item row in the Experience drum UI. */
export const ITEM_HEIGHT = 110
/** Scroll budget (px) allocated per experience item in the drum track. */
export const SCROLL_PER_ITEM = 320

interface ScrollDrumState<T extends Element> {
  /** Ref to attach to the outer tall scroll-track container. */
  scrollTrackRef: React.RefObject<T | null>
  /**
   * Fractional position in the list (e.g. 1.7 = between item 1 and 2).
   * Used to compute perspective-tilt offsets.
   */
  drumPos: number
  /** Rounded index — the currently "active" list item. */
  selectedIndex: number
  /** Total number of items (passed in so the hook can clamp correctly). */
  itemCount: number
}

/**
 * Drives the scroll-jacked drum-roll animation in the Experience section.
 *
 * Attaches `useScroll` to a tall outer container, then maps the 0→1
 * progress value to a `drumPos` float that both the left timeline and
 * right detail card panels use for 3D perspective transforms.
 *
 * @param itemCount - Number of items in the list being scrolled through.
 */
export function useScrollDrum<T extends HTMLElement = HTMLDivElement>(
  itemCount: number
): ScrollDrumState<T> {
  const scrollTrackRef = useRef<T>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [drumPos, setDrumPos] = useState(0)

  const { scrollYProgress } = useScroll({
    target: scrollTrackRef as React.RefObject<HTMLElement>,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      const pos = Math.max(0, Math.min(itemCount - 1, v * (itemCount - 1)))
      setDrumPos(pos)
      setSelectedIndex(Math.round(pos))
    })
  }, [scrollYProgress, itemCount])

  return { scrollTrackRef, selectedIndex, drumPos, itemCount }
}
