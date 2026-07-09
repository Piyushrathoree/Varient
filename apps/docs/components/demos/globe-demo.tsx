'use client';

import { Globe } from '@varient/ui';

export function GlobeDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="w-full max-w-[400px] rounded-xl border border-border bg-card p-6 shadow-sm">
        <Globe className="mx-auto w-full max-w-[360px]" />
        <p className="mt-4 text-center text-sm text-muted-foreground">Drag to rotate</p>
      </div>
    </div>
  );
}

export function GlobePreviewCompact() {
  return (
    <div className="flex w-full items-center justify-center">
      <Globe className="w-[140px]" />
    </div>
  );
}
