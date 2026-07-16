import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { BorderBeam } from '@varient/ui'

<BorderBeam className="rounded-xl">
  <div className="rounded-xl border border-border bg-card p-6">
    <h3 className="text-lg font-semibold">Pro plan</h3>
    <p className="text-sm text-muted-foreground">Animated border highlight.</p>
  </div>
</BorderBeam>`,
  props: [
    {
      title: 'BorderBeam',
      rows: [
        { name: 'children', type: 'ReactNode', description: 'Content wrapped by the beam overlay.' },
        { name: 'size', type: 'number', defaultValue: '150', description: 'Beam length in pixels.' },
        { name: 'duration', type: 'number', defaultValue: '15', description: 'Seconds for one full loop around the border.' },
        { name: 'delay', type: 'number', defaultValue: '0', description: 'Delay before the animation starts, in seconds.' },
        { name: 'colorFrom', type: 'string', defaultValue: 'var(--color-brand)', description: 'Start color of the beam gradient.' },
        { name: 'colorTo', type: 'string', defaultValue: 'var(--color-brand-secondary)', description: 'End color of the beam gradient.' },
        { name: 'borderWidth', type: 'number', defaultValue: '1.5', description: 'Border width in pixels.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn(). Applied to the wrapper.' },
      ],
    },
  ],
  features: [
    'Beam travels along the wrapper border using CSS `offset-path`, masked to a thin ring via combined mask layers.',
    'Negative `delay` value fast-forwards the loop start, so multiple beams can appear phase-offset without a timeout.',
    'Pauses automatically while scrolled offscreen via `useViewportActive` to avoid burning CPU on off-screen loops.',
    'Under `prefers-reduced-motion`, renders a static subtle border instead of the traveling beam.',
    'Colors and beam size are fully customizable and default to semantic brand tokens.',
  ],
  a11yNotes: [
    'The beam overlay is decorative and marked `aria-hidden` — it does not affect the accessible name or structure of wrapped content.',
    'Under `prefers-reduced-motion`, the traveling animation is disabled and a static subtle border is shown instead.',
    'Wrapped content remains fully interactive; the beam layer uses `pointer-events-none`.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/border-beam/border-beam.tsx',
    'packages/ui/src/components/animated/border-beam/index.ts',
  ],
};
