import { useState, useEffect, useRef } from 'react'
import { useTransform } from 'framer-motion'
import './PaginationBars.css'

function lerp(a, b, t) {
  return a + (b - a) * t
}

function PaginationBar({ index, current, onSelect, dragX, slideDistance, hoveredIndex }) {
  const barRef = useRef(null)
  const heightRef = useRef(24)
  const rRef = useRef(209)
  const gRef = useRef(213)
  const bRef = useRef(219)

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
      let targetH, targetR, targetG, targetB

      if (p > 0) {
        targetH = 24 + p * 8
        targetR = 209 + -178 * p
        targetG = 213 + -172 * p
        targetB = 219 + -164 * p
      } else if (hoveredIndex !== null && !isActive && hoverDist !== null) {
        const absDist = Math.abs(hoverDist)
        if (absDist <= 3) {
          const proximity = 1 - absDist / 3
          const influence = proximity * proximity
          targetH = 24 + influence * 4
          targetR = 209 + -53 * influence
          targetG = 213 + -50 * influence
          targetB = 219 + -44 * influence
        } else {
          targetH = 24
          targetR = 209
          targetG = 213
          targetB = 219
        }
      } else {
        targetH = 24
        targetR = 209
        targetG = 213
        targetB = 219
      }

      heightRef.current = lerp(heightRef.current, targetH, 0.15)
      rRef.current = lerp(rRef.current, targetR, 0.15)
      gRef.current = lerp(gRef.current, targetG, 0.15)
      bRef.current = lerp(bRef.current, targetB, 0.15)

      if (barRef.current) {
        barRef.current.style.height = `${heightRef.current}px`
        barRef.current.style.backgroundColor = `rgb(${Math.round(rRef.current)}, ${Math.round(gRef.current)}, ${Math.round(bRef.current)})`
      }

      return requestAnimationFrame(tick)
    }
    const id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [progress, hoveredIndex, isActive, hoverDist])

  return (
    <button
      className="pagination-bar-btn"
      onClick={() => onSelect(index)}
      onMouseEnter={() => {}}
      onMouseLeave={() => {}}
      aria-label={`Go to page ${index + 1}`}
    >
      <div
        ref={barRef}
        className="pagination-bar"
        style={{ height: 24, backgroundColor: 'rgb(209, 213, 219)' }}
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
