'use client';

import { forwardRef, useId, type HTMLAttributes } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Button } from '../../foundation/button';
import { DURATION_INSTANT, EASE_OUT } from '../../../lib/animation';
import { cn } from '../../../lib/utils';

export interface HeroSpotlightCtaLink {
  label: string;
  href: string;
}

export interface HeroSpotlightAnnouncement {
  badge?: string;
  label: string;
  href?: string;
}

export interface HeroSpotlightProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title?: string;
  /** Word within `title` rendered in brand accent. */
  highlightWord?: string;
  subtitle?: string;
  announcement?: HeroSpotlightAnnouncement;
  primaryCta?: HeroSpotlightCtaLink;
  secondaryCta?: HeroSpotlightCtaLink;
}

const DEFAULT_TITLE = 'Ship interfaces that feel alive';
const DEFAULT_HIGHLIGHT = 'alive';
const DEFAULT_SUBTITLE =
  'Dark-canvas hero with a sweeping spotlight beam, brand-accent headline, and dual CTAs — copy-paste ready for your next launch.';
const DEFAULT_ANNOUNCEMENT: HeroSpotlightAnnouncement = {
  badge: 'New',
  label: 'Hero Spotlight section is live',
  href: '#components',
};
const DEFAULT_PRIMARY_CTA: HeroSpotlightCtaLink = {
  label: 'Browse components',
  href: '#components',
};
const DEFAULT_SECONDARY_CTA: HeroSpotlightCtaLink = {
  label: 'View docs',
  href: '#docs',
};

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

function AnnouncementPill({ announcement }: { announcement: HeroSpotlightAnnouncement }) {
  const shouldReduceMotion = useReducedMotion();
  const content = (
    <>
      {announcement.badge && (
        <span className="relative -ml-2.5 flex shrink-0 items-center gap-1 overflow-hidden truncate rounded-full bg-brand/15 px-2.5 py-1 font-medium text-brand text-xs">
          {!shouldReduceMotion && (
            <motion.span
              aria-hidden
              animate={{ x: ['-100%', '200%'] }}
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
                ease: 'easeInOut',
              }}
            />
          )}
          {announcement.badge}
        </span>
      )}
      <span className="truncate py-1">{announcement.label}</span>
      {announcement.href && (
        <svg
          aria-hidden
          className="size-4 shrink-0 text-background/60 transition-transform duration-200 ease-out motion-reduce:transition-none group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
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
    'group inline-flex max-w-full items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full border border-background/15 bg-background/5 px-3 py-0.5 font-medium text-background/90 text-xs backdrop-blur-sm transition-colors hover:border-background/25';

  if (announcement.href) {
    return (
      <a className={cn(pillClassName, focusRing)} href={announcement.href}>
        {content}
      </a>
    );
  }

  return <div className={pillClassName}>{content}</div>;
}

function SpotlightBeam({ isStatic }: { isStatic: boolean }) {
  const beamClassName =
    'pointer-events-none absolute -left-1/4 -top-1/4 size-[140%] opacity-70 mix-blend-screen';

  if (isStatic) {
    return (
      <div
        aria-hidden
        className={beamClassName}
        style={{
          background:
            'conic-gradient(from 220deg at 0% 0%, transparent 0deg, color-mix(in oklab, var(--color-brand) 22%, transparent) 55deg, transparent 110deg)',
        }}
      />
    );
  }

  return (
    <motion.div
      aria-hidden
      animate={{ rotate: [220, 580] }}
      className={beamClassName}
      style={{
        background:
          'conic-gradient(from 0deg at 0% 0%, transparent 0deg, color-mix(in oklab, var(--color-brand) 28%, transparent) 50deg, transparent 100deg)',
      }}
      transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
    />
  );
}

function renderTitle(title: string, highlightWord?: string) {
  if (!highlightWord || !title.includes(highlightWord)) {
    return title;
  }

  const parts = title.split(highlightWord);
  return parts.map((part, index) => (
    <span key={`${part}-${index}`}>
      {part}
      {index < parts.length - 1 ? (
        <span className="text-brand">{highlightWord}</span>
      ) : null}
    </span>
  ));
}

export const HeroSpotlight = forwardRef<HTMLElement, HeroSpotlightProps>(
  (
    {
      className,
      title = DEFAULT_TITLE,
      highlightWord = DEFAULT_HIGHLIGHT,
      subtitle = DEFAULT_SUBTITLE,
      announcement = DEFAULT_ANNOUNCEMENT,
      primaryCta = DEFAULT_PRIMARY_CTA,
      secondaryCta = DEFAULT_SECONDARY_CTA,
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const headingId = useId();

    const contentMotion = shouldReduceMotion
      ? { initial: false as const, animate: { opacity: 1 }, transition: DURATION_INSTANT }
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, ease: EASE_OUT },
        };

    return (
      <section
        ref={ref}
        aria-labelledby={headingId}
        className={cn('relative w-full overflow-hidden bg-foreground text-background', className)}
        {...props}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <SpotlightBeam isStatic={shouldReduceMotion ?? false} />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 50% 0%, color-mix(in oklab, var(--color-brand) 12%, transparent), transparent 70%)',
            }}
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-foreground)_72%)]"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 py-20 text-center sm:px-8 md:py-28 lg:py-32">
          <motion.div className="mx-auto flex max-w-3xl flex-col items-center gap-6 md:gap-8" {...contentMotion}>
            <AnnouncementPill announcement={announcement} />

            <div className="space-y-4">
              <h1
                id={headingId}
                className="text-balance font-display text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl lg:leading-[1.08]"
              >
                {renderTitle(title, highlightWord)}
              </h1>
              <p className="mx-auto max-w-2xl text-balance text-base text-background/70 sm:text-lg md:text-xl">
                {subtitle}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <Button asChild size="lg" variant="primary">
                <a className={focusRing} href={primaryCta.href}>
                  {primaryCta.label}
                </a>
              </Button>
              <Button
                asChild
                className="border-background/20 bg-background/5 text-background hover:bg-background/10 hover:text-background"
                size="lg"
                variant="outline"
              >
                <a className={focusRing} href={secondaryCta.href}>
                  {secondaryCta.label}
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  },
);

HeroSpotlight.displayName = 'HeroSpotlight';
