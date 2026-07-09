'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Badge } from '../../foundation/badge';
import { cn } from '../../../lib/utils';
import { EASE_OUT } from '../../../lib/animation';

export type ChangelogChangeType = 'added' | 'improved' | 'fixed';

export interface ChangelogChange {
  type: ChangelogChangeType;
  text: string;
}

export interface ChangelogEntry {
  version: string;
  date: string;
  title?: string;
  changes: ChangelogChange[];
}

export interface ChangelogProps extends HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title?: string;
  description?: string;
  entries?: ChangelogEntry[];
}

const changeTypeLabels: Record<ChangelogChangeType, string> = {
  added: 'Added',
  improved: 'Improved',
  fixed: 'Fixed',
};

const changeTypeVariants: Record<
  ChangelogChangeType,
  'success' | 'primary' | 'warning'
> = {
  added: 'success',
  improved: 'primary',
  fixed: 'warning',
};

export const defaultChangelogEntries: ChangelogEntry[] = [
  {
    version: '1.2.0',
    date: 'Jul 1, 2026',
    title: 'Sections layer ships',
    changes: [
      { type: 'added', text: 'Integration grid, changelog, and 404 page sections.' },
      { type: 'added', text: 'Success and warning semantic tokens for status badges.' },
      { type: 'improved', text: 'Card hover states now lift with a softer shadow transition.' },
    ],
  },
  {
    version: '1.1.0',
    date: 'Jun 12, 2026',
    title: 'Animated layer polish',
    changes: [
      { type: 'added', text: 'Blur fade, border beam, and shimmer button components.' },
      { type: 'improved', text: 'Every animated component now gates motion behind prefers-reduced-motion.' },
      { type: 'fixed', text: 'Switch thumb no longer jumps on first render in Safari.' },
    ],
  },
  {
    version: '1.0.0',
    date: 'May 20, 2026',
    title: 'Foundation layer launch',
    changes: [
      { type: 'added', text: '25 Radix-powered foundation components with copy-paste docs.' },
      { type: 'added', text: 'Light and dark themes via semantic color tokens.' },
      { type: 'fixed', text: 'Accordion panel height animation respects reduced motion.' },
    ],
  },
];

function ChangeItem({ change }: { change: ChangelogChange }) {
  return (
    <li className="flex items-start gap-3">
      <Badge
        appearance="soft"
        className="mt-0.5 shrink-0"
        shape="square"
        size="sm"
        variant={changeTypeVariants[change.type]}
      >
        {changeTypeLabels[change.type]}
      </Badge>
      <span className="line-clamp-2 text-sm text-muted-foreground">{change.text}</span>
    </li>
  );
}

function ChangelogEntryRow({
  entry,
  index,
  isLast,
  shouldReduceMotion,
}: {
  entry: ChangelogEntry;
  index: number;
  isLast: boolean;
  shouldReduceMotion: boolean;
}) {
  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 10 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.3, ease: EASE_OUT, delay: index * 0.06 },
        viewport: { once: true, amount: 0.2 } as const,
      };

  return (
    <motion.article
      className={cn(!isLast && 'border-b border-border pb-8')}
      {...motionProps}
    >
      <div className="sticky top-0 z-10 -mx-1 flex flex-wrap items-center gap-x-3 gap-y-1 bg-background/95 px-1 py-2 backdrop-blur-sm">
        <Badge
          appearance="soft"
          className="font-mono"
          shape="square"
          size="sm"
          variant="default"
        >
          v{entry.version}
        </Badge>
        <time className="text-xs text-muted-foreground" dateTime={entry.date}>
          {entry.date}
        </time>
      </div>

      {entry.title && (
        <h3 className="mt-2 text-sm font-semibold text-foreground">{entry.title}</h3>
      )}

      <ul className="mt-4 space-y-3">
        {entry.changes.map((change, changeIndex) => (
          <ChangeItem key={`${change.type}-${changeIndex}`} change={change} />
        ))}
      </ul>
    </motion.article>
  );
}

export const Changelog = forwardRef<HTMLElement, ChangelogProps>(
  (
    {
      className,
      eyebrow = 'Changelog',
      title = 'What shipped recently',
      description = 'A running log of releases — new sections, polish passes, and fixes.',
      entries = defaultChangelogEntries,
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
        aria-labelledby="changelog-heading"
        className={cn('w-full px-6 py-16 md:px-8 md:py-24', className)}
        {...props}
      >
        <div className="mx-auto max-w-2xl">
          <motion.header className="max-w-xl" {...headerMotion}>
            {eyebrow && (
              <p className="text-sm font-medium text-brand">{eyebrow}</p>
            )}
            <h2
              id="changelog-heading"
              className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
            >
              {title}
            </h2>
            {description && (
              <p className="mt-3 text-sm text-muted-foreground md:text-base">{description}</p>
            )}
          </motion.header>

          <div className="mt-10 space-y-8">
            {entries.map((entry, index) => (
              <ChangelogEntryRow
                key={`${entry.version}-${index}`}
                entry={entry}
                index={index}
                isLast={index === entries.length - 1}
                shouldReduceMotion={!!shouldReduceMotion}
              />
            ))}
          </div>
        </div>
      </section>
    );
  },
);

Changelog.displayName = 'Changelog';
