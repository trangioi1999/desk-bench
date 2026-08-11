import { useRef, type CSSProperties, type ReactNode } from 'react'
import { WINDOW_MIN_HEIGHT, WINDOW_MIN_WIDTH } from '../../lib/constants'
import styles from './WindowChrome.module.css'
import glass from './Glass.module.css'
import { TrafficLights } from './TrafficLights'

interface DragState {
  startX: number
  startY: number
  startTop: number
  startLeft: number
}

interface ResizeState {
  startX: number
  startY: number
  startW: number
  startH: number
  axis: 'x' | 'y' | 'both'
}

interface WindowChromeProps {
  title: ReactNode
  compact?: boolean
  glassVariant?: keyof typeof glass
  top: number
  left: number
  width: number
  height?: number
  onMouseDown?: () => void
  onDoubleClickTitlebar?: () => void
  onClose?: () => void
  onMinimize?: () => void
  onMaximize?: () => void
  onMove?: (top: number, left: number) => void
  onResize?: (width: number, height: number) => void
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
  width,
  height,
  onMouseDown,
  onDoubleClickTitlebar,
  onClose,
  onMinimize,
  onMaximize,
  onMove,
  onResize,
  style,
  className,
  children,
}: WindowChromeProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<DragState | null>(null)
  const resizeRef = useRef<ResizeState | null>(null)

  const handleTitlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return
    if (!onMove) return
    e.currentTarget.setPointerCapture(e.pointerId)
    dragRef.current = { startX: e.clientX, startY: e.clientY, startTop: top, startLeft: left }
  }

  const handleTitlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag || !onMove) return
    onMove(drag.startTop + (e.clientY - drag.startY), drag.startLeft + (e.clientX - drag.startX))
  }

  const endDrag = () => {
    dragRef.current = null
  }

  const startResize = (axis: ResizeState['axis']) => (e: React.PointerEvent<HTMLDivElement>) => {
    if (!onResize) return
    e.stopPropagation()
    e.currentTarget.setPointerCapture(e.pointerId)
    onMouseDown?.()
    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startW: width,
      // Height is usually "auto" until the first resize — measure what the
      // window is actually rendering at so it doesn't jump on grab.
      startH: height ?? frameRef.current?.getBoundingClientRect().height ?? WINDOW_MIN_HEIGHT,
      axis,
    }
  }

  const handleResizePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rs = resizeRef.current
    if (!rs || !onResize) return
    const nextW =
      rs.axis === 'y' ? rs.startW : Math.max(WINDOW_MIN_WIDTH, rs.startW + (e.clientX - rs.startX))
    const nextH =
      rs.axis === 'x' ? rs.startH : Math.max(WINDOW_MIN_HEIGHT, rs.startH + (e.clientY - rs.startY))
    onResize(nextW, nextH)
  }

  const endResize = () => {
    resizeRef.current = null
  }

  const resizeHandlers = onResize
    ? { onPointerMove: handleResizePointerMove, onPointerUp: endResize, onPointerCancel: endResize }
    : {}

  return (
    <div
      ref={frameRef}
      className={`${styles.frame} ${glass[glassVariant]} ${className ?? ''}`}
      style={{ ...style, top, left, width, height }}
      onMouseDown={(e) => {
        e.stopPropagation()
        onMouseDown?.()
      }}
    >
      <div
        className={`${styles.titlebar} ${compact ? styles.compact : ''}`}
        onDoubleClick={onDoubleClickTitlebar}
        onPointerDown={handleTitlePointerDown}
        onPointerMove={handleTitlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        style={{ cursor: onMove ? 'grab' : undefined }}
      >
        <TrafficLights compact={compact} onClose={onClose} onMinimize={onMinimize} onMaximize={onMaximize} />
        {typeof title === 'string' ? (
          <div className={`${styles.title} ${compact ? styles.compact : ''}`}>{title}</div>
        ) : (
          title
        )}
      </div>

      <div className={styles.content}>{children}</div>

      {onResize && (
        <>
          <div className={styles.resizeE} onPointerDown={startResize('x')} {...resizeHandlers} />
          <div className={styles.resizeS} onPointerDown={startResize('y')} {...resizeHandlers} />
          <div className={styles.resizeSE} onPointerDown={startResize('both')} {...resizeHandlers} />
        </>
      )}
    </div>
  )
}
