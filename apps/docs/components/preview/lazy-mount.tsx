'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@varient/ui';

interface LazyMountProps {
  children: ReactNode;
  /** Placeholder min-height while unmounted — number = px, string = any CSS length. */
  minHeight?: number | string;
  /** How far ahead of the viewport mounting kicks in. */
  rootMargin?: string;
  className?: string;
}

/**
 * Defers mounting `children` until the wrapper nears the viewport, then mounts
 * permanently (never unmounts again — demos keep their state once seen). Keeps
 * routes with dozens of live/looping previews from mounting all of them at once.
 *
 * SSR-safe: renders the placeholder on the server; if IntersectionObserver is
 * unavailable client-side, mounts immediately (fail-open).
 */
export function LazyMount({ children, minHeight, rootMargin = '250px', className }: LazyMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isMounted) return;
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      setIsMounted(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isMounted, rootMargin]);

  if (isMounted) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn('skeleton-shimmer w-full rounded-xl border border-border bg-smooth-100', className)}
      style={minHeight !== undefined ? { minHeight } : undefined}
    />
  );
}
