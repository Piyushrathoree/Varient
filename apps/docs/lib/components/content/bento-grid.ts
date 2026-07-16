import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { BentoGrid, BentoGridItem } from '@varient/ui'

<BentoGrid>
  <BentoGridItem
    className="md:col-span-2"
    title="Wide cell"
    description="Spans two columns on md+."
    header={<div className="h-28 bg-muted" />}
  />
  <BentoGridItem title="Standard" description="Single column cell." />
</BentoGrid>`,
  props: [
    {
      title: 'BentoGrid',
      rows: [
        {
          name: 'className',
          type: 'string',
          description: 'Grid layout classes (default: 1 col mobile, 3 col md).',
        },
        { name: 'children', type: 'ReactNode', description: 'BentoGridItem instances.' },
      ],
    },
    {
      title: 'BentoGridItem',
      rows: [
        { name: 'title', type: 'string', description: 'Card heading.' },
        { name: 'description', type: 'string', description: 'Supporting copy below the title.' },
        {
          name: 'header',
          type: 'ReactNode',
          description: 'Optional visual area above the text (image, gradient, skeleton).',
        },
        {
          name: 'icon',
          type: 'ReactNode',
          description: 'Optional icon rendered in a brand-tinted chip.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Cell span and surface overrides (e.g. md:col-span-2).',
        },
      ],
    },
  ],
  features: [
    'Staggered fade-and-rise entrance for grid items when the grid scrolls into view (once, via useInView).',
    'Cards lift on hover with the shared SPRING_DEFAULT spring.',
    'Optional header visual, icon chip, title, and description slots per cell.',
    'className overrides on BentoGridItem control column/row spans (e.g. md:col-span-2).',
    'Fully static, non-animated render path under prefers-reduced-motion.',
  ],
  a11yNotes: [
    'Cards use semantic heading (h3) and paragraph text — screen readers get the full content immediately.',
    'Entrance stagger and hover lift are disabled under prefers-reduced-motion; cards render statically with no motion.',
    'Hover shadow transition uses motion-reduce:transition-none as a CSS fallback.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/bento-grid/bento-grid.tsx',
    'packages/ui/src/components/animated/bento-grid/index.ts',
  ],
};
