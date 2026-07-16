'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Button, cn } from '@varient/ui';
import { getDemo } from '@/lib/components/demos';
import { getComponentBySlug, getComponentHref } from '@/lib/components/registry';
import { LazyMount } from '@/components/preview/lazy-mount';
import Divider from '@/components/marketing/divider';
import { SectionHeader } from '@/components/marketing/section-header';

interface BentoCell {
  slug: string;
  className?: string;
}

/** Asymmetric bento — visually strong shipped demos, compact previews, rebalanced toward
 * ambient/interactive "wow" over static text demos. */
const BENTO_CELLS: BentoCell[] = [
  { slug: 'globe', className: 'lg:col-span-3 lg:row-span-2 min-h-[280px] lg:min-h-[360px]' },
  { slug: 'hero-highlight', className: 'lg:col-span-3 min-h-[160px]' },
  { slug: 'dock', className: 'lg:col-span-3 min-h-[160px]' },
  { slug: 'animated-beam', className: 'lg:col-span-2 min-h-[200px]' },
  { slug: 'tilt-card', className: 'lg:col-span-2 min-h-[200px]' },
  { slug: 'sparkles', className: 'lg:col-span-2 min-h-[200px]' },
  { slug: 'marquee', className: 'lg:col-span-3 min-h-[140px]' },
  { slug: 'terminal', className: 'lg:col-span-3 min-h-[140px]' },
];

const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as const;

function BentoTile({ slug, className, index }: BentoCell & { index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const Demo = getDemo(slug, true);
  const entry = getComponentBySlug(slug);
  const href = entry ? getComponentHref(entry) : null;

  if (!Demo || !entry) return null;

  const inner = (
    <article
      className={cn(
        'group relative flex h-full min-h-[160px] flex-col overflow-hidden rounded-xl border border-border bg-card/50 p-1 transition-colors duration-300 hover:border-foreground/15 hover:bg-card',
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle,var(--color-border)_1px,transparent_1px)] [background-size:16px_16px]"
      />
      <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-lg p-4">
        <LazyMount className="flex items-center justify-center" minHeight={96}>
          <Demo />
        </LazyMount>
      </div>
      <footer className="relative flex items-center justify-between gap-2 border-t border-border/60 px-3 py-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {entry.name}
        </span>
        {href && (
          <ArrowUpRight
            aria-hidden
            className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-brand motion-reduce:opacity-100"
          />
        )}
      </footer>
    </article>
  );

  return (
    <motion.li
      className="list-none"
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.45, delay: index * 0.06, ease: EASE_OUT }
      }
      viewport={{ once: true, amount: 0.2 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
    >
      {href ? (
        <Link className="block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background" href={href}>
          {inner}
        </Link>
      ) : (
        inner
      )}
    </motion.li>
  );
}

export function ComponentBentoShowcase() {
  return (
    <section className="relative bg-background px-6 py-24 md:px-8 md:py-32">
      <Divider />
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          description="Every tile is a live, shipped component — copy the source, paste it into your app, and own it."
          eyebrow="Showcase"
          title={
            <>
              Motion-first components,{' '}
              <span className="text-brand">ready to paste</span>
            </>
          }
        />
        <ul className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
          {BENTO_CELLS.map((cell, index) => (
            <BentoTile key={cell.slug} {...cell} index={index} />
          ))}
        </ul>
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1 }}
        >
          <Button asChild size="lg" variant="outline">
            <Link href="/components">Browse all components</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
