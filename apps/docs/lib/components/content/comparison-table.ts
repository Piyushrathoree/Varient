import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { ComparisonTable } from '@/components/sections/comparison-table';

export function PricingPage() {
  return (
    <ComparisonTable
      eyebrow="Compare plans"
      title={
        <>
          Pick the plan that{' '}
          <span className="text-brand">fits your team</span>
        </>
      }
      description="See exactly what each tier includes before you commit."
      plans={[
        { name: 'Starter', price: 'Free', cta: { label: 'Get started' } },
        {
          name: 'Pro',
          price: '$29/mo',
          isHighlighted: true,
          cta: { label: 'Start trial' },
        },
        { name: 'Enterprise', price: 'Custom', cta: { label: 'Contact sales' } },
      ]}
      rows={[
        { category: 'Core', feature: 'Foundation components', values: [true, true, true] },
        { feature: 'Animated layer', values: [false, true, true] },
        { feature: 'Team members', values: ['1', '10', 'Unlimited'] },
      ]}
      footnote="Prices shown in USD, billed monthly."
    />
  );
}`,
  props: [
    {
      title: 'ComparisonTable',
      rows: [
        { name: 'eyebrow', type: 'string', defaultValue: "'Compare plans'", description: 'Small brand-colored label above the section title.' },
        { name: 'title', type: 'ReactNode', description: 'Section headline — defaults to a title with a brand-colored span.' },
        { name: 'description', type: 'string', description: 'One-line supporting copy below the title.' },
        { name: 'plans', type: 'ComparisonPlan[]', description: '2–3 pricing tiers shown as table columns with optional CTAs.' },
        { name: 'rows', type: 'ComparisonRow[]', description: 'Feature rows — boolean values render as check/cross icons, strings as text.' },
        { name: 'footnote', type: 'ReactNode', description: 'Optional footnote or legend rendered below the table (e.g. asterisk explanations).' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn(), applied to the root section.' },
      ],
    },
    {
      title: 'ComparisonPlan',
      rows: [
        { name: 'name', type: 'string', description: 'Plan name shown in the column header.' },
        { name: 'price', type: 'string', description: 'Optional price label below the plan name.' },
        { name: 'isHighlighted', type: 'boolean', defaultValue: 'false', description: 'Adds brand top border and bg-brand/5 column tint.' },
        { name: 'cta.label', type: 'string', description: 'Button label in the column header.' },
        { name: 'cta.href', type: 'string', description: 'Optional href — renders the CTA as a link via Button asChild.' },
      ],
    },
    {
      title: 'ComparisonRow',
      rows: [
        { name: 'feature', type: 'string', description: 'Feature name in the first column.' },
        { name: 'category', type: 'string', description: 'Optional group label — renders a full-width category row when the category changes.' },
        { name: 'values', type: '(boolean | string)[]', description: 'Cell values aligned with plans — booleans become check/cross icons.' },
      ],
    },
  ],
  features: [
    'Highlighted plan column gets a brand top border and a bg-brand/5 tint that carries down through every cell in that column.',
    'Rows can be grouped into categories — a full-width uppercase label row renders automatically whenever `category` changes between rows.',
    'Boolean cell values render as check/cross icons with sr-only "Included"/"Not included" text; string values render as plain text (e.g. seat counts).',
    'Optional `footnote` slot renders muted-foreground text below the table for pricing disclaimers or legends.',
    'Section heading uses `useId()` so multiple ComparisonTable instances on one page never collide on `aria-labelledby`.',
    'Scroll-reveal header animation respects `prefers-reduced-motion` via `useReducedMotion()`.',
  ],
  aria: [
    { attribute: 'aria-labelledby', element: '<section>', purpose: 'Points to the unique (useId-generated) heading id so the section is announced by its title.' },
    { attribute: 'scope="col"', element: 'Plan column headers', purpose: 'Associates each data cell with its plan for assistive tech.' },
    { attribute: 'scope="row"', element: 'Feature name cells', purpose: 'Associates each value cell with its feature.' },
    { attribute: 'sr-only text', element: 'Check/cross icons', purpose: 'Announces "Included" / "Not included" for boolean values.' },
  ],
  a11yNotes: [
    'The comparison table wrapper scrolls horizontally on narrow viewports via overflow-x-auto instead of shrinking column content.',
    'CTA buttons are real <button> elements (or <a> via Button asChild) with visible focus-visible rings.',
  ],
  sourceFiles: [
    'packages/ui/src/components/sections/comparison-table/comparison-table.tsx',
    'packages/ui/src/components/sections/comparison-table/index.ts',
  ],
};
