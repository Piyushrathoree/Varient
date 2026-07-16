import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Meteors } from '@varient/ui';

export function Example() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-foreground px-6 py-16">
      <Meteors number={20} />
      <h2 className="relative z-10 text-center text-lg font-semibold text-background">
        Meteor shower
      </h2>
    </div>
  );
}`,
  props: [
    {
      title: 'Meteors',
      rows: [
        { name: 'number', type: 'number', defaultValue: '20', description: 'Count of meteor streaks to render.' },
        {
          name: 'color',
          type: 'string',
          defaultValue: 'color-mix(in oklab, var(--color-background) 75%, transparent)',
          description: 'Meteor head and trail color.',
        },
        {
          name: 'angle',
          type: 'number',
          defaultValue: '-45',
          description: 'Travel angle in degrees (CSS rotate() convention) — controls the diagonal.',
        },
        {
          name: 'minSpeed',
          type: 'number',
          defaultValue: '3',
          description: 'Fastest loop duration in seconds — lower bound of the randomized range.',
        },
        {
          name: 'maxSpeed',
          type: 'number',
          defaultValue: '9',
          description: 'Slowest loop duration in seconds — upper bound of the randomized range.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional classes merged onto the absolute inset-0 layer via cn().',
        },
      ],
    },
  ],
  features: [
    'Diagonal meteor streaks with a brightened head glow and a lengthened, gradient-fading trail.',
    'Positions, delays, and per-meteor durations are seeded deterministically (seededUnit) so SSR and client render identical layouts with no hydration mismatch.',
    'angle controls the travel diagonal and minSpeed/maxSpeed control the randomized loop-duration range, all additive over the original number/color/className API.',
    'The loop pauses automatically while the layer is scrolled offscreen (useViewportActive) and resumes on re-entry.',
    'Under prefers-reduced-motion, a handful of static glowing meteors are rendered instead of the looping animation.',
    'pointer-events-none absolute inset-0 layer — content stacked above with relative z-10 stays fully interactive.',
  ],
  aria: [
    {
      attribute: 'aria-hidden="true"',
      element: 'each meteor span',
      purpose: 'Meteors are purely decorative and never announced to assistive tech.',
    },
    {
      attribute: 'pointer-events-none',
      element: 'root layer',
      purpose: 'Keeps content stacked above the effect fully interactive and clickable.',
    },
  ],
  a11yNotes: [
    'Decorative only — do not rely on motion to convey information.',
    'Under prefers-reduced-motion the animation loop is disabled and a few static meteors are rendered instead, preserving the look without perpetual motion.',
    'The loop pauses while offscreen and resumes on re-entry, avoiding wasted CPU/battery from off-screen instances.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/meteors/meteors.tsx',
    'packages/ui/src/components/animated/meteors/index.ts',
  ],
};
