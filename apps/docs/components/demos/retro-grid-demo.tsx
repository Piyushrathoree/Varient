'use client';

import { RetroGrid } from '@varient/ui';
import { ArrowUpRight } from 'lucide-react';

export function RetroGridDemo() {
  return (
    <div className="flex w-full flex-col gap-8 py-4">
      <div className="flex flex-col gap-4">
        <p className="text-center text-sm font-medium text-muted-foreground">
          Perspective grid lines scroll toward the viewer — content sits in the overlay slot.
        </p>

        <RetroGrid className="min-h-[320px] rounded-xl border border-border" speed={16}>
          <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 p-8 text-center">
            <span className="inline-flex items-center rounded-full border border-border bg-card/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
              Background layer
            </span>
            <h3 className="text-2xl font-semibold tracking-tight text-foreground">
              Retro grid backdrop
            </h3>
            <p className="max-w-sm text-sm text-muted-foreground">
              Mount heroes, CTAs, or dashboards above the scrolling plane. Grid lines carry a faint
              ember tint by default — set <code className="text-foreground">isBrandTinted</code> to{' '}
              <code className="text-foreground">false</code> for a neutral grid.
            </p>
            <button
              type="button"
              className="motion-reduce:transition-none motion-reduce:active:scale-100 inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition-all hover:opacity-90 active:scale-95"
            >
              Explore components
              <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </RetroGrid>
      </div>

      <div className="flex flex-col gap-3">
        <h4 className="text-sm font-medium text-foreground">Tint</h4>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-3">
            <RetroGrid className="h-40 w-full rounded-lg border border-border" cellSize={36} speed={16}>
              <div className="flex h-full items-center justify-center">
                <p className="text-xs font-medium text-foreground">isBrandTinted (default)</p>
              </div>
            </RetroGrid>
            <span className="text-xs font-medium text-muted-foreground">Ember tint — default</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-3">
            <RetroGrid
              isBrandTinted={false}
              className="h-40 w-full rounded-lg border border-border"
              cellSize={36}
              speed={16}
            >
              <div className="flex h-full items-center justify-center">
                <p className="text-xs font-medium text-foreground">isBrandTinted=false</p>
              </div>
            </RetroGrid>
            <span className="text-xs font-medium text-muted-foreground">Neutral grid</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h4 className="text-sm font-medium text-foreground">Angle</h4>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-3">
            <RetroGrid angle={45} className="h-32 w-full rounded-lg border border-border" cellSize={28} speed={16}>
              <div className="flex h-full items-center justify-center">
                <p className="text-xs font-medium text-foreground">45°</p>
              </div>
            </RetroGrid>
            <span className="text-xs font-medium text-muted-foreground">Shallow</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-3">
            <RetroGrid angle={62} className="h-32 w-full rounded-lg border border-border" cellSize={28} speed={16}>
              <div className="flex h-full items-center justify-center">
                <p className="text-xs font-medium text-foreground">62°</p>
              </div>
            </RetroGrid>
            <span className="text-xs font-medium text-muted-foreground">Default</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-3">
            <RetroGrid angle={78} className="h-32 w-full rounded-lg border border-border" cellSize={28} speed={16}>
              <div className="flex h-full items-center justify-center">
                <p className="text-xs font-medium text-foreground">78°</p>
              </div>
            </RetroGrid>
            <span className="text-xs font-medium text-muted-foreground">Steep</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h4 className="text-sm font-medium text-foreground">Speed</h4>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-3">
            <RetroGrid speed={8} className="h-32 w-full rounded-lg border border-border" cellSize={28}>
              <div className="flex h-full items-center justify-center">
                <p className="text-xs font-medium text-foreground">8s</p>
              </div>
            </RetroGrid>
            <span className="text-xs font-medium text-muted-foreground">Fast</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-3">
            <RetroGrid speed={18} className="h-32 w-full rounded-lg border border-border" cellSize={28}>
              <div className="flex h-full items-center justify-center">
                <p className="text-xs font-medium text-foreground">18s</p>
              </div>
            </RetroGrid>
            <span className="text-xs font-medium text-muted-foreground">Default</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-3">
            <RetroGrid speed={32} className="h-32 w-full rounded-lg border border-border" cellSize={28}>
              <div className="flex h-full items-center justify-center">
                <p className="text-xs font-medium text-foreground">32s</p>
              </div>
            </RetroGrid>
            <span className="text-xs font-medium text-muted-foreground">Slow</span>
          </div>
        </div>
      </div>
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
