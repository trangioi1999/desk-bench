import { makeIcon, type IconProps } from './Icon'

export { GlyphIcon } from './Icon'

// ---- menu bar ----
export const WifiMenuIcon = makeIcon(
  [
    { t: 'p', d: 'M4.5 9.5a11 11 0 0 1 15 0' },
    { t: 'p', d: 'M7.5 13a7 7 0 0 1 9 0' },
    { t: 'p', d: 'M10.5 16.4a3 3 0 0 1 3 0' },
    { t: 'c', cx: 12, cy: 19.2, r: 0.9, fill: 'currentColor' },
  ],
  1.4,
)

export const BatteryIcon = makeIcon(
  [
    { t: 'r', x: 3, y: 8.5, w: 15, h: 9, rx: 3 },
    { t: 'p', d: 'M20 11.5v3.5' },
    { t: 'r', x: 5, y: 10.5, w: 9, h: 5, rx: 1.6, fill: 'currentColor', opacity: 0.85 },
  ],
  1.3,
)

export const VolumeMenuIcon = makeIcon(
  [
    { t: 'p', d: 'M11 5.5 6.5 9.5H4v5h2.5L11 18.5z' },
    { t: 'p', d: 'M15 9.8a3.4 3.4 0 0 1 0 4.4' },
    { t: 'p', d: 'M17.6 7.5a6.8 6.8 0 0 1 0 9' },
  ],
  1.4,
)

export const ControlCenterIcon = makeIcon(
  [
    { t: 'p', d: 'M6 4v6' },
    { t: 'p', d: 'M6 14v6' },
    { t: 'c', cx: 6, cy: 12, r: 2 },
    { t: 'p', d: 'M18 4v10' },
    { t: 'p', d: 'M18 18v2' },
    { t: 'c', cx: 18, cy: 16, r: 2 },
  ],
  1.4,
)

export const SearchIcon = makeIcon(
  [
    { t: 'c', cx: 11, cy: 11, r: 6.2 },
    { t: 'p', d: 'm15.6 15.6 3.4 3.4' },
  ],
  1.5,
)

// ---- control center toggles ----
export const WifiIcon = makeIcon(
  [
    { t: 'p', d: 'M4.5 9.5a11 11 0 0 1 15 0' },
    { t: 'p', d: 'M7.5 13a7 7 0 0 1 9 0' },
    { t: 'c', cx: 12, cy: 17.6, r: 1.1, fill: 'currentColor' },
  ],
  1.5,
)

export const BluetoothIcon = makeIcon(
  [
    { t: 'p', d: 'M12 3v18l5-4.5L7 8' },
    { t: 'p', d: 'M7 16 17 7.5 12 3' },
  ],
  1.5,
)

export const FocusIcon = makeIcon(
  [{ t: 'p', d: 'M20 13.5A8 8 0 1 1 10.4 4a6.6 6.6 0 0 0 9.6 9.5z' }],
  1.5,
)

export const DarkModeIcon = makeIcon(
  [
    { t: 'c', cx: 12, cy: 12, r: 4.4 },
    {
      t: 'p',
      d: 'M12 3.4v1.8M12 18.8v1.8M3.4 12h1.8M18.8 12h1.8M6 6l1.3 1.3M16.7 16.7 18 18M18 6l-1.3 1.3M7.3 16.7 6 18',
    },
  ],
  1.5,
)

export const BrightnessIcon = makeIcon(
  [
    { t: 'c', cx: 12, cy: 12, r: 4 },
    { t: 'p', d: 'M12 4v2M12 18v2M4 12h2M18 12h2' },
  ],
  1.6,
)

// ---- speaker: progressive volume glyph, 0/1/2 sound waves ----
const SPEAKER_BASE = 'M11 6 7 9.5H4.5v5H7l4 3.5z'
const SPEAKER_WAVE_1 = 'M14.5 9.6a3.4 3.4 0 0 1 0 4.8'
const SPEAKER_WAVE_2 = 'M17.2 7.2a6.8 6.8 0 0 1 0 9.6'
export function SpeakerIcon({
  waves = 2,
  ...props
}: IconProps & { waves?: 0 | 1 | 2 }) {
  const Cmp = makeIcon(
    [
      { t: 'p', d: SPEAKER_BASE },
      ...(waves >= 1 ? [{ t: 'p' as const, d: SPEAKER_WAVE_1 }] : []),
      ...(waves >= 2 ? [{ t: 'p' as const, d: SPEAKER_WAVE_2 }] : []),
    ],
    1.5,
  )
  return <Cmp {...props} />
}

// ---- transport ----
export const PrevIcon = makeIcon(
  [
    { t: 'p', d: 'M5.5 6v12' },
    { t: 'p', d: 'M8 12 17 6.4v11.2z' },
  ],
  1.5,
)
export const NextIcon = makeIcon(
  [
    { t: 'p', d: 'M18.5 6v12' },
    { t: 'p', d: 'M16 12 7 6.4v11.2z' },
  ],
  1.5,
)
export const PlayIcon = makeIcon([{ t: 'p', d: 'M8 5.8v12.4L18.5 12z' }], 1.6)
export const PauseIcon = makeIcon([{ t: 'p', d: 'M9.5 6.5v11M14.5 6.5v11' }], 1.6)
export const ShuffleIcon = makeIcon(
  [
    { t: 'p', d: 'M4 7h11l-2.4-2.4M20 17H9l2.4 2.4' },
    { t: 'p', d: 'M17 7h3M4 17h3' },
  ],
  1.5,
)

