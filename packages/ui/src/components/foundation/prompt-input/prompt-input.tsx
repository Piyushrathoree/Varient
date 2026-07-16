'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type MutableRefObject,
  type ReactNode,
  type Ref,
  type TextareaHTMLAttributes,
} from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { DURATION_INSTANT, SPRING_DEFAULT } from '../../../lib/animation';

type SubmitState = 'idle' | 'loading' | 'stop';

// The root textarea is a motion.textarea, which redefines several native DOM
// event handlers with its own gesture/animation signatures (onDrag et al.),
// so those must be omitted to spread TextareaHTMLAttributes onto it without
// a type conflict (same pattern as ButtonCopy).
type NativeTextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'onSubmit'
  | 'disabled'
  | 'rows'
  | 'onDrag'
  | 'onDragStart'
  | 'onDragEnd'
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
>;

export interface PromptInputProps extends NativeTextareaProps {
  /** Controlled text value — pair with onValueChange. */
  value?: string;
  /** Initial text value for uncontrolled usage. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Called with the trimmed value on Enter (no Shift) or submit-button click. */
  onSubmit: (value: string) => void;
  /** Busy state — swaps the submit button to a spinner (or a stop button when onStop is set). */
  isLoading?: boolean;
  /** When set, the submit button becomes a clickable stop glyph while isLoading. Omit to show a plain busy spinner instead. */
  onStop?: () => void;
  placeholder?: string;
  /** Textarea grows until this many lines, then scrolls. */
  maxRows?: number;
  /** Content anchored to the bottom-left of the chassis, e.g. an attach button. */
  leftSlot?: ReactNode;
  /** Content anchored to the bottom-right of the chassis, before the submit button, e.g. a model chip. */
  rightSlot?: ReactNode;
  isDisabled?: boolean;
}

const submitStateLabel: Record<SubmitState, string> = {
  idle: 'Send message',
  loading: 'Generating response',
  stop: 'Stop generating',
};

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M10 15.5V4.5M5 9l5-5 5 5" />
    </svg>
  );
}

function StopIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden>
      <rect x="6" y="6" width="8" height="8" rx="1.5" fill="currentColor" />
    </svg>
  );
}

// Partial-ring spinner, same construction as ButtonCopy's — a round-capped
// arc that reads as spinning motion instead of a static ring.
const SPINNER_RADIUS = 7;
const SPINNER_CIRCUMFERENCE = 2 * Math.PI * SPINNER_RADIUS;
const SPINNER_ARC = SPINNER_CIRCUMFERENCE * 0.72;
const SPINNER_GAP = SPINNER_CIRCUMFERENCE - SPINNER_ARC;

function SpinnerIcon({ className, spin }: { className?: string; spin: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden
      animate={spin ? { rotate: 360 } : undefined}
      transition={spin ? { duration: 0.85, ease: 'linear', repeat: Infinity } : { duration: 0 }}
    >
      <circle
        cx="10"
        cy="10"
        r={SPINNER_RADIUS}
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeDasharray={`${SPINNER_ARC} ${SPINNER_GAP}`}
        opacity="0.85"
      />
    </motion.svg>
  );
}

function mergeRefs<T>(...refs: (Ref<T> | undefined)[]) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === 'function') ref(node);
      else (ref as MutableRefObject<T | null>).current = node;
    }
  };
}

/**
 * The AI-chat prompt input: an auto-growing textarea in a hairline chassis,
 * with a morphing submit button (send arrow -> spinner/stop) and optional
 * left/right slots for attachments, model pickers, etc.
 *
 * Controlled (`value`/`onValueChange`) or uncontrolled (`defaultValue`) —
 * same pattern as Dialog/Tabs. Uncontrolled usage clears itself after submit;
 * controlled usage leaves clearing to the caller (e.g. after the async send
 * resolves).
 */
