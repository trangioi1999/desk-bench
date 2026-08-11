import { WindowChrome } from '../../components/common/WindowChrome'
import { TerminalApp } from '../../apps/terminal/TerminalApp'
import type { WindowFrameProps } from '../../lib/types'

export function TerminalWindow(frame: WindowFrameProps) {
  return (
    <WindowChrome title="Terminal — zsh" glassVariant="terminal" {...frame}>
      <TerminalApp />
    </WindowChrome>
  )
}
