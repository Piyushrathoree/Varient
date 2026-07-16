import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Button } from '@varient/ui'

<Button variant="primary" size="md">
  Click me
</Button>`,
  props: [
    {
      title: 'Button',
      rows: [
        {
          name: 'variant',
          type: 'ButtonVariant',
          defaultValue: "'default'",
          description:
            'Visual style of the button — default, primary, secondary, ghost, outline, destructive, link, sweep, or frame.',
        },
        {
          name: 'size',
          type: 'ButtonSize',
          defaultValue: "'md'",
          description: 'Height and padding preset — xs, sm, md, lg, or xl.',
        },
        {
          name: 'isLoading',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Shows a spinner in place of the label and disables interaction.',
        },
        {
          name: 'isDisabled',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Disables the button.',
        },
        { name: 'leftIcon', type: 'ReactNode', description: 'Icon rendered before the label.' },
        { name: 'rightIcon', type: 'ReactNode', description: 'Icon rendered after the label.' },
        {
          name: 'asChild',
          type: 'boolean',
          defaultValue: 'false',
          description:
            'Merges button styles and behavior onto its child element instead of rendering a <button>.',
        },
        { name: 'children', type: 'ReactNode', description: 'Button label content.' },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn().',
        },
      ],
    },
  ],
  features: [
    'Nine variants — default, primary, secondary, ghost, outline, destructive, link, sweep (GPU scaleX fill-on-hover), and frame (gradient-rimmed surface with hover lift).',
    'Five size presets (xs–xl) driving height, padding, gap, and text size together.',
    'isLoading swaps the label for a spinner, sets aria-busy, disables interaction, and keeps an sr-only "Loading" announcement.',
    'asChild renders via Radix Slot to merge button styles/behavior onto a custom child (e.g. a Link) instead of a <button>.',
    'Press feedback (active:scale-[0.97]) and all hover transitions are gated off under prefers-reduced-motion, including the spinner\'s animate-spin.',
    'forwardRef exposes the underlying DOM node; focus-visible ring and disabled states are built in.',
  ],
  a11yNotes: [
    'isLoading sets aria-busy and disables the button while keeping an sr-only "Loading" label for screen readers.',
    'isDisabled sets aria-disabled and (for the native <button> path) the disabled attribute; when used with asChild it also removes the element from the tab order (tabIndex=-1).',
    'Focus is always visible via focus-visible:ring-2 with a ring-offset, regardless of variant.',
    'All motion (press scale, hover transitions, loading spinner) respects prefers-reduced-motion.',
  ],
  sourceFiles: [
    'packages/ui/src/components/foundation/button/button.tsx',
    'packages/ui/src/components/foundation/button/index.ts',
  ],
};
