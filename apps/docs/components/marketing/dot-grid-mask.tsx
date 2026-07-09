import { cn } from '@varient/ui';

interface DotGridMaskProps {
  className?: string;
}

/**
 * Subtle dot texture with a radial fade — used behind CTA and section accents.
 * Pure CSS, no raw hex; relies on semantic foreground tokens.
 */
export function DotGridMask({ className }: DotGridMaskProps) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        '[mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]',
        className,
      )}
    >
      <div
        className={cn(
          'absolute inset-0 opacity-[0.35]',
          '[background-image:radial-gradient(circle,var(--color-border)_1px,transparent_1px)]',
          '[background-size:20px_20px]',
        )}
      />
    </div>
  );
}
