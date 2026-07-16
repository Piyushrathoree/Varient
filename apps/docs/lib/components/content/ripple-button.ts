import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { RippleButton } from '@varient/ui'\n\n<RippleButton variant="primary" rippleColor="color-mix(in oklab, white 40%, transparent)">\n  Click me\n</RippleButton>`,
  props: [
    {
      title: 'RippleButton',
      rows: [
        { name: 'children', type: 'ReactNode', description: 'Button content.' },
        { name: 'rippleColor', type: 'string', defaultValue: 'brand mix', description: 'CSS color for the ripple circle overlay.' },
        { name: 'duration', type: 'number', defaultValue: '0.6', description: 'Ripple expansion duration in seconds.' },
        { name: 'variant', type: 'ButtonVariant', defaultValue: "'default'", description: 'Button visual variant (same map as Button).' },
        { name: 'size', type: 'ButtonSize', defaultValue: "'md'", description: 'Button size (same map as Button).' },
        { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disables the button and suppresses ripples.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn().' },
      ],
    },
  ],
  features: [
    'Ripple expands from the exact pointer-down coordinate, clipped to the button bounds.',
    'Under prefers-reduced-motion, ripple circles are skipped entirely and replaced by a brief background flash.',
    'Flash timeout is tracked in a ref and cleared on unmount and on rapid re-clicks, so no state update fires after unmount.',
    'Shares the Foundation Button size/variant maps, so it drops in wherever Button is used.',
    'Ripple overlays are aria-hidden and pointer-events-none so they never intercept clicks or screen reader focus.',
  ],
  aria: [
    { attribute: 'aria-hidden', element: 'ripple <span> / flash background', purpose: 'Keeps decorative motion out of the accessibility tree.' },
    { attribute: 'aria-disabled', element: 'button', purpose: 'Reflects isDisabled to assistive tech in addition to the native disabled attribute.' },
  ],
  a11yNotes: [
    'Renders a real <button> with native keyboard focus and Enter/Space activation.',
    'Reduced motion replaces the expanding ripple with a brief non-animated background flash; the button stays fully functional.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/ripple-button/ripple-button.tsx',
    'packages/ui/src/components/animated/ripple-button/index.ts',
  ],
};
