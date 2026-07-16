'use client';

import { forwardRef, useId, useState, type HTMLAttributes, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { NumberTicker } from '../../animated/number-ticker';
import { Badge } from '../../foundation/badge';
import { Button } from '../../foundation/button';
import { Card } from '../../foundation/card';
import { Input } from '../../foundation/input';
import { Switch } from '../../foundation/switch';
import { DURATION_INSTANT, EASE_OUT } from '../../../lib/animation';
import { cn } from '../../../lib/utils';

export interface HeroCtaLink {
  label: string;
  href: string;
}

export interface HeroAnnouncement {
  /** Short label inside the brand-tinted chip (e.g. "New", "25/75"). */
  badge?: string;
  /** Remaining pill copy after the chip. */
  label: string;
  href?: string;
}

export interface HeroProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
  /** Pass `null` to hide the pill entirely. Omit (or pass `undefined`) to use the default announcement. */
  announcement?: HeroAnnouncement | null;
  primaryCta?: HeroCtaLink;
  secondaryCta?: HeroCtaLink;
  /** Tech stack names shown in the "built with" row. Pass `[]` to hide. */
  builtWith?: string[];
  /** Override the right-side mock UI. Defaults to a Card + Badge component grid. */
  visual?: ReactNode;
}

const DEFAULT_TITLE = 'Animated components you can copy and own';
const DEFAULT_SUBTITLE =
  'Copy-paste React sections and primitives with motion built in. One API for web today, native next — no runtime package to install.';
const DEFAULT_ANNOUNCEMENT: HeroAnnouncement = {
  badge: '25+',
  label: 'foundation components shipped, more every week',
  href: '#components',
};
const DEFAULT_PRIMARY_CTA: HeroCtaLink = { label: 'Browse components', href: '#components' };
const DEFAULT_SECONDARY_CTA: HeroCtaLink = { label: 'Read the docs', href: '#docs' };
const DEFAULT_BUILT_WITH = ['Next.js', 'React', 'Tailwind CSS', 'Motion'];

function AnnouncementPill({ announcement }: { announcement: HeroAnnouncement }) {
  const shouldReduceMotion = useReducedMotion();
  // Design law: no perpetual loop on a sections-layer ambient flourish. The shimmer
  // sweeps once on mount, then replays once per hover — never `repeat: Infinity`.
  const [shimmerKey, setShimmerKey] = useState(0);
  const replayShimmer = () => setShimmerKey((key) => key + 1);

  const content = (
    <>
      {announcement.badge && (
        <span className="relative -ml-2.5 flex shrink-0 items-center gap-1 overflow-hidden truncate rounded-full bg-muted px-2.5 py-1 font-medium text-brand text-xs">
          {!shouldReduceMotion && (
            <motion.span
              key={shimmerKey}
              aria-hidden
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              transition={{ duration: 0.9, ease: 'easeInOut' }}
            />
          )}
          {announcement.badge}
        </span>
      )}
      <span className="truncate py-1">{announcement.label}</span>
      {announcement.href && (
        <svg
          aria-hidden
          className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-out motion-reduce:transition-none group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.75}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M7 7h10v10" />
        </svg>
      )}
    </>
  );

  const pillClassName =
    'group inline-flex max-w-full items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full border border-border bg-background px-3 py-0.5 font-medium text-foreground text-xs transition-colors hover:border-foreground/20';

  if (announcement.href) {
    return (
      <a className={pillClassName} href={announcement.href} onMouseEnter={replayShimmer}>
        {content}
      </a>
    );
  }

  return (
    <div className={pillClassName} onMouseEnter={replayShimmer}>
      {content}
    </div>
  );
}

