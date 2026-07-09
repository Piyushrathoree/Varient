'use client';

import { Meteors } from '@varient/ui';

function MeteorStage({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full max-w-lg overflow-hidden rounded-xl border border-border bg-foreground shadow-sm">
      <Meteors number={24} />
      <div className="relative z-10 flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
        {children}
      </div>
    </div>
  );
}

export function MeteorShowerDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-6 py-4">
      <p className="text-center text-sm font-medium text-muted-foreground">
        Place <code className="text-foreground">Meteors</code> inside any{' '}
        <code className="text-foreground">relative overflow-hidden</code> container — content stays
        interactive above the layer.
      </p>

      <MeteorStage>
        <h3 className="font-title text-lg font-semibold tracking-tight text-background">
          Meteor shower
        </h3>
        <p className="max-w-xs text-sm text-background/70">
          Diagonal streaks loop with staggered delays for an organic sky effect.
        </p>
      </MeteorStage>
    </div>
  );
}

export function MeteorShowerPreviewCompact() {
  return (
    <div className="relative h-28 w-full overflow-hidden rounded-lg border border-border bg-foreground">
      <Meteors number={12} />
      <div className="relative z-10 flex h-full items-center justify-center">
        <span className="text-sm font-medium text-background">Meteors</span>
      </div>
    </div>
  );
}
