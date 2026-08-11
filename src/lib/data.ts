import type { AppEntry, Notification, Playlist, Track, Video, WindowPos } from './types'
import type { WindowId } from './types'

export const DEFAULT_WINDOW_POS: Record<WindowId, WindowPos> = {
  photos: { top: 96, left: 104, width: 520 },
  music: { top: 168, left: 392, width: 380 },
  pomodoro: { top: 120, left: 740, width: 400 },
  youtube: { top: 66, left: 260, width: 880 },
  terminal: { top: 150, left: 470, width: 520 },
  settings: { top: 280, left: 560, width: 360 },
}

export const MUSIC_EXPANDED_POS: WindowPos = { top: 52, left: 300, width: 840 }

export const WINDOW_TITLES: Record<WindowId, string> = {
  photos: 'Ảnh',
  music: 'Nhạc',
  pomodoro: 'Pomodoro',
  youtube: 'YouTube',
  terminal: 'Terminal — zsh',
  settings: 'Cài đặt hệ thống',
}

export const LIBRARY: Track[] = [
  { title: 'Chiều Nhạt Nắng', artist: 'Lam Phương', album: 'Đêm Thị Thành', dur: '3:36' },
  { title: 'Nắng Thuỷ Tinh', artist: 'Trịnh Công Sơn', album: 'Diễm Xưa', dur: '4:12' },
  { title: 'Phố Không Mùa', artist: 'Bùi Anh Tuấn', album: 'Single', dur: '5:04' },
  { title: 'Có Chàng Trai Viết Lên Cây', artist: 'Phan Mạnh Quỳnh', album: 'Mắt Biếc OST', dur: '4:48' },
  { title: 'Đi Về Nhà', artist: 'Đen Vâu', album: 'Single', dur: '3:52' },
  { title: 'Tình Đơn Phương', artist: 'Lam Trường', album: 'Gót Hồng', dur: '4:26' },
  { title: 'Chuyện Của Mùa Đông', artist: 'Hà Anh Tuấn', album: 'Fragile', dur: '4:02' },
  { title: 'Trên Tình Bạn Dưới Tình Yêu', artist: 'MIN', album: 'Single', dur: '3:18' },
]

export const PLAYLIST_TRACK_INDICES: Record<string, number[]> = {
  'Chill chiều muộn': [0, 1, 2, 3, 4, 5, 6, 7],
  'Deep work': [1, 2, 6],
  'Nhạc Việt xưa': [0, 1, 5],
  'Ngủ ngon': [1, 6],
}

export function durationToSeconds(dur: string): number {
  const [m, s] = dur.split(':').map(Number)
  return m * 60 + s
}

export function sumDurations(tracks: { dur: string }[]): string {
  const totalSeconds = tracks.reduce((sum, t) => sum + durationToSeconds(t.dur), 0)
  const minutes = Math.round(totalSeconds / 60)
  if (minutes < 60) return `${minutes} phút`
  return `${Math.floor(minutes / 60)} giờ ${minutes % 60} phút`
}

export const PLAYLISTS: Playlist[] = [
  { name: 'Chill chiều muộn', count: 8, swatch: 'linear-gradient(150deg,#8fb6ff,#b9a8ff)' },
  { name: 'Deep work', count: 3, swatch: 'linear-gradient(150deg,#7fd6c8,#8fb6ff)' },
  { name: 'Nhạc Việt xưa', count: 3, swatch: 'linear-gradient(150deg,#f2b8a0,#e08fa8)' },
  { name: 'Ngủ ngon', count: 2, swatch: 'linear-gradient(150deg,#7a86b8,#4d5578)' },
]

/** Index 0 is what the player opens on; the rest fill the "Tiếp theo" rail.
 * Picking a rail item swaps it into the player, so the list is one pool. */
export const VIDEOS: Video[] = [
  {
    title: 'lofi hip hop radio — nhạc để tập trung & học bài',
    channel: 'Chill Study Radio',
    meta: '12 Tr lượt xem',
    subs: '2,4 Tr người đăng ký',
    len: '2:04:37',
    art: ['rgba(143,182,255,.2)', 'rgba(185,168,255,.14)'],
    caption: '♪ nhạc lofi nhẹ nhàng ♪',
  },
  {
    title: 'Jazz cà phê buổi sáng — nhạc nền thư giãn 3 giờ',
    channel: 'Coffee Shop Vibes',
    meta: '1,2 Tr lượt xem',
    subs: '890 N người đăng ký',
    len: '3:02:11',
    art: ['rgba(214,166,110,.22)', 'rgba(180,120,80,.16)'],
    caption: '♪ tiếng kèn saxophone ♪',
  },
  {
    title: 'Deep focus mix cho lập trình viên',
    channel: 'Focus Lab',
    meta: '842 N lượt xem',
    subs: '1,1 Tr người đăng ký',
    len: '1:48:22',
    art: ['rgba(127,214,200,.22)', 'rgba(94,150,214,.16)'],
    caption: '♪ nhạc điện tử tối giản ♪',
  },
  {
    title: 'Piano nhẹ nhàng khi trời mưa',
    channel: 'Rainy Piano',
    meta: '2,8 Tr lượt xem',
    subs: '3,5 Tr người đăng ký',
    len: '2:15:40',
    art: ['rgba(150,170,214,.22)', 'rgba(110,130,180,.16)'],
    caption: '♪ tiếng mưa và tiếng dương cầm ♪',
  },
  {
    title: 'Synthwave đêm khuya — lái xe qua thành phố',
    channel: 'Neon Drive',
    meta: '410 N lượt xem',
    subs: '260 N người đăng ký',
    len: '58:07',
    art: ['rgba(214,110,180,.22)', 'rgba(120,90,214,.18)'],
    caption: '♪ synth bass dồn dập ♪',
  },
  {
    title: 'Tiếng sóng biển 8 giờ để ngủ sâu',
    channel: 'Nature Sound',
    meta: '5,1 Tr lượt xem',
    subs: '6,2 Tr người đăng ký',
    len: '8:00:00',
    art: ['rgba(110,180,190,.22)', 'rgba(60,120,150,.16)'],
    caption: '♪ tiếng sóng vỗ bờ ♪',
  },
]

