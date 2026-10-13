import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { inlineEntryCss } from './src/embed/inline-entry-css.ts'
import { scopeCss } from './src/embed/scope-css.ts'

/**
 * Embeddable build: `dist/embed/mount.js` exports `mount()` (embed contract
 * v1) so a host page — TG Labs at /apps/deskbench — renders the desktop from
 * THIS deployment. One codebase, one deployment, two ways in.
 *
 * CSS is inlined into the module and scoped to .deskbench-root, there is no
 * service worker, and chunk URLs are relative to mount.js so it works from
 * any path (e.g. a /mfe/deskbench/ proxy).
 */
export default defineConfig({
  base: './',
  plugins: [react(), inlineEntryCss()],
  css: {
    postcss: { plugins: [scopeCss('.deskbench-root')] },
  },
  build: {
    outDir: 'dist/embed',
    emptyOutDir: true,
    copyPublicDir: false,
    rollupOptions: {
      input: { mount: fileURLToPath(new URL('./src/embed/mount.tsx', import.meta.url)) },
      preserveEntrySignatures: 'strict',
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
  preview: { cors: true },
})
