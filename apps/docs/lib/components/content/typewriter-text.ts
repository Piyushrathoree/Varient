import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { TypewriterText } from '@varient/ui'

<h1 className="text-3xl font-semibold text-foreground">
  Built for{' '}
  <TypewriterText
    text={['designers', 'developers', 'teams']}
    className="text-brand"
  />
</h1>`,
  props: [
    {
      title: 'TypewriterText',
      rows: [
        { name: 'text', type: 'string | string[]', description: 'Required — plain text or phrases to cycle (type → pause → delete → next).' },
        { name: 'typeSpeed', type: 'number', defaultValue: '60', description: 'Milliseconds per character while typing.' },
        { name: 'deleteSpeed', type: 'number', defaultValue: '35', description: 'Milliseconds per character while deleting.' },
        { name: 'pauseDuration', type: 'number', defaultValue: '1800', description: 'Milliseconds to pause after a phrase is fully typed.' },
        { name: 'showCursor', type: 'boolean', defaultValue: 'true', description: 'Whether to show a blinking cursor pipe after the text.' },
        { name: 'isLooping', type: 'boolean', defaultValue: 'true', description: 'When `text` is an array, loop through phrases after the last one. The final phrase stays on screen when false.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn().' },
      ],
    },
  ],
  features: [
    'Single string or array of phrases — arrays cycle type → pause → delete → next',
    'Blinking cursor is optional via `showCursor` (default true)',
    '`isLooping={false}` stops on the final phrase instead of restarting',
    'Typing/deleting timers and the cursor blink pause automatically while the component is scrolled offscreen',
    'Respects `prefers-reduced-motion`: the first phrase renders instantly with no typing, deleting, or cursor animation',
  ],
  a11yNotes: [
    'The animating span (typed characters and cursor) is `aria-hidden` — a rapidly updating string should not be narrated character by character.',
    'The wrapper exposes the full intended message via `aria-label` (all phrases joined with a comma when `text` is an array).',
    'Timeouts are cleared on unmount and while offscreen, so cycling never leaks timers.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/typewriter-text/typewriter-text.tsx',
    'packages/ui/src/components/animated/typewriter-text/index.ts',
  ],
};
