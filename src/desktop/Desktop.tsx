import { useRef } from 'react'
import { useDesktopStore } from '../store/useDesktopStore'
import { STAGE_HEIGHT, STAGE_WIDTH } from '../lib/constants'
import { useFitScale } from './useFitScale'
import { MenuBar } from './MenuBar'
import { Dock } from './Dock'
import { WindowManager } from './WindowManager'
import { ControlCenter } from '../system/ControlCenter'
import { Spotlight } from '../system/Spotlight'
import { NotificationCenter } from '../system/NotificationCenter'
import { ContextMenu } from '../system/ContextMenu'
import { AppSwitcher } from '../system/AppSwitcher'
import styles from './Desktop.module.css'

export function Desktop() {
  const stageRef = useRef<HTMLDivElement>(null)
  const scale = useFitScale(STAGE_WIDTH, STAGE_HEIGHT)
  const dismissOverlays = useDesktopStore((s) => s.dismissOverlays)
  const openCtxMenu = useDesktopStore((s) => s.openCtxMenu)

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    const rect = stageRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left) / scale
    const y = (e.clientY - rect.top) / scale
    openCtxMenu(x, y)
  }

  return (
    <div className={styles.viewport}>
      <div ref={stageRef} className={styles.stage} style={{ transform: `scale(${scale})` }}>
        <div className={styles.background} onClick={dismissOverlays} onContextMenu={handleContextMenu}>
          <div className={styles.wallpaper} />
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
      </div>
    </div>
  )
}
