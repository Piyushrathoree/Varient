'use client';

import { type ReactNode } from 'react';
import { Particles } from '@varient/ui';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

function ParticleStage({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative flex h-64 w-full max-w-lg items-center justify-center overflow-hidden rounded-xl border border-border bg-card ${className ?? ''}`}
    >
      <Particles />
      {children}
    </div>
  );
}

export function ParticlesDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      <p className="text-sm font-medium text-muted-foreground">
        Move your cursor over the card — particles drift and subtly repel from the
        pointer. The canvas layer is decorative and non-interactive.
      </p>

      <div className="grid grid-cols-1 gap-4">
        <DemoCard label="Default field">
          <ParticleStage>
            <h3 className="relative z-10 px-6 text-center font-title text-xl font-semibold tracking-tight text-foreground">
              Build with motion
            </h3>
          </ParticleStage>
        </DemoCard>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Density &amp; interaction</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DemoCard label="Dense (100 particles)">
            <div className="relative h-56 w-full max-w-sm overflow-hidden rounded-xl border border-border bg-primary">
              <Particles quantity={100} size={1.2} />
              <p className="relative z-10 flex h-full items-center justify-center text-sm font-medium text-foreground">
                Dense field
              </p>
            </div>
          </DemoCard>

          <DemoCard label="Strong repel (ease 80)">
            <div className="relative h-56 w-full max-w-sm overflow-hidden rounded-xl border border-border bg-muted">
              <Particles quantity={50} ease={80} staticity={30} />
              <p className="relative z-10 flex h-full items-center justify-center text-sm font-medium text-foreground">
                High ease
              </p>
            </div>
          </DemoCard>
        </div>
      </div>
    </div>
  );
}

export function ParticlesPreviewCompact() {
  return (
    <div className="relative h-28 w-full overflow-hidden rounded-xl border border-border bg-card">
      <Particles quantity={36} size={1.25} />
      <p className="relative z-10 flex h-full items-center justify-center text-xs font-medium text-foreground">
        Particles
      </p>
    </div>
  );
}
