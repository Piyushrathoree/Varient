'use client';

import { NumberTicker } from '@varient/ui';

export function NumberTickerDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-x-12 gap-y-8">
      <div className="flex flex-col items-center gap-1">
        <span className="font-display text-4xl font-bold text-foreground">
          <NumberTicker value={75} />
        </span>
        <span className="text-sm font-medium text-muted-foreground">Components</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="font-display text-4xl font-bold text-foreground">
          <NumberTicker value={100} suffix="%" />
        </span>
        <span className="text-sm font-medium text-muted-foreground">Open source</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="font-display text-4xl font-bold text-brand">
          <NumberTicker value={12} suffix="k" duration={1.6} />
        </span>
        <span className="text-sm font-medium text-muted-foreground">Downloads</span>
      </div>
    </div>
  );
}

export function NumberTickerPreviewCompact() {
  return (
    <span className="font-display text-3xl font-bold text-foreground">
      <NumberTicker value={75} duration={1} />
    </span>
  );
}
