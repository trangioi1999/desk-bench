import { useMemo, useRef } from 'react'
import { useDesktopStore } from '../../store/useDesktopStore'
import { VIDEOS, formatDuration, parseDuration } from '../../lib/data'
import { extractVideoId, useYoutubePlayer } from './useYoutubePlayer'
import {
  CaptionsIcon,
  FullscreenIcon,
  LikeIcon,
  NextIcon,
  PauseIcon,
  PlayIcon,
  SearchIcon,
  SpeakerIcon,
} from '../../components/icons'
import { SeekTrack } from './SeekTrack'
import styles from './YoutubeApp.module.css'

function artBackground([a, b]: [string, string], stripe = 10) {
  return `linear-gradient(150deg, ${a}, ${b}),
    repeating-linear-gradient(135deg, rgba(255,255,255,.06) 0 ${stripe}px, rgba(255,255,255,.015) ${stripe}px ${stripe * 2}px)`
}

/** Titlebar search box — a component (not a plain function) so it can read and
 * write the shared query state. */
export function YoutubeTitle() {
  const query = useDesktopStore((s) => s.ytQuery)
  const setQuery = useDesktopStore((s) => s.setYtQuery)
  const index = useDesktopStore((s) => s.ytIndex)
  const bindYtId = useDesktopStore((s) => s.bindYtId)

  const pastedId = extractVideoId(query)

  const submit = () => {
    if (pastedId) bindYtId(index, pastedId)
  }

  return (
    <>
      <div className={styles.searchChipWrap}>
        <div className={`${styles.searchChip} ${pastedId ? styles.searchChipReady : ''}`}>
          <SearchIcon size={14} strokeWidth={1.5} color={pastedId ? 'var(--accent)' : '#8b94a7'} />
          <input
            className={styles.searchInput}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            placeholder="Dán link YouTube, hoặc tìm trong danh sách"
            aria-label="Dán link YouTube hoặc tìm kiếm video"
          />
          {pastedId && (
            <button type="button" className={styles.searchGo} onClick={submit}>
              Phát
            </button>
          )}
        </div>
      </div>
      <div className={styles.titlebarSpacer} />
    </>
  )
}

