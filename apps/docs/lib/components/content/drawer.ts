import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Drawer, Button } from '@/components/foundation/drawer';

export function Example() {
  return (
    <Drawer>
      <Drawer.Trigger asChild>
        <Button variant="outline">Open drawer</Button>
      </Drawer.Trigger>

      <Drawer.Content side="right" size="md">
        <Drawer.Header>
          <Drawer.Title>Filters</Drawer.Title>
          <Drawer.Description>Refine the list with the options below.</Drawer.Description>
        </Drawer.Header>

        {/* panel content */}
      </Drawer.Content>
    </Drawer>
  );
}`,
  props: [
    {
      rows: [
        {
          name: 'isOpen',
          type: 'boolean',
          description:
            'Controlled open state — pair with onOpenChange. Omit for uncontrolled usage (Drawer root).',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description:
            'Called whenever the open state should change — trigger click, Esc, overlay click, or Drawer.Close (Drawer root).',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Initial open state for uncontrolled usage (Drawer root).',
        },
        {
          name: 'modal',
          type: 'boolean',
          defaultValue: 'true',
          description:
            'Traps focus and disables outside pointer events while open. Passed through to Radix (Drawer root).',
        },
        {
          name: 'Drawer.Trigger asChild',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Merges onto the child element instead of rendering its own <button>.',
        },
        {
          name: 'Drawer.Content side',
          type: "'right' | 'left' | 'top' | 'bottom'",
          defaultValue: "'right'",
          description: 'Edge the panel slides in from.',
        },
        {
          name: 'Drawer.Content size',
          type: "'sm' | 'md' | 'lg' | 'full'",
          defaultValue: "'md'",
          description: 'Panel width (left/right) or height (top/bottom).',
        },
        {
          name: 'Drawer.Content showCloseButton',
          type: 'boolean',
          defaultValue: 'true',
          description: 'Renders the built-in top-right X button. Set false to omit it entirely.',
        },
        {
          name: 'Drawer.Content className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn(), applied to the panel.',
        },
        {
          name: 'Drawer.Close asChild',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Merges onto the child element — pair with a Button to dismiss on click.',
        },
        {
          name: 'Drawer.Header',
          type: 'HTMLAttributes<HTMLDivElement>',
          description: 'Layout slot for title and description — standard div props.',
        },
        {
          name: 'Drawer.Title / Description',
          type: 'HTMLAttributes<HTMLHeadingElement> / <HTMLParagraphElement>',
          description: "Renders Radix's Title (h2) / Description (p) for automatic aria wiring.",
        },
      ],
    },
  ],
  features: [
    'Slides in from any of four edges (right, left, top, bottom) with directional enter/exit motion.',
    'Four size presets (sm/md/lg/full) that map to width for left/right drawers and height for top/bottom drawers.',
    'Controlled or uncontrolled open state, matching the Radix Dialog root API.',
    'Content stays mounted through the exit animation via AnimatePresence + forceMount, so panel state is not lost mid-close.',
    'Built-in close button can be hidden with showCloseButton={false} in favor of a custom Drawer.Close trigger.',
  ],
  keyboard: [
    { keys: 'Esc', description: 'Closes the drawer.' },
    { keys: 'Tab / Shift+Tab', description: 'Cycles focus within the panel while open (focus trap).' },
  ],
  aria: [
    { attribute: 'aria-labelledby', element: 'Drawer.Content', purpose: "Wired automatically from Drawer.Title's Radix Title primitive." },
    { attribute: 'aria-describedby', element: 'Drawer.Content', purpose: "Wired automatically from Drawer.Description's Radix Description primitive." },
    { attribute: 'aria-label="Close"', element: 'Built-in close button', purpose: 'Labels the icon-only dismiss control for screen readers.' },
  ],
  a11yNotes: [
    'Built on @radix-ui/react-dialog for focus trap, portal rendering, and dismiss handling.',
    'Focus moves into the panel on open and returns to the trigger on close.',
    'Always include a Drawer.Title — if hiding it visually, use a visually-hidden utility rather than omitting it.',
    'All entrance/exit motion respects prefers-reduced-motion, swapping the slide/fade for an instant state change.',
  ],
  dependencies: ['@radix-ui/react-dialog'],
  sourceFiles: [
    'packages/ui/src/components/foundation/drawer/drawer.tsx',
    'packages/ui/src/components/foundation/drawer/index.ts',
  ],
};
