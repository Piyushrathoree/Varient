'use client';

import Link from 'next/link';
import { type KeyboardEvent, useId, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Button, cn } from '@varient/ui';
import { getDemo } from '@/lib/components/demos';
import {
  type ComponentLayer,
  getComponentBySlug,
  getComponentHref,
  getReadyCount,
  layerLabels,
} from '@/lib/components/registry';
import { LazyMount } from '@/components/preview/lazy-mount';
import Divider from '@/components/marketing/divider';
import { SectionHeader } from '@/components/marketing/section-header';

const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as const;

const THEATER_CATEGORIES: readonly ComponentLayer[] = ['foundation', 'animated', 'sections'];

/**
 * Component Theater — one live demo on a large stage at a time, curated per
 * layer. Every slug here is verified against lib/components/demos.ts AND is
 * `shipped` in the registry (so the stage link to /components/[slug] resolves).
 */
const CURATED_DEMOS: Record<ComponentLayer, readonly string[]> = {
  foundation: ['tabs', 'stepper', 'sidebar', 'input-otp', 'command-palette'],
  animated: ['globe', 'dock', 'animated-beam', 'spotlight', 'confetti-burst', 'marquee'],
  sections: ['hero-spotlight', 'stats-band', 'pricing', 'testimonials', 'timeline'],
};

const DEFAULT_CATEGORY: ComponentLayer = 'animated';
const DEFAULT_SLUG = 'globe';

interface ThumbnailButtonProps {
  isActive: boolean;
  onSelect: () => void;
  slug: string;
}

/** Tiny live preview + name; click puts the demo on stage. */
function ThumbnailButton({ slug, isActive, onSelect }: ThumbnailButtonProps) {
  const entry = getComponentBySlug(slug);
  const ThumbDemo = getDemo(slug, true);

  if (!entry || !ThumbDemo) return null;

  return (
    <button
      aria-pressed={isActive}
      className={cn(
        'group/thumb min-w-[8.5rem] flex-1 basis-36 overflow-hidden rounded-lg border p-1.5 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        isActive
          ? 'border-brand/60 bg-smooth-100 ring-1 ring-brand'
          : 'border-border bg-smooth-100/60 hover:border-brand/40 hover:bg-smooth-100',
      )}
      onClick={onSelect}
      type="button"
    >
      <span
        aria-hidden
        className="pointer-events-none relative block h-16 overflow-hidden rounded-md bg-smooth-50"
        inert
      >
        <LazyMount className="absolute inset-0 flex items-center justify-center">
          <span className="flex origin-center scale-[0.5] items-center justify-center">
            <ThumbDemo />
          </span>
        </LazyMount>
      </span>
      <span className="mt-1.5 flex items-center justify-between gap-1 px-1 pb-0.5">
        <span
          className={cn(
            'truncate font-mono text-[10px] uppercase tracking-widest transition-colors duration-200',
            isActive
              ? 'text-brand'
              : 'text-muted-foreground group-hover/thumb:text-foreground',
          )}
        >
          {entry.name}
        </span>
        {isActive && (
          <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-brand" />
        )}
      </span>
    </button>
  );
}

export function ComponentBentoShowcase() {
  const shouldReduceMotion = useReducedMotion();
  const stageId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const [category, setCategory] = useState<ComponentLayer>(DEFAULT_CATEGORY);
  const [activeSlug, setActiveSlug] = useState<string>(DEFAULT_SLUG);

  const curated = CURATED_DEMOS[category];
  const activeEntry = getComponentBySlug(activeSlug);
  const activeHref = activeEntry ? getComponentHref(activeEntry) : null;
  const ActiveDemo = getDemo(activeSlug);

  const selectCategory = (next: ComponentLayer) => {
    if (next === category) return;
    setCategory(next);
    setActiveSlug(CURATED_DEMOS[next][0] ?? DEFAULT_SLUG);
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = THEATER_CATEGORIES.length - 1;
    let next: number;
    switch (event.key) {
      case 'ArrowRight':
        next = index === last ? 0 : index + 1;
        break;
      case 'ArrowLeft':
        next = index === 0 ? last : index - 1;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = last;
        break;
      default:
        return;
    }
    event.preventDefault();
    const nextLayer = THEATER_CATEGORIES[next];
    if (nextLayer) {
      selectCategory(nextLayer);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <section className="relative bg-background px-6 py-24 md:px-8 md:py-32">
      <Divider />
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          description="Every demo on stage is the real shipped component — live spring physics, ready to copy and own."
          eyebrow="// the collection"
          title="See them run"
        />

        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          transition={
            shouldReduceMotion ? { duration: 0 } : { duration: 0.5, ease: EASE_OUT }
          }
          viewport={{ once: true, amount: 0.15 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        >
          {/* Category tab rail */}
          <div className="mt-10 flex justify-center">
            <div
              aria-label="Component categories"
              className="flex items-center gap-1 rounded-full border border-border bg-smooth-100 p-1"
              role="tablist"
            >
              {THEATER_CATEGORIES.map((layer, index) => {
                const isActive = layer === category;
                return (
                  <button
                    key={layer}
                    aria-controls={stageId}
                    aria-selected={isActive}
                    className={cn(
                      'relative rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
                      isActive
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                    id={`${stageId}-tab-${layer}`}
                    onClick={() => selectCategory(layer)}
                    onKeyDown={(event) => onTabKeyDown(event, index)}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    role="tab"
                    tabIndex={isActive ? 0 : -1}
                    type="button"
                  >
                    {isActive && (
                      <motion.span
                        aria-hidden
                        className="absolute inset-0 rounded-full border border-brand/30 bg-smooth-200"
                        layoutId="theater-tab-pill"
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : { type: 'spring', stiffness: 260, damping: 30 }
                        }
                      />
                    )}
                    <span className="relative z-10">{layerLabels[layer]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stage */}
          <div
            aria-labelledby={`${stageId}-tab-${category}`}
            className="relative mt-6 overflow-hidden rounded-xl border border-border bg-smooth-100"
            id={stageId}
            role="tabpanel"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-dot-grid mask-fade-radial"
            />
            <div className="relative min-h-[380px] md:min-h-[480px]">
              <LazyMount className="absolute inset-0">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={activeSlug}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center overflow-hidden p-6 sm:p-10"
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { duration: 0.35, ease: EASE_OUT }
                    }
                  >
                    <div className="flex max-h-full w-full items-center justify-center">
                      {ActiveDemo ? <ActiveDemo /> : null}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </LazyMount>
            </div>
            {activeEntry && activeHref && (
              <Link
                className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur-sm transition-colors duration-200 hover:border-brand/40 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                href={activeHref}
              >
                {activeEntry.name}
                <ArrowUpRight aria-hidden className="size-3 shrink-0" />
              </Link>
            )}
          </div>

          {/* Thumbnail strip */}
          <div
            aria-label={`${layerLabels[category]} demos`}
            className="mt-4 flex flex-wrap justify-center gap-3"
            role="group"
          >
            {curated.map((slug) => (
              <ThumbnailButton
                key={`${category}-${slug}`}
                isActive={slug === activeSlug}
                onSelect={() => setActiveSlug(slug)}
                slug={slug}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-12 flex justify-center"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          transition={
            shouldReduceMotion ? { duration: 0 } : { duration: 0.4, delay: 0.2 }
          }
          viewport={{ once: true }}
          whileInView={{ opacity: 1 }}
        >
          <Button asChild size="lg" variant="outline">
            <Link className="group inline-flex items-center gap-2" href="/components">
              Browse all {getReadyCount()} components
              <ArrowRight
                aria-hidden
                className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
              />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
