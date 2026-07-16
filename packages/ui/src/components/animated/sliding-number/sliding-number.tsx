'use client';

import { forwardRef, useId, useMemo, type HTMLAttributes } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { DURATION_INSTANT, SPRING_DEFAULT } from '../../../lib/animation';

export interface SlidingNumberProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** The number displayed. Each digit column rolls vertically to its new value on change. */
  value: number;
  /** Left-pads the integer part with zeros to at least this many digits, e.g. `padStart={3}` → "007". */
  padStart?: number;
  /** Fixed decimal places shown (value is rounded to this precision). */
  decimalPlaces?: number;
  /** Inserts thousands separators ("1,234") into the integer part as static characters. */
  isGrouped?: boolean;
}

type Token =
  | { type: 'digit'; digit: number; key: string }
  | { type: 'char'; char: string; key: string };

const ROWS = Array.from({ length: 10 }, (_, digit) => digit);

// A negative sign, if present, is tracked outside the digit-distance scheme
// below so it never shifts every other column's key when a value crosses
// zero — it mounts/unmounts on its own via AnimatePresence.
const SIGN_KEY = 'sign';

/**
 * Splits a formatted number into stable, positionally-keyed tokens.
 *
 * Keys are the character's distance from the *end* of the string (not its
 * index), so the ones digit is always `d0`, the tens digit `d1`, and so on —
 * regardless of how many digits sit to their left. That's what lets 99 → 100
 * roll the existing "9 9" columns into "0 0" in place while a brand new "1"
 * column pops in on the left, instead of every column re-keying and
 * re-animating from scratch.
 */
function buildTokens(
  value: number,
  padStart: number,
  decimalPlaces: number,
  isGrouped: boolean,
): { tokens: Token[]; isNegative: boolean; formatted: string } {
  const safeValue = Number.isFinite(value) ? value : 0;
  const isNegative = safeValue < 0;
  const precision = Math.max(0, Math.trunc(decimalPlaces));
  const fixed = Math.abs(safeValue).toFixed(precision);
  const [rawInt, rawDec = ''] = fixed.split('.');
  const paddedInt = padStart > rawInt.length ? rawInt.padStart(padStart, '0') : rawInt;
  const groupedInt = isGrouped ? paddedInt.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : paddedInt;
  const mainString = precision > 0 ? `${groupedInt}.${rawDec}` : groupedInt;
  const mainChars = mainString.split('');

  const tokens: Token[] = mainChars.map((char, i) => {
    const distance = mainChars.length - 1 - i;
    return /\d/.test(char)
      ? { type: 'digit', digit: Number(char), key: `d${distance}` }
      : { type: 'char', char, key: `s${distance}` };
  });

  return { tokens, isNegative, formatted: `${isNegative ? '−' : ''}${mainString}` };
}

function DigitColumn({
  digit,
  shouldReduceMotion,
}: {
  digit: number;
  shouldReduceMotion: boolean;
}) {
  return (
    <motion.span
      layout
      initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={
        shouldReduceMotion
          ? { opacity: 0, transition: DURATION_INSTANT }
          : { opacity: 0, y: -6 }
      }
      transition={shouldReduceMotion ? DURATION_INSTANT : SPRING_DEFAULT}
      className="relative inline-flex h-[1em] overflow-hidden align-baseline leading-none tabular-nums"
    >
      <motion.span
        className="flex flex-col items-center"
        initial={false}
        animate={{ y: `${-digit}em` }}
        transition={shouldReduceMotion ? DURATION_INSTANT : SPRING_DEFAULT}
      >
        {ROWS.map((row) => (
          <span key={row} className="flex h-[1em] w-[1ch] items-center justify-center">
            {row}
          </span>
        ))}
      </motion.span>
    </motion.span>
  );
}

function StaticToken({
  char,
  shouldReduceMotion,
}: {
  char: string;
  shouldReduceMotion: boolean;
}) {
  return (
    <motion.span
      layout
      initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={
        shouldReduceMotion
          ? { opacity: 0, transition: DURATION_INSTANT }
          : { opacity: 0, y: -6 }
      }
      transition={shouldReduceMotion ? DURATION_INSTANT : SPRING_DEFAULT}
      className="inline-block align-baseline tabular-nums"
    >
      {char}
    </motion.span>
  );
}

/**
 * Odometer-style number: each digit column rolls vertically to its new value
 * on change, complementing `NumberTicker`'s count-up. Non-digit characters
 * (decimal point, thousands separators, the negative sign) render as static
 * tokens that fade/slide in and out as they enter or leave the formatted
 * string.
 *
 * Accessibility: the rolling digit columns are `aria-hidden` (a mid-roll
 * digit is not something a screen reader should narrate) — the formatted
 * value is always available via a visually-hidden `aria-live="polite"` span,
 * so assistive tech announces the final value once it settles. Reduced
 * motion swaps digits instantly with no roll or pop animation.
 */
export const SlidingNumber = forwardRef<HTMLSpanElement, SlidingNumberProps>(
  ({ value, padStart = 0, decimalPlaces = 0, isGrouped = false, className, ...props }, ref) => {
    const shouldReduceMotion = !!useReducedMotion();
    const liveId = useId();

    const { tokens, isNegative, formatted } = useMemo(
      () => buildTokens(value, padStart, decimalPlaces, isGrouped),
      [value, padStart, decimalPlaces, isGrouped],
    );

    return (
      <span ref={ref} className={cn('relative inline-flex items-baseline', className)} {...props}>
        <span aria-hidden className="inline-flex items-baseline tabular-nums">
          <AnimatePresence initial={false} mode="popLayout">
            {isNegative && (
              <StaticToken key={SIGN_KEY} char="−" shouldReduceMotion={shouldReduceMotion} />
            )}
            {tokens.map((token) =>
              token.type === 'digit' ? (
                <DigitColumn
                  key={token.key}
                  digit={token.digit}
                  shouldReduceMotion={shouldReduceMotion}
                />
              ) : (
                <StaticToken
                  key={token.key}
                  char={token.char}
                  shouldReduceMotion={shouldReduceMotion}
                />
              ),
            )}
          </AnimatePresence>
        </span>
        <span id={liveId} className="sr-only" aria-live="polite" aria-atomic="true">
          {formatted}
        </span>
      </span>
    );
  },
);

SlidingNumber.displayName = 'SlidingNumber';
