import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { WordRotate } from '@/components/animated/word-rotate';

export function Example() {
  return (
    <h1 className="text-3xl font-semibold text-foreground">
      Build something <WordRotate words={['beautiful', 'delightful', 'accessible']} />
    </h1>
  );
}`,
  props: [
    {
      title: 'WordRotate',
      rows: [
        { name: 'words', type: 'string[]', description: 'Required — words cycled in place, one at a time.' },
        { name: 'duration', type: 'number', defaultValue: '2500', description: 'Milliseconds between word swaps.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn(). Defaults include `text-brand`.' },
      ],
    },
  ],
  features: [
    'Cycles through a words[] list in place with a rise-and-fade (opacity + y) transition',
    'Only transform and opacity animate, keeping the swap GPU-friendly',
    'aria-live="polite" + aria-atomic="true" so each word change is announced without interrupting the user',
    'Under prefers-reduced-motion the cycling interval pauses entirely and the current word renders with no transform animation',
  ],
  aria: [
    { attribute: 'aria-live="polite"', element: 'span (wrapper)', purpose: 'Announces each word change to assistive tech without interrupting the user.' },
    { attribute: 'aria-atomic="true"', element: 'span (wrapper)', purpose: 'Ensures the full current word is announced, not just the changed characters.' },
  ],
  a11yNotes: [
    'When prefers-reduced-motion is set, the setInterval cycle is paused (not just the transition), so the word stays static for users who requested no motion.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/word-rotate/word-rotate.tsx',
    'packages/ui/src/components/animated/word-rotate/index.ts',
  ],
};
