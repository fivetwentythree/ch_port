import { motion, useTransform } from 'framer-motion'
import './SketchMeta.css'

function formatDate(dateStr) {
  return new Date(dateStr).getFullYear().toString()
}

export default function SketchMeta({ sketches, activeIndex, dragX, slideWidth }) {
  const currentOpacity = useTransform(dragX, v => {
    const half = slideWidth / 2
    return v <= -half || v >= half ? 0 : v < 0 ? 1 + v / half : 1 - v / half
  })

  const nextOpacity = useTransform(dragX, v => {
    const half = slideWidth / 2
    return v >= 0 ? 0 : Math.min(1, -v / half)
  })

  const prevOpacity = useTransform(dragX, v => {
    const half = slideWidth / 2
    return v <= 0 ? 0 : Math.min(1, v / half)
  })

  const current = sketches[activeIndex]
  const next = sketches[activeIndex + 1]
  const prev = sketches[activeIndex - 1]

  return (
    <div className="sketch-meta">
      <motion.div style={{ opacity: currentOpacity }}>
        <h1 className="sketch-meta-location">{current?.location || ''}</h1>
        <p className="sketch-meta-date">{current ? formatDate(current.date) : ''}</p>
      </motion.div>

      {next && (
        <motion.div className="sketch-meta-overlay" style={{ opacity: nextOpacity }}>
          <h1 className="sketch-meta-location">{next.location}</h1>
          <p className="sketch-meta-date">{formatDate(next.date)}</p>
        </motion.div>
      )}

      {prev && (
        <motion.div className="sketch-meta-overlay" style={{ opacity: prevOpacity }}>
          <h1 className="sketch-meta-location">{prev.location}</h1>
          <p className="sketch-meta-date">{formatDate(prev.date)}</p>
        </motion.div>
      )}
    </div>
  )
}
