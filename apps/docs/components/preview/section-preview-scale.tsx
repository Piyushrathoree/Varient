import { cn } from '@varient/ui';
import type { ReactNode } from 'react';

interface SectionPreviewScaleProps {
  children: ReactNode;
  className?: string;
}

/**
 * Shrinks full-page section demos into gallery cards without crushing layout.
 * Pointer events are disabled so the card link remains the sole interaction target.
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
          'scale-[0.55] sm:scale-[0.6]',
          'w-[182%] -translate-x-[22.5%] sm:w-[167%] sm:-translate-x-[20%]',
        )}
      >
        {children}
      </div>
    </div>
  );
}
