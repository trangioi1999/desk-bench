import type { CSSProperties } from 'react'

export type WindowId = 'photos' | 'music' | 'pomodoro' | 'youtube' | 'terminal' | 'settings'

export interface WindowPos {
  top: number
  left: number
  width: number
  /** Undefined means "auto" — the window is as tall as its content. Set once
   * the user resizes it vertically, or while maximized. */
  height?: number
}

/** Props every window content component receives from WindowManager, spread
 * straight onto its WindowChrome — position, visual state and the
 * close/minimize/maximize/drag wiring, all keyed to match WindowChrome's own props. */
export interface WindowFrameProps {
  top: number
  left: number
  width: number
  height?: number
  style: CSSProperties
  onMouseDown: () => void
  onMove?: (top: number, left: number) => void
  onResize?: (width: number, height: number) => void
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
}

export interface Track {
  title: string
  artist: string
  album: string
  dur: string
}

export interface Playlist {
  name: string
  count: number
  swatch: string
}

export interface Video {
  title: string
  channel: string
  meta: string
  len: string
}

export interface Notification {
  app: string
  time: string
  text: string
  d: string
}

export interface AppEntry {
  id: WindowId | 'trash'
  name: string
  kind: string
  d: string
}
