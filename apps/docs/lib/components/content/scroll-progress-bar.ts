import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { useRef } from 'react';
import { ScrollProgressBar } from '@varient/ui';

export function Example() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <ScrollProgressBar />
      {/* or, for a contained scroll area: */}
      <div ref={scrollRef} className="relative h-96 overflow-y-auto">
        <ScrollProgressBar isFixed={false} scrollContainerRef={scrollRef} />
        {/* content */}
      </div>
    </>
  );
}`,
  props: [
    {
      title: 'ScrollProgressBar',
      rows: [
        { name: 'className', type: 'string', description: 'Additional Tailwind classes on the track wrapper.' },
        { name: 'color', type: 'string', defaultValue: 'bg-foreground/55', description: 'Tailwind classes for the fill bar.' },
        { name: 'height', type: 'number', defaultValue: '3', description: 'Bar thickness in pixels.' },
        { name: 'position', type: "'top' | 'bottom'", defaultValue: 'top', description: 'Anchors the bar to the top or bottom edge.' },
        { name: 'scrollContainerRef', type: 'RefObject<HTMLElement | null>', description: 'Scroll container to track. Defaults to window scroll when omitted.' },
        { name: 'isFixed', type: 'boolean', defaultValue: 'true', description: 'When false, uses absolute positioning inside a relative scroll frame.' },
      ],
    },
  ],
  features: [
    'Tracks scroll progress via `useScroll` and drives a spring-smoothed `scaleX` fill.',
    'Works against window scroll by default, or a specific container via `scrollContainerRef`.',
    'Anchored to the top or bottom edge; `isFixed={false}` switches to absolute positioning for in-frame demos.',
    'Progress is exposed as a live percentage on `aria-valuenow`, not just a visual fill.',
  ],
  aria: [
    { attribute: 'role="progressbar"', element: 'Track wrapper', purpose: 'Identifies the element as a progress indicator for assistive tech.' },
    { attribute: 'aria-valuemin / aria-valuemax', element: 'Track wrapper', purpose: 'Declares the fixed 0–100 percentage range.' },
    { attribute: 'aria-valuenow', element: 'Track wrapper', purpose: 'Live scroll percentage, rounded to the nearest whole number.' },
    { attribute: 'aria-label="Scroll progress"', element: 'Track wrapper', purpose: 'Names the control since it has no visible text label.' },
  ],
  a11yNotes: [
    'Under `prefers-reduced-motion`, the fill binds directly to `scrollYProgress` (no spring smoothing) instead of being hidden — the bar conveys reading progress, which is functional information, not decoration.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/scroll-progress-bar/scroll-progress-bar.tsx',
    'packages/ui/src/components/animated/scroll-progress-bar/index.ts',
  ],
};
