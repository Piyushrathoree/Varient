import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Sparkles } from '@varient/ui'

<Sparkles className="rounded-xl border border-border px-8 py-12">
  <div className="flex flex-col items-center gap-3 text-center">
    <h2 className="text-2xl font-semibold">
      Make it <span className="text-brand">Sparkling</span>
    </h2>
    <button type="button">Shine on</button>
  </div>
</Sparkles>`,
  props: [
    {
      title: 'Sparkles',
      rows: [
        {
          name: 'children',
          type: 'ReactNode',
          description: 'Content to decorate — sparkles render in an overlay above the background.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn().',
        },
        {
          name: 'density',
          type: 'number',
          defaultValue: '16',
          description: 'Maximum concurrent sparkle particles.',
        },
        {
          name: 'size',
          type: '{ min?: number; max?: number }',
          defaultValue: '{ min: 6, max: 12 }',
          description: 'Pixel size range for each sparkle star.',
        },
        {
          name: 'color',
          type: 'string',
          defaultValue: 'color-mix(in oklab, var(--color-foreground) 55%, transparent)',
          description: 'Sparkle fill color.',
        },
        {
          name: 'sparkleDuration',
          type: 'number',
          defaultValue: '1900',
          description: 'Lifecycle duration for each sparkle in milliseconds.',
        },
      ],
    },
  ],
  features: [
    'Maintains a pool of short-lived twinkling stars that spawn, animate, and self-remove on a timer.',
    'Spawn positions are generated via a deterministic seeded PRNG, so server and client markup match exactly (no hydration mismatch).',
    'The spawn interval pauses automatically while the component is scrolled offscreen, via an IntersectionObserver, so idle instances stop burning CPU.',
    'Under `prefers-reduced-motion`, the twinkle loop never starts; wrapped content renders as-is, and a standalone (childless) layer falls back to a few static faint stars.',
    'Sparkle color, size range, density, and per-star lifecycle duration are all configurable.',
  ],
  a11yNotes: [
    'Sparkle particles are decorative — the overlay uses `aria-hidden="true"` and `pointer-events-none`, so they never intercept clicks or focus.',
    'Wrapped content stays fully interactive in a `relative z-10` layer above the sparkle overlay.',
    'Under `prefers-reduced-motion`, no animated sparkles spawn — only wrapped children (or a few static stars when standalone) render.',
    'The spawn interval and particle pool are cleared on unmount and paused while offscreen.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/sparkles/sparkles.tsx',
    'packages/ui/src/components/animated/sparkles/index.ts',
  ],
};
