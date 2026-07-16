'use client';

import {
  forwardRef,
  useCallback,
  useState,
  type ForwardedRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from 'react';
import { Reorder, useDragControls, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { DURATION_INSTANT, SPRING_DEFAULT } from '../../../lib/animation';

export interface SortableListProps<T> {
  /** Ordered data driving the list — the single source of truth. */
  items: T[];
  /** Fires with the full new order after a drag, a keyboard move, or a row button click. */
  onReorder: (items: T[]) => void;
  /** Renders a row's content from its item. */
  renderItem: (item: T) => ReactNode;
  /** Stable identity for list/React keys. Defaults to `item.id` when present, else the item itself. */
  getKey?: (item: T) => string | number;
  /** Shows a dedicated grip handle as the only drag surface — the row body no longer drags. */
  showHandle?: boolean;
  /** Disables drag and reordering; rows stay visible and readable. */
  isDisabled?: boolean;
  /** Accessible name for the list. */
  'aria-label'?: string;
  className?: string;
  /** Merged onto every row. */
  itemClassName?: string;
}

function defaultGetKey<T>(item: T): string | number {
  if (item !== null && typeof item === 'object' && 'id' in (item as Record<string, unknown>)) {
    const id = (item as Record<string, unknown>).id;
    if (typeof id === 'string' || typeof id === 'number') return id;
  }
  return item as unknown as string | number;
}

function GripIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <circle cx="7" cy="5" r="1.3" />
      <circle cx="13" cy="5" r="1.3" />
      <circle cx="7" cy="10" r="1.3" />
      <circle cx="13" cy="10" r="1.3" />
      <circle cx="7" cy="15" r="1.3" />
      <circle cx="13" cy="15" r="1.3" />
    </svg>
  );
}

function ChevronUpIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m5 12 5-5 5 5" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m5 8 5 5 5-5" />
    </svg>
  );
}

interface SortableListRowProps<T> {
  item: T;
  index: number;
  total: number;
  renderItem: (item: T) => ReactNode;
  showHandle: boolean;
  isDisabled: boolean;
  shouldReduceMotion: boolean;
  itemClassName?: string;
  onKeyDown: (event: ReactKeyboardEvent<HTMLLIElement>) => void;
  onMove: (direction: -1 | 1) => void;
}

// One draggable row. `whileDrag` gives it the spring-driven lift while
// `isDragging` (tracked locally from onDragStart/onDragEnd) toggles the
// instantaneous shadow/z-index/cursor classes that shouldn't be springed.
function SortableListRow<T>({
  item,
  index,
  total,
  renderItem,
  showHandle,
  isDisabled,
  shouldReduceMotion,
  itemClassName,
  onKeyDown,
  onMove,
}: SortableListRowProps<T>) {
  const dragControls = useDragControls();
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Reorder.Item
      value={item}
      as="li"
      layout
      drag={isDisabled ? false : 'y'}
      dragListener={!showHandle && !isDisabled}
      dragControls={showHandle ? dragControls : undefined}
      dragElastic={0.08}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      whileDrag={shouldReduceMotion ? undefined : { scale: 1.02 }}
      transition={shouldReduceMotion ? DURATION_INSTANT : SPRING_DEFAULT}
      tabIndex={isDisabled ? -1 : 0}
      aria-label={`Item ${index + 1} of ${total}`}
      onKeyDown={onKeyDown}
      className={cn(
        'group relative flex touch-none items-center gap-3 rounded-lg border border-border bg-card px-4 py-3',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        isDragging ? 'z-10 shadow-lg' : 'z-0',
        isDragging && 'cursor-grabbing',
        !showHandle && !isDisabled && !isDragging && 'cursor-grab',
        isDisabled && 'opacity-60',
        itemClassName,
      )}
    >
      {showHandle && (
        <span
          onPointerDown={(event) => {
            if (isDisabled) return;
            dragControls.start(event);
          }}
          className={cn(
            'flex shrink-0 touch-none items-center justify-center rounded-md p-1 text-muted-foreground/60 transition-colors',
            isDisabled
              ? 'cursor-not-allowed'
              : 'cursor-grab hover:text-foreground active:cursor-grabbing',
          )}
          aria-hidden="true"
        >
          <GripIcon className="size-4" />
        </span>
      )}

      <div className="min-w-0 flex-1">{renderItem(item)}</div>

      <div
        className={cn(
          'flex shrink-0 flex-col opacity-0 transition-opacity',
          'group-hover:opacity-100 group-focus-within:opacity-100',
        )}
      >
        <button
          type="button"
          disabled={isDisabled || index === 0}
          onClick={() => onMove(-1)}
          aria-label="Move up"
          className="rounded p-0.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronUpIcon className="size-3.5" />
        </button>
        <button
          type="button"
          disabled={isDisabled || index === total - 1}
          onClick={() => onMove(1)}
          aria-label="Move down"
          className="rounded p-0.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronDownIcon className="size-3.5" />
        </button>
      </div>
    </Reorder.Item>
  );
}

