'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Button } from '../../foundation/button';
import { cn } from '../../../lib/utils';
import { EASE_OUT } from '../../../lib/animation';

export interface NotFoundPageSecondaryAction {
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
}

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
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();

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
          <p
            className="select-none font-display text-6xl font-semibold tracking-tight text-foreground md:text-7xl"
          >
            {code.slice(0, -1)}
            <span className="text-brand">{code.slice(-1)}</span>
          </p>

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
        </motion.div>
      </section>
    );
  },
);

NotFoundPage.displayName = 'NotFoundPage';
