'use client';

import { forwardRef, useRef, type CSSProperties, type ReactNode } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { EASE_OUT } from '../../../lib/animation';

const STAGGER_SECONDS = 0.07;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER_SECONDS,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE_OUT },
  },
};

const COL_SPAN_CLASSES = {
  1: '',
  2: 'md:col-span-2',
  3: 'md:col-span-3',
} as const;

const ROW_SPAN_CLASSES = {
  1: '',
  2: 'md:row-span-2',
} as const;

export interface BentoShowcaseProps {
  className?: string;
  children?: ReactNode;
}

export interface BentoShowcaseCardProps {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  /** Decorative background mounted behind card content. */
  background?: ReactNode;
  /** Footer slot — slides up on hover (e.g. CTA link). */
  footer?: ReactNode;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
  /** Opacity applied to sibling cards while another card in the grid is hovered (0-1). @default 0.55 */
  dimOpacity?: number;
  className?: string;
}

/**
 * Rich animated bento layout — staggered whileInView entrance, group hover
 * dimming (siblings fade, hovered cell stays full opacity), and hover-reveal
 * footers. Compose with `BentoShowcaseCard` cells.
 */
export const BentoShowcase = forwardRef<HTMLDivElement, BentoShowcaseProps>(
  ({ className, children }, ref) => {
    const localRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();
    const isInView = useInView(localRef, { once: true, margin: '-80px' });

    const gridClassName = cn(
      'group/showcase grid auto-rows-[minmax(160px,auto)] grid-cols-1 gap-4 md:grid-cols-3',
      className,
    );

    const setRef = (node: HTMLDivElement | null) => {
      localRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    if (shouldReduceMotion) {
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

BentoShowcase.displayName = 'BentoShowcase';

/**
 * Single showcase cell with optional background layer, icon, copy, and a
 * hover-revealed footer. Siblings dim slightly when any card in the grid is hovered.
 */
export const BentoShowcaseCard = forwardRef<HTMLDivElement, BentoShowcaseCardProps>(
  (
    {
      title,
      description,
      icon,
      background,
      footer,
      colSpan = 1,
      rowSpan = 1,
      dimOpacity = 0.55,
      className,
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();

    const surfaceClassName = cn(
      'group/card relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card',
      'shadow-sm transition-[opacity,box-shadow,border-color] duration-300 ease-out',
      'group-hover/showcase:opacity-[var(--bento-dim-opacity)] hover:!opacity-100 hover:border-foreground/20 hover:shadow-xl',
      'motion-reduce:transition-none',
      COL_SPAN_CLASSES[colSpan],
      ROW_SPAN_CLASSES[rowSpan],
      className,
    );

    const surfaceStyle = {
      '--bento-dim-opacity': dimOpacity,
    } as CSSProperties;

    const content = (
      <>
        {background ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden opacity-80"
          >
            {background}
          </div>
        ) : null}

        <div className="relative z-10 flex flex-1 flex-col p-4 md:p-6">
          <div className="flex flex-1 flex-col gap-3">
            {icon ? (
              <div className="flex size-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                {icon}
              </div>
            ) : null}
            <div className="space-y-2">
              <h3 className="text-base font-semibold tracking-tight text-foreground">
                {title}
              </h3>
              {description ? (
                <p className="text-sm text-muted-foreground">{description}</p>
              ) : null}
            </div>
          </div>

          {footer ? (
            <div
              className={cn(
                'mt-4 translate-y-2 opacity-0 transition-[transform,opacity] duration-300 ease-out',
                'group-hover/card:translate-y-0 group-hover/card:opacity-100',
                'motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none',
              )}
            >
              {footer}
            </div>
          ) : null}
        </div>
      </>
    );

    if (shouldReduceMotion) {
      return (
        <div ref={ref} className={surfaceClassName} style={surfaceStyle}>
          {content}
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        className={surfaceClassName}
        style={surfaceStyle}
        variants={cardVariants}
      >
        {content}
      </motion.div>
    );
  },
);

BentoShowcaseCard.displayName = 'BentoShowcaseCard';
