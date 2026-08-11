export type WindowId = 'photos' | 'music' | 'pomodoro' | 'youtube' | 'terminal' | 'settings'

export interface WindowPos {
  top: number
  left: number
  width: number
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
