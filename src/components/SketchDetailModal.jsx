import { useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { marked } from 'marked'
import './SketchDetailModal.css'

marked.setOptions({
  gfm: true,
  breaks: false,
})

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })
}

export default function SketchDetailModal({ sketch, isOpen, onClose }) {
  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    if (!isOpen) return
    function handleKey(e) {
      if (e.key === 'Escape') {
        e.preventDefault()
        handleClose()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, handleClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const contentSource = sketch?.content || ''
  const renderedContent = useMemo(() => {
    if (!contentSource) return ''
    return marked.parse(contentSource)
  }, [contentSource])

  return (
    <AnimatePresence>
      {isOpen && sketch && (
        <div className="sketch-detail-overlay">
          <motion.div
            className="sketch-detail-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
          />

          <motion.div
            className="sketch-detail-container"
            key={sketch.id}
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{
              type: 'spring',
              damping: 32,
              stiffness: 280,
              mass: 0.8,
            }}
          >
            <button
              className="sketch-detail-close"
              onClick={handleClose}
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="sketch-detail-body">
              <motion.div
                className="sketch-detail-header"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="sketch-detail-header-top">
                  <p className="sketch-detail-location">{sketch.location}</p>
                  <span className="sketch-detail-date">{formatDate(sketch.date)}</span>
                </div>
                <h2 className="sketch-detail-title">{sketch.title || sketch.note}</h2>
                {sketch.tags && sketch.tags.length > 0 && (
                  <div className="sketch-detail-tags">
                    {sketch.tags.map((tag) => (
                      <span key={tag} className="sketch-detail-tag">{tag}</span>
                    ))}
                  </div>
                )}
              </motion.div>

              <motion.div
                className="sketch-detail-divider"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />

              <motion.div
                className="sketch-detail-content"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                dangerouslySetInnerHTML={{ __html: renderedContent }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
