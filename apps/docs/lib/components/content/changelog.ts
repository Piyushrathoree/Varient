import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Changelog } from '@/components/sections/changelog';

export function ReleasesPage() {
  return (
    <Changelog
      eyebrow="Changelog"
      title="What shipped recently"
      entries={[
        {
          version: '1.2.0',
          date: 'Jul 1, 2026',
          isoDate: '2026-07-01',
          title: 'Sections layer ships',
          changes: [
            { type: 'added', text: 'Integration grid and 404 page sections.' },
            { type: 'improved', text: 'Card hover states with softer shadows.' },
          ],
        },
      ]}
    />
  );
}`,
  props: [
    {
      title: 'Changelog',
      rows: [
        { name: 'eyebrow', type: 'string', defaultValue: "'Changelog'", description: 'Small brand-colored label above the section title.' },
        { name: 'title', type: 'string', defaultValue: "'What shipped recently'", description: 'Section headline.' },
        { name: 'description', type: 'string', description: 'One-line supporting copy below the title.' },
        { name: 'entries', type: 'ChangelogEntry[]', description: 'Versioned release rows — each needs version, date, and a changes array.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn(), applied to the root section.' },
      ],
    },
    {
      title: 'ChangelogEntry',
      rows: [
        { name: 'version', type: 'string', description: 'Semantic version string — rendered in a mono Badge chip prefixed with "v".' },
        { name: 'date', type: 'string', description: 'Human-readable display date shown next to the version badge.' },
        { name: 'isoDate', type: 'string', description: 'Optional machine-readable ISO date passed to the <time dateTime> attribute; falls back to date when omitted.' },
        { name: 'title', type: 'string', description: 'Optional release headline below the version row.' },
        { name: 'changes', type: '{ type: "added" | "improved" | "fixed"; text: string }[]', description: 'Bullet list of changes — each type maps to a color-coded Badge (success, brand, warning).' },
      ],
    },
  ],
  features: [
    'Versioned release list with color-coded change-type badges (added / improved / fixed).',
    'Display date and machine-readable ISO date are decoupled via `date` and optional `isoDate`.',
    'Scroll-reveal per entry, staggered and gated behind prefers-reduced-motion.',
    'Sticky version/date row per entry for easy scanning while scrolling a long log.',
    'Heading id generated with useId() so multiple instances never collide on one page.',
  ],
  aria: [
    { attribute: 'aria-labelledby', element: '<section>', purpose: 'Associates the section with its unique (useId-generated) heading id.' },
    { attribute: 'dateTime', element: '<time>', purpose: 'Machine-readable date sourced from isoDate (falling back to date) for each release.' },
  ],
  a11yNotes: [
    'Change-type badges render visible text labels ("Added", "Improved", "Fixed") — never icon-only.',
    'Each release is a semantic <article> containing a version row, optional <h3> title, and a <ul> of changes.',
    'Reduced-motion users see all entries immediately without stagger or fade-in.',
  ],
  sourceFiles: [
    'packages/ui/src/components/sections/changelog/changelog.tsx',
    'packages/ui/src/components/sections/changelog/index.ts',
  ],
};
