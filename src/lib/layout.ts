import { DEFAULT_WINDOW_POS, MUSIC_EXPANDED_POS } from './data'
import { DOCK_RESERVE, MENUBAR_HEIGHT, STAGE_HEIGHT, STAGE_WIDTH, WINDOW_MIN_VISIBLE } from './constants'
import type { WindowId, WindowPos } from './types'

export interface Viewport {
  width: number
  height: number
}

/** Scales+clamps a design-time default position (authored for the 1440x900
 * reference frame) into a real viewport, keeping windows fully reachable on
 * screens smaller than the reference and roughly in the same relative spot
 * on larger ones. */
export function clampWindowPos(pos: WindowPos, viewport: Viewport): WindowPos {
  const scaleX = viewport.width / STAGE_WIDTH
  const scaleY = viewport.height / STAGE_HEIGHT
  const scale = Math.min(1, scaleX, scaleY)

  const width = Math.min(pos.width, viewport.width - 24)
  let left = pos.left * Math.min(1, scaleX)
  let top = pos.top * Math.min(1, scale)

  left = Math.min(left, viewport.width - WINDOW_MIN_VISIBLE)
  left = Math.max(left, -(width - WINDOW_MIN_VISIBLE))
  top = Math.max(top, MENUBAR_HEIGHT + 8)
  top = Math.min(top, viewport.height - DOCK_RESERVE)

  return { top, left, width, height: pos.height }
}

export function defaultPosFor(id: WindowId, viewport: Viewport): WindowPos {
  return clampWindowPos(DEFAULT_WINDOW_POS[id], viewport)
}

export function musicExpandedPosFor(viewport: Viewport): WindowPos {
  return clampWindowPos(MUSIC_EXPANDED_POS, viewport)
}

export function maximizedPosFor(viewport: Viewport): WindowPos {
  const top = MENUBAR_HEIGHT + 16
  return {
    top,
    left: 24,
    width: Math.max(360, viewport.width - 48),
    height: Math.max(240, viewport.height - top - DOCK_RESERVE),
  }
}
