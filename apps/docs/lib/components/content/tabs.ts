import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Tabs } from '@varient/ui'

<Tabs defaultValue="overview">
  <Tabs.List>
    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
    <Tabs.Trigger value="usage">Usage</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="overview">Overview panel.</Tabs.Content>
  <Tabs.Content value="usage">Usage panel.</Tabs.Content>
</Tabs>`,
  props: [
    {
      title: 'Tabs',
      rows: [
        { name: 'value', type: 'string', description: 'Controlled active tab value — pass with onValueChange.' },
        { name: 'defaultValue', type: 'string', description: 'Initial active tab for uncontrolled usage.' },
        { name: 'onValueChange', type: '(value: string) => void', description: 'Called when the active tab changes.' },
        { name: 'variant', type: "'underline' | 'pills' | 'segmented'", defaultValue: "'underline'", description: 'Visual style shared by List and Trigger.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn().' },
      ],
    },
    {
      title: 'Tabs.List / Tabs.Trigger / Tabs.Content',
      rows: [
        { name: 'Tabs.List', type: 'HTMLAttributes<HTMLDivElement>', description: 'Tab strip. Renders role="tablist" and owns arrow-key navigation — no props of its own.' },
        { name: 'Tabs.Trigger value', type: 'string', description: 'Required — the tab value this trigger activates.' },
        { name: 'Tabs.Content value', type: 'string', description: 'Required — renders this panel only when it matches the active value; unmounts when not selected.' },
      ],
    },
  ],
  features: [
    'Three variants — underline, pills, segmented — sharing one sliding-indicator mechanic driven by a shared layoutId.',
    'Controlled or uncontrolled: pass value + onValueChange, or defaultValue for internal state.',
    'Roving-tabindex arrow-key navigation (Arrow Right/Left, Home, End) with automatic activation per WAI-ARIA APG.',
    'Indicator animates with SPRING_DEFAULT and collapses to an instant snap under prefers-reduced-motion.',
    'Active panel fades and slides up on mount (SPRING_SNAPPY, reduced-motion gated); inactive panels unmount completely rather than being hidden.',
  ],
  keyboard: [
    { keys: 'Arrow Right / Arrow Left', description: 'Move focus to the next/previous tab and activate it immediately.' },
    { keys: 'Home / End', description: 'Move focus to the first/last tab and activate it.' },
    { keys: 'Tab', description: 'Moves focus into the tab strip (only the active tab is in the tab order) and out to the active panel.' },
  ],
  aria: [
    { attribute: 'role="tablist"', element: 'Tabs.List', purpose: 'Identifies the tab strip container; carries aria-orientation="horizontal".' },
    { attribute: 'role="tab" / aria-selected / aria-controls', element: 'Tabs.Trigger', purpose: 'Marks each trigger as a tab, its selected state, and the panel it controls.' },
    { attribute: 'role="tabpanel" / aria-labelledby', element: 'Tabs.Content', purpose: 'Marks the panel and links it back to its controlling trigger.' },
  ],
  a11yNotes: [
    'Roving tabIndex — the active trigger is tabIndex={0}, all others are -1, so Tab moves focus in and out of the strip in one step per direction.',
    'Inactive Tabs.Content panels return null and unmount completely — local state in an unselected panel is lost when its tab is not active.',
  ],
  sourceFiles: [
    'packages/ui/src/components/foundation/tabs/tabs.tsx',
    'packages/ui/src/components/foundation/tabs/index.ts',
  ],
};
