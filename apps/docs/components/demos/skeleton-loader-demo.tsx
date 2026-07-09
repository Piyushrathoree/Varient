'use client';

import { type ReactNode } from 'react';
import { Skeleton, type SkeletonVariant } from '@varient/ui';

const VARIANTS: { variant: SkeletonVariant; label: string }[] = [
  { variant: 'shimmer', label: 'Shimmer' },
  { variant: 'pulse', label: 'Pulse' },
];

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

function ProfileCardSkeleton() {
  return (
    <div className="flex w-full max-w-[240px] items-center gap-3">
      <Skeleton shape="circle" className="size-10 shrink-0" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}

function TextBlockSkeleton() {
  return (
    <div className="flex w-full max-w-[280px] flex-col gap-2">
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  );
}

function MediaCardSkeleton() {
  return (
    <div className="flex w-full max-w-[240px] flex-col gap-3">
      <Skeleton className="h-28 w-full rounded-lg" />
      <Skeleton className="h-3 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  );
}

export function SkeletonLoaderDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Variants</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VARIANTS.map(({ variant, label }) => (
            <DemoCard key={variant} label={label}>
              <Skeleton variant={variant} className="h-10 w-full max-w-[200px]" />
            </DemoCard>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Composed layouts</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DemoCard label="Profile card">
            <ProfileCardSkeleton />
          </DemoCard>

          <DemoCard label="Text block">
            <TextBlockSkeleton />
          </DemoCard>

          <DemoCard label="Media card">
            <MediaCardSkeleton />
          </DemoCard>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Shapes</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DemoCard label="Rectangle">
            <Skeleton className="h-10 w-full max-w-[200px]" />
          </DemoCard>

          <DemoCard label="Circle">
            <Skeleton shape="circle" className="size-12" />
          </DemoCard>
        </div>
      </div>
    </div>
  );
}

export function SkeletonLoaderPreviewCompact() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex w-full max-w-[200px] items-center gap-2.5">
        <Skeleton shape="circle" className="size-8 shrink-0" />
        <div className="flex flex-1 flex-col gap-1.5">
          <Skeleton className="h-2.5 w-full" />
          <Skeleton className="h-2.5 w-2/3" />
        </div>
      </div>
    </div>
  );
}
