import { useMemo } from 'react'
import { useDesktopStore } from '../store/useDesktopStore'
import { APPS } from '../lib/data'
import { GlyphIcon, SearchIcon } from '../components/icons'
import glass from '../components/common/Glass.module.css'
import styles from './Spotlight.module.css'
import type { WindowId } from '../lib/types'

export function Spotlight() {
  const spot = useDesktopStore((s) => s.spot)
  const q = useDesktopStore((s) => s.q)
  const setQuery = useDesktopStore((s) => s.setQuery)
  const dismissOverlays = useDesktopStore((s) => s.dismissOverlays)
  const openWindow = useDesktopStore((s) => s.openWindow)

  const results = useMemo(() => {
    const query = q.trim().toLowerCase()
    const filtered = query ? APPS.filter((a) => a.name.toLowerCase().includes(query)) : APPS
    return filtered.slice(0, 6)
  }, [q])

  if (!spot) return null

  const pick = (id: WindowId | 'trash') => {
    if (id !== 'trash') openWindow(id)
    dismissOverlays()
  }

  return (
    <div className={styles.overlay} onClick={dismissOverlays} role="presentation">
      <div
        className={`${styles.panel} ${glass.spotlight}`}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.inputRow}>
          <SearchIcon size={20} strokeWidth={1.5} color="#9aa3b6" />
          <input
            className={styles.input}
            value={q}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm ứng dụng, tệp, lệnh…"
            autoFocus
          />
          <div className={styles.kbdChip}>⌘K</div>
        </div>
        <div className={styles.divider} />
        <div className={styles.results}>
          {results.length > 0 && <div className={styles.sectionLabel}>Gợi ý hàng đầu</div>}
          {results.length === 0 && <div className={styles.empty}>Không tìm thấy kết quả</div>}
          {results.map((r) => (
            <button key={r.name} type="button" className={styles.row} onClick={() => pick(r.id)}>
              <div className={styles.rowIcon}>
                <GlyphIcon d={r.d} size={16} color="#cfd7e6" />
              </div>
              <div className={styles.rowName}>{r.name}</div>
              <div className={styles.rowKind}>{r.kind}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
