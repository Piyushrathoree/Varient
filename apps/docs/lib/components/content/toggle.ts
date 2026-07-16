import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Toggle } from '@varient/ui';

export function Example() {
  return (
    <Toggle defaultPressed aria-label="Bold">
      Bold
    </Toggle>
  );
}`,
  props: [
    {
      title: 'Toggle',
      rows: [
        { name: 'isPressed', type: 'boolean', description: 'Controlled pressed state — pass with onPressedChange.' },
        { name: 'defaultPressed', type: 'boolean', defaultValue: 'false', description: 'Initial pressed state for uncontrolled usage.' },
        { name: 'onPressedChange', type: '(pressed: boolean) => void', description: 'Called when the pressed state changes.' },
        { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disables the toggle — no pointer events, reduced opacity.' },
        { name: 'variant', type: "'default' | 'outline'", defaultValue: "'default'", description: 'Visual style — ghost fill or bordered outline.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Height and horizontal padding — matches the Button size scale.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn().' },
      ],
    },
  ],
  features: [
    'Built on @radix-ui/react-toggle for correct aria-pressed semantics and native keyboard behavior.',
    "Two variants — 'default' (transparent, fills bg-muted when pressed) and 'outline' (bordered with a soft shadow) — additive, no breaking changes.",
    'Three sizes (sm/md/lg) match the Button size scale for consistent toolbar rows.',
    'Press feedback (active:scale-[0.97]) drops to no-op transition under prefers-reduced-motion.',
    'Renders as a plain <button> under the hood, so icon-only usage just needs an aria-label.',
  ],
  keyboard: [
    { keys: 'Tab / Shift + Tab', description: 'Moves focus to the next / previous focusable element.' },
    { keys: 'Enter / Space', description: 'Toggles the pressed state.' },
  ],
  aria: [
    {
      attribute: 'aria-pressed="true" | "false"',
      element: 'TogglePrimitive.Root (rendered as a <button>)',
      purpose: 'Reflects the current pressed state for assistive tech; set automatically by Radix.',
    },
    {
      attribute: 'data-state="on" | "off"',
      element: 'TogglePrimitive.Root',
      purpose: 'Styling hook used for the pressed background/text color.',
    },
    {
      attribute: 'aria-label',
      element: 'TogglePrimitive.Root',
      purpose: 'Required accessible name for icon-only toggles with no visible text.',
    },
  ],
  a11yNotes: [
    'Disabled toggles get disabled:pointer-events-none disabled:opacity-50 and are removed from the tab order by the native button disabled attribute.',
    'A visible focus ring (focus-visible:ring-2 ring-ring) appears on keyboard focus regardless of variant.',
    'The press-scale animation is skipped under prefers-reduced-motion via motion-reduce:transition-none.',
  ],
  dependencies: ['@radix-ui/react-toggle'],
  sourceFiles: [
    'packages/ui/src/components/foundation/toggle/toggle.tsx',
    'packages/ui/src/components/foundation/toggle/toggle-group.tsx',
    'packages/ui/src/components/foundation/toggle/index.ts',
  ],
};
