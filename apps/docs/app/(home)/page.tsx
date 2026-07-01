'use client';

import Link from 'next/link';
import { ArrowRight, Box, Copy, Layers, Sparkles, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@varient/ui';
import { getReadyCount, components } from '@/lib/components/registry';
import { ComponentMarquee } from '@/components/marketing/component-marquee';
import type { ComponentLayer } from '@/lib/components/registry';

const row1 = components
  .filter((_, i) => i % 2 === 0)
  .map((c) => ({ name: c.name, layer: c.layer as ComponentLayer }));

const row2 = components
  .filter((_, i) => i % 2 !== 0)
  .map((c) => ({ name: c.name, layer: c.layer as ComponentLayer }));

const stats = [
  { value: '75', label: 'Components' },
  { value: '3', label: 'Layers' },
  { value: '0', label: 'Per-install deps' },
  { value: '100%', label: 'You own it' },
];

const layers = [
  {
    icon: Layers,
    name: 'Foundation',
    count: '25',
    description:
      'Radix-powered utility components — Button, Input, Modal, Table. Accessible, keyboard-navigable, dark-first.',
    href: '/components',
    accent: 'from-brand-500/20 to-brand-600/5',
    iconBg: 'bg-brand-500/15 text-brand-400',
    border: 'hover:border-brand-500/40',
  },
  {
    icon: Zap,
    name: 'Animated',
    count: '30',
    description:
      'Framer Motion wow-factor — Marquee, Globe, Particles, Border Beam. Every component has a live prop playground.',
    href: '/components',
    accent: 'from-neutral-700/30 to-neutral-800/10',
    iconBg: 'bg-neutral-700/40 text-neutral-300',
    border: 'hover:border-neutral-600/60',
  },
  {
    icon: Box,
    name: 'Sections',
    count: '20',
    description:
      'Full-page blocks — Hero, Pricing, FAQ, Footer. Drop in, change the copy, ship. Composes from Layer 1 + 2.',
    href: '/components',
    accent: 'from-neutral-700/20 to-neutral-800/5',
    iconBg: 'bg-neutral-700/30 text-neutral-400',
    border: 'hover:border-neutral-700/60',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0, 0, 0.2, 1],
    },
  },
};

