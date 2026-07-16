'use client';

import { type ReactNode } from 'react';
import { ShimmerButton } from '@varient/ui';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export function ShimmerButtonDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      <p className="text-center text-sm font-medium text-muted-foreground">
        A continuous highlight sweeps across the brand gradient fill.
      </p>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Default</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DemoCard label="Brand gradient">
            <ShimmerButton>Get started</ShimmerButton>
          </DemoCard>
          <DemoCard label="Custom shimmer">
            <ShimmerButton shimmerColor="var(--color-brand-lighter)" shimmerDuration={2}>
              Faster sweep
            </ShimmerButton>
          </DemoCard>
          <DemoCard label="Muted surface">
            <ShimmerButton
              background="linear-gradient(to bottom, var(--color-muted-foreground), var(--color-foreground))"
              shimmerColor="color-mix(in oklab, var(--color-brand-light) 70%, transparent)"
            >
              Neutral fill
            </ShimmerButton>
          </DemoCard>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Sweep width</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <DemoCard label="Narrow (15%)">
            <ShimmerButton shimmerWidth="15%">Thin sweep</ShimmerButton>
          </DemoCard>
          <DemoCard label="Default (40%)">
            <ShimmerButton>Default sweep</ShimmerButton>
          </DemoCard>
          <DemoCard label="Wide (70%)">
            <ShimmerButton shimmerWidth="70%">Wide sweep</ShimmerButton>
          </DemoCard>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Sizes</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <DemoCard label="Small">
            <ShimmerButton size="sm">Small</ShimmerButton>
          </DemoCard>
          <DemoCard label="Medium">
            <ShimmerButton size="md">Medium</ShimmerButton>
          </DemoCard>
          <DemoCard label="Large">
            <ShimmerButton size="lg">Large</ShimmerButton>
          </DemoCard>
        </div>
      </div>
    </div>
  );
}

export function ShimmerButtonPreviewCompact() {
  return <ShimmerButton size="md">Shimmer</ShimmerButton>;
}
