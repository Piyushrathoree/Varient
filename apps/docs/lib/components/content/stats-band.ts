import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { StatsBand } from '@/components/sections/stats-band';

export function LandingPage() {
  return (
    <StatsBand
      title="Growth this quarter"
      description="Metrics pulled straight from the growth dashboard."
      isRaised
      stats={[
        { value: 2.4, prefix: '$', suffix: 'M', decimalPlaces: 1, label: 'Annual recurring revenue' },
        { value: 98.6, suffix: '%', decimalPlaces: 1, label: 'Customer retention' },
        { value: 340, suffix: '+', label: 'Active teams' },
        { value: 12, suffix: 'ms', label: 'Median response time' },
      ]}
    />
  );
}`,
  props: [
    {
      title: 'StatsBand',
      rows: [
        { name: 'stats', type: 'StatsBandStat[]', defaultValue: '(4 default metrics)', description: 'Metrics to display — each value animates via NumberTicker when scrolled into view.' },
        { name: 'title', type: 'string', description: 'Optional section heading — rendered as an h2. Fades and rises into view once when scrolled into the viewport.' },
        { name: 'description', type: 'string', description: 'Optional one-line description below the title.' },
        { name: 'isRaised', type: 'boolean', defaultValue: 'false', description: 'Renders each stat inside a raised card surface (border + bg-card + shadow) instead of plain text with hairline dividers.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn(), applied to the root section.' },
      ],
    },
    {
      title: 'StatsBandStat',
      rows: [
        { name: 'value', type: 'number', description: 'Numeric target the NumberTicker counts up to.' },
        { name: 'prefix', type: 'string', description: 'Optional string rendered before the number, e.g. "$".' },
        { name: 'suffix', type: 'string', description: 'Optional string rendered after the number, e.g. "+", "k", "%".' },
        { name: 'label', type: 'string', description: 'Muted caption below the value. Used as the React key, so keep it unique per stat.' },
        { name: 'decimalPlaces', type: 'number', description: 'Decimal precision for the count-up animation, e.g. 1 for "98.6".' },
        { name: 'icon', type: 'ReactNode', description: 'Optional decorative icon rendered in a small brand-tinted roundel above the value.' },
      ],
    },
  ],
  features: [
    'Optional centered header (title + description) that fades/rises into view once on scroll, gated behind prefers-reduced-motion.',
    'Responsive grid grid-cols-2 lg:grid-cols-4 of stats, each with a large NumberTicker count-up and muted label.',
    'Optional per-stat icon in a brand-tinted roundel above the value.',
    'isRaised swaps the plain-text + hairline-divider layout for a bordered, shadowed card surface per stat.',
    'NumberTicker owns scroll-triggered count-up and reduced-motion fallbacks — this section does not duplicate that logic.',
    'Root section is aria-labelledby the heading when title is provided; digits are aria-hidden with a visually hidden span carrying the final value for screen readers.',
  ],
  aria: [
    { attribute: 'aria-labelledby', element: '<section>', purpose: 'Points to the h2 id when title is provided, so the section has an accessible name.' },
    { attribute: 'role="list" / role="listitem"', element: 'stats grid / stat cell', purpose: 'Groups the stat cells as a semantic list for assistive tech.' },
    { attribute: 'aria-hidden', element: 'per-stat icon roundel', purpose: 'Icons are decorative; the label text already conveys meaning.' },
  ],
  a11yNotes: [
    'Count-up animation respects prefers-reduced-motion via NumberTicker — reduced-motion users see the final value immediately.',
    'The header reveal is gated by prefers-reduced-motion and plays once (viewport: { once: true }), never a perpetual loop.',
  ],
  sourceFiles: [
    'packages/ui/src/components/sections/stats-band/stats-band.tsx',
    'packages/ui/src/components/sections/stats-band/index.ts',
  ],
};
