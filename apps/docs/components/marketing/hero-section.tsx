'use client';

import { useRef, useState } from 'react';
import type { ComponentType, CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Copy } from 'lucide-react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { cn } from '@varient/ui';
import { getDemo } from '@/lib/components/demos';
import { SITE_URL } from '@/lib/shared';

interface HeroSectionProps {
  readyCount: number;
  totalCount: number;
}

const INSTALL_COMMAND = `npx shadcn@latest add ${SITE_URL}/r/shimmer-button.json`;

/** Live compact `@varient/ui` demos for the wall — three vertical marquee
 * columns with alternating scroll directions. Slugs reuse the previous hero
 * showcase set, extended so each column loops with enough content. */
const WALL_COLUMNS = [
  { direction: 'up', duration: '46s', slugs: ['border-beam', 'number-ticker', 'button-copy', 'toggle'] },
  { direction: 'down', duration: '54s', slugs: ['shimmer-button', 'switch', 'animated-progress-ring', 'badge'] },
  { direction: 'up', duration: '50s', slugs: ['marquee', 'avatar', 'slider', 'tabs'] },
] as const;

interface WallTile {
  slug: string;
  Demo: ComponentType;
}

function resolveTiles(slugs: readonly string[]): WallTile[] {
  return slugs
    .map((slug) => ({ slug, Demo: getDemo(slug, true) }))
    .filter((item): item is WallTile => item.Demo !== null);
}

const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 30 },
  },
};

function AnnouncementPill({ readyCount, totalCount }: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Link
      href="/components"
      aria-label={`${readyCount} of ${totalCount} components shipped — browse the collection`}
      className="group inline-flex max-w-full items-center gap-2.5 whitespace-nowrap rounded-full border border-border bg-smooth-100/80 py-1.5 pr-3.5 pl-4 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.18em] transition-colors hover:border-brand/40 hover:text-foreground"
    >
      <span aria-hidden="true" className="relative flex size-2 shrink-0">
        {!shouldReduceMotion && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60 motion-reduce:hidden" />
        )}
        <span className="relative inline-flex size-2 rounded-full bg-brand" />
      </span>
      <span className="truncate">
        v1 · {readyCount} components shipped
      </span>
      <ArrowRight
        aria-hidden="true"
        className="size-3 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
      />
    </Link>
  );
}

function InstallChip() {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(INSTALL_COMMAND)
      .then(() => {
        setCopied(true);
        if (resetTimer.current) clearTimeout(resetTimer.current);
        resetTimer.current = setTimeout(() => setCopied(false), 1800);
      })
      .catch(() => {
        /* clipboard unavailable — leave the chip as-is */
      });
  };

  return (
    <div className="inline-flex max-w-full items-center gap-2.5 rounded-lg border border-border bg-smooth-100 py-1.5 pr-1.5 pl-4 font-mono text-muted-foreground text-xs">
      <span aria-hidden="true" className="select-none text-brand">
        $
      </span>
      <code className="truncate">{INSTALL_COMMAND}</code>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? 'Install command copied' : 'Copy install command'}
        className="inline-flex size-7 shrink-0 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        {copied ? (
          <Check aria-hidden="true" className="size-3.5 text-brand" />
        ) : (
          <Copy aria-hidden="true" className="size-3.5" />
        )}
      </button>
    </div>
  );
}

function DemoTile({ slug, Demo }: WallTile) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-smooth-100">
      <div className="flex min-h-40 flex-1 items-center justify-center overflow-hidden p-5">
        <Demo />
      </div>
      <div className="border-border border-t px-4 py-2">
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.18em]">
          {slug.replace(/-/g, ' ')}
        </span>
      </div>
    </div>
  );
}

function ColumnRun({ tiles, hidden = false }: { tiles: WallTile[]; hidden?: boolean }) {
  return (
    <div aria-hidden={hidden || undefined} inert={hidden || undefined} className="flex flex-col gap-4 pb-4">
      {tiles.map((tile) => (
        <DemoTile key={tile.slug} {...tile} />
      ))}
    </div>
  );
}

