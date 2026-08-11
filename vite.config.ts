import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/*.svg'],
      manifest: {
        name: 'Deskbench',
        short_name: 'Deskbench',
        description:
          'A browser-based glass desktop environment — dock, windows, Control Center, Spotlight, Music, YouTube, Terminal and Notification Center.',
        theme_color: '#0b0d12',
        background_color: '#0b0d12',
        display: 'standalone',
        orientation: 'landscape',
        start_url: './',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icons/icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        // The YouTube player API and its iframe must always hit the network —
        // precaching or serving them from the SW breaks embedded playback.
        navigateFallbackDenylist: [/^\/(embed|iframe_api)/],
        runtimeCaching: [
          {
            urlPattern: ({ url }: { url: URL }) =>
              url.hostname.endsWith('youtube.com') || url.hostname.endsWith('ytimg.com'),
            handler: 'NetworkOnly',
          },
        ],
      },
    }),
  ],
})
