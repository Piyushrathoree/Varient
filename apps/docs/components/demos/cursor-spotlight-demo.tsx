'use client';

import { CursorSpotlight } from '@varient/ui';

const KEYWORDS = [
  'Motion',
  'Tokens',
  'Radix',
  'Spring',
  'Copy-paste',
  'Accessible',
  'Dark mode',
  'Framer',
  'Components',
  'Varient',
  'Animated',
  'Foundation',
] as const;

function KeywordGrid() {
  return (
    <div className="grid grid-cols-3 gap-3 p-6 sm:grid-cols-4">
      {KEYWORDS.map((word) => (
        <button
          key={word}
          type="button"
          onClick={() => {}}
          className="rounded-lg border border-border bg-card px-3 py-2 text-center text-sm font-medium text-foreground transition-colors hover:border-brand/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {word}
        </button>
      ))}
    </div>
  );
}

export function CursorSpotlightDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-6 py-6">
      <p className="max-w-md text-center text-sm font-medium text-muted-foreground">
        Move your cursor over the card — a circular mask reveals full-brightness
        content beneath a dimmed layer. Every keyword is a real, tabbable
        button — try navigating with Tab.
      </p>

      <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-3">
          <CursorSpotlight className="h-56 rounded-xl border border-border bg-background">
            <KeywordGrid />
          </CursorSpotlight>
          <span className="text-center text-xs font-medium text-muted-foreground">
            Default radius (200px)
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <CursorSpotlight size={120} className="h-56 rounded-xl border border-border bg-background">
            <KeywordGrid />
          </CursorSpotlight>
          <span className="text-center text-xs font-medium text-muted-foreground">
            Tight spotlight (120px)
          </span>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Hint: content outside the cursor circle stays dimmed and desaturated.
      </p>
    </div>
  );
}

export function CursorSpotlightPreviewCompact() {
  return (
    <CursorSpotlight size={72} className="h-28 w-full rounded-lg border border-border bg-background">
      <div className="flex h-full flex-wrap items-center justify-center gap-2 p-3">
        {['Reveal', 'Mask', 'Glow'].map((word) => (
          <span
            key={word}
            className="rounded-md border border-border bg-card px-2 py-1 text-xs font-medium text-foreground"
          >
            {word}
          </span>
        ))}
      </div>
    </CursorSpotlight>
  );
}
