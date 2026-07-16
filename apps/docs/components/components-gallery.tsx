'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Search, X } from 'lucide-react';
import { Input, Kbd, ToggleGroup, cn } from '@varient/ui';
import {
  categoryDescriptions,
  components,
  getComponentBySlug,
  getComponentHref,
  getComponentsGroupedByCategory,
  getCategoryAnchorId,
  getReadyCount,
  layerCategories,
  layerLabels,
  type ComponentEntry,
  type ComponentLayer,
  type LayerCategoryGroup,
} from '@/lib/components/registry';
import { ComponentCard } from '@/components/preview/component-card';
import { PreviewFrame } from '@/components/preview/preview-frame';
import { LazyMount } from '@/components/preview/lazy-mount';
import { getDemo } from '@/lib/components/demos';
import { useGalleryNav, type GalleryLayerFilter } from '@/components/site/gallery-nav-context';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

/** Editorial leads for the unfiltered "All" view — wow-first, live, clickable. */
const SPOTLIGHT_SLUGS = ['dock', 'hero-highlight', 'globe'] as const;

const layerFilterOptions: { value: GalleryLayerFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'foundation', label: 'Foundation' },
  { value: 'animated', label: 'Animated' },
  { value: 'sections', label: 'Sections' },
];

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background';

function filterGroupsByQuery(groups: LayerCategoryGroup[], query: string): LayerCategoryGroup[] {
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

function SpotlightTile({ entry, lead }: { entry: ComponentEntry; lead?: boolean }) {
  const href = getComponentHref(entry);
  const CompactDemo = getDemo(entry.slug, true);

  const tile = (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-[transform,border-color,box-shadow] duration-200 motion-reduce:transition-none motion-reduce:hover:translate-y-0 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg">
      <PreviewFrame minHeight={lead ? 'lg' : 'md'} alignTop={false} className="rounded-none border-0">
        <LazyMount minHeight={lead ? 320 : 200}>{CompactDemo ? <CompactDemo /> : null}</LazyMount>
      </PreviewFrame>
      <div className="flex items-center justify-between gap-2 border-t border-border p-4">
        <span className="font-display font-semibold text-foreground">{entry.name}</span>
        {href && (
          <span className="inline-flex items-center gap-1 text-sm font-medium text-brand opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            Open ↗
          </span>
        )}
      </div>
    </div>
  );

  if (!href) return tile;

  return (
    <Link href={href} className={cn('block h-full rounded-2xl', focusRing)}>
      {tile}
    </Link>
  );
}

function SpotlightStrip() {
  const tiles = SPOTLIGHT_SLUGS.map((slug) => getComponentBySlug(slug)).filter(
    (entry): entry is ComponentEntry => Boolean(entry) && entry.status === 'shipped',
  );

  if (tiles.length === 0) return null;

  return (
    <div className="mb-12 grid gap-5 lg:grid-cols-[1.4fr_1fr_1fr]">
      {tiles.map((entry, index) => (
        <SpotlightTile key={entry.slug} entry={entry} lead={index === 0} />
      ))}
    </div>
  );
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
      initial={
        prefersReducedMotion ? false : { opacity: 0, y: 16, filter: 'blur(6px)' }
      }
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.4,
        delay: prefersReducedMotion ? 0 : Math.min(index * 0.04, 0.24),
        ease: [0.16, 1, 0.3, 1],
      }}
      className="scroll-mt-[9.5rem]"
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
  const { activeAnchor, setActiveAnchor, activeLayer, setActiveLayer, registerQueryReset } =
    useGalleryNav();
  const prefersReducedMotion = useReducedMotion();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const didReadUrlRef = useRef(false);

  const allGroups = useMemo(() => getComponentsGroupedByCategory(), []);
  const queryFilteredGroups = useMemo(
    () => filterGroupsByQuery(allGroups, query),
    [allGroups, query],
  );
  const filteredGroups = useMemo(
    () =>
      activeLayer === 'all'
        ? queryFilteredGroups
        : queryFilteredGroups.filter((group) => group.layer === activeLayer),
    [queryFilteredGroups, activeLayer],
  );
  const totalFiltered = useMemo(
    () => filteredGroups.reduce((sum, group) => sum + group.entries.length, 0),
    [filteredGroups],
  );
  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const group of queryFilteredGroups) {
      map[getCategoryAnchorId(group.layer, group.category)] = group.entries.length;
    }
    return map;
  }, [queryFilteredGroups]);
  const chipLayers: ComponentLayer[] =
    activeLayer === 'all' ? ['foundation', 'animated', 'sections'] : [activeLayer];
  const newCount = useMemo(() => components.filter((c) => c.isNew).length, []);
  const showSpotlight = activeLayer === 'all' && query.trim().length === 0;
  const hasActiveFilters = activeLayer !== 'all' || query.trim().length > 0;

  // Register a query-reset so sidebar/chip navigation into a filtered-out
  // category can always broaden back into view.
  useEffect(() => {
    registerQueryReset(() => setQuery(''));
  }, [registerQueryReset]);

  // Read `?layer=` and `?q=` once on mount so filters deep-link.
  useEffect(() => {
    if (typeof window === 'undefined' || didReadUrlRef.current) return;
    didReadUrlRef.current = true;

    const params = new URLSearchParams(window.location.search);
    const layerParam = params.get('layer');
    const queryParam = params.get('q');

    if (
      layerParam === 'foundation' ||
      layerParam === 'animated' ||
      layerParam === 'sections'
    ) {
      setActiveLayer(layerParam);
    }
    if (queryParam) setQuery(queryParam);
  }, [setActiveLayer]);

  // Keep `?layer=` / `?q=` in sync via replaceState — no navigation, deep-linkable.
  useEffect(() => {
    if (typeof window === 'undefined' || !didReadUrlRef.current) return;

    const params = new URLSearchParams(window.location.search);
    if (activeLayer === 'all') params.delete('layer');
    else params.set('layer', activeLayer);

    if (query.trim()) params.set('q', query);
    else params.delete('q');

    const qs = params.toString();
    const url = `${window.location.pathname}${qs ? `?${qs}` : ''}${window.location.hash}`;
    window.history.replaceState(null, '', url);
  }, [activeLayer, query]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChipClick(layer: ComponentLayer, category: string) {
    const anchorId = getCategoryAnchorId(layer, category);

    if (activeLayer !== 'all' && activeLayer !== layer) {
      setActiveLayer('all');
    }

    requestAnimationFrame(() => {
      const target = document.getElementById(anchorId);
      if (!target) return;
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${anchorId}`);
      setActiveAnchor(anchorId);
    });
  }

  function clearFilters() {
    setQuery('');
    setActiveLayer('all');
  }

  return (
    <div>
      <div className="sticky top-[76px] z-30 -mx-4 border-b border-border/70 bg-background/85 px-4 backdrop-blur-xl sm:-mx-6 sm:px-6">
        <div className="mx-auto flex max-w-[90rem] flex-col gap-3 py-3">
          <div className="flex flex-wrap items-center gap-3">
            <ToggleGroup
              variant="segmented"
              size="sm"
              value={activeLayer}
              onValueChange={(value) => {
                if (typeof value === 'string') setActiveLayer(value as GalleryLayerFilter);
              }}
              aria-label="Filter by layer"
            >
              {layerFilterOptions.map((option) => (
                <ToggleGroup.Item key={option.value} value={option.value}>
                  {option.label}
                </ToggleGroup.Item>
              ))}
            </ToggleGroup>

            <div className="relative ml-auto w-full max-w-xs sm:w-64">
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
                className={cn('pl-9', query ? 'pr-9' : 'pr-12')}
              />
              {query ? (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setQuery('')}
                  className="absolute top-1/2 right-2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <X className="size-3.5" aria-hidden />
                </button>
              ) : (
                <Kbd
                  aria-hidden
                  size="sm"
                  className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2"
                >
                  ⌘K
                </Kbd>
              )}
            </div>
          </div>

          <div className="-mx-1 flex items-center gap-1.5 overflow-x-auto px-1 pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {chipLayers.flatMap((layer) =>
              layerCategories[layer].map((category) => {
                const anchorId = getCategoryAnchorId(layer, category);
                const count = categoryCounts[anchorId];
                if (!count) return null;
                const isActive = activeAnchor === anchorId;

                return (
                  <button
                    key={anchorId}
                    type="button"
                    onClick={() => handleChipClick(layer, category)}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'shrink-0 whitespace-nowrap rounded-full border px-3 py-1 font-mono text-xs transition-colors duration-150',
                      focusRing,
                      isActive
                        ? 'border-brand/30 bg-brand/10 text-brand'
                        : 'border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground',
                    )}
                  >
                    {category}
                    <span className="ml-1.5 text-muted-foreground/60">{count}</span>
                  </button>
                );
              }),
            )}
          </div>
        </div>
      </div>

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
          <p className="mt-4 flex max-w-xl flex-wrap items-center gap-x-2 gap-y-1 text-muted-foreground">
            <span>
              <span className="font-mono text-foreground">{components.length}</span> components
              across {Object.keys(layerLabels).length} layers —{' '}
              <span className="font-medium text-foreground">{getReadyCount()} shipped</span> and
              ready to copy.
            </span>
            {newCount > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full border border-brand/30 bg-brand/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-brand">
                {newCount} new this week
              </span>
            )}
          </p>
        </motion.div>

        {showSpotlight && <SpotlightStrip />}

        {filteredGroups.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <p className="text-sm text-muted-foreground">No components match — clear search</p>
            <button
              type="button"
              onClick={clearFilters}
              className={cn(
                'rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors duration-150 hover:border-brand/40 hover:text-brand',
                focusRing,
              )}
            >
              Clear search
            </button>
          </div>
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

        {hasActiveFilters && totalFiltered > 0 && (
          <p className="mt-10 text-center font-mono text-xs text-muted-foreground">
            Showing {totalFiltered} of {components.length} components
          </p>
        )}
      </div>
    </div>
  );
}
