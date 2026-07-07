'use client';

import { buttonVariants, MagneticButton } from '@varient/ui';

export function MagneticButtonDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-10 py-6">
      <p className="text-sm font-medium text-muted-foreground">
        Move your cursor near a button — it pulls toward you, then springs back.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-10">
        <div className="flex flex-col items-center gap-2">
          <MagneticButton className={buttonVariants({ variant: 'primary', size: 'lg' })}>
            Subtle pull
          </MagneticButton>
          <span className="text-xs text-muted-foreground">strength 0.3 (default)</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <MagneticButton
            strength={0.5}
            distance={140}
            className={buttonVariants({ variant: 'outline', size: 'lg' })}
          >
            Stronger pull
          </MagneticButton>
          <span className="text-xs text-muted-foreground">strength 0.5, distance 140</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <MagneticButton
            strength={0.15}
            distance={70}
            className={buttonVariants({ variant: 'secondary', size: 'lg' })}
          >
            Barely there
          </MagneticButton>
          <span className="text-xs text-muted-foreground">strength 0.15, distance 70</span>
        </div>
      </div>
    </div>
  );
}

export function MagneticButtonPreviewCompact() {
  return (
    <MagneticButton className={buttonVariants({ variant: 'primary', size: 'md' })}>
      Hover me
    </MagneticButton>
  );
}
