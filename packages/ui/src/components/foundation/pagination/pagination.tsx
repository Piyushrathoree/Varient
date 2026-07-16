'use client';

import {
  createContext,
  forwardRef,
  useContext,
  useId,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
} from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { DURATION_INSTANT, SPRING_DEFAULT } from '../../../lib/animation';

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  /** Current page — 1-based. */
  page: number;
  /** Total number of pages. */
  pageCount: number;
  /** Called when the user selects a different page. */
  onPageChange: (page: number) => void;
  /** Pages shown on each side of the current page. */
  siblingCount?: number;
  /** Always include the first and last page when truncating. */
  showEdges?: boolean;
}

// Shared indicator id — only present when PaginationButton renders inside
// <Pagination>. This lets the active page's background be a single
// `motion.span` sliding between buttons via `layoutId` (the same shared
// layout pattern as Tabs' selected indicator) instead of two elements
// cross-fading. Standalone `Pagination.Button` usage (no provider) falls
// back to a plain, unanimated fill.
const PaginationIndicatorContext = createContext<string | null>(null);

type PaginationItem = number | 'ellipsis';

function createRange(start: number, end: number): number[] {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => start + index);
}

function generatePaginationRange(
  page: number,
  pageCount: number,
  siblingCount: number,
  showEdges: boolean,
): PaginationItem[] {
  if (pageCount <= 0) return [];
  if (pageCount === 1) return [1];

  const totalSiblingSlots = siblingCount * 2 + 1;
  const totalVisibleSlots = showEdges ? totalSiblingSlots + 4 : totalSiblingSlots + 2;

  if (pageCount <= totalVisibleSlots) {
    return createRange(1, pageCount);
  }

  const leftSiblingIndex = Math.max(page - siblingCount, 1);
  const rightSiblingIndex = Math.min(page + siblingCount, pageCount);

  if (!showEdges) {
    const start = Math.max(1, page - siblingCount);
    const end = Math.min(pageCount, page + siblingCount);
    const range: PaginationItem[] = createRange(start, end);

    if (start > 1) {
      range.unshift('ellipsis');
    }
    if (end < pageCount) {
      range.push('ellipsis');
    }

    return range;
  }

  const shouldShowLeftEllipsis = leftSiblingIndex > 2;
  const shouldShowRightEllipsis = rightSiblingIndex < pageCount - 1;

  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const leftItemCount = 3 + siblingCount * 2;
    const leftRange = createRange(1, leftItemCount);
    return [...leftRange, 'ellipsis', pageCount];
  }

  if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    const rightItemCount = 3 + siblingCount * 2;
    const rightRange = createRange(pageCount - rightItemCount + 1, pageCount);
    return [1, 'ellipsis', ...rightRange];
  }

  if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const middleRange = createRange(leftSiblingIndex, rightSiblingIndex);
    return [1, 'ellipsis', ...middleRange, 'ellipsis', pageCount];
  }

  return createRange(1, pageCount);
}

const paginationButtonStyles = cn(
  'relative inline-flex size-9 cursor-pointer items-center justify-center rounded-md text-sm font-medium whitespace-nowrap ring-offset-background transition-[transform,background-color,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  'disabled:pointer-events-none disabled:opacity-50',
);

function ChevronLeftIcon({ className }: { className?: string }) {
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

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

export interface PaginationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

const PaginationButton = forwardRef<HTMLButtonElement, PaginationButtonProps>(
  ({ className, isActive = false, type = 'button', children, ...props }, ref) => {
    const idBase = useContext(PaginationIndicatorContext);
    const shouldReduceMotion = useReducedMotion();

    return (
      <button
        ref={ref}
        type={type}
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          paginationButtonStyles,
          isActive
            ? 'text-white'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground',
          className,
        )}
        {...props}
      >
        {isActive && (
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-md bg-brand"
            layout
            layoutId={idBase ? `${idBase}-pagination-active` : undefined}
            transition={shouldReduceMotion ? DURATION_INSTANT : SPRING_DEFAULT}
          />
        )}
        <span className="relative z-10 inline-flex items-center justify-center">{children}</span>
      </button>
    );
  },
);
PaginationButton.displayName = 'Pagination.Button';

export interface PaginationEllipsisProps extends HTMLAttributes<HTMLSpanElement> {}

const PaginationEllipsis = forwardRef<HTMLSpanElement, PaginationEllipsisProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn(
        'inline-flex size-9 items-center justify-center text-sm text-muted-foreground',
        className,
      )}
      {...props}
    >
      <span className="sr-only">More pages</span>
      …
    </span>
  ),
);
PaginationEllipsis.displayName = 'Pagination.Ellipsis';

const PaginationRoot = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      className,
      page,
      pageCount,
      onPageChange,
      siblingCount = 1,
      showEdges = true,
      ...props
    },
    ref,
  ) => {
    const idBase = useId();
    const safePage = Math.min(Math.max(page, 1), Math.max(pageCount, 1));
    const items = generatePaginationRange(safePage, pageCount, siblingCount, showEdges);
    const isPrevDisabled = safePage <= 1;
    const isNextDisabled = safePage >= pageCount || pageCount <= 0;

    return (
      <nav
        ref={ref}
        aria-label="pagination"
        className={cn('flex items-center gap-1', className)}
        {...props}
      >
        <PaginationIndicatorContext.Provider value={idBase}>
          <PaginationButton
            aria-label="Go to previous page"
            disabled={isPrevDisabled}
            onClick={() => onPageChange(safePage - 1)}
          >
            <ChevronLeftIcon className="size-4" />
          </PaginationButton>

          {items.map((item, index) =>
            item === 'ellipsis' ? (
              <PaginationEllipsis key={`ellipsis-${index}`} />
            ) : (
              <PaginationButton
                key={item}
                isActive={item === safePage}
                aria-label={`Go to page ${item}`}
                onClick={() => onPageChange(item)}
              >
                {item}
              </PaginationButton>
            ),
          )}

          <PaginationButton
            aria-label="Go to next page"
            disabled={isNextDisabled}
            onClick={() => onPageChange(safePage + 1)}
          >
            <ChevronRightIcon className="size-4" />
          </PaginationButton>
        </PaginationIndicatorContext.Provider>
      </nav>
    );
  },
);
PaginationRoot.displayName = 'Pagination';

export const Pagination = Object.assign(PaginationRoot, {
  Button: PaginationButton,
  Ellipsis: PaginationEllipsis,
});

export { PaginationButton, PaginationEllipsis };
