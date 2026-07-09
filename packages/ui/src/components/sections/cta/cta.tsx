'use client';

import { forwardRef, useId, type HTMLAttributes } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Button } from '../../foundation/button';
import { DURATION_INSTANT, EASE_OUT } from '../../../lib/animation';
import { cn } from '../../../lib/utils';

export interface CtaLink {
  label: string;
  href: string;
}

export type CtaVariant = 'default' | 'brand';

export interface CtaProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  /** `default` — card surface. `brand` — subtle brand gradient border. */
  variant?: CtaVariant;
}

const DEFAULT_TITLE = 'Ready to get started';
const DEFAULT_DESCRIPTION =
  'Copy components directly into your project. No runtime dependency — you own every line.';
const DEFAULT_PRIMARY_CTA: CtaLink = { label: 'Browse components', href: '#components' };

const variantStyles: Record<CtaVariant, string> = {
  default: 'border border-border bg-card shadow-sm',
  brand:
    'border-2 border-transparent bg-card shadow-sm [background:linear-gradient(var(--color-card),var(--color-card))_padding-box,linear-gradient(135deg,var(--color-brand),var(--color-brand-secondary))_border-box]',
};

export const Cta = forwardRef<HTMLElement, CtaProps>(
  (
    {
      className,
      title = DEFAULT_TITLE,
      description = DEFAULT_DESCRIPTION,
      primaryCta = DEFAULT_PRIMARY_CTA,
      secondaryCta,
      variant = 'default',
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const headingId = useId();

    const motionProps = shouldReduceMotion
      ? { initial: false as const, animate: { opacity: 1 }, transition: DURATION_INSTANT }
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-40px' },
          transition: { duration: 0.35, ease: EASE_OUT },
        };

    return (
      <section
        ref={ref}
        aria-labelledby={headingId}
        className={cn('w-full px-6 sm:px-8', className)}
        {...props}
      >
        <motion.div
          className={cn(
            'mx-auto flex max-w-3xl flex-col items-center rounded-2xl px-6 py-10 text-center sm:px-10 sm:py-12 md:py-14',
            variantStyles[variant],
          )}
          {...motionProps}
        >
          <h2
            id={headingId}
            className="text-balance font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
          >
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-balance text-sm text-muted-foreground sm:text-base">
            {description}
          </p>
          <div className="mt-6 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <Button asChild size="lg" variant="primary">
              <a href={primaryCta.href}>{primaryCta.label}</a>
            </Button>
            {secondaryCta && (
              <Button asChild size="lg" variant="outline">
                <a href={secondaryCta.href}>{secondaryCta.label}</a>
              </Button>
            )}
          </div>
        </motion.div>
      </section>
    );
  },
);

Cta.displayName = 'Cta';
