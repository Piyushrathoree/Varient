'use client';

import { forwardRef, useId, useRef, type HTMLAttributes, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { GridPattern } from '../../animated/grid-pattern';
import { Button } from '../../foundation/button';
import { EASE_OUT } from '../../../lib/animation';
import { useViewportActive } from '../../../lib/use-viewport-active';
import { cn } from '../../../lib/utils';

export interface HeroGridCtaLink {
  label: string;
  href: string;
}

export interface HeroGridStat {
  value: string;
  label: string;
}

export interface HeroGridProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title?: string;
  subtitle?: string;
  primaryCta?: HeroGridCtaLink;
  secondaryCta?: HeroGridCtaLink;
  /** Optional metrics row beneath the CTA pair. Pass `[]` to hide. */
  stats?: HeroGridStat[];
  /**
   * Replaces the default line-grid + glow-orb backdrop entirely. Pass any
   * decorative node (image, video, solid tint, custom canvas) so the hero's
   * background stops competing 1:1 with a page's primary `Hero`. Rendered
   * inside the same `absolute inset-0` `aria-hidden` layer the default
   * background occupies.
   */
  backgroundSlot?: ReactNode;
  /**
   * When `true`, the background glow orbs float in a perpetual loop (paused
   * automatically while offscreen). Default `false`: orbs drift once into
   * their resting position on mount and hold — a section backdrop should
   * settle, not loop forever.
   */
  isAmbient?: boolean;
}

const DEFAULT_TITLE = 'Precision grids, premium motion';
const DEFAULT_SUBTITLE =
  'A fine line-grid canvas with radial fade, subtle glow orbs, and staggered entrance — the quiet backdrop for a confident headline.';
const DEFAULT_PRIMARY_CTA: HeroGridCtaLink = { label: 'Start building', href: '#start' };
const DEFAULT_SECONDARY_CTA: HeroGridCtaLink = { label: 'See examples', href: '#examples' };
const DEFAULT_STATS: HeroGridStat[] = [
  { value: '75+', label: 'Components' },
  { value: '3', label: 'Layers' },
  { value: '0', label: 'Runtime deps' },
];

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const STAGGER_CHILDREN = 0.08;

function GlowOrb({
  className,
  isStatic,
  isAmbient,
  isActive,
}: {
  className?: string;
  isStatic: boolean;
  /** Perpetual float loop opt-in — default false settles once and holds. */
  isAmbient: boolean;
  /** Whether the backdrop is currently in (or near) the viewport. */
  isActive: boolean;
}) {
  const orbClassName = cn(
    'pointer-events-none absolute size-48 rounded-full bg-brand/10 blur-3xl',
    className,
  );

  if (isStatic) {
    return <div aria-hidden className={orbClassName} />;
  }

  if (!isAmbient) {
    // Design law: sections settle, they don't loop forever. Drift once into
    // the resting position on mount, then hold.
    return (
      <motion.div
        aria-hidden
        animate={{ y: 0, opacity: 0.45 }}
        className={orbClassName}
        initial={{ y: -16, opacity: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: EASE_OUT }}
      />
    );
  }

  return (
    <motion.div
      aria-hidden
      animate={
        isActive
          ? { y: [0, -12, 0], opacity: [0.35, 0.55, 0.35] }
          : { y: 0, opacity: 0.45 }
      }
      className={orbClassName}
      transition={{
        duration: 8,
        repeat: isActive ? Number.POSITIVE_INFINITY : 0,
        ease: 'easeInOut',
      }}
    />
  );
}

export const HeroGrid = forwardRef<HTMLElement, HeroGridProps>(
  (
    {
      className,
      title = DEFAULT_TITLE,
      subtitle = DEFAULT_SUBTITLE,
      primaryCta = DEFAULT_PRIMARY_CTA,
      secondaryCta = DEFAULT_SECONDARY_CTA,
      stats = DEFAULT_STATS,
      backgroundSlot,
      isAmbient = false,
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const headingId = useId();
    const isStatic = shouldReduceMotion ?? false;
    const backgroundRef = useRef<HTMLDivElement | null>(null);
    const isBackgroundActive = useViewportActive(backgroundRef);

    const containerVariants = isStatic
      ? undefined
      : {
          hidden: {},
          visible: {
            transition: { staggerChildren: STAGGER_CHILDREN, delayChildren: 0.05 },
          },
        };

    const itemVariants = isStatic
      ? undefined
      : {
          hidden: { opacity: 0, y: 18 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.35, ease: EASE_OUT },
          },
        };

    const ContentWrapper = isStatic ? 'div' : motion.div;
    const ItemWrapper = isStatic ? 'div' : motion.div;

    const contentProps = isStatic
      ? { className: 'mx-auto flex max-w-3xl flex-col items-center gap-6 text-center md:gap-8' }
      : {
          className: 'mx-auto flex max-w-3xl flex-col items-center gap-6 text-center md:gap-8',
          initial: 'hidden' as const,
          animate: 'visible' as const,
          variants: containerVariants,
        };

    const itemProps = isStatic ? {} : { variants: itemVariants };

    return (
      <section
        ref={ref}
        aria-labelledby={headingId}
        className={cn('relative w-full overflow-hidden bg-background', className)}
        {...props}
      >
        <div ref={backgroundRef} aria-hidden className="pointer-events-none absolute inset-0">
          {backgroundSlot ?? (
            <>
              <GridPattern
                className="opacity-60"
                height={32}
                isAnimated={!isStatic}
                width={32}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse 70% 55% at 50% 45%, transparent 0%, var(--color-background) 72%)',
                }}
              />
              <GlowOrb
                className="left-[8%] top-[18%]"
                isActive={isBackgroundActive}
                isAmbient={isAmbient}
                isStatic={isStatic}
              />
              <GlowOrb
                className="right-[10%] top-[28%]"
                isActive={isBackgroundActive}
                isAmbient={isAmbient}
                isStatic={isStatic}
              />
              <GlowOrb
                className="bottom-[12%] left-1/2 -translate-x-1/2"
                isActive={isBackgroundActive}
                isAmbient={isAmbient}
                isStatic={isStatic}
              />
            </>
          )}
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-6 py-20 sm:px-8 md:py-28 lg:py-32">
          <ContentWrapper {...contentProps}>
            <ItemWrapper {...itemProps} className="space-y-4">
              <h1
                id={headingId}
                className="text-balance font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl lg:leading-[1.08]"
              >
                {title}
              </h1>
              <p className="mx-auto max-w-2xl text-balance text-base text-muted-foreground sm:text-lg md:text-xl">
                {subtitle}
              </p>
            </ItemWrapper>

            <ItemWrapper
              {...itemProps}
              className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4"
            >
              <Button asChild size="lg" variant="primary">
                <a className={focusRing} href={primaryCta.href}>
                  {primaryCta.label}
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a className={focusRing} href={secondaryCta.href}>
                  {secondaryCta.label}
                </a>
              </Button>
            </ItemWrapper>

            {stats.length > 0 && (
              <ItemWrapper
                {...itemProps}
                className="grid w-full max-w-xl grid-cols-1 gap-4 divide-y divide-border border-t border-border pt-8 sm:grid-cols-3 sm:gap-4 sm:divide-y-0"
              >
                {stats.map((stat) => (
                  <div key={stat.label} className="space-y-1 pt-4 first:pt-0 sm:pt-0">
                    <p className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                      {stat.value}
                    </p>
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </ItemWrapper>
            )}
          </ContentWrapper>
        </div>
      </section>
    );
  },
);

HeroGrid.displayName = 'HeroGrid';
