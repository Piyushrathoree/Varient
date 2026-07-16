import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { MovingBorder, MovingBorderButton } from '@varient/ui'

<MovingBorder duration={6} borderRadius={12} className="rounded-xl">
  <div className="rounded-xl border border-border bg-card p-6">
    <h3 className="text-lg font-semibold">Pro plan</h3>
  </div>
</MovingBorder>

<MovingBorderButton>Get started</MovingBorderButton>`,
  props: [
    {
      title: 'MovingBorder',
      rows: [
        { name: 'children', type: 'ReactNode', description: 'Wrapped content — typically a button or card.' },
        { name: 'duration', type: 'number', defaultValue: '8', description: 'Seconds for one full lap around the border track.' },
        { name: 'borderRadius', type: 'number', defaultValue: '12', description: 'Corner radius in pixels — should match inner content.' },
        { name: 'highlightSize', type: 'number', defaultValue: '80', description: 'Highlight blob size in pixels.' },
        { name: 'colorFrom', type: 'string', defaultValue: 'var(--color-brand)', description: 'Start color of the traveling highlight.' },
        { name: 'colorTo', type: 'string', defaultValue: 'var(--color-brand-secondary)', description: 'End color of the traveling highlight.' },
        { name: 'isPaused', type: 'boolean', defaultValue: 'false', description: 'Pauses the traveling highlight loop regardless of viewport visibility.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes on the wrapper.' },
      ],
    },
    {
      title: 'MovingBorderButton',
      rows: [
        { name: 'duration', type: 'number', defaultValue: '8', description: 'Seconds for one full lap around the border track.' },
        { name: 'borderRadius', type: 'number', defaultValue: '10', description: 'Corner radius in pixels.' },
        { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disables the button and sets aria-disabled.' },
        { name: 'isPaused', type: 'boolean', defaultValue: 'false', description: 'Pauses the traveling highlight loop regardless of viewport visibility.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes on the button.' },
      ],
    },
  ],
  features: [
    'Highlight travels around the border perimeter via CSS `offset-path`, masked to a thin border ring.',
    'Automatically pauses the loop while scrolled offscreen via `useViewportActive`, and supports an explicit `isPaused` prop for manual control.',
    'Under `prefers-reduced-motion`, renders a static subtle brand border instead of animating.',
    '`MovingBorderButton` is a ready-made button with the border baked in, forwarding standard button semantics (`disabled`, focus rings, `type`).',
  ],
  aria: [
    { attribute: 'aria-hidden="true"', element: 'highlight layer', purpose: 'Marks the traveling highlight and static fallback border as decorative.' },
    { attribute: 'aria-disabled', element: 'MovingBorderButton', purpose: 'Reflects the isDisabled prop for assistive tech.' },
  ],
  a11yNotes: [
    'The traveling highlight is decorative and does not affect the accessible name of wrapped content.',
    'Motion respects `prefers-reduced-motion` and pauses automatically offscreen to conserve CPU/battery.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/moving-border/moving-border.tsx',
    'packages/ui/src/components/animated/moving-border/index.ts',
  ],
};
