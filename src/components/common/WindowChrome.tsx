import { useRef, type CSSProperties, type ReactNode } from 'react'
import styles from './WindowChrome.module.css'
import glass from './Glass.module.css'
import { TrafficLights } from './TrafficLights'

interface DragState {
  startX: number
  startY: number
  startTop: number
  startLeft: number
}

interface WindowChromeProps {
  title: ReactNode
  compact?: boolean
  glassVariant?: keyof typeof glass
  top: number
  left: number
  onMouseDown?: () => void
  onDoubleClickTitlebar?: () => void
  onClose?: () => void
  onMinimize?: () => void
  onMaximize?: () => void
  onMove?: (top: number, left: number) => void
  style?: CSSProperties
  className?: string
  children: ReactNode
}

export function WindowChrome({
  title,
  compact = false,
  glassVariant = 'window',
  top,
  left,
  onMouseDown,
  onDoubleClickTitlebar,
  onClose,
  onMinimize,
  onMaximize,
  onMove,
  style,
  className,
  children,
}: WindowChromeProps) {
  const dragRef = useRef<DragState | null>(null)

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return
    if (!onMove) return
    e.currentTarget.setPointerCapture(e.pointerId)
    dragRef.current = { startX: e.clientX, startY: e.clientY, startTop: top, startLeft: left }
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag || !onMove) return
    onMove(drag.startTop + (e.clientY - drag.startY), drag.startLeft + (e.clientX - drag.startX))
  }

  const handlePointerUp = () => {
    dragRef.current = null
  }

  return (
    <div
      className={`${styles.frame} ${glass[glassVariant]} ${className ?? ''}`}
      style={{ ...style, top, left }}
      onMouseDown={(e) => {
        e.stopPropagation()
        onMouseDown?.()
      }}
    >
      <div
        className={`${styles.titlebar} ${compact ? styles.compact : ''}`}
        onDoubleClick={onDoubleClickTitlebar}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{ cursor: onMove ? 'grab' : undefined }}
      >
        <TrafficLights compact={compact} onClose={onClose} onMinimize={onMinimize} onMaximize={onMaximize} />
        {typeof title === 'string' ? (
          <div className={`${styles.title} ${compact ? styles.compact : ''}`}>{title}</div>
        ) : (
          title
        )}
      </div>
      {children}
    </div>
  )
}
