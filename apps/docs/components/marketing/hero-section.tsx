'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Wand2 } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Button, cn } from '@varient/ui';
import { getDemo } from '@/lib/components/demos';
import { BgLines } from '@/components/marketing/bg-lines';
import Divider from '@/components/marketing/divider';

interface HeroSectionProps {
  readyCount: number;
  totalCount: number;
}

const EASE_OUT_QUAD = [0.25, 0.46, 0.45, 0.94] as const;

/** Real, live compact demos for the right-side showcase — wow-first, motion-led.
 * First and last slots go full-width (2 cols): one wide tile, four single tiles, one wide tile. */
const SHOWCASE_SLUGS = [
  'border-beam',
  'shimmer-button',
  'number-ticker',
  'button-copy',
  'switch',
  'marquee',
] as const;

function AnnouncementBadge({ readyCount, totalCount }: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  // Sweep plays once on mount (default motion behavior); bump the key to replay on hover.
  const [sweepKey, setSweepKey] = useState(0);

  return (
    <Link
      href="/components"
      onMouseEnter={() => !shouldReduceMotion && setSweepKey((k) => k + 1)}
      className="group inline-flex max-w-full items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full border border-border bg-background px-3 py-0.5 font-medium text-foreground text-xs transition-all"
    >
      <div className="relative -ml-2.5 flex shrink-0 items-center gap-1 overflow-hidden truncate rounded-full bg-brand/10 px-2.5 py-1 text-brand text-xs">
        {!shouldReduceMotion && (
          <motion.div
            key={sweepKey}
            animate={{ x: ['-100%', '200%'] }}
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          />
        )}
        <Wand2 className="size-3" />
        <span>
          {readyCount}/{totalCount}
        </span>
      </div>
      <div className="flex items-center gap-1 truncate py-1">
        <span>components shipped, more every week</span>
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 motion-reduce:transition-none group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
        />
      </div>
    </Link>
  );
}

/**
 * Marketing hero — two-column layout with headline, CTAs, and a live component
 * showcase grid mounting shipped `@varient/ui` compact demos.
 */
export function HeroSection({ readyCount, totalCount }: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const showcase = SHOWCASE_SLUGS.map((slug) => ({ slug, Demo: getDemo(slug, true) })).filter(
    (item): item is typeof item & { Demo: NonNullable<typeof item.Demo> } => item.Demo !== null,
  );

  return (
    <section className="relative overflow-hidden bg-background transition">
      <BgLines />
      <div className="relative py-24 md:py-36">
        <Divider />
        <div className="mx-auto max-w-7xl px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Left side — hero content */}
            <motion.div
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              className="space-y-8"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.35, ease: EASE_OUT_QUAD }}
            >
              <AnnouncementBadge readyCount={readyCount} totalCount={totalCount} />

              <h1 className="text-balance font-display font-semibold text-4xl text-foreground md:text-5xl lg:text-6xl lg:leading-15 lg:tracking-tight">
                Animated components for web and native
              </h1>

              <p className="text-balance text-foreground/70 sm:text-lg md:text-xl">
                Copy-paste React components with real motion built in — buttons, badges, cards,
                and full sections that just work. One component API, styled for the web today
                with React Native next. You own every line, no runtime package to install.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" variant="primary">
                  <Link href="/components">Explore components</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/docs">Explore docs</Link>
                </Button>
              </div>

              <div className="mt-14 hidden items-center gap-6 text-xs sm:flex">
                <span className="text-muted-foreground uppercase tracking-widest">Built with</span>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  {['Next.js', 'React', 'Tailwind CSS', 'Motion'].map((name) => (
                    <span
                      key={name}
                      className="cursor-default text-foreground/70 transition-colors hover:text-brand"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right side — real @varient/ui component showcase */}
            <motion.div
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              className="relative"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.35, delay: 0.2, ease: EASE_OUT_QUAD }}
            >
              <div className="grid grid-cols-2 gap-4">
                {showcase.map(({ slug, Demo }, index) => {
                  const isWide = index === 0 || index === showcase.length - 1;
                  return (
                    <div
                      key={slug}
                      className={cn(
                        'frame-box relative flex items-center justify-center rounded-lg p-4',
                        isWide && 'col-span-2',
                      )}
                    >
                      <Demo />
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
