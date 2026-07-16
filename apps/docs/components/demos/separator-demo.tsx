'use client';

import type { ReactNode } from 'react';
import { Separator } from '@varient/ui';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export function SeparatorDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DemoCard label="Horizontal">
          <div className="flex w-full max-w-[240px] flex-col gap-4">
            <p className="text-sm text-foreground">Section above</p>
            <Separator />
            <p className="text-sm text-muted-foreground">Section below</p>
          </div>
        </DemoCard>

        <DemoCard label="With label">
          <Separator label="or continue with" className="max-w-[240px]" />
        </DemoCard>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DemoCard label="Vertical">
          <div className="flex h-16 items-center gap-4">
            <span className="text-sm text-foreground">Left</span>
            <Separator orientation="vertical" />
            <span className="text-sm text-muted-foreground">Right</span>
          </div>
        </DemoCard>

        <DemoCard label="Sidebar navigation">
          <div className="flex w-full max-w-[220px] flex-col gap-1 rounded-lg border border-border bg-background p-3">
            <span className="px-2 py-1 text-xs font-medium text-muted-foreground">Workspace</span>
            <span className="rounded-md px-2 py-1.5 text-sm text-foreground">Overview</span>
            <span className="rounded-md px-2 py-1.5 text-sm text-foreground">Projects</span>
            <Separator className="my-1" />
            <span className="px-2 py-1 text-xs font-medium text-muted-foreground">Account</span>
            <span className="rounded-md px-2 py-1.5 text-sm text-foreground">Settings</span>
            <span className="rounded-md px-2 py-1.5 text-sm text-foreground">Billing</span>
          </div>
        </DemoCard>
      </div>
    </div>
  );
}

export function SeparatorPreviewCompact() {
  return <Separator label="or" className="w-[200px]" />;
}
