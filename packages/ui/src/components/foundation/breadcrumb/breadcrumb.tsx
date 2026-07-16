'use client';

import {
  forwardRef,
  useState,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type LiHTMLAttributes,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { DURATION, DURATION_INSTANT } from '../../../lib/animation';

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {}

const BreadcrumbRoot = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, ...props }, ref) => (
    <nav ref={ref} aria-label="breadcrumb" className={cn(className)} {...props} />
  ),
);
BreadcrumbRoot.displayName = 'Breadcrumb';

export interface BreadcrumbListProps extends HTMLAttributes<HTMLOListElement> {}

const BreadcrumbList = forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn('flex flex-wrap items-center gap-1.5 text-sm', className)}
      {...props}
    />
  ),
);
BreadcrumbList.displayName = 'Breadcrumb.List';

export interface BreadcrumbItemProps extends LiHTMLAttributes<HTMLLIElement> {}

const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('inline-flex items-center gap-1.5', className)} {...props} />
  ),
);
BreadcrumbItem.displayName = 'Breadcrumb.Item';

export interface BreadcrumbLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        'text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className,
      )}
      {...props}
    />
  ),
);
BreadcrumbLink.displayName = 'Breadcrumb.Link';

export interface BreadcrumbPageProps extends HTMLAttributes<HTMLSpanElement> {}

const BreadcrumbPage = forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      aria-current="page"
      className={cn('font-medium text-foreground', className)}
      {...props}
    />
  ),
);
BreadcrumbPage.displayName = 'Breadcrumb.Page';

export interface BreadcrumbSeparatorProps extends LiHTMLAttributes<HTMLLIElement> {}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      viewBox="0 0 24 24"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

const BreadcrumbSeparator = forwardRef<HTMLLIElement, BreadcrumbSeparatorProps>(
  ({ className, children, ...props }, ref) => (
    <li
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={cn('inline-flex items-center text-muted-foreground', className)}
      {...props}
    >
      {children ?? <ChevronRightIcon className="size-3.5" />}
    </li>
  ),
);
BreadcrumbSeparator.displayName = 'Breadcrumb.Separator';

export interface BreadcrumbEllipsisProps extends HTMLAttributes<HTMLSpanElement> {}

const BreadcrumbEllipsis = forwardRef<HTMLSpanElement, BreadcrumbEllipsisProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={cn('flex size-5 items-center justify-center text-muted-foreground', className)}
      {...props}
    >
      <span className="sr-only">More</span>
      …
    </span>
  ),
);
BreadcrumbEllipsis.displayName = 'Breadcrumb.Ellipsis';

export interface BreadcrumbAutoItem {
  /** Unique key — falls back to the label + index when omitted. */
  key?: string;
  label: ReactNode;
  href?: string;
  /** Marks the trailing/current item — rendered as `Breadcrumb.Page` instead of a link. */
  isCurrent?: boolean;
}

export interface BreadcrumbAutoProps extends Omit<BreadcrumbProps, 'children'> {
  items: BreadcrumbAutoItem[];
  /**
   * Items rendered before auto-collapsing kicks in. Below this count the full
   * trail is shown as-is. @default 5
   */
  maxItems?: number;
  /** Items always kept visible at the start of the trail. @default 1 */
  itemsBeforeCollapse?: number;
  /** Items always kept visible at the end of the trail. @default 2 */
  itemsAfterCollapse?: number;
  /** Custom separator node — passed through to every `Breadcrumb.Separator`. */
  separator?: ReactNode;
}

/**
 * Auto-collapsing breadcrumb trail. Renders every item as-is while the trail
 * is within `maxItems`; past that, middle items collapse behind an ellipsis
 * that expands the full trail in place on click (gated fade under
 * reduced-motion).
 */
const BreadcrumbAuto = forwardRef<HTMLElement, BreadcrumbAutoProps>(
  (
    {
      items,
      maxItems = 5,
      itemsBeforeCollapse = 1,
      itemsAfterCollapse = 2,
      separator,
      className,
      ...props
    },
    ref,
  ) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    const shouldCollapse = !isExpanded && items.length > maxItems;

    const itemKey = (item: BreadcrumbAutoItem, index: number) =>
      item.key ?? `${index}-${typeof item.label === 'string' ? item.label : index}`;

    const renderItem = (item: BreadcrumbAutoItem, index: number) => (
      <motion.li
        key={itemKey(item, index)}
        layout={!shouldReduceMotion}
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={shouldReduceMotion ? undefined : { opacity: 0 }}
        transition={shouldReduceMotion ? DURATION_INSTANT : { duration: DURATION.fast }}
        className="inline-flex items-center gap-1.5"
      >
        {item.isCurrent || !item.href ? (
          <BreadcrumbPage>{item.label}</BreadcrumbPage>
        ) : (
          <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
        )}
      </motion.li>
    );

    const renderSeparator = (key: string) => (
      <BreadcrumbSeparator key={key}>{separator}</BreadcrumbSeparator>
    );

    return (
      <BreadcrumbRoot ref={ref} className={className} {...props}>
        <BreadcrumbList>
          <AnimatePresence initial={false} mode="popLayout">
            {shouldCollapse
              ? [
                  ...items.slice(0, itemsBeforeCollapse).map(renderItem),
                  renderSeparator('sep-before'),
                  <motion.li
                    key="ellipsis"
                    layout={!shouldReduceMotion}
                    initial={shouldReduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                    transition={shouldReduceMotion ? DURATION_INSTANT : { duration: DURATION.fast }}
                    className="inline-flex items-center"
                  >
                    <button
                      type="button"
                      onClick={() => setIsExpanded(true)}
                      aria-label="Show all breadcrumb items"
                      className="flex size-5 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <BreadcrumbEllipsis className="pointer-events-none" />
                    </button>
                  </motion.li>,
                  renderSeparator('sep-after'),
                  ...items.slice(items.length - itemsAfterCollapse).map(renderItem),
                ]
              : items.flatMap((item, index) => {
                  const nodes = [renderItem(item, index)];
                  if (index < items.length - 1) nodes.push(renderSeparator(`sep-${itemKey(item, index)}`));
                  return nodes;
                })}
          </AnimatePresence>
        </BreadcrumbList>
      </BreadcrumbRoot>
    );
  },
);
BreadcrumbAuto.displayName = 'Breadcrumb.Auto';

export const Breadcrumb = Object.assign(BreadcrumbRoot, {
  List: BreadcrumbList,
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  Page: BreadcrumbPage,
  Separator: BreadcrumbSeparator,
  Ellipsis: BreadcrumbEllipsis,
  Auto: BreadcrumbAuto,
});

export {
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  BreadcrumbAuto,
};
