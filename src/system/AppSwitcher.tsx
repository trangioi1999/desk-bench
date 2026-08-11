import { useDesktopStore } from '../store/useDesktopStore'
import { WINDOW_TITLES } from '../lib/data'
import {
  MusicDockIcon,
  PhotosDockIcon,
  PomodoroDockIcon,
  SettingsIcon,
  TerminalDockIcon,
  YoutubeDockIcon,
} from '../components/icons'
import glass from '../components/common/Glass.module.css'
import styles from './AppSwitcher.module.css'
import type { WindowId } from '../lib/types'

const TILE_BG: Record<WindowId, string> = {
  pomodoro: 'linear-gradient(160deg, rgba(185,168,255,.3), rgba(185,168,255,.08))',
  music: 'linear-gradient(160deg, rgba(143,182,255,.28), rgba(143,182,255,.08))',
  youtube: 'linear-gradient(160deg, rgba(255,255,255,.13), rgba(255,255,255,.04))',
  terminal: 'linear-gradient(160deg, rgba(255,255,255,.1), rgba(255,255,255,.03))',
  photos: 'linear-gradient(160deg, rgba(255,255,255,.14), rgba(255,255,255,.05))',
  settings: 'linear-gradient(160deg, rgba(255,255,255,.12), rgba(255,255,255,.04))',
}
const TILE_ICON: Record<WindowId, (props: { size: number; color: string }) => React.JSX.Element> = {
  pomodoro: PomodoroDockIcon,
  music: MusicDockIcon,
  youtube: YoutubeDockIcon,
  terminal: TerminalDockIcon,
  photos: PhotosDockIcon,
  settings: SettingsIcon,
}
const TILE_ICON_COLOR: Record<WindowId, string> = {
  pomodoro: '#f1ecff',
  music: '#eaf0ff',
  youtube: '#e3e9f5',
  terminal: '#e3e9f5',
  photos: '#e3e9f5',
  settings: '#e3e9f5',
}

export function AppSwitcher() {
  const open = useDesktopStore((s) => s.switcherOpen)
  const index = useDesktopStore((s) => s.switcherIndex)
  const openWindows = useDesktopStore((s) => s.openWindows)
  const cancelSwitcher = useDesktopStore((s) => s.cancelSwitcher)
  const focusWindow = useDesktopStore((s) => s.focusWindow)

  if (!open || openWindows.length === 0) return null
  const selected = openWindows[index]

  return (
    <div className={styles.overlay} onMouseDown={cancelSwitcher}>
      <div className={`${styles.slab} ${glass.spotlight}`} onMouseDown={(e) => e.stopPropagation()}>
        <div className={styles.row}>
          {openWindows.map((id, i) => {
            const Icon = TILE_ICON[id]
            return (
              <button
                key={id}
                type="button"
                className={`${styles.tile} ${i === index ? styles.selected : ''}`}
                style={{ background: TILE_BG[id] }}
                onClick={() => {
                  focusWindow(id)
                  cancelSwitcher()
                }}
              >
                <Icon size={34} color={TILE_ICON_COLOR[id]} />
              </button>
            )
          })}
        </div>
        <div className={styles.name}>{WINDOW_TITLES[selected]}</div>
      </div>
    </div>
  )
}
