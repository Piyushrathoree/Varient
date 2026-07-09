'use client';

import { Copy, Layers3, Paintbrush, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@varient/ui';
import Divider from '@/components/marketing/divider';
import { SectionHeader } from '@/components/marketing/section-header';

const features = [
  {
    title: 'Animated by default',
    description:
      'Motion powers every animated component, with prefers-reduced-motion fallbacks built in — not bolted on afterward.',
    icon: Sparkles,
  },
  {
    title: 'Copy-paste, you own it',
    description:
      'No npm install per component. Copy the source into your project and modify it whenever you want.',
    icon: Copy,
  },
  {
    title: 'Web and native',
    description:
      'One component API across platforms — the same primitives render on the web today, React Native next.',
    icon: Layers3,
  },
  {
    title: 'Tailwind CSS v4',
    description:
      'Semantic tokens instead of hex codes, full dark mode support, and utilities you can restyle without a fight.',
    icon: Paintbrush,
  },
] as const;

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[number];
  index: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const Icon = feature.icon;

  return (
    <motion.li
      className="list-none"
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.4, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }
      }
      viewport={{ once: true, amount: 0.3 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
    >
      <article
        className={cn(
          'group relative h-full rounded-xl border border-border bg-card/40 p-6 transition-all duration-300',
          'hover:border-foreground/12 hover:bg-card',
          !shouldReduceMotion && 'hover:-translate-y-0.5 motion-reduce:hover:translate-y-0',
        )}
      >
        <div
          aria-hidden
          className="mb-5 inline-flex size-9 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors duration-300 group-hover:border-foreground/15"
        >
          <Icon className="size-4" aria-hidden />
        </div>
        <h3 className="font-semibold text-foreground text-lg">{feature.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
      </article>
    </motion.li>
  );
}

export function Features() {
  return (
    <section className="relative bg-background px-6 py-24 md:px-8 md:py-32">
      <Divider />
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          description="Built for developers who want animation without the bloat — copy-paste components for web and native, no lock-in."
          eyebrow="Why Varient"
          title={
            <>
              Designed for{' '}
              <span className="text-brand">shipping fast</span>
            </>
          }
        />
        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}
