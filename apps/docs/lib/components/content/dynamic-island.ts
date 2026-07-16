import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { useState } from 'react'\nimport { DynamicIsland } from '@varient/ui'\n\nconst [state, setState] = useState('idle')\n\n<DynamicIsland\n  state={state}\n  views={{\n    idle: <span className="px-1 text-xs text-foreground/70">Idle</span>,\n    timer: <span className="px-1 font-mono text-sm text-foreground">12:45</span>,\n  }}\n/>`,
  props: [
    {
      title: 'DynamicIsland',
      rows: [
        {
          name: 'state',
          type: 'string',
          description: 'Required — key into `views` selecting the currently displayed content. Fully controlled, no internal state.',
        },
        {
          name: 'views',
          type: 'Record<string, ReactNode>',
          description: 'Required — map of state key to the content rendered while that state is active.',
        },
        {
          name: 'onStateChange',
          type: '(state: string) => void',
          description: 'Fires whenever the active state changes, including once on mount.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged onto the outer wrapper via cn().',
        },
      ],
    },
  ],
  features: [
    'The pill auto-sizes to the active view via a `layout` FLIP spring (width and height both animate), so switching views morphs the pill\'s footprint instead of jump-cutting.',
    'Content crossfades with `AnimatePresence mode="popLayout"` — the exiting view is taken out of flow immediately so it never fights the entering view for the container\'s measured size.',
    'The inner surface renders inside a `.dark`-classed subtree, so the island reads as a dark pill in both light and dark host themes (semantic tokens resolve against the dark palette only inside that subtree).',
    'Fully controlled — `state` selects `views[state]`; there is no internal state, so the consumer\'s app (a timer, a call, a notification) drives it directly.',
    'Fully respects `prefers-reduced-motion` — the resize and crossfade both become instant swaps with no spring or scale/opacity transition.',
  ],
  aria: [
    {
      attribute: 'role="status"',
      element: 'inner pill surface',
      purpose: 'Marks the pill as a live status region so its content is discoverable by assistive tech.',
    },
    {
      attribute: 'aria-live="polite"',
      element: 'inner pill surface',
      purpose: 'Announces content changes when the active view swaps, without interrupting the user.',
    },
  ],
  a11yNotes: [
    'Interactive elements placed inside a view (buttons, links) keep their own semantics — DynamicIsland never wraps view content in anything that hides it from the accessibility tree.',
    'The component renders `views[state]`; an unmatched `state` key resolves to `null` (an empty pill) rather than throwing.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/dynamic-island/dynamic-island.tsx',
    'packages/ui/src/components/animated/dynamic-island/index.ts',
  ],
};
