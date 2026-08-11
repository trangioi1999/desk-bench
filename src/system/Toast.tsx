import { useDesktopStore } from '../store/useDesktopStore'
import styles from './Toast.module.css'

export function Toast() {
  const toast = useDesktopStore((s) => s.toast)
  if (!toast) return null
  return <div className={styles.toast}>{toast}</div>
}
