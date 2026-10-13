import type { Plugin } from 'vite'

const PLACEHOLDER = '__EMBED_ENTRY_CSS__'

/**
 * Vite leaves the entry's CSS as a separate file for an index.html to link,
 * but an embed module has no HTML. This moves that CSS into the entry chunk:
 * every `__EMBED_ENTRY_CSS__` identifier becomes the CSS as a string literal.
 * (CSS of lazy chunks is still loaded by Vite's preload helper.)
 */
export function inlineEntryCss(): Plugin {
  return {
    name: 'inline-entry-css',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      for (const chunk of Object.values(bundle)) {
        if (chunk.type !== 'chunk' || !chunk.isEntry) continue
        const cssFiles = [...(chunk.viteMetadata?.importedCss ?? [])]
        const css = cssFiles
          .map((file) => {
            const asset = bundle[file]
            delete bundle[file]
            return asset?.type === 'asset' ? String(asset.source) : ''
          })
          .join('\n')
        chunk.code = chunk.code.replaceAll(PLACEHOLDER, JSON.stringify(css))
      }
    },
  }
}
