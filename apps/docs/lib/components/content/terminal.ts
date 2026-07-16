import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Terminal, TerminalLine } from '@/components/animated/terminal';

export function Example() {
  return (
    <Terminal title="~/project">
      <TerminalLine variant="command" delay={0}>
        bun add @varient/ui
      </TerminalLine>
      <TerminalLine variant="output" delay={1.8}>
        installed 3 packages in 412ms
      </TerminalLine>
      <TerminalLine variant="success" delay={3}>
        Ready on http://localhost:3000
      </TerminalLine>
    </Terminal>
  );
}`,
  props: [
    {
      title: 'Terminal',
      rows: [
        { name: 'title', type: 'string', defaultValue: 'Terminal', description: 'Title shown in the window chrome.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn().' },
        { name: 'children', type: 'ReactNode', description: 'Compose with `TerminalLine` children.' },
      ],
    },
    {
      title: 'TerminalLine',
      rows: [
        { name: 'delay', type: 'number', defaultValue: '0', description: 'Seconds before this line starts appearing.' },
        { name: 'variant', type: "'command' | 'output' | 'success' | 'error'", defaultValue: 'output', description: 'Line style — command shows a brand `$` prompt and types character-by-character; success/error add inline status glyphs via semantic tokens.' },
        { name: 'children', type: 'ReactNode', description: 'Required — line content. Strings type character-by-character for the `command` variant.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn().' },
      ],
    },
  ],
  features: [
    'Composable window mockup — `Terminal` provides traffic-light chrome and a titled header bar; `TerminalLine` children stagger in by their own `delay` in seconds.',
    'The chrome wraps its own `dark`-classed subtree using semantic tokens (`bg-background`/`text-foreground`/`border-border`/`bg-muted`), so it always renders as a dark terminal regardless of the site\'s active light/dark theme.',
    'Command-variant lines type character-by-character with a blinking `|` cursor; the cursor animation unmounts as soon as typing finishes, so it never runs longer than the line itself.',
    'Success and error lines render an inline check/x glyph via inline SVG next to the text, colored with `text-success` / `text-destructive`.',
    'Lines only start appearing once the `Terminal` scrolls into view (`useInView`, `once: true`) — offscreen terminals stay idle rather than typing out unseen.',
    'Under `prefers-reduced-motion`, every line renders instantly with full text and no typing cursor or entrance stagger.',
  ],
  aria: [
    { attribute: 'aria-live="polite"', element: 'Terminal content area', purpose: 'Announces newly appended lines without interrupting the user; omitted entirely under reduced motion since content is already fully rendered.' },
    { attribute: 'aria-relevant="additions"', element: 'Terminal content area', purpose: 'Limits live-region announcements to newly added lines, not the whole subtree.' },
    { attribute: 'aria-hidden="true"', element: 'Traffic lights, window glyph, `$` prompt, status glyphs, blinking cursor', purpose: 'Marks purely decorative chrome so screen readers only announce line text.' },
  ],
  a11yNotes: [
    'All `setTimeout` timers (line start delay, character typing) are cleared on unmount and re-scheduled on prop change via `useEffect` cleanup.',
    'Under `prefers-reduced-motion`, `Terminal` renders children immediately (no `isInView` gate needed) and `TerminalLine` skips straight to full text with no cursor — no motion of any kind plays.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/terminal/terminal.tsx',
    'packages/ui/src/components/animated/terminal/index.ts',
  ],
};
