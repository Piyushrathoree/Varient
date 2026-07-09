'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { EASE_OUT } from '../../../lib/animation';
import { Badge } from '../../foundation/badge';

export interface TimelineItem {
  date: string;
  title: string;
  description: string;
  badge?: string;
}

export interface TimelineProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
  items?: TimelineItem[];
}

export const defaultTimelineItems: TimelineItem[] = [
  {
    date: 'Jan 2024',
    title: 'Project kickoff',
    description: 'Assembled the core team and defined the component architecture.',
    badge: 'Milestone',
  },
  {
    date: 'Mar 2024',
    title: 'Foundation layer shipped',
    description: 'Released 25 Radix-powered primitives with token-driven styling.',
  },
  {
    date: 'Jun 2024',
    title: 'Animated layer launched',
    description: 'Added 30 motion components with reduced-motion fallbacks.',
    badge: 'Launch',
  },
  {
    date: 'Sep 2024',
    title: 'Section blocks released',
    description: 'Shipped full-page sections that compose from layers below.',
  },
  {
    date: 'Dec 2024',
    title: 'Open source',
    description: 'Published the library under MIT for the community.',
    badge: 'Public',
  },
];

function TimelineEntry({
  item,
  index,
  shouldReduceMotion,
}: {
  item: TimelineItem;
  index: number;
  shouldReduceMotion: boolean;
}) {
  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.3, ease: EASE_OUT, delay: index * 0.08 },
        viewport: { once: true, amount: 0.3 } as const,
      };

  return (
    <motion.li className="relative pl-8" {...motionProps}>
      <span
        aria-hidden
        className="absolute top-1.5 left-0 size-3 -translate-x-1/2 rounded-full bg-brand ring-4 ring-background"
      />
      <div className="flex flex-wrap items-center gap-2">
        <time className="text-xs text-muted-foreground" dateTime={item.date}>
          {item.date}
        </time>
        {item.badge && (
          <Badge variant="primary" size="sm">
            {item.badge}
          </Badge>
        )}
      </div>
      <h3 className="mt-1 text-sm font-semibold text-foreground">{item.title}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
    </motion.li>
  );
}

export const Timeline = forwardRef<HTMLElement, TimelineProps>(
  (
    {
      className,
      eyebrow = 'Timeline',
      title = (
        <>
          How we got{' '}
          <span className="text-brand">here</span>
        </>
      ),
      description = 'Key milestones on the path from idea to shipped product.',
      items = defaultTimelineItems,
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();

    const headerMotion = shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.3, ease: EASE_OUT },
          viewport: { once: true, amount: 0.4 } as const,
        };

    return (
      <section
        ref={ref}
        className={cn('w-full px-6 py-16 md:px-8 md:py-24', className)}
        aria-labelledby="timeline-heading"
        {...props}
      >
        <motion.header className="max-w-2xl" {...headerMotion}>
          {eyebrow && (
            <p className="text-sm font-medium text-brand">{eyebrow}</p>
          )}
          <h2
            id="timeline-heading"
            className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
          >
            {title}
          </h2>
          {description && (
            <p className="mt-3 text-sm text-muted-foreground md:text-base">{description}</p>
          )}
        </motion.header>

        <ol className="relative mt-10 max-w-2xl space-y-8 border-l border-border pl-0">
          {items.map((item, index) => (
            <TimelineEntry
              key={`${item.title}-${index}`}
              item={item}
              index={index}
              shouldReduceMotion={!!shouldReduceMotion}
            />
          ))}
        </ol>
      </section>
    );
  },
);

Timeline.displayName = 'Timeline';
