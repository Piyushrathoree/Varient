import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { AuroraBackground } from '@/components/animated/aurora-background';

export function Example() {
  return (
    <AuroraBackground className="min-h-64 rounded-xl border border-border">
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <h2 className="text-2xl font-semibold">Aurora backdrop</h2>
        <p className="text-sm text-muted-foreground">Soft ember blobs drift behind your copy.</p>
      </div>
    </AuroraBackground>
  );
}`,
  props: [
    {
      title: 'AuroraBackground',
      rows: [
        {
          name: 'children',
          type: 'ReactNode',
          description: 'Content rendered above the aurora layer.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn().',
        },
        {
          name: 'showRadialGradient',
          type: 'boolean',
          defaultValue: 'true',
          description: 'When true, a radial mask fades the aurora toward the center and bottom.',
        },
        {
          name: 'colors',
          type: 'readonly string[]',
          description:
            'Blob fill colors, cycled across the 4 animated blobs and the static gradient anchors. Defaults to neutral foreground-alpha washes with a faint ember hint.',
        },
        {
          name: 'intensity',
          type: 'number',
          defaultValue: '1',
          description:
            'Scales blob opacity and size from 0 (barely there) to 1 (full presence). Clamped to [0, 1].',
        },
      ],
    },
  ],
  features: [
    '4 slow-drifting blurred blob loops with independent durations (24–36s) and translate/rotate paths, layered over a static radial-gradient wash.',
    'Optional radial mask (`showRadialGradient`) fades the aurora toward the center and bottom so foreground content stays legible.',
    'Custom `colors` array recolors both the animated blobs and the static gradient anchors, cycling if fewer colors than blobs are given.',
    '`intensity` prop scales blob opacity (0.25–1) and size (0.75–1 scale) for a lighter or fuller presence without touching color or motion.',
    'Blob loops pause automatically while the container is scrolled offscreen via `useViewportActive`, and resume on re-entry.',
    'Under `prefers-reduced-motion`, animated blobs collapse into a static gradient wash — no translate or rotate loops run.',
  ],
  aria: [
    {
      attribute: 'aria-hidden="true"',
      element: 'Decorative blob/gradient layer',
      purpose: 'Keeps the ambient background out of the accessibility tree.',
    },
    {
      attribute: 'pointer-events-none',
      element: 'Decorative blob/gradient layer',
      purpose: 'Ensures the aurora never intercepts clicks or focus.',
    },
  ],
  a11yNotes: [
    'Content stays fully interactive when stacked above the layer with `relative z-10` (applied automatically to `children`).',
    'Under `prefers-reduced-motion`, the 4 blob loops are replaced with a static gradient wash — no translate/rotate animation runs.',
    'The blob loops pause while the container is scrolled offscreen (via `useViewportActive`) so off-screen instances stop burning CPU/battery.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/aurora-background/aurora-background.tsx',
    'packages/ui/src/components/animated/aurora-background/index.ts',
  ],
};
