import { WindowChrome } from '../../components/common/WindowChrome'
import { YoutubeApp, youtubeTitleSlot } from '../../apps/youtube/YoutubeApp'
import type { WindowFrameProps } from '../../lib/types'

export function YoutubeWindow(frame: WindowFrameProps) {
  return (
    <WindowChrome title={youtubeTitleSlot()} {...frame}>
      <YoutubeApp />
    </WindowChrome>
  )
}
