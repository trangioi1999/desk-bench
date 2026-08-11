import type { ReactNode } from 'react'
import styles from './Dock.module.css'

interface DockIconProps {
  label: string
  background: string
  iconColor: string
  running: boolean
  onClick: () => void
  children: ReactNode
}

export function DockIcon({ label, background, iconColor, running, onClick, children }: DockIconProps) {
  return (
    <button type="button" className={styles.item} onClick={onClick} aria-label={label} title={label}>
      <div className={styles.tile} style={{ background, color: iconColor }}>
        {children}
      </div>
      <div className={styles.dot} style={{ background: running ? 'rgba(255,255,255,.65)' : 'transparent' }} />
    </button>
  )
}
