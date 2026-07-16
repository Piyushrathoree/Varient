import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { NumberTicker } from '@varient/ui'\n\n<NumberTicker value={100} suffix="%" />`,
  props: [
    {
      title: 'NumberTicker',
      rows: [
        { name: 'value', type: 'number', description: 'Required — the target value counted up to.' },
        { name: 'prefix', type: 'string', defaultValue: "''", description: 'Text rendered before the number, e.g. "$".' },
        { name: 'suffix', type: 'string', defaultValue: "''", description: 'Text rendered after the number, e.g. "%" or "+".' },
        { name: 'decimalPlaces', type: 'number', defaultValue: '0', description: 'Fixed number of decimal places shown while counting and at rest.' },
        { name: 'duration', type: 'number', defaultValue: '1.2', description: 'Count-up duration in seconds.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn().' },
      ],
    },
  ],
  features: [
    'Counts from 0 to `value` once the element scrolls into view, using a shared ease-out curve (`EASE_OUT` from lib/animation).',
    'Animation fires exactly once — `useInView` with `once: true` and a `-80px` margin — it does not replay on later scrolls.',
    'Forwards a ref to the underlying `<span>` (`forwardRef<HTMLSpanElement>`) for measurement or focus needs.',
    'Fully controlled by `prefix` / `suffix` / `decimalPlaces` for currency, percentage, and stat formatting.',
    'Respects `prefers-reduced-motion`: the count-up is skipped and the final value renders immediately.',
  ],
  aria: [
    { attribute: 'aria-hidden="true"', element: 'inner span (animating digits)', purpose: 'Hides the rapidly-updating digits from assistive tech so mid-count values are never announced.' },
    { attribute: 'sr-only span', element: 'visually-hidden span', purpose: 'Carries the final formatted value (prefix + value + suffix) so screen readers read it once, correctly.' },
  ],
  a11yNotes: [
    'The animating digits are `aria-hidden` — a rapidly-updating number is not something a screen reader should narrate mid-count.',
    'The final formatted value is always present through a visually-hidden (`sr-only`) span, independent of animation state.',
    'When `prefers-reduced-motion` is set, the count-up is skipped entirely and the final value renders immediately.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/number-ticker/number-ticker.tsx',
    'packages/ui/src/components/animated/number-ticker/number-ticker.native.tsx',
    'packages/ui/src/components/animated/number-ticker/types.ts',
    'packages/ui/src/components/animated/number-ticker/index.ts',
  ],
};
