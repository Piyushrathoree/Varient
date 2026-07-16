import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { IntegrationGrid } from '@varient/ui'

<IntegrationGrid
  eyebrow="Integrations"
  title="Connect the tools you already use"
  description="Plug into your stack in minutes."
  integrations={[
    {
      name: 'GitHub',
      description: 'Sync issues and pull requests',
      href: 'https://github.com',
    },
    {
      name: 'Linear',
      description: 'Track issues and roadmaps',
      badge: 'New',
      href: 'https://linear.app',
    },
  ]}
/>`,
  props: [
    {
      title: 'IntegrationGrid',
      rows: [
        {
          name: 'eyebrow',
          type: 'string',
          defaultValue: "'Integrations'",
          description: 'Small brand-colored label above the section title.',
        },
        {
          name: 'title',
          type: 'string',
          defaultValue: "'Connect the tools you already use'",
          description: 'Section headline.',
        },
        {
          name: 'description',
          type: 'string',
          defaultValue: "'Plug into your stack in minutes — no custom glue code required.'",
          description: 'One-line supporting copy below the title.',
        },
        {
          name: 'integrations',
          type: 'Integration[]',
          description: 'Grid items — each needs a name; description, icon, href, and badge are optional.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn(), applied to the root section.',
        },
      ],
    },
    {
      title: 'Integration',
      rows: [
        { name: 'name', type: 'string', description: 'Integration display name.' },
        { name: 'description', type: 'string', description: 'One-line summary shown under the name.' },
        {
          name: 'icon',
          type: 'ReactNode',
          description: 'Custom icon — a hand-drawn inline SVG placeholder renders when omitted.',
        },
        {
          name: 'href',
          type: 'string',
          description: 'When set, the tile becomes an outbound link that opens in a new tab.',
        },
        {
          name: 'badge',
          type: 'string',
          description: 'Optional status label (e.g. "New", "Beta") rendered as a Badge in the tile corner.',
        },
      ],
    },
  ],
  features: [
    '8 built-in inline SVG glyph placeholders (GitHub, Slack, Figma, Notion, Linear, Stripe, Vercel, Sentry) cycle by index when no custom icon is passed, sharing the 1.5 stroke weight used by the logo-cloud marks.',
    'Tiles with an href render as a single focusable outbound link (rel="noopener noreferrer") wrapping the whole card; tiles without href render as a plain article.',
    'Each tile carries a visually-hidden heading for its integration name so the grid is heading-navigable, matching the semantic discipline used by team-grid.',
    'Optional per-item badge renders as a warning Badge for "Beta" and a primary Badge otherwise (e.g. "New").',
    'Scroll-reveal entrance staggers per tile, gated behind prefers-reduced-motion — reduced-motion users see the grid immediately with no fade or stagger.',
  ],
  aria: [
    {
      attribute: 'aria-labelledby',
      element: '<section>',
      purpose: 'Points at the heading id so the section is announced by its title.',
    },
    {
      attribute: 'aria-label',
      element: 'Tile <a> (when href set)',
      purpose: 'Combines integration name and description into one descriptive link label.',
    },
    {
      attribute: 'sr-only <h3>',
      element: 'Tile heading',
      purpose: 'Gives every tile a real heading for screen-reader heading navigation; the matching visible label is aria-hidden to avoid double announcement.',
    },
  ],
  a11yNotes: [
    'Decorative placeholder SVG glyphs are aria-hidden.',
    'Focus rings use focus-visible:ring-2 with a ring-offset, visible on both link and non-link tiles.',
  ],
  sourceFiles: [
    'packages/ui/src/components/sections/integration-grid/integration-grid.tsx',
    'packages/ui/src/components/sections/integration-grid/index.ts',
  ],
};
