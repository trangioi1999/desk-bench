import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '../App'
import { setEmbedStage } from './runtime'
// Built with vite.embed.config.ts, which scopes every rule to .deskbench-root
// so the desktop's styles never leak into the host page.
import globalCss from '../index.css?inline'

// Component (CSS Module) styles, inlined at build time by inlineEntryCss().
declare const __EMBED_ENTRY_CSS__: string

/**
 * Embed contract v1 (see tg-labs-mfe/libs/embed-contract):
 *   mount(element, { basePath, assetBase, theme }) -> { update, unmount }
 * Deskbench has a single screen and its own dark glass look, so it ignores
 * the base path and theme.
 */
export interface MountOptions {
  basePath: string
  assetBase: string
  theme: { mode: 'light' | 'dark'; accent: string }
}

export function mount(element: HTMLElement, _options?: MountOptions) {
  const style = document.createElement('style')
  style.dataset.app = 'deskbench'
  style.textContent = `${globalCss}\n${__EMBED_ENTRY_CSS__}`
  document.head.append(style)

  const container = document.createElement('div')
  container.className = 'deskbench-root'
  container.style.height = '100%'
  element.append(container)
  setEmbedStage(container)

  const root = createRoot(container)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )

  return {
    unmount() {
      root.unmount()
      setEmbedStage(null)
      container.remove()
      style.remove()
    },
  }
}
