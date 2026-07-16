'use client';

import { Hero } from '@varient/ui';

function StatVisual() {
  return (
    <div aria-hidden className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3 border-border border-b pb-4">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">Monthly recurring revenue</p>
          <p className="font-display text-3xl font-semibold tracking-tight text-foreground">$48.2k</p>
        </div>
        <span className="rounded-full bg-success/10 px-2.5 py-1 font-medium text-success text-xs">+18.4%</span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {['Team', 'Growth', 'Scale'].map((plan, index) => (
          <div key={plan} className="rounded-lg bg-muted/60 p-3">
            <p className="text-xs text-muted-foreground">{plan}</p>
            <p className="mt-1 font-semibold text-foreground text-sm">{[42, 118, 36][index]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroDemo() {
  return (
    <div className="flex w-full flex-col gap-12 bg-background">
      <div className="flex flex-col gap-3">
        <p className="px-6 font-medium text-muted-foreground text-sm sm:px-8">
          Default — live component showcase grid
        </p>
        <Hero
          announcement={{
            badge: '25+',
            label: 'components shipped, more every week',
            href: '/components',
          }}
          builtWith={['Next.js', 'React', 'Tailwind CSS', 'Motion']}
          primaryCta={{ label: 'Explore components', href: '/components' }}
          secondaryCta={{ label: 'Read the docs', href: '/docs' }}
          subtitle="Copy-paste React components with real motion built in — buttons, badges, cards, and full sections that just work. One component API, styled for the web today with React Native next."
          title="Animated components for web and native"
        />
      </div>

      <div className="flex flex-col gap-3 border-border border-t pt-12">
        <p className="px-6 font-medium text-muted-foreground text-sm sm:px-8">
          Custom `visual`, announcement + built-with hidden
        </p>
        <Hero
          announcement={null}
          builtWith={[]}
          primaryCta={{ label: 'Start free trial', href: '/pricing' }}
          secondaryCta={{ label: 'View pricing', href: '/pricing' }}
          subtitle="Track adoption, retention, and revenue in one dashboard — swap the showcase grid for your own product screenshot via the `visual` prop."
          title="Grow revenue with data you trust"
          visual={<StatVisual />}
        />
      </div>
    </div>
  );
}

export function HeroPreviewCompact() {
  return (
    <div className="w-full bg-background">
      <Hero
        announcement={{ badge: 'New', label: 'Sections layer live' }}
        builtWith={[]}
        className="px-4 py-6 md:py-6 lg:py-6"
        primaryCta={{ label: 'Get started', href: '#' }}
        secondaryCta={{ label: 'Docs', href: '#' }}
        subtitle="Copy-paste sections composed from foundation and animated primitives."
        title="Ship landing pages faster"
        visual={
          <div
            aria-hidden
            className="rounded-xl border border-border bg-muted/40 p-3"
          >
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-2 h-8 rounded-lg bg-muted" />
              <div className="h-10 rounded-lg bg-muted" />
              <div className="h-10 rounded-lg bg-muted" />
            </div>
          </div>
        }
      />
    </div>
  );
}
