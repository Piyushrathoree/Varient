import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { useState } from 'react';
import { RadioGroup } from '@varient/ui';

export function Example() {
  const [plan, setPlan] = useState('pro');

  return (
    <RadioGroup value={plan} onChange={setPlan}>
      <RadioGroup.Item value="free" label="Free" />
      <RadioGroup.Item value="pro" label="Pro" />
      <RadioGroup.Item value="team" label="Team" />
    </RadioGroup>
  );
}`,
  props: [
    {
      title: 'RadioGroup',
      rows: [
        {
          name: 'value',
          type: 'string',
          description: 'Required — the currently selected item value.',
        },
        {
          name: 'onChange',
          type: '(value: string) => void',
          description: 'Required — called with the newly selected value.',
        },
        {
          name: 'isDisabled',
          type: 'boolean',
          defaultValue: 'false',
          description:
            'Disables every item in the group. An item can still opt out with its own isDisabled={false}.',
        },
        {
          name: 'orientation',
          type: "'horizontal' | 'vertical'",
          defaultValue: "'vertical'",
          description: 'Layout direction and arrow-key navigation axis.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn(), applied to the group container.',
        },
      ],
    },
    {
      title: 'RadioGroup.Item',
      rows: [
        {
          name: 'value',
          type: 'string',
          description: 'Required — this item’s value within the group.',
        },
        {
          name: 'isDisabled',
          type: 'boolean',
          description: 'Disables this item. Falls back to the group’s isDisabled when omitted.',
        },
        {
          name: 'label',
          type: 'string',
          description:
            'Label rendered next to (or, in the card variant, beside) the dot and linked via htmlFor. Omit it to compose a custom label yourself.',
        },
        {
          name: 'description',
          type: 'string',
          description: 'Secondary line of copy under the label. Only rendered by the card variant.',
        },
        {
          name: 'variant',
          type: "RadioGroupItemVariant ('default' | 'card')",
          defaultValue: "'default'",
          description:
            "'card' wraps the dot + label/description in a soft-cornered (rounded-xl), fully clickable tile — the selectable-plan pattern.",
        },
        {
          name: 'className',
          type: 'string',
          description:
            'Additional Tailwind classes merged via cn(), applied to the circular control (never the card variant’s wrapper).',
        },
      ],
    },
  ],
  features: [
    'Fully controlled — value and onChange are both required, even when the group is disabled.',
    "'card' variant wraps the dot and a two-line label/description in a soft-cornered, fully clickable tile (rounded-xl, duration-200 color transition) for the common plan-picker pattern.",
    'Selection dot animates in/out with a spring (scale + opacity via AnimatePresence) and a hover/tap scale on the whole control, all dropping to duration 0 under prefers-reduced-motion.',
    'orientation controls both the flex layout (column vs. wrap-row) and the arrow-key navigation axis via Radix roving tabindex.',
    'Group-level isDisabled cascades to every item; an item can still override it with its own isDisabled.',
    'forwardRef exposes the underlying radio button DOM node; label is linked via a useId()-generated (or caller-supplied) id/htmlFor pair.',
  ],
  keyboard: [
    { keys: 'Tab', description: 'Moves focus into (and out of) the radio group as a single stop.' },
    {
      keys: 'Arrow Right / Arrow Down',
      description: 'Moves focus to the next item and immediately selects it (automatic activation).',
    },
    {
      keys: 'Arrow Left / Arrow Up',
      description: 'Moves focus to the previous item and immediately selects it.',
    },
    { keys: 'Space', description: 'Selects the focused item (also handled automatically on arrow navigation).' },
  ],
  aria: [
    { attribute: 'role="radiogroup"', element: 'RadioGroup root', purpose: 'Identifies the container as a radio group for assistive tech.' },
    { attribute: 'role="radio"', element: 'RadioGroup.Item', purpose: 'Identifies each control as a radio option.' },
    { attribute: 'aria-checked', element: 'RadioGroup.Item', purpose: 'Reflects whether the item is the currently selected value.' },
    { attribute: 'aria-label', element: 'RadioGroup.Item', purpose: 'Falls back to "Radio option" (or a caller-supplied aria-label) when no label prop is passed.' },
  ],
  a11yNotes: [
    'Renders Radix\'s WAI-ARIA radio group pattern with roving tabindex and automatic activation on arrow navigation.',
    'The selection dot\'s scale-in/out animation drops to a duration of 0 when prefers-reduced-motion is set.',
    'Focus is always visible via focus-visible:ring-2 with a ring-offset, regardless of variant.',
  ],
  dependencies: ['@radix-ui/react-radio-group'],
  sourceFiles: [
    'packages/ui/src/components/foundation/radio-group/radio-group.tsx',
    'packages/ui/src/components/foundation/radio-group/index.ts',
  ],
};
