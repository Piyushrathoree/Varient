'use client';

import { Cta } from '@varient/ui';

export function CtaDemo() {
  return (
    <div className="flex w-full flex-col gap-8 bg-background">
      <Cta
        description="Copy components directly into your project. No runtime dependency — you own every line."
        primaryCta={{ label: 'Browse components', href: '/components' }}
        secondaryCta={{ label: 'View on GitHub', href: 'https://github.com' }}
        title="Ready to get started"
      />

      <div className="flex flex-col gap-3 px-6 sm:px-8">
        <p className="text-sm font-medium text-muted-foreground">Brand border variant</p>
        <Cta
          description="A subtle brand gradient rim signals the primary action without overwhelming the page."
          primaryCta={{ label: 'Start building', href: '/components' }}
          title="Add motion to your product"
          variant="brand"
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
        primaryCta={{ label: 'Get started', href: '#' }}
        title="Start with Varient"
      />
    </div>
  );
}
