import type { CSSProperties } from 'react'
import { WindowChrome } from '../../components/common/WindowChrome'
import { TerminalApp } from '../../apps/terminal/TerminalApp'

interface TerminalWindowProps {
  style: CSSProperties
  onFocus: () => void
}

export function TerminalWindow({ style, onFocus }: TerminalWindowProps) {
  return (
    <WindowChrome title="Terminal — zsh" glassVariant="terminal" style={style} onMouseDown={onFocus}>
      <TerminalApp />
    </WindowChrome>
  )
}
