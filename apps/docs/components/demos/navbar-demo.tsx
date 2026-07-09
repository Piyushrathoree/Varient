'use client';

import { Navbar } from '@varient/ui';

export function NavbarDemo() {
  return (
    <div className="w-full bg-background">
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
  );
}

export function NavbarPreviewCompact() {
  return (
    <div className="w-full bg-background px-2">
      <Navbar
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
