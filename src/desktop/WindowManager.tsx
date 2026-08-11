import type { CSSProperties } from 'react'
import { useDesktopStore } from '../store/useDesktopStore'
import { DEFAULT_WINDOW_POS, MUSIC_EXPANDED_POS } from '../lib/data'
import type { WindowId } from '../lib/types'
import { PhotosWindow } from './windows/PhotosWindow'
import { MusicWindow } from './windows/MusicWindow'
import { PomodoroWindow } from './windows/PomodoroWindow'
import { YoutubeWindow } from './windows/YoutubeWindow'
import { TerminalWindow } from './windows/TerminalWindow'
import { SettingsWindow } from './windows/SettingsWindow'
import { WindowChrome } from '../components/common/WindowChrome'
import { MusicApp } from '../apps/music/MusicApp'

function windowStyle(pos: { top: number; left: number; width: number }, focused: boolean, zIndex: number): CSSProperties {
  return {
    position: 'absolute',
    top: pos.top,
    left: pos.left,
    width: pos.width,
    zIndex,
    opacity: focused ? 1 : 0.72,
    boxShadow: focused
      ? 'var(--shadow-window-focused)'
      : 'var(--shadow-window-unfocused)',
    transition: 'opacity .2s ease, box-shadow .2s ease, top .25s cubic-bezier(.2,.8,.3,1), left .25s cubic-bezier(.2,.8,.3,1), width .25s cubic-bezier(.2,.8,.3,1)',
  }
}

export function WindowManager() {
  const openWindows = useDesktopStore((s) => s.openWindows)
  const focused = useDesktopStore((s) => s.focused)
  const musicExpanded = useDesktopStore((s) => s.musicExpanded)
  const focusWindow = useDesktopStore((s) => s.focusWindow)
  const toggleMusicExpanded = useDesktopStore((s) => s.toggleMusicExpanded)

  return (
    <>
      {openWindows.map((id: WindowId, i) => {
        const isFocused = focused === id
        const z = 5 + i
        const onFocus = () => focusWindow(id)

        if (id === 'photos') {
          return <PhotosWindow key={id} style={windowStyle(DEFAULT_WINDOW_POS.photos, isFocused, z)} onFocus={onFocus} />
        }
        if (id === 'pomodoro') {
          return <PomodoroWindow key={id} style={windowStyle(DEFAULT_WINDOW_POS.pomodoro, isFocused, z)} onFocus={onFocus} />
        }
        if (id === 'youtube') {
          return <YoutubeWindow key={id} style={windowStyle(DEFAULT_WINDOW_POS.youtube, isFocused, z)} onFocus={onFocus} />
        }
        if (id === 'terminal') {
          return <TerminalWindow key={id} style={windowStyle(DEFAULT_WINDOW_POS.terminal, isFocused, z)} onFocus={onFocus} />
        }
        if (id === 'settings') {
          return <SettingsWindow key={id} style={windowStyle(DEFAULT_WINDOW_POS.settings, isFocused, z)} onFocus={onFocus} />
        }
        if (id === 'music') {
          if (musicExpanded) {
            return (
              <WindowChrome
                key={id}
                title={`Nhạc — Chill chiều muộn`}
                style={windowStyle(MUSIC_EXPANDED_POS, isFocused, z)}
                onMouseDown={onFocus}
                onDoubleClickTitlebar={toggleMusicExpanded}
              >
                <MusicApp />
              </WindowChrome>
            )
          }
          return (
            <MusicWindow
              key={id}
              style={windowStyle(DEFAULT_WINDOW_POS.music, isFocused, z)}
              onFocus={onFocus}
              onExpand={toggleMusicExpanded}
            />
          )
        }
        return null
      })}
    </>
  )
}
