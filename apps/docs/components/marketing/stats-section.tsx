'use client';

import { motion, useReducedMotion } from 'motion/react';
import {
  components,
  getComponentsByLayer,
  getReadyCount,
  LAYER_COUNT,
  layerLabels,
} from '@/lib/components/registry';
import Divider from '@/components/marketing/divider';

interface StatItem {
  label: string;
  value: string;
  detail: string;
}

function buildStats(): StatItem[] {
  const readyCount = getReadyCount();
  const foundationCount = getComponentsByLayer('foundation').filter((c) => c.status === 'shipped').length;
  const animatedCount = getComponentsByLayer('animated').filter((c) => c.status === 'shipped').length;
  const sectionsCount = getComponentsByLayer('sections').filter((c) => c.status === 'shipped').length;

  return [
    {
      label: 'Components',
      value: String(readyCount),
      detail: `${readyCount} of ${components.length} shipped`,
    },
    {
      label: 'Layers',
      value: String(LAYER_COUNT),
      detail: `${foundationCount} · ${animatedCount} · ${sectionsCount}`,
    },
    {
      label: 'License',
      value: 'MIT',
      detail: 'Copy-paste, you own the code',
    },
  ];
}

export function StatsSection() {
  const shouldReduceMotion = useReducedMotion();
  const stats = buildStats();

  return (
    <section className="relative border-y border-border bg-card/30 px-6 py-16 md:px-8 md:py-20">
      <Divider className="opacity-0" />
      <div className="mx-auto max-w-7xl">
        <ul className="grid gap-8 sm:grid-cols-3 sm:gap-6">
          {stats.map((stat, index) => (
            <motion.li
              key={stat.label}
              className="list-none text-center sm:text-left"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.4, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }
              }
              viewport={{ once: true, amount: 0.5 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {stat.label}
              </p>
              <p className="mt-2 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.detail}</p>
              {stat.label === 'Layers' && (
                <p className="mt-1 text-xs text-muted-foreground/80">
                  {layerLabels.foundation} · {layerLabels.animated} · {layerLabels.sections}
                </p>
              )}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
