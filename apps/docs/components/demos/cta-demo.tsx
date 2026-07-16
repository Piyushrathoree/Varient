'use client';

import { Cta } from '@varient/ui';

const SOCIAL_PROOF_AVATARS = [
  { src: 'https://i.pravatar.cc/64?img=12', alt: 'Amara O.' },
  { src: 'https://i.pravatar.cc/64?img=32', alt: 'Devin K.' },
  { src: 'https://i.pravatar.cc/64?img=48', alt: 'Priya S.' },
  { src: 'https://i.pravatar.cc/64?img=5', alt: 'Marco T.' },
];

export function CtaDemo() {
  return (
    <div className="flex w-full flex-col gap-8 bg-background">
      <div className="flex flex-col gap-3 px-6 sm:px-8">
        <p className="text-sm font-medium text-muted-foreground">Default</p>
        <Cta
          description="Copy components directly into your project. No runtime dependency — you own every line."
          primaryCta={{ label: 'Browse components', href: '/components' }}
          secondaryCta={{ label: 'View on GitHub', href: 'https://github.com' }}
          title="Ready to get started"
        />
      </div>

      <div className="flex flex-col gap-3 px-6 sm:px-8">
        <p className="text-sm font-medium text-muted-foreground">Brand border, eyebrow, social proof</p>
        <Cta
          description="A subtle brand gradient rim signals the primary action without overwhelming the page."
          eyebrow="Varient Pro"
          primaryCta={{ label: 'Start building', href: '/components' }}
          secondaryCta={{ label: 'Talk to sales', href: '/contact' }}
          secondaryCtaEmphasis="ghost"
          socialProof={{
            avatars: SOCIAL_PROOF_AVATARS,
            text: 'Trusted by 2,400+ engineering teams',
          }}
          title="Add motion to your product"
          variant="brand"
        />
      </div>

      <div className="flex flex-col gap-3 px-6 sm:px-8">
        <p className="text-sm font-medium text-muted-foreground">Minimal, link-style secondary</p>
        <Cta
          description="For pages that already have enough card surfaces — the minimal variant drops the border and fill entirely."
          eyebrow="Changelog"
          primaryCta={{ label: 'Read the release notes', href: '/changelog' }}
          secondaryCta={{ label: 'Subscribe via RSS', href: '/rss' }}
          secondaryCtaEmphasis="link"
          title="Varient 2.0 is here"
          variant="minimal"
        />
      </div>
    </div>
  );
}

export function CtaPreviewCompact() {
  return (
    <div className="w-full bg-background px-4">
      <Cta
        className="px-0"
        description="Copy, paste, and customize."
        eyebrow="Open source"
        primaryCta={{ label: 'Get started', href: '#' }}
        socialProof={{
          avatars: SOCIAL_PROOF_AVATARS.slice(0, 3),
          text: 'Loved by 2,400+ teams',
        }}
        title="Start with Varient"
      />
    </div>
  );
}
