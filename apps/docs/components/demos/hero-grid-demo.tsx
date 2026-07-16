'use client';

import { HeroGrid } from '@varient/ui';

export function HeroGridDemo() {
  return (
    <div className="flex w-full flex-col gap-8 bg-background">
      <div className="flex flex-col gap-3 px-6 sm:px-8">
        <p className="text-sm font-medium text-muted-foreground">With stats</p>
        <div className="w-full overflow-hidden rounded-xl border border-border">
          <HeroGrid
            primaryCta={{ label: 'Browse library', href: '/components' }}
            secondaryCta={{ label: 'View docs', href: '/docs' }}
            stats={[
              { value: '102', label: 'Components' },
              { value: '3', label: 'Layers' },
              { value: '0', label: 'Runtime deps' },
            ]}
            subtitle="Fine line-grid background with radial fade and a headline that settles into place — a quiet, premium canvas for your copy."
            title="Precision grids, premium motion"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 px-6 sm:px-8">
        <p className="text-sm font-medium text-muted-foreground">No stats, custom backdrop</p>
        <div className="w-full overflow-hidden rounded-xl border border-border">
          <HeroGrid
            backgroundSlot={
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse 60% 45% at 50% 20%, var(--color-brand) 0%, transparent 70%)',
                  opacity: 0.12,
                }}
              />
            }
            primaryCta={{ label: 'Read the release notes', href: '/changelog' }}
            secondaryCta={{ label: 'Talk to the team', href: '/contact' }}
            stats={[]}
            subtitle="Pass any node into backgroundSlot to replace the grid-and-orb backdrop entirely — useful when a page already has its own Hero above the fold."
            title="Bring your own backdrop"
          />
        </div>
      </div>
    </div>
  );
}

export function HeroGridPreviewCompact() {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border border-border">
      <HeroGrid
        className="py-10"
        primaryCta={{ label: 'Start', href: '#' }}
        secondaryCta={{ label: 'Examples', href: '#' }}
        stats={[
          { value: '25', label: 'Foundation' },
          { value: '30', label: 'Animated' },
          { value: '20', label: 'Sections' },
        ]}
        subtitle="Grid canvas with staggered entrance."
        title="Build with confidence"
      />
    </div>
  );
}
