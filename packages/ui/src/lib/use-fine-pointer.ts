'use client';

import { useEffect, useState } from 'react';

/**
 * True when the primary input is a fine pointer that can hover (mouse/trackpad).
 * Pointer-tracking effects (magnetic pull, 3D tilt, cursor spotlights) should
 * attach their listeners only when this is true — touch devices get the static
 * treatment. SSR-safe: starts false, resolves after mount.
 */
export function useFinePointer(): boolean {
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsFinePointer(query.matches);

    const onChange = (event: MediaQueryListEvent) => setIsFinePointer(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return isFinePointer;
}
