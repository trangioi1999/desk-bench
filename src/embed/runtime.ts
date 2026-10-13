/**
 * Standalone (the default) or embedded in a host page through `mount()`
 * (src/embed/mount.tsx), e.g. TG Labs at /apps/deskbench. Embedded, the
 * desktop sizes itself to the element it was given instead of the window.
 */
let stage: HTMLElement | null = null

export function setEmbedStage(element: HTMLElement | null): void {
  stage = element
}

export function embedStage(): HTMLElement | null {
  return stage
}
