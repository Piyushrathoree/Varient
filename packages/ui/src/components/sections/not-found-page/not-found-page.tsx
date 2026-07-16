'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { DotPattern } from '../../animated/dot-pattern';
import { Button } from '../../foundation/button';
import { cn } from '../../../lib/utils';
import { EASE_OUT } from '../../../lib/animation';

export interface NotFoundPageSecondaryAction {
  label: string;
  href: string;
}

export interface NotFoundPagePopularLink {
  label: string;
  href: string;
}

export interface NotFoundPageProps extends HTMLAttributes<HTMLElement> {
  code?: string;
  title?: string;
  description?: string;
  homeHref?: string;
  homeLabel?: string;
  secondaryAction?: NotFoundPageSecondaryAction;
  /** Optional second self-serve path — a short list of links rendered below the actions. */
  popularLinks?: NotFoundPagePopularLink[];
}

/** Only fully-numeric codes get the split brand-accent digit — non-numeric
 * codes (e.g. "Oops", "N/A") render as a single block so the last glyph
 * isn't arbitrarily recolored. */
const isNumericCode = (value: string) => /^\d+$/.test(value);

export const NotFoundPage = forwardRef<HTMLElement, NotFoundPageProps>(
  (
    {
      className,
      code = '404',
      title = 'Page not found',
      description = "The page you're looking for doesn't exist or has been moved.",
      homeHref = '/',
      homeLabel = 'Back to home',
      secondaryAction,
      popularLinks,
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const numeric = isNumericCode(code);

    const entrance = shouldReduceMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, ease: EASE_OUT },
        };

    return (
      <section
        ref={ref}
        aria-labelledby="not-found-title"
        className={cn(
          'flex min-h-[40vh] w-full flex-col items-center justify-center px-6 py-12 text-center md:min-h-[50vh] md:px-8 md:py-16',
          className,
        )}
        {...props}
      >
        <motion.div
          className="mx-auto flex max-w-md flex-col items-center gap-6"
          {...entrance}
        >
          <div className="relative flex w-full items-center justify-center py-2">
            <DotPattern
              size={14}
              radius={1}
              className="[mask-image:radial-gradient(closest-side,black,transparent)]"
            />
            <p className="relative select-none font-display text-6xl font-semibold tracking-tight text-foreground md:text-7xl">
              {numeric ? (
                <>
                  {code.slice(0, -1)}
                  <span className="text-brand">{code.slice(-1)}</span>
                </>
              ) : (
                code
              )}
            </p>
          </div>

          <div className="space-y-2">
            <h1
              id="not-found-title"
              className="font-display text-xl font-semibold tracking-tight text-foreground"
            >
              {title}
            </h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="primary">
              <a href={homeHref}>{homeLabel}</a>
            </Button>
            {secondaryAction && (
              <Button asChild variant="ghost">
                <a href={secondaryAction.href}>{secondaryAction.label}</a>
              </Button>
            )}
          </div>

          {popularLinks && popularLinks.length > 0 && (
            <nav aria-label="Popular links" className="flex flex-col items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Popular pages
              </span>
              <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
                {popularLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-brand hover:decoration-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </motion.div>
      </section>
    );
  },
);

NotFoundPage.displayName = 'NotFoundPage';
