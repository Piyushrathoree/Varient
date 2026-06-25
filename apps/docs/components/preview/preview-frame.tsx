import { cn } from '@varient/ui';
import type { ReactNode } from 'react';

interface PreviewFrameProps {
  children: ReactNode;
  className?: string;
  minHeight?: 'sm' | 'md' | 'lg';
}

const minHeights = {
  sm: 'min-h-[140px]',
  md: 'min-h-[220px]',
  lg: 'min-h-[320px]',
};

export function PreviewFrame({
  children,
  className,
  minHeight = 'md',
}: PreviewFrameProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-border bg-bg-base shadow-sm',
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-border bg-bg-subtle/60 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-danger/80" />
          <span className="size-2.5 rounded-full bg-warning/80" />
          <span className="size-2.5 rounded-full bg-success/80" />
        </div>
        <span className="text-xs font-medium uppercase tracking-wider text-text-tertiary">
          Preview
        </span>
        <div className="w-[52px]" />
      </div>
      <div
        className={cn(
          'relative flex items-center justify-center p-6 sm:p-10',
          minHeights[minHeight],
          'bg-[radial-gradient(circle_at_1px_1px,var(--border)_1px,transparent_0)] [background-size:20px_20px]',
          'bg-bg-subtle/30',
        )}
      >
        <div className="relative z-10 w-full">{children}</div>
      </div>
    </div>
  );
}
