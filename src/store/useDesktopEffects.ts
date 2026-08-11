import { useEffect } from 'react'
import { useDesktopStore } from './useDesktopStore'

/** Wires up the timers and global keyboard shortcuts the desktop depends on.
 * Mounted once at the app root. */
export function useDesktopEffects() {
  useEffect(() => {
    const tick = window.setInterval(() => {
      useDesktopStore.getState().tickPomodoro()
    }, 1000)
    const clockTick = window.setInterval(() => {
      useDesktopStore.getState().tickClock()
    }, 15_000)

    const onKeyDown = (e: KeyboardEvent) => {
      const s = useDesktopStore.getState()

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        s.toggleSpot()
        return
      }

      if ((e.metaKey || e.ctrlKey) && e.key === 'Tab') {
        e.preventDefault()
        if (!s.switcherOpen) s.openSwitcher()
        else s.advanceSwitcher()
        return
      }

      if (e.key === 'Escape') {
        if (s.switcherOpen) s.cancelSwitcher()
        else s.dismissOverlays()
        return
      }

      if (e.key === 'Enter' && s.switcherOpen) {
        s.confirmSwitcher()
      }
    }

    const onKeyUp = (e: KeyboardEvent) => {
      const s = useDesktopStore.getState()
      if (e.key === 'Meta' || e.key === 'Control') {
        if (s.switcherOpen) s.confirmSwitcher()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.clearInterval(tick)
      window.clearInterval(clockTick)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])
}
