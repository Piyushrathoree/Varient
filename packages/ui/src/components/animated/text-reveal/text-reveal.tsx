'use client';

import { forwardRef, useMemo, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { DURATION, EASE_OUT } from '../../../lib/animation';

export interface TextRevealProps {
  /** Plain-text content. Prefer `text` or pass a string as `children`. */
  text?: string;
  children?: string;
  className?: string;
  /** Seconds to wait before the first word animates in. */
  delay?: number;
  /** Seconds between each word. Default 0.05. */
  stagger?: number;
}

function splitWords(source: string): string[] {
  return source.split(/\s+/).filter(Boolean);
}

/**
 * Scroll-triggered word reveal — each word fades and rises into place with a
 * stagger once the block enters the viewport. Under `prefers-reduced-motion`
 * the full string renders immediately with no animation.
 *
 * Accessibility: animating words are `aria-hidden`; the complete string is
 * always available through a visually-hidden span for screen readers.
 */
export const TextReveal = forwardRef<HTMLSpanElement, TextRevealProps>(
  ({ text, children, className, delay = 0, stagger = 0.05 }, ref) => {
    const containerRef = useRef<HTMLSpanElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: '-80px' });
    const shouldReduceMotion = useReducedMotion();

    const content = text ?? children ?? '';
    const words = useMemo(() => splitWords(content), [content]);

    const shouldAnimate = isInView && !shouldReduceMotion;
    const showImmediately = shouldReduceMotion || isInView;

    const setRef = (node: HTMLSpanElement | null) => {
      containerRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    if (words.length === 0) return null;

    return (
      <span ref={setRef} className={cn('inline text-foreground', className)}>
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            className="inline-block"
            aria-hidden="true"
            initial={
              showImmediately
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 12 }
            }
            animate={
              shouldAnimate || showImmediately
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 12 }
            }
            transition={{
              duration: shouldReduceMotion ? 0 : DURATION.slow,
              ease: EASE_OUT,
              delay: shouldReduceMotion ? 0 : delay + index * stagger,
            }}
          >
            {word}
            {index < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        ))}
        <span className="sr-only">{content}</span>
      </span>
    );
  },
);

TextReveal.displayName = 'TextReveal';
