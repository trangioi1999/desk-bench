import { useRef } from 'react'

interface SeekTrackProps {
  /** 0..1 */
  value: number
  onChange: (ratio: number) => void
  className: string
  fillClassName: string
  knobClassName?: string
  label: string
}

/** Click-or-drag anywhere on a horizontal track to set a 0..1 value.
 * Shared by the video scrubber and the volume slider. */
export function SeekTrack({ value, onChange, className, fillClassName, knobClassName, label }: SeekTrackProps) {
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const applyFrom = (clientX: number) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    if (rect.width === 0) return
    onChange(Math.min(1, Math.max(0, (clientX - rect.left) / rect.width)))
  }

  const pct = `${Math.min(100, Math.max(0, value * 100))}%`

  return (
    <div
      ref={ref}
      className={className}
      role="slider"
      aria-label={label}
      aria-valuenow={Math.round(value * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onPointerDown={(e) => {
        e.stopPropagation()
        dragging.current = true
        e.currentTarget.setPointerCapture(e.pointerId)
        applyFrom(e.clientX)
      }}
      onPointerMove={(e) => {
        if (dragging.current) applyFrom(e.clientX)
      }}
      onPointerUp={() => {
        dragging.current = false
      }}
      onPointerCancel={() => {
        dragging.current = false
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') onChange(Math.max(0, value - 0.02))
        if (e.key === 'ArrowRight') onChange(Math.min(1, value + 0.02))
      }}
    >
      <div className={fillClassName} style={{ width: pct }} />
      {knobClassName && <div className={knobClassName} style={{ left: pct }} />}
    </div>
  )
}
