'use client';

import { Meteors } from '@varient/ui';

function MeteorStage({
  children,
  number,
  color,
  label,
}: {
  children: React.ReactNode;
  number: number;
  color?: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      <div className="relative h-40 w-full overflow-hidden rounded-lg border border-border bg-foreground">
        <Meteors number={number} color={color} />
        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-1 px-4 text-center">
          {children}
        </div>
      </div>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
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

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MeteorStage number={8} label="Sparse">
          <span className="font-title text-sm font-semibold text-background">Sparse</span>
        </MeteorStage>

        <MeteorStage number={24} label="Default density">
          <span className="font-title text-sm font-semibold text-background">Default</span>
        </MeteorStage>

        <MeteorStage number={45} label="Dense">
          <span className="font-title text-sm font-semibold text-background">Dense</span>
        </MeteorStage>

        <MeteorStage number={24} color="var(--color-brand)" label="Ember color">
          <span className="font-title text-sm font-semibold text-background">Ember</span>
        </MeteorStage>

        <MeteorStage number={24} color="var(--color-success)" label="Custom color (success)">
          <span className="font-title text-sm font-semibold text-background">Custom color</span>
        </MeteorStage>

        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
          <div className="relative h-40 w-full overflow-hidden rounded-lg border border-border bg-foreground">
            <Meteors number={24} angle={100} minSpeed={2} maxSpeed={4} />
            <div className="relative z-10 flex h-full flex-col items-center justify-center gap-1 px-4 text-center">
              <span className="font-title text-sm font-semibold text-background">Steep & fast</span>
            </div>
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            Custom angle + speed range
          </span>
        </div>
      </div>
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
