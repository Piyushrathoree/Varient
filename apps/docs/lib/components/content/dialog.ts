import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Dialog, Button } from '@varient/ui'

<Dialog>
  <Dialog.Trigger asChild>
    <Button variant="outline">Edit profile</Button>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Edit profile</Dialog.Title>
      <Dialog.Description>Make changes to your profile here.</Dialog.Description>
    </Dialog.Header>
    <Dialog.Footer>
      <Dialog.Close asChild>
        <Button variant="outline">Cancel</Button>
      </Dialog.Close>
      <Button variant="primary">Save changes</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog>`,
  props: [
    {
      title: 'Dialog',
      rows: [
        {
          name: 'isOpen',
          type: 'boolean',
          description:
            'Controlled open state — pair with onOpenChange. Omit for uncontrolled usage.',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description:
            'Called whenever the open state should change — trigger click, Esc, overlay click, or Dialog.Close.',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Initial open state for uncontrolled usage.',
        },
        {
          name: 'modal',
          type: 'boolean',
          defaultValue: 'true',
          description:
            'Traps focus and disables outside pointer events while open. Passed through to Radix.',
        },
      ],
    },
    {
      title: 'Dialog.Trigger',
      rows: [
        {
          name: 'asChild',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Merges onto the child element instead of rendering its own <button>.',
        },
      ],
    },
    {
      title: 'Dialog.Content',
      rows: [
        {
          name: 'showCloseButton',
          type: 'boolean',
          defaultValue: 'true',
          description: 'Renders the built-in top-right X button. Set false to omit it entirely.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn(), applied to the panel.',
        },
      ],
    },
    {
      title: 'Dialog.Close',
      rows: [
        {
          name: 'asChild',
          type: 'boolean',
          defaultValue: 'false',
          description:
            'Merges onto the child element — pair with a Button in Dialog.Footer to dismiss on click.',
        },
      ],
    },
    {
      title: 'Dialog.Header / Footer / Title / Description',
      rows: [
        {
          name: 'Header / Footer',
          type: 'HTMLAttributes<HTMLDivElement>',
          description: 'Layout slots — standard div props.',
        },
        {
          name: 'Title / Description',
          type: 'HTMLAttributes<HTMLHeadingElement> / <HTMLParagraphElement>',
          description: "Renders Radix's Title (h2) / Description (p) for automatic aria wiring.",
        },
      ],
    },
  ],
  features: [
    'Compound API (Dialog.Trigger/Content/Header/Title/Description/Footer/Close) built on @radix-ui/react-dialog for focus trap, portal, and dismiss handling.',
    'Spring-scale entrance (opacity + scale 0.96 → 1) with a fading backdrop blur overlay.',
    'Controlled (isOpen/onOpenChange) or uncontrolled (defaultOpen) usage, same pattern as Tabs.',
    'Keeps Radix logically open through the exit animation so focus trap and Escape handling stay live until AnimatePresence finishes unmounting the panel.',
    'Fully respects prefers-reduced-motion — animated properties collapse to instant duration-0 state changes.',
  ],
  keyboard: [
    { keys: 'Esc', description: 'Closes the dialog and returns focus to the trigger.' },
    { keys: 'Tab / Shift+Tab', description: 'Cycles focus within the panel — focus is trapped while open.' },
  ],
  aria: [
    {
      attribute: 'aria-labelledby',
      element: 'Dialog.Content',
      purpose: 'Wired automatically to Dialog.Title via Radix Title primitive.',
    },
    {
      attribute: 'aria-describedby',
      element: 'Dialog.Content',
      purpose: 'Wired automatically to Dialog.Description via Radix Description primitive.',
    },
    {
      attribute: 'aria-label="Close"',
      element: 'Dialog.Close (built-in X button)',
      purpose: 'Labels the icon-only default close control for assistive tech.',
    },
  ],
  a11yNotes: [
    'Always render a Dialog.Title — if it must be visually hidden, wrap it with a visually-hidden utility rather than omitting it, since Radix relies on it for aria-labelledby.',
    'Focus moves into the panel on open and returns to the trigger on close.',
  ],
  dependencies: ['@radix-ui/react-dialog'],
  sourceFiles: [
    'packages/ui/src/components/foundation/dialog/dialog.tsx',
    'packages/ui/src/components/foundation/dialog/index.ts',
  ],
};
