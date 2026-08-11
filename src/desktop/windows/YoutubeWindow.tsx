import type { CSSProperties } from 'react'
import { WindowChrome } from '../../components/common/WindowChrome'
import { YoutubeApp, youtubeTitleSlot } from '../../apps/youtube/YoutubeApp'

interface YoutubeWindowProps {
  style: CSSProperties
  onFocus: () => void
}

export function YoutubeWindow({ style, onFocus }: YoutubeWindowProps) {
  return (
    <WindowChrome title={youtubeTitleSlot()} style={style} onMouseDown={onFocus}>
      <YoutubeApp />
    </WindowChrome>
  )
}
