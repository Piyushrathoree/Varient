'use client';

import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  components,
  getComponentsByLayer,
  getReadyCount,
  layerLabels,
  type ComponentLayer,
} from '@/lib/components/registry';
import { ComponentCard } from '@/components/preview/component-card';
import { cn } from '@varient/ui';

const filters: { id: ComponentLayer | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'foundation', label: 'Foundation' },
  { id: 'animated', label: 'Animated' },
  { id: 'sections', label: 'Sections' },
];

export function ComponentsGallery() {
  const [activeFilter, setActiveFilter] = useState<ComponentLayer | 'all'>('all');
  const filtered = useMemo(() => getComponentsByLayer(activeFilter), [activeFilter]);

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-20">
      {/* Header */}
      <div className="mb-14">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-400">Library</p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
          Components
        </h1>
        <p className="mt-4 max-w-lg text-text-secondary">
          {components.length} components across three layers.{' '}
          <span className="font-medium text-text-primary">{getReadyCount()} ready</span> to copy —
          the rest are shipping soon.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-10 flex flex-wrap gap-2.5">
        {filters.map((filter) => {
          const count =
            filter.id === 'all' ? components.length : getComponentsByLayer(filter.id).length;
          const isActive = activeFilter === filter.id;

          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                'inline-flex items-center gap-2.5 rounded-xl border px-5 py-2 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'border-brand-500 bg-brand-500 text-white shadow-[0_0_12px_rgb(99_102_241/0.3)]'
                  : 'border-border bg-bg-base text-text-secondary hover:border-border-strong hover:bg-bg-subtle hover:text-text-primary',
              )}
            >
              {filter.id === 'all' ? 'All' : layerLabels[filter.id]}
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.5 text-xs',
                  isActive ? 'bg-white/20 text-white' : 'bg-bg-muted text-text-tertiary',
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <motion.div
        key={activeFilter}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] as const }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((entry) => (
          <ComponentCard key={`${entry.layer}-${entry.slug}`} entry={entry} />
        ))}
      </motion.div>
    </div>
  );
}
