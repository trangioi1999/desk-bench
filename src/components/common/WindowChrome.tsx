import type { CSSProperties, ReactNode } from 'react'
import styles from './WindowChrome.module.css'
import glass from './Glass.module.css'
import { TrafficLights } from './TrafficLights'

interface WindowChromeProps {
  title: ReactNode
  compact?: boolean
  glassVariant?: keyof typeof glass
  onMouseDown?: () => void
  onDoubleClickTitlebar?: () => void
  style?: CSSProperties
  className?: string
  children: ReactNode
}

export function WindowChrome({
  title,
  compact = false,
  glassVariant = 'window',
  onMouseDown,
  onDoubleClickTitlebar,
  style,
  className,
  children,
}: WindowChromeProps) {
  return (
    <div
      className={`${styles.frame} ${glass[glassVariant]} ${className ?? ''}`}
      style={style}
      onMouseDown={(e) => {
        e.stopPropagation()
        onMouseDown?.()
      }}
    >
      <div
        className={`${styles.titlebar} ${compact ? styles.compact : ''}`}
        onDoubleClick={onDoubleClickTitlebar}
      >
        <TrafficLights compact={compact} />
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
