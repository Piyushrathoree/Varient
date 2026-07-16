import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { useRef } from 'react';
import { AnimatedBeam } from '@varient/ui';

function Example() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative flex items-center justify-between p-12">
      <div ref={fromRef} className="size-12 rounded-full border border-border bg-background" />
      <div ref={toRef} className="size-12 rounded-full border border-border bg-card" />
      <AnimatedBeam containerRef={containerRef} fromRef={fromRef} toRef={toRef} />
    </div>
  );
}`,
  props: [
    {
      title: 'AnimatedBeam',
      rows: [
        {
          name: 'containerRef',
          type: 'RefObject<HTMLElement | null>',
          description:
            'Ref to the shared relative container that holds both endpoints and the SVG overlay.',
        },
        {
          name: 'fromRef',
          type: 'RefObject<HTMLElement | null>',
          description: 'Ref to the source element — beam starts at its center.',
        },
        {
          name: 'toRef',
          type: 'RefObject<HTMLElement | null>',
          description: 'Ref to the target element — beam ends at its center.',
        },
        {
          name: 'curvature',
          type: 'number',
          defaultValue: '0',
          description: 'Quadratic curve offset — 0 draws a straight line.',
        },
        {
          name: 'duration',
          type: 'number',
          defaultValue: '5',
          description: 'Seconds for one gradient pass along the path.',
        },
        {
          name: 'delay',
          type: 'number',
          defaultValue: '0',
          description: 'Delay before the animation starts, in seconds.',
        },
        {
          name: 'pathColor',
          type: 'string',
          defaultValue: 'var(--color-border)',
          description: 'Base path stroke color.',
        },
        {
          name: 'pathWidth',
          type: 'number',
          defaultValue: '2',
          description: 'Base path stroke width in pixels.',
        },
        {
          name: 'gradientStartColor',
          type: 'string',
          defaultValue: 'var(--color-foreground)',
          description: 'Traveling gradient start color.',
        },
        {
          name: 'gradientStopColor',
          type: 'string',
          defaultValue: 'var(--color-muted-foreground)',
          description: 'Traveling gradient end color.',
        },
        {
          name: 'isReverse',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Reverse the gradient travel direction.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn(). Applied to the SVG overlay.',
        },
      ],
    },
  ],
  features: [
    'Absolute SVG overlay that draws a quadratic-curve path between two ref-tracked elements inside a shared container.',
    'A traveling gradient segment animates along the path on an infinite linear loop, synced via a shared motion value.',
    'Position recalculates on ResizeObserver (container + endpoints) and on window resize/scroll, so the beam never drifts.',
    'Gradient travel automatically pauses while the container is scrolled offscreen (useViewportActive) and resumes on re-entry.',
    'Respects prefers-reduced-motion — renders only the static base path with no traveling gradient.',
  ],
  aria: [
    {
      attribute: 'aria-hidden="true"',
      element: 'svg overlay',
      purpose: 'Beam is decorative; it does not affect the accessible name or structure of connected elements.',
    },
    {
      attribute: 'pointer-events-none',
      element: 'svg overlay',
      purpose: 'Keeps endpoint elements fully interactive underneath the beam layer.',
    },
  ],
  a11yNotes: [
    'Under prefers-reduced-motion, only a static base path is rendered — the traveling gradient is skipped entirely.',
    'The gradient loop pauses while offscreen and resumes when the container re-enters the viewport, avoiding wasted CPU/battery from off-screen demos.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/animated-beam/animated-beam.tsx',
    'packages/ui/src/components/animated/animated-beam/index.ts',
  ],
};
