import type { CSSProperties, ReactNode } from 'react'
import styles from './CapsuleSlider.module.css'

interface CapsuleSliderProps {
  value: number
  onChange: (n: number) => void
  icon: ReactNode
  height?: number
  label: string
}

export function CapsuleSlider({ value, onChange, icon, height = 30, label }: CapsuleSliderProps) {
  const iconInset = height === 30 ? 7.5 : 9.5
  const iconLeft = height === 30 ? 8 : 10
  return (
    <div
      className={styles.wrap}
      style={{ '--h': `${height}px`, '--val': `${value}%` } as CSSProperties}
    >
      <div className={styles.icon} style={{ left: iconLeft, top: iconInset }}>
        {icon}
      </div>
      <input
        className={styles.input}
        type="range"
        min={0}
        max={100}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  )
}
