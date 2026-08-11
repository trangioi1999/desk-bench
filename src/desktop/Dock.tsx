import { useDesktopStore } from '../store/useDesktopStore'
import {
  MusicDockIcon,
  PhotosDockIcon,
  PomodoroDockIcon,
  SettingsIcon,
  TerminalDockIcon,
  TrashIcon,
  YoutubeDockIcon,
} from '../components/icons'
import glass from '../components/common/Glass.module.css'
import styles from './Dock.module.css'
import { DockIcon } from './DockIcon'
import type { WindowId } from '../lib/types'

export function Dock() {
  const openWindows = useDesktopStore((s) => s.openWindows)
  const toggleDockApp = useDesktopStore((s) => s.toggleDockApp)

  const isOpen = (id: WindowId) => openWindows.includes(id)

  return (
    <div className={`${styles.dock} ${glass.dock}`} onMouseDown={(e) => e.stopPropagation()}>
      <DockIcon
        label="Ảnh"
        background="linear-gradient(160deg, rgba(255,255,255,.14), rgba(255,255,255,.05))"
        iconColor="#e3e9f5"
        running={isOpen('photos')}
        onClick={() => toggleDockApp('photos')}
      >
        <PhotosDockIcon size={24} />
      </DockIcon>

      <DockIcon
        label="Nhạc"
        background="linear-gradient(160deg, rgba(143,182,255,.28), rgba(143,182,255,.08))"
        iconColor="#eaf0ff"
        running={isOpen('music')}
        onClick={() => toggleDockApp('music')}
      >
        <MusicDockIcon size={24} />
      </DockIcon>

      <DockIcon
        label="YouTube"
        background="linear-gradient(160deg, rgba(255,255,255,.13), rgba(255,255,255,.04))"
        iconColor="#e3e9f5"
        running={isOpen('youtube')}
        onClick={() => toggleDockApp('youtube')}
      >
        <YoutubeDockIcon size={24} />
      </DockIcon>

      <DockIcon
        label="Pomodoro"
        background="linear-gradient(160deg, rgba(185,168,255,.3), rgba(185,168,255,.08))"
        iconColor="#f1ecff"
        running={isOpen('pomodoro')}
        onClick={() => toggleDockApp('pomodoro')}
      >
        <PomodoroDockIcon size={24} />
      </DockIcon>

      <DockIcon
        label="Terminal"
        background="linear-gradient(160deg, rgba(255,255,255,.1), rgba(255,255,255,.03))"
        iconColor="#e3e9f5"
        running={isOpen('terminal')}
        onClick={() => toggleDockApp('terminal')}
      >
        <TerminalDockIcon size={24} />
      </DockIcon>

      <DockIcon
        label="Cài đặt"
        background="linear-gradient(160deg, rgba(255,255,255,.12), rgba(255,255,255,.04))"
        iconColor="#e3e9f5"
        running={isOpen('settings')}
        onClick={() => toggleDockApp('settings')}
      >
        <SettingsIcon size={24} />
      </DockIcon>

      <div className={styles.divider} />

      <DockIcon
        label="Thùng rác"
        background="linear-gradient(160deg, rgba(255,255,255,.09), rgba(255,255,255,.03))"
        iconColor="#cfd7e6"
        running={false}
        onClick={() => {}}
      >
        <TrashIcon size={24} />
      </DockIcon>
    </div>
  )
}
