'use client';

import { useState, type ReactNode } from 'react';
import { ConfettiBurst, fireConfetti } from '@varient/ui';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export function ConfettiBurstDemo() {
  const [firedCount, setFiredCount] = useState(0);

  return (
    <div className="flex w-full flex-col gap-8">
      <p className="text-center text-sm font-medium text-muted-foreground">
        Click a button to fire a celebratory confetti burst from its position.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DemoCard label="Default burst">
          <ConfettiBurst>Celebrate</ConfettiBurst>
        </DemoCard>

        <DemoCard label="Dense particles">
          <ConfettiBurst particleCount={120} spread={90}>
            Big burst
          </ConfettiBurst>
        </DemoCard>

        <DemoCard label="Tight spread">
          <ConfettiBurst particleCount={50} spread={40} variant="outline">
            Focused
          </ConfettiBurst>
        </DemoCard>

        <DemoCard label="Secondary style">
          <ConfettiBurst variant="secondary" size="lg">
            Launch
          </ConfettiBurst>
        </DemoCard>

        <DemoCard label="Custom colors">
          <ConfettiBurst
            colors={['var(--color-brand)', 'var(--color-success)', 'var(--color-brand-light)']}
          >
            Brand mix
          </ConfettiBurst>
        </DemoCard>

        <DemoCard label="Imperative fire">
          <button
            type="button"
            className="inline-flex h-10 cursor-pointer items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs transition-transform duration-150 ease-out hover:bg-primary/90 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            onClick={() => {
              fireConfetti({ originX: 0.5, originY: 0.4, particleCount: 60 });
              setFiredCount((count) => count + 1);
            }}
          >
            Fire from center ({firedCount})
          </button>
        </DemoCard>
      </div>
    </div>
  );
}

export function ConfettiBurstPreviewCompact() {
  return <ConfettiBurst size="md">Celebrate</ConfettiBurst>;
}
