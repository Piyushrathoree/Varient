import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { ToastProvider, useToast } from '@varient/ui'

function SaveButton() {
  const { toast } = useToast()

  return (
    <button
      onClick={() =>
        toast.success('Changes saved', { description: 'Your profile has been updated.' })
      }
    >
      Save
    </button>
  )
}

export function App() {
  return (
    <ToastProvider>
      <SaveButton />
    </ToastProvider>
  )
}`,
  props: [
    {
      title: 'ToastOptions (passed to toast(options) and its shorthands)',
      rows: [
        {
          name: 'title',
          type: 'ReactNode',
          description:
            'Required — the toast’s heading. Shorthands (toast.success(title)) pass this as the first argument.',
        },
        {
          name: 'description',
          type: 'ReactNode',
          description: 'Optional supporting text shown below the title.',
        },
        {
          name: 'variant',
          type: "'default' | 'success' | 'error' | 'warning' | 'info'",
          defaultValue: "'default'",
          description: 'Status icon and accent — default renders no icon.',
        },
        {
          name: 'duration',
          type: 'number',
          defaultValue: '5000',
          description:
            'Auto-dismiss delay in ms. 0 disables auto-dismiss; the timer pauses while hovered or focused.',
        },
        {
          name: 'action',
          type: '{ label: string; onClick: () => void }',
          description: 'Optional inline action button — clicking it calls onClick, then dismisses the toast.',
        },
      ],
    },
  ],
  features: [
    'toast(options) fires a default toast; toast.success/.error/.warning/.info are shorthands that set the title and variant in one call',
    'Every toast call returns its generated id, which dismiss(id) accepts to close it early (e.g. from an action handler)',
    'Auto-dismiss timer pauses on mouse hover and on keyboard focus, resuming the remaining time on leave/blur',
    'Stack caps at 4 visible toasts — firing a 5th silently drops the oldest to make room',
    'Viewport portals to document.body so the stack escapes overflow-hidden ancestors regardless of where <ToastProvider> is mounted',
    'Enter/exit/reflow animation is fully skipped under prefers-reduced-motion',
  ],
  keyboard: [
    { keys: 'Tab', description: 'Moves focus to a toast’s action button, then its dismiss button.' },
    { keys: 'Enter / Space', description: 'Activates the focused action or dismiss button.' },
  ],
  aria: [
    { attribute: 'role="region" aria-label="Notifications"', element: 'Viewport container', purpose: 'Lets screen reader users jump directly to the notification stack.' },
    { attribute: 'role="status" aria-live="polite"', element: 'Toast card (default/success/warning/info)', purpose: 'Announces the toast without interrupting current speech.' },
    { attribute: 'role="alert" aria-live="assertive"', element: 'Toast card (error variant)', purpose: 'Interrupts and announces failures immediately.' },
    { attribute: 'aria-label="Dismiss notification"', element: 'Close button', purpose: 'Labels the icon-only dismiss control for assistive tech.' },
  ],
  a11yNotes: [
    'The auto-dismiss timer pauses on hover and on keyboard focus so a toast never disappears mid-read.',
    'The close button is a real <button>, keyboard-reachable with a visible focus-visible ring.',
    'All motion (enter, exit, and stack reflow) is skipped under prefers-reduced-motion.',
  ],
  sourceFiles: [
    'packages/ui/src/components/foundation/toast/toast.tsx',
    'packages/ui/src/components/foundation/toast/toast-provider.tsx',
    'packages/ui/src/components/foundation/toast/use-toast.ts',
    'packages/ui/src/components/foundation/toast/toast-icons.tsx',
    'packages/ui/src/components/foundation/toast/types.ts',
    'packages/ui/src/components/foundation/toast/index.ts',
  ],
};
