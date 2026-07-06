'use client';

import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/**
 * SSR-safe `prefers-reduced-motion` check. Every animated component in
 * Varient must fall back to instant opacity/color transitions when this
 * is true — no exceptions, including the theme-switch crossfade itself.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    setReduced(mql.matches);

    const handler = (event: MediaQueryListEvent) => setReduced(event.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return reduced;
}
