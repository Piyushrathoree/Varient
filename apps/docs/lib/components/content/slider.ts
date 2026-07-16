import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { useState } from 'react';
import { Slider } from '@varient/ui';

export function Example() {
  const [value, setValue] = useState([40]);

  return (
    <Slider
      value={value}
      onValueChange={setValue}
      aria-label="Volume"
    />
  );
}`,
  props: [
    {
      title: 'Slider',
      rows: [
        {
          name: 'value',
          type: 'number[]',
          description: 'Controlled value(s) — one number for a single thumb, two for a range.',
        },
        {
          name: 'defaultValue',
          type: 'number[]',
          description: 'Uncontrolled initial value(s). Defaults to a single thumb at min.',
        },
        { name: 'min', type: 'number', defaultValue: '0', description: 'Minimum value the slider can reach.' },
        { name: 'max', type: 'number', defaultValue: '100', description: 'Maximum value the slider can reach.' },
        { name: 'step', type: 'number', defaultValue: '1', description: 'Increment between valid values.' },
        {
          name: 'isDisabled',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Disables interaction and dims the control.',
        },
        {
          name: 'onValueChange',
          type: '(value: number[]) => void',
          description: 'Called continuously while a thumb is dragged or moved via keyboard.',
        },
        {
          name: 'size',
          type: 'SliderSize',
          defaultValue: "'md'",
          description: 'Track thickness and thumb diameter — sm, md, or lg.',
        },
        {
          name: 'orientation',
          type: "'horizontal' | 'vertical'",
          defaultValue: "'horizontal'",
          description: 'Layout direction of the track.',
        },
        {
          name: 'showValue',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Shows a small floating value label above the pressed or focused thumb.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn(), applied to the root.',
        },
      ],
    },
  ],
  features: [
    'Single-thumb or range (two-thumb) modes inferred from the length of value/defaultValue.',
    'Range fill and thumb position ease over ~150ms on programmatic value changes, so external setValue calls read as motion instead of a jump.',
    'Optional showValue prop floats a small value label above the actively pressed or focused thumb with a spring pop.',
    'Springy hover/press scale on each thumb, gated to instant under prefers-reduced-motion.',
    'Three sizes (sm/md/lg) and horizontal/vertical orientation.',
    'Full keyboard support and ARIA roles from @radix-ui/react-slider.',
  ],
  keyboard: [
    { keys: 'Arrow Left / Arrow Down', description: 'Decrease the focused thumb by one step.' },
    { keys: 'Arrow Right / Arrow Up', description: 'Increase the focused thumb by one step.' },
    { keys: 'Home', description: 'Move the focused thumb to the minimum value.' },
    { keys: 'End', description: 'Move the focused thumb to the maximum value.' },
    { keys: 'Page Down', description: 'Decrease the focused thumb by a larger step.' },
    { keys: 'Page Up', description: 'Increase the focused thumb by a larger step.' },
    { keys: 'Tab / Shift + Tab', description: 'Move focus to the next / previous focusable element.' },
  ],
  aria: [
    {
      attribute: 'role="slider"',
      element: 'Thumb',
      purpose: 'Identifies each thumb as an ARIA slider control.',
    },
    {
      attribute: 'aria-valuemin / aria-valuemax / aria-valuenow',
      element: 'Thumb',
      purpose: 'Exposes the current numeric range and value to assistive tech.',
    },
    {
      attribute: 'aria-label',
      element: 'Thumb',
      purpose: 'Auto-labeled "Thumb N" for multi-thumb sliders unless overridden via aria-label on the root.',
    },
    {
      attribute: 'aria-hidden',
      element: 'showValue label',
      purpose: 'The floating value label is decorative — the value is already exposed via aria-valuenow.',
    },
  ],
  a11yNotes: [
    'Built on @radix-ui/react-slider for correct roles, focus management, and pointer/keyboard interaction.',
    'Thumb hover/active scale, the eased range/thumb transition, and the showValue spring pop all drop to instant or disabled under prefers-reduced-motion.',
    'Pass aria-label (or aria-labelledby) on the Slider — it is required for a meaningful accessible name.',
  ],
  sourceFiles: [
    'packages/ui/src/components/foundation/slider/slider.tsx',
    'packages/ui/src/components/foundation/slider/index.ts',
  ],
};
