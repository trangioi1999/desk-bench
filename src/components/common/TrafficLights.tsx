import styles from './TrafficLights.module.css'

export function TrafficLights({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`${styles.row} ${compact ? styles.compact : ''}`}>
      <div className={`${styles.dot} ${compact ? styles.compact : ''}`} style={{ background: 'var(--tl-red)' }} />
      <div className={`${styles.dot} ${compact ? styles.compact : ''}`} style={{ background: 'var(--tl-yellow)' }} />
      <div className={`${styles.dot} ${compact ? styles.compact : ''}`} style={{ background: 'var(--tl-green)' }} />
    </div>
  )
}
