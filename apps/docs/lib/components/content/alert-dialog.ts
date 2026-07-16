import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { AlertDialog, Button } from '@varient/ui'

<AlertDialog>
  <AlertDialog.Trigger asChild>
    <Button variant="outline">Delete project</Button>
  </AlertDialog.Trigger>

  <AlertDialog.Content>
    <AlertDialog.Title>Delete project?</AlertDialog.Title>
    <AlertDialog.Description>
      This permanently deletes the project and all associated data. This action
      cannot be undone.
    </AlertDialog.Description>

    <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action variant="destructive">Delete project</AlertDialog.Action>
    </div>
  </AlertDialog.Content>
</AlertDialog>`,
  props: [
    {
      title: 'AlertDialog',
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
            'Called whenever the open state should change — trigger click, Esc, or AlertDialog.Cancel/Action.',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Initial open state for uncontrolled usage.',
        },
      ],
    },
    {
      title: 'AlertDialog.Trigger',
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
      title: 'AlertDialog.Content',
      rows: [
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn(), applied to the panel.',
        },
      ],
    },
    {
      title: 'AlertDialog.Action',
      rows: [
        {
          name: 'variant',
          type: "'default' | 'destructive'",
          defaultValue: "'default'",
          description: 'Visual style for the confirm button — use destructive for irreversible actions.',
        },
        {
          name: 'asChild',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Merges onto the child element instead of rendering a styled <button>.',
        },
      ],
    },
    {
      title: 'AlertDialog.Cancel',
      rows: [
        {
          name: 'asChild',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Merges onto the child element instead of rendering a styled <button>.',
        },
      ],
    },
    {
      title: 'AlertDialog.Title / Description',
      rows: [
        {
          name: 'className',
          type: 'string',
          description:
            "Renders Radix's Title (h2) / Description (p) for automatic aria wiring; className merged via cn().",
        },
      ],
    },
  ],
  features: [
    'Compound API — Trigger, Content, Title, Description, Action, Cancel — built on @radix-ui/react-alert-dialog.',
    'Spring-scale entrance/exit (opacity + scale) on the panel via motion/react; overlay fades independently.',
    'Overlay uses a fixed black/40 scrim with a 2px backdrop blur, consistent across dark and light themes.',
    'Clicking the overlay does not dismiss — only Cancel, Action, or Esc close the dialog, matching alert-dialog semantics.',
    'AlertDialog.Action supports a destructive variant for irreversible confirmations, mapped onto shared buttonVariants.',
    'Fully respects prefers-reduced-motion — animations collapse to instant opacity/scale swaps with zero-duration transitions.',
  ],
  keyboard: [
    { keys: 'Esc', description: 'Cancels and closes the dialog.' },
    { keys: 'Tab / Shift+Tab', description: 'Cycles focus among focusable elements trapped inside the panel.' },
    { keys: 'Enter / Space', description: 'Activates the focused Cancel or Action button.' },
  ],
  aria: [
    { attribute: 'role="alertdialog"', element: 'AlertDialog.Content', purpose: 'Identifies the panel as an interruptive alert dialog for assistive tech.' },
    { attribute: 'aria-labelledby', element: 'AlertDialog.Content', purpose: 'Wired automatically to AlertDialog.Title.' },
    { attribute: 'aria-describedby', element: 'AlertDialog.Content', purpose: 'Wired automatically to AlertDialog.Description.' },
    { attribute: 'aria-hidden', element: 'Overlay', purpose: 'Overlay is non-interactive and does not intercept dismiss clicks.' },
  ],
  a11yNotes: [
    'Focus moves into the panel on open and returns to the trigger on close; Tab is trapped inside while open.',
    'Always include an AlertDialog.Title — wrap with a visually-hidden utility if it must be hidden, never omit it.',
    'The overlay intentionally does not dismiss on click, forcing an explicit Cancel/Action choice for destructive flows.',
  ],
  dependencies: ['@radix-ui/react-alert-dialog'],
  sourceFiles: [
    'packages/ui/src/components/foundation/alert-dialog/alert-dialog.tsx',
    'packages/ui/src/components/foundation/alert-dialog/index.ts',
  ],
};
