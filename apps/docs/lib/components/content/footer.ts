import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Footer } from '@/components/sections/footer';

export function Example() {
  return (
    <Footer
      tagline="Copy-paste React components. You own the code."
      statusText="All systems operational"
      columns={[
        {
          title: 'Library',
          links: [
            { label: 'Components', href: '/components' },
            { label: 'Foundation', href: '/components?layer=foundation' },
          ],
        },
        {
          title: 'Guide',
          links: [{ label: 'Introduction', href: '/docs/getting-started/introduction' }],
        },
        {
          title: 'Project',
          links: [{ label: 'GitHub', href: 'https://github.com/example', isExternal: true }],
        },
      ]}
      socialLinks={[
        { label: 'GitHub', href: 'https://github.com/example', platform: 'github' },
        { label: 'X', href: 'https://x.com/example', platform: 'x' },
        { label: 'Discord', href: 'https://discord.gg/example', platform: 'discord' },
      ]}
      legalLinks={[
        { label: 'Privacy', href: '/legal/privacy' },
        { label: 'Terms', href: '/legal/terms' },
      ]}
      year={2026}
    />
  );
}`,
  props: [
    {
      title: 'Footer',
      rows: [
        {
          name: 'tagline',
          type: 'string',
          description: 'One-liner under the two-tone wordmark.',
        },
        {
          name: 'columns',
          type: 'FooterColumn[]',
          description:
            'Three link columns beside the brand block. Each column has a title and an array of { label, href, isExternal? } links.',
        },
        {
          name: 'socialLinks',
          type: 'FooterSocialLink[]',
          description:
            "Social profile links rendered as inline SVG icons beside the tagline. Each link has { label, href, platform, icon? }; platform is one of 'github' | 'x' | 'linkedin' | 'discord' | 'youtube', and icon overrides the built-in glyph.",
        },
        {
          name: 'statusText',
          type: 'string',
          defaultValue: "'All systems operational'",
          description: 'Label inside the live status pill in the bottom bar.',
        },
        {
          name: 'copyrightName',
          type: 'string',
          defaultValue: "'Varient'",
          description: 'Name used in the copyright line.',
        },
        {
          name: 'legalLinks',
          type: 'FooterLink[]',
          description: 'Optional privacy/terms row rendered next to the copyright line.',
        },
        {
          name: 'year',
          type: 'number',
          description:
            'Year shown in the copyright line. Defaults to the current year — pass this to avoid a stale year on statically generated pages.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn(), applied to the root footer.',
        },
      ],
    },
  ],
  features: [
    'Brand block with wordmark, tagline, and up to five social icon links (github, x, linkedin, discord, youtube, or a custom icon override).',
    'Three-column responsive link grid, each column an independently labeled <nav>.',
    'Optional legalLinks row (privacy/terms) rendered beside the copyright line.',
    'year prop overrides the computed copyright year, avoiding stale years on statically generated pages.',
    'Live status pill with a reduced-motion-safe ping indicator.',
  ],
  aria: [
    { attribute: 'aria-label', element: 'Wordmark <a>', purpose: 'Identifies the home link for assistive tech.' },
    { attribute: 'aria-label (nav)', element: 'FooterLinkColumn', purpose: 'Each column is a <nav> labeled with its title.' },
    { attribute: 'aria-label', element: 'Social icon links', purpose: 'Descriptive label per social link; the SVG glyph itself is aria-hidden.' },
    { attribute: 'aria-hidden', element: 'Status ping dots', purpose: 'Decorative pulse animation is hidden from assistive tech; the label text stays readable.' },
  ],
  a11yNotes: [
    'External links (isExternal, social links) use target="_blank" with rel="noopener noreferrer".',
    'The status pill ping respects prefers-reduced-motion via motion-reduce:animate-none.',
    'All interactive links carry a visible focus-visible ring offset from the background.',
  ],
  sourceFiles: [
    'packages/ui/src/components/sections/footer/footer.tsx',
    'packages/ui/src/components/sections/footer/index.ts',
  ],
};
