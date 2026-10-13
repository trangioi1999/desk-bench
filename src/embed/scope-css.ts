import type { Plugin, Rule } from 'postcss'

const GLOBAL_SELECTOR = /^(:root|:host|html|body)(?![\w-])/

/** `:root[data-theme=dark]` -> `.x[data-theme=dark]`, `.btn` -> `.x .btn`. */
export function scopeSelector(selector: string, scope: string): string {
  const trimmed = selector.trim()
  if (trimmed.startsWith(scope)) return trimmed
  const global = GLOBAL_SELECTOR.exec(trimmed)
  if (global) return scope + trimmed.slice(global[0].length)
  return `${scope} ${trimmed}`
}

/**
 * PostCSS plugin that confines a whole stylesheet (Tailwind theme, preflight
 * and the app's own rules) to one element, so the app can share a page with
 * another site without either restyling the other.
 */
export function scopeCss(scope: string): Plugin {
  const seen = new WeakSet<Rule>()
  return {
    postcssPlugin: 'deskbench-scope-css',
    Rule(rule) {
      if (seen.has(rule)) return
      seen.add(rule)
      const parent = rule.parent
      if (parent?.type === 'atrule' && /keyframes$/i.test((parent as { name: string }).name)) return
      // CSS Modules hash class names after this plugin runs; keep ours global.
      const isModule = /\.module\.css(\?|$)/.test(rule.source?.input.file ?? '')
      const target = isModule ? `:global(${scope})` : scope
      rule.selectors = [...new Set(rule.selectors.map((s) => scopeSelector(s, target)))]
    },
  }
}
