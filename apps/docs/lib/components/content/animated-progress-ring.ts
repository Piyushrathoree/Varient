import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { AnimatedProgressRing } from '@/components/animated/animated-progress-ring';

export function Example() {
  return <AnimatedProgressRing value={72} size={120} strokeWidth={8} />;
}`,
  props: [
    {
      title: 'AnimatedProgressRing',
      rows: [
        { name: 'value', type: 'number', description: 'Progress value from 0 to 100.' },
        { name: 'size', type: 'number', defaultValue: '120', description: 'Outer diameter in pixels.' },
        {
          name: 'strokeWidth',
          type: 'number',
          defaultValue: '8',
          description: 'Ring stroke width in pixels.',
        },
        {
          name: 'showValue',
          type: 'boolean',
          defaultValue: 'true',
          description: 'Show an animated percentage count in the center.',
        },
        {
          name: 'color',
          type: 'string',
          defaultValue: "'var(--color-brand)'",
          description: 'Progress arc stroke color — any CSS color value.',
        },
        {
          name: 'trackColor',
          type: 'string',
          defaultValue: "'var(--color-muted)'",
          description: 'Background track stroke color — any CSS color value.',
        },
        {
          name: 'duration',
          type: 'number',
          defaultValue: '1.2',
          description: 'Animation duration in seconds.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes on the wrapper.',
        },
      ],
    },
  ],
  features: [
    'One `useMotionValue` drives both the arc\'s `stroke-dashoffset` and the center count-up via `useTransform` — a single `animate()` call keeps the sweep and the digits perfectly in sync, no parallel timers.',
    'Animates once when scrolled into view (`useInView` with `once: true`) and re-animates smoothly whenever `value` changes afterward.',
    'The accessible value lives on the wrapper\'s `role="progressbar"` (`aria-valuemin`/`aria-valuemax`/`aria-valuenow`/`aria-label`) — announced to assistive tech regardless of `showValue`, since the SVG arc and center digits are always `aria-hidden`.',
    'Under `prefers-reduced-motion`, the motion value jumps straight to the target with `MotionValue.jump()` — no sweep, no count-up, and no animation frame cost.',
    'Fully token-driven color defaults (`--color-brand` arc, `--color-muted` track) that any CSS color value can override.',
  ],
  aria: [
    {
      attribute: 'role="progressbar"',
      element: 'wrapper div',
      purpose: 'Identifies the ring as a progress indicator for assistive technology.',
    },
    {
      attribute: 'aria-valuemin / aria-valuemax / aria-valuenow',
      element: 'wrapper div',
      purpose: 'Exposes the numeric progress range and current rounded value.',
    },
    {
      attribute: 'aria-label',
      element: 'wrapper div',
      purpose: 'Describes the current progress as a percentage in plain language.',
    },
    {
      attribute: 'aria-hidden="true"',
      element: 'svg and center digit span',
      purpose: 'Hides the decorative arc and visual count from screen readers so the value is announced exactly once, via the progressbar attributes.',
    },
  ],
  a11yNotes: [
    'The visual center digits are optional (`showValue`) purely for sighted users — the accessible value never depends on it.',
    'Reduced motion is respected: the ring and count jump directly to the target value with no sweep animation.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/animated-progress-ring/animated-progress-ring.tsx',
    'packages/ui/src/components/animated/animated-progress-ring/index.ts',
  ],
};
