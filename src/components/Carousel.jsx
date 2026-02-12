import { useRef } from 'react'
import { motion, useTransform, animate } from 'framer-motion'
import './Carousel.css'

function PlaceholderSlide({ index }) {
  const gradients = [
    'linear-gradient(135deg, #fff5eb, #ffe4cc)',
    'linear-gradient(135deg, #f0f4ff, #dbe5ff)',
    'linear-gradient(135deg, #f0fdf4, #d1fae5)',
    'linear-gradient(135deg, #fef3c7, #fde68a)',
    'linear-gradient(135deg, #fce7f3, #fbcfe8)',
    'linear-gradient(135deg, #e0f2fe, #bae6fd)',
    'linear-gradient(135deg, #f5f3ff, #ede9fe)',
    'linear-gradient(135deg, #ecfdf5, #a7f3d0)',
    'linear-gradient(135deg, #fff1f2, #fecdd3)',
  ]
  return (
    <div
      className="carousel-placeholder"
      style={{ background: gradients[index % gradients.length] }}
    >
      <div className="carousel-placeholder-icon">📓</div>
      <p className="carousel-placeholder-text">Sketch {index + 1}</p>
    </div>
  )
}

export default function Carousel({
  sketches,
  activeIndex,
  slideWidth,
  dragX,
  isMobile,
  onNext,
  onPrev,
}) {
  const containerRef = useRef(null)
  const isDragging = useRef(false)

  const currentX = useTransform(dragX, v => v)
  const prevX = useTransform(dragX, v => -slideWidth + v)
  const nextX = useTransform(dragX, v => slideWidth + v)
  const prev2X = useTransform(dragX, v => -slideWidth * 2 + v)
  const next2X = useTransform(dragX, v => slideWidth * 2 + v)

  const currentOpacity = useTransform(dragX, v => {
    const half = slideWidth / 2
    return 1 - Math.min(1, Math.abs(v) / half) * 0.5
  })
  const nextOpacity = useTransform(dragX, v => {
    const half = slideWidth / 2
    return v >= 0 ? 0.5 : 0.5 + Math.min(1, -v / half) * 0.5
  })
  const prevOpacity = useTransform(dragX, v => {
    const half = slideWidth / 2
    return v <= 0 ? 0.5 : 0.5 + Math.min(1, v / half) * 0.5
  })

  const currentScale = useTransform(dragX, v => {
    return 1 - Math.min(1, Math.abs(v) / slideWidth) * 0.15
  })
  const nextScale = useTransform(dragX, v => {
    return v >= 0 ? 0.85 : 0.85 + Math.min(1, -v / slideWidth) * 0.15
  })
  const prevScale = useTransform(dragX, v => {
    return v <= 0 ? 0.85 : 0.85 + Math.min(1, v / slideWidth) * 0.15
  })

  const maxH = isMobile ? '30vh' : '45vh'

  function handleDragEnd(_e, info) {
    const { velocity, offset } = info
    const swipePower = Math.abs(offset.x) * velocity.x

    if (offset.x < -50 || swipePower < -5000) {
      if (activeIndex < sketches.length - 1) {
        animate(dragX, -slideWidth, {
          type: 'tween',
          duration: 0.25,
          ease: [0.25, 0.1, 0.25, 1],
          onComplete: () => {
            dragX.jump(0)
            onNext()
          },
        })
        return
      }
    } else if (offset.x > 50 || swipePower > 5000) {
      if (activeIndex > 0) {
        animate(dragX, slideWidth, {
          type: 'tween',
          duration: 0.25,
          ease: [0.25, 0.1, 0.25, 1],
          onComplete: () => {
            dragX.jump(0)
            onPrev()
          },
        })
        return
      }
    }

    animate(dragX, 0, {
      type: 'tween',
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1],
    })
  }

  function renderSlide(sketch, index) {
    if (!sketch) return null
    const src = sketch.image
    const hasImage = src && !src.includes('undefined')

    if (!hasImage) {
      return <PlaceholderSlide index={index} />
    }

    return (
      <img
        src={src}
        alt={sketch.note || `Sketch from ${sketch.date}`}
        className="carousel-image"
        style={{ maxHeight: maxH }}
        draggable={false}
        loading="eager"
      />
    )
  }

  return (
    <div className="carousel-container" style={{ height: isMobile ? '30vh' : '45vh' }}>
      <div ref={containerRef} className="carousel-track">
        <motion.div
          className="carousel-drag-area"
          style={{ width: slideWidth, touchAction: 'pan-y' }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          dragMomentum={false}
          onDragStart={() => { isDragging.current = true }}
          onDragEnd={(e, info) => {
            handleDragEnd(e, info)
            setTimeout(() => { isDragging.current = false }, 50)
          }}
        >
          {/* -2 slide */}
          {sketches[activeIndex - 2] && (
            <motion.div
              className="carousel-slide carousel-slide-far"
              style={{ width: slideWidth, x: prev2X, opacity: activeIndex > 1 ? 0.5 : 0, scale: 0.85 }}
            >
              {renderSlide(sketches[activeIndex - 2], activeIndex - 2)}
            </motion.div>
          )}

          {/* -1 slide */}
          {sketches[activeIndex - 1] && (
            <motion.div
              className="carousel-slide"
              style={{ width: slideWidth, x: prevX, opacity: prevOpacity, scale: prevScale }}
            >
              {renderSlide(sketches[activeIndex - 1], activeIndex - 1)}
            </motion.div>
          )}

          {/* Current slide */}
          <motion.div
            className="carousel-slide carousel-slide-current"
            style={{ x: currentX, opacity: currentOpacity, scale: currentScale }}
          >
            {renderSlide(sketches[activeIndex], activeIndex)}
          </motion.div>

          {/* +1 slide */}
          {sketches[activeIndex + 1] && (
            <motion.div
              className="carousel-slide"
              style={{ width: slideWidth, x: nextX, opacity: nextOpacity, scale: nextScale }}
            >
              {renderSlide(sketches[activeIndex + 1], activeIndex + 1)}
            </motion.div>
          )}

          {/* +2 slide */}
          {sketches[activeIndex + 2] && (
            <motion.div
              className="carousel-slide carousel-slide-far"
              style={{ width: slideWidth, x: next2X, opacity: activeIndex < sketches.length - 2 ? 0.5 : 0, scale: 0.85 }}
            >
              {renderSlide(sketches[activeIndex + 2], activeIndex + 2)}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
