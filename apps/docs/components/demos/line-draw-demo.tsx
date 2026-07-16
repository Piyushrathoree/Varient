'use client';

import { LineDraw } from '@varient/ui';

export function LineDrawDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-10 py-8">
      <p className="max-w-md text-center text-sm font-medium text-muted-foreground">
        Scroll each card into view — paths draw via stroke pathLength. Presets ship
        ready to paste; pass a custom `path` or SVG children for full control.
      </p>

      <div className="flex w-full max-w-4xl flex-col gap-8">
        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Presets
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
              <LineDraw preset="underline" className="h-6 w-full" duration={1.4} />
              <span className="text-xs font-medium text-muted-foreground">Underline</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
              <LineDraw preset="scribble" className="size-20" duration={1.8} strokeWidth={1.5} />
              <span className="text-xs font-medium text-muted-foreground">Scribble</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
              <LineDraw preset="arrow" className="h-12 w-full" duration={1} strokeWidth={2.5} />
              <span className="text-xs font-medium text-muted-foreground">Arrow</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Behavior &amp; styling
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
              <LineDraw
                preset="arrow"
                className="h-12 w-full"
                duration={1}
                isLooping
                strokeWidth={2.5}
              />
              <span className="text-xs font-medium text-muted-foreground">Looping</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
              <LineDraw
                path="M 4 30 Q 30 4, 60 30 T 116 30"
                viewBox="0 0 120 60"
                className="h-12 w-full"
                duration={1.2}
                strokeWidth={2}
              />
              <span className="text-xs font-medium text-muted-foreground">Custom path</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
              <LineDraw
                preset="underline"
                className="h-6 w-full"
                duration={1.4}
                strokeWidth={2.5}
                stroke="var(--color-brand)"
              />
              <span className="text-xs font-medium text-muted-foreground">Brand stroke</span>
            </div>
          </div>
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
