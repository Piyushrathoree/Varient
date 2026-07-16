'use client';

import {
  Children,
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { DURATION_INSTANT, SPRING_SNAPPY } from '../../../lib/animation';

export type StepperOrientation = 'horizontal' | 'vertical';

export interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  /** Zero-based index of the current step. */
  activeStep: number;
  /** Called with a step's index when a reachable step is clicked. */
  onStepChange?: (step: number) => void;
  orientation?: StepperOrientation;
  /**
   * Unlocks clicking steps AHEAD of the current one. Completed steps (index
   * < activeStep) are always clickable regardless of this flag — it only
   * controls whether users can jump forward, enabling fully non-linear
   * navigation.
   */
  isNavigable?: boolean;
}

interface StepperContextValue {
  activeStep: number;
  onStepChange?: (step: number) => void;
  orientation: StepperOrientation;
  isNavigable: boolean;
  /** 1 when activeStep just moved forward, -1 when it moved backward — drives
   * Stepper.Content's slide direction. */
  direction: 1 | -1;
}

const StepperContext = createContext<StepperContextValue | null>(null);

function useStepperContext(component: string): StepperContextValue {
  const ctx = useContext(StepperContext);
  if (!ctx) {
    throw new Error(`Stepper.${component} must be rendered inside <Stepper>.`);
  }
  return ctx;
}

function CheckGlyph({ className, shouldDraw }: { className?: string; shouldDraw: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <motion.path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: shouldDraw ? 0 : 1 }}
        animate={{ pathLength: 1 }}
        transition={shouldDraw ? SPRING_SNAPPY : DURATION_INSTANT}
      />
    </svg>
  );
}

// The root owns step layout (an <ol> of Stepper.Item) plus any non-Item
// children (e.g. a single Stepper.Content) rendered alongside it — Item
// children are split out and auto-indexed by their position so consumers
// never pass an explicit index.
const StepperRoot = forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      className,
      activeStep,
      onStepChange,
      orientation = 'horizontal',
      isNavigable = false,
      children,
      ...props
    },
    ref,
  ) => {
    const prevStepRef = useRef(activeStep);
    const direction: 1 | -1 = activeStep >= prevStepRef.current ? 1 : -1;

    useEffect(() => {
      prevStepRef.current = activeStep;
    }, [activeStep]);

    const contextValue = useMemo<StepperContextValue>(
      () => ({ activeStep, onStepChange, orientation, isNavigable, direction }),
      [activeStep, onStepChange, orientation, isNavigable, direction],
    );

    const items: ReactNode[] = [];
    const rest: ReactNode[] = [];
    Children.forEach(children, (child) => {
      if (isValidElement(child) && child.type === StepperItem) {
        const index = items.length;
        items.push(
          cloneElement(
            child as ReactElement<StepperItemProps>,
            // `__index` is an internal, auto-assigned prop — not part of the
            // public StepperItemProps surface.
            { key: child.key ?? index, __index: index } as unknown as Partial<StepperItemProps>,
          ),
        );
      } else {
        rest.push(child);
      }
    });

    return (
      <StepperContext.Provider value={contextValue}>
        <div ref={ref} className={cn('flex flex-col gap-6', className)} {...props}>
          <ol
            className={cn(
              // The very last connector (always rendered by each Item, for
              // simplicity) is hidden — whichever element that happens to be.
              '[&>.stepper-connector:last-child]:hidden',
              orientation === 'horizontal' ? 'flex w-full items-start' : 'flex flex-col',
            )}
          >
            {items}
          </ol>
          {rest}
        </div>
      </StepperContext.Provider>
    );
  },
);
StepperRoot.displayName = 'Stepper';

export interface StepperItemProps extends Omit<HTMLAttributes<HTMLLIElement>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
}

interface StepperItemInternalProps extends StepperItemProps {
  __index?: number;
}

