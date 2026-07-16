import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { SlidingNumber } from '@varient/ui'\n\n<SlidingNumber value={128} />`,
  props: [
    {
      title: 'SlidingNumber',
      rows: [
        {
          name: 'value',
          type: 'number',
          description:
            'Required — the number displayed. Each digit column rolls vertically to its new value on change.',
        },
        {
          name: 'padStart',
          type: 'number',
          defaultValue: '0',
          description:
            'Left-pads the integer part with zeros to at least this many digits, e.g. padStart={2} -> "07".',
        },
        {
          name: 'decimalPlaces',
          type: 'number',
          defaultValue: '0',
          description: 'Fixed decimal places shown — the value is rounded to this precision.',
        },
        {
          name: 'isGrouped',
          type: 'boolean',
          defaultValue: 'false',
          description:
            'Inserts thousands separators ("1,234") into the integer part as static characters.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn(), applied to the outer wrapper.',
        },
      ],
    },
  ],
  features: [
    'Each digit renders as its own vertical 0-9 strip inside an overflow-hidden column, animating only its y-transform to the new digit with SPRING_DEFAULT — no layout thrash.',
    'Digit columns are keyed by distance-from-the-end (ones place, tens place, …) rather than array index, so existing columns roll in place across a magnitude change (99 -> 100) instead of every column re-mounting.',
    'A brand-new leading digit (or a thousands-separator comma crossing into isGrouped) pops in via AnimatePresence popLayout with a fade + slide, and siblings reflow with a layout spring.',
    'Non-digit characters — decimal point, grouping commas, negative sign — render as static tokens using the same mount/unmount animation, and the sign is tracked independently so a value crossing zero never re-keys the digit columns.',
    '`tabular-nums` is applied to every digit and separator so column widths never jitter mid-roll.',
    'Reduced motion swaps digits and pops instantly (duration 0) with no roll or slide.',
  ],
  aria: [
    {
      attribute: 'aria-hidden',
      element: 'Digit/separator wrapper',
      purpose: 'Hides the animating, rolling digit columns from assistive tech — a mid-roll digit is not meaningful to narrate.',
    },
    {
      attribute: 'aria-live="polite" + aria-atomic="true"',
      element: 'sr-only span',
      purpose: 'Announces the fully formatted value (sign + grouping + decimals) once it settles, without narrating every intermediate frame.',
    },
  ],
  a11yNotes: [
    'The visible, animating digit columns are aria-hidden; the accessible name/value comes entirely from a visually-hidden aria-live span holding the final formatted string.',
    'prefers-reduced-motion swaps digits instantly with no roll, slide, or pop-in/out animation for columns that appear or disappear as the digit count changes.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/sliding-number/sliding-number.tsx',
    'packages/ui/src/components/animated/sliding-number/index.ts',
  ],
};
