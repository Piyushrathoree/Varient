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

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  align = 'center',
}: SectionHeaderProps) {
  const shouldReduceMotion = useReducedMotion();
  const isCenter = align === 'center';

  const fadeUp = (delay: number) => ({
    initial: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 },
    whileInView: shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: shouldReduceMotion
      ? { duration: 0 }
      : { duration: 0.45, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
    viewport: { once: true, amount: 0.4 } as const,
  });

  return (
    <div className={cn('max-w-2xl', isCenter && 'mx-auto text-center', className)}>
      {eyebrow && (
        <motion.p
          className={cn(
            'mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground',
            isCenter && 'text-center',
          )}
          {...fadeUp(0)}
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        className={cn(
          'text-balance font-display font-semibold text-3xl tracking-tight text-foreground md:text-4xl',
          isCenter && 'text-center',
        )}
        {...fadeUp(0.05)}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          className={cn(
            'mt-4 text-balance text-muted-foreground md:text-lg',
            isCenter && 'text-center',
          )}
          {...fadeUp(0.1)}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
