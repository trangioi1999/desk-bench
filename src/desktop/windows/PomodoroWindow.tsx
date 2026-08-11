import { WindowChrome } from '../../components/common/WindowChrome'
import { ProgressRing } from '../../components/common/ProgressRing'
import { useDesktopStore } from '../../store/useDesktopStore'
import type { WindowFrameProps } from '../../lib/types'
import styles from './PomodoroWindow.module.css'

function formatTime(seconds: number) {
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')
  return `${mm}:${ss}`
}

export function PomodoroWindow(frame: WindowFrameProps) {
  const left = useDesktopStore((s) => s.pomodoroLeft)
  const total = useDesktopStore((s) => s.pomodoroTotal)
  const running = useDesktopStore((s) => s.pomodoroRunning)
  const startPause = useDesktopStore((s) => s.startPausePomodoro)
  const reset = useDesktopStore((s) => s.resetPomodoro)

  return (
    <WindowChrome title="Pomodoro" compact {...frame}>
      <div className={styles.body}>
        <div className={styles.label}>Tập trung sâu</div>
        <div className={styles.ringWrap}>
          <ProgressRing size={196} strokeWidth={8} remaining={left / total} />
          <div className={styles.ringOverlay}>
            <div className={styles.time}>{formatTime(left)}</div>
            <div className={styles.session}>phiên 3 / 4</div>
          </div>
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.primary} onClick={startPause}>
            {running ? 'Tạm dừng' : 'Bắt đầu'}
          </button>
          <button type="button" className={styles.secondary} onClick={reset}>
            Đặt lại
          </button>
        </div>
      </div>
    </WindowChrome>
  )
}
