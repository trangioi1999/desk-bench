import type { CSSProperties } from 'react'
import { WindowChrome } from '../../components/common/WindowChrome'
import { SettingsIcon } from '../../components/icons'

interface SettingsWindowProps {
  style: CSSProperties
  onFocus: () => void
}

export function SettingsWindow({ style, onFocus }: SettingsWindowProps) {
  return (
    <WindowChrome title="Cài đặt hệ thống" compact style={style} onMouseDown={onFocus}>
      <div
        style={{
          padding: '40px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          color: 'var(--text-secondary)',
        }}
      >
        <SettingsIcon size={28} color="var(--text-tertiary)" />
        <div style={{ fontSize: 13 }}>Đang phát triển</div>
      </div>
    </WindowChrome>
  )
}
