import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Globe } from '@/components/animated/globe';

export function Example() {
  return (
    <div className="max-w-md rounded-xl border border-border bg-card p-6">
      <Globe className="mx-auto w-full max-w-[320px]" />
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Drag to rotate
      </p>
    </div>
  );
}`,
  props: [
    {
      title: 'Globe',
      rows: [
        { name: 'markers', type: '{ location: [number, number]; size: number }[]', defaultValue: '5 world cities', description: 'Marker pins on the globe. Location is [latitude, longitude]; size is relative pin radius.' },
        { name: 'isInteractive', type: 'boolean', defaultValue: 'true', description: 'Allow drag-to-spin via pointer on the canvas.' },
        { name: 'speed', type: 'number', defaultValue: '0.003', description: 'Auto-rotation speed in radians per frame. Paused under reduced motion.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn().' },
      ],
    },
  ],
  features: [
    'WebGL rendering via `cobe`, resized to its container with a `ResizeObserver` (device-pixel-ratio capped at 2) and destroyed/recreated cleanly on width changes.',
    'The rAF rotation tick pauses whenever the globe scrolls offscreen (`useViewportActive`, 200px root margin) and resumes exactly where `phi` left off — no wasted frames from off-screen instances, no visual jump on resume.',
    'Theme colors (base/marker/glow RGB + dark flag) are read from `document.documentElement`\'s `dark` class once and kept in a ref updated by a `MutationObserver`, not re-read every animation frame.',
    'Drag-to-spin via Pointer Events when `isInteractive` is true; auto-rotation pauses for the duration of an active drag and resumes after release.',
    'Auto-rotation stops entirely under `prefers-reduced-motion`; drag-to-spin still works when `isInteractive` is true so users can explore manually.',
    'Canvas is `aria-hidden` and purely decorative — pair it with adjacent visible text describing the interaction.',
  ],
  a11yNotes: [
    'The canvas is decorative and marked `aria-hidden` — describe the globe and drag interaction with adjacent visible text (e.g. "Drag to rotate").',
    'Auto-rotation stops under `prefers-reduced-motion`; drag-to-spin still works when `isInteractive` is true so users can explore manually.',
    'No keyboard rotation is provided — the globe is supplementary decoration, not a primary navigation control.',
  ],
  dependencies: ['cobe'],
  sourceFiles: [
    'packages/ui/src/components/animated/globe/globe.tsx',
    'packages/ui/src/components/animated/globe/index.ts',
  ],
};
