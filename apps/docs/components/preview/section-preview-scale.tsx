import { cn } from '@varient/ui';
import type { ReactNode } from 'react';

interface SectionPreviewScaleProps {
  children: ReactNode;
  className?: string;
}

/**
 * Shrinks full-page section demos into gallery cards without crushing layout.
 * Pointer events are disabled so the card link remains the sole interaction target.
 * The shrink, the inverse width, and the centering offset all derive from one
 * `--section-scale` custom property so the numbers can never drift apart: width
 * = 100% / scale; translateX resolves against the element's own (unscaled)
 * width per the CSS transforms spec, so re-centering it under `origin-top`
 * (whose horizontal origin sits at the box's own 50%) takes (1 - scale) * 50%.
 */
export function SectionPreviewScale({ children, className }: SectionPreviewScaleProps) {
  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-none overflow-hidden',
        'h-[280px] sm:h-[320px]',
        className,
      )}
    >
      <div
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 origin-top select-none',
          '[--section-scale:0.55] sm:[--section-scale:0.6]',
          'scale-(--section-scale)',
          'w-[calc(100%/var(--section-scale))]',
          '-translate-x-[calc((1-var(--section-scale))*50%)]',
        )}
      >
        {children}
      </div>
    </div>
  );
}
