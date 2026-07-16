import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { HeroHighlight, Highlight } from '@varient/ui'

<HeroHighlight className="rounded-xl border border-border px-6 py-16">
  <div className="mx-auto max-w-lg text-center">
    <h1 className="text-3xl font-semibold">
      Ship with <Highlight>confidence</Highlight>
    </h1>
    <p className="mt-3 text-sm text-muted-foreground">
      Dots brighten near your cursor.
    </p>
  </div>
</HeroHighlight>`,
  props: [
    {
      title: 'HeroHighlight',
      rows: [
        { name: 'children', type: 'ReactNode', description: 'Hero content rendered above the dot grid.' },
        { name: 'dotSpacing', type: 'number', defaultValue: '20', description: 'Dot grid spacing in pixels.' },
        { name: 'dotRadius', type: 'number', defaultValue: '1', description: 'Dot radius in pixels.' },
        { name: 'spotlightSize', type: 'number', defaultValue: '180', description: 'Cursor reveal spotlight radius in pixels.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn().' },
      ],
    },
    {
      title: 'Highlight',
      rows: [
        { name: 'children', type: 'ReactNode', description: 'Inline text to highlight.' },
        { name: 'color', type: 'string', defaultValue: 'color-mix(in oklab, var(--color-brand) 22%, transparent)', description: 'Highlight bar color behind the text.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes on the wrapper span.' },
      ],
    },
  ],
  features: [
    'Dot-grid backdrop that brightens near the cursor via a spring-driven radial mask.',
    'Highlight renders a brand-tinted bar that sweeps in from the left once scrolled into view (once: true).',
    'Fully static under prefers-reduced-motion — no pointer tracking, no scale animation, bar renders fully visible.',
    'Pointer tracking is scoped to pointermove/pointerleave on the container only; the dot layers are aria-hidden and pointer-events-none.',
    'Configurable dot spacing, dot radius, and spotlight reveal radius per instance.',
  ],
  a11yNotes: [
    'Dot grid layers are decorative (aria-hidden) and pointer-events-none — pointer tracking listens on the container only.',
    'Highlight text stays in normal document flow and is fully readable by screen readers; the color bar is an aria-hidden absolutely-positioned span behind the text.',
    'Under prefers-reduced-motion, the dot grid is static with no pointer event listeners attached, and Highlight skips the scaleX sweep entirely.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/hero-highlight/hero-highlight.tsx',
    'packages/ui/src/components/animated/hero-highlight/index.ts',
  ],
};
