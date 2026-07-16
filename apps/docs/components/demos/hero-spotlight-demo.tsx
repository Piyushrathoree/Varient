'use client';

import { HeroSpotlight } from '@varient/ui';

export function HeroSpotlightDemo() {
  return (
    <div className="flex w-full flex-col gap-8 bg-background">
      <div className="flex flex-col gap-3 px-6 sm:px-8">
        <p className="text-sm font-medium text-muted-foreground">Default — beam settles after one sweep</p>
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
      </div>

      <div className="flex flex-col gap-3 px-6 sm:px-8">
        <p className="text-sm font-medium text-muted-foreground">isAmbient — perpetual beam sweep (opt-in)</p>
        <div className="w-full overflow-hidden rounded-xl border border-border">
          <HeroSpotlight
            announcement={{ badge: 'Live', label: 'Ambient mode is opt-in, not default', href: '#' }}
            highlightWord="signal"
            isAmbient
            primaryCta={{ label: 'See the beam loop', href: '#' }}
            secondaryCta={{ label: 'Read the design law', href: '/docs' }}
            subtitle="Set isAmbient to keep the conic beam sweeping forever — it pauses automatically once the section scrolls offscreen."
            title="Keep launching every signal"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 px-6 sm:px-8">
        <p className="text-sm font-medium text-muted-foreground">
          highlightWord — word-boundary guard (no partial match)
        </p>
        <div className="w-full overflow-hidden rounded-xl border border-border">
          <HeroSpotlight
            announcement={{ label: 'Only whole-word matches get the brand accent' }}
            highlightWord="motion"
            primaryCta={{ label: 'Browse animated', href: '/components' }}
            secondaryCta={{ label: 'View docs', href: '/docs' }}
            subtitle="highlightWord matches the standalone word only — the “motion” inside “motionless” stays untouched, just the trailing word lights up."
            title="Ship motionless mockups, launch with real motion"
          />
        </div>
      </div>
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
