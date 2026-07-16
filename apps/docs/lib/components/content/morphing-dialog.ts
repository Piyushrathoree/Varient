import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Button, MorphingDialog } from '@varient/ui'\n\n<MorphingDialog>\n  <MorphingDialog.Trigger>\n    <Button variant="outline">Settings</Button>\n  </MorphingDialog.Trigger>\n\n  <MorphingDialog.Content>\n    <MorphingDialog.Title>Preferences</MorphingDialog.Title>\n    <MorphingDialog.Description>Changes apply immediately.</MorphingDialog.Description>\n  </MorphingDialog.Content>\n</MorphingDialog>`,
  props: [
    {
      title: 'MorphingDialog (root)',
      rows: [
        {
          name: 'isOpen',
          type: 'boolean',
          description: 'Controlled open state — pair with onOpenChange. Omit for uncontrolled usage.',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Called whenever the open state should change — trigger click, Esc, overlay click, or Close.',
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
      title: 'MorphingDialog.Trigger',
      rows: [
        {
          name: 'isDisabled',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Prevents the trigger from opening the dialog.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn(), applied to the wrapping element.',
        },
      ],
    },
    {
      title: 'MorphingDialog.Content',
      rows: [
        {
          name: 'showCloseButton',
          type: 'boolean',
          defaultValue: 'true',
          description: 'Renders the built-in top-right X button. Set false to place your own via MorphingDialog.Close.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn(), applied to the panel.',
        },
      ],
    },
    {
      title: 'MorphingDialog.Title / Description / Close',
      rows: [
        {
          name: 'MorphingDialog.Title / Description',
          type: 'HTMLAttributes<HTMLHeadingElement> / <HTMLParagraphElement>',
          description: 'Renders an h2 / p. Usable inside Trigger and/or Content — both share a layoutId for a text morph; only the Content instance owns the id used by aria-labelledby/aria-describedby.',
        },
        {
          name: 'MorphingDialog.Close children',
          type: 'ReactNode',
          description: 'Unstyled dismiss action, place anywhere. Renders a bare inline X icon when no children are passed.',
        },
      ],
    },
  ],
  features: [
    'Trigger→panel shared-layout morph via a per-instance (`useId`-scoped) `layoutId`, so the trigger visually becomes the dialog panel instead of a plain fade-in on top of it.',
    'Compound API mirrors Dialog: MorphingDialog (root) + .Trigger + .Content + .Title + .Description + .Close, controlled (isOpen/onOpenChange) or uncontrolled (defaultOpen).',
    '.Title and .Description can be rendered inside the Trigger AND inside Content — both instances share a layoutId, enabling a text-level morph (e.g. a note card title becoming the editor heading); only the Content instance carries the aria id, so no duplicate DOM ids occur.',
    'Escape, overlay click, and a built-in close button (togglable via showCloseButton) all dismiss; body scroll is locked while open and restored to its prior value on close.',
    'Focus moves to the close button (or the panel) on open and returns to the trigger on close — the trigger stays mounted (invisible, not unmounted) while open, so restoration is instant and the morph has a stable FLIP origin.',
    'Reduced motion: the shared-layout morph and the content-reveal delay are both skipped in favor of a plain opacity crossfade.',
  ],
  keyboard: [
    { keys: 'Enter / Space', description: 'Activates the trigger (when focused) and opens the dialog.' },
    { keys: 'Escape', description: 'Closes the dialog from anywhere while it is open.' },
    { keys: 'Tab', description: 'Moves focus through focusable elements inside the open panel.' },
  ],
  aria: [
    { attribute: 'role="button" + aria-haspopup="dialog" + aria-expanded', element: 'MorphingDialog.Trigger', purpose: 'Exposes the wrapped content as an activatable control that discloses a dialog.' },
    { attribute: 'role="dialog" aria-modal="true"', element: 'MorphingDialog.Content panel', purpose: 'Marks the morphed panel as a modal dialog.' },
    { attribute: 'aria-labelledby / aria-describedby', element: 'MorphingDialog.Content panel', purpose: 'Wired automatically to the Content-owned Title/Description ids once they mount.' },
    { attribute: 'aria-hidden', element: 'MorphingDialog.Trigger (while open)', purpose: 'Hides the now-invisible trigger from the accessibility tree while its morphed twin (the panel) is open.' },
  ],
  a11yNotes: [
    'No native focus trap is implemented (Tab is not cycled inside the panel) — focus is placed on open and restored to the trigger on close, matching the ExpandableCard/Dialog house pattern rather than a hard trap.',
    'The trigger element stays mounted (CSS `invisible`, not unmounted) while the dialog is open, which is what makes instant focus restoration and the shared-layout FLIP animation possible.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/morphing-dialog/morphing-dialog.tsx',
    'packages/ui/src/components/animated/morphing-dialog/index.ts',
  ],
};
