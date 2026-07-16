import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { TextScramble } from '@varient/ui'\n\n<TextScramble text="Decrypt the message" />`,
  props: [
    {
      title: 'TextScramble',
      rows: [
        {
          name: 'text',
          type: 'string',
          description: 'Required — the real text the effect resolves into, left to right.',
        },
        {
          name: 'duration',
          type: 'number',
          defaultValue: '0.8',
          description: 'Total seconds for the scramble to fully resolve.',
        },
        {
          name: 'speed',
          type: 'number',
          defaultValue: '0.04',
          description: 'Seconds between shuffle ticks.',
        },
        {
          name: 'characterSet',
          type: 'string',
          defaultValue: "upper+lower+digits+'!<>-_\\\\/[]{}—=+*^?#'",
          description: 'Glyph pool used for unresolved characters.',
        },
        {
          name: 'isTriggeredOnView',
          type: 'boolean',
          defaultValue: 'true',
          description: 'Fires once via useInView when true. When false, fires on mount instead.',
        },
        {
          name: 'as',
          type: "'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'label'",
          defaultValue: "'span'",
          description: 'Element tag rendered.',
        },
        {
          name: 'onScrambleComplete',
          type: '() => void',
          description: 'Called once the full text has resolved.',
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
    'Characters resolve left to right into the real text via a growing "resolved prefix" — unresolved characters re-roll a random glyph from `characterSet` on every tick.',
    'Whitespace is always preserved unscrambled so word shapes stay legible mid-shuffle.',
    'Layout never jitters: the real text is rendered twice, an invisible sizer that reserves the box plus an absolutely-positioned overlay that actually animates.',
    'Fires once via `useInView` by default (`isTriggeredOnView`), or immediately on mount when set to false; re-arms automatically if `text` changes.',
    'Fully respects `prefers-reduced-motion` — the final text renders immediately with no shuffle.',
  ],
  aria: [
    {
      attribute: 'aria-label={text}',
      element: 'wrapper element (span/p/div/h1-h4/label)',
      purpose: 'Exposes the final, correct string to assistive tech regardless of animation state.',
    },
    {
      attribute: 'aria-hidden="true"',
      element: 'invisible sizer span + animating overlay span',
      purpose: 'Hides the decorative scrambling glyphs and the layout-stabilizing sizer from the accessible tree.',
    },
  ],
  a11yNotes: [
    'The interval timer is cleared on unmount and whenever `text` changes, so no timers leak across re-renders.',
    'Recommend `font-mono` in consuming code for the cleanest column alignment while characters shuffle (documented, not enforced by the component).',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/text-scramble/text-scramble.tsx',
    'packages/ui/src/components/animated/text-scramble/index.ts',
  ],
};
