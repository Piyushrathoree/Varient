import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Pricing } from '@/components/sections/pricing';

export function LandingPage() {
  return (
    <Pricing
      eyebrow="Pricing"
      title={
        <>
          Simple plans for{' '}
          <span className="text-brand">every stage</span>
        </>
      }
      description="Start free, upgrade when you need more."
      defaultBillingPeriod="monthly"
      annualSavingsLabel="Save 20%"
      popularLabel="Most popular"
      plans={[
        {
          id: 'starter',
          name: 'Starter',
          description: 'For side projects.',
          monthlyPrice: 0,
          annualPrice: 0,
          features: [
            'Foundation components',
            'Dark mode',
            { label: 'Private component registry', isIncluded: false },
          ],
          ctaLabel: 'Get started',
        },
        {
          id: 'pro',
          name: 'Pro',
          description: 'For production teams.',
          monthlyPrice: 29,
          annualPrice: 24,
          isPopular: true,
          features: ['Animated layer', 'Section blocks', 'Private component registry'],
          ctaLabel: 'Start trial',
        },
      ]}
    />
  );
}`,
  props: [
    {
      title: 'Pricing',
      rows: [
        { name: 'eyebrow', type: 'string', defaultValue: "'Pricing'", description: 'Small brand-colored label above the section title.' },
        { name: 'title', type: 'ReactNode', description: 'Section headline — defaults to a title with a brand-colored span.' },
        { name: 'description', type: 'string', description: 'One-line supporting copy below the title.' },
        { name: 'plans', type: 'PricingPlan[]', description: 'Pricing tiers — compose Card, Button, and Badge internally.' },
        { name: 'defaultBillingPeriod', type: "'monthly' | 'annual'", defaultValue: "'monthly'", description: 'Initial billing period for the toggle.' },
        { name: 'annualSavingsLabel', type: 'string', defaultValue: "'Save 20%'", description: 'Badge label that pops in beside "Annual" once the toggle is switched to annual.' },
        { name: 'popularLabel', type: 'string', defaultValue: "'Most popular'", description: 'Badge label on the plan flagged with isPopular.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn(), applied to the root section.' },
      ],
    },
    {
      title: 'PricingPlan',
      rows: [
        { name: 'id', type: 'string', description: 'Unique plan identifier.' },
        { name: 'name', type: 'string', description: 'Plan name shown in the card title.' },
        { name: 'description', type: 'string', description: 'Short plan summary below the name.' },
        { name: 'monthlyPrice', type: 'number | string', description: 'Price when billing is monthly — 0 renders as "Free".' },
        { name: 'annualPrice', type: 'number | string', description: 'Price when billing is annual.' },
        { name: 'priceSuffix', type: 'string', defaultValue: "'/mo'", description: 'Suffix after the price (hidden for free plans).' },
        { name: 'features', type: 'PricingFeature[]', description: 'Bullet list — plain strings render as included; pass { label, isIncluded: false } to dim a row with a strikethrough and a minus glyph.' },
        { name: 'ctaLabel', type: 'string', defaultValue: "'Get started'", description: 'Button label at the bottom of the card.' },
        { name: 'isPopular', type: 'boolean', defaultValue: 'false', description: 'Adds brand ring, popularLabel badge, and primary CTA styling.' },
      ],
    },
    {
      title: 'PricingFeature',
      rows: [
        { name: 'string', type: 'string', description: 'Shorthand for an included feature — renders with a check icon.' },
        { name: 'label', type: 'string', description: 'Feature text, used when passing the object form.' },
        { name: 'isIncluded', type: 'boolean', defaultValue: 'true', description: 'Set to false to render the row dimmed, struck through, with a minus glyph instead of a check.' },
      ],
    },
  ],
  features: [
    'Monthly/annual billing toggle built on the Foundation Switch; prices animate in with a fade + vertical slide on every toggle.',
    '`features` rows accept a plain string (always included) or `{ label, isIncluded }` — excluded rows render dimmed, struck through, with an inline minus glyph instead of a check.',
    'The annual-savings badge pops in beside "Annual" with a gated spring scale/opacity animation when the toggle switches to annual, and pops back out on switching to monthly.',
    '`isPopular` plans get a brand-colored ring, a `popularLabel` badge (default "Most popular"), and a primary CTA button.',
    'Header and each plan card reveal on scroll with a staggered fade/slide, gated behind `prefers-reduced-motion` (renders instantly, no motion, when reduced).',
  ],
  keyboard: [
    { keys: 'Tab / Shift + Tab', description: 'Moves focus between the billing switch and plan CTAs.' },
    { keys: 'Enter / Space', description: 'Toggles the billing switch when focused.' },
  ],
  aria: [
    { attribute: 'role="switch" / aria-checked', element: 'Billing toggle (Foundation Switch)', purpose: 'Exposes the monthly/annual state to assistive tech.' },
    { attribute: 'aria-label="{plan.name} features"', element: 'Feature <ul> per plan card', purpose: 'Names each plan\'s feature list for screen readers.' },
    { attribute: 'aria-labelledby="pricing-heading"', element: 'Root <section>', purpose: 'Associates the section landmark with its heading.' },
  ],
  a11yNotes: [
    'Excluded features are never conveyed by dimming alone — a screen-reader-only "(not included)" suffix follows the visible minus glyph and strikethrough text.',
    'Price and annual-savings-badge transitions respect prefers-reduced-motion and render with no motion when reduced.',
  ],
  sourceFiles: [
    'packages/ui/src/components/sections/pricing/pricing.tsx',
    'packages/ui/src/components/sections/pricing/index.ts',
  ],
};
