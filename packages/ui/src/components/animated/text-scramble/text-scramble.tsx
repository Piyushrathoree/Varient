'use client';

import { forwardRef, useEffect, useRef, useState, type HTMLAttributes } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';

/** Tags TextScramble is allowed to render as — covers inline and block usage. */
export type TextScrambleElement = 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'label';

export interface TextScrambleProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** The real text the effect resolves into, left to right. */
  text: string;
  /** Total seconds for the scramble to fully resolve. Default 0.8. */
  duration?: number;
  /** Seconds between shuffle ticks. Default 0.04. */
  speed?: number;
  /** Glyph pool used for unresolved characters. */
  characterSet?: string;
  /** Fires once via `useInView` when true (default). When false, fires on mount instead. */
  isTriggeredOnView?: boolean;
  /** Element tag rendered. Default 'span'. */
  as?: TextScrambleElement;
  /** Called once the full text has resolved. */
  onScrambleComplete?: () => void;
  className?: string;
}

const DEFAULT_CHARACTER_SET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!<>-_\\/[]{}—=+*^?#';

function randomGlyph(characterSet: string): string {
  const pool = characterSet.length > 0 ? characterSet : DEFAULT_CHARACTER_SET;
  return pool[Math.floor(Math.random() * pool.length)] ?? '';
}

// Chars before `resolvedCount` show the real text; the rest render a fresh
// random glyph each tick. Whitespace is always preserved so word shapes
// don't visually collapse mid-shuffle.
function buildFrame(chars: string[], resolvedCount: number, characterSet: string): string {
  return chars
    .map((char, index) => {
      if (index < resolvedCount) return char;
      if (char === ' ' || char === '\n' || char === '\t') return char;
      return randomGlyph(characterSet);
    })
    .join('');
}

/**
 * Characters shuffle through `characterSet`, resolving left-to-right into
 * the real `text` (a "decrypt" reveal). Fires once on scroll into view by
 * default, or immediately on mount with `isTriggeredOnView={false}`.
 *
 * Layout stability: the real text is rendered twice — an invisible sizer
 * that reserves the box, and an absolutely-positioned overlay that actually
 * animates — so surrounding layout never jitters as glyphs of different
 * widths cycle through. Pair with a monospace font for the cleanest column
 * alignment (recommended in the docs, not enforced here).
 *
 * Accessibility: the wrapper carries `aria-label={text}` so assistive tech
 * always gets the final, correct string; the animating overlay is
 * `aria-hidden`. Reduced motion renders the final text immediately, no
 * shuffle.
 */
export const TextScramble = forwardRef<HTMLElement, TextScrambleProps>(
  (
    {
      text,
      duration = 0.8,
      speed = 0.04,
      characterSet = DEFAULT_CHARACTER_SET,
      isTriggeredOnView = true,
      as = 'span',
      onScrambleComplete,
      className,
      ...props
    },
    ref,
  ) => {
    const Element = as;
    const localRef = useRef<HTMLElement | null>(null);
    const isInView = useInView(localRef, { once: true, margin: '-80px' });
    const shouldReduceMotion = useReducedMotion();

    const [displayText, setDisplayText] = useState(text);
    const hasFiredRef = useRef(false);
    const onCompleteRef = useRef(onScrambleComplete);
    onCompleteRef.current = onScrambleComplete;

    const setRef = (node: HTMLElement | null) => {
      localRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    // A new `text` value always resets — re-arms the once-only trigger and
    // snaps the visible string back in sync immediately.
    useEffect(() => {
      hasFiredRef.current = false;
      setDisplayText(text);
    }, [text]);

    useEffect(() => {
      if (shouldReduceMotion) {
        setDisplayText(text);
        return;
      }

      const shouldFire = isTriggeredOnView ? isInView : true;
      if (!shouldFire || hasFiredRef.current) return;
      hasFiredRef.current = true;

      const chars = Array.from(text);
      const totalTicks = Math.max(1, Math.round(duration / speed));
      const tickMs = Math.max(1, speed * 1000);
      let tick = 0;

      const interval = setInterval(() => {
        tick += 1;
        const resolvedCount = Math.min(
          chars.length,
          Math.round((tick / totalTicks) * chars.length),
        );
        setDisplayText(buildFrame(chars, resolvedCount, characterSet));

        if (tick >= totalTicks) {
          clearInterval(interval);
          setDisplayText(text);
          onCompleteRef.current?.();
        }
      }, tickMs);

      return () => clearInterval(interval);
    }, [isInView, isTriggeredOnView, shouldReduceMotion, text, duration, speed, characterSet]);

    return (
      <Element
        ref={setRef}
        aria-label={text}
        className={cn('relative inline-block align-baseline text-foreground', className)}
        {...props}
      >
        <span aria-hidden="true" className="invisible">
          {text}
        </span>
        <span aria-hidden="true" className="absolute inset-0">
          {displayText}
        </span>
      </Element>
    );
  },
);

TextScramble.displayName = 'TextScramble';
