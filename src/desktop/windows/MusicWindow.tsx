import type { CSSProperties } from 'react'
import { WindowChrome } from '../../components/common/WindowChrome'
import { useDesktopStore } from '../../store/useDesktopStore'
import { LIBRARY } from '../../lib/data'
import { NextIcon, PauseIcon, PlayIcon, PrevIcon } from '../../components/icons'
import styles from './MusicWindow.module.css'

const SEEK_PCT = 38

interface MusicWindowProps {
  style: CSSProperties
  onFocus: () => void
  onExpand: () => void
}

export function MusicWindow({ style, onFocus, onExpand }: MusicWindowProps) {
  const trackIndex = useDesktopStore((s) => s.trackIndex)
  const playing = useDesktopStore((s) => s.playing)
  const togglePlay = useDesktopStore((s) => s.togglePlay)
  const pickTrack = useDesktopStore((s) => s.pickTrack)
  const track = LIBRARY[trackIndex]

  const goPrev = () => pickTrack((trackIndex - 1 + LIBRARY.length) % LIBRARY.length)
  const goNext = () => pickTrack((trackIndex + 1) % LIBRARY.length)

  return (
    <WindowChrome title="Nhạc" compact style={style} onMouseDown={onFocus} onDoubleClickTitlebar={onExpand}>
      <div className={styles.body}>
        <div className={styles.head}>
          <div className={styles.art} />
          <div className={styles.meta}>
            <div className={styles.title}>{track.title}</div>
            <div className={styles.artist}>{track.artist}</div>
          </div>
        </div>
        <div className={styles.seekWrap}>
          <div className={styles.seekTrack}>
            <div className={styles.seekFill} style={{ width: `${SEEK_PCT}%` }} />
          </div>
          <div className={styles.times}>
            <div>1:24</div>
            <div>−2:12</div>
          </div>
        </div>
        <div className={styles.transport}>
          <button type="button" onClick={goPrev} aria-label="Bài trước">
            <PrevIcon size={20} />
          </button>
          <button type="button" className={styles.playButton} onClick={togglePlay} aria-label="Phát/Tạm dừng">
            {playing ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
          </button>
          <button type="button" onClick={goNext} aria-label="Bài tiếp theo">
            <NextIcon size={20} />
          </button>
        </div>
      </div>
    </WindowChrome>
  )
}
