import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { useState } from 'react'\nimport { SortableList } from '@varient/ui'\n\ninterface Task {\n  id: string;\n  label: string;\n}\n\nexport function Example() {\n  const [items, setItems] = useState<Task[]>([\n    { id: 'a', label: 'Draft the release notes' },\n    { id: 'b', label: 'Tune the drag spring' },\n    { id: 'c', label: 'Ship it' },\n  ]);\n\n  return (\n    <SortableList\n      items={items}\n      onReorder={setItems}\n      renderItem={(task) => <span>{task.label}</span>}\n    />\n  );\n}`,
  props: [
    {
      title: 'SortableList',
      rows: [
        { name: 'items', type: 'T[]', description: 'Required — the ordered data driving the list.' },
        {
          name: 'onReorder',
          type: '(items: T[]) => void',
          description:
            'Required — fires with the full new order after a drag, a keyboard move, or a row button click.',
        },
        {
          name: 'renderItem',
          type: '(item: T) => ReactNode',
          description: "Required — renders a row's content from its item.",
        },
        {
          name: 'getKey',
          type: '(item: T) => string | number',
          defaultValue: 'item.id ?? item',
          description: 'Stable identity for list/React keys.',
        },
        {
          name: 'showHandle',
          type: 'boolean',
          defaultValue: 'false',
          description:
            'Restricts dragging to a grip handle (useDragControls + dragListener={false}) instead of the whole row.',
        },
        {
          name: 'isDisabled',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Disables drag and keyboard reordering; rows stay visible and readable.',
        },
        {
          name: "aria-label",
          type: 'string',
          defaultValue: "'Sortable list'",
          description: 'Accessible name for the list.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged onto the list (<ul>) via cn().',
        },
        {
          name: 'itemClassName',
          type: 'string',
          description: 'Additional Tailwind classes merged onto every row.',
        },
      ],
    },
  ],
  features: [
    "Whole-row drag by default, powered by motion's Reorder.Group/Reorder.Item; siblings reflow via each row's own layout spring (SPRING_DEFAULT).",
    'showHandle restricts the drag surface to a grip icon via useDragControls + dragListener={false}, leaving the rest of the row free for other interactive content (checkboxes, links, buttons).',
    'Full keyboard support: ArrowUp/ArrowDown rove focus between rows, Alt+ArrowUp/Alt+ArrowDown reorder the focused row by one position, and always-in-DOM per-row ↑/↓ buttons (fade in on hover/focus) do the same.',
    'Every explicit move (keyboard or button) is announced through a polite aria-live region ("Item 2 moved to position 1 of 4"); continuous drag gestures are not announced per-frame.',
    'Dragging a row applies scale 1.02 (whileDrag) plus shadow-lg/z-10/cursor-grabbing while its siblings spring out of the way.',
    'Reduced motion drops the drag lift/scale and the layout reflow spring — reordering by drag, keyboard, or buttons all still fully work, just without the animated in-between.',
  ],
  keyboard: [
    { keys: 'Tab', description: 'Moves focus into and between the list rows and their move buttons.' },
    { keys: 'ArrowUp / ArrowDown', description: 'Moves focus to the previous/next row without reordering.' },
    { keys: 'Alt+ArrowUp / Alt+ArrowDown', description: 'Reorders the focused row up/down by one position; focus follows the row.' },
  ],
  aria: [
    { attribute: 'aria-label="Sortable list"', element: '<ul> (Reorder.Group)', purpose: 'Accessible name for the list, overridable via the aria-label prop.' },
    { attribute: 'tabIndex={0} aria-label="Item N of M"', element: '<li> (Reorder.Item)', purpose: 'Makes each row focusable and announces its position.' },
    { attribute: 'aria-label="Move up" / "Move down"', element: 'Per-row buttons', purpose: 'Names the keyboard-reachable reorder actions.' },
    { attribute: 'aria-live="polite" aria-atomic="true"', element: 'Hidden status span', purpose: 'Announces the outcome of explicit reorder actions.' },
  ],
  a11yNotes: [
    'Plain ArrowUp/ArrowDown only move DOM focus (a roving-focus, listbox-style pattern) — reordering is always an explicit, announced action via Alt+Arrow or a row button, never a side effect of navigation.',
    'Per-row move buttons are always mounted (not conditionally rendered) so they remain in the tab order; they fade in visually on hover/focus-within via opacity, staying reachable for keyboard and screen-reader users regardless of pointer hover.',
    'Under prefers-reduced-motion, drag itself still works (position conveys the reorder), only the spring lift/scale and layout-reflow animation are removed.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/sortable-list/sortable-list.tsx',
    'packages/ui/src/components/animated/sortable-list/index.ts',
  ],
};
