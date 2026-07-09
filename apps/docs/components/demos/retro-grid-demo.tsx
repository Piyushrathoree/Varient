'use client';

import { RetroGrid } from '@varient/ui';
import { ArrowUpRight } from 'lucide-react';

export function RetroGridDemo() {
  return (
    <div className="flex w-full flex-col gap-4 py-4">
      <p className="text-center text-sm font-medium text-muted-foreground">
        Perspective grid lines scroll toward the viewer — content sits in the overlay slot.
      </p>

      <RetroGrid
        isBrandTinted
        className="min-h-[320px] rounded-xl border border-border"
        speed={16}
      >
        <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 p-8 text-center">
          <span className="inline-flex items-center rounded-full border border-border bg-card/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
            Background layer
          </span>
          <h3 className="text-2xl font-semibold tracking-tight text-foreground">
            Retro grid backdrop
          </h3>
          <p className="max-w-sm text-sm text-muted-foreground">
            Mount heroes, CTAs, or dashboards above the scrolling plane. Toggle{' '}
            <code className="text-foreground">isBrandTinted</code> for a faint ember wash.
          </p>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Explore components
            <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </RetroGrid>
    </div>
  );
}

export function RetroGridPreviewCompact() {
  return (
    <RetroGrid className="h-28 w-full rounded-lg border border-border" cellSize={32} speed={20}>
      <div className="flex h-full items-center justify-center px-2">
        <p className="text-xs font-medium text-foreground">Overlay</p>
      </div>
    </RetroGrid>
  );
}
