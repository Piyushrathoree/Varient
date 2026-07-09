'use client';

import { LineDraw } from '@varient/ui';

export function LineDrawDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-10 py-8">
      <p className="max-w-md text-center text-sm font-medium text-muted-foreground">
        Scroll each row into view — paths draw via stroke pathLength. Presets ship
        ready to paste; pass custom `path` or SVG children for full control.
      </p>

      <div className="flex w-full max-w-lg flex-col gap-8">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Underline squiggle
          </p>
          <LineDraw preset="underline" className="h-6 w-full" duration={1.4} />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Circle scribble
          </p>
          <LineDraw preset="scribble" className="mx-auto size-28" duration={1.8} strokeWidth={1.5} />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Arrow (looping)
          </p>
          <LineDraw
            preset="arrow"
            className="h-14 w-full max-w-xs"
            duration={1}
            isLooping
            strokeWidth={2.5}
          />
        </div>
      </div>
    </div>
  );
}

export function LineDrawPreviewCompact() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 py-2">
      <LineDraw preset="underline" className="h-4 w-40" duration={1} delay={0.1} />
      <LineDraw preset="arrow" className="h-8 w-32" duration={0.9} strokeWidth={2} stroke="var(--color-brand)" />
    </div>
  );
}
