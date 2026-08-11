import { WindowChrome } from '../../components/common/WindowChrome'
import type { WindowFrameProps } from '../../lib/types'
import styles from './PhotosWindow.module.css'

const TILE_TINTS = [
  'rgba(255,255,255,.06)',
  'rgba(143,182,255,.14)',
  'rgba(255,255,255,.06)',
  'rgba(185,168,255,.14)',
  'rgba(185,168,255,.12)',
  'rgba(255,255,255,.06)',
  'rgba(143,182,255,.12)',
  'rgba(255,255,255,.06)',
]

export function PhotosWindow(frame: WindowFrameProps) {
  return (
    <WindowChrome title="Ảnh" compact {...frame}>
      <div className={styles.grid}>
        {TILE_TINTS.map((tint, i) => (
          <div
            key={i}
            className={styles.tile}
            style={{
              background: `repeating-linear-gradient(45deg, ${tint} 0 6px, rgba(255,255,255,.02) 6px 12px)`,
            }}
          />
        ))}
      </div>
      <div className={styles.caption}>thư viện ảnh — kéo ảnh thật vào đây</div>
    </WindowChrome>
  )
}
