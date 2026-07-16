import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { BentoShowcase, BentoShowcaseCard } from '@varient/ui'

<BentoShowcase>
  <BentoShowcaseCard
    colSpan={2}
    title="Wide feature"
    description="Background slot + hover footer."
    background={<div className="h-full bg-gradient-to-br from-brand/15 to-muted" />}
    footer={<span className="text-sm font-medium text-brand">Learn more →</span>}
  />
  <BentoShowcaseCard title="Standard cell" description="Single column." />
</BentoShowcase>`,
  props: [
    {
      title: 'BentoShowcase',
      rows: [
        {
          name: 'className',
          type: 'string',
          description: 'Grid layout classes (default: 1 col mobile, 3 col md).',
        },
        { name: 'children', type: 'ReactNode', description: 'BentoShowcaseCard instances.' },
      ],
    },
    {
      title: 'BentoShowcaseCard',
      rows: [
        { name: 'title', type: 'ReactNode', description: 'Card heading.' },
        {
          name: 'description',
          type: 'ReactNode',
          description: 'Supporting copy below the title.',
        },
        { name: 'icon', type: 'ReactNode', description: 'Optional icon in a brand-tinted chip.' },
        {
          name: 'background',
          type: 'ReactNode',
          description: 'Decorative layer mounted behind card content.',
        },
        {
          name: 'footer',
          type: 'ReactNode',
          description: 'Footer slot — slides up on hover (e.g. CTA link).',
        },
        {
          name: 'colSpan',
          type: '1 | 2 | 3',
          defaultValue: '1',
          description: 'Column span on md+ breakpoints.',
        },
        {
          name: 'rowSpan',
          type: '1 | 2',
          defaultValue: '1',
          description: 'Row span on md+ breakpoints.',
        },
        {
          name: 'dimOpacity',
          type: 'number',
          defaultValue: '0.55',
          description: 'Opacity applied to sibling cards while another card in the grid is hovered.',
        },
        { name: 'className', type: 'string', description: 'Cell surface overrides.' },
      ],
    },
  ],
  features: [
    'Staggered whileInView entrance for cells (once, -80px margin).',
    'Group hover dimming — hovering one card dims siblings; strength tunable via dimOpacity.',
    'Hover-reveal footer slot that slides up and fades in.',
    'Optional decorative background slot per card, mounted behind content.',
    'Reduced-motion renders cells statically at full opacity with no dimming or stagger.',
  ],
  a11yNotes: [
    'Cards use semantic heading (h3) and paragraph text for screen readers.',
    'Hover-reveal footers are always visible under prefers-reduced-motion via motion-reduce utilities.',
    'Group dimming and staggered entrance are disabled under reduced motion.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/bento-showcase/bento-showcase.tsx',
    'packages/ui/src/components/animated/bento-showcase/index.ts',
  ],
};
