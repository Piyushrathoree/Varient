'use client';

import { BackgroundBeams, buttonVariants } from '@varient/ui';

export function BackgroundBeamsDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      <p className="text-sm font-medium text-muted-foreground">
        Thin curved SVG paths with ember gradient strokes — layer headlines on top.
      </p>

      <BackgroundBeams className="w-full max-w-2xl rounded-xl border border-border">
        <div className="flex min-h-64 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
          <h3 className="font-title text-2xl font-semibold tracking-tight text-foreground">
            Background beams
          </h3>
          <p className="max-w-sm text-sm text-muted-foreground">
            Animated gradient strokes travel along faint curved paths.
          </p>
          <button type="button" className={buttonVariants({ variant: 'primary', size: 'md' })}>
            Get started
          </button>
        </div>
      </BackgroundBeams>

      <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-4">
          <BackgroundBeams pathCount={4} className="h-40 w-full rounded-lg border border-border">
            <div className="flex h-full items-center justify-center">
              <span className="text-sm font-medium text-foreground">4 paths</span>
            </div>
          </BackgroundBeams>
          <span className="text-xs font-medium text-muted-foreground">pathCount=4</span>
        </div>

        <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-4">
          <BackgroundBeams
            pathCount={8}
            accentColor="var(--color-brand-light)"
            className="h-40 w-full rounded-lg border border-border"
          >
            <div className="flex h-full items-center justify-center">
              <span className="text-sm font-medium text-foreground">Custom accent</span>
            </div>
          </BackgroundBeams>
          <span className="text-xs font-medium text-muted-foreground">accentColor override</span>
        </div>
      </div>
    </div>
  );
}

export function BackgroundBeamsPreviewCompact() {
  return (
    <BackgroundBeams pathCount={4} className="h-28 w-full max-w-[12rem] rounded-lg border border-border">
      <div className="flex h-full items-center justify-center">
        <span className="text-xs font-medium text-foreground">Beams</span>
      </div>
    </BackgroundBeams>
  );
}
