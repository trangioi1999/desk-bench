# Deskbench

A browser-based "web desktop" — wallpaper, glass menu bar, dock, floating windows —
styled after macOS Sequoia × iOS 18 glassmorphism. Built from a
[Claude Design](https://claude.ai/design) handoff.

Includes:

- **Desktop shell**: wallpaper, menu bar with a live clock, dock with hover
  magnification and running-app indicators, draggable-free focus/z-order window model
- **Apps**: Ảnh (photos), Nhạc (compact mini-player that expands into a full
  library/playlist/queue view), Pomodoro (live countdown + progress ring),
  YouTube (player + up-next rail), Terminal
- **System surfaces**: Control Center (toggles, brightness/volume sliders, mini
  player), Spotlight (⌘K, live search), Notification Center (click the clock),
  right-click context menu, ⌘/Ctrl+Tab app switcher
- Installable as a **PWA** (offline-capable, home-screen installable)

All UI copy is Vietnamese, matching the original design.

## Stack

React + TypeScript + Vite, CSS Modules with a shared design-token layer
(`src/styles/tokens.css`), [Zustand](https://github.com/pmndrs/zustand) for shared
desktop state, [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) for the service
worker/manifest.

## Project structure

```
src/
  components/
    common/     shared primitives (glass panel, window chrome, sliders, toggles…)
    icons/      outline SVG icon set
  desktop/      wallpaper, menu bar, dock, window manager, per-window shells
  system/       Control Center, Spotlight, Notification Center, context menu, app switcher
  apps/         richer app content (Music library, YouTube, Terminal)
  store/        Zustand store + global effects (timers, keyboard shortcuts)
  lib/          seed data, types, shared constants
```

## Development

```bash
npm install
npm run dev        # start dev server
npm run build       # typecheck + production build
npm run lint         # oxlint
npm run generate:icons  # regenerate PWA icons from public/icon-source.svg
```

## Deploy

Pushing to `main` builds and deploys to GitHub Pages via
`.github/workflows/deploy.yml`. Enable **Settings → Pages → Source: GitHub Actions**
on this repo once, and it deploys automatically from then on.
