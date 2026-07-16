import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { ButtonCopy } from '@varient/ui'\n\n<ButtonCopy content="npx varient add button-copy" />`,
  props: [
    {
      title: 'ButtonCopy',
      rows: [
        {
          name: 'content',
          type: 'string',
          description: 'Text written via navigator.clipboard.writeText. Ignored when onCopy is set.',
        },
        {
          name: 'onCopy',
          type: '() => Promise<void> | void',
          description:
            'Custom copy handler, takes priority over content. Awaited before the "copied" state shows. A thrown error triggers the "failed" state.',
        },
        {
          name: 'variant',
          type: "'default' | 'secondary' | 'outline' | 'ghost'",
          defaultValue: "'outline'",
          description: 'Visual style of the button.',
        },
        {
          name: 'size',
          type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
          defaultValue: "'md'",
          description: 'Size preset — same scale as Button.',
        },
        {
          name: 'display',
          type: "'icon' | 'label'",
          defaultValue: "'icon'",
          description:
            'icon is a circular icon-only button; label widens into a pill with a "Copy" / "Copying" / "Copied" / "Failed" text label beside the icon.',
        },
        {
          name: 'resetDelay',
          type: 'number',
          defaultValue: '1500',
          description: 'Milliseconds the "copied" state holds before resetting to idle.',
        },
        {
          name: 'isDisabled',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Disables the button.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn().',
        },
      ],
    },
  ],
  features: [
    'Morphs idle → copying → copied via AnimatePresence, with a genuine round SVG spinner (partial arc, round caps) instead of a CSS border-trick.',
    'If the copy throws (denied/unavailable clipboard), morphs into a brief "failed" state — an x icon with a destructive tint — then auto-reverts to idle, instead of silently resetting.',
    'display="label" widens into a pill with a text label next to the icon, animating width via layout.',
    'Pass onCopy for custom copy logic (e.g. copying rendered code); it takes priority over content when both are set.',
    'Same variant/size scale as Button (default/secondary/outline/ghost, xs–xl).',
    'Reduced motion: press scale and icon-morph transitions collapse to opacity-only/instant; the spinner ring still renders but stops rotating.',
  ],
  aria: [
    {
      attribute: 'aria-live="polite" (sr-only span in icon mode, or the button itself in label mode)',
      element: 'ButtonCopy',
      purpose: 'Announces "Copy" → "Copying" → "Copied" / "Failed" as the state changes.',
    },
    {
      attribute: 'aria-hidden="true"',
      element: 'Icon morph (copy/spinner/check/x)',
      purpose: 'Purely decorative; the live-region text carries the actual state, not the icon.',
    },
    {
      attribute: 'disabled',
      element: 'ButtonCopy',
      purpose: 'Set while copying, showing the copied confirmation, or showing the failed state, to prevent duplicate clipboard writes mid-animation.',
    },
  ],
  a11yNotes: [
    'The "copied" checkmark\'s text-emerald-500 accent is a deliberate, scoped exception to the semantic token palette. The "failed" x icon uses the semantic text-destructive token.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/button-copy/button-copy.tsx',
    'packages/ui/src/components/animated/button-copy/index.ts',
  ],
};
