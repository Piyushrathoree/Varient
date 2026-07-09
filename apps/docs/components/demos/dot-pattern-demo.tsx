'use client';

import type { ReactNode } from 'react';
import { DotPattern } from '@varient/ui';

function PatternCard({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative h-56 overflow-hidden rounded-xl border border-border bg-primary">
        {children}
        <div className="pointer-events-none absolute inset-0 flex items-end p-4">
          <p className="font-title text-lg font-semibold tracking-tight text-foreground">
            Dot canvas
          </p>
        </div>
      </div>
      <span className="text-center text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export function DotPatternDemo() {
  return (
    <div className="flex w-full flex-col gap-6 py-6">
      <p className="text-center text-sm font-medium text-muted-foreground">
        Dotted paper texture — the signature Varient preview canvas, componentized.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <PatternCard label="Plain dots">
          <DotPattern />
        </PatternCard>

        <PatternCard label="Radial mask fade">
          <DotPattern className="[mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
        </PatternCard>

        <PatternCard label="Tighter spacing">
          <DotPattern size={12} radius={0.75} />
        </PatternCard>

        <PatternCard label="Glowing wave">
          <DotPattern isGlowing />
        </PatternCard>

        <PatternCard label="Masked + glowing">
          <DotPattern
            isGlowing
            className="[mask-image:radial-gradient(circle_at_center,black_30%,transparent_80%)]"
          />
        </PatternCard>

        <PatternCard label="Static (isGlowing=false)">
          <DotPattern isGlowing={false} size={14} />
        </PatternCard>
      </div>
    </div>
  );
}

export function DotPatternPreviewCompact() {
  return (
    <div className="relative h-28 w-full overflow-hidden rounded-lg border border-border bg-primary">
      <DotPattern />
    </div>
  );
}
