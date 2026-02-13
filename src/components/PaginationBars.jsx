import { useState, useEffect, useRef } from 'react'
import { useTransform } from 'framer-motion'
import './PaginationBars.css'

function lerp(a, b, t) {
  return a + (b - a) * t
}

function PaginationBar({ index, current, total, onSelect, dragX, slideDistance, hoveredIndex }) {
  const barRef = useRef(null)
  const opacityRef = useRef(0.15)

  const progress = useTransform(dragX, v => {
    const ratio = v / slideDistance
    if (index === current) return 1 - Math.min(Math.abs(ratio), 1)
    if (index === current + 1 && ratio < 0) return Math.min(-ratio, 1)
    if (index === current - 1 && ratio > 0) return Math.min(ratio, 1)
    return 0
  })

  const isActive = index === current
  const hoverDist = hoveredIndex !== null ? index - hoveredIndex : null

  useEffect(() => {
    function tick() {
      const p = progress.get()
      let targetOpacity

      if (p > 0) {
        targetOpacity = 0.15 + p * 0.85
      } else if (hoveredIndex !== null && !isActive && hoverDist !== null) {
        const absDist = Math.abs(hoverDist)
        if (absDist <= 3) {
          const proximity = 1 - absDist / 3
          targetOpacity = 0.15 + proximity * proximity * 0.35
        } else {
          targetOpacity = 0.15
        }
      } else {
        // Proximity fade from active bar
        const dist = Math.abs(index - current)
        if (dist <= 2) {
          targetOpacity = 0.15 + (1 - dist / 2) * 0.15
        } else {
          targetOpacity = 0.15
        }
      }

      opacityRef.current = lerp(opacityRef.current, targetOpacity, 0.2)

      if (barRef.current) {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
        const color = isDark ? '238, 238, 238' : '35, 31, 32'
        barRef.current.style.backgroundColor = `rgba(${color}, ${opacityRef.current})`
      }

      return requestAnimationFrame(tick)
    }
    const id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [progress, hoveredIndex, isActive, hoverDist, index, current])

  return (
    <button
      className="pagination-bar-btn"
      onClick={() => onSelect(index)}
      aria-label={`Go to page ${index + 1}`}
    >
      <div
        ref={barRef}
        className="pagination-bar"
        style={{ height: 20 }}
      />
    </button>
  )
}

export default function PaginationBars({ total, current, onSelect, dragX, slideDistance }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <div
      className="pagination-bars"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          onMouseEnter={() => setHoveredIndex(i)}
        >
          <PaginationBar
            index={i}
            current={current}
            total={total}
            onSelect={onSelect}
            dragX={dragX}
            slideDistance={slideDistance}
            hoveredIndex={hoveredIndex}
          />
        </div>
      ))}
    </div>
  )
}
