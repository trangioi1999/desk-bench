import type { CSSProperties } from 'react'

export type IconShape =
  | { t: 'p'; d: string; fill?: string }
  | { t: 'c'; cx: number; cy: number; r: number; fill?: string }
  | { t: 'r'; x: number; y: number; w: number; h: number; rx?: number; fill?: string; opacity?: number }

export interface IconProps {
  size?: number
  strokeWidth?: number
  color?: string
  className?: string
  style?: CSSProperties
}

/** Builds a small React icon component from a declarative shape list — avoids
 * repeating svg/viewBox/stroke boilerplate across ~35 outline glyphs. */
export function makeIcon(
  shapes: IconShape[],
  defaultStrokeWidth = 1.4,
  viewBox = '0 0 24 24',
) {
  return function IconCmp({
    size = 24,
    strokeWidth = defaultStrokeWidth,
    color = 'currentColor',
    className,
    style,
  }: IconProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        style={style}
        aria-hidden="true"
      >
        {shapes.map((s, i) => {
          if (s.t === 'p') return <path key={i} d={s.d} fill={s.fill} />
          if (s.t === 'c') return <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill={s.fill} stroke={s.fill ? 'none' : undefined} />
          return (
            <rect
              key={i}
              x={s.x}
              y={s.y}
              width={s.w}
              height={s.h}
              rx={s.rx}
              fill={s.fill}
              opacity={s.opacity}
              stroke={s.fill ? 'none' : undefined}
            />
          )
        })}
      </svg>
    )
  }
}

/** Data-driven single/multi-path glyph, for icons stored as bare `d` strings in seed data. */
export function GlyphIcon({
  d,
  size = 24,
  strokeWidth = 1.5,
  color = 'currentColor',
  className,
  style,
}: IconProps & { d: string | string[] }) {
  const paths = Array.isArray(d) ? d : [d]
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {paths.map((p, i) => (
        <path key={i} d={p} />
      ))}
    </svg>
  )
}
