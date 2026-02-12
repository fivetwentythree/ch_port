import { useState, useEffect, useCallback, useRef } from 'react'
import { useMotionValue } from 'framer-motion'
import SketchMeta from './SketchMeta'
import Carousel from './Carousel'
import PaginationBars from './PaginationBars'
import EdgeGradients from './EdgeGradients'
import './SketchbookPage.css'

export default function SketchbookPage({ content }) {
  const { project, theme, sketches } = content
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 640
  )
  const dragX = useMotionValue(0)
  const [slideWidth, setSlideWidth] = useState(320)
  const isAnimating = useRef(false)

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--bg-color', theme.backgroundColor || '#ffffff')
    root.style.setProperty('--text-color', theme.textColor || '#111827')
    root.style.setProperty('--subtext-color', theme.subtextColor || '#9ca3af')
    root.style.setProperty('--font-family', theme.fontFamily || "'Figtree', system-ui, sans-serif")
    root.style.setProperty('--accent-color', theme.accentColor || '#3b82f6')
  }, [theme])

  useEffect(() => {
    function handleResize() {
      const w = window.innerWidth
      const mobile = w < 640
      setIsMobile(mobile)
      setSlideWidth(mobile ? w * 0.8 : Math.min(1200, w * 0.825))
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const goNext = useCallback(() => {
    if (isAnimating.current || activeIndex >= sketches.length - 1) return
    isAnimating.current = true
    setActiveIndex(i => i + 1)
    dragX.set(0)
    setTimeout(() => { isAnimating.current = false }, 300)
  }, [activeIndex, sketches.length, dragX])

  const goPrev = useCallback(() => {
    if (isAnimating.current || activeIndex <= 0) return
    isAnimating.current = true
    setActiveIndex(i => i - 1)
    dragX.set(0)
    setTimeout(() => { isAnimating.current = false }, 300)
  }, [activeIndex, dragX])

  const goTo = useCallback((index) => {
    if (index >= 0 && index < sketches.length) {
      setActiveIndex(index)
      dragX.set(0)
    }
  }, [sketches.length, dragX])

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'ArrowLeft') goPrev()
      else if (e.key === 'ArrowRight') goNext()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [goNext, goPrev])

  const bgColor = theme.backgroundColor || '#ffffff'

  return (
    <div className="sketchbook-page" style={{ backgroundColor: bgColor }}>
      <SketchMeta
        sketches={sketches}
        activeIndex={activeIndex}
        dragX={dragX}
        slideWidth={slideWidth}
      />

      <EdgeGradients color={bgColor} />

      <Carousel
        sketches={sketches}
        activeIndex={activeIndex}
        slideWidth={slideWidth}
        dragX={dragX}
        isMobile={isMobile}
        onNext={goNext}
        onPrev={goPrev}
      />

      <PaginationBars
        total={sketches.length}
        current={activeIndex}
        onSelect={goTo}
        dragX={dragX}
        slideDistance={slideWidth}
      />
    </div>
  )
}