function HeroVisualGrid() {
  const [isMotionEnabled, setIsMotionEnabled] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  const tileMotion = (delay: number) =>
    shouldReduceMotion
      ? { initial: false as const, animate: { opacity: 1 }, transition: DURATION_INSTANT }
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay, ease: EASE_OUT },
        };

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
      <motion.div className="col-span-1 sm:col-span-2" {...tileMotion(0)}>
        <Card className="bg-primary/50 p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Weekly active installs</p>
              <p className="font-display text-2xl font-semibold tracking-tight text-foreground">
                <NumberTicker value={12840} />
              </p>
            </div>
            <Badge appearance="dot" variant="success">
              Live
            </Badge>
          </div>
        </Card>
      </motion.div>

      <motion.div {...tileMotion(0.05)}>
        <Card className="p-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium text-muted-foreground">Motion</span>
              <Switch
                aria-label="Toggle motion preview"
                isChecked={isMotionEnabled}
                onChange={setIsMotionEnabled}
                size="sm"
              />
            </div>
            <Badge appearance="soft" shape="square" variant="primary">
              {isMotionEnabled ? 'Enabled' : 'Reduced'}
            </Badge>
          </div>
        </Card>
      </motion.div>

      <motion.div {...tileMotion(0.1)}>
        <Card className="p-4">
          <div className="flex flex-col gap-2">
            <Badge appearance="outline" size="sm" variant="secondary">
              Badge
            </Badge>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Semantic variants with soft, solid, and outline styles.
            </p>
          </div>
        </Card>
      </motion.div>

      <motion.div {...tileMotion(0.15)}>
        <Card className="p-4">
          <Input
            aria-label="Email address"
            defaultValue="you@company.com"
            isReadOnly
            label="Email"
            size="sm"
          />
        </Card>
      </motion.div>

      <motion.div {...tileMotion(0.2)}>
        <Card className="p-4">
          <div className="flex flex-col gap-3">
            <Badge appearance="soft" variant="warning">
              Beta
            </Badge>
            <Button className="w-full" size="sm" variant="primary">
              Get started
            </Button>
          </div>
        </Card>
      </motion.div>

      <motion.div className="col-span-1 sm:col-span-2" {...tileMotion(0.25)}>
        <Card isHoverable className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <Card.Title className="text-base">Component kit</Card.Title>
              <Card.Description>Foundation, animated, and full-page sections.</Card.Description>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge appearance="soft" size="sm">
                25 foundation
              </Badge>
              <Badge appearance="soft" size="sm" variant="primary">
                30 animated
              </Badge>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

export const Hero = forwardRef<HTMLElement, HeroProps>(
  (
    {
      className,
      title = DEFAULT_TITLE,
      subtitle = DEFAULT_SUBTITLE,
      announcement = DEFAULT_ANNOUNCEMENT,
      primaryCta = DEFAULT_PRIMARY_CTA,
      secondaryCta = DEFAULT_SECONDARY_CTA,
      builtWith = DEFAULT_BUILT_WITH,
      visual,
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const headingId = useId();

    const contentMotion = shouldReduceMotion
      ? { initial: false as const, animate: { opacity: 1 }, transition: DURATION_INSTANT }
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, ease: EASE_OUT },
        };

    const visualMotion = shouldReduceMotion
      ? { initial: false as const, animate: { opacity: 1 }, transition: DURATION_INSTANT }
      : {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.35, delay: 0.2, ease: EASE_OUT },
        };

    return (
      <section
        ref={ref}
        aria-labelledby={headingId}
        className={cn('relative w-full overflow-hidden bg-background px-6 py-16 sm:px-8 md:py-24 lg:py-28', className)}
        {...props}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <motion.div className="space-y-6 md:space-y-8" {...contentMotion}>
              {announcement && <AnnouncementPill announcement={announcement} />}

              <div className="space-y-4">
                <h1
                  id={headingId}
                  className="text-balance font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl lg:leading-[1.1]"
                >
                  {title}
                </h1>
                <p className="max-w-xl text-balance text-base text-muted-foreground sm:text-lg md:text-xl">
                  {subtitle}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Button asChild size="lg" variant="primary">
                  <a href={primaryCta.href}>{primaryCta.label}</a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={secondaryCta.href}>{secondaryCta.label}</a>
                </Button>
              </div>

              {builtWith.length > 0 && (
                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:gap-6">
                  <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    Built with
                  </span>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-5">
                    {builtWith.map((name) => (
                      <span
                        key={name}
                        className="text-xs text-foreground/70 transition-colors duration-200 ease-out hover:text-brand motion-reduce:transition-none"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div className="relative" {...visualMotion}>
              {visual ?? <HeroVisualGrid />}
            </motion.div>
          </div>
        </div>
      </section>
    );
  },
);

Hero.displayName = 'Hero';
