'use client';

import { forwardRef, useId, type HTMLAttributes, type ReactNode } from 'react';
import { useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';

export interface LogoCloudLogo {
  name: string;
  icon?: ReactNode;
}

export interface LogoCloudProps extends HTMLAttributes<HTMLElement> {
  /** Small centered eyebrow above the logo row. */
  title?: string;
  logos?: LogoCloudLogo[];
  /** Scroll the logo row in an infinite CSS translate loop. */
  isMarquee?: boolean;
}

function LogoMarkDiamond({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path d="M12 3 21 12 12 21 3 12z" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}

function LogoMarkCircle({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </svg>
  );
}

function LogoMarkTriangle({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path d="M12 4 20 18H4z" />
    </svg>
  );
}

function LogoMarkHexagon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path d="M12 3 19 8v8l-7 5-7-5V8z" />
    </svg>
  );
}

function LogoMarkWave({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path d="M3 14c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      <path d="M3 10c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
    </svg>
  );
}

function LogoMarkCross({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path d="M12 4v16M4 12h16" />
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}

const DEFAULT_MARKS = [
  LogoMarkDiamond,
  LogoMarkCircle,
  LogoMarkTriangle,
  LogoMarkHexagon,
  LogoMarkWave,
  LogoMarkCross,
] as const;

const DEFAULT_LOGOS: LogoCloudLogo[] = [
  { name: 'Acme' },
  { name: 'Northwind' },
  { name: 'Vertex' },
  { name: 'Prism' },
  { name: 'Atlas' },
  { name: 'Horizon' },
];

function LogoItem({ logo, index }: { logo: LogoCloudLogo; index: number }) {
  const Mark = DEFAULT_MARKS[index % DEFAULT_MARKS.length];

  return (
    <div
      className="inline-flex h-6 shrink-0 items-center gap-2.5 text-muted-foreground transition-colors duration-200 hover:text-foreground sm:h-8 motion-reduce:transition-none"
      title={logo.name}
    >
      {logo.icon ?? <Mark className="size-5 sm:size-6" />}
      <span className="font-title text-sm font-semibold tracking-tight sm:text-base">
        {logo.name}
      </span>
    </div>
  );
}

function LogoRow({ logos }: { logos: LogoCloudLogo[] }) {
  return (
    <>
      {logos.map((logo, index) => (
        <LogoItem key={`${logo.name}-${index}`} index={index} logo={logo} />
      ))}
    </>
  );
}

export const LogoCloud = forwardRef<HTMLElement, LogoCloudProps>(
  (
    {
      className,
      title = 'Trusted by teams at',
      logos = DEFAULT_LOGOS,
      isMarquee = false,
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const animationId = useId().replace(/:/g, '');
    const trackClass = `logo-cloud-track-${animationId}`;
    const useMarquee = isMarquee && !shouldReduceMotion;

    return (
      <section
        ref={ref}
        aria-label={title || 'Partner logos'}
        className={cn('w-full px-6 py-12 sm:px-8 sm:py-16', className)}
        {...props}
      >
        <div className="mx-auto max-w-6xl space-y-8">
          {title && (
            <p className="text-center text-sm text-muted-foreground">{title}</p>
          )}

          {useMarquee ? (
            <div className="relative overflow-hidden">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent"
              />
              <style>
                {`
                  @keyframes logo-cloud-${animationId} {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                  }
                  .${trackClass} {
                    animation: logo-cloud-${animationId} 28s linear infinite;
                  }
                `}
              </style>
              <div className={cn('flex w-max', trackClass)}>
                <div className="flex shrink-0 items-center gap-x-12 gap-y-8 pr-12">
                  <LogoRow logos={logos} />
                </div>
                <div
                  aria-hidden
                  className="flex shrink-0 items-center gap-x-12 gap-y-8 pr-12"
                >
                  <LogoRow logos={logos} />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
              <LogoRow logos={logos} />
            </div>
          )}
        </div>
      </section>
    );
  },
);

LogoCloud.displayName = 'LogoCloud';
