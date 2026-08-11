import { create } from 'zustand'
import type { WindowId } from '../lib/types'
import { formatClockVi, parseDuration, VIDEOS } from '../lib/data'
import { STAGE_HEIGHT, STAGE_WIDTH } from '../lib/constants'
import { defaultPosFor, type Viewport } from '../lib/layout'
import type { WindowPos } from '../lib/types'

export const POMODORO_MINUTES = 25
const POMODORO_TOTAL = POMODORO_MINUTES * 60
let toastTimer: number | undefined

interface DesktopState {
  // ---- viewport ----
  viewport: Viewport
  setViewport: (width: number, height: number) => void

  // ---- windows ----
  openWindows: WindowId[]
  focused: WindowId | null
  musicExpanded: boolean
  windowBounds: Partial<Record<WindowId, WindowPos>>
  windowMinimized: Partial<Record<WindowId, boolean>>
  windowMaximized: Partial<Record<WindowId, boolean>>
  openWindow: (id: WindowId) => void
  closeWindow: (id: WindowId) => void
  focusWindow: (id: WindowId) => void
  toggleDockApp: (id: WindowId) => void
  toggleMusicExpanded: () => void
  minimizeWindow: (id: WindowId) => void
  toggleMaximize: (id: WindowId) => void
  setWindowPos: (id: WindowId, top: number, left: number) => void
  setWindowSize: (id: WindowId, width: number, height: number) => void

  // ---- overlays: control center / spotlight / notification center ----
  cc: boolean
  spot: boolean
  notif: boolean
  q: string
  toggleCC: () => void
  toggleSpot: () => void
  toggleNotif: () => void
  setQuery: (q: string) => void
  dismissOverlays: () => void

  // ---- context menu ----
  ctxMenu: { open: boolean; x: number; y: number }
  openCtxMenu: (x: number, y: number) => void
  closeCtxMenu: () => void

  // ---- toast (lightweight feedback for actions with no real backing system) ----
  toast: string | null
  showToast: (message: string) => void

  // ---- app switcher (Cmd/Ctrl+Tab) ----
  switcherOpen: boolean
  switcherIndex: number
  openSwitcher: () => void
  advanceSwitcher: () => void
  confirmSwitcher: () => void
  cancelSwitcher: () => void

  // ---- pomodoro ----
  pomodoroTotal: number
  pomodoroLeft: number
  pomodoroRunning: boolean
  startPausePomodoro: () => void
  resetPomodoro: () => void
  tickPomodoro: () => void

  // ---- music ----
  trackIndex: number
  playing: boolean
  shuffle: boolean
  favorites: number[]
  /** 'recent' | 'favorites' | 'albums' | a playlist name */
  libraryView: string
  pickTrack: (i: number) => void
  togglePlay: () => void
  toggleShuffle: () => void
  toggleFavorite: (i: number) => void
  setLibraryView: (view: string) => void
  nextTrack: () => void
  prevTrack: () => void

  // ---- youtube ----
  ytIndex: number
  ytTime: number
  ytPlaying: boolean
  ytVolume: number
  ytMuted: boolean
  ytCaptions: boolean
  ytSubscribed: boolean
  ytLiked: boolean
  ytQuery: string
  playVideo: (index: number) => void
  toggleYtPlaying: () => void
  seekYt: (seconds: number) => void
  setYtVolume: (v: number) => void
  toggleYtMuted: () => void
  toggleYtCaptions: () => void
  toggleYtSubscribed: () => void
  toggleYtLiked: () => void
  setYtQuery: (q: string) => void
  tickYt: () => void

  // ---- system ----
  wifi: boolean
  bt: boolean
  focusMode: boolean
  dark: boolean
  bright: number
  vol: number
  toggleWifi: () => void
  toggleBt: () => void
  toggleFocusMode: () => void
  toggleDark: () => void
  setBright: (n: number) => void
  setVol: (n: number) => void

  // ---- wallpaper ----
  wallpaperIndex: number
  cycleWallpaper: () => void

  // ---- clock ----
  clock: string
  tickClock: () => void
}

const LIBRARY_LENGTH = 8

function pickRandomOtherTrack(current: number) {
  if (LIBRARY_LENGTH <= 1) return current
  let next = current
  while (next === current) next = Math.floor(Math.random() * LIBRARY_LENGTH)
  return next
}

