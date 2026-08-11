import { useDesktopStore } from '../../store/useDesktopStore'
import { LIBRARY, PLAYLISTS } from '../../lib/data'
import { AlbumIcon, HeartIcon, NextIcon, PauseIcon, PlayIcon, PrevIcon, RecentIcon, ShuffleIcon } from '../../components/icons'
import styles from './MusicApp.module.css'

const SEEK_PCT = 38

export function MusicApp() {
  const trackIndex = useDesktopStore((s) => s.trackIndex)
  const playing = useDesktopStore((s) => s.playing)
  const togglePlay = useDesktopStore((s) => s.togglePlay)
  const pickTrack = useDesktopStore((s) => s.pickTrack)
  const now = LIBRARY[trackIndex]

  const goPrev = () => pickTrack((trackIndex - 1 + LIBRARY.length) % LIBRARY.length)
  const goNext = () => pickTrack((trackIndex + 1) % LIBRARY.length)

  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <div className={styles.sideSection}>
          <div className={styles.sectionLabel}>Thư viện</div>
          <div className={`${styles.sideRow} ${styles.active}`}>
            <RecentIcon size={16} />
            Nghe gần đây
          </div>
          <div className={styles.sideRow}>
            <HeartIcon size={16} />
            Yêu thích
          </div>
          <div className={styles.sideRow}>
            <AlbumIcon size={16} />
            Album
          </div>
        </div>
        <div className={styles.sideSection}>
          <div className={styles.sectionLabel}>Danh sách phát</div>
          {PLAYLISTS.map((p) => (
            <div key={p.name} className={styles.sideRow}>
              <div className={styles.swatch} style={{ background: p.swatch }} />
              <div className={styles.plName}>{p.name}</div>
              <div className={styles.plCount}>{p.count}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.headerArt} />
          <div className={styles.headerMeta}>
            <div className={styles.eyebrow}>Danh sách phát</div>
            <div className={styles.headerTitle}>Chill chiều muộn</div>
            <div className={styles.headerSub}>12 bài · 48 phút</div>
          </div>
          <div className={styles.headerActions}>
            <button type="button" className={styles.playBtn} onClick={togglePlay}>
              {playing ? <PauseIcon size={15} strokeWidth={1.8} /> : <PlayIcon size={15} strokeWidth={1.8} />}
              Phát
            </button>
            <button type="button" className={styles.shuffleBtn} aria-label="Trộn bài">
              <ShuffleIcon size={16} />
            </button>
          </div>
        </div>

        <div className={styles.tableWrap}>
          <div className={styles.tableHead}>
            <div>#</div>
            <div>Bài hát</div>
            <div>Album</div>
            <div className={styles.right}>Thời lượng</div>
          </div>
          {LIBRARY.map((t, i) => {
            const active = i === trackIndex
            return (
              <button
                key={t.title}
                type="button"
                className={styles.row}
                style={{ background: active ? 'rgba(255,255,255,.09)' : 'transparent' }}
                onClick={() => pickTrack(i)}
              >
                <div className={styles.num} style={{ color: active ? 'var(--accent)' : 'var(--text-tertiary-3)' }}>
                  {active ? '▶' : i + 1}
                </div>
                <div className={styles.trackMeta}>
                  <div
                    className={styles.trackTitle}
                    style={{ color: active ? '#ffffff' : 'var(--text-body)', fontWeight: active ? 600 : 400 }}
                  >
                    {t.title}
                  </div>
                  <div className={styles.trackArtist}>{t.artist}</div>
                </div>
                <div className={styles.album}>{t.album}</div>
                <div className={styles.dur}>{t.dur}</div>
              </button>
            )
          })}
        </div>

        <div className={styles.footer}>
          <div className={styles.footerArt} />
          <div className={styles.footerMeta}>
            <div className={styles.footerTitle}>{now.title}</div>
            <div className={styles.footerArtist}>{now.artist}</div>
          </div>
          <div className={styles.footerTransport}>
            <button type="button" onClick={goPrev} aria-label="Bài trước">
              <PrevIcon size={18} />
            </button>
            <button type="button" onClick={togglePlay} aria-label="Phát/Tạm dừng">
              {playing ? <PauseIcon size={22} strokeWidth={1.6} /> : <PlayIcon size={22} strokeWidth={1.6} />}
            </button>
            <button type="button" onClick={goNext} aria-label="Bài tiếp theo">
              <NextIcon size={18} />
            </button>
          </div>
          <div className={styles.footerSeek}>
            <div className={styles.footerTime}>1:24</div>
            <div className={styles.footerTrack}>
              <div className={styles.footerFill} style={{ width: `${SEEK_PCT}%` }} />
            </div>
            <div className={styles.footerTime}>{now.dur}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
