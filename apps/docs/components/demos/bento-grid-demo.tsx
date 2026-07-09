'use client';

import { BentoGrid, BentoGridItem } from '@varient/ui';
import { Layers, Sparkles, Zap, Box, Palette, Code2 } from 'lucide-react';

function GradientHeader({ className }: { className?: string }) {
  return (
    <div
      className={`h-28 w-full bg-gradient-to-br from-muted via-card to-muted/60 ${className ?? ''}`}
    />
  );
}

function SkeletonHeader() {
  return (
    <div className="flex h-28 w-full flex-col gap-2 p-4">
      <div className="h-3 w-2/3 rounded-md bg-muted-foreground/20" />
      <div className="h-3 w-1/2 rounded-md bg-muted-foreground/15" />
      <div className="mt-auto h-8 w-full rounded-lg bg-muted" />
    </div>
  );
}

export function BentoGridDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-4 py-6">
      <p className="max-w-md text-center text-sm font-medium text-muted-foreground">
        Scroll to trigger staggered card entrances. Hover a cell for a subtle lift.
      </p>

      <BentoGrid className="w-full max-w-3xl">
        <BentoGridItem
          className="md:col-span-2"
          title="Copy-paste components"
          description="Install once, copy the source — you own every line of UI code in your project."
          header={<GradientHeader />}
          icon={<Code2 className="size-5" strokeWidth={1.5} aria-hidden="true" />}
        />
        <BentoGridItem
          title="Motion-aware"
          description="Springs and reveals that respect prefers-reduced-motion."
          header={<SkeletonHeader />}
          icon={<Sparkles className="size-5" strokeWidth={1.5} aria-hidden="true" />}
        />
        <BentoGridItem
          title="Foundation layer"
          description="25 Radix-powered primitives with consistent prop naming."
          icon={<Layers className="size-5" strokeWidth={1.5} aria-hidden="true" />}
        />
        <BentoGridItem
          className="md:col-span-2"
          title="Animated layer"
          description="30 Framer Motion components — magnetic buttons, bento grids, scroll progress, and more."
          header={<GradientHeader className="from-card via-muted to-muted/80" />}
          icon={<Zap className="size-5" strokeWidth={1.5} aria-hidden="true" />}
        />
        <BentoGridItem
          title="Token-driven"
          description="Semantic colors and radii — light and dark, no hardcoded palettes."
          icon={<Palette className="size-5" strokeWidth={1.5} aria-hidden="true" />}
        />
        <BentoGridItem
          className="md:col-span-3"
          title="Sections layer"
          description="Full-page blocks composed from Foundation and Animated — hero, pricing, FAQ, and more."
          header={<SkeletonHeader />}
          icon={<Box className="size-5" strokeWidth={1.5} aria-hidden="true" />}
        />
      </BentoGrid>
    </div>
  );
}

export function BentoGridPreviewCompact() {
  return (
    <div className="flex w-full items-center justify-center">
      <BentoGrid className="w-full max-w-[11rem]">
        <BentoGridItem
          title="Bento grid"
          description="Staggered layout."
          header={<div className="h-10 w-full bg-gradient-to-r from-muted to-card" />}
        />
      </BentoGrid>
    </div>
  );
}
