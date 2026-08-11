// Rasterizes public/icon-source.svg into the PWA icon set. Re-run with
// `npm run generate:icons` after editing the source mark.
import sharp from 'sharp'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(root, '..', 'public')
const svg = readFileSync(path.join(publicDir, 'icon-source.svg'))

const targets = [
  { file: 'icons/icon-192.png', size: 192 },
  { file: 'icons/icon-512.png', size: 512 },
  { file: 'icons/icon-512-maskable.png', size: 512 },
  { file: 'apple-touch-icon.png', size: 180 },
]

for (const { file, size } of targets) {
  const out = path.join(publicDir, file)
  await sharp(svg, { density: 384 }).resize(size, size).png().toFile(out)
  console.log('wrote', file)
}