/** "H:MM:SS" or "M:SS" -> seconds */
export function parseDuration(len: string): number {
  const parts = len.split(':').map(Number)
  return parts.reduce((total, part) => total * 60 + part, 0)
}

/** seconds -> "H:MM:SS" when over an hour, else "M:SS" */
export function formatDuration(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  const pad = (n: number) => String(n).padStart(2, '0')
  return h > 0 ? `${h}:${pad(m)}:${pad(sec)}` : `${m}:${pad(sec)}`
}

export const NOTIFICATIONS: Notification[] = [
  {
    app: 'Lịch',
    time: '5 phút',
    text: 'Standup nhóm Design bắt đầu lúc 14:30 — phòng Aurora.',
    d: 'M4.5 6.5h15v13h-15zM8 3.6v4M16 3.6v4M4.5 10.5h15',
  },
  {
    app: 'Pomodoro',
    time: 'vừa xong',
    text: 'Hoàn thành phiên 2 — nghỉ 5 phút rồi quay lại nhé.',
    d: 'M12 9.6V13l2.4 1.6M4.6 13a7.4 7.4 0 1 0 14.8 0 7.4 7.4 0 0 0-14.8 0',
  },
  {
    app: 'Tin nhắn',
    time: '12 phút',
    text: 'Minh: bản glass UI nhìn ngon rồi, mai demo nha 🙂',
    d: 'M4.5 6.5h15v10h-9l-4 3.5v-3.5h-2z',
  },
]

export const APPS: AppEntry[] = [
  { id: 'pomodoro', name: 'Pomodoro', kind: 'Ứng dụng', d: 'M12 13V9.6l2.4 1.6M4.6 13a7.4 7.4 0 1 0 14.8 0 7.4 7.4 0 0 0-14.8 0' },
  { id: 'music', name: 'Nhạc', kind: 'Ứng dụng', d: 'M9.6 17V7l10.5-2v10M4.4 17a2.6 2.6 0 1 0 5.2 0 2.6 2.6 0 0 0-5.2 0' },
  { id: 'photos', name: 'Ảnh', kind: 'Ứng dụng', d: 'M3.5 8.5h17v11h-17zM5 17l4.5-4.5 3.5 3.5 2.5-2.5L19 17' },
  { id: 'terminal', name: 'Terminal', kind: 'Ứng dụng', d: 'M3.2 5h17.6v14H3.2zm4.4 5 2.4 2.2-2.4 2.2m4.8 2.2h4' },
  { id: 'youtube', name: 'YouTube', kind: 'Ứng dụng', d: 'M2.8 6h18.4v12H2.8zm7.8 3.6L15 12l-4.4 2.4z' },
  { id: 'settings', name: 'Cài đặt hệ thống', kind: 'Cài đặt', d: 'M8.9 12a3.1 3.1 0 1 0 6.2 0 3.1 3.1 0 0 0-6.2 0M12 3.2v2.4M12 18.4v2.4M3.2 12h2.4M18.4 12h2.4' },
  { id: 'music', name: 'Chiều Nhạt Nắng — Lam Phương', kind: 'Bài hát', d: 'M9.6 17V7l10.5-2v10M4.4 17a2.6 2.6 0 1 0 5.2 0 2.6 2.6 0 0 0-5.2 0' },
  { id: 'settings', name: 'Ghi chú họp 07/08', kind: 'Tài liệu', d: 'M6 3.6h8L18.4 8v12.4H6zM9 12h6M9 15.4h4' },
  { id: 'trash', name: 'Thùng rác', kind: 'Hệ thống', d: 'M5 7.5h14M7.5 7.5 8.4 20.4h7.2L16.5 7.5M9.8 7.5V4.2h4.4v3.3' },
]

const WEEKDAYS_VI = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy']

export function formatClockVi(date: Date): string {
  const weekday = WEEKDAYS_VI[date.getDay()]
  const day = date.getDate()
  const month = date.getMonth() + 1
  const hh = String(date.getHours()).padStart(2, '0')
  const mm = String(date.getMinutes()).padStart(2, '0')
  return `${weekday}, ${day} Th${month}  ${hh}:${mm}`
}
