import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { ConfettiBurst, fireConfetti } from '@varient/ui'

export function Example() {
  return (
    <>
      <ConfettiBurst onFire={() => console.log('fired!')}>
        Celebrate
      </ConfettiBurst>

      <button type="button" onClick={() => fireConfetti({ originX: 0.5, originY: 0.5 })}>
        Fire from center
      </button>
    </>
  )
}`,
  props: [
    {
      title: 'ConfettiBurst',
      rows: [
        { name: 'children', type: 'ReactNode', description: 'Button label or trigger content.' },
        { name: 'particleCount', type: 'number', defaultValue: '80', description: 'Number of confetti particles per burst.' },
        { name: 'spread', type: 'number', defaultValue: '70', description: 'Spread angle in degrees.' },
        { name: 'colors', type: 'string[]', description: 'Particle colors. Defaults to brand CSS variables read at fire-time.' },
        { name: 'variant', type: 'ButtonVariant', defaultValue: "'primary'", description: 'Button visual variant (same map as Button).' },
        { name: 'size', type: 'ButtonSize', defaultValue: "'md'", description: 'Button size (same map as Button).' },
        { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disables the trigger button.' },
        { name: 'onFire', type: '() => void', description: 'Callback fired after a successful burst (runs even when reduced-motion skips particles).' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn().' },
      ],
    },
  ],
  features: [
    'Fires a canvas-confetti burst from the exact screen position of the trigger button on click.',
    'Exposes fireConfetti() and useConfetti() for imperative bursts from anywhere, not just the wrapped button.',
    'Particle colors default to brand CSS variables (--color-brand, --color-brand-secondary, --color-brand-light, --color-brand-lighter) read live at fire-time, with a static hex fallback for SSR/no-window contexts.',
    'Shares the Button size/variant maps so it drops in as a visual match for existing buttons.',
    'Reduced motion is respected at every layer: the click handler and onFire callback still run, but no particles are emitted, and canvas-confetti itself is configured with disableForReducedMotion: true as a safeguard for imperative calls.',
  ],
  aria: [
    { attribute: '<button>', element: 'ConfettiBurst', purpose: 'Real native button element — keyboard focusable, activates on Enter/Space.' },
    { attribute: 'aria-disabled', element: 'ConfettiBurst', purpose: 'Reflects the isDisabled prop alongside the native disabled attribute.' },
  ],
  a11yNotes: [
    'Under prefers-reduced-motion, no confetti particles are emitted — the click handler and onFire callback still run, but the visual burst is skipped entirely.',
    'useConfetti().fire() is also a no-op under reduced motion.',
    'The confetti canvas itself is purely decorative and does not intercept pointer events.',
  ],
  dependencies: ['canvas-confetti'],
  sourceFiles: [
    'packages/ui/src/components/animated/confetti-burst/confetti-burst.tsx',
    'packages/ui/src/components/animated/confetti-burst/index.ts',
  ],
};
