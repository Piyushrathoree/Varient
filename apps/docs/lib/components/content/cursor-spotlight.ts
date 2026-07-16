import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { CursorSpotlight } from '@varient/ui';

export function Example() {
  return (
    <CursorSpotlight className="h-56 rounded-xl border border-border bg-background">
      <div className="grid grid-cols-3 gap-2 p-4">
        {['Motion', 'Tokens', 'Radix'].map((word) => (
          <span key={word} className="rounded-lg border border-border bg-card px-3 py-2 text-sm">
            {word}
          </span>
        ))}
      </div>
    </CursorSpotlight>
  );
}`,
  props: [
    {
      title: 'CursorSpotlight',
      rows: [
        {
          name: 'children',
          type: 'ReactNode',
          description: 'Content revealed under the cursor spotlight.',
        },
        {
          name: 'size',
          type: 'number',
          defaultValue: '200',
          description: 'Spotlight radius in pixels.',
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
    'Children render exactly once, at full brightness and fully interactive — no duplicate content and no aria-hidden/pointer-events-none applied to real content.',
    'A decorative scrim overlay dims and desaturates the surrounding area via backdrop-brightness/backdrop-saturate, punched through by a circular hole that follows the pointer using a radial CSS mask.',
    'The mask hole radius animates from 0 (fully dimmed, idle) up to `size` on a spring, so the reveal grows in smoothly instead of popping to full size on first pointer move.',
    'Requires a fine, hover-capable pointer (checked via useFinePointer) — touch devices render children plainly with no scrim.',
    'Respects prefers-reduced-motion — renders children at full brightness with no mask and no pointer listeners attached.',
  ],
  aria: [
    {
      attribute: 'aria-hidden="true"',
      element: 'scrim overlay',
      purpose: 'The dim/reveal layer is purely decorative and never duplicates or intercepts the real content.',
    },
    {
      attribute: 'pointer-events-none',
      element: 'scrim overlay',
      purpose: 'Keeps children fully interactive and keyboard-reachable underneath the overlay.',
    },
  ],
  a11yNotes: [
    'Content is never rendered only inside an aria-hidden wrapper — children mount once, unmodified, and are always in the tab order.',
    'Under prefers-reduced-motion, the scrim and pointer-tracking listeners are skipped entirely; children render at full brightness.',
    'On touch/coarse-pointer devices there is no cursor to drive the reveal, so no scrim is rendered — content stays fully legible.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/cursor-spotlight/cursor-spotlight.tsx',
    'packages/ui/src/components/animated/cursor-spotlight/index.ts',
  ],
};
