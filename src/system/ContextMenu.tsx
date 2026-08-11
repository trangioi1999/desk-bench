import { useDesktopStore } from '../store/useDesktopStore'
import { FolderNewIcon, SortIcon, WallpaperIcon, WidgetIcon, SearchIcon } from '../components/icons'
import { STAGE_HEIGHT, STAGE_WIDTH } from '../lib/constants'
import glass from '../components/common/Glass.module.css'
import styles from './ContextMenu.module.css'

const MENU_WIDTH = 250
const MENU_HEIGHT_ESTIMATE = 210

export function ContextMenu() {
  const ctxMenu = useDesktopStore((s) => s.ctxMenu)
  const closeCtxMenu = useDesktopStore((s) => s.closeCtxMenu)
  const toggleSpot = useDesktopStore((s) => s.toggleSpot)

  if (!ctxMenu.open) return null

  const left = Math.min(ctxMenu.x, STAGE_WIDTH - MENU_WIDTH - 8)
  const top = Math.min(ctxMenu.y, STAGE_HEIGHT - MENU_HEIGHT_ESTIMATE - 8)

  const search = () => {
    closeCtxMenu()
    toggleSpot()
  }

  return (
    <div
      className={`${styles.menu} ${glass.spotlight}`}
      style={{ left, top }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <button type="button" className={styles.item} onClick={closeCtxMenu}>
        <span className={styles.itemLeft}>
          <FolderNewIcon size={15} />
          Thư mục mới
        </span>
      </button>
      <button type="button" className={styles.item} onClick={closeCtxMenu}>
        <span className={styles.itemLeft}>
          <SortIcon size={15} />
          Sắp xếp theo
        </span>
      </button>
      <div className={styles.divider} />
      <button type="button" className={styles.item} onClick={closeCtxMenu}>
        <span className={styles.itemLeft}>
          <WallpaperIcon size={15} />
          Đổi hình nền
        </span>
      </button>
      <button type="button" className={styles.item} onClick={closeCtxMenu}>
        <span className={styles.itemLeft}>
          <WidgetIcon size={15} />
          Sửa widget
        </span>
      </button>
      <div className={styles.divider} />
      <button type="button" className={styles.item} onClick={search}>
        <span className={styles.itemLeft}>
          <SearchIcon size={15} strokeWidth={1.4} />
          Tìm kiếm
        </span>
        <span className={styles.hint}>⌘K</span>
      </button>
    </div>
  )
}
