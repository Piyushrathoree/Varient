import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Select } from '@varient/ui'

<Select defaultValue="next">
  <Select.Trigger aria-label="Framework">
    <Select.Value placeholder="Select a framework" />
  </Select.Trigger>
  <Select.Content>
    <Select.Group>
      <Select.Label>Frameworks</Select.Label>
      <Select.Item value="next">Next.js</Select.Item>
      <Select.Item value="react">React</Select.Item>
    </Select.Group>
  </Select.Content>
</Select>`,
  props: [
    {
      title: 'Select (root)',
      rows: [
        {
          name: 'value',
          type: 'string',
          description: 'Controlled selected value — pass with onValueChange.',
        },
        {
          name: 'defaultValue',
          type: 'string',
          description: 'Initial selected value for uncontrolled usage.',
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description:
            'Called when the selected value changes. Radix naming — unlike Checkbox/Switch in this library, which use onChange.',
        },
        {
          name: 'isDisabled',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Disables the whole select.',
        },
        {
          name: 'open',
          type: 'boolean',
          description: 'Controlled open state for the dropdown.',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          description: 'Initial open state for uncontrolled usage.',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Called when the dropdown opens or closes.',
        },
      ],
    },
    {
      title: 'Select.Trigger',
      rows: [
        {
          name: 'size',
          type: "'sm' | 'md' | 'lg'",
          defaultValue: "'md'",
          description: "Height and padding preset — matches Input's sizes exactly.",
        },
        {
          name: 'variant',
          type: "'default' | 'ghost' | 'filled'",
          defaultValue: "'default'",
          description:
            'Surface treatment — bordered, transparent, or filled. All three share the same focus/open border+ring emphasis.',
        },
      ],
    },
    {
      title: 'Select.Value',
      rows: [
        {
          name: 'placeholder',
          type: 'string',
          description: 'Text shown in the trigger when no value is selected.',
        },
      ],
    },
    {
      title: 'Select.Item',
      rows: [
        { name: 'value', type: 'string', description: 'Required — the value this item represents.' },
        { name: 'disabled', type: 'boolean', description: 'Disables an individual item.' },
      ],
    },
    {
      title: 'Select.Group / Select.Label / Select.Separator',
      rows: [
        {
          name: 'Select.Group',
          type: 'ComponentProps<"div">',
          description: 'Groups related items — pair with Select.Label.',
        },
        {
          name: 'Select.Label',
          type: 'ComponentProps<"div">',
          description: 'Non-interactive heading for a Select.Group.',
        },
        {
          name: 'Select.Separator',
          type: 'ComponentProps<"div">',
          description: 'Visual divider between groups.',
        },
      ],
    },
  ],
  features: [
    'Compound API (Select.Trigger/Value/Content/Item/Group/Label/Separator) built on @radix-ui/react-select for full ARIA listbox behavior.',
    'Three trigger surface variants (default, ghost, filled) sharing one focus/open border+ring treatment, and three size presets matching Input exactly.',
    'Content pops open with a springy scale+fade anchored to the trigger edge; items stagger in on open and skip the stagger on close for a snappier exit.',
    'Chevron rotates 180° on open, and the selected check-mark scales/fades in — both spring-driven.',
    'Item highlight background eases in/out via transition-colors (150ms) rather than snapping.',
    'Respects prefers-reduced-motion end to end: open/close, chevron rotation, item stagger, and check-mark all collapse to instant transitions.',
  ],
  keyboard: [
    { keys: 'Space / Enter', description: 'Opens the dropdown, or selects the highlighted item while open.' },
    { keys: 'Arrow Up / Down', description: 'Moves the highlighted item; wraps at the ends.' },
    { keys: 'Home / End', description: 'Jumps to the first / last item.' },
    { keys: 'A–Z (typeahead)', description: "Typing letters jumps to the next item matching that label." },
    { keys: 'Escape', description: 'Closes the dropdown and returns focus to the trigger.' },
  ],
  aria: [
    {
      attribute: 'role="combobox" / aria-expanded / aria-controls',
      element: 'Select.Trigger',
      purpose: 'Identifies the trigger as a combobox and links it to the open listbox.',
    },
    {
      attribute: 'role="listbox"',
      element: 'Select.Content',
      purpose: 'Identifies the dropdown as a listbox per the ARIA listbox pattern.',
    },
    {
      attribute: 'aria-selected',
      element: 'Select.Item',
      purpose: 'Marks the currently selected item(s) for assistive tech.',
    },
  ],
  a11yNotes: [
    'Built on @radix-ui/react-select, which implements the full ARIA listbox pattern (focus management, typeahead, wrap-around navigation) out of the box.',
    'Escape closes the dropdown and returns focus to the trigger automatically.',
    'All open/close, chevron, item-stagger, and check-mark animations drop to an instant transition under prefers-reduced-motion.',
  ],
  sourceFiles: [
    'packages/ui/src/components/foundation/select/select.tsx',
    'packages/ui/src/components/foundation/select/index.ts',
  ],
};