function MarqueeColumn({
  tiles,
  direction,
  duration,
  className,
}: {
  tiles: WallTile[];
  direction: 'up' | 'down';
  duration: string;
  className?: string;
}) {
  return (
    <div className={cn('marquee-col relative h-full overflow-hidden', className)}>
      <div
        className={cn(
          'marquee-col flex flex-col',
          direction === 'up' ? 'animate-marquee-up' : 'animate-marquee-down',
        )}
        style={{ '--marquee-duration': duration } as CSSProperties}
      >
        <ColumnRun tiles={tiles} />
        {/* Exact duplicate so translateY(-50%) loops seamlessly */}
        <ColumnRun tiles={tiles} hidden />
      </div>
    </div>
  );
}

/**
 * Marketing hero — centered full-bleed SIGNAL composition: aurora + grid +
 * noise backdrop, announcement pill, serif-accent headline, CTA row, install
 * chip, and an edge-to-edge wall of live demo tiles on vertical marquees.
 */
export function HeroSection({ readyCount, totalCount }: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const columns = WALL_COLUMNS.map((column) => ({
    ...column,
    tiles: resolveTiles(column.slugs),
  }));
  const staticTiles = columns.flatMap((column) => column.tiles).slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Backdrop layers */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-aurora" />
        <div className="absolute inset-0 bg-grid-lines mask-fade-radial-top" />
        <div className="absolute inset-0 bg-noise" />
      </div>

      <motion.div
        animate="show"
        className="relative"
        initial={shouldReduceMotion ? false : 'hidden'}
        variants={staggerContainer}
      >
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-7 px-6 pt-24 pb-16 text-center md:pt-32">
          <motion.div variants={staggerItem}>
            <AnnouncementPill readyCount={readyCount} totalCount={totalCount} />
          </motion.div>

          <motion.h1
            className="text-balance font-semibold font-title text-5xl text-foreground tracking-[-0.03em] sm:text-6xl lg:text-7xl"
            variants={staggerItem}
          >
            Build interfaces that feel{' '}
            <em className="font-serif-accent italic text-gradient-brand">alive</em>
          </motion.h1>

          <motion.p
            className="max-w-2xl text-balance text-base text-muted-foreground sm:text-lg"
            variants={staggerItem}
          >
            Varient is an open-source library of animated, copy-paste components for React and
            React Native — spring physics, semantic tokens, zero lock-in.
          </motion.p>

          <motion.div className="flex flex-col items-center gap-4 sm:flex-row" variants={staggerItem}>
            <Link
              href="/components"
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand px-6 font-medium text-background text-sm transition-shadow duration-300 hover:shadow-[var(--glow-brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Browse components
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
              />
            </Link>
            <Link
              href="/docs"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-border px-6 font-medium text-foreground text-sm transition-colors hover:border-brand/40 hover:bg-smooth-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Read the docs
            </Link>
          </motion.div>

          <motion.div className="max-w-full" variants={staggerItem}>
            <InstallChip />
          </motion.div>
        </div>

        {/* Demo wall — edge-to-edge live component tiles */}
        <motion.div className="relative w-full px-4 pb-20 sm:px-6" variants={staggerItem}>
          {shouldReduceMotion ? (
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-3">
              {staticTiles.map((tile) => (
                <DemoTile key={tile.slug} {...tile} />
              ))}
            </div>
          ) : (
            <div className="grid h-[520px] grid-cols-2 gap-4 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] md:grid-cols-3 sm:h-[600px]">
              {columns.map((column, index) => (
                <MarqueeColumn
                  key={column.slugs[0]}
                  className={index === 2 ? 'hidden md:block' : undefined}
                  direction={column.direction}
                  duration={column.duration}
                  tiles={column.tiles}
                />
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
