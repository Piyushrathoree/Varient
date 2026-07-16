import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { HeroSpotlight } from '@varient/ui'\n\n<HeroSpotlight\n  title="Ship interfaces that feel alive"\n  highlightWord="alive"\n  subtitle="Dark hero with sweeping spotlight beam and dual CTAs."\n  announcement={{ badge: 'New', label: 'Hero Spotlight is live', href: '/components' }}\n  primaryCta={{ label: 'Browse components', href: '/components' }}\n  secondaryCta={{ label: 'Read docs', href: '/docs' }}\n/>`,
  props: [
    {
      title: 'HeroSpotlight',
      rows: [
        { name: 'title', type: 'string', defaultValue: "'Ship interfaces that feel alive'", description: 'Display headline — rendered as the page h1.' },
        { name: 'highlightWord', type: 'string', defaultValue: "'alive'", description: 'Word within `title` rendered in brand accent — matched on a whole-word boundary only.' },
        { name: 'subtitle', type: 'string', defaultValue: '(see source)', description: 'One-paragraph subhead below the title.' },
        { name: 'announcement', type: '{ badge?: string; label: string; href?: string }', defaultValue: '(see source)', description: 'Optional announcement pill above the headline.' },
        { name: 'primaryCta', type: '{ label: string; href: string }', defaultValue: "{ label: 'Browse components', href: '#components' }", description: 'Primary brand button.' },
        { name: 'secondaryCta', type: '{ label: string; href: string }', defaultValue: "{ label: 'View docs', href: '#docs' }", description: 'Secondary outline button beside the primary CTA.' },
        { name: 'isAmbient', type: 'boolean', defaultValue: 'false', description: 'Keep the conic spotlight beam sweeping forever instead of settling after one pass. Off by default; opt in for a perpetual loop that auto-pauses while the section is scrolled offscreen.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn(), applied to the root section.' },
      ],
    },
  ],
  features: [
    'Forced-dark `.dark`-scoped canvas: the section always renders on a true-black surface in both light and dark site themes, never inverting.',
    'Conic spotlight beam sweeps once on mount and settles at its resting angle by design law; `isAmbient` opts into a perpetual sweep that pauses automatically via `useViewportActive` while scrolled offscreen.',
    '`highlightWord` matches only whole-word occurrences inside `title` (word-boundary regex) so partial substrings like "motion" inside "motionless" are never highlighted.',
    'Announcement pill supports an optional shimmer sweep on its badge, an optional link wrapper, and is fully keyboard-focusable with a visible focus ring.',
    'Entrance content fades/slides in with a spring-friendly ease; everything collapses to an instant, static reveal under `prefers-reduced-motion`.',
  ],
  aria: [
    { attribute: 'aria-labelledby', element: 'section (root)', purpose: 'Associates the section with its h1 headline for landmark navigation.' },
    { attribute: 'aria-hidden', element: 'spotlight beam + gradient overlays', purpose: 'Decorative motion layers are hidden from assistive tech and ignore pointer events.' },
  ],
  a11yNotes: [
    'CTA links render as native anchors inside `Button asChild`, keyboard-reachable with a visible `focus-visible` ring offset against the forced-dark canvas.',
    'Under `prefers-reduced-motion`, the beam renders as a static gradient, entrance motion is instant, and the announcement shimmer is omitted.',
  ],
  sourceFiles: [
    'packages/ui/src/components/sections/hero-spotlight/hero-spotlight.tsx',
    'packages/ui/src/components/sections/hero-spotlight/index.ts',
  ],
};
