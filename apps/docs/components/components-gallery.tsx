'use client';

import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Tabs, cn } from '@varient/ui';
import {
  components,
  getComponentsByLayer,
  getReadyCount,
  layerLabels,
  type ComponentLayer,
} from '@/lib/components/registry';
import { ComponentCard } from '@/components/preview/component-card';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

type Filter = ComponentLayer | 'all';

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'foundation', label: layerLabels.foundation },
  { id: 'animated', label: layerLabels.animated },
  { id: 'sections', label: layerLabels.sections },
];

export function ComponentsGallery() {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const filtered = useMemo(() => getComponentsByLayer(activeFilter), [activeFilter]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:py-20">
      {/* Header */}
      <div className="mb-12">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Library
        </p>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Components
        </h1>
        <p className="mt-4 max-w-lg text-muted-foreground">
          <span className="font-mono text-foreground">{components.length}</span> components
          across three layers —{' '}
          <span className="font-medium text-foreground">{getReadyCount()} shipped</span> and
          ready to copy. The rest are on the way.
        </p>
      </div>

      {/* Layer filter — the shared Tabs primitive, not a one-off button row */}
      <Tabs
        value={activeFilter}
        onValueChange={(value) => setActiveFilter(value as Filter)}
        variant="pills"
        className="mb-10"
      >
        <Tabs.List aria-label="Filter components by layer" className="flex-wrap">
          {filters.map((filter) => {
            const count =
              filter.id === 'all' ? components.length : getComponentsByLayer(filter.id).length;
            const isActive = activeFilter === filter.id;

            return (
              <Tabs.Trigger key={filter.id} value={filter.id} className="gap-2">
                {filter.label}
                <span
                  className={cn(
                    'rounded-full px-1.5 py-0.5 font-mono text-[10px]',
                    isActive ? 'bg-background/20 text-current' : 'bg-muted text-muted-foreground',
                  )}
                >
                  {count}
                </span>
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>
      </Tabs>

      {/* Grid — re-keyed per filter so the swap reads as a deliberate reflow */}
      <motion.div
        key={activeFilter}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((entry) => (
          <ComponentCard key={`${entry.layer}-${entry.slug}`} entry={entry} />
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-sm text-muted-foreground">
          No components in this layer yet.
        </p>
      )}
    </div>
  );
}
