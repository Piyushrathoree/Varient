import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { ToggleGroup } from '@varient/ui'

export function Example() {
  return (
    <ToggleGroup defaultValue="left" variant="segmented">
      <ToggleGroup.Item value="left" aria-label="Align left">
        Left
      </ToggleGroup.Item>
      <ToggleGroup.Item value="center" aria-label="Align center">
        Center
      </ToggleGroup.Item>
      <ToggleGroup.Item value="right" aria-label="Align right">
        Right
      </ToggleGroup.Item>
    </ToggleGroup>
  );
}`,
  props: [
    {
      title: 'ToggleGroup',
      rows: [
        { name: 'isMultiple', type: 'boolean', defaultValue: 'false', description: 'Allows more than one item pressed at once. false keeps it single-select.' },
        { name: 'value', type: 'string | string[]', description: 'Controlled value — a string in single mode, a string[] in multiple mode.' },
        { name: 'defaultValue', type: 'string | string[]', description: 'Uncontrolled initial value.' },
        { name: 'onValueChange', type: '(value: string | string[]) => void', description: 'Called with the next value(s) when an item is toggled.' },
        { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disables every item in the group.' },
        { name: 'variant', type: "'segmented' | 'outline'", defaultValue: "'segmented'", description: 'Visual style — enclosed segmented track or bordered outline toggles.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Item height and padding.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn(), applied to the root.' },
      ],
    },
    {
      title: 'ToggleGroup.Item',
      rows: [
        { name: 'value', type: 'string', description: 'Required — a unique id for the item, matched against the group value(s).' },
        { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disables this item independently of the group-level isDisabled.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn().' },
      ],
    },
  ],
  features: [
    'Compound API — ToggleGroup.Item shares context (variant, size, selection) with its root.',
    'Segmented variant renders a shared layoutId spring chip that slides between items in single-select mode.',
    'Multi-select gives each active item its own static chip; the color/shadow change now eases in step with the segmented slide instead of snapping.',
    'Outline variant reuses the Toggle outline recipe for standalone bordered toggles, ideal for formatting toolbars.',
    'Fully controlled or uncontrolled via value/defaultValue, matching Radix Toggle Group semantics.',
    'Reduced motion collapses the sliding indicator to an instant snap and disables the active-press scale.',
  ],
  keyboard: [
    { keys: 'Enter / Space', description: 'Toggles the focused item.' },
    { keys: 'Tab / Shift + Tab', description: 'Moves focus into/out of the group.' },
    { keys: 'Arrow Right / Arrow Left', description: 'Moves focus between items (roving tabindex).' },
    { keys: 'Home', description: 'Moves focus to the first item.' },
    { keys: 'End', description: 'Moves focus to the last item.' },
  ],
  aria: [
    { attribute: 'aria-pressed', element: 'ToggleGroup.Item', purpose: 'Reflects whether the item\'s value is in the group\'s current selection.' },
    { attribute: 'aria-hidden', element: 'sliding indicator span', purpose: 'The segmented chip is decorative; selection is conveyed via aria-pressed and text color.' },
  ],
  a11yNotes: [
    'Built on @radix-ui/react-toggle-group with roving focus and correct aria-pressed on each item.',
    'Selection state is never conveyed by color alone — text color and aria-pressed both change.',
    'The layout animation collapses to an instant snap when prefers-reduced-motion is set.',
  ],
  dependencies: ['@radix-ui/react-toggle-group'],
  sourceFiles: [
    'packages/ui/src/components/foundation/toggle/toggle-group.tsx',
    'packages/ui/src/components/foundation/toggle/toggle.tsx',
    'packages/ui/src/components/foundation/toggle/index.ts',
  ],
};
