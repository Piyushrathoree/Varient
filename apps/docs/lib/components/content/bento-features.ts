import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { BentoFeatures, type BentoFeatureItem } from '@varient/ui';
import { Zap, ShieldCheck } from 'lucide-react';

const items: BentoFeatureItem[] = [
  {
    title: 'Deploy in seconds',
    description: 'Ship from CI with zero config drift between environments.',
    visual: <Zap className="size-5 text-brand" />,
    className: 'md:col-span-2',
  },
  {
    title: 'SOC 2 ready',
    description: 'Audit logs, SSO, and role-based access built in.',
    visual: <ShieldCheck className="size-5 text-brand" />,
  },
];

export function LandingSection() {
  return (
    <BentoFeatures
      eyebrow="Platform"
      title={<>Ship with <span className="text-brand">confidence</span></>}
      description="Custom items with the visual slot API."
      items={items}
    />
  );
}`,
  props: [
    {
      title: 'BentoFeatures',
      rows: [
        { name: 'eyebrow', type: 'string', defaultValue: "'Features'", description: 'Small brand-colored label above the section title.' },
        { name: 'title', type: 'ReactNode', description: 'Section headline — defaults to a title with a brand-colored span.' },
        { name: 'description', type: 'string', description: 'One-line supporting copy below the title.' },
        { name: 'items', type: 'BentoFeatureItem[]', defaultValue: 'defaultBentoItems', description: 'Feature cards — each can set className for col/row spans in the bento grid.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn(), applied to the root section.' },
      ],
    },
    {
      title: 'BentoFeatureItem',
      rows: [
        { name: 'title', type: 'string', description: 'Card headline.' },
        { name: 'description', type: 'string', description: 'Supporting copy below the title.' },
        { name: 'visual', type: 'ReactNode', description: 'Optional visual slot — defaults to a built-in mini-illustration cycled by card index (window frame, diagram, stat, layers, sparkline, motion dots).' },
        { name: 'className', type: 'string', description: 'Grid placement classes, e.g. md:col-span-2 or md:row-span-2.' },
      ],
    },
  ],
  features: [
    'Asymmetric bento grid (`auto-rows-[minmax(160px,auto)]`, 3-column on md+) where each `BentoFeatureItem.className` controls its own col/row span.',
    'Six token-styled default mini-illustrations (window frame with dots, box diagram, stat counter, layered planes, sparkline chart, motion dots) cycle by card index when no `visual` is supplied — no gray placeholder boxes.',
    'The heading id is generated with `useId()`, so multiple `BentoFeatures` instances on one page never collide on `aria-labelledby`.',
    'Cards and header scroll-reveal once via `whileInView` (`viewport: { once: true }`) — no perpetual looping motion, matching the section-layer motion budget.',
    'Every animation is skipped under `prefers-reduced-motion` — cards and header render in their final state with no initial/whileInView transform.',
    'Each card is a Foundation `Card` with `isHoverable`, so hover/press affordances stay consistent with the rest of the library.',
  ],
  a11yNotes: [
    'The root `<section>` is labelled via `aria-labelledby` pointing at a `useId()`-generated heading id, so it never collides across multiple instances on the same page.',
    'Default visual mini-illustrations are `aria-hidden` — they are decorative and never carry content that only exists inside them.',
    'Custom `visual` nodes with real interactive content (e.g. icons wrapped in a link) remain keyboard-reachable via normal Tab order; the grid imposes no extra tabindex or focus trapping.',
  ],
  sourceFiles: [
    'packages/ui/src/components/sections/bento-features/bento-features.tsx',
    'packages/ui/src/components/sections/bento-features/index.ts',
  ],
};
