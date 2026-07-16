import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { FlipWords } from '@/components/animated/flip-words';

export function Example() {
  return (
    <h1 className="text-3xl font-semibold text-foreground">
      Ship with <FlipWords words={['React', 'Motion', 'Tailwind']} />
    </h1>
  );
}`,
  props: [
    {
      title: 'FlipWords',
      rows: [
        {
          name: 'words',
          type: 'string[]',
          description: 'Required — words rotated with a 3D flip transition, one at a time.',
        },
        {
          name: 'duration',
          type: 'number',
          defaultValue: '2500',
          description: 'Milliseconds between word flips.',
        },
        {
          name: 'className',
          type: 'string',
          description:
            'Additional Tailwind classes merged via cn(). Defaults include `text-brand` and perspective.',
        },
      ],
    },
  ],
  features: [
    'Cycles through a word list with a perspective rotateX flip using AnimatePresence.',
    'Swaps words on a setInterval driven by the `duration` prop.',
    'Under `prefers-reduced-motion`, words still rotate on the same interval but swap with an opacity-only crossfade and no 3D transform.',
    'Only `transform` and `opacity` animate in the default motion path.',
    'Live region announces each word change without duplicating content in a hidden element.',
  ],
  aria: [
    {
      attribute: 'aria-live="polite"',
      element: 'span (wrapper)',
      purpose: 'Announces each word change without interrupting the user.',
    },
    {
      attribute: 'aria-atomic="true"',
      element: 'span (wrapper)',
      purpose: 'Ensures the whole current word is announced, not just the diff.',
    },
  ],
  a11yNotes: [
    'The visible word is the meaningful live content — a static sr-only duplicate of the word list is intentionally avoided in favor of the polite live region.',
    'When `prefers-reduced-motion` is set, the 3D rotateX transform is dropped and words crossfade via opacity only.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/flip-words/flip-words.tsx',
    'packages/ui/src/components/animated/flip-words/index.ts',
  ],
};
