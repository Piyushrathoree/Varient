import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Orbit } from '@varient/ui'

<div className="relative flex h-64 items-center justify-center">
  <div className="absolute z-10 size-12 rounded-full border border-border bg-card" />
  <Orbit radius={80} duration={20}>
    <div className="size-8 rounded-lg border border-border bg-background" />
    <div className="size-8 rounded-lg border border-border bg-background" />
    <div className="size-8 rounded-lg border border-border bg-background" />
  </Orbit>
</div>`,
  props: [
    {
      title: 'Orbit',
      rows: [
        {
          name: 'children',
          type: 'ReactNode',
          description: 'Orbiting items — each child is placed evenly around the circle.',
        },
        { name: 'radius', type: 'number', defaultValue: '80', description: 'Orbit radius in pixels.' },
        { name: 'duration', type: 'number', defaultValue: '20', description: 'Seconds for one full revolution.' },
        {
          name: 'isReverse',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Reverse the orbit direction.',
        },
        {
          name: 'showPath',
          type: 'boolean',
          defaultValue: 'true',
          description: 'Show a faint circular path behind the orbit.',
        },
        {
          name: 'startAngle',
          type: 'number',
          defaultValue: '0',
          description:
            'Starting angle in degrees (0 = top, clockwise) applied to the whole ring before children are distributed evenly — offset multiple orbits or a single asymmetric composition.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn(). Applied to the orbit container.',
        },
      ],
    },
  ],
  features: [
    'Distributes any number of children evenly around a circular path.',
    'Each child counter-rotates so its own content stays upright while orbiting.',
    'startAngle offsets where the ring begins — stack multiple orbits with different phase, or bias a single ring asymmetrically.',
    'isReverse flips direction and showPath toggles a faint decorative ring behind the orbit.',
    'Under prefers-reduced-motion, items render statically distributed with no rotation.',
    'The orbit loop pauses via IntersectionObserver while scrolled offscreen and resumes on return.',
  ],
  aria: [
    {
      attribute: 'aria-hidden="true"',
      element: 'path ring',
      purpose: 'The decorative circular path is hidden from assistive tech and ignores pointer events.',
    },
  ],
  a11yNotes: [
    'Orbiting children remain in normal tab order and can receive focus if they are interactive elements.',
    'Under prefers-reduced-motion, items are statically placed around the circle with no rotation animation.',
  ],
  sourceFiles: ['packages/ui/src/components/animated/orbit/orbit.tsx'],
};