const StepperItem = forwardRef<HTMLLIElement, StepperItemProps>((rawProps, ref) => {
  const { className, title, description, __index, ...rest } = rawProps as StepperItemInternalProps;
  const { activeStep, onStepChange, orientation, isNavigable } = useStepperContext('Item');
  const shouldReduceMotion = useReducedMotion();
  const index = __index ?? 0;

  const isComplete = index < activeStep;
  const isActive = index === activeStep;
  const isDisabled = !isNavigable && index > activeStep;

  const handleClick = () => {
    if (isDisabled) return;
    if (index !== activeStep) onStepChange?.(index);
  };

  return (
    <>
      <li
        ref={ref}
        className={cn(
          'relative flex',
          orientation === 'horizontal'
            ? 'flex-col items-center gap-2 text-center'
            : 'items-start gap-3',
          className,
        )}
        {...rest}
      >
        <button
          type="button"
          disabled={isDisabled}
          aria-current={isActive ? 'step' : undefined}
          onClick={handleClick}
          className={cn(
            'relative flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full border text-sm font-semibold transition-colors duration-200 motion-reduce:transition-none',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            'disabled:cursor-not-allowed disabled:opacity-50',
            isComplete && 'border-brand bg-brand text-white',
            isActive && 'border-brand bg-background text-brand ring-2 ring-brand/25',
            !isComplete &&
              !isActive && [
                'border-border bg-background text-muted-foreground',
                !isDisabled && 'hover:border-foreground/30 hover:text-foreground',
              ],
          )}
        >
          <AnimatePresence initial={false} mode="wait">
            {isComplete ? (
              <motion.span
                key="check"
                className="flex items-center justify-center"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.5 }}
                transition={shouldReduceMotion ? DURATION_INSTANT : SPRING_SNAPPY}
              >
                <CheckGlyph className="size-4" shouldDraw={!shouldReduceMotion} />
              </motion.span>
            ) : (
              <motion.span
                key="number"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.5 }}
                transition={shouldReduceMotion ? DURATION_INSTANT : SPRING_SNAPPY}
              >
                {index + 1}
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <div className={orientation === 'horizontal' ? 'max-w-[9rem]' : 'pt-1'}>
          <p
            className={cn(
              'text-sm leading-tight',
              isActive || isComplete
                ? 'font-semibold text-foreground'
                : 'font-medium text-muted-foreground',
            )}
          >
            {title}
          </p>
          {description && (
            <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{description}</p>
          )}
        </div>
      </li>

      {/* Connector to the next step — every Item renders one for simplicity;
          the trailing one after the last Item is hidden by the parent <ol>'s
          `:last-child` rule above. `aria-hidden` since it's purely decorative. */}
      <span
        aria-hidden
        className={cn(
          'stepper-connector shrink-0 overflow-hidden rounded-full bg-border',
          orientation === 'horizontal' ? 'mt-4 h-0.5 min-w-4 flex-1' : 'ml-[15px] h-8 w-0.5',
        )}
      >
        <motion.span
          className={cn(
            'block bg-brand',
            orientation === 'horizontal' ? 'h-full origin-left' : 'w-full origin-top',
          )}
          initial={false}
          animate={
            orientation === 'horizontal'
              ? { scaleX: isComplete ? 1 : 0 }
              : { scaleY: isComplete ? 1 : 0 }
          }
          transition={shouldReduceMotion ? DURATION_INSTANT : SPRING_SNAPPY}
        />
      </span>
    </>
  );
});
StepperItem.displayName = 'Stepper.Item';

export type StepperContentProps = HTMLAttributes<HTMLDivElement>;

// A generic transition wrapper for the active step's panel — consumers
// decide what `children` to pass for the current activeStep (e.g. indexing
// into their own array of panels); Stepper.Content only owns the
// enter/exit slide, keyed internally off the shared activeStep so switching
// steps always crossfades+slides exactly one panel out and the next in.
const StepperContent = forwardRef<HTMLDivElement, StepperContentProps>(
  ({ className, children, ...props }, ref) => {
    const { activeStep, direction, orientation } = useStepperContext('Content');
    const shouldReduceMotion = useReducedMotion();
    const offset = 16;
    const isVertical = orientation === 'vertical';

    const initial = shouldReduceMotion
      ? { opacity: 0 }
      : isVertical
        ? { opacity: 0, y: direction * offset }
        : { opacity: 0, x: direction * offset };
    const exit = shouldReduceMotion
      ? { opacity: 0, transition: DURATION_INSTANT }
      : isVertical
        ? { opacity: 0, y: -direction * offset }
        : { opacity: 0, x: -direction * offset };

    return (
      <div ref={ref} className={cn('relative overflow-hidden', className)} {...props}>
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={activeStep}
            initial={initial}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={exit}
            transition={shouldReduceMotion ? DURATION_INSTANT : SPRING_SNAPPY}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  },
);
StepperContent.displayName = 'Stepper.Content';

/**
 * Multi-step progress indicator with optional animated per-step content.
 *
 * ```tsx
 * <Stepper activeStep={step} onStepChange={setStep}>
 *   <Stepper.Item title="Cart" description="Review items" />
 *   <Stepper.Item title="Shipping" />
 *   <Stepper.Item title="Payment" />
 *   <Stepper.Content>{panels[step]}</Stepper.Content>
 * </Stepper>
 * ```
 *
 * `Stepper.Item` never takes an explicit index — the root auto-assigns one
 * from each item's position among its `Stepper.Item` siblings. Step status
 * (complete / active / upcoming) falls straight out of comparing that index
 * to `activeStep`.
 */
export const Stepper = Object.assign(StepperRoot, {
  Item: StepperItem,
  Content: StepperContent,
});