export const PromptInput = forwardRef<HTMLTextAreaElement, PromptInputProps>(
  (
    {
      className,
      value: valueProp,
      defaultValue = '',
      onValueChange,
      onSubmit,
      isLoading = false,
      onStop,
      placeholder = 'Message...',
      maxRows = 6,
      leftSlot,
      rightSlot,
      isDisabled = false,
      id: idProp,
      onKeyDown,
      'aria-label': ariaLabelProp,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const textareaId = idProp ?? generatedId;
    const shouldReduceMotion = useReducedMotion();
    const innerRef = useRef<HTMLTextAreaElement | null>(null);
    const setTextareaRef = useMemo(() => mergeRefs<HTMLTextAreaElement>(innerRef, ref), [ref]);

    const isControlled = valueProp !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue);
    const value = isControlled ? (valueProp as string) : internalValue;
    const trimmedValue = value.trim();

    const setValue = useCallback(
      (next: string) => {
        if (!isControlled) setInternalValue(next);
        onValueChange?.(next);
      },
      [isControlled, onValueChange],
    );

    // Auto-grow: measure natural content height each time the value changes,
    // clamp to maxRows worth of line-height, animate the difference with a
    // gated spring. Recomputed on container resize too, since reflow can
    // change how many lines the same text wraps to.
    const [textareaHeight, setTextareaHeight] = useState<number | undefined>(undefined);
    const [maxHeightPx, setMaxHeightPx] = useState<number | undefined>(undefined);

    const recalcHeight = useCallback(() => {
      const el = innerRef.current;
      if (!el) return;
      const styles = window.getComputedStyle(el);
      const lineHeight = parseFloat(styles.lineHeight) || 20;
      const paddingY = parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
      const borderY = parseFloat(styles.borderTopWidth) + parseFloat(styles.borderBottomWidth);
      const max = lineHeight * maxRows + paddingY + borderY;
      el.style.height = 'auto';
      const next = Math.min(el.scrollHeight + borderY, max);
      setMaxHeightPx(max);
      setTextareaHeight(next);
    }, [maxRows]);

    useEffect(() => {
      recalcHeight();
    }, [value, recalcHeight]);

    useEffect(() => {
      const el = innerRef.current?.parentElement;
      if (!el || typeof ResizeObserver === 'undefined') return;
      const observer = new ResizeObserver(() => recalcHeight());
      observer.observe(el);
      return () => observer.disconnect();
    }, [recalcHeight]);

    const submitValue = useCallback(() => {
      if (isDisabled || isLoading || !trimmedValue) return;
      onSubmit(trimmedValue);
      if (!isControlled) setInternalValue('');
    }, [isDisabled, isLoading, trimmedValue, onSubmit, isControlled]);

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLTextAreaElement>) => {
        onKeyDown?.(event);
        if (event.defaultPrevented) return;
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          submitValue();
        }
      },
      [onKeyDown, submitValue],
    );

    const submitState: SubmitState = isLoading ? (onStop ? 'stop' : 'loading') : 'idle';
    const isSubmitDisabled =
      isDisabled || (submitState === 'idle' && !trimmedValue) || submitState === 'loading';

    const handleSubmitClick = useCallback(() => {
      if (submitState === 'stop') {
        onStop?.();
        return;
      }
      if (submitState === 'idle') submitValue();
    }, [submitState, onStop, submitValue]);

    const morphTransition = shouldReduceMotion ? DURATION_INSTANT : SPRING_DEFAULT;
    const isAtMaxHeight =
      textareaHeight !== undefined && maxHeightPx !== undefined && textareaHeight >= maxHeightPx - 0.5;

    let submitIcon: ReactNode;
    if (submitState === 'idle') {
      submitIcon = <ArrowUpIcon className="size-4" />;
    } else if (submitState === 'loading') {
      submitIcon = <SpinnerIcon className="size-4" spin={!shouldReduceMotion} />;
    } else {
      submitIcon = <StopIcon className="size-4" />;
    }

    return (
      <div
        className={cn(
          'flex w-full flex-col gap-2 rounded-xl border border-input bg-background p-2 shadow-xs',
          'transition-[color,box-shadow,border-color] duration-200 ease-out motion-reduce:transition-none',
          'focus-within:border-ring focus-within:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-ring)_16%,transparent)]',
          isDisabled && 'cursor-not-allowed opacity-50',
          className,
        )}
      >
        <motion.textarea
          ref={setTextareaRef}
          id={textareaId}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isDisabled}
          aria-label={ariaLabelProp ?? (props['aria-labelledby'] ? undefined : 'Prompt')}
          aria-busy={isLoading || undefined}
          rows={1}
          initial={false}
          animate={textareaHeight !== undefined ? { height: textareaHeight } : undefined}
          transition={morphTransition}
          style={{ overflowY: isAtMaxHeight ? 'auto' : 'hidden' }}
          className={cn(
            'block w-full min-w-0 resize-none bg-transparent px-1.5 pt-1 text-sm text-foreground outline-none',
            'placeholder:text-muted-foreground disabled:cursor-not-allowed',
          )}
          {...props}
        />

        <div className="flex items-end justify-between gap-2 px-0.5">
          <div className="flex min-w-0 flex-1 items-center gap-1.5">{leftSlot}</div>

          <div className="flex shrink-0 items-center gap-1.5">
            {rightSlot}

            <motion.button
              type="button"
              layout
              onClick={handleSubmitClick}
              disabled={isSubmitDisabled}
              aria-label={submitStateLabel[submitState]}
              aria-busy={isLoading || undefined}
              whileTap={shouldReduceMotion || isSubmitDisabled ? undefined : { scale: 0.94 }}
              transition={morphTransition}
              className={cn(
                'relative inline-flex size-8 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                'disabled:cursor-not-allowed',
                submitState === 'idle' && !isSubmitDisabled
                  ? 'bg-foreground text-background hover:bg-foreground/90'
                  : submitState === 'idle'
                    ? 'bg-muted text-muted-foreground/60'
                    : 'bg-foreground text-background hover:bg-foreground/90',
              )}
            >
              <AnimatePresence initial={false} mode="popLayout">
                <motion.span
                  key={submitState}
                  className="flex items-center justify-center"
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.5, rotate: -90 }}
                  animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, rotate: 0 }}
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0, transition: { duration: 0 } }
                      : { opacity: 0, scale: 0.5, rotate: 90 }
                  }
                  transition={morphTransition}
                >
                  {submitIcon}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
    );
  },
);

PromptInput.displayName = 'PromptInput';