export function YoutubeApp() {
  const index = useDesktopStore((s) => s.ytIndex)
  const time = useDesktopStore((s) => s.ytTime)
  const playing = useDesktopStore((s) => s.ytPlaying)
  const volume = useDesktopStore((s) => s.ytVolume)
  const muted = useDesktopStore((s) => s.ytMuted)
  const captions = useDesktopStore((s) => s.ytCaptions)
  const subscribed = useDesktopStore((s) => s.ytSubscribed)
  const liked = useDesktopStore((s) => s.ytLiked)
  const query = useDesktopStore((s) => s.ytQuery)
  const playVideo = useDesktopStore((s) => s.playVideo)
  const togglePlaying = useDesktopStore((s) => s.toggleYtPlaying)
  const seek = useDesktopStore((s) => s.seekYt)
  const setVolume = useDesktopStore((s) => s.setYtVolume)
  const toggleMuted = useDesktopStore((s) => s.toggleYtMuted)
  const toggleCaptions = useDesktopStore((s) => s.toggleYtCaptions)
  const toggleSubscribed = useDesktopStore((s) => s.toggleYtSubscribed)
  const toggleLiked = useDesktopStore((s) => s.toggleYtLiked)
  const toggleMaximize = useDesktopStore((s) => s.toggleMaximize)
  const boundIds = useDesktopStore((s) => s.ytBoundIds)

  const video = VIDEOS[index]
  const videoId = boundIds[index] ?? video.ytId
  const embedRef = useRef<HTMLDivElement>(null)
  const [player, playerControls] = useYoutubePlayer(embedRef, videoId)

  // With a real video loaded the player owns playback state; otherwise the
  // store's simulated timeline drives the same controls.
  const live = Boolean(videoId) && player.ready && !player.failed
  const duration = live && player.duration > 0 ? player.duration : parseDuration(video.len)
  const currentTime = live ? player.currentTime : time
  const isPlaying = live ? player.playing : playing
  const progress = duration > 0 ? Math.min(1, currentTime / duration) : 0

  const handleTogglePlay = () => {
    if (live) playerControls.toggle()
    else togglePlaying()
  }
  const handleSeek = (seconds: number) => {
    if (live) playerControls.seek(seconds)
    else seek(seconds)
  }
  const handleVolume = (v: number) => {
    setVolume(v)
    if (live) {
      playerControls.setVolume(v)
      playerControls.setMuted(v === 0)
    }
  }
  const handleToggleMuted = () => {
    toggleMuted()
    if (live) playerControls.setMuted(!muted)
  }
  const handleToggleCaptions = () => {
    toggleCaptions()
    if (live) playerControls.setCaptions(!captions)
  }

  const upNext = useMemo(() => {
    const q = query.trim().toLowerCase()
    return VIDEOS.map((v, i) => ({ v, i }))
      .filter(({ i }) => i !== index)
      .filter(({ v }) => !q || v.title.toLowerCase().includes(q) || v.channel.toLowerCase().includes(q))
  }, [query, index])

  const effectiveVolume = muted ? 0 : volume
  const speakerWaves = effectiveVolume === 0 ? 0 : effectiveVolume < 55 ? 1 : 2

  return (
    <div className={styles.layout}>
      <div className={styles.playerCol}>
        <div className={styles.player} style={{ background: artBackground(video.art) }}>
          <div ref={embedRef} className={`${styles.embed} ${live ? styles.embedVisible : ''}`} />

          {!live && (
            <button
              type="button"
              className={styles.playOverlay}
              onClick={handleTogglePlay}
              aria-label={isPlaying ? 'Tạm dừng video' : 'Phát video'}
            >
              <div className={styles.playGlass}>
                {isPlaying ? (
                  <PauseIcon size={26} strokeWidth={1.5} color="#f2f5fb" />
                ) : (
                  <PlayIcon size={26} strokeWidth={1.5} color="#f2f5fb" />
                )}
              </div>
            </button>
          )}

          {!videoId && <div className={styles.bindHint}>Dán link YouTube ở ô trên để phát video thật</div>}
          {videoId && player.failed && (
            <div className={styles.bindHint}>Không tải được video — kiểm tra mạng hoặc thử link khác</div>
          )}

          {captions && !live && <div className={styles.captionBar}>{video.caption}</div>}

          <div className={styles.controlBar}>
            <SeekTrack
              value={progress}
              onChange={(ratio) => handleSeek(ratio * duration)}
              className={styles.scrubTrack}
              fillClassName={styles.scrubFill}
              knobClassName={styles.scrubKnob}
              label="Tua video"
            />
            <div className={styles.controlRow}>
              <button type="button" onClick={handleTogglePlay} aria-label={isPlaying ? 'Tạm dừng' : 'Phát'}>
                {isPlaying ? <PauseIcon size={18} /> : <PlayIcon size={18} />}
              </button>
              <button
                type="button"
                onClick={() => playVideo((index + 1) % VIDEOS.length)}
                aria-label="Video tiếp theo"
              >
                <NextIcon size={18} />
              </button>
              <div className={styles.volumeGroup}>
                <button type="button" onClick={handleToggleMuted} aria-label={muted ? 'Bật tiếng' : 'Tắt tiếng'}>
                  <SpeakerIcon size={18} waves={speakerWaves} />
                </button>
                <SeekTrack
                  value={effectiveVolume / 100}
                  onChange={(ratio) => handleVolume(Math.round(ratio * 100))}
                  className={styles.volumeTrack}
                  fillClassName={styles.volumeFill}
                  label="Âm lượng"
                />
              </div>
              <div className={styles.controlTime}>
                {formatDuration(currentTime)} / {formatDuration(duration)}
              </div>
              <div className={styles.spacer} />
              <button
                type="button"
                onClick={handleToggleCaptions}
                aria-pressed={captions}
                aria-label="Phụ đề"
                className={captions ? styles.activeControl : undefined}
              >
                <CaptionsIcon size={18} />
              </button>
              <button type="button" onClick={() => toggleMaximize('youtube')} aria-label="Toàn màn hình">
                <FullscreenIcon size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.meta}>
          <div className={styles.videoTitle}>{video.title}</div>
          <div className={styles.channelRow}>
            <div
              className={styles.avatar}
              style={{ background: `linear-gradient(150deg, ${video.art[0]}, ${video.art[1]})` }}
            />
            <div className={styles.channelMeta}>
              <div className={styles.channelName}>{video.channel}</div>
              <div className={styles.channelSubs}>{video.subs}</div>
            </div>
            <button
              type="button"
              className={`${styles.subscribeBtn} ${subscribed ? styles.subscribed : ''}`}
              onClick={toggleSubscribed}
            >
              {subscribed ? 'Đã đăng ký' : 'Đăng ký'}
            </button>
            <button
              type="button"
              className={`${styles.likeChip} ${liked ? styles.liked : ''}`}
              onClick={toggleLiked}
              aria-pressed={liked}
            >
              <LikeIcon size={15} />
              {liked ? '19 N' : '18 N'}
            </button>
          </div>
        </div>
      </div>

      <div className={styles.rail}>
        <div className={styles.railLabel}>{query.trim() ? 'Kết quả' : 'Tiếp theo'}</div>
        {upNext.length === 0 && <div className={styles.railEmpty}>Không tìm thấy video nào</div>}
        {upNext.map(({ v, i }) => (
          <button key={v.title} type="button" className={styles.railItem} onClick={() => playVideo(i)}>
            <div className={styles.railThumb} style={{ background: artBackground(v.art, 6) }}>
              <div className={styles.railDuration}>{v.len}</div>
            </div>
            <div className={styles.railMeta}>
              <div className={styles.railTitle}>{v.title}</div>
              <div className={styles.railChannel}>{v.channel}</div>
              <div className={styles.railViews}>{v.meta}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