/**
 * Drag-to-reorder list built on motion's `Reorder`. The whole row is the
 * drag surface by default; set `showHandle` to restrict dragging to a grip
 * icon via `useDragControls` + `dragListener={false}`.
 *
 * Keyboard is a first-class citizen, not an afterthought: ArrowUp/ArrowDown
 * move focus between rows (a roving-focus listbox pattern), Alt+ArrowUp/
 * Alt+ArrowDown reorder the focused row by one position, and the same
 * action is exposed as always-in-the-DOM per-row buttons that fade in on
 * hover/focus. Every explicit move (keyboard or button) is announced
 * through a polite live region.
 */
function SortableListInner<T>(
  {
    items,
    onReorder,
    renderItem,
    getKey = defaultGetKey,
    showHandle = false,
    isDisabled = false,
    className,
    itemClassName,
    'aria-label': ariaLabel = 'Sortable list',
  }: SortableListProps<T>,
  ref: ForwardedRef<HTMLUListElement>,
) {
  const shouldReduceMotion = useReducedMotion();
  const [announcement, setAnnouncement] = useState('');

  const moveItem = useCallback(
    (index: number, direction: -1 | 1) => {
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= items.length) return;

      const next = items.slice();
      const [moved] = next.splice(index, 1);
      next.splice(nextIndex, 0, moved);
      onReorder(next);
      setAnnouncement(`Item ${index + 1} moved to position ${nextIndex + 1} of ${items.length}`);
    },
    [items, onReorder],
  );

  const handleRowKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLLIElement>, index: number) => {
      if (isDisabled) return;
      if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;

      event.preventDefault();
      const direction: -1 | 1 = event.key === 'ArrowUp' ? -1 : 1;

      if (event.altKey) {
        moveItem(index, direction);
        return;
      }

      // Plain arrows just rove focus between rows — the reorder itself is an
      // explicit, announced action (Alt+Arrow or the per-row buttons).
      const sibling =
        direction === -1
          ? (event.currentTarget.previousElementSibling as HTMLElement | null)
          : (event.currentTarget.nextElementSibling as HTMLElement | null);
      sibling?.focus();
    },
    [isDisabled, moveItem],
  );

  return (
    <div className="relative">
      <Reorder.Group
        ref={ref}
        as="ul"
        axis="y"
        values={items}
        onReorder={onReorder}
        aria-label={ariaLabel}
        className={cn('flex flex-col gap-2', className)}
      >
        {items.map((item, index) => (
          <SortableListRow
            key={getKey(item)}
            item={item}
            index={index}
            total={items.length}
            renderItem={renderItem}
            showHandle={showHandle}
            isDisabled={isDisabled}
            shouldReduceMotion={!!shouldReduceMotion}
            itemClassName={itemClassName}
            onKeyDown={(event) => handleRowKeyDown(event, index)}
            onMove={(direction) => moveItem(index, direction)}
          />
        ))}
      </Reorder.Group>

      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </span>
    </div>
  );
}

export const SortableList = forwardRef(SortableListInner) as <T>(
  props: SortableListProps<T> & { ref?: ForwardedRef<HTMLUListElement> },
) => ReturnType<typeof SortableListInner>;

(SortableList as unknown as { displayName?: string }).displayName = 'SortableList';
