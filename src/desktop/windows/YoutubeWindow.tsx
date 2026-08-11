import { WindowChrome } from '../../components/common/WindowChrome'
import { YoutubeApp, YoutubeTitle } from '../../apps/youtube/YoutubeApp'
import type { WindowFrameProps } from '../../lib/types'

export function YoutubeWindow(frame: WindowFrameProps) {
  return (
    <WindowChrome title={<YoutubeTitle />} {...frame}>
      <YoutubeApp />
    </WindowChrome>
  )
}
