import { useEffect, useState } from 'react'

/** Scales the fixed-size desktop stage down to fit the viewport (never up),
 * so the whole desktop stays visible on tablets/phones too. */
export function useFitScale(stageWidth: number, stageHeight: number, padding = 24) {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const update = () => {
      const availW = window.innerWidth - padding * 2
      const availH = window.innerHeight - padding * 2
      const next = Math.min(1, availW / stageWidth, availH / stageHeight)
      setScale(Number.isFinite(next) && next > 0 ? next : 1)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [stageWidth, stageHeight, padding])

  return scale
}
