'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { Button } from '@varient/ui';
import { DotGridMask } from '@/components/marketing/dot-grid-mask';
import Divider from '@/components/marketing/divider';

export function CtaSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-background px-6 py-24 md:px-8 md:py-32">
      <Divider />
      <DotGridMask />
      <div className="relative mx-auto max-w-3xl text-center">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.4 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Get started
          </p>
          <h2 className="mt-4 text-balance font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Copy the components.{' '}
            <span className="text-brand">Ship the motion.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-balance text-muted-foreground md:text-lg">
            No runtime package, no lock-in. Browse the library, paste what you need, and make it
            yours.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="primary">
              <Link href="/components">Explore components</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/docs">Read the docs</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
