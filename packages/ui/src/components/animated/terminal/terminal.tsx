'use client';

import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
  type SVGProps,
} from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { DURATION, DURATION_INSTANT, EASE_OUT } from '../../../lib/animation';

export type TerminalLineVariant = 'command' | 'output' | 'success' | 'error';

export interface TerminalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Title shown in the window chrome. Default `Terminal`. */
  title?: string;
  children?: ReactNode;
}

export interface TerminalLineProps {
  /** Seconds before this line starts appearing. Default 0. */
  delay?: number;
  /** Line style — command shows a brand prompt; success/error add status glyphs. */
  variant?: TerminalLineVariant;
  /** Line content — strings type character-by-character for `command` variant. */
  children: ReactNode;
  className?: string;
}

const TYPE_SPEED_MS = 42;

function CheckGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M3 8.5 6.2 11.7 13 4.8" />
    </svg>
  );
}

function XGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 4 12 12M12 4 4 12" />
    </svg>
  );
}

function TerminalGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="1.5" y="2.5" width="13" height="11" rx="1.5" />
      <path d="M4 6.5 6.5 8 4 9.5M8 9.5h3.5" />
    </svg>
  );
}

const VARIANT_GLYPH: Record<
  Exclude<TerminalLineVariant, 'command' | 'output'>,
  (props: SVGProps<SVGSVGElement>) => ReactNode
> = {
  success: CheckGlyph,
  error: XGlyph,
};

const VARIANT_GLYPH_CLASS: Record<
  Exclude<TerminalLineVariant, 'command' | 'output'>,
  string
> = {
  success: 'text-success',
  error: 'text-destructive',
};

function getLineText(children: ReactNode): string {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  return '';
}

function TrafficLights() {
  return (
    <div className="flex items-center gap-1.5" aria-hidden="true">
      <span className="size-2.5 rounded-full bg-destructive/90" />
      <span className="size-2.5 rounded-full bg-warning/90" />
      <span className="size-2.5 rounded-full bg-success/90" />
    </div>
  );
}

/**
 * Dark terminal window mockup — composable with `TerminalLine` children that
 * appear in sequence. Command lines type character-by-character; other variants
 * fade in. Under `prefers-reduced-motion` all lines render instantly.
 */
export const Terminal = forwardRef<HTMLDivElement, TerminalProps>(
  ({ title = 'Terminal', className, children, ...props }, ref) => {
    const localRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();
    const isInView = useInView(localRef, { once: true, margin: '-40px' });

    const setRef = (node: HTMLDivElement | null) => {
      localRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    const hasStarted = shouldReduceMotion || isInView;

    return (
      <div
        ref={setRef}
        className={cn(
          'dark overflow-hidden rounded-xl border border-border bg-background shadow-lg',
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-3 border-b border-border bg-muted/80 px-3 py-2">
          <TrafficLights />
          <div className="flex min-w-0 flex-1 items-center justify-center gap-1.5">
            <TerminalGlyph className="size-3 shrink-0 text-muted-foreground" />
            <span className="truncate font-mono text-xs text-muted-foreground">{title}</span>
          </div>
          <div className="w-[52px]" aria-hidden="true" />
        </div>

        <div
          className="space-y-1.5 px-3 py-3 font-mono text-xs leading-relaxed sm:text-sm"
          aria-live={shouldReduceMotion ? undefined : 'polite'}
          aria-relevant="additions"
        >
          {hasStarted ? children : null}
          {!shouldReduceMotion && !hasStarted ? (
            <span className="sr-only">Terminal output loading</span>
          ) : null}
        </div>
      </div>
    );
  },
);

Terminal.displayName = 'Terminal';

/** Single line inside `Terminal` — staggered by `delay` with optional typing. */
export const TerminalLine = forwardRef<HTMLDivElement, TerminalLineProps>(
  ({ delay = 0, variant = 'output', children, className }, ref) => {
    const shouldReduceMotion = useReducedMotion();
    const text = getLineText(children);
    const hasTypedContent = variant === 'command' && text.length > 0;

    const [isActive, setIsActive] = useState(shouldReduceMotion);
    const [charIndex, setCharIndex] = useState(
      shouldReduceMotion ? text.length : 0,
    );

    useEffect(() => {
      if (shouldReduceMotion) {
        setIsActive(true);
        setCharIndex(text.length);
        return;
      }

      setIsActive(false);
      setCharIndex(0);

      const startTimer = window.setTimeout(() => {
        setIsActive(true);
      }, delay * 1000);

      return () => window.clearTimeout(startTimer);
    }, [delay, shouldReduceMotion, text]);

    useEffect(() => {
      if (!isActive || shouldReduceMotion || !hasTypedContent) return;
      if (charIndex >= text.length) return;

      const timer = window.setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, TYPE_SPEED_MS);

      return () => window.clearTimeout(timer);
    }, [isActive, charIndex, text, shouldReduceMotion, hasTypedContent]);

    if (!isActive && !shouldReduceMotion) return null;

    const displayText = hasTypedContent ? text.slice(0, charIndex) : children;
    const StatusIcon =
      variant === 'success' || variant === 'error'
        ? VARIANT_GLYPH[variant]
        : null;
    const statusGlyphClass =
      variant === 'success' || variant === 'error'
        ? VARIANT_GLYPH_CLASS[variant]
        : undefined;

    const motionTransition = shouldReduceMotion
      ? DURATION_INSTANT
      : { duration: DURATION.fast, ease: EASE_OUT };

    return (
      <motion.div
        ref={ref}
        className={cn(
          'flex items-start gap-2',
          variant === 'output' && 'text-muted-foreground',
          variant === 'command' && 'text-foreground',
          variant === 'success' && 'text-foreground',
          variant === 'error' && 'text-foreground',
          className,
        )}
        initial={shouldReduceMotion ? false : { opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={motionTransition}
      >
        {variant === 'command' ? (
          <span className="shrink-0 text-brand" aria-hidden="true">
            $
          </span>
        ) : null}

        {StatusIcon ? (
          <StatusIcon
            className={cn('mt-0.5 size-3.5 shrink-0', statusGlyphClass)}
            strokeWidth={1.75}
            aria-hidden="true"
          />
        ) : null}

        <span className="min-w-0 break-all">
          {displayText}
          {hasTypedContent &&
          !shouldReduceMotion &&
          charIndex < text.length ? (
            <motion.span
              aria-hidden="true"
              className="ml-px inline-block text-brand"
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'linear',
                times: [0, 0.49, 0.5, 1],
              }}
            >
              |
            </motion.span>
          ) : null}
        </span>
      </motion.div>
    );
  },
);

TerminalLine.displayName = 'TerminalLine';
