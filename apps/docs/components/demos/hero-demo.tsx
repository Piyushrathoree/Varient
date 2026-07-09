'use client';

import { Hero } from '@varient/ui';

export function HeroDemo() {
  return (
    <div className="w-full bg-background">
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
