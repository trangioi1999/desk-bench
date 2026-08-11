import { useDesktopStore } from '../store/useDesktopStore'
import { WINDOW_TITLES } from '../lib/data'
import { BatteryIcon, ControlCenterIcon, SearchIcon, VolumeMenuIcon, WifiMenuIcon } from '../components/icons'
import glass from '../components/common/Glass.module.css'
import styles from './MenuBar.module.css'

const MENUS = ['Tệp', 'Sửa', 'Hiển thị', 'Cửa sổ', 'Trợ giúp']

export function MenuBar() {
  const focused = useDesktopStore((s) => s.focused)
  const clock = useDesktopStore((s) => s.clock)
  const cc = useDesktopStore((s) => s.cc)
  const toggleCC = useDesktopStore((s) => s.toggleCC)
  const toggleSpot = useDesktopStore((s) => s.toggleSpot)
  const toggleNotif = useDesktopStore((s) => s.toggleNotif)

  const focusedName = focused ? WINDOW_TITLES[focused] : 'Finder'

  return (
    <div className={`${styles.bar} ${glass.menubar}`}>
      <div className={styles.left}>
        <div className={styles.mark} />
        <div className={styles.appName}>{focusedName}</div>
        <div className={styles.menus}>
          {MENUS.map((m) => (
            <div key={m}>{m}</div>
          ))}
        </div>
      </div>
      <div className={styles.right}>
        <WifiMenuIcon size={16} />
        <BatteryIcon size={18} />
        <VolumeMenuIcon size={16} />
        <button
          type="button"
          className={`${styles.ccChip} ${cc ? styles.active : ''}`}
          onClick={toggleCC}
          aria-label="Trung tâm điều khiển"
        >
          <ControlCenterIcon size={15} />
        </button>
        <button type="button" className={styles.iconButton} onClick={toggleSpot} aria-label="Spotlight">
          <SearchIcon size={15} />
        </button>
        <button type="button" className={styles.clock} onClick={toggleNotif} aria-label="Trung tâm thông báo">
          {clock}
        </button>
      </div>
    </div>
  )
}
