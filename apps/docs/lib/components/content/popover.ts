import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Popover, Button } from '@varient/ui'

<Popover>
  <Popover.Trigger asChild>
    <Button variant="outline">Open popover</Button>
  </Popover.Trigger>

  <Popover.Content>
    <div className="space-y-2">
      <h4 className="text-sm font-medium leading-none">Dimensions</h4>
      <p className="text-sm text-muted-foreground">
        Set the width and height for the layer.
      </p>
    </div>
  </Popover.Content>
</Popover>`,
  props: [
    {
      title: 'Popover',
      rows: [
        {
          name: 'isOpen',
          type: 'boolean',
          description:
            'Controlled open state — pair with onOpenChange. Omit for uncontrolled usage.',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Initial open state for uncontrolled usage.',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Called whenever the open state should change — trigger click, Esc, or outside click.',
        },
      ],
    },
    {
      title: 'Popover.Content',
      rows: [
        {
          name: 'side',
          type: "'top' | 'right' | 'bottom' | 'left'",
          defaultValue: "'bottom'",
          description: 'Which edge of the trigger the panel anchors to.',
        },
        {
          name: 'align',
          type: "'start' | 'center' | 'end'",
          defaultValue: "'center'",
          description: 'Alignment along the anchor edge.',
        },
        {
          name: 'sideOffset',
          type: 'number',
          defaultValue: '8',
          description: 'Gap in pixels between the trigger and the panel.',
        },
        {
          name: 'showArrow',
          type: 'boolean',
          defaultValue: 'false',
          description:
            'Renders a small Radix Arrow pointer connecting the panel to its trigger, tinted bg-popover with a border.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn(), applied to the panel.',
        },
      ],
    },
  ],
  features: [
    'Spring scale/fade entrance with a small directional pull per side, matching the Radix transform-origin.',
    'Own internal open-state copy shared via context so Content can gate AnimatePresence while Radix retains focus and dismiss ownership.',
    'Controlled (isOpen/onOpenChange) or uncontrolled (defaultOpen) usage.',
    'Optional showArrow prop renders a Radix Arrow pointer tinted to match the panel (bg-popover with a border).',
    'Entrance/exit motion respects prefers-reduced-motion — instant opacity change instead of scale/slide when reduced motion is on.',
  ],
  keyboard: [
    { keys: 'Enter / Space', description: 'Opens the popover when the trigger is focused.' },
    { keys: 'Esc', description: 'Closes the popover and returns focus to the trigger.' },
    { keys: 'Tab / Shift + Tab', description: 'Moves focus inside the panel while open.' },
  ],
  a11yNotes: [
    'Focus moves into the panel on open and returns to the trigger on close.',
    'Clicking outside the panel dismisses it.',
    'The arrow (showArrow) is decorative and marked aria-hidden.',
  ],
  dependencies: ['@radix-ui/react-popover'],
  sourceFiles: [
    'packages/ui/src/components/foundation/popover/popover.tsx',
    'packages/ui/src/components/foundation/popover/index.ts',
  ],
};
