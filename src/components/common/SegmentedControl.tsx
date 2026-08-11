import styles from './SegmentedControl.module.css'

export function SegmentedControl({ options, active }: { options: string[]; active: string }) {
  return (
    <div className={styles.track}>
      {options.map((opt) => (
        <div key={opt} className={`${styles.pill} ${opt === active ? styles.active : ''}`}>
          {opt}
        </div>
      ))}
    </div>
  )
}
