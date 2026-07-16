import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Cta } from '@varient/ui'

<Cta
  eyebrow="Varient Pro"
  title="Ready to get started"
  description="Copy components directly into your project. No runtime dependency — you own every line."
  primaryCta={{ label: 'Browse components', href: '/components' }}
  secondaryCta={{ label: 'View on GitHub', href: 'https://github.com' }}
  secondaryCtaEmphasis="ghost"
  socialProof={{
    avatars: [{ src: '/avatars/1.png' }, { src: '/avatars/2.png' }],
    text: 'Trusted by 2,400+ engineering teams',
  }}
/>`,
  props: [
    {
      title: 'Cta',
      rows: [
        { name: 'eyebrow', type: 'string', description: 'Small label rendered above the title, e.g. a product name or "Limited time".' },
        { name: 'title', type: 'string', defaultValue: "'Ready to get started'", description: 'Centered headline inside the banner.' },
        { name: 'description', type: 'string', defaultValue: '(see source)', description: 'Supporting copy below the title.' },
        { name: 'primaryCta', type: '{ label: string; href: string }', defaultValue: "'Browse components'", description: 'Primary brand button — always rendered.' },
        { name: 'secondaryCta', type: '{ label: string; href: string }', description: 'Optional button beside the primary CTA.' },
        { name: 'secondaryCtaEmphasis', type: "'outline' | 'ghost' | 'link'", defaultValue: "'outline'", description: 'Visual weight of the secondary action button.' },
        { name: 'socialProof', type: '{ avatars?: { src: string; alt?: string }[]; text: string }', description: 'Optional avatar stack + trust line rendered below the actions.' },
        { name: 'variant', type: "'default' | 'brand' | 'minimal'", defaultValue: "'default'", description: 'Surface style — neutral card, brand gradient border, or borderless.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn(), applied to the root section wrapper.' },
      ],
    },
  ],
  features: [
    'Three surface variants: `default` (card), `brand` (gradient border rim), and `minimal` (borderless, for pages with enough surfaces already).',
    'Optional `eyebrow` label above the title for product names or urgency copy.',
    'Optional `socialProof` slot renders an overlapping avatar stack (up to 5) plus a trust line below the actions.',
    'Secondary action supports three emphasis levels via `secondaryCtaEmphasis` — outline, ghost, or link — decoupled from the primary variant.',
    'Scroll-reveal entrance animates once via `whileInView` and is fully skipped under `prefers-reduced-motion`.',
  ],
  keyboard: [
    { keys: 'Tab / Shift + Tab', description: 'Moves focus to the CTA link(s).' },
    { keys: 'Enter', description: 'Activates the focused link.' },
  ],
  aria: [
    { attribute: 'aria-labelledby', element: 'section', purpose: 'Associates the banner with its h2 heading for assistive tech.' },
    { attribute: 'aria-hidden="true"', element: 'avatar stack', purpose: 'Avatars are decorative; the adjacent text line already conveys the trust signal.' },
  ],
  a11yNotes: [
    'The root is a native `<section>` element labelled by the heading, not a generic div.',
    'Both CTA buttons render as real `<a>` elements via `Button asChild`, so they are reachable and activatable with standard link semantics.',
    'The entrance animation is gated behind `useReducedMotion()` — reduced-motion users see the banner at full opacity immediately, no y-offset or fade.',
  ],
  sourceFiles: [
    'packages/ui/src/components/sections/cta/cta.tsx',
    'packages/ui/src/components/sections/cta/index.ts',
  ],
};
