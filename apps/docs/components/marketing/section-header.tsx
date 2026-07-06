'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@varient/ui';

export interface SectionHeaderProps {
  align?: 'center' | 'left';
  className?: string;
  description?: ReactNode;
  eyebrow?: ReactNode;
  title: ReactNode;
}

/**
 * Ported from SmoothUI's `components/landing/section-header.tsx` — the
 * eyebrow/headline/description block shared by Features and (optionally)
 * other sections. Reduced-motion collapses the staggered fade-up to a plain,
 * instant reveal.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  align = 'center',
}: SectionHeaderProps) {
  const shouldReduceMotion = useReducedMotion();

  const transition = (delay: number) =>
    shouldReduceMotion ? { duration: 0 } : { type: 'spring' as const, duration: 0.3, bounce: 0.1, delay };

  const fadeUp = (delay: number) => ({
    initial: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, transform: 'translateY(10px)' },
    whileInView: shouldReduceMotion ? { opacity: 1 } : { opacity: 1, transform: 'translateY(0px)' },
    transition: transition(delay),
    viewport: { once: true, amount: 0.5 } as const,
  });

  const isCenter = align === 'center';

  return (
    <div className={cn('max-w-2xl', isCenter && 'mx-auto text-center', className)}>
      {eyebrow && (
        <motion.p
          className={cn('mb-2 font-medium text-brand text-sm uppercase tracking-wider', isCenter && 'text-center')}
          {...fadeUp(0)}
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        className={cn(
          'text-balance font-display font-semibold text-3xl text-foreground transition md:text-4xl',
          isCenter && 'text-center',
        )}
        {...fadeUp(0.05)}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          className={cn('mt-4 text-balance text-primary-foreground transition', isCenter && 'text-center')}
          {...fadeUp(0.1)}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
