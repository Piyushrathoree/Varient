import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { GridPattern } from '@varient/ui'

<div className="relative h-56 overflow-hidden rounded-xl border border-border bg-background">
  <GridPattern squares={[[2, 1], [4, 3]]} />
  <p className="relative z-10 p-4 font-semibold">Your content</p>
</div>`,
  props: [
    {
      title: 'GridPattern',
      rows: [
        { name: 'width', type: 'number', defaultValue: '40', description: 'Cell width in pixels.' },
        { name: 'height', type: 'number', defaultValue: '40', description: 'Cell height in pixels.' },
        { name: 'x', type: 'number', defaultValue: '-1', description: 'Horizontal pattern offset.' },
        { name: 'y', type: 'number', defaultValue: '-1', description: 'Vertical pattern offset.' },
        {
          name: 'strokeDasharray',
          type: 'string',
          description: 'Optional dash array for grid strokes.',
        },
        {
          name: 'squares',
          type: '[number, number][]',
          defaultValue: '[]',
          description: 'Grid cells to highlight as [col, row] tuples.',
        },
        {
          name: 'isAnimated',
          type: 'boolean',
          defaultValue: 'true',
          description:
            'Highlighted squares pulse in sequence; without highlights the grid pans slowly.',
        },
        {
          name: 'isBrandTinted',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Highlighted cells use a faint brand tint instead of neutral foreground-alpha.',
        },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn().' },
      ],
    },
  ],
  features: [
    'Two animation modes: sequential opacity pulses on highlighted `squares`, or a slow ambient pan when no squares are given.',
    'The pan mode translates a wrapping `<g>` via a GPU-composited transform instead of rewriting the `<pattern>` x/y attributes every frame, avoiding per-frame layout recalculation of the tiled fill.',
    'Both animation modes pause automatically while offscreen via `useViewportActive`, and stop entirely under `prefers-reduced-motion`.',
    'Purely decorative: `aria-hidden` and `pointer-events-none` so it never intercepts focus or clicks from content stacked above it.',
    'Optional brand-tinted highlights (`isBrandTinted`) for ember-accented cards without touching the neutral grid lines.',
  ],
  aria: [
    {
      attribute: 'aria-hidden="true"',
      element: 'svg',
      purpose: 'Removes the decorative grid texture from the accessibility tree.',
    },
  ],
  a11yNotes: [
    'Place `GridPattern` behind real content — it never carries text or interactive elements itself.',
    'Under `prefers-reduced-motion`, highlighted cells render as static fills and the grid does not pan.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/grid-pattern/grid-pattern.tsx',
    'packages/ui/src/components/animated/grid-pattern/index.ts',
  ],
};