export const useDesktopStore = create<DesktopState>((set, get) => ({
  viewport: { width: STAGE_WIDTH, height: STAGE_HEIGHT },
  setViewport: (width, height) => set({ viewport: { width, height } }),

  openWindows: ['photos', 'music', 'pomodoro'],
  focused: 'pomodoro',
  musicExpanded: false,
  windowBounds: {},
  windowMinimized: {},
  windowMaximized: {},

  openWindow: (id) =>
    set((s) => {
      if (s.openWindows.includes(id)) {
        return {
          openWindows: [...s.openWindows.filter((w) => w !== id), id],
          focused: id,
          windowMinimized: { ...s.windowMinimized, [id]: false },
        }
      }
      return {
        openWindows: [...s.openWindows, id],
        focused: id,
        windowBounds: { ...s.windowBounds, [id]: s.windowBounds[id] ?? defaultPosFor(id, s.viewport) },
        windowMinimized: { ...s.windowMinimized, [id]: false },
      }
    }),
  closeWindow: (id) =>
    set((s) => {
      const remaining = s.openWindows.filter((w) => w !== id)
      return {
        openWindows: remaining,
        focused: s.focused === id ? remaining.at(-1) ?? null : s.focused,
        musicExpanded: id === 'music' ? false : s.musicExpanded,
        windowMinimized: { ...s.windowMinimized, [id]: false },
        windowMaximized: { ...s.windowMaximized, [id]: false },
      }
    }),
  focusWindow: (id) =>
    set((s) => ({
      openWindows: [...s.openWindows.filter((w) => w !== id), id],
      focused: id,
      windowMinimized: { ...s.windowMinimized, [id]: false },
    })),
  toggleDockApp: (id) => {
    const s = get()
    if (!s.openWindows.includes(id)) {
      get().openWindow(id)
    } else if (s.windowMinimized[id]) {
      get().focusWindow(id)
    } else if (s.focused === id) {
      if (id === 'music') get().toggleMusicExpanded()
    } else {
      get().focusWindow(id)
    }
  },
  toggleMusicExpanded: () => set((s) => ({ musicExpanded: !s.musicExpanded })),
  minimizeWindow: (id) =>
    set((s) => {
      const remainingVisible = s.openWindows.filter((w) => w !== id && !s.windowMinimized[w])
      return {
        windowMinimized: { ...s.windowMinimized, [id]: true },
        focused: s.focused === id ? remainingVisible.at(-1) ?? null : s.focused,
      }
    }),
  toggleMaximize: (id) => set((s) => ({ windowMaximized: { ...s.windowMaximized, [id]: !s.windowMaximized[id] } })),
  // The default-open windows start with no stored bounds, so both of these must
  // fall back to the computed default — spreading a missing entry would drop
  // width/height and collapse the window to its content size.
  setWindowPos: (id, top, left) =>
    set((s) => {
      const current = s.windowBounds[id] ?? defaultPosFor(id, s.viewport)
      return { windowBounds: { ...s.windowBounds, [id]: { ...current, top, left } } }
    }),
  setWindowSize: (id, width, height) =>
    set((s) => {
      const current = s.windowBounds[id] ?? defaultPosFor(id, s.viewport)
      return { windowBounds: { ...s.windowBounds, [id]: { ...current, width, height } } }
    }),

  cc: true,
  spot: false,
  notif: false,
  q: '',
  toggleCC: () => set((s) => ({ cc: !s.cc, spot: false, notif: false })),
  toggleSpot: () => set((s) => ({ spot: !s.spot, cc: false, notif: false })),
  toggleNotif: () => set((s) => ({ notif: !s.notif, cc: false, spot: false })),
  setQuery: (q) => set({ q }),
  dismissOverlays: () => set({ cc: false, spot: false, notif: false, ctxMenu: { open: false, x: 0, y: 0 } }),

  ctxMenu: { open: false, x: 0, y: 0 },
  openCtxMenu: (x, y) => set({ ctxMenu: { open: true, x, y }, cc: false, spot: false, notif: false }),
  closeCtxMenu: () => set({ ctxMenu: { open: false, x: 0, y: 0 } }),

  toast: null,
  showToast: (message) => {
    set({ toast: message })
    window.clearTimeout(toastTimer)
    toastTimer = window.setTimeout(() => set({ toast: null }), 1600)
  },

  switcherOpen: false,
  switcherIndex: 0,
  openSwitcher: () => {
    const s = get()
    if (s.openWindows.length === 0) return
    const idx = Math.max(0, s.openWindows.indexOf(s.focused ?? s.openWindows.at(-1)!))
    set({ switcherOpen: true, switcherIndex: idx })
  },
  advanceSwitcher: () =>
    set((s) => ({
      switcherIndex: s.openWindows.length ? (s.switcherIndex + 1) % s.openWindows.length : 0,
    })),
  confirmSwitcher: () => {
    const s = get()
    const id = s.openWindows[s.switcherIndex]
    set({ switcherOpen: false })
    if (id) get().focusWindow(id)
  },
  cancelSwitcher: () => set({ switcherOpen: false }),

  pomodoroTotal: POMODORO_TOTAL,
  pomodoroLeft: POMODORO_TOTAL,
  pomodoroRunning: true,
  startPausePomodoro: () => set((s) => ({ pomodoroRunning: !s.pomodoroRunning })),
  resetPomodoro: () => set({ pomodoroLeft: POMODORO_TOTAL, pomodoroRunning: false }),
  tickPomodoro: () =>
    set((s) => (s.pomodoroRunning ? { pomodoroLeft: Math.max(0, s.pomodoroLeft - 1) } : {})),

  trackIndex: 0,
  playing: true,
  shuffle: false,
  favorites: [],
  libraryView: 'Chill chiều muộn',
  pickTrack: (i) => set({ trackIndex: i, playing: true }),
  togglePlay: () => set((s) => ({ playing: !s.playing })),
  toggleShuffle: () => set((s) => ({ shuffle: !s.shuffle })),
  toggleFavorite: (i) =>
    set((s) => ({
      favorites: s.favorites.includes(i) ? s.favorites.filter((f) => f !== i) : [...s.favorites, i],
    })),
  setLibraryView: (view) => set({ libraryView: view }),
  nextTrack: () =>
    set((s) => ({
      trackIndex: s.shuffle ? pickRandomOtherTrack(s.trackIndex) : (s.trackIndex + 1) % LIBRARY_LENGTH,
      playing: true,
    })),
  prevTrack: () =>
    set((s) => ({
      trackIndex: s.shuffle ? pickRandomOtherTrack(s.trackIndex) : (s.trackIndex - 1 + LIBRARY_LENGTH) % LIBRARY_LENGTH,
      playing: true,
    })),

  ytIndex: 0,
  ytTime: 2538, // opens partway in, like the design frame's "42:18"
  ytPlaying: true,
  ytVolume: 70,
  ytMuted: false,
  ytCaptions: false,
  ytSubscribed: false,
  ytLiked: false,
  ytQuery: '',
  playVideo: (index) => set({ ytIndex: index, ytTime: 0, ytPlaying: true }),
  toggleYtPlaying: () => set((s) => ({ ytPlaying: !s.ytPlaying })),
  seekYt: (seconds) => set({ ytTime: Math.max(0, seconds) }),
  setYtVolume: (v) => set({ ytVolume: v, ytMuted: v === 0 }),
  toggleYtMuted: () => set((s) => ({ ytMuted: !s.ytMuted })),
  toggleYtCaptions: () => set((s) => ({ ytCaptions: !s.ytCaptions })),
  toggleYtSubscribed: () => set((s) => ({ ytSubscribed: !s.ytSubscribed })),
  toggleYtLiked: () => set((s) => ({ ytLiked: !s.ytLiked })),
  setYtQuery: (q) => set({ ytQuery: q }),
  tickYt: () =>
    set((s) => {
      if (!s.ytPlaying) return {}
      const duration = parseDuration(VIDEOS[s.ytIndex].len)
      if (s.ytTime >= duration) return { ytPlaying: false, ytTime: duration }
      return { ytTime: s.ytTime + 1 }
    }),

  wifi: true,
  bt: true,
  focusMode: false,
  dark: true,
  bright: 72,
  vol: 45,
  toggleWifi: () => set((s) => ({ wifi: !s.wifi })),
  toggleBt: () => set((s) => ({ bt: !s.bt })),
  toggleFocusMode: () => set((s) => ({ focusMode: !s.focusMode })),
  toggleDark: () => set((s) => ({ dark: !s.dark })),
  setBright: (n) => set({ bright: n }),
  setVol: (n) => set({ vol: n }),

  wallpaperIndex: 0,
  cycleWallpaper: () => set((s) => ({ wallpaperIndex: (s.wallpaperIndex + 1) % 4 })),

  clock: formatClockVi(new Date()),
  tickClock: () => set({ clock: formatClockVi(new Date()) }),
}))
