'use client';

import { Navbar } from '@varient/ui';

export function NavbarDemo() {
  return (
    <div className="flex w-full flex-col gap-6 bg-background">
      <div className="flex flex-col gap-2">
        <span className="px-1 text-xs font-medium text-muted-foreground">
          Default — GitHub icon + CTA
        </span>
        <Navbar
          cta={{ label: 'Get started', href: '/docs/getting-started/installation' }}
          githubHref="https://github.com/piyush/varient"
          isSticky={false}
          items={[
            { label: 'Components', href: '/components' },
            { label: 'Docs', href: '/docs' },
            { label: 'Sections', href: '/docs/sections/hero' },
          ]}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="px-1 text-xs font-medium text-muted-foreground">
          Active route — `activeHref` pill treatment
        </span>
        <Navbar
          activeHref="/docs"
          brandName="Acme"
          cta={{ label: 'Sign up', href: '#' }}
          isSticky={false}
          items={[
            { label: 'Pricing', href: '/pricing' },
            { label: 'Docs', href: '/docs' },
            { label: 'Changelog', href: '/changelog' },
          ]}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="px-1 text-xs font-medium text-muted-foreground">
          Custom logo, no CTA/GitHub
        </span>
        <Navbar
          isSticky={false}
          items={[
            { label: 'Product', href: '/product' },
            { label: 'Customers', href: '/customers' },
            { label: 'Blog', href: '/blog' },
          ]}
          logo={
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-primary text-sm font-semibold text-foreground">
              N
            </span>
          }
        />
      </div>
    </div>
  );
}

export function NavbarPreviewCompact() {
  return (
    <div className="w-full bg-background px-2">
      <Navbar
        activeHref="#"
        brandName="Varient"
        className="w-full"
        cta={{ label: 'Start', href: '#' }}
        isSticky={false}
        items={[
          { label: 'Components', href: '#' },
          { label: 'Docs', href: '#' },
        ]}
      />
    </div>
  );
}
