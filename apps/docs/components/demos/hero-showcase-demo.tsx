'use client';

import { Badge, Card, HeroShowcase } from '@varient/ui';

function DemoMedia() {
  return (
    <div className="flex aspect-[4/3] flex-col justify-between bg-muted/30 p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">Product preview</p>
          <p className="font-display text-lg font-semibold tracking-tight text-foreground">
            Component registry
          </p>
        </div>
        <Badge appearance="soft" variant="primary">
          Live
        </Badge>
      </div>
      <Card className="border-border/80 bg-background/90 p-4 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          {['Foundation', 'Animated', 'Sections', 'Playground'].map((item) => (
            <div
              key={item}
              className="rounded-md border border-border bg-card px-2 py-1.5 text-center text-xs font-medium text-foreground"
            >
              {item}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function HeroShowcaseDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4">
        <span className="text-xs font-medium text-muted-foreground">
          Custom media — content API with real copy, CTAs, and a bespoke media slot
        </span>
        <div className="w-full overflow-hidden rounded-xl border border-border">
          <HeroShowcase
            media={<DemoMedia />}
            primaryCta={{ label: 'Get started', href: '/components' }}
            secondaryCta={{ label: 'Live preview', href: '/docs' }}
            subtitle="Split hero with copy and CTAs on the left, and a tilted product frame with a custom media slot on the right."
            title="Showcase your product with depth"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4">
        <span className="text-xs font-medium text-muted-foreground">
          Built-in fallback media — omit the media prop to use the default dashboard mock
        </span>
        <div className="w-full overflow-hidden rounded-xl border border-border">
          <HeroShowcase
            primaryCta={{ label: 'Create an account', href: '/components' }}
            secondaryCta={{ label: 'Read the docs', href: '/docs' }}
            subtitle="No media prop passed — the frame falls back to the built-in dotted-surface dashboard mock."
            title="Ship product pages fast"
          />
        </div>
      </div>
    </div>
  );
}

export function HeroShowcasePreviewCompact() {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border border-border">
      <HeroShowcase
        className="py-8"
        primaryCta={{ label: 'Start', href: '#' }}
        secondaryCta={{ label: 'Preview', href: '#' }}
        subtitle="Tilted product frame with a settling entrance."
        title="Split hero showcase"
      />
    </div>
  );
}
