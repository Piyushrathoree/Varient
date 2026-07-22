'use client';

import {
  Accessibility,
  Copy,
  FileCode2,
  MonitorSmartphone,
  Paintbrush,
  Sparkles,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@varient/ui';
import Divider from '@/components/marketing/divider';
import { SectionHeader } from '@/components/marketing/section-header';

/** Three bars springing up and down out of phase — "animated by default". */
function SpringBars() {
  const shouldReduceMotion = useReducedMotion();
  const bars = [10, 18, 14];
  return (
    <div aria-hidden className="flex h-9 items-end gap-1.5">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="w-2 rounded-full bg-brand/70"
          initial={{ height: h }}
          animate={shouldReduceMotion ? { height: h } : { height: [h, h + 14, h] }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 1.1, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: i * 0.15 }
          }
        />
      ))}
    </div>
  );
}

/** Mono chip nudging "copy" toward "own" on a loop — "copy-paste ownership". */
function CopyOwnChip() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div
      aria-hidden
      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-smooth-100 px-2.5 py-1.5 font-mono text-[11px] text-smooth-900"
    >
      <span>copy</span>
      <motion.span
        className="text-brand"
        animate={shouldReduceMotion ? { x: 0 } : { x: [0, 4, 0] }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        →
      </motion.span>
      <span className="text-foreground">own</span>
      <motion.span
        className="h-3 w-px bg-brand"
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: [1, 0, 1] }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 1, repeat: Infinity }}
      />
    </div>
  );
}

/** Pill toggling its highlight between "Web" and "RN" — "web + react native". */
function PlatformPill() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div
      aria-hidden
      className="relative inline-flex h-7 items-center rounded-full border border-border bg-smooth-100 p-0.5 font-mono text-[10px] uppercase tracking-wide text-smooth-900"
    >
      <motion.span
        className="absolute inset-y-0.5 left-0.5 w-14 rounded-full bg-brand/15 ring-1 ring-brand/30"
        animate={shouldReduceMotion ? { x: 0 } : { x: [0, 56, 0] }}
        transition={
          shouldReduceMotion ? { duration: 0 } : { duration: 2.4, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }
        }
      />
      <span className="relative z-1 w-14 text-center">Web</span>
      <span className="relative z-1 w-14 text-center">RN</span>
    </div>
  );
}

/** Chip flipping between a token name and its swatch — "tailwind v4 tokens". */
function TokenFlipChip() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div aria-hidden className="h-7 w-24 [perspective:500px]">
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={shouldReduceMotion ? { rotateY: 0 } : { rotateY: [0, 180, 180, 360] }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 3.6, repeat: Infinity, times: [0, 0.45, 0.9, 1], ease: 'easeInOut' }
        }
      >
        <span className="absolute inset-0 flex items-center justify-center gap-1.5 rounded-md border border-border bg-smooth-100 font-mono text-[10px] text-smooth-900 [backface-visibility:hidden]">
          <span className="size-1.5 rounded-full bg-brand" />
          brand
        </span>
        <span className="absolute inset-0 flex items-center justify-center gap-1.5 rounded-md border border-brand/40 bg-smooth-100 font-mono text-[10px] text-brand [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="size-1.5 rounded-full border border-brand" />
          token
        </span>
      </motion.div>
    </div>
  );
}

/** Ring sweeping its own progress — "accessible motion". */
function ProgressRing() {
  const shouldReduceMotion = useReducedMotion();
  const circumference = 2 * Math.PI * 14;
  return (
    <svg aria-hidden className="size-9 -rotate-90" viewBox="0 0 36 36">
      <circle cx="18" cy="18" r="14" fill="none" strokeWidth="3" className="stroke-border" />
      <motion.circle
        cx="18"
        cy="18"
        r="14"
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        className="stroke-brand"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={
          shouldReduceMotion
            ? { strokeDashoffset: circumference * 0.25 }
            : { strokeDashoffset: [circumference, circumference * 0.25, circumference] }
        }
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  );
}

/** Skeleton lines shimmering in sequence — "typescript strict". */
function SkeletonLines() {
  const shouldReduceMotion = useReducedMotion();
  const bars = [
    { width: 'w-24', delay: 0 },
    { width: 'w-20', delay: 0.2 },
    { width: 'w-14', delay: 0.4 },
  ] as const;
  return (
    <div aria-hidden className="flex h-9 w-28 flex-col justify-between">
      {bars.map((bar, i) => (
        <motion.span
          key={i}
          className={cn('skeleton-shimmer h-1.5 rounded-full bg-smooth-300', bar.width)}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: [0.4, 1, 0.4] }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: bar.delay }
          }
        />
      ))}
    </div>
  );
}

const features = [
  {
    title: 'Animated by default',
    description:
      'Spring physics ship with every animated primitive — tuned in from day one, not patched on after the fact.',
    icon: Sparkles,
    visual: SpringBars,
  },
  {
    title: 'Copy-paste ownership',
    description:
      'No package to install per component. Copy the source into your project and bend it however you like.',
    icon: Copy,
    visual: CopyOwnChip,
  },
  {
    title: 'Web + React Native',
    description:
      'One component API renders on the web today and React Native next — same primitives, same behavior.',
    icon: MonitorSmartphone,
    visual: PlatformPill,
  },
  {
    title: 'Tailwind v4 tokens',
    description:
      'Semantic tokens replace hex codes, so restyling the whole system means editing a handful of variables.',
    icon: Paintbrush,
    visual: TokenFlipChip,
  },
  {
    title: 'Accessible motion',
    description:
      "Every animation checks prefers-reduced-motion first — nobody gets movement they didn't ask for.",
    icon: Accessibility,
    visual: ProgressRing,
  },
  {
    title: 'TypeScript strict',
    description: 'Strict types and exported props on every component — the compiler catches what review misses.',
    icon: FileCode2,
    visual: SkeletonLines,
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
  const Visual = feature.visual;

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
          'spotlight-surface group relative flex h-full flex-col justify-between border border-transparent bg-background p-6 transition-colors duration-300',
          'hover:border-brand/40',
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-smooth-100 text-foreground transition-colors duration-300 group-hover:border-brand/40 group-hover:text-brand">
            <Icon aria-hidden className="size-4" />
          </div>
          <Visual />
        </div>
        <div className="mt-6">
          <h3 className="font-title text-lg font-semibold tracking-tight text-foreground">{feature.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-smooth-900">{feature.description}</p>
        </div>
      </article>
    </motion.li>
  );
}

export function FeaturesSection() {
  return (
    <section className="relative bg-background px-6 py-24 md:px-8 md:py-32">
      <Divider />
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          description="Every component in the library shares the same defaults — motion that's tuned, not templated, code you own outright, and behavior that holds up on any platform or preference."
          eyebrow="// why varient"
          title={
            <>
              Engineered for <span className="text-brand">motion</span>
            </>
          }
        />
        <ul className="relative mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}
