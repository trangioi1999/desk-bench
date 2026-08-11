import { useMemo } from 'react'
import { useDesktopStore } from '../../store/useDesktopStore'
import { LIBRARY, PLAYLISTS, PLAYLIST_TRACK_INDICES, sumDurations } from '../../lib/data'
import {
  AlbumIcon,
  HeartIcon,
  NextIcon,
  PauseIcon,
  PlayIcon,
  PrevIcon,
  RecentIcon,
  ShuffleIcon,
} from '../../components/icons'
import styles from './MusicApp.module.css'

const SEEK_PCT = 38

const VIEW_TITLES: Record<string, string> = {
  recent: 'Nghe gần đây',
  favorites: 'Yêu thích',
  albums: 'Album',
}

function tracksForView(view: string, favorites: number[]) {
  const withIndex = LIBRARY.map((t, i) => ({ ...t, idx: i }))
  if (view === 'recent') return withIndex
  if (view === 'favorites') return withIndex.filter((t) => favorites.includes(t.idx))
  if (view === 'albums') return [...withIndex].sort((a, b) => a.album.localeCompare(b.album))
  const indices = PLAYLIST_TRACK_INDICES[view]
  if (!indices) return withIndex
  return indices.map((i) => withIndex[i])
}

export function MusicApp() {
  const trackIndex = useDesktopStore((s) => s.trackIndex)
  const playing = useDesktopStore((s) => s.playing)
  const shuffle = useDesktopStore((s) => s.shuffle)
  const favorites = useDesktopStore((s) => s.favorites)
  const libraryView = useDesktopStore((s) => s.libraryView)
  const togglePlay = useDesktopStore((s) => s.togglePlay)
  const pickTrack = useDesktopStore((s) => s.pickTrack)
  const nextTrack = useDesktopStore((s) => s.nextTrack)
  const prevTrack = useDesktopStore((s) => s.prevTrack)
  const toggleShuffle = useDesktopStore((s) => s.toggleShuffle)
  const toggleFavorite = useDesktopStore((s) => s.toggleFavorite)
  const setLibraryView = useDesktopStore((s) => s.setLibraryView)
  const now = LIBRARY[trackIndex]

  const tracks = useMemo(() => tracksForView(libraryView, favorites), [libraryView, favorites])
  const headerTitle = VIEW_TITLES[libraryView] ?? libraryView

  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <div className={styles.sideSection}>
          <div className={styles.sectionLabel}>Thư viện</div>
          <button
            type="button"
            className={`${styles.sideRow} ${libraryView === 'recent' ? styles.active : ''}`}
            onClick={() => setLibraryView('recent')}
          >
            <RecentIcon size={16} />
            Nghe gần đây
          </button>
          <button
            type="button"
            className={`${styles.sideRow} ${libraryView === 'favorites' ? styles.active : ''}`}
            onClick={() => setLibraryView('favorites')}
          >
            <HeartIcon size={16} />
            Yêu thích
          </button>
          <button
            type="button"
            className={`${styles.sideRow} ${libraryView === 'albums' ? styles.active : ''}`}
            onClick={() => setLibraryView('albums')}
          >
            <AlbumIcon size={16} />
            Album
          </button>
        </div>
        <div className={styles.sideSection}>
          <div className={styles.sectionLabel}>Danh sách phát</div>
          {PLAYLISTS.map((p) => (
            <button
              key={p.name}
              type="button"
              className={`${styles.sideRow} ${libraryView === p.name ? styles.active : ''}`}
              onClick={() => setLibraryView(p.name)}
            >
              <div className={styles.swatch} style={{ background: p.swatch }} />
              <div className={styles.plName}>{p.name}</div>
              <div className={styles.plCount}>{p.count}</div>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.headerArt} />
          <div className={styles.headerMeta}>
            <div className={styles.eyebrow}>{PLAYLIST_TRACK_INDICES[libraryView] ? 'Danh sách phát' : 'Thư viện'}</div>
            <div className={styles.headerTitle}>{headerTitle}</div>
            <div className={styles.headerSub}>
              {tracks.length} bài{tracks.length > 0 ? ` · ${sumDurations(tracks)}` : ''}
            </div>
          </div>
          <div className={styles.headerActions}>
            <button type="button" className={styles.playBtn} onClick={togglePlay}>
              {playing ? <PauseIcon size={15} strokeWidth={1.8} /> : <PlayIcon size={15} strokeWidth={1.8} />}
              Phát
            </button>
            <button
              type="button"
              className={styles.shuffleBtn}
              onClick={toggleShuffle}
              aria-pressed={shuffle}
              aria-label="Trộn bài"
              style={shuffle ? { color: 'var(--accent)', background: 'rgba(143,182,255,.18)' } : undefined}
            >
              <ShuffleIcon size={16} />
            </button>
          </div>
        </div>

        <div className={styles.tableWrap}>
          {tracks.length === 0 ? (
            <div className={styles.emptyState}>Chưa có bài hát yêu thích nào — bấm ♡ trên 1 bài để thêm.</div>
          ) : (
            <>
              <div className={styles.tableHead}>
                <div>#</div>
                <div>Bài hát</div>
                <div>Album</div>
                <div className={styles.right}>Thời lượng</div>
                <div />
              </div>
              {tracks.map((t, row) => {
                const active = t.idx === trackIndex
                const isFav = favorites.includes(t.idx)
                return (
                  <div
                    key={t.title}
                    className={styles.row}
                    style={{ background: active ? 'rgba(255,255,255,.09)' : 'transparent' }}
                    onClick={() => pickTrack(t.idx)}
                  >
                    <div className={styles.num} style={{ color: active ? 'var(--accent)' : 'var(--text-tertiary-3)' }}>
                      {active ? '▶' : row + 1}
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
                    <button
                      type="button"
                      className={`${styles.favBtn} ${isFav ? styles.on : ''}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(t.idx)
                      }}
                      aria-label={isFav ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
                    >
                      <HeartIcon size={14} />
                    </button>
                  </div>
                )
              })}
            </>
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.footerArt} />
          <div className={styles.footerMeta}>
            <div className={styles.footerTitle}>{now.title}</div>
            <div className={styles.footerArtist}>{now.artist}</div>
          </div>
          <div className={styles.footerTransport}>
            <button type="button" onClick={prevTrack} aria-label="Bài trước">
              <PrevIcon size={18} />
            </button>
            <button type="button" onClick={togglePlay} aria-label="Phát/Tạm dừng">
              {playing ? <PauseIcon size={22} strokeWidth={1.6} /> : <PlayIcon size={22} strokeWidth={1.6} />}
            </button>
            <button type="button" onClick={nextTrack} aria-label="Bài tiếp theo">
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
