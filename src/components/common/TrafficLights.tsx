import styles from './TrafficLights.module.css'

function GlyphSvg({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d={d} />
    </svg>
  )
}

interface TrafficLightsProps {
  compact?: boolean
  onClose?: () => void
  onMinimize?: () => void
  onMaximize?: () => void
}

export function TrafficLights({ compact = false, onClose, onMinimize, onMaximize }: TrafficLightsProps) {
  const cls = `${styles.dot} ${compact ? styles.compact : ''}`
  const interactive = Boolean(onClose || onMinimize || onMaximize)

  const stop = (fn?: () => void) => (e: React.MouseEvent) => {
    e.stopPropagation()
    fn?.()
  }

  return (
    <div className={`${styles.row} ${compact ? styles.compact : ''}`}>
      <button
        type="button"
        className={cls}
        style={{ background: 'var(--tl-red)' }}
        onClick={stop(onClose)}
        onMouseDown={(e) => e.stopPropagation()}
        aria-label="Đóng"
        disabled={!interactive}
      >
        {onClose && <GlyphSvg d="M2 2l4 4M6 2l-4 4" />}
      </button>
      <button
        type="button"
        className={cls}
        style={{ background: 'var(--tl-yellow)' }}
        onClick={stop(onMinimize)}
        onMouseDown={(e) => e.stopPropagation()}
        aria-label="Thu nhỏ"
        disabled={!interactive}
      >
        {onMinimize && <GlyphSvg d="M2 4h4" />}
      </button>
      <button
        type="button"
        className={cls}
        style={{ background: 'var(--tl-green)' }}
        onClick={stop(onMaximize)}
        onMouseDown={(e) => e.stopPropagation()}
        aria-label="Phóng to"
        disabled={!interactive}
      >
        {onMaximize && <GlyphSvg d="M2 4.5V2h2.5M6 3.5V6H3.5" />}
      </button>
    </div>
  )
}
