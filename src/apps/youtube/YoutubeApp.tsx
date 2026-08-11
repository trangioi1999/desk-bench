import { useState } from 'react'
import { VIDEOS } from '../../lib/data'
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
import styles from './YoutubeApp.module.css'

const SCRUB_PCT = 34

export function youtubeTitleSlot() {
  return (
    <>
      <div className={styles.searchChipWrap}>
        <div className={styles.searchChip}>
          <SearchIcon size={14} strokeWidth={1.5} color="#8b94a7" />
          <div className={styles.searchChipText}>lofi hip hop radio</div>
        </div>
      </div>
      <div className={styles.titlebarSpacer} />
    </>
  )
}

export function YoutubeApp() {
  const [playing, setPlaying] = useState(true)
  const [subscribed, setSubscribed] = useState(false)
  const [liked, setLiked] = useState(false)

  return (
    <div className={styles.layout}>
      <div className={styles.playerCol}>
        <div className={styles.player}>
          <button
            type="button"
            className={styles.playOverlay}
            onClick={() => setPlaying((p) => !p)}
            aria-label="Phát/Tạm dừng video"
          >
            <div className={styles.playGlass}>
              {playing ? (
                <PauseIcon size={26} strokeWidth={1.5} color="#f2f5fb" />
              ) : (
                <PlayIcon size={26} strokeWidth={1.5} color="#f2f5fb" />
              )}
            </div>
          </button>
          <div className={styles.controlBar}>
            <div className={styles.scrubTrack}>
              <div className={styles.scrubFill} style={{ width: `${SCRUB_PCT}%` }} />
              <div className={styles.scrubKnob} style={{ left: `${SCRUB_PCT}%` }} />
            </div>
            <div className={styles.controlRow}>
              <button type="button" onClick={() => setPlaying((p) => !p)} aria-label="Phát/Tạm dừng">
                {playing ? <PauseIcon size={18} /> : <PlayIcon size={18} />}
              </button>
              <button type="button" aria-label="Tiếp theo">
                <NextIcon size={18} />
              </button>
              <SpeakerIcon size={18} waves={1} />
              <div className={styles.controlTime}>42:18 / 2:04:37</div>
              <div className={styles.spacer} />
              <CaptionsIcon size={18} />
              <FullscreenIcon size={18} />
            </div>
          </div>
        </div>

        <div className={styles.meta}>
          <div className={styles.videoTitle}>lofi hip hop radio — nhạc để tập trung &amp; học bài</div>
          <div className={styles.channelRow}>
            <div className={styles.avatar} />
            <div className={styles.channelMeta}>
              <div className={styles.channelName}>Chill Study Radio</div>
              <div className={styles.channelSubs}>2,4 Tr người đăng ký</div>
            </div>
            <button
              type="button"
              className={styles.subscribeBtn}
              onClick={() => setSubscribed((v) => !v)}
              style={
                subscribed
                  ? { background: 'rgba(255,255,255,.08)', color: 'var(--text-body-2)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.1)' }
                  : undefined
              }
            >
              {subscribed ? 'Đã đăng ký' : 'Đăng ký'}
            </button>
            <button
              type="button"
              className={styles.likeChip}
              onClick={() => setLiked((v) => !v)}
              aria-pressed={liked}
              style={liked ? { color: 'var(--accent)', background: 'rgba(143,182,255,.14)' } : undefined}
            >
              <LikeIcon size={15} color={liked ? 'var(--accent)' : undefined} />
              {liked ? '19 N' : '18 N'}
            </button>
          </div>
        </div>
      </div>

      <div className={styles.rail}>
        <div className={styles.railLabel}>Tiếp theo</div>
        {VIDEOS.map((v) => (
          <div key={v.title} className={styles.railItem}>
            <div className={styles.railThumb}>
              <div className={styles.railDuration}>{v.len}</div>
            </div>
            <div className={styles.railMeta}>
              <div className={styles.railTitle}>{v.title}</div>
              <div className={styles.railChannel}>{v.channel}</div>
              <div className={styles.railViews}>{v.meta}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
