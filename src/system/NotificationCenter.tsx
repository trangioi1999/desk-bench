import { useDesktopStore } from '../store/useDesktopStore'
import { NOTIFICATIONS } from '../lib/data'
import { GlyphIcon, WeatherCloudIcon } from '../components/icons'
import { ProgressRing } from '../components/common/ProgressRing'
import glass from '../components/common/Glass.module.css'
import styles from './NotificationCenter.module.css'

function formatTime(seconds: number) {
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')
  return `${mm}:${ss}`
}

export function NotificationCenter() {
  const notif = useDesktopStore((s) => s.notif)
  const left = useDesktopStore((s) => s.pomodoroLeft)
  const total = useDesktopStore((s) => s.pomodoroTotal)
  const running = useDesktopStore((s) => s.pomodoroRunning)
  const startPause = useDesktopStore((s) => s.startPausePomodoro)

  if (!notif) return null

  return (
    <div className={`${styles.panel} ${glass.panel}`} onMouseDown={(e) => e.stopPropagation()}>
      {NOTIFICATIONS.map((n) => (
        <div key={n.app + n.time} className={styles.card}>
          <div className={styles.cardIcon}>
            <GlyphIcon d={n.d} size={16} color="#cfd7e6" />
          </div>
          <div className={styles.cardBody}>
            <div className={styles.cardHead}>
              <div className={styles.cardApp}>{n.app}</div>
              <div className={styles.cardTime}>{n.time}</div>
            </div>
            <div className={styles.cardText}>{n.text}</div>
          </div>
        </div>
      ))}

      <div className={styles.widgetRow}>
        <div className={styles.widget}>
          <div className={styles.calWeekday}>Thứ Sáu</div>
          <div className={styles.calDay}>07</div>
          <div className={styles.calAgenda}>
            14:30 Standup
            <br />
            16:00 Review UI
          </div>
        </div>
        <div className={`${styles.widget} ${styles.weather}`}>
          <div className={styles.weatherLabel}>Hà Nội</div>
          <div className={styles.weatherRow}>
            <WeatherCloudIcon size={24} color="#cfd7e6" />
            <div className={styles.weatherTemp}>31°</div>
          </div>
          <div className={styles.weatherSub}>Nhiều mây · 34° / 27°</div>
        </div>
      </div>

      <div className={styles.pomoWidget}>
        <div className={styles.pomoRing}>
          <ProgressRing size={52} strokeWidth={16} remaining={left / total} />
        </div>
        <div className={styles.pomoMeta}>
          <div className={styles.pomoTitle}>Pomodoro</div>
          <div className={styles.pomoSub}>Còn {formatTime(left)} · phiên 3/4</div>
        </div>
        <button type="button" className={styles.pomoBtn} onClick={startPause}>
          {running ? 'Tạm dừng' : 'Bắt đầu'}
        </button>
      </div>
    </div>
  )
}
