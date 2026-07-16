'use client';

import { BentoFeatures, type BentoFeatureItem } from '@varient/ui';
import { Zap, ShieldCheck, GitBranch, Layers3, Gauge } from 'lucide-react';

function IconVisual({ icon: Icon }: { icon: typeof Zap }) {
  return (
    <div
      aria-hidden
      className="flex h-full min-h-24 w-full items-center justify-center rounded-lg border border-border bg-muted/30"
    >
      <span className="flex size-11 items-center justify-center rounded-full border border-brand/30 bg-brand/10 text-brand">
        <Icon className="size-5" strokeWidth={1.75} />
      </span>
    </div>
  );
}

const customItems: BentoFeatureItem[] = [
  {
    title: 'Deploy in seconds',
    description: 'Ship straight from your CI pipeline with zero config drift between environments.',
    visual: <IconVisual icon={Zap} />,
    className: 'md:col-span-2',
  },
  {
    title: 'SOC 2 ready',
    description: 'Audit logs, SSO, and role-based access baked in from day one.',
    visual: <IconVisual icon={ShieldCheck} />,
    className: 'md:row-span-2',
  },
  {
    title: 'Branch previews',
    description: 'Every pull request gets an isolated preview environment automatically.',
    visual: <IconVisual icon={GitBranch} />,
    className: 'md:col-span-2',
  },
  {
    title: 'Composable layers',
    description: 'Foundation, animated, and section blocks that snap together.',
    visual: <IconVisual icon={Layers3} />,
  },
  {
    title: '99.99% uptime',
    description: 'Multi-region failover keeps requests flowing during incidents.',
    visual: <IconVisual icon={Gauge} />,
    className: 'md:col-span-2',
  },
];

export function BentoFeaturesDemo() {
  return (
    <div className="w-full bg-background">
      <BentoFeatures
        eyebrow="Platform"
        title={
          <>
            Everything you need to{' '}
            <span className="text-brand">ship with confidence</span>
          </>
        }
        description="Custom items with the visual slot API — swap icons, charts, or any ReactNode per card."
        items={customItems}
      />
    </div>
  );
}

export function BentoFeaturesPreviewCompact() {
  return (
    <div className="w-full bg-background">
      <BentoFeatures
        className="px-4 py-6 md:py-6"
        description="Highlight what makes your product different."
        eyebrow="Features"
        items={[
          {
            title: 'Deploy in seconds',
            description: 'Ship from CI with zero config drift.',
            visual: <IconVisual icon={Zap} />,
            className: 'md:col-span-2',
          },
          {
            title: 'SOC 2 ready',
            description: 'SSO and audit logs built in.',
            visual: <IconVisual icon={ShieldCheck} />,
          },
        ]}
        title="Built to ship fast"
      />
    </div>
  );
}
