import { create } from 'zustand'
import type { WindowId } from '../lib/types'
import { formatClockVi } from '../lib/data'

export const POMODORO_MINUTES = 25
const POMODORO_TOTAL = POMODORO_MINUTES * 60

interface DesktopState {
  // ---- windows ----
  openWindows: WindowId[]
  focused: WindowId | null
  musicExpanded: boolean
  openWindow: (id: WindowId) => void
  closeWindow: (id: WindowId) => void
  focusWindow: (id: WindowId) => void
  toggleDockApp: (id: WindowId) => void
  toggleMusicExpanded: () => void

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
  pickTrack: (i: number) => void
  togglePlay: () => void

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

  // ---- clock ----
  clock: string
  tickClock: () => void
}

export const useDesktopStore = create<DesktopState>((set, get) => ({
  openWindows: ['photos', 'music', 'pomodoro'],
  focused: 'pomodoro',
  musicExpanded: false,

  openWindow: (id) =>
    set((s) => ({
      openWindows: s.openWindows.includes(id) ? s.openWindows : [...s.openWindows, id],
      focused: id,
    })),
  closeWindow: (id) =>
    set((s) => ({
      openWindows: s.openWindows.filter((w) => w !== id),
      focused: s.focused === id ? s.openWindows.filter((w) => w !== id).at(-1) ?? null : s.focused,
      musicExpanded: id === 'music' ? false : s.musicExpanded,
    })),
  focusWindow: (id) =>
    set((s) => ({
      openWindows: [...s.openWindows.filter((w) => w !== id), id],
      focused: id,
    })),
  toggleDockApp: (id) => {
    const s = get()
    if (s.openWindows.includes(id)) {
      if (s.focused === id) {
        if (id === 'music') get().toggleMusicExpanded()
      } else {
        get().focusWindow(id)
      }
    } else {
      get().openWindow(id)
    }
  },
  toggleMusicExpanded: () => set((s) => ({ musicExpanded: !s.musicExpanded })),

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
  pickTrack: (i) => set({ trackIndex: i, playing: true }),
  togglePlay: () => set((s) => ({ playing: !s.playing })),

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

  clock: formatClockVi(new Date()),
  tickClock: () => set({ clock: formatClockVi(new Date()) }),
}))
