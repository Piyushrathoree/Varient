'use client';

import { Footer, type FooterColumn } from '@varient/ui';

const compactColumns: FooterColumn[] = [
  {
    title: 'Library',
    links: [
      { label: 'Components', href: '/components' },
      { label: 'Foundation', href: '/components?layer=foundation' },
    ],
  },
  {
    title: 'Guide',
    links: [
      { label: 'Introduction', href: '/docs/getting-started/introduction' },
      { label: 'Installation', href: '/docs/getting-started/installation' },
    ],
  },
];

export function FooterDemo() {
  return (
    <div className="w-full bg-background">
      <Footer />
    </div>
  );
}

export function FooterPreviewCompact() {
  return (
    <div className="w-full bg-background">
      <Footer
        className="[&>div]:!space-y-6 [&>div]:!py-6"
        columns={compactColumns}
        socialLinks={[
          { label: 'Varient on GitHub', href: 'https://github.com/piyush/varient', platform: 'github' },
        ]}
        statusText="Open source"
        tagline="Copy-paste React components. You own the code."
      />
    </div>
  );
}
