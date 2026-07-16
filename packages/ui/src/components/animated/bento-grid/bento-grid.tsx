'use client';

import { forwardRef, useRef, type ReactNode } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { EASE_OUT, SPRING_DEFAULT } from '../../../lib/animation';

const STAGGER_SECONDS = 0.06;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER_SECONDS,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: EASE_OUT },
  },
};

export interface BentoGridProps {
  className?: string;
  children?: ReactNode;
}

export interface BentoGridItemProps {
  title: string;
  description: string;
  header?: ReactNode;
  icon?: ReactNode;
  className?: string;
}

/**
 * Responsive bento layout grid. Children should be `BentoGridItem` instances —
 * they stagger in with a fade-and-rise once the grid enters the viewport.
 */
export const BentoGrid = forwardRef<HTMLDivElement, BentoGridProps>(
  ({ className, children }, ref) => {
    const localRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();
    const isInView = useInView(localRef, { once: true, margin: '-80px' });

    const gridClassName = cn(
      'grid auto-rows-[minmax(140px,auto)] grid-cols-1 gap-4 md:grid-cols-3',
      className,
    );

    const setRef = (node: HTMLDivElement | null) => {
      localRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    if (prefersReducedMotion) {
      return (
        <div ref={setRef} className={gridClassName}>
          {children}
        </div>
      );
    }

    return (
      <motion.div
        ref={setRef}
        className={gridClassName}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        {children}
      </motion.div>
    );
  },
);

BentoGrid.displayName = 'BentoGrid';

/**
 * Single bento cell — card surface with optional header visual, icon, title,
 * and description. Use `className` for span overrides (e.g. `md:col-span-2`).
 */
export const BentoGridItem = forwardRef<HTMLDivElement, BentoGridItemProps>(
  ({ title, description, header, icon, className }, ref) => {
    const prefersReducedMotion = useReducedMotion();

    const surfaceClassName = cn(
      'group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card',
      'p-4 shadow-sm transition-shadow duration-300 ease-out md:p-6',
      'hover:border-foreground/20 hover:shadow-xl motion-reduce:transition-none',
      className,
    );

    const content = (
      <>
        {header ? (
          <div className="mb-4 overflow-hidden rounded-lg border border-border bg-muted">
            {header}
          </div>
        ) : null}
        <div className="flex flex-1 flex-col gap-2">
          {icon ? (
            <div className="flex size-9 items-center justify-center rounded-lg bg-brand/10 text-brand">
              {icon}
            </div>
          ) : null}
          <h3 className="text-base font-semibold tracking-tight text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </>
    );

    if (prefersReducedMotion) {
      return (
        <div ref={ref} className={surfaceClassName}>
          {content}
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        className={surfaceClassName}
        variants={itemVariants}
        whileHover={{ y: -4 }}
        transition={SPRING_DEFAULT}
      >
        {content}
      </motion.div>
    );
  },
);

BentoGridItem.displayName = 'BentoGridItem';
