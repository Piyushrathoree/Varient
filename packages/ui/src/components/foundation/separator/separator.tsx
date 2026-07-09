'use client';

import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cn } from '../../../lib/utils';

export interface SeparatorProps extends ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  /** Centered label with hairlines on both sides — only applies to horizontal orientation. */
  label?: string;
}

export const Separator = forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(({ className, orientation = 'horizontal', decorative = true, label, ...props }, ref) => {
  if (label && orientation === 'horizontal') {
    return (
      <div role="none" className={cn('flex w-full items-center gap-3', className)}>
        <SeparatorPrimitive.Root
          ref={ref}
          decorative={decorative}
          orientation="horizontal"
          className="h-px min-h-px flex-1 bg-border"
        />
        <span className="shrink-0 text-xs font-medium text-muted-foreground">{label}</span>
        <SeparatorPrimitive.Root
          decorative={decorative}
          orientation="horizontal"
          className="h-px min-h-px flex-1 bg-border"
        />
      </div>
    );
  }

  return (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className,
      )}
      {...props}
    />
  );
});

Separator.displayName = 'Separator';
