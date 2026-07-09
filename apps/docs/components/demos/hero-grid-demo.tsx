'use client';

import { HeroGrid } from '@varient/ui';

export function HeroGridDemo() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-border">
      <HeroGrid
        primaryCta={{ label: 'Browse library', href: '/components' }}
        secondaryCta={{ label: 'View docs', href: '/docs' }}
        stats={[
          { value: '75+', label: 'Components' },
          { value: '3', label: 'Layers' },
          { value: '0', label: 'Runtime deps' },
        ]}
        subtitle="Fine line-grid background with radial fade, subtle glow orbs, and staggered text entrance — a quiet, premium canvas for your headline."
        title="Precision grids, premium motion"
      />
    </div>
  );
}

export function HeroGridPreviewCompact() {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border border-border">
      <HeroGrid
        className="py-10"
        primaryCta={{ label: 'Start', href: '#' }}
        secondaryCta={{ label: 'Examples', href: '#' }}
        stats={[
          { value: '25', label: 'Foundation' },
          { value: '30', label: 'Animated' },
          { value: '20', label: 'Sections' },
        ]}
        subtitle="Grid canvas with staggered entrance."
        title="Build with confidence"
      />
    </div>
  );
}
