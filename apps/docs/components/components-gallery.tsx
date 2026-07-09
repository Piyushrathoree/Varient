'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Search, X } from 'lucide-react';
import { Input, cn } from '@varient/ui';
import {
  categoryDescriptions,
  components,
  getComponentsGroupedByCategory,
  getCategoryAnchorId,
  getReadyCount,
  layerLabels,
  type ComponentLayer,
  type LayerCategoryGroup,
} from '@/lib/components/registry';
import { ComponentCard } from '@/components/preview/component-card';
import { useGalleryNav } from '@/components/site/gallery-nav-context';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

function filterGroups(groups: LayerCategoryGroup[], query: string): LayerCategoryGroup[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return groups;

  return groups
    .map((group) => ({
      ...group,
      entries: group.entries.filter(
        (entry) =>
          entry.name.toLowerCase().includes(trimmed) ||
          entry.description.toLowerCase().includes(trimmed) ||
          entry.category.toLowerCase().includes(trimmed),
      ),
    }))
    .filter((group) => group.entries.length > 0);
}

function CategorySection({
  group,
  index,
  prefersReducedMotion,
}: {
  group: LayerCategoryGroup;
  index: number;
  prefersReducedMotion: boolean;
}) {
  const anchorId = getCategoryAnchorId(group.layer, group.category);
  const isSections = group.layer === 'sections';
  const description = categoryDescriptions[group.layer][group.category];

  return (
    <motion.section
      id={anchorId}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.35,
        delay: prefersReducedMotion ? 0 : Math.min(index * 0.04, 0.24),
        ease: [0.16, 1, 0.3, 1],
      }}
      className="scroll-mt-28"
    >
      <div className="mb-6 flex flex-col gap-2 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            {layerLabels[group.layer]}
          </p>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {group.category}
          </h2>
          {description && (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        <span className="shrink-0 font-mono text-xs text-brand">
          {group.entries.length} component{group.entries.length === 1 ? '' : 's'}
        </span>
      </div>

      <div
        className={cn(
          'grid gap-5',
          isSections ? 'grid-cols-1 lg:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3',
        )}
      >
        {group.entries.map((entry) => (
          <ComponentCard
            key={`${entry.layer}-${entry.slug}`}
            entry={entry}
            size={isSections ? 'wide' : 'compact'}
          />
        ))}
      </div>
    </motion.section>
  );
}

export function ComponentsGallery() {
  const [query, setQuery] = useState('');
  const { setActiveAnchor } = useGalleryNav();
  const prefersReducedMotion = useReducedMotion();
  const observerRef = useRef<IntersectionObserver | null>(null);

  const allGroups = useMemo(() => getComponentsGroupedByCategory(), []);
  const filteredGroups = useMemo(() => filterGroups(allGroups, query), [allGroups, query]);
  const totalFiltered = useMemo(
    () => filteredGroups.reduce((sum, group) => sum + group.entries.length, 0),
    [filteredGroups],
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sectionElements = filteredGroups
      .map((group) => document.getElementById(getCategoryAnchorId(group.layer, group.category)))
      .filter((element): element is HTMLElement => element !== null);

    if (sectionElements.length === 0) return;

    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveAnchor(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.15, 0.35, 0.55],
      },
    );

    for (const element of sectionElements) {
      observerRef.current.observe(element);
    }

    return () => observerRef.current?.disconnect();
  }, [filteredGroups, setActiveAnchor]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const target = document.getElementById(hash);
    if (!target) return;

    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      setActiveAnchor(hash);
    });
  }, [prefersReducedMotion, setActiveAnchor]);

  return (
    <div className="px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12"
      >
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Library
        </p>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Components
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          <span className="font-mono text-foreground">{components.length}</span> components across{' '}
          {Object.keys(layerLabels).length} layers —{' '}
          <span className="font-medium text-foreground">{getReadyCount()} shipped</span> and ready
          to copy.
        </p>

        <div className="relative mt-8 max-w-md">
          <Search
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search components…"
            aria-label="Search components"
            className="pl-9 pr-9"
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setQuery('')}
              className="absolute top-1/2 right-2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="size-3.5" aria-hidden />
            </button>
          )}
        </div>
      </motion.div>

      {filteredGroups.length === 0 ? (
        <p className="py-20 text-center text-sm text-muted-foreground">
          No components match &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <div className="flex flex-col gap-16 sm:gap-20">
          {filteredGroups.map((group, index) => {
            const showLayerHeading =
              index === 0 || filteredGroups[index - 1]?.layer !== group.layer;

            return (
              <div key={`${group.layer}-${group.category}`} className="flex flex-col gap-10">
                {showLayerHeading && (
                  <div className="flex items-center gap-3">
                    <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-foreground/80">
                      {(layerLabels as Record<ComponentLayer, string>)[group.layer]}
                    </h2>
                    <div className="h-px flex-1 bg-border" aria-hidden />
                  </div>
                )}
                <CategorySection
                  group={group}
                  index={index}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </div>
            );
          })}
        </div>
      )}

      {query && totalFiltered > 0 && (
        <p className="mt-10 text-center font-mono text-xs text-muted-foreground">
          Showing {totalFiltered} of {components.length} components
        </p>
      )}
    </div>
  );
}
