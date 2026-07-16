import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { MorphingText } from '@/components/animated/morphing-text';

export function Example() {
  return (
    <h1 className="text-3xl font-semibold text-foreground">
      Build something{' '}
      <MorphingText words={['beautiful', 'accessible', 'delightful']} />
    </h1>
  );
}`,
  props: [
    {
      title: 'MorphingText',
      rows: [
        { name: 'words', type: 'string[]', description: 'Required — words cycled with a blur-crossfade morph.' },
        { name: 'interval', type: 'number', defaultValue: '2500', description: 'Milliseconds between word swaps.' },
        { name: 'isPaused', type: 'boolean', defaultValue: 'false', description: 'When true, cycling pauses on the current word.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn(). Defaults include `text-brand`.' },
      ],
    },
  ],
  features: [
    'Cycles through a list of words with a blur-crossfade morph (opacity, filter blur, and slight vertical shift) instead of a slide transition.',
    'Interval-driven — configurable swap timing via `interval` (ms).',
    'Controlled pause via `isPaused`, e.g. to freeze on hover or a user toggle.',
    'Under `prefers-reduced-motion`, the cycling timer itself is paused — the component settles on the first word instead of continuing to swap.',
    'Announces each word change via `aria-live="polite"` and `aria-atomic="true"` without interrupting the user.',
  ],
  aria: [
    { attribute: 'aria-live="polite"', element: 'outer span', purpose: 'Announces each word change to assistive tech without stealing focus.' },
    { attribute: 'aria-atomic="true"', element: 'outer span', purpose: 'Ensures the full current word is announced, not just the changed fragment.' },
  ],
  a11yNotes: [
    'The cycling `setInterval` timer is fully paused under `prefers-reduced-motion`, not just the crossfade animation — the word stays static rather than continuing to swap.',
    'Distinct from `WordRotate`, which slides vertically rather than morphing with blur.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/morphing-text/morphing-text.tsx',
    'packages/ui/src/components/animated/morphing-text/index.ts',
  ],
};
