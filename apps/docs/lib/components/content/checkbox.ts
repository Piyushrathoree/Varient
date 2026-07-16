import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { useState } from 'react';
import { Checkbox } from '@varient/ui';

export function Example() {
  const [checked, setChecked] = useState(true);

  return <Checkbox isChecked={checked} onChange={setChecked} label="Remember me" />;
}`,
  props: [
    {
      title: 'Checkbox',
      rows: [
        { name: 'isChecked', type: 'boolean', description: 'Required — the current checked state.' },
        {
          name: 'onChange',
          type: '(checked: boolean) => void',
          description: 'Required — called with the next state when toggled.',
        },
        {
          name: 'isIndeterminate',
          type: 'boolean',
          defaultValue: 'false',
          description:
            'Shows a dash instead of a checkmark. Takes over from isChecked visually; clicking always resolves to checked.',
        },
        { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disables the checkbox.' },
        { name: 'size', type: 'CheckboxSize', defaultValue: "'md'", description: 'Box/icon size — sm, md, or lg.' },
        {
          name: 'variant',
          type: 'CheckboxVariant',
          defaultValue: "'default'",
          description:
            "Box style — 'default' (rounded-square, bordered), 'round' (circular, bordered), or 'filled' (always tinted square, no border).",
        },
        { name: 'label', type: 'string', description: 'Inline label rendered next to the box and linked via htmlFor.' },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn(), applied to the box.',
        },
      ],
    },
  ],
  features: [
    "Fully controlled — isChecked and onChange are required, so there's no hidden internal state to fight.",
    'Spring-animated checkmark and indeterminate dash draw in via pathLength with an AnimatePresence cross-fade.',
    "Three variants — 'default' (bordered rounded-square), 'round' (circular), and 'filled' (always-tinted, borderless) — additive, no breaking changes.",
    'Three sizes (sm/md/lg) scale both the box and the glyph together.',
    'Built on Radix Checkbox — role="checkbox", keyboard activation, and aria-checked mixed state come for free.',
    'Press feedback (active:scale-90) and all path/opacity animation drop to duration 0 under prefers-reduced-motion.',
  ],
  keyboard: [
    { keys: 'Tab', description: 'Moves focus to the checkbox.' },
    { keys: 'Space', description: 'Toggles the checked state (native button semantics via Radix).' },
  ],
  aria: [
    {
      attribute: 'role="checkbox"',
      element: 'CheckboxPrimitive.Root (rendered as a <button>)',
      purpose: 'Identifies the control as a checkbox for assistive tech.',
    },
    {
      attribute: 'aria-checked="true" | "false" | "mixed"',
      element: 'CheckboxPrimitive.Root',
      purpose: 'Reflects checked/unchecked/indeterminate state; set automatically by Radix.',
    },
    {
      attribute: 'aria-label="Checkbox"',
      element: 'CheckboxPrimitive.Root',
      purpose: 'Fallback accessible name when no label or custom aria-label is supplied.',
    },
    {
      attribute: 'htmlFor / id',
      element: '<label> + CheckboxPrimitive.Root',
      purpose: 'Ties the visible label text to the box so clicking the label toggles it.',
    },
  ],
  a11yNotes: [
    'Clicking a checkbox while isIndeterminate is true always resolves to checked, matching native <input type="checkbox"> behavior.',
    'Disabled boxes get disabled:opacity-50 disabled:cursor-not-allowed and are removed from the tab order by the native button disabled attribute.',
    'Focus is always visible via focus-visible:ring-2 with a background-matched ring offset, regardless of variant.',
  ],
  sourceFiles: [
    'packages/ui/src/components/foundation/checkbox/checkbox.tsx',
    'packages/ui/src/components/foundation/checkbox/index.ts',
  ],
};
