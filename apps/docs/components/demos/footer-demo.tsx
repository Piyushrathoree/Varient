'use client';

import { Footer, type FooterColumn, type FooterLink, type FooterSocialLink } from '@varient/ui';

const fullColumns: FooterColumn[] = [
  {
    title: 'Product',
    links: [
      { label: 'Components', href: '/components' },
      { label: 'Foundation', href: '/components?layer=foundation' },
      { label: 'Animated', href: '/components?layer=animated' },
      { label: 'Sections', href: '/components?layer=sections' },
      { label: 'Changelog', href: '/docs' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs/getting-started/introduction' },
      { label: 'Installation', href: '/docs/getting-started/installation' },
      { label: 'Theming', href: '/docs/getting-started/theming' },
      { label: 'Figma kit', href: 'https://figma.com', isExternal: true },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'GitHub', href: 'https://github.com/piyush/varient', isExternal: true },
      { label: 'Discord', href: 'https://discord.gg/varient', isExternal: true },
      { label: 'Careers', href: '/careers' },
    ],
  },
];

const fullSocialLinks: FooterSocialLink[] = [
  { label: 'Varient on GitHub', href: 'https://github.com/piyush/varient', platform: 'github' },
  { label: 'Varient on X', href: 'https://x.com/varient', platform: 'x' },
  { label: 'Varient on LinkedIn', href: 'https://linkedin.com/company/varient', platform: 'linkedin' },
  { label: 'Varient on Discord', href: 'https://discord.gg/varient', platform: 'discord' },
  { label: 'Varient on YouTube', href: 'https://youtube.com/@varient', platform: 'youtube' },
];

const legalLinks: FooterLink[] = [
  { label: 'Privacy', href: '/legal/privacy' },
  { label: 'Terms', href: '/legal/terms' },
];

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
      <Footer
        columns={fullColumns}
        copyrightName="Varient Labs"
        legalLinks={legalLinks}
        socialLinks={fullSocialLinks}
        statusText="All systems operational"
        tagline="Copy-paste React components for utilities, animations, and full-page sections. You own the code — no lock-in, no per-component installs."
        year={2026}
      />
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
          { label: 'Varient on Discord', href: 'https://discord.gg/varient', platform: 'discord' },
        ]}
        statusText="Open source"
        tagline="Copy-paste React components. You own the code."
      />
    </div>
  );
}
