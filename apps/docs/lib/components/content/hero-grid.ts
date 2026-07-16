import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { HeroGrid } from '@varient/ui';

export function LandingPage() {
  return (
    <HeroGrid
      title="Precision grids, premium motion"
      subtitle="Fine line-grid canvas with radial fade and staggered entrance."
      primaryCta={{ label: 'Start building', href: '#start' }}
      secondaryCta={{ label: 'See examples', href: '#examples' }}
      stats={[
        { value: '75+', label: 'Components' },
        { value: '3', label: 'Layers' },
        { value: '0', label: 'Runtime deps' },
      ]}
    />
  );
}`,
  props: [
    {
      title: 'HeroGrid',
      rows: [
        {
          name: 'title',
          type: 'string',
          defaultValue: '(see source)',
          description: 'Display headline — rendered as the page h1.',
        },
        {
          name: 'subtitle',
          type: 'string',
          defaultValue: '(see source)',
          description: 'One-paragraph subhead below the title.',
        },
        {
          name: 'primaryCta',
          type: '{ label: string; href: string }',
          defaultValue: '(see source)',
          description: 'Primary brand button.',
        },
        {
          name: 'secondaryCta',
          type: '{ label: string; href: string }',
          defaultValue: '(see source)',
          description: 'Secondary outline button.',
        },
        {
          name: 'stats',
          type: '{ value: string; label: string }[]',
          defaultValue: '(see source)',
          description:
            'Optional metrics row beneath the CTAs. Collapses to a single stacked column below `sm`, three columns from `sm` up. Pass `[]` to hide.',
        },
        {
          name: 'backgroundSlot',
          type: 'ReactNode',
          description:
            'Replaces the default line-grid + glow-orb backdrop entirely — pass an image, video, solid tint, or custom canvas so the hero stops competing with a page\'s existing Hero background.',
        },
        {
          name: 'isAmbient',
          type: 'boolean',
          defaultValue: 'false',
          description:
            'Opt in to a perpetual float loop on the background glow orbs (auto-paused offscreen via useViewportActive). Default false: orbs drift once into their resting position on mount and hold.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn(), applied to the root <section>.',
        },
      ],
    },
  ],
  features: [
    'Fine SVG line-grid backdrop (GridPattern) with a radial fade mask so the grid dissolves toward the edges instead of hard-cutting.',
    'Three background glow orbs drift once into their resting position on mount and hold — no perpetual loop by default, per section design law. Set isAmbient to opt into a slow perpetual float, which auto-pauses while the hero is scrolled offscreen.',
    'backgroundSlot lets you swap the entire grid + orb backdrop for a custom node (image, video, solid tint) so the hero does not visually compete with a page\'s primary Hero.',
    'Title, subtitle, CTA pair, and stats row stagger in on mount via a shared Framer Motion variants tree.',
    'Optional stats row (pass stats=[] to omit) collapses to one stacked, divider-separated column below sm and expands to three columns from sm up.',
    'Fully respects prefers-reduced-motion: entrance stagger, grid pan, and orb motion all collapse to static, immediately-visible content.',
  ],
  aria: [
    {
      attribute: 'aria-labelledby',
      element: '<section>',
      purpose: 'Root section is labelled by the generated id on the h1 headline.',
    },
    {
      attribute: 'aria-hidden',
      element: 'background layer (grid, fade mask, glow orbs / backgroundSlot)',
      purpose: 'All decorative backdrop content is hidden from assistive tech and excluded from the accessible tree.',
    },
    {
      attribute: 'pointer-events-none',
      element: 'background layer',
      purpose: 'Backdrop never intercepts pointer interaction with foreground content.',
    },
  ],
  a11yNotes: [
    'Under prefers-reduced-motion, the entrance stagger is skipped (content renders immediately) and glow orbs render as static, motionless fills instead of animating.',
    'Both CTA links carry a visible focus-visible ring (ring-2, offset from the background) for keyboard navigation.',
  ],
  sourceFiles: [
    'packages/ui/src/components/sections/hero-grid/hero-grid.tsx',
    'packages/ui/src/components/sections/hero-grid/index.ts',
  ],
};
