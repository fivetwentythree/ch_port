import './EdgeGradients.css'

export default function EdgeGradients({ color = '#ffffff' }) {
  return (
    <>
      <div
        className="edge-gradient edge-gradient-left"
        style={{
          background: `linear-gradient(to right, ${color} 0%, ${color} 10%, transparent 100%)`,
        }}
      />
      <div
        className="edge-gradient edge-gradient-right"
        style={{
          background: `linear-gradient(to left, ${color} 0%, ${color} 10%, transparent 100%)`,
        }}
      />
    </>
  )
}
