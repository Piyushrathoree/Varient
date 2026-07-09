'use client';

import { HeroHighlight, Highlight, buttonVariants } from '@varient/ui';

export function HeroHighlightDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      <p className="text-sm font-medium text-muted-foreground">
        Dot-grid backdrop brightens around the cursor — pair with Highlight for text sweeps.
      </p>

      <HeroHighlight className="w-full max-w-2xl rounded-xl border border-border px-6 py-16">
        <div className="mx-auto flex max-w-lg flex-col items-center gap-4 text-center">
          <h3 className="font-title text-3xl font-semibold tracking-tight text-foreground">
            Ship interfaces with{' '}
            <Highlight>confidence</Highlight>
          </h3>
          <p className="text-sm text-muted-foreground">
            Move your pointer across the grid — dots glow near the cursor.
          </p>
          <button type="button" className={buttonVariants({ variant: 'primary', size: 'md' })}>
            Browse components
          </button>
        </div>
      </HeroHighlight>

      <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-4">
          <HeroHighlight dotSpacing={14} spotlightSize={140} className="h-40 w-full rounded-lg border border-border p-4">
            <p className="text-sm text-foreground">
              Tight grid with <Highlight>highlight</Highlight> text.
            </p>
          </HeroHighlight>
          <span className="text-xs font-medium text-muted-foreground">Dense dots</span>
        </div>

        <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-4">
          <HeroHighlight dotSpacing={28} spotlightSize={220} className="h-40 w-full rounded-lg border border-border p-4">
            <p className="text-sm text-foreground">
              Wide spacing, larger <Highlight color="color-mix(in oklab, var(--color-brand-light) 30%, transparent)">reveal</Highlight>.
            </p>
          </HeroHighlight>
          <span className="text-xs font-medium text-muted-foreground">Sparse dots</span>
        </div>
      </div>
    </div>
  );
}

export function HeroHighlightPreviewCompact() {
  return (
    <HeroHighlight className="h-28 w-full max-w-[12rem] rounded-lg border border-border p-3">
      <p className="text-center text-xs text-foreground">
        <Highlight>Hero</Highlight> highlight
      </p>
    </HeroHighlight>
  );
}
