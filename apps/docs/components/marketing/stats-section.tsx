'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { NumberTicker, cn } from '@varient/ui';
import { getReadyCount } from '@/lib/components/registry';

interface StatSlot {
  key: string;
  label: string;
  render: () => ReactNode;
}

const SPRING = { type: 'spring', stiffness: 260, damping: 30 } as const;

export function StatsSection() {
  const shouldReduceMotion = useReducedMotion();
  const readyCount = getReadyCount();

  const slots: StatSlot[] = [
    {
      key: 'shipped',
      label: 'components shipped',
      render: () => (
        <>
          <NumberTicker value={readyCount} />
          <span className="text-brand">+</span>
        </>
      ),
    },
    {
      key: 'platforms',
      label: 'web + native',
      render: () => (
        <>
          2<span className="text-brand"> platforms</span>
        </>
      ),
    },
    {
      key: 'physics',
      label: 'spring physics',
      render: () => (
        <>
          60<span className="text-brand">fps</span>
        </>
      ),
    },
    {
      key: 'license',
      label: 'zero lock-in',
      render: () => 'MIT',
    },
  ];

  return (
    <section className="relative w-full border-y border-border bg-background">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 px-6 sm:grid-cols-4 sm:px-8" role="list">
        {slots.map((slot, index) => {
          const col = index % 2;
          const row = Math.floor(index / 2);

          return (
            <motion.li
              key={slot.key}
              className={cn(
                'relative list-none px-4 py-10 text-center border-border sm:px-6 sm:py-14',
                col === 1 && 'border-l',
                row === 1 && 'border-t',
                index > 0 && 'sm:border-l sm:border-t-0',
              )}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              transition={shouldReduceMotion ? { duration: 0 } : { ...SPRING, delay: index * 0.08 }}
              viewport={{ once: true, amount: 0.5 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            >
              {index > 0 && (
                <span
                  aria-hidden
                  className="plus-mark absolute -top-[4.5px] -left-[4.5px] hidden sm:block"
                />
              )}
              {index > 0 && (
                <span
                  aria-hidden
                  className="plus-mark absolute -bottom-[4.5px] -left-[4.5px] hidden sm:block"
                />
              )}
              <p className="font-title text-4xl font-semibold tabular-nums tracking-[-0.03em] text-foreground">
                {slot.render()}
              </p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-smooth-800">
                {slot.label}
              </p>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
