'use client';

import type { ReactNode } from 'react';
import { GridPattern } from '@varient/ui';

const HIGHLIGHTS: [number, number][] = [
  [2, 1],
  [4, 2],
  [1, 3],
  [5, 4],
  [3, 5],
];

function PatternCard({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative h-56 overflow-hidden rounded-xl border border-border bg-background">
        {children}
        <div className="pointer-events-none absolute inset-0 flex items-end p-4">
          <p className="font-title text-lg font-semibold tracking-tight text-foreground">
            Grid texture
          </p>
        </div>
      </div>
      <span className="text-center text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export function GridPatternDemo() {
  return (
    <div className="flex w-full flex-col gap-6 py-6">
      <p className="text-center text-sm font-medium text-muted-foreground">
        SVG grid-line backgrounds for cards, heroes, and preview canvases.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <PatternCard label="Plain grid">
          <GridPattern />
        </PatternCard>

        <PatternCard label="Dashed strokes">
          <GridPattern strokeDasharray="4 4" width={32} height={32} />
        </PatternCard>

        <PatternCard label="Highlighted cells">
          <GridPattern squares={HIGHLIGHTS} width={36} height={36} />
        </PatternCard>

        <PatternCard label="Animated highlights">
          <GridPattern squares={HIGHLIGHTS} isAnimated width={36} height={36} />
        </PatternCard>

        <PatternCard label="Slow pan (no highlights)">
          <GridPattern isAnimated width={48} height={48} />
        </PatternCard>

        <PatternCard label="Static (isAnimated=false)">
          <GridPattern squares={HIGHLIGHTS} isAnimated={false} width={36} height={36} />
        </PatternCard>
      </div>
    </div>
  );
}

export function GridPatternPreviewCompact() {
  return (
    <div className="relative h-28 w-full overflow-hidden rounded-lg border border-border bg-background">
      <GridPattern squares={[[2, 1], [4, 3]]} width={32} height={32} />
    </div>
  );
}
