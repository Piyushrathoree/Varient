import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { ImageComparison } from '@varient/ui'\n\n<ImageComparison\n  before={{ src: '/before.jpg', alt: 'Original photo' }}\n  after={{ src: '/after.jpg', alt: 'Edited photo' }}\n  beforeLabel="Original"\n  afterLabel="Edited"\n/>`,
  props: [
    {
      title: 'ImageComparison',
      rows: [
        {
          name: 'before',
          type: 'ReactNode | { src: string; alt: string }',
          description: 'Required — bottom layer, always fully visible.',
        },
        {
          name: 'after',
          type: 'ReactNode | { src: string; alt: string }',
          description: 'Required — top layer, revealed from the divider to the right edge.',
        },
        {
          name: 'defaultPosition',
          type: 'number',
          defaultValue: '50',
          description: 'Initial divider position, 0–100 (percent from the left).',
        },
        {
          name: 'mode',
          type: "'drag' | 'hover'",
          defaultValue: "'drag'",
          description:
            '`drag` requires press+drag; `hover` follows the pointer without pressing.',
        },
        {
          name: 'beforeLabel',
          type: 'string',
          description: 'Quiet chip in the top-left corner labeling the before layer.',
        },
        {
          name: 'afterLabel',
          type: 'string',
          description: 'Quiet chip in the top-right corner labeling the after layer.',
        },
        {
          name: 'isSpring',
          type: 'boolean',
          defaultValue: 'true',
          description: 'Smooths the divider toward its target with a spring.',
        },
        {
          name: 'onPositionChange',
          type: '(position: number) => void',
          description: 'Fires whenever the divider position changes, from drag, hover, or keyboard.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn() on the container.',
        },
      ],
    },
  ],
  features: [
    'The after layer is clipped with clip-path: inset(0 0 0 X%) so it always covers the container from the divider to the right edge, revealing the before layer underneath to its left — one motion value drives both the clip-path and the divider/grip position, so nothing but transform-adjacent CSS changes per frame.',
    'before/after each accept either a { src, alt } shorthand (a plain <img>, pointer-events-none/select-none/draggable=false, object-cover) or any ReactNode, so consumers can compare rendered UI, SVGs, or canvases instead of only photos.',
    'mode="drag" (default) requires a press-and-drag gesture on the surface; mode="hover" tracks the pointer passively with no press required.',
    'The grip is a real role="slider" with full keyboard support (Arrow keys ±5, Home/End) independent of mode, so it stays fully usable without a pointer.',
    'isSpring (default true) smooths the divider toward its target with SPRING_DEFAULT; disable it for an instant snap.',
    'Reduced motion still leaves the comparison fully interactive — it just snaps the divider directly to its target instead of smoothing it, since the divider position itself conveys the comparison (the same exception scroll-driven progress gets).',
  ],
  keyboard: [
    { keys: 'Tab', description: 'Moves focus to the grip.' },
    { keys: 'Arrow Left / Arrow Down', description: 'Moves the divider 5% toward 0.' },
    { keys: 'Arrow Right / Arrow Up', description: 'Moves the divider 5% toward 100.' },
    { keys: 'Home', description: 'Jumps the divider to 0 (fully before).' },
    { keys: 'End', description: 'Jumps the divider to 100 (fully after).' },
  ],
  aria: [
    { attribute: 'role="slider"', element: 'Grip', purpose: 'Marks the grip as an interactive range control.' },
    { attribute: 'aria-valuemin / aria-valuemax / aria-valuenow', element: 'Grip', purpose: 'Exposes the 0–100 range and the current divider position.' },
    { attribute: 'aria-label="Comparison position"', element: 'Grip', purpose: 'Names the control for assistive tech since it carries no visible text label.' },
    { attribute: 'aria-hidden', element: 'Divider hairline', purpose: 'Removes the purely decorative divider line from the accessibility tree (the grip itself carries the semantics).' },
  ],
  a11yNotes: [
    'The grip is reachable by Tab and fully operable by keyboard (Arrow keys, Home, End) regardless of mode — drag/hover are additive pointer affordances, not the only way in.',
    'Images passed via the { src, alt } shorthand require alt text and are pointer-events-none/select-none/draggable={false} so native browser image dragging never fights the slider gesture.',
    'Under prefers-reduced-motion the divider remains fully functional; only the spring smoothing is dropped in favor of an instant snap.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/image-comparison/image-comparison.tsx',
    'packages/ui/src/components/animated/image-comparison/index.ts',
  ],
};
