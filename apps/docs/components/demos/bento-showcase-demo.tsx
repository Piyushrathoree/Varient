'use client';

import { BentoShowcase, BentoShowcaseCard, DotPattern, GridPattern } from '@varient/ui';
import { ArrowUpRight, Layers, Palette, Sparkles, Zap } from 'lucide-react';

function ShowcaseCta({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm font-medium text-brand">
      {label}
      <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
    </span>
  );
}

export function BentoShowcaseDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-4 py-6">
      <p className="max-w-lg text-center text-sm font-medium text-muted-foreground">
        Scroll to stagger cells in. Hover a card — siblings dim, the footer CTA slides up,
        and the background slot stays mounted behind the copy.
      </p>

      <BentoShowcase className="w-full max-w-4xl">
        <BentoShowcaseCard
          colSpan={2}
          title="Animated backgrounds"
          description="Drop DotPattern, GridPattern, or gradients into the background slot per cell."
          icon={<Sparkles className="size-5" strokeWidth={1.5} aria-hidden="true" />}
          background={
            <div className="relative h-full w-full">
              <DotPattern className="opacity-70" isGlowing />
              <div className="absolute inset-0 bg-gradient-to-br from-muted/80 via-transparent to-transparent" />
            </div>
          }
          footer={<ShowcaseCta label="Browse animated layer" />}
        />

        <BentoShowcaseCard
          title="Token-driven"
          description="Semantic surfaces — no raw hex in component code."
          icon={<Palette className="size-5" strokeWidth={1.5} aria-hidden="true" />}
          background={
            <GridPattern
              width={32}
              height={32}
              squares={[
                [1, 0],
                [2, 1],
              ]}
              className="opacity-60"
            />
          }
          footer={<ShowcaseCta label="View tokens" />}
        />

        <BentoShowcaseCard
          rowSpan={2}
          title="Compose, don't duplicate"
          description="Sections build from Foundation + Animated primitives — logic stays in one place."
          icon={<Layers className="size-5" strokeWidth={1.5} aria-hidden="true" />}
          background={
            <div className="h-full w-full bg-gradient-to-b from-muted/80 via-card to-background" />
          }
          footer={<ShowcaseCta label="See sections" />}
        />

        <BentoShowcaseCard
          colSpan={2}
          title="Motion with guardrails"
          description="Springs, reveals, and hover polish that respect prefers-reduced-motion."
          icon={<Zap className="size-5" strokeWidth={1.5} aria-hidden="true" />}
          background={
            <div className="relative h-full w-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-muted/70 via-card to-transparent" />
              <DotPattern size={20} radius={0.75} className="opacity-50" />
            </div>
          }
          footer={<ShowcaseCta label="Open playground" />}
        />
      </BentoShowcase>
    </div>
  );
}

export function BentoShowcasePreviewCompact() {
  return (
    <div className="flex w-full items-center justify-center">
      <BentoShowcase className="w-full max-w-[11rem]">
        <BentoShowcaseCard
          title="Showcase"
          description="Hover for footer."
          background={<div className="h-full w-full bg-gradient-to-br from-muted to-card" />}
          footer={<ShowcaseCta label="More" />}
        />
      </BentoShowcase>
    </div>
  );
}
