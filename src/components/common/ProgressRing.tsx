const CIRCUMFERENCE = 653.5 // 2 * PI * r(104), viewBox 0 0 240 240

interface ProgressRingProps {
  size: number
  strokeWidth: number
  /** fraction remaining, 0..1 */
  remaining: number
  glow?: boolean
}

export function ProgressRing({ size, strokeWidth, remaining, glow = false }: ProgressRingProps) {
  const offset = (CIRCUMFERENCE * (1 - remaining)).toFixed(1)
  return (
    <svg width={size} height={size} viewBox="0 0 240 240" style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={120} cy={120} r={104} fill="none" stroke="rgba(255,255,255,.1)" strokeWidth={strokeWidth} />
      <circle
        cx={120}
        cy={120}
        r={104}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={offset}
        style={{
          transition: 'stroke-dashoffset .95s linear',
          filter: glow ? 'drop-shadow(0 0 10px rgba(143,182,255,.45))' : undefined,
        }}
      />
    </svg>
  )
}
