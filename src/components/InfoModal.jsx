import { useState, useEffect, useCallback } from 'react'
import './InfoModal.css'

export default function InfoModal({ project, isOpen, onClose }) {
  const [animateIn, setAnimateIn] = useState(false)
  const [closing, setClosing] = useState(false)

  const handleClose = useCallback(() => {
    setAnimateIn(false)
    setClosing(true)
    setTimeout(() => {
      setClosing(false)
      onClose()
    }, 300)
  }, [onClose])

  useEffect(() => {
    if (!isOpen) return
    const id = requestAnimationFrame(() => setAnimateIn(true))
    return () => cancelAnimationFrame(id)
  }, [isOpen])

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

  const visible = isOpen || closing
  if (!visible) return null

  return (
    <div className="modal-overlay">
      <div
        className={`modal-backdrop ${animateIn ? 'active' : ''}`}
        onClick={handleClose}
      />
      <div className={`modal-content ${animateIn ? 'active' : ''} ${closing ? 'out' : ''}`}>
        <div className="modal-inner">
          <div className="modal-header">
            <div className="modal-title-row">
              <span className="modal-title">{project.title}</span>
              <span className="modal-dot">•</span>
              <span className="modal-year">{project.year}</span>
            </div>
            <button className="modal-close" onClick={handleClose} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <p className="modal-description">{project.description}</p>
          {project.toolCategories && (
            <div className="modal-tools">
              {project.toolCategories.map((cat, i) => (
                <div key={i} className="modal-tool-category">
                  <span className="modal-tool-label">{cat.label}</span>
                  <div className="modal-tool-list">
                    {cat.tools.map((tool, j) => (
                      <span key={j} className="modal-tool-tag">{tool}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
