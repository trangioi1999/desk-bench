import type { CSSProperties } from 'react'
import { useDesktopStore } from '../store/useDesktopStore'
import { defaultPosFor, maximizedPosFor, musicExpandedPosFor } from '../lib/layout'
import type { WindowFrameProps, WindowId } from '../lib/types'
import { PhotosWindow } from './windows/PhotosWindow'
import { MusicWindow } from './windows/MusicWindow'
import { PomodoroWindow } from './windows/PomodoroWindow'
import { YoutubeWindow } from './windows/YoutubeWindow'
import { TerminalWindow } from './windows/TerminalWindow'
import { SettingsWindow } from './windows/SettingsWindow'
import { WindowChrome } from '../components/common/WindowChrome'
import { MusicApp } from '../apps/music/MusicApp'

export function WindowManager() {
  const openWindows = useDesktopStore((s) => s.openWindows)
  const focused = useDesktopStore((s) => s.focused)
  const musicExpanded = useDesktopStore((s) => s.musicExpanded)
  const viewport = useDesktopStore((s) => s.viewport)
  const windowBounds = useDesktopStore((s) => s.windowBounds)
  const windowMinimized = useDesktopStore((s) => s.windowMinimized)
  const windowMaximized = useDesktopStore((s) => s.windowMaximized)
  const focusWindow = useDesktopStore((s) => s.focusWindow)
  const closeWindow = useDesktopStore((s) => s.closeWindow)
  const minimizeWindow = useDesktopStore((s) => s.minimizeWindow)
  const toggleMaximize = useDesktopStore((s) => s.toggleMaximize)
  const setWindowPos = useDesktopStore((s) => s.setWindowPos)
  const toggleMusicExpanded = useDesktopStore((s) => s.toggleMusicExpanded)

  const visible = openWindows.filter((id) => !windowMinimized[id])

  return (
    <>
      {visible.map((id: WindowId) => {
        const isFocused = focused === id
        const z = 5 + visible.indexOf(id)
        const maximized = Boolean(windowMaximized[id])
        const isMusicExpanded = id === 'music' && musicExpanded
        const bounds = maximized
          ? maximizedPosFor(viewport)
          : isMusicExpanded
            ? musicExpandedPosFor(viewport)
            : (windowBounds[id] ?? defaultPosFor(id, viewport))

        const style: CSSProperties = {
          position: 'absolute',
          width: bounds.width,
          zIndex: z,
          opacity: isFocused ? 1 : 0.72,
          boxShadow: isFocused ? 'var(--shadow-window-focused)' : 'var(--shadow-window-unfocused)',
          transition: 'opacity .2s ease, box-shadow .2s ease, width .2s cubic-bezier(.2,.8,.3,1)',
        }

        const frame: WindowFrameProps = {
          top: bounds.top,
          left: bounds.left,
          style,
          onMouseDown: () => focusWindow(id),
          onMove: maximized ? undefined : (top, left) => setWindowPos(id, top, left),
          onClose: () => closeWindow(id),
          onMinimize: () => minimizeWindow(id),
          onMaximize: () => toggleMaximize(id),
        }

        if (id === 'photos') return <PhotosWindow key={id} {...frame} />
        if (id === 'pomodoro') return <PomodoroWindow key={id} {...frame} />
        if (id === 'youtube') return <YoutubeWindow key={id} {...frame} />
        if (id === 'terminal') return <TerminalWindow key={id} {...frame} />
        if (id === 'settings') return <SettingsWindow key={id} {...frame} />
        if (id === 'music') {
          if (musicExpanded) {
            return (
              <WindowChrome
                key={id}
                title="Nhạc — Chill chiều muộn"
                {...frame}
                onDoubleClickTitlebar={toggleMusicExpanded}
              >
                <MusicApp />
              </WindowChrome>
            )
          }
          return <MusicWindow key={id} {...frame} onExpand={toggleMusicExpanded} />
        }
        return null
      })}
    </>
  )
}
