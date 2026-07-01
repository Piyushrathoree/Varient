import { cn } from '@varient/ui';
import type { ReactNode } from 'react';

interface PreviewFrameProps {
  children: ReactNode;
  className?: string;
  minHeight?: 'sm' | 'md' | 'lg' | 'xl';
  label?: string;
}

const minHeights = {
  sm: 'min-h-[160px]',
  md: 'min-h-[240px]',
  lg: 'min-h-[360px]',
  xl: 'min-h-[480px]',
};

export function PreviewFrame({
  children,
  className,
  minHeight = 'md',
  label,
}: PreviewFrameProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-border/60 bg-bg-base',
        className,
      )}
    >
      {label && (
        <div className="flex items-center justify-between border-b border-border/50 bg-bg-subtle/60 px-5 py-3">
          <span className="text-xs font-medium uppercase tracking-wider text-text-tertiary">
            {label}
          </span>
        </div>
      )}
      <div
        className={cn(
          'relative flex items-center justify-center p-10 sm:p-16',
          minHeights[minHeight],
          /* subtle dot grid — indigo in dark mode, faint in light */
          'bg-[radial-gradient(circle_at_1px_1px,rgb(99_102_241/0.05)_1px,transparent_0)] [background-size:24px_24px]',
          'dark:bg-[radial-gradient(circle_at_1px_1px,rgb(99_102_241/0.1)_1px,transparent_0)] dark:[background-size:24px_24px]',
        )}
      >
        <div className="relative z-10 w-full">{children}</div>
      </div>
    </div>
  );
}
