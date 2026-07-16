import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Kbd, KbdGroup } from '@varient/ui'\n\n<p className="text-sm text-muted-foreground">\n  Press <KbdGroup keys={['⌘', 'K']} size="sm" /> to search.\n</p>`,
  props: [
    {
      title: 'Kbd',
      rows: [
        { name: 'size', type: "'sm' | 'md'", defaultValue: "'md'", description: 'Height and font size preset.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn().' },
      ],
    },
    {
      title: 'KbdGroup',
      rows: [
        { name: 'keys', type: 'ReactNode[]', description: 'Array of key labels — rendered with + separators between them.' },
        { name: 'size', type: "'sm' | 'md'", defaultValue: "'md'", description: 'Height and font size preset applied to each Kbd.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn().' },
      ],
    },
  ],
  features: [
    'Semantic `<kbd>` element with mono font and a subtle bottom-edge shadow for depth.',
    'KbdGroup renders a sequence of keys joined by aria-hidden `+` separators.',
    'Two size presets (`sm` / `md`) shared between Kbd and KbdGroup.',
    'Both components forward refs to their root DOM node.',
    'Static, non-interactive — no client-side hooks required.',
  ],
  aria: [
    { attribute: 'role="group"', element: 'KbdGroup wrapper', purpose: 'Groups a modifier combo as one semantic unit for assistive tech.' },
    { attribute: 'aria-hidden', element: '+ separator', purpose: 'Hides decorative separators between keys from screen readers.' },
  ],
  a11yNotes: [
    'Renders semantic `<kbd>` elements for individual keys.',
    'Use alongside visible instructions — shortcuts alone are not sufficient context for all users.',
  ],
  sourceFiles: [
    'packages/ui/src/components/foundation/kbd/kbd.tsx',
    'packages/ui/src/components/foundation/kbd/index.ts',
  ],
};
