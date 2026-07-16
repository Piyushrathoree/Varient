import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Accordion } from '@/components/foundation/accordion';

export function Example() {
  return (
    <Accordion defaultValue="item-1">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>What is Varient?</Accordion.Trigger>
        <Accordion.Content>
          A copy-paste component library, animated and accessible by default.
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="item-2">
        <Accordion.Trigger>Can more than one item be open?</Accordion.Trigger>
        <Accordion.Content>
          Pass <code>isMultiple</code> to the root to allow several items open at once.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}`,
  props: [
    {
      title: 'Accordion',
      rows: [
        {
          name: 'isMultiple',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Allows more than one item open at once. false keeps it single-open.',
        },
        {
          name: 'isCollapsible',
          type: 'boolean',
          defaultValue: 'true',
          description: 'Single mode only — lets the open item collapse back to none.',
        },
        {
          name: 'defaultValue',
          type: 'string | string[]',
          description: 'Uncontrolled initial value — a string in single mode, a string[] in multiple mode.',
        },
        {
          name: 'value',
          type: 'string | string[]',
          description: 'Controlled value — pass together with onValueChange.',
        },
        {
          name: 'onValueChange',
          type: '(value: string | string[]) => void',
          description: 'Called with the next open value(s) when an item is toggled.',
        },
        {
          name: 'variant',
          type: "'default' | 'separated' | 'ghost'",
          defaultValue: "'default'",
          description:
            'Visual style — a single bordered card, per-item cards with a gap, or a bare low-chrome list.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn(), applied to the root surface.',
        },
      ],
    },
    {
      title: 'Accordion.Item',
      rows: [
        {
          name: 'value',
          type: 'string',
          description: "Required — a unique id for the item, matched against the accordion's value(s).",
        },
        {
          name: 'isDisabled',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Disables the item — its trigger stops responding to interaction.',
        },
      ],
    },
    {
      title: 'Accordion.Trigger',
      rows: [
        {
          name: '...props',
          type: 'ButtonHTMLAttributes<HTMLButtonElement>',
          description: 'The row header — renders the label and the animated chevron.',
        },
      ],
    },
    {
      title: 'Accordion.Content',
      rows: [
        {
          name: '...props',
          type: 'HTMLAttributes<HTMLDivElement>',
          description: 'The panel — animates height and opacity open/closed with motion/react.',
        },
      ],
    },
  ],
  features: [
    'Three visual variants — default (single bordered card), separated (per-item cards with a gap, lifting shadow when open), ghost (bare list with a soft fill on the active row).',
    'isMultiple bridges a plain boolean API onto Radix\'s discriminated single/multiple type union, so callers never touch Radix\'s type prop directly.',
    'Content mounts with forceMount and drives its own AnimatePresence off derived open state, so height/opacity animate on both open and close instead of Radix unmounting it first.',
    'Asymmetric springs — opening uses SPRING_DEFAULT for a physical settle, closing switches to the snappier SPRING_SNAPPY with a faster opacity fade so the row collapses crisply.',
    'Every animation (chevron rotation, panel height/opacity) collapses to an instant DURATION_INSTANT transition under prefers-reduced-motion.',
  ],
  keyboard: [
    { keys: 'Enter / Space', description: 'Toggles the focused item open or closed.' },
    { keys: 'Tab / Shift + Tab', description: 'Moves focus to the next / previous focusable element.' },
    { keys: 'Arrow Down', description: 'Moves focus to the next trigger.' },
    { keys: 'Arrow Up', description: 'Moves focus to the previous trigger.' },
    { keys: 'Home', description: 'Moves focus to the first trigger.' },
    { keys: 'End', description: 'Moves focus to the last trigger.' },
  ],
  aria: [
    {
      attribute: 'role="region"',
      element: 'Accordion.Content',
      purpose: "Each panel is labelled by its trigger via Radix's built-in aria-labelledby wiring.",
    },
    {
      attribute: 'aria-expanded',
      element: 'Accordion.Trigger',
      purpose: 'Reflects the open/closed state of the associated panel.',
    },
    {
      attribute: 'aria-disabled',
      element: 'Accordion.Item',
      purpose: 'Set when isDisabled is true, stopping the trigger from responding to interaction.',
    },
  ],
  a11yNotes: [
    'Built on @radix-ui/react-accordion for correct roles, focus management, and keyboard behavior out of the box.',
    'Every open/close transition is gated behind prefers-reduced-motion — reduced-motion users get an instant toggle instead of the spring animation.',
    'Triggers carry a visible focus-visible ring (ring-2 ring-ring with offset) so keyboard focus is never invisible.',
  ],
  dependencies: ['@radix-ui/react-accordion'],
  sourceFiles: [
    'packages/ui/src/components/foundation/accordion/accordion.tsx',
    'packages/ui/src/components/foundation/accordion/index.ts',
  ],
};
