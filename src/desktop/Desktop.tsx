import { useRef } from 'react'
import { useDesktopStore } from '../store/useDesktopStore'
import { WALLPAPERS } from '../lib/wallpapers'
import { MenuBar } from './MenuBar'
import { Dock } from './Dock'
import { WindowManager } from './WindowManager'
import { ControlCenter } from '../system/ControlCenter'
import { Spotlight } from '../system/Spotlight'
import { NotificationCenter } from '../system/NotificationCenter'
import { ContextMenu } from '../system/ContextMenu'
import { AppSwitcher } from '../system/AppSwitcher'
import { Toast } from '../system/Toast'
import styles from './Desktop.module.css'

export function Desktop() {
  const stageRef = useRef<HTMLDivElement>(null)
  const wallpaperIndex = useDesktopStore((s) => s.wallpaperIndex)
  const dismissOverlays = useDesktopStore((s) => s.dismissOverlays)
  const openCtxMenu = useDesktopStore((s) => s.openCtxMenu)

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    const rect = stageRef.current?.getBoundingClientRect()
    if (!rect) return
    openCtxMenu(e.clientX - rect.left, e.clientY - rect.top)
  }

  return (
    <div ref={stageRef} className={styles.stage}>
      <div className={styles.background} onClick={dismissOverlays} onContextMenu={handleContextMenu}>
        <div className={styles.wallpaper} style={{ background: WALLPAPERS[wallpaperIndex] }} />
        <div className={styles.noise} />
      </div>

      <MenuBar />
      <WindowManager />
      <ControlCenter />
      <NotificationCenter />
      <Spotlight />
      <Dock />
      <ContextMenu />
      <AppSwitcher />
      <Toast />
    </div>
  )
}
