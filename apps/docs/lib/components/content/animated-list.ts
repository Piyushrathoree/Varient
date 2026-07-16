import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { AnimatedList, AnimatedListItem } from '@varient/ui'

<AnimatedList interval={2500}>
  <AnimatedListItem>
    <p className="text-sm font-medium">Deployment ready</p>
  </AnimatedListItem>
  <AnimatedListItem>
    <p className="text-sm font-medium">New comment on PR</p>
  </AnimatedListItem>
</AnimatedList>`,
  props: [
    {
      title: 'AnimatedList',
      rows: [
        {
          name: 'interval',
          type: 'number',
          defaultValue: '2500',
          description: 'Milliseconds between each new item entering at the top.',
        },
        {
          name: 'isPaused',
          type: 'boolean',
          defaultValue: 'false',
          description: 'When true, cycling pauses after the first item.',
        },
        {
          name: 'maxVisible',
          type: 'number',
          defaultValue: '5',
          description: 'Maximum stacked items before older entries are removed.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Layout classes on the list container.',
        },
        {
          name: 'children',
          type: 'ReactNode',
          description: 'AnimatedListItem instances to cycle through.',
        },
      ],
    },
    {
      title: 'AnimatedListItem',
      rows: [
        {
          name: 'className',
          type: 'string',
          description: 'Surface and layout overrides on the row card.',
        },
        {
          name: 'children',
          type: 'ReactNode',
          description: 'Row content — fully composable.',
        },
      ],
    },
  ],
  features: [
    'Cycles AnimatedListItem children on an interval, springing the newest entry in at the top while older entries fade and shift down.',
    'Stacks up to maxVisible items and drops the oldest once the cap is reached.',
    'isPaused freezes the cycle after the first item mounts — useful for hover-to-pause or manual control.',
    'The interval automatically pauses while the list is scrolled offscreen and resumes on re-entry, so idle instances stop burning CPU.',
    'Under prefers-reduced-motion, all children render statically in document order with no cycling animation.',
    'Item detection uses an internal marker (not displayName string-matching), so wrapping AnimatedListItem in memo/HOCs does not break collection.',
  ],
  aria: [
    {
      attribute: 'aria-live="polite"',
      element: 'AnimatedList container',
      purpose: 'Announces newly cycled-in items without interrupting the screen reader.',
    },
    {
      attribute: 'aria-relevant="additions"',
      element: 'AnimatedList container',
      purpose: 'Limits live-region announcements to added nodes, not removals/reorders.',
    },
  ],
  a11yNotes: [
    'A visually hidden summary ("Showing item N of M") tracks cycle position for assistive tech.',
    'Reduced-motion users get a fully static, non-animated list rendered in source order.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/animated-list/animated-list.tsx',
    'packages/ui/src/components/animated/animated-list/index.ts',
  ],
};
