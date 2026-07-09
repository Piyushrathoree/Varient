'use client';

import { type ReactNode } from 'react';
import { RippleButton } from '@varient/ui';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export function RippleButtonDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      <p className="text-center text-sm font-medium text-muted-foreground">
        Click anywhere on a button — the ripple expands from your pointer.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DemoCard label="Default">
          <RippleButton>Click me</RippleButton>
        </DemoCard>

        <DemoCard label="Primary">
          <RippleButton variant="primary">Get started</RippleButton>
        </DemoCard>

        <DemoCard label="Outline">
          <RippleButton variant="outline">Learn more</RippleButton>
        </DemoCard>

        <DemoCard label="Secondary">
          <RippleButton variant="secondary">Secondary</RippleButton>
        </DemoCard>

        <DemoCard label="Custom ripple">
          <RippleButton
            variant="primary"
            rippleColor="color-mix(in oklab, white 50%, transparent)"
            duration={0.8}
          >
            Slow ripple
          </RippleButton>
        </DemoCard>

        <DemoCard label="Disabled">
          <RippleButton isDisabled>Disabled</RippleButton>
        </DemoCard>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Sizes</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <DemoCard label="Small">
            <RippleButton size="sm">Small</RippleButton>
          </DemoCard>
          <DemoCard label="Medium">
            <RippleButton size="md">Medium</RippleButton>
          </DemoCard>
          <DemoCard label="Large">
            <RippleButton size="lg">Large</RippleButton>
          </DemoCard>
        </div>
      </div>
    </div>
  );
}

export function RippleButtonPreviewCompact() {
  return <RippleButton variant="primary">Ripple</RippleButton>;
}
