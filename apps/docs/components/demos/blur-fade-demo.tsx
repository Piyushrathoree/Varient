'use client';

import { BlurFade } from '@varient/ui';

const FEATURES = [
  {
    title: 'Copy-paste DX',
    description: 'Own the source — no per-component npm installs.',
  },
  {
    title: 'Motion-aware',
    description: 'Every animation respects prefers-reduced-motion.',
  },
  {
    title: 'Token-driven',
    description: 'Semantic colors and radii, light and dark.',
  },
  {
    title: 'Scroll-triggered',
    description: 'Reveal once when items enter the viewport.',
  },
] as const;

export function BlurFadeDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-6 py-6">
      <p className="max-w-md text-center text-sm font-medium text-muted-foreground">
        Scroll to see staggered blur-fade reveals. Refresh the page to replay the
        animation — each item only animates once.
      </p>

      <div className="grid w-full max-w-lg grid-cols-1 gap-4 sm:grid-cols-2">
        {FEATURES.map((feature, index) => (
          <BlurFade key={feature.title} delay={index * 0.08}>
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <h4 className="text-sm font-semibold text-foreground">{feature.title}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
            </div>
          </BlurFade>
        ))}
      </div>

      <p className="text-xs font-medium text-muted-foreground">Direction variants</p>

      <div className="grid w-full max-w-lg grid-cols-2 gap-3 sm:grid-cols-4">
        {(['up', 'down', 'left', 'right'] as const).map((direction) => (
          <BlurFade key={direction} direction={direction} delay={0.05} yOffset={16}>
            <div className="flex h-16 items-center justify-center rounded-lg border border-border bg-muted text-xs font-medium capitalize text-muted-foreground">
              {direction}
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}

export function BlurFadePreviewCompact() {
  return (
    <BlurFade delay={0.05} yOffset={12}>
      <div className="rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground">
        Fade in
      </div>
    </BlurFade>
  );
}
