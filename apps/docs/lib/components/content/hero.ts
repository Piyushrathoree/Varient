import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Hero } from '@varient/ui'

<Hero
  title="Animated components for web and native"
  subtitle="Copy-paste React components with real motion built in."
  announcement={{
    badge: '25+',
    label: 'components shipped, more every week',
    href: '/components',
  }}
  primaryCta={{ label: 'Explore components', href: '/components' }}
  secondaryCta={{ label: 'Read the docs', href: '/docs' }}
  builtWith={['Next.js', 'React', 'Tailwind CSS', 'Motion']}
/>`,
  props: [
    {
      title: 'Hero',
      rows: [
        { name: 'title', type: 'string', defaultValue: "'Animated components you can copy and own'", description: 'Display headline — rendered as the page h1.' },
        { name: 'subtitle', type: 'string', defaultValue: '(see source)', description: 'One-paragraph subhead below the title.' },
        { name: 'announcement', type: '{ badge?: string; label: string; href?: string } | null', defaultValue: '(see source)', description: 'Announcement pill above the headline. `badge` is the brand-tinted chip; `label` is the trailing copy. `href` makes the pill a link. Pass `null` to hide it.' },
        { name: 'primaryCta', type: '{ label: string; href: string }', defaultValue: "'Browse components'", description: 'Primary brand button — top of the CTA pair.' },
        { name: 'secondaryCta', type: '{ label: string; href: string }', defaultValue: "'Read the docs'", description: 'Secondary outline button beside the primary CTA.' },
        { name: 'builtWith', type: 'string[]', defaultValue: "['Next.js', 'React', 'Tailwind CSS', 'Motion']", description: 'Tech stack names in the "built with" row. Pass an empty array to hide.' },
        { name: 'visual', type: 'ReactNode', description: 'Replaces the default right-side component showcase grid.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn(), applied to the root section.' },
      ],
    },
  ],
  features: [
    'Two-column landing layout (`lg:grid-cols-2`) that stacks to a single column below `lg`.',
    'Right column defaults to a live component showcase grid built from real Card, Badge, Switch, Input, and NumberTicker primitives — not a screenshot — and collapses to one column below `sm` so it stays legible on narrow phones.',
    'Pass `visual` to swap the showcase grid for your own node (product screenshot, chart, custom mock).',
    'Announcement pill shimmer sweeps once on mount, then replays once per hover — never a perpetual loop. Skipped entirely under `prefers-reduced-motion`.',
    'Pass `announcement={null}` to hide the pill, or `builtWith={[]}` to hide the tech-stack row.',
    'Entrance motion (content fade/slide-up, visual fade/slide-in) is fully skipped under `prefers-reduced-motion` — content appears immediately.',
  ],
  keyboard: [
    { keys: 'Tab / Shift + Tab', description: 'Moves focus through the announcement link, CTA buttons, and interactive elements in the visual grid.' },
    { keys: 'Enter / Space', description: 'Activates the focused link or button.' },
  ],
  aria: [
    { attribute: 'aria-labelledby', element: 'section', purpose: 'Associates the root section with its h1 heading for assistive tech.' },
    { attribute: 'aria-hidden="true"', element: 'shimmer overlay + arrow icon', purpose: 'Decorative sweep and directional arrow inside the announcement pill are hidden from the accessibility tree.' },
  ],
  a11yNotes: [
    'The root is a native `<section>` element labelled by the h1 via `aria-labelledby`, not a generic div.',
    'CTA links render as real `<a>` elements via `Button asChild`, so they stay keyboard-focusable with visible focus rings.',
    'Entrance and shimmer animations are gated behind `useReducedMotion()` — reduced-motion users see content at full opacity immediately, with no shimmer sweep.',
  ],
  sourceFiles: [
    'packages/ui/src/components/sections/hero/hero.tsx',
    'packages/ui/src/components/sections/hero/index.ts',
  ],
};
