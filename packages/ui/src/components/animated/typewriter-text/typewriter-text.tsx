'use client';

import { forwardRef, useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { DURATION_INSTANT } from '../../../lib/animation';

export interface TypewriterTextProps {
  /** Plain text or phrases to cycle (type → pause → delete → next). */
  text: string | string[];
  /** Milliseconds per character while typing. Default 60. */
  typeSpeed?: number;
  /** Milliseconds per character while deleting. Default 35. */
  deleteSpeed?: number;
  /** Milliseconds to pause after a phrase is fully typed. Default 1800. */
  pauseDuration?: number;
  /** Whether to show a blinking cursor pipe after the text. Default true. */
  showCursor?: boolean;
  /** When `text` is an array, loop through phrases after the last one. Default true. */
  isLooping?: boolean;
  className?: string;
}

type TypewriterPhase = 'typing' | 'deleting';

function normalizePhrases(text: string | string[]): string[] {
  const list = Array.isArray(text) ? text : [text];
  return list.length > 0 ? list : [''];
}

/**
 * Types characters one at a time with an optional blinking cursor. Arrays cycle
 * through phrases: type, pause, delete, next. Under `prefers-reduced-motion`
 * the first phrase renders immediately with no animation.
 *
 * Accessibility: the animating span is `aria-hidden`; the full intended text is
 * exposed through `aria-label` on the wrapper for screen readers.
 */
export const TypewriterText = forwardRef<HTMLSpanElement, TypewriterTextProps>(
  (
    {
      text,
      typeSpeed = 60,
      deleteSpeed = 35,
      pauseDuration = 1800,
      showCursor = true,
      isLooping = true,
      className,
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const phrases = useMemo(() => normalizePhrases(text), [text]);

    const accessibleLabel = useMemo(
      () => (Array.isArray(text) ? phrases.join(', ') : text),
      [text, phrases],
    );

    const [phraseIndex, setPhraseIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [phase, setPhase] = useState<TypewriterPhase>('typing');
    const [isPaused, setIsPaused] = useState(false);

    const currentPhrase = phrases[phraseIndex] ?? '';
    const isMultiPhrase = phrases.length > 1;

    useEffect(() => {
      setPhraseIndex(0);
      setCharIndex(0);
      setPhase('typing');
      setIsPaused(false);
    }, [phrases]);

    useEffect(() => {
      if (shouldReduceMotion) return;

      let timer: ReturnType<typeof setTimeout> | undefined;

      if (isPaused) {
        timer = setTimeout(() => {
          setIsPaused(false);
          setPhase('deleting');
        }, pauseDuration);
        return () => {
          if (timer !== undefined) clearTimeout(timer);
        };
      }

      if (phase === 'typing') {
        if (charIndex < currentPhrase.length) {
          timer = setTimeout(() => {
            setCharIndex((prev) => prev + 1);
          }, typeSpeed);
        } else if (isMultiPhrase) {
          const isLastPhrase = phraseIndex >= phrases.length - 1;
          if (isLooping || !isLastPhrase) {
            setIsPaused(true);
          }
        }
      } else if (phase === 'deleting') {
        if (charIndex > 0) {
          timer = setTimeout(() => {
            setCharIndex((prev) => prev - 1);
          }, deleteSpeed);
        } else {
          const nextIndex = phraseIndex + 1;

          if (nextIndex >= phrases.length) {
            if (isLooping) {
              setPhraseIndex(0);
              setPhase('typing');
            }
          } else {
            setPhraseIndex(nextIndex);
            setPhase('typing');
          }
        }
      }

      return () => {
        if (timer !== undefined) clearTimeout(timer);
      };
    }, [
      shouldReduceMotion,
      phase,
      charIndex,
      phraseIndex,
      currentPhrase,
      phrases.length,
      typeSpeed,
      deleteSpeed,
      pauseDuration,
      isMultiPhrase,
      isLooping,
      isPaused,
    ]);

    const displayText = shouldReduceMotion
      ? (phrases[0] ?? '')
      : currentPhrase.slice(0, charIndex);

    return (
      <span
        ref={ref}
        aria-label={accessibleLabel}
        className={cn('inline text-foreground', className)}
      >
        <span aria-hidden="true">
          {displayText}
          {showCursor ? (
            <motion.span
              aria-hidden="true"
              className="ml-px inline-block text-brand"
              animate={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: [1, 1, 0, 0] }
              }
              transition={
                shouldReduceMotion
                  ? DURATION_INSTANT
                  : {
                      duration: 1,
                      repeat: Infinity,
                      ease: 'linear',
                      times: [0, 0.49, 0.5, 1],
                    }
              }
            >
              |
            </motion.span>
          ) : null}
        </span>
      </span>
    );
  },
);

TypewriterText.displayName = 'TypewriterText';
