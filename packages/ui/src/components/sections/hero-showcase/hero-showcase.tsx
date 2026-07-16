'use client';

import { forwardRef, useId, type HTMLAttributes, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { TiltCard } from '../../animated/tilt-card';
import { Button } from '../../foundation/button';
import { Card } from '../../foundation/card';
import { DURATION_INSTANT, EASE_OUT, SPRING_DEFAULT } from '../../../lib/animation';
import { cn } from '../../../lib/utils';

export interface HeroShowcaseCtaLink {
  label: string;
  href: string;
}

export interface HeroShowcaseProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title?: string;
  subtitle?: string;
  primaryCta?: HeroShowcaseCtaLink;
  secondaryCta?: HeroShowcaseCtaLink;
  /** Slot for product screenshot, mock UI, or any media inside the framed panel. */
  media?: ReactNode;
}

const DEFAULT_TITLE = 'Showcase your product with depth';
const DEFAULT_SUBTITLE =
  'Split hero with staggered copy on the left and a tilted, floating product frame on the right — pass any media into the bordered slot.';
const DEFAULT_PRIMARY_CTA: HeroShowcaseCtaLink = { label: 'Get started', href: '#start' };
const DEFAULT_SECONDARY_CTA: HeroShowcaseCtaLink = { label: 'Live preview', href: '#preview' };

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

function DefaultMedia() {
  return (
    <div
      className={cn(
        'flex aspect-[4/3] flex-col justify-between p-5',
        '[--dot-color:color-mix(in_oklch,var(--color-foreground)_6%,transparent)]',
        '[background-image:radial-gradient(circle,var(--dot-color)_1px,transparent_1px)]',
        '[background-size:20px_20px]',
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">Dashboard</p>
          <p className="font-display text-lg font-semibold tracking-tight text-foreground">
            Weekly overview
          </p>
        </div>
        <span className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-brand">
          Live
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {['12.4k', '98%', '1.2s'].map((value) => (
          <div
            key={value}
            className="rounded-lg border border-border bg-background/80 px-3 py-2 text-center"
          >
            <p className="font-display text-sm font-semibold text-foreground">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductFrame({ media, isStatic }: { media?: ReactNode; isStatic: boolean }) {
  const frame = (
    <TiltCard
      className="w-full"
      isGlareEnabled={!isStatic}
      maxTilt={8}
      perspective={1000}
      scale={1.01}
    >
      <Card
        className={cn(
          'overflow-hidden border-border/80 shadow-2xl',
          'ring-1 ring-brand/10',
          !isStatic && 'shadow-[0_24px_80px_-20px_color-mix(in_oklab,var(--color-brand)_25%,transparent)]',
        )}
      >
        {media ?? <DefaultMedia />}
      </Card>
    </TiltCard>
  );

  if (isStatic) {
    return (
      <div className="relative w-full [transform:perspective(1000px)_rotateY(-8deg)_rotateX(4deg)]">
        {frame}
      </div>
    );
  }

  return (
    <motion.div
      animate={{ y: 0 }}
      className="relative w-full [transform:perspective(1000px)_rotateY(-8deg)_rotateX(4deg)]"
      initial={{ y: 18 }}
      transition={{ ...SPRING_DEFAULT, delay: 0.2 }}
    >
      {frame}
    </motion.div>
  );
}

export const HeroShowcase = forwardRef<HTMLElement, HeroShowcaseProps>(
  (
    {
      className,
      title = DEFAULT_TITLE,
      subtitle = DEFAULT_SUBTITLE,
      primaryCta = DEFAULT_PRIMARY_CTA,
      secondaryCta = DEFAULT_SECONDARY_CTA,
      media,
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const headingId = useId();
    const isStatic = shouldReduceMotion ?? false;

    const contentMotion = isStatic
      ? { initial: false as const, animate: { opacity: 1 }, transition: DURATION_INSTANT }
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, ease: EASE_OUT },
        };

    const visualMotion = isStatic
      ? { initial: false as const, animate: { opacity: 1 }, transition: DURATION_INSTANT }
      : {
          initial: { opacity: 0, x: 24 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.4, delay: 0.15, ease: EASE_OUT },
        };

    return (
      <section
        ref={ref}
        aria-labelledby={headingId}
        className={cn('relative w-full overflow-hidden bg-background', className)}
        {...props}
      >
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 md:py-24 lg:py-28">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <motion.div className="space-y-6 md:space-y-8" {...contentMotion}>
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
                  <a className={focusRing} href={primaryCta.href}>
                    {primaryCta.label}
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a className={focusRing} href={secondaryCta.href}>
                    {secondaryCta.label}
                  </a>
                </Button>
              </div>
            </motion.div>

            <motion.div className="relative" {...visualMotion}>
              <ProductFrame isStatic={isStatic} media={media} />
            </motion.div>
          </div>
        </div>
      </section>
    );
  },
);

HeroShowcase.displayName = 'HeroShowcase';