// ---- app glyphs (fuller versions used in dock + app switcher) ----
export const PhotosDockIcon = makeIcon(
  [
    { t: 'r', x: 3.5, y: 5, w: 17, h: 14, rx: 3.5 },
    { t: 'c', cx: 9, cy: 10, r: 1.6 },
    { t: 'p', d: 'm5 17 4.5-4.5 3.5 3.5 2.5-2.5L19 17' },
  ],
  1.3,
)
export const MusicDockIcon = makeIcon(
  [
    { t: 'c', cx: 7, cy: 17, r: 2.6 },
    { t: 'c', cx: 17.5, cy: 15, r: 2.6 },
    { t: 'p', d: 'M9.6 17V7l10.5-2v10' },
  ],
  1.3,
)
export const YoutubeDockIcon = makeIcon(
  [
    { t: 'r', x: 2.8, y: 6, w: 18.4, h: 12, rx: 4 },
    { t: 'p', d: 'M10.6 9.6 15 12l-4.4 2.4z' },
  ],
  1.3,
)
export const PomodoroDockIcon = makeIcon(
  [
    { t: 'c', cx: 12, cy: 13, r: 7.4 },
    { t: 'p', d: 'M12 9.6V13l2.4 1.6' },
    { t: 'p', d: 'M9.4 3.6h5.2' },
  ],
  1.3,
)
export const TerminalDockIcon = makeIcon(
  [
    { t: 'r', x: 3.2, y: 4.6, w: 17.6, h: 14.8, rx: 3.6 },
    { t: 'p', d: 'm7.6 10 2.4 2.2-2.4 2.2' },
    { t: 'p', d: 'M12.4 14.6h4' },
  ],
  1.3,
)
export const SettingsIcon = makeIcon(
  [
    { t: 'c', cx: 12, cy: 12, r: 3.1 },
    {
      t: 'p',
      d: 'M12 3.2v2.4M12 18.4v2.4M3.2 12h2.4M18.4 12h2.4M5.9 5.9l1.7 1.7M16.4 16.4l1.7 1.7M18.1 5.9l-1.7 1.7M7.6 16.4l-1.7 1.7',
    },
  ],
  1.3,
)
export const TrashIcon = makeIcon(
  [
    { t: 'p', d: 'M5 7.5h14' },
    { t: 'p', d: 'M7.5 7.5 8.4 19a1.6 1.6 0 0 0 1.6 1.4h4a1.6 1.6 0 0 0 1.6-1.4l.9-11.5' },
    { t: 'p', d: 'M9.8 7.5V5.6A1.4 1.4 0 0 1 11.2 4.2h1.6a1.4 1.4 0 0 1 1.4 1.4v1.9' },
  ],
  1.3,
)

// ---- context menu ----
export const FolderNewIcon = makeIcon(
  [
    { t: 'p', d: 'M6 3.6h8L18.4 8v12.4H6z' },
    { t: 'p', d: 'M12 11v6M9 14h6' },
  ],
  1.4,
)
export const SortIcon = makeIcon(
  [
    { t: 'r', x: 4, y: 5, w: 16, h: 14, rx: 3.5 },
    { t: 'p', d: 'M8 10h8M8 14h5' },
  ],
  1.4,
)
export const WallpaperIcon = makeIcon(
  [
    { t: 'r', x: 3.5, y: 5, w: 17, h: 14, rx: 3.5 },
    { t: 'p', d: 'm5 17 4.5-4.5 3.5 3.5 2.5-2.5L19 17' },
  ],
  1.4,
)
export const WidgetIcon = makeIcon(
  [
    { t: 'r', x: 4, y: 4, w: 7, h: 7, rx: 2 },
    { t: 'r', x: 13, y: 4, w: 7, h: 7, rx: 2 },
    { t: 'r', x: 4, y: 13, w: 7, h: 7, rx: 2 },
  ],
  1.4,
)

// ---- music library sidebar ----
export const RecentIcon = MusicDockIcon
export const HeartIcon = makeIcon(
  [
    {
      t: 'p',
      d: 'M12 19.5s-6.8-4.2-6.8-9A3.8 3.8 0 0 1 12 8.4a3.8 3.8 0 0 1 6.8 2.1c0 4.8-6.8 9-6.8 9z',
    },
  ],
  1.4,
)
export const AlbumIcon = makeIcon(
  [
    { t: 'r', x: 4, y: 5, w: 16, h: 14, rx: 3.5 },
    { t: 'p', d: 'M8 9.5h8M8 13h5' },
  ],
  1.4,
)

// ---- youtube ----
export const CaptionsIcon = makeIcon(
  [
    { t: 'r', x: 4, y: 6, w: 16, h: 12, rx: 3 },
    { t: 'p', d: 'M7.5 12.5h3M13 12.5h3.5' },
  ],
  1.5,
)
export const FullscreenIcon = makeIcon(
  [
    {
      t: 'p',
      d: 'M4 9V5.6a1.6 1.6 0 0 1 1.6-1.6H9M15 4h3.4A1.6 1.6 0 0 1 20 5.6V9M20 15v3.4a1.6 1.6 0 0 1-1.6 1.6H15M9 20H5.6A1.6 1.6 0 0 1 4 18.4V15',
    },
  ],
  1.5,
)
export const LikeIcon = makeIcon(
  [
    {
      t: 'p',
      d: 'M7 11v9H4.5v-9zM7 11l3.6-7a2 2 0 0 1 3.4 1.8L13 11h5.2a1.8 1.8 0 0 1 1.8 2.2l-1.3 5.4a1.8 1.8 0 0 1-1.8 1.4H7',
    },
  ],
  1.5,
)

// ---- notification center widgets ----
export const WeatherCloudIcon = makeIcon(
  [
    {
      t: 'p',
      d: 'M7.5 17.5h9a3.5 3.5 0 0 0 .3-7 5 5 0 0 0-9.5-.6A3.3 3.3 0 0 0 7.5 17.5z',
    },
  ],
  1.3,
)
