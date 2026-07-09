'use client';

import { useRef } from 'react';
import { ScrollProgressBar } from '@varient/ui';

export function ScrollProgressBarDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex w-full flex-col items-center gap-6 py-6">
      <p className="max-w-md text-center text-sm font-medium text-muted-foreground">
        Scroll inside the frame — the bar tracks how far you&apos;ve read.
      </p>

      <div className="grid w-full max-w-lg grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6">
          <span className="text-xs font-medium text-muted-foreground">Top (default)</span>
          <div
            ref={scrollRef}
            className="relative h-80 w-full overflow-y-auto rounded-lg border border-border bg-background"
          >
            <ScrollProgressBar isFixed={false} scrollContainerRef={scrollRef} />
            <div className="flex flex-col gap-3 p-4 pt-6">
              {Array.from({ length: 10 }, (_, index) => (
                <div key={index} className="rounded-md bg-muted/60 p-3 text-sm text-muted-foreground">
                  Paragraph {index + 1} — scroll to fill the progress bar.
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6">
          <span className="text-xs font-medium text-muted-foreground">Bottom position</span>
          <BottomBarDemo />
        </div>
      </div>
    </div>
  );
}

function BottomBarDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollRef}
      className="relative h-80 w-full overflow-y-auto rounded-lg border border-border bg-background"
    >
      <ScrollProgressBar
        isFixed={false}
        position="bottom"
        scrollContainerRef={scrollRef}
        color="bg-gradient-to-r from-brand to-brand-secondary"
      />
      <div className="flex flex-col gap-3 p-4 pb-6">
        {Array.from({ length: 10 }, (_, index) => (
          <div key={index} className="rounded-md bg-muted/60 p-3 text-sm text-muted-foreground">
            Block {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ScrollProgressBarPreviewCompact() {
  return (
    <div className="relative h-16 w-full overflow-hidden rounded-lg border border-border bg-muted/30">
      <ScrollProgressBar isFixed={false} className="!top-0" height={4} />
    </div>
  );
}
