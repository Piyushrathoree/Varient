'use client';

import { useMemo, useState } from 'react';
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
  const filtered = useMemo(
    () => getComponentsByLayer(activeFilter),
    [activeFilter],
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="mb-10 max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-wider text-brand-500">Library</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Components
        </h1>
        <p className="mt-3 text-text-secondary">
          Browse {components.length} components across three layers.{' '}
          <span className="text-text-primary">{getReadyCount()} ready</span> to copy — the rest
          are shipping soon.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((filter) => {
          const count =
            filter.id === 'all'
              ? components.length
              : getComponentsByLayer(filter.id).length;

          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                activeFilter === filter.id
                  ? 'border-brand-500 bg-brand-500 text-neutral-0'
                  : 'border-border bg-bg-base text-text-secondary hover:bg-bg-subtle hover:text-text-primary',
              )}
            >
              {filter.id === 'all' ? 'All' : layerLabels[filter.id]}
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.5 text-xs',
                  activeFilter === filter.id
                    ? 'bg-neutral-0/20 text-neutral-0'
                    : 'bg-bg-muted text-text-tertiary',
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((entry) => (
          <ComponentCard key={`${entry.layer}-${entry.slug}`} entry={entry} />
        ))}
      </div>
    </div>
  );
}
