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

export interface CtaSocialProofAvatar {
  src: string;
  alt?: string;
}

export interface CtaSocialProof {
  /** Small overlapping avatar stack rendered before the text line. */
  avatars?: CtaSocialProofAvatar[];
  /** e.g. "Trusted by 2,400+ engineering teams" */
  text: string;
}

export type CtaVariant = 'default' | 'brand' | 'minimal';

/** Visual emphasis of the secondary action. `ghost` — quiet filled hover. `link` — text-only underline. */
export type CtaSecondaryEmphasis = 'outline' | 'ghost' | 'link';

export interface CtaProps extends HTMLAttributes<HTMLElement> {
  /** Small label rendered above the title, e.g. "Limited time" or a product name. */
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  /** Emphasis style for the secondary action button. Defaults to `outline`. */
  secondaryCtaEmphasis?: CtaSecondaryEmphasis;
  /** Optional avatar stack + trust line rendered below the actions. */
  socialProof?: CtaSocialProof;
  /** `default` — card surface. `brand` — subtle brand gradient border. `minimal` — borderless, transparent. */
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
  minimal: 'border-0 bg-transparent shadow-none',
};

const secondaryEmphasisToButtonVariant: Record<CtaSecondaryEmphasis, 'outline' | 'ghost' | 'link'> = {
  outline: 'outline',
  ghost: 'ghost',
  link: 'link',
};

export const Cta = forwardRef<HTMLElement, CtaProps>(
  (
    {
      className,
      eyebrow,
      title = DEFAULT_TITLE,
      description = DEFAULT_DESCRIPTION,
      primaryCta = DEFAULT_PRIMARY_CTA,
      secondaryCta,
      secondaryCtaEmphasis = 'outline',
      socialProof,
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
          {eyebrow && (
            <span className="text-xs font-semibold tracking-wide text-brand uppercase">
              {eyebrow}
            </span>
          )}
          <h2
            id={headingId}
            className={cn(
              'text-balance font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl',
              eyebrow && 'mt-2',
            )}
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
              <Button asChild size="lg" variant={secondaryEmphasisToButtonVariant[secondaryCtaEmphasis]}>
                <a href={secondaryCta.href}>{secondaryCta.label}</a>
              </Button>
            )}
          </div>
          {socialProof && (
            <div className="mt-6 flex items-center gap-3">
              {socialProof.avatars && socialProof.avatars.length > 0 && (
                <div className="flex -space-x-2" aria-hidden="true">
                  {socialProof.avatars.slice(0, 5).map((avatar, index) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={avatar.src + index}
                      alt={avatar.alt ?? ''}
                      className="h-7 w-7 rounded-full border-2 border-card object-cover"
                      src={avatar.src}
                    />
                  ))}
                </div>
              )}
              <span className="text-xs text-muted-foreground">{socialProof.text}</span>
            </div>
          )}
        </motion.div>
      </section>
    );
  },
);

Cta.displayName = 'Cta';
