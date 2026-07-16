import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { LogOut, Settings, User } from 'lucide-react'
import { Button, DropdownMenu } from '@varient/ui'

export function Example() {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline">Account</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item icon={<User className="size-4" />}>
          Profile
          <DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
        <DropdownMenu.Item icon={<Settings className="size-4" />}>
          Settings
          <DropdownMenu.Shortcut>⌘,</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item variant="destructive" icon={<LogOut className="size-4" />}>
          Log out
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}`,
  props: [
    {
      title: 'DropdownMenu',
      rows: [
        { name: 'open', type: 'boolean', description: 'Controlled open state.' },
        {
          name: 'defaultOpen',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Initial open state for uncontrolled usage.',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Called on trigger click, item select, outside click, or Escape.',
        },
        {
          name: 'modal',
          type: 'boolean',
          defaultValue: 'true',
          description:
            "Radix's modal mode — traps focus inside the menu and blocks outside pointer events while open.",
        },
      ],
    },
    {
      title: 'DropdownMenu.Trigger',
      rows: [
        {
          name: 'asChild',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Merges trigger behavior onto its child element instead of rendering its own button.',
        },
      ],
    },
    {
      title: 'DropdownMenu.Content',
      rows: [
        {
          name: 'align',
          type: "'start' | 'center' | 'end'",
          defaultValue: "'start'",
          description: 'Alignment relative to the trigger.',
        },
        {
          name: 'sideOffset',
          type: 'number',
          defaultValue: '4',
          description: 'Gap in pixels between the trigger and the menu.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn().',
        },
      ],
    },
    {
      title: 'DropdownMenu.Item',
      rows: [
        { name: 'icon', type: 'ReactNode', description: 'Icon rendered before the label.' },
        {
          name: 'variant',
          type: "'default' | 'destructive'",
          defaultValue: "'default'",
          description: 'destructive tints the label and highlight for dangerous actions (Log out, Delete).',
        },
        {
          name: 'disabled',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Disables the item — no select, no highlight.',
        },
        {
          name: 'onSelect',
          type: '(event: Event) => void',
          description: 'Called when the item is chosen via click, Enter, or Space.',
        },
      ],
    },
    {
      title: 'DropdownMenu.Label / Separator / Shortcut / Group',
      rows: [
        {
          name: 'DropdownMenu.Label',
          type: 'HTMLAttributes<HTMLDivElement>',
          description: 'Small muted section heading above a group of items.',
        },
        {
          name: 'DropdownMenu.Separator',
          type: 'HTMLAttributes<HTMLDivElement>',
          description: 'A 1px hairline divider between groups.',
        },
        {
          name: 'DropdownMenu.Shortcut',
          type: 'HTMLAttributes<HTMLSpanElement>',
          description: 'Trailing key-combo text, right-aligned inside an Item via ml-auto.',
        },
        {
          name: 'DropdownMenu.Group',
          type: 'HTMLAttributes<HTMLDivElement>',
          description: 'Groups related items under role="group" — no default styling.',
        },
      ],
    },
    {
      title: 'DropdownMenu.CheckboxItem',
      rows: [
        {
          name: 'checked',
          type: "boolean | 'indeterminate'",
          description: 'Controlled checked state — always pass this together with onCheckedChange.',
        },
        {
          name: 'onCheckedChange',
          type: '(checked: boolean) => void',
          description: 'Called when the item is toggled via click, Enter, or Space.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Disables the item — no toggle, no highlight.',
        },
      ],
    },
    {
      title: 'DropdownMenu.RadioGroup / DropdownMenu.RadioItem',
      rows: [
        {
          name: 'DropdownMenu.RadioGroup value',
          type: 'string',
          description: 'Currently selected value, shared with all child RadioItems.',
        },
        {
          name: 'DropdownMenu.RadioGroup onValueChange',
          type: '(value: string) => void',
          description: 'Called when a RadioItem is selected.',
        },
        {
          name: 'DropdownMenu.RadioItem value',
          type: 'string',
          description: "This item's value — checked when it matches the group's value.",
        },
        {
          name: 'DropdownMenu.RadioItem disabled',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Disables the item — no select, no highlight.',
        },
      ],
    },
  ],
  features: [
    'Compound API (Trigger/Content/Item/Label/Separator/Shortcut/Group/CheckboxItem/RadioGroup/RadioItem) built on @radix-ui/react-dropdown-menu for full ARIA menu behavior.',
    "Radix's Root renders no DOM node, so its own close tears the menu down before an exit animation can run — Content mirrors the open state into its own context and gates an AnimatePresence around itself instead of trusting Radix's mount.",
    'Content scales + fades in from the trigger edge via the Popper transform-origin CSS var, so the animation always originates from wherever the menu actually opened.',
    'CheckboxItem and RadioItem reuse the same item chassis (highlight, disabled, rounded-md) as plain Item, with the icon slot replaced by a reserved left gutter for an animated check mark / dot.',
    'RadioItem mirrors the RadioGroup value into its own context — same reasoning as the open-state mirroring on Content — since Radix keeps the checked-vs-unchecked comparison for each item internal.',
    'destructive Item variant tints both label and highlight for dangerous actions (Log out, Delete).',
    'Respects prefers-reduced-motion end to end: open/close scale+fade, and the check-mark/dot pop, all collapse to an instant swap.',
  ],
  keyboard: [
    { keys: 'Enter / Space', description: 'Opens the menu from the trigger, or selects the highlighted item while open.' },
    { keys: 'Arrow Up / Down', description: 'Moves the highlighted item; wraps at the ends.' },
    { keys: 'Home / End', description: 'Jumps to the first / last item.' },
    { keys: 'A–Z (typeahead)', description: 'Typing letters jumps to the next item whose label starts with those characters.' },
    { keys: 'Escape', description: 'Closes the menu and returns focus to the trigger.' },
  ],
  aria: [
    {
      attribute: 'aria-haspopup / aria-expanded / aria-controls',
      element: 'DropdownMenu.Trigger',
      purpose: 'Identifies the trigger as opening a menu and links it to the open content.',
    },
    {
      attribute: 'role="menu"',
      element: 'DropdownMenu.Content',
      purpose: 'Identifies the popup as a menu per the ARIA menu pattern.',
    },
    {
      attribute: 'role="menuitemcheckbox" / aria-checked',
      element: 'DropdownMenu.CheckboxItem',
      purpose: 'Exposes the toggle state of a checkbox item to assistive tech.',
    },
    {
      attribute: 'role="menuitemradio" / aria-checked',
      element: 'DropdownMenu.RadioItem',
      purpose: 'Exposes the selected state of a radio item within its group to assistive tech.',
    },
  ],
  a11yNotes: [
    'Built on @radix-ui/react-dropdown-menu, which implements the full ARIA menu pattern (focus management, typeahead, wrap-around navigation) out of the box.',
    "modal (default true) traps focus inside the open menu and blocks pointer events on the rest of the page; Escape and outside-click both close the menu and return focus to the trigger.",
    'CheckboxItem and RadioItem are fully controlled — pass checked/onCheckedChange or value/onValueChange so the checked state driving their AnimatePresence stays in sync.',
    'All open/close and check-mark/dot animations drop to an instant transition under prefers-reduced-motion.',
  ],
  sourceFiles: [
    'packages/ui/src/components/foundation/dropdown-menu/dropdown-menu.tsx',
    'packages/ui/src/components/foundation/dropdown-menu/index.ts',
  ],
};
