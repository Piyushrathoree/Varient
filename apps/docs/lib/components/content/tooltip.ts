import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Tooltip } from '@varient/ui'

<Tooltip content="Save changes" side="top">
  <button>Save</button>
</Tooltip>`,
  props: [
    {
      title: 'Tooltip',
      rows: [
        { name: 'content', type: 'ReactNode', description: 'Required — content rendered inside the tooltip bubble.' },
        { name: 'children', type: 'ReactElement', description: 'Required — the trigger element, merged via asChild.' },
        { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", defaultValue: "'top'", description: 'Which side of the trigger the tooltip opens on.' },
        { name: 'align', type: "'start' | 'center' | 'end'", defaultValue: "'center'", description: 'Alignment along the chosen side.' },
        { name: 'sideOffset', type: 'number', defaultValue: '8', description: 'Pixel gap between the trigger and the tooltip.' },
        { name: 'delayDuration', type: 'number', defaultValue: '200', description: 'Hover/focus delay in ms before the tooltip opens.' },
        { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Prevents the tooltip from ever opening.' },
        { name: 'color', type: "'default' | 'brand' | 'success' | 'warning' | 'destructive' | 'surface'", defaultValue: "'default'", description: 'Bubble color, mapped to semantic tokens. The arrow always matches.' },
        { name: 'variant', type: "'scale' | 'slide' | 'fade'", defaultValue: "'scale'", description: 'Entrance animation style.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged onto the tooltip bubble via cn().' },
      ],
    },
    {
      title: 'Tooltip.Provider',
      rows: [
        { name: 'delayDuration', type: 'number', defaultValue: '200', description: 'Shared default for every Tooltip nested beneath one Provider.' },
        { name: 'skipDelayDuration', type: 'number', defaultValue: '300', description: 'Grace period for moving between adjacent tooltips without re-incurring the delay.' },
      ],
    },
  ],
  features: [
    'Single-component API — one `content` prop, not a compound Trigger/Content pair like Popover or Dialog',
    'Six semantic colors (default, brand, success, warning, destructive, surface) with a matching arrow',
    'Three entrance variants — scale, slide, fade — each resolved to concrete motion values per side',
    'Optional `Tooltip.Provider` shares delayDuration/skipDelayDuration across a toolbar of tooltips; every Tooltip still works standalone',
    'Opens on hover and keyboard focus, closes on blur/pointer-leave/Esc, and can be fully disabled via `isDisabled`',
  ],
  keyboard: [
    { keys: 'Tab / Shift+Tab', description: 'Moves focus to/from the trigger, opening or closing the tooltip.' },
    { keys: 'Esc', description: 'Dismisses an open tooltip.' },
  ],
  aria: [
    { attribute: 'aria-describedby', element: 'Trigger', purpose: "Wired automatically by Radix, pointing to the tooltip's content." },
    { attribute: 'role="tooltip"', element: 'Tooltip content', purpose: 'Identifies the bubble as a tooltip for assistive tech.' },
  ],
  a11yNotes: [
    'Icon-only triggers need their own `aria-label` — a tooltip description does not substitute for an accessible name.',
    'All motion is gated behind `useReducedMotion()`; reduced-motion users get an instant cross-fade regardless of `variant`.',
  ],
  dependencies: ['@radix-ui/react-tooltip'],
  sourceFiles: [
    'packages/ui/src/components/foundation/tooltip/tooltip.tsx',
    'packages/ui/src/components/foundation/tooltip/index.ts',
  ],
};
