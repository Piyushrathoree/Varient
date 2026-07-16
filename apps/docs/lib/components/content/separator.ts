import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Separator } from '@varient/ui'\n\n<Separator label="or continue with" />`,
  props: [
    {
      title: 'Separator',
      rows: [
        {
          name: 'orientation',
          type: "'horizontal' | 'vertical'",
          defaultValue: "'horizontal'",
          description: 'Divider direction.',
        },
        {
          name: 'label',
          type: 'string',
          description: 'Centered text with hairlines on both sides — horizontal only.',
        },
        {
          name: 'decorative',
          type: 'boolean',
          defaultValue: 'true',
          description: 'When true, the separator is purely visual and hidden from assistive tech.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn().',
        },
      ],
    },
  ],
  features: [
    'Horizontal and vertical orientations built on @radix-ui/react-separator.',
    'Optional centered label that splits the divider into two flex-1 hairlines.',
    'Decorative by default (no role) — set decorative={false} to expose role="separator" for structural dividers.',
    'Single-pixel hairline uses the semantic border token, no raw hex.',
  ],
  aria: [
    {
      attribute: 'role="separator"',
      element: 'Separator root',
      purpose: 'Announced only when decorative={false}; omitted for purely visual dividers.',
    },
    {
      attribute: 'role="none"',
      element: 'Labelled wrapper div',
      purpose: 'Keeps the label + two hairlines from being read as a landmark; content stays in normal reading order.',
    },
  ],
  a11yNotes: [
    'Defaults to decorative={true}; set decorative={false} when the separator conveys meaningful document structure.',
    'The label is plain text content, not an accessible name for the separator — it reads normally with surrounding content.',
  ],
  sourceFiles: [
    'packages/ui/src/components/foundation/separator/separator.tsx',
    'packages/ui/src/components/foundation/separator/index.ts',
  ],
};
