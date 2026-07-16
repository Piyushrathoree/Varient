'use client';

import { useEffect, useState, type RefObject } from 'react';

/**
 * True while the referenced element is in (or near) the viewport.
 * Perpetual animations — rAF canvas loops, `repeat: Infinity` motion loops,
 * setInterval cycles — should run only while this is true, so a dozen mounted
 * demos don't burn CPU/battery from three screens away.
 *
 * SSR-safe and fail-open: returns true until an IntersectionObserver reports
 * otherwise, and stays true where IO is unavailable.
 */
export function useViewportActive<T extends Element>(
  ref: RefObject<T | null>,
  rootMargin = '200px',
): boolean {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setIsActive(entry.isIntersecting);
      },
      { rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return isActive;
}
