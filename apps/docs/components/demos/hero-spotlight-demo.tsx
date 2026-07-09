'use client';

import { HeroSpotlight } from '@varient/ui';

export function HeroSpotlightDemo() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-border">
      <HeroSpotlight
        announcement={{
          badge: 'Spotlight',
          label: 'Aceternity-style dark hero with sweeping beam',
          href: '#',
        }}
        highlightWord="alive"
        primaryCta={{ label: 'Explore components', href: '/components' }}
        secondaryCta={{ label: 'Read docs', href: '/docs' }}
        subtitle="A dark canvas hero with an animated spotlight beam, brand-accent headline word, and dual CTAs — ready to paste into your launch page."
        title="Ship interfaces that feel alive"
      />
    </div>
  );
}

export function HeroSpotlightPreviewCompact() {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border border-border">
      <HeroSpotlight
        announcement={{ badge: 'New', label: 'Hero Spotlight' }}
        className="py-10"
        highlightWord="motion"
        primaryCta={{ label: 'Start', href: '#' }}
        secondaryCta={{ label: 'Docs', href: '#' }}
        subtitle="Dark hero with sweeping spotlight beam."
        title="Premium motion for everyone"
      />
    </div>
  );
}