export default function HomePage() {
  const readyCount = getReadyCount();

  return (
    <main className="flex flex-1 flex-col">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        {/* Dot grid background */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-dot-grid opacity-60" />
        {/* Aurora radial */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% -10%, rgb(99 102 241 / 0.25), transparent 70%)',
          }}
        />
        {/* Bottom fade */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg-base to-transparent"
        />

        <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-24 pt-28 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-0"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <div className="shimmer-badge mb-8 inline-flex items-center gap-2 rounded-full border border-brand-500/30 px-4 py-1.5 text-sm font-medium text-brand-300">
                <Sparkles className="size-3.5" />
                {readyCount} of {components.length} components ready
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-display max-w-3xl text-5xl font-extrabold tracking-tight text-text-primary sm:text-7xl"
            >
              Build faster with{' '}
              <span className="text-gradient-brand">every varient</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="mt-8 max-w-xl text-lg leading-relaxed text-text-secondary"
            >
              Copy-paste React components for utilities, animations, and full-page sections —
              one consistent indigo identity, you own the code.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
            >
              <Button asChild variant="primary" size="lg" className="group min-w-[11rem]">
                <Link href="/components">
                  Browse components
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-w-[11rem]">
                <Link href="/docs">Documentation</Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-0.5">
                  <span className="font-display text-2xl font-bold text-text-primary">
                    {stat.value}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wider text-text-tertiary">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Component Ticker ── */}
      <section className="border-y border-border/40 bg-bg-subtle/20 py-10">
        <div className="mx-auto mb-6 max-w-5xl px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            75 components across 3 layers
          </p>
        </div>
        <ComponentMarquee row1={row1} row2={row2} />
      </section>

      {/* ── Three Layers ── */}
      <section className="py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-400">
              Architecture
            </p>
            <h2 className="font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
              Three layers.{' '}
              <span className="text-text-secondary">One library.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-text-secondary">
              No more switching between five different libraries. Foundation to Sections — everything
              a website needs, one consistent design system.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {layers.map((layer) => {
              const Icon = layer.icon;
              return (
                <Link
                  key={layer.name}
                  href={layer.href}
                  className="card-glow group flex flex-col overflow-hidden rounded-2xl border border-border bg-bg-base transition-all"
                >
                  {/* Gradient top */}
                  <div className={`h-px bg-gradient-to-r ${layer.accent}`} />
                  <div className="flex flex-1 flex-col p-7">
                    <div
                      className={`mb-5 inline-flex size-10 items-center justify-center rounded-xl ${layer.iconBg}`}
                    >
                      <Icon className="size-5" />
                    </div>
                    <div className="mb-2 flex items-baseline gap-2">
                      <h3 className="font-display text-xl font-semibold text-text-primary">
                        {layer.name}
                      </h3>
                      <span className="rounded-full bg-bg-muted px-2 py-0.5 text-xs font-medium text-text-tertiary">
                        {layer.count}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {layer.description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-brand-400 opacity-0 transition-opacity group-hover:opacity-100">
                      Explore
                      <ArrowRight className="size-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Copy-Paste DX ── */}
      <section className="border-y border-border/40 bg-bg-subtle/20 py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
            <div className="flex-1">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-400">
                Copy-Paste DX
              </p>
              <h2 className="font-display text-4xl font-bold tracking-tight text-text-primary">
                You own the code.
                <br />
                <span className="text-text-secondary">No lock-in, ever.</span>
              </h2>
              <p className="mt-5 leading-relaxed text-text-secondary">
                No npm installs per component. Visit the docs, copy the component, paste into your project.
                The code lives in your codebase — you can modify, delete, or diverge from the original at any time.
              </p>
              <Button asChild variant="primary" size="md" className="group mt-8">
                <Link href="/components">
                  See all components
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </div>

            {/* Code snippet */}
            <div className="w-full flex-1 overflow-hidden rounded-2xl border border-border bg-bg-base font-mono text-sm">
              <div className="flex items-center gap-2 border-b border-border bg-bg-subtle/60 px-4 py-3">
                <span className="size-2.5 rounded-full bg-danger/80" />
                <span className="size-2.5 rounded-full bg-warning/80" />
                <span className="size-2.5 rounded-full bg-success/80" />
                <span className="ml-auto text-xs text-text-tertiary">button.tsx</span>
              </div>
              <div className="p-5 leading-relaxed">
                <div className="text-neutral-500">
                  <span className="text-brand-300">import</span>
                  <span className="text-neutral-300"> {'{ cn }'} </span>
                  <span className="text-brand-300">from</span>
                  <span className="text-neutral-400"> &apos;@/lib/utils&apos;</span>
                </div>
                <div className="mt-3 text-neutral-500">
                  <span className="text-brand-300">export function</span>
                  <span className="text-yellow-300"> Button</span>
                  <span className="text-neutral-400">{'({ children, variant })'} {'{'}</span>
                </div>
                <div className="ml-4 text-neutral-500">
                  <span className="text-brand-300">return</span>
                  <span className="text-neutral-400"> {'('}</span>
                </div>
                <div className="ml-8 text-neutral-400">
                  <span className="text-red-400">{'<button'}</span>
                  <span className="text-yellow-300"> className</span>
                  <span className="text-neutral-400">={'{'}</span>
                  <span className="text-green-300">cn</span>
                  <span className="text-neutral-400">{'(base, variants[variant])'}</span>
                  <span className="text-neutral-400">{'}'}</span>
                  <span className="text-red-400">{'>'}</span>
                </div>
                <div className="ml-12 text-neutral-300">{'{children}'}</div>
                <div className="ml-8 text-red-400">{'</button>'}</div>
                <div className="ml-4 text-neutral-400">{')'}</div>
                <div className="text-neutral-400">{'}'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
          <div
            className="mb-8 rounded-full border border-brand-500/30 p-4 shadow-[0_0_24px_rgb(99_102_241/0.25)]"
          >
            <Copy className="size-6 text-brand-400" />
          </div>
          <h2 className="font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            See it. Copy it. Ship it.
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-text-secondary">
            Every component has a live preview, props table, and copy-ready source.
            No account required.
          </p>
          <Button asChild variant="primary" size="lg" className="group mt-10">
            <Link href="/components">
              Open component gallery
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
