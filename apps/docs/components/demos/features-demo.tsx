'use client';

import { Features, type FeatureItem } from '@varient/ui';
import { Rocket, ShieldCheck, Sparkles, Wand2, Zap, GitBranch } from 'lucide-react';

const productFeatures: FeatureItem[] = [
  {
    icon: <Rocket className="size-4 text-brand" />,
    title: 'Deploy in seconds',
    description: 'Push straight to the edge with zero-config builds and instant rollbacks.',
  },
  {
    icon: <ShieldCheck className="size-4 text-brand" />,
    title: 'SOC 2 by default',
    description: 'Every workspace ships with audit logging and role-based access baked in.',
  },
  {
    icon: <Zap className="size-4 text-brand" />,
    title: 'Sub-50ms latency',
    description: 'A globally distributed edge network keeps requests close to your users.',
  },
  {
    icon: <GitBranch className="size-4 text-brand" />,
    title: 'Preview every branch',
    description: 'Each pull request gets an isolated environment with its own database snapshot.',
  },
];

const workflowFeatures: FeatureItem[] = [
  {
    icon: <Wand2 className="size-5 text-brand" />,
    title: 'Generate from a prompt',
    description:
      'Describe the flow you want and get a working scaffold — components, routes, and state wired together.',
  },
  {
    icon: <Sparkles className="size-5 text-brand" />,
    title: 'Polish with one click',
    description:
      'Run the polish pass to tighten spacing, motion, and copy against the design system automatically.',
  },
  {
    icon: <ShieldCheck className="size-5 text-brand" />,
    title: 'Ship with confidence',
    description:
      'Every generated section is accessible and reduced-motion safe before it ever reaches production.',
  },
];

export function FeaturesDemo() {
  return (
    <div className="flex w-full flex-col gap-16 bg-background">
      <Features
        eyebrow="Platform"
        title={
          <>
            Built for teams that{' '}
            <span className="text-brand">ship every day</span>
          </>
        }
        description="A grid of the capabilities engineering teams reach for most — infrastructure, security, and speed."
        features={productFeatures}
        layout="grid"
      />
      <Features
        eyebrow="Workflow"
        title={
          <>
            From idea to <span className="text-brand">production</span>, without the busywork
          </>
        }
        description="Split rows pair each capability with room to explain how it fits into your workflow."
        features={workflowFeatures}
        layout="split"
      />
    </div>
  );
}

export function FeaturesPreviewCompact() {
  return (
    <div className="w-full bg-background">
      <Features
        className="px-4 py-6 md:py-6"
        features={[
          {
            icon: <Rocket className="size-4 text-brand" />,
            title: 'Deploy in seconds',
            description: 'Zero-config builds with instant rollbacks.',
          },
          {
            icon: <ShieldCheck className="size-4 text-brand" />,
            title: 'SOC 2 by default',
            description: 'Audit logging and RBAC out of the box.',
          },
        ]}
        description="Infrastructure, security, and speed teams reach for daily."
        eyebrow="Platform"
        layout="grid"
        title="Built for teams that ship every day"
      />
    </div>
  );
}
