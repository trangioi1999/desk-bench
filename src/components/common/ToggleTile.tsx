import type { ReactNode } from 'react'
import styles from './ToggleTile.module.css'

interface ToggleTileProps {
  on: boolean
  icon: (color: string) => ReactNode
  label: string
  stateText: string
  onClick: () => void
  large?: boolean
}

export function ToggleTile({ on, icon, label, stateText, onClick, large = false }: ToggleTileProps) {
  const bg = on ? 'rgba(255,255,255,.9)' : 'rgba(255,255,255,.07)'
  const fg = on ? '#1a1f2b' : '#cfd7e6'
  const sub = on ? '#545c6d' : '#98a1b3'
  return (
    <button
      type="button"
      className={`${styles.tile} ${large ? styles.large : ''}`}
      style={{ background: bg }}
      onClick={onClick}
    >
      {icon(fg)}
      <div>
        <div className={styles.label} style={{ color: fg }}>
          {label}
        </div>
        <div className={styles.sub} style={{ color: sub }}>
          {stateText}
        </div>
      </div>
    </button>
  )
}
