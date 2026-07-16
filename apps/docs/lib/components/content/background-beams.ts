import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { BackgroundBeams } from '@varient/ui'

<BackgroundBeams className="min-h-64 rounded-xl border border-border">
  <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
    <h2 className="text-2xl font-semibold">Background beams</h2>
    <p className="text-sm text-muted-foreground">Gradient strokes travel along faint curved paths.</p>
  </div>
</BackgroundBeams>`,
  props: [
    {
      title: 'BackgroundBeams',
      rows: [
        { name: 'children', type: 'ReactNode', description: 'Content rendered above the beam layer.' },
        {
          name: 'pathCount',
          type: 'number',
          defaultValue: '6',
          description: 'Number of curved beam paths. Silently clamped to 1–12 (values outside that range are clamped, not rejected).',
        },
        {
          name: 'accentColor',
          type: 'string',
          defaultValue: 'var(--color-brand)',
          description: 'Stroke color for animated gradient highlights.',
        },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn().' },
      ],
    },
  ],
  features: [
    'Full-bleed backdrop of thin curved SVG paths with animated ember gradient strokes traveling along each path.',
    'pathCount controls how many paths render, silently clamped to 1–12.',
    'Each path loop pauses while the component is scrolled offscreen (useViewportActive) and resumes on re-entry.',
    'Under prefers-reduced-motion, paths render as static faint strokes with no gradient travel.',
    'accentColor overrides the gradient stroke color per instance.',
  ],
  a11yNotes: [
    'SVG paths are decorative and marked aria-hidden; they never enter the accessible tree.',
    'The beam layer uses pointer-events-none, so children remain fully interactive.',
    'Reduced motion renders static faint strokes instead of animated gradient travel.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/background-beams/background-beams.tsx',
    'packages/ui/src/components/animated/background-beams/index.ts',
  ],
};
