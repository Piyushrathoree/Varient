import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Particles } from '@varient/ui';

export function Example() {
  return (
    <div className="relative h-64 overflow-hidden rounded-xl border border-border bg-card">
      <Particles />
      <h3 className="relative z-10 flex h-full items-center justify-center text-lg font-semibold">
        Your headline
      </h3>
    </div>
  );
}`,
  props: [
    {
      title: 'Particles',
      rows: [
        {
          name: 'quantity',
          type: 'number',
          defaultValue: '60',
          description: 'Number of particles to render.',
        },
        {
          name: 'color',
          type: 'string',
          description:
            'Particle fill color — defaults to foreground at low alpha, read from CSS at mount.',
        },
        {
          name: 'size',
          type: 'number',
          defaultValue: '1.5',
          description: 'Particle radius in CSS pixels.',
        },
        {
          name: 'ease',
          type: 'number',
          defaultValue: '50',
          description: 'Mouse repel strength — higher values push particles farther from the pointer.',
        },
        {
          name: 'staticity',
          type: 'number',
          defaultValue: '50',
          description: 'How quickly particles settle after mouse influence — higher values feel more static.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn(). Applied to the canvas element.',
        },
      ],
    },
  ],
  features: [
    'Canvas-rendered particle field with deterministic seeded positions (SSR-stable, no hydration mismatch).',
    'Particles drift on their own velocity and subtly repel from the pointer within the parent container.',
    'The rAF draw loop pauses automatically while scrolled offscreen (useViewportActive) and resumes on re-entry.',
    'Resizes with the parent via ResizeObserver, re-seeding the field to the new dimensions.',
    'Under prefers-reduced-motion, draws a single static scattered frame with no animation loop and no pointer tracking.',
  ],
  aria: [
    {
      attribute: 'aria-hidden="true"',
      element: 'canvas',
      purpose: 'Particle field is decorative; content layered above carries the accessible name.',
    },
    {
      attribute: 'pointer-events-none',
      element: 'canvas',
      purpose: 'Keeps foreground content fully interactive; pointer position is read from the parent container.',
    },
  ],
  a11yNotes: [
    'Under prefers-reduced-motion, static scattered dots are drawn once with no animation loop and no pointer listeners attached.',
    'The draw loop pauses while the canvas is scrolled offscreen and resumes when it re-enters the viewport, avoiding wasted CPU/battery.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/particles/particles.tsx',
    'packages/ui/src/components/animated/particles/index.ts',
  ],
};
