import { useDesktopStore } from '../store/useDesktopStore'
import { LIBRARY } from '../lib/data'
import {
  BluetoothIcon,
  BrightnessIcon,
  DarkModeIcon,
  FocusIcon,
  NextIcon,
  PauseIcon,
  PlayIcon,
  PrevIcon,
  SpeakerIcon,
  WifiIcon,
} from '../components/icons'
import { ToggleTile } from '../components/common/ToggleTile'
import { CapsuleSlider } from '../components/common/CapsuleSlider'
import glass from '../components/common/Glass.module.css'
import styles from './ControlCenter.module.css'

export function ControlCenter() {
  const cc = useDesktopStore((s) => s.cc)
  const wifi = useDesktopStore((s) => s.wifi)
  const bt = useDesktopStore((s) => s.bt)
  const focusMode = useDesktopStore((s) => s.focusMode)
  const dark = useDesktopStore((s) => s.dark)
  const bright = useDesktopStore((s) => s.bright)
  const vol = useDesktopStore((s) => s.vol)
  const toggleWifi = useDesktopStore((s) => s.toggleWifi)
  const toggleBt = useDesktopStore((s) => s.toggleBt)
  const toggleFocusMode = useDesktopStore((s) => s.toggleFocusMode)
  const toggleDark = useDesktopStore((s) => s.toggleDark)
  const setBright = useDesktopStore((s) => s.setBright)
  const setVol = useDesktopStore((s) => s.setVol)
  const trackIndex = useDesktopStore((s) => s.trackIndex)
  const playing = useDesktopStore((s) => s.playing)
  const togglePlay = useDesktopStore((s) => s.togglePlay)
  const nextTrack = useDesktopStore((s) => s.nextTrack)
  const prevTrack = useDesktopStore((s) => s.prevTrack)
  const now = LIBRARY[trackIndex]

  if (!cc) return null

  return (
    <div className={`${styles.panel} ${glass.panel}`} onMouseDown={(e) => e.stopPropagation()}>
      <div className={styles.grid}>
        <ToggleTile
          on={wifi}
          onClick={toggleWifi}
          label="Wi‑Fi"
          stateText={wifi ? 'Nhà — 5GHz' : 'Tắt'}
          icon={(fg) => <WifiIcon size={20} color={fg} />}
        />
        <ToggleTile
          on={bt}
          onClick={toggleBt}
          label="Bluetooth"
          stateText={bt ? 'Đã kết nối' : 'Tắt'}
          icon={(fg) => <BluetoothIcon size={20} color={fg} />}
        />
        <ToggleTile
          on={focusMode}
          onClick={toggleFocusMode}
          label="Tập trung"
          stateText={focusMode ? 'Đang bật' : 'Tắt'}
          icon={(fg) => <FocusIcon size={20} color={fg} />}
        />
        <ToggleTile
          on={dark}
          onClick={toggleDark}
          label="Chế độ tối"
          stateText={dark ? 'Đang bật' : 'Tắt'}
          icon={(fg) => <DarkModeIcon size={20} color={fg} />}
        />
      </div>

      <div className={styles.sliders}>
        <CapsuleSlider
          value={bright}
          onChange={setBright}
          height={30}
          label="Độ sáng"
          icon={<BrightnessIcon size={15} color="#3a4152" />}
        />
        <CapsuleSlider
          value={vol}
          onChange={setVol}
          height={30}
          label="Âm lượng"
          icon={<SpeakerIcon size={15} waves={1} color="#3a4152" />}
        />
      </div>

      <div className={styles.miniPlayer}>
        <div className={styles.miniArt} />
        <div className={styles.miniMeta}>
          <div className={styles.miniTitle}>{now.title}</div>
          <div className={styles.miniArtist}>{now.artist}</div>
        </div>
        <div className={styles.miniTransport}>
          <button type="button" onClick={prevTrack} aria-label="Bài trước">
            <PrevIcon size={18} />
          </button>
          <button type="button" onClick={togglePlay} aria-label="Phát/Tạm dừng">
            {playing ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
          </button>
          <button type="button" onClick={nextTrack} aria-label="Bài tiếp theo">
            <NextIcon size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
