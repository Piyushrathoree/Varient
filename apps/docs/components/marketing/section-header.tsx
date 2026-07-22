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

/** Prefixes the eyebrow with `// ` (mono, drafting-table style). Callers pass a
 * plain string ("why varient"); any leading `//` they already included is
 * stripped first so the prefix never doubles up. Non-string nodes are left
 * as-is aside from the visual `// ` lead-in. */
function withCommentPrefix(eyebrow: ReactNode): ReactNode {
  if (typeof eyebrow === 'string') {
    return `// ${eyebrow.replace(/^\/\/\s*/, '')}`;
  }
  return (
    <>
      {'// '}
      {eyebrow}
    </>
  );
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
            'mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-brand',
            isCenter && 'text-center',
          )}
          {...fadeUp(0)}
        >
          {withCommentPrefix(eyebrow)}
        </motion.p>
      )}
      <motion.h2
        className={cn(
          'font-title font-semibold text-3xl text-foreground tracking-[-0.03em] [text-wrap:balance] sm:text-4xl',
          isCenter && 'text-center',
        )}
        {...fadeUp(0.05)}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          className={cn(
            'mt-4 max-w-[56ch] text-smooth-900 [text-wrap:balance] md:text-lg',
            isCenter && 'mx-auto text-center',
          )}
          {...fadeUp(0.1)}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
