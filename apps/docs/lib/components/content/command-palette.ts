import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { useState } from 'react';
import { CommandPalette, Button, KbdGroup } from '@/components/foundation/command-palette';

export function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        Open palette
      </Button>

      <CommandPalette isOpen={isOpen} onOpenChange={setIsOpen}>
        <CommandPalette.Input placeholder="Search commands…" />
        <CommandPalette.List>
          <CommandPalette.Empty>No results found.</CommandPalette.Empty>
          <CommandPalette.Group heading="Actions">
            <CommandPalette.Item
              shortcut={<KbdGroup keys={['⌘', 'K']} size="sm" />}
              onSelect={() => setIsOpen(false)}
            >
              Search
            </CommandPalette.Item>
          </CommandPalette.Group>
        </CommandPalette.List>
      </CommandPalette>
    </>
  );
}`,
  props: [
    {
      title: 'CommandPalette',
      rows: [
        {
          name: 'isOpen',
          type: 'boolean',
          description: 'Controlled open state — pair with onOpenChange.',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Called when the palette should open or close.',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Initial open state for uncontrolled usage.',
        },
        {
          name: 'label',
          type: 'string',
          defaultValue: "'Command palette'",
          description: 'Accessible name wired to cmdk and an sr-only dialog title.',
        },
      ],
    },
    {
      title: 'Compound parts',
      rows: [
        {
          name: 'CommandPalette.Input',
          type: 'ComponentProps<"input">',
          description: 'Search field — supports placeholder, autoFocus, and cmdk value/onValueChange.',
        },
        {
          name: 'CommandPalette.List',
          type: 'ComponentProps<"div">',
          description: 'Scrollable results container (max-height with internal scroll).',
        },
        {
          name: 'CommandPalette.Empty',
          type: 'ComponentProps<"div">',
          description: 'Shown when filtering yields no matches — cmdk toggles this automatically.',
        },
        {
          name: 'CommandPalette.Group heading',
          type: 'string',
          description: 'Non-interactive section heading for related items.',
        },
        {
          name: 'CommandPalette.Item icon',
          type: 'ReactNode',
          description: 'Leading icon — accent turns brand when the item is selected.',
        },
        {
          name: 'CommandPalette.Item shortcut',
          type: 'ReactNode',
          description: 'Trailing shortcut hint — typically Kbd or KbdGroup.',
        },
        {
          name: 'CommandPalette.Item onSelect',
          type: '(value: string) => void',
          description: 'Fired when the item is chosen via click or Enter.',
        },
        {
          name: 'CommandPalette.Separator',
          type: 'ComponentProps<"div">',
          description: 'Thin divider between groups.',
        },
        {
          name: 'CommandPalette.Footer',
          type: 'HTMLAttributes<"div">',
          description: 'Optional bottom bar for navigation hints.',
        },
      ],
    },
  ],
  features: [
    'Compound-component API (Input/List/Empty/Group/Item/Separator/Footer) built on cmdk for combobox-style filtering and typeahead.',
    'Rendered inside a Radix Dialog for focus trapping, Escape-to-close, and portal rendering.',
    'Controlled or uncontrolled open state via isOpen/onOpenChange or defaultOpen.',
    'Overlay and panel entrance/exit animate with a shared spring, fully gated by useReducedMotion (instant, no scale/opacity motion when reduced motion is on).',
    'Item icon accent switches to brand color on keyboard/pointer selection.',
    'CommandPalette.Empty renders a centered "no results" message automatically when the query matches nothing.',
  ],
  keyboard: [
    { keys: '⌘ K / Ctrl K', description: 'Toggle the palette (wired by the consuming app, not the component itself).' },
    { keys: '↑ / ↓', description: 'Move selection between items.' },
    { keys: 'Enter', description: 'Activate the selected item.' },
    { keys: 'Escape', description: 'Close the palette and restore focus to the trigger.' },
  ],
  aria: [
    { attribute: 'role="dialog"', element: 'Radix Dialog.Content', purpose: 'Marks the palette as a modal dialog with a focus trap.' },
    { attribute: 'Dialog.Title (sr-only)', element: 'label prop', purpose: 'Gives the dialog an accessible name announced by screen readers.' },
    { attribute: 'cmdk combobox roles', element: 'CommandPalette.Input/List/Item', purpose: 'cmdk manages listbox/option semantics and active-descendant wiring internally.' },
  ],
  a11yNotes: [
    'Overlay and panel motion respect prefers-reduced-motion — durations drop to 0 and transforms are skipped.',
    'Focus returns to the trigger element on close via the underlying Radix Dialog.',
    'Disabled items get pointer-events-none and reduced opacity, and are skipped by cmdk navigation.',
  ],
  dependencies: ['cmdk', '@radix-ui/react-dialog'],
  sourceFiles: [
    'packages/ui/src/components/foundation/command-palette/command-palette.tsx',
    'packages/ui/src/components/foundation/command-palette/index.ts',
  ],
};
