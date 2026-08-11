import { useEffect, useRef, useState } from 'react'

/* Minimal typings for the bits of the IFrame Player API we use. */
interface YTPlayer {
  playVideo(): void
  pauseVideo(): void
  seekTo(seconds: number, allowSeekAhead: boolean): void
  setVolume(volume: number): void
  mute(): void
  unMute(): void
  getCurrentTime(): number
  getDuration(): number
  loadVideoById(id: string): void
  destroy(): void
  setOption?(module: string, option: string, value: unknown): void
}
interface YTNamespace {
  Player: new (el: HTMLElement, opts: Record<string, unknown>) => YTPlayer
  PlayerState: { PLAYING: number; PAUSED: number; ENDED: number }
}
declare global {
  interface Window {
    YT?: YTNamespace
    onYouTubeIframeAPIReady?: () => void
  }
}

const API_SRC = 'https://www.youtube.com/iframe_api'
let apiPromise: Promise<void> | null = null

/** Loads the IFrame Player API once per page. Rejects if the script cannot be
 * fetched (offline, blocked network) so callers can fall back gracefully. */
function loadApi(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve()
  if (apiPromise) return apiPromise

  apiPromise = new Promise<void>((resolve, reject) => {
    const previous = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      previous?.()
      resolve()
    }
    const tag = document.createElement('script')
    tag.src = API_SRC
    tag.async = true
    tag.onerror = () => reject(new Error('blocked'))
    document.head.appendChild(tag)
    // The script can load but never fire the callback if YouTube is unreachable.
    window.setTimeout(() => reject(new Error('timeout')), 8000)
  })
  // A failed attempt shouldn't poison later ones (e.g. network comes back).
  apiPromise.catch(() => {
    apiPromise = null
  })
  return apiPromise
}

export interface YoutubePlayerState {
  ready: boolean
  failed: boolean
  playing: boolean
  currentTime: number
  duration: number
}

export interface YoutubePlayerControls {
  play(): void
  pause(): void
  toggle(): void
  seek(seconds: number): void
  setVolume(v: number): void
  setMuted(muted: boolean): void
  setCaptions(on: boolean): void
}

/** Mounts a real YouTube player into `containerRef` for `videoId`.
 * Returns live playback state plus controls, so the app's own glass control
 * bar can drive the real video instead of YouTube's built-in chrome. */
export function useYoutubePlayer(
  containerRef: React.RefObject<HTMLDivElement | null>,
  videoId: string | undefined,
): [YoutubePlayerState, YoutubePlayerControls] {
  const playerRef = useRef<YTPlayer | null>(null)
  const [state, setState] = useState<YoutubePlayerState>({
    ready: false,
    failed: false,
    playing: false,
    currentTime: 0,
    duration: 0,
  })

  useEffect(() => {
    if (!videoId) {
      setState({ ready: false, failed: false, playing: false, currentTime: 0, duration: 0 })
      return
    }

    let cancelled = false
    const host = containerRef.current
    if (!host) return

    // Reuse the existing player across video changes — recreating the iframe
    // each time is slow and flickers.
    if (playerRef.current) {
      playerRef.current.loadVideoById(videoId)
      return
    }

    loadApi()
      .then(() => {
        if (cancelled || !window.YT || !containerRef.current) return
        const mount = document.createElement('div')
        containerRef.current.appendChild(mount)
        playerRef.current = new window.YT.Player(mount, {
          videoId,
          playerVars: {
            controls: 0, // the app draws its own control bar
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: () => {
              if (cancelled) return
              setState((s) => ({ ...s, ready: true, duration: playerRef.current?.getDuration() ?? 0 }))
            },
            onStateChange: (e: { data: number }) => {
              if (cancelled || !window.YT) return
              setState((s) => ({
                ...s,
                playing: e.data === window.YT!.PlayerState.PLAYING,
                duration: playerRef.current?.getDuration() ?? s.duration,
              }))
            },
            onError: () => {
              if (!cancelled) setState((s) => ({ ...s, failed: true }))
            },
          },
        })
      })
      .catch(() => {
        if (!cancelled) setState((s) => ({ ...s, failed: true }))
      })

    return () => {
      cancelled = true
    }
  }, [videoId, containerRef])

  // Destroy only on unmount, not on every video change.
  useEffect(
    () => () => {
      playerRef.current?.destroy()
      playerRef.current = null
    },
    [],
  )

  useEffect(() => {
    if (!state.ready) return
    const id = window.setInterval(() => {
      const p = playerRef.current
      if (!p) return
      setState((s) => ({ ...s, currentTime: p.getCurrentTime(), duration: p.getDuration() || s.duration }))
    }, 250)
    return () => window.clearInterval(id)
  }, [state.ready])

  const controls: YoutubePlayerControls = {
    play: () => playerRef.current?.playVideo(),
    pause: () => playerRef.current?.pauseVideo(),
    toggle: () => (state.playing ? playerRef.current?.pauseVideo() : playerRef.current?.playVideo()),
    seek: (seconds) => playerRef.current?.seekTo(seconds, true),
    setVolume: (v) => playerRef.current?.setVolume(v),
    setMuted: (muted) => (muted ? playerRef.current?.mute() : playerRef.current?.unMute()),
    setCaptions: (on) => {
      try {
        playerRef.current?.setOption?.('captions', 'track', on ? { languageCode: 'vi' } : {})
      } catch {
        /* captions aren't available on every video */
      }
    },
  }

  return [state, controls]
}

/** Accepts a full YouTube URL (watch, youtu.be, shorts, embed) or a bare
 * 11-character id. Returns the video id, or null if it isn't one. */
export function extractVideoId(input: string): string | null {
  const text = input.trim()
  if (!text) return null
  if (/^[\w-]{11}$/.test(text)) return text

  try {
    const url = new URL(text.startsWith('http') ? text : `https://${text}`)
    if (!/(^|\.)(youtube\.com|youtu\.be)$/.test(url.hostname)) return null
    if (url.hostname.endsWith('youtu.be')) {
      const id = url.pathname.slice(1)
      return /^[\w-]{11}$/.test(id) ? id : null
    }
    const v = url.searchParams.get('v')
    if (v && /^[\w-]{11}$/.test(v)) return v
    const match = url.pathname.match(/\/(embed|shorts|live)\/([\w-]{11})/)
    return match ? match[2] : null
  } catch {
    return null
  }
}
