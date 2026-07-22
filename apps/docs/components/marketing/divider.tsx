import { cn } from '@varient/ui';

interface DividerProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

/**
 * Hairline gradient rule for section edges. Sections render one of these as an
 * absolutely-positioned bottom (or side) edge so consecutive sections read as
 * sheets separated by a single fading line, never a hard border. A centered
 * `plus-mark` joint marks the rail intersection, drafting-table style.
 */
export default function Divider({ orientation = 'horizontal', className }: DividerProps) {
  const isHorizontal = orientation === 'horizontal';

  return (
    <div
      className={cn(
        'absolute z-1',
        isHorizontal ? 'right-0 bottom-0 left-0 h-px' : 'top-0 right-0 h-full w-px',
        className,
      )}
    >
      <div
        className={cn(
          'h-full w-full',
          isHorizontal
            ? 'bg-gradient-to-r from-transparent via-border to-transparent'
            : 'bg-gradient-to-b from-transparent via-border to-transparent',
        )}
      />
      <span
        aria-hidden
        className="plus-mark -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2"
      />
    </div>
  );
}
