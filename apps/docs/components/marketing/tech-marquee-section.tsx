'use client';

import { useReducedMotion } from 'motion/react';
import { cn } from '@varient/ui';
import Divider from '@/components/marketing/divider';

const TECH_STACK = [
  'React',
  'Next.js',
  'Tailwind CSS v4',
  'Motion',
  'Radix UI',
  'TypeScript',
  'React Native',
  'Expo',
  'NativeWind',
  'Reanimated',
] as const;

const EDGE_MASK =
  '[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]';

function TechChip({ label, hidden }: { label: string; hidden?: boolean }) {
  return (
    <span
      aria-hidden={hidden}
      className="inline-flex shrink-0 items-center rounded-full border border-border bg-smooth-100 px-4 py-2 font-mono text-[12.5px] text-smooth-900 transition-colors duration-200 hover:border-brand/40 hover:text-brand"
    >
      {label}
    </span>
  );
}

function MarqueeRow({ direction }: { direction: 'left' | 'right' }) {
  return (
    <div className={cn('overflow-hidden', EDGE_MASK)}>
      <div
        className={cn(
          'marquee-track',
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right',
        )}
      >
        {TECH_STACK.map((name) => (
          <TechChip key={name} label={name} />
        ))}
        {TECH_STACK.map((name) => (
          <TechChip key={`${name}-dup`} hidden label={name} />
        ))}
      </div>
    </div>
  );
}

export function TechMarqueeSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-background px-6 py-20 md:px-8 md:py-24">
      <Divider />
      <div className="mx-auto max-w-7xl">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.18em] text-brand">
          {'// runs on your stack'}
        </p>

        {shouldReduceMotion ? (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {TECH_STACK.map((name) => (
              <TechChip key={name} label={name} />
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col gap-3">
            <MarqueeRow direction="left" />
            <MarqueeRow direction="right" />
          </div>
        )}
      </div>
    </section>
  );
}
