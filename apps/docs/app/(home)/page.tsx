import Link from 'next/link';
import { ArrowRight, Box, Layers, Sparkles, Zap } from 'lucide-react';
import { Button } from '@varient/ui';
import { getReadyCount, components } from '@/lib/components/registry';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgb(99_102_241/0.3),transparent)]"
        />
        <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-32 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/80 bg-bg-subtle/80 px-4 py-1.5 text-sm text-text-secondary backdrop-blur-sm">
            <Sparkles className="size-4 text-brand-500" />
            {getReadyCount()} of {components.length} components ready
          </div>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-text-primary sm:text-6xl">
            Build faster with{' '}
            <span className="text-brand-500">every varient</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-text-secondary">
            Copy-paste React components for utilities, animations, and full-page sections —
            one consistent indigo identity, you own the code.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild variant="primary" size="lg">
              <Link href="/components">
                Browse components
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/docs">Documentation</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-bg-subtle/40">
        <div className="mx-auto grid max-w-5xl gap-8 px-6 py-20 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-bg-base p-6">
            <Layers className="mb-4 size-6 text-brand-500" />
            <h2 className="text-lg font-semibold text-text-primary">Foundation</h2>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              Radix-powered utilities — Button, Input, Modal, Table, and more. Accessible by default.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-bg-base p-6">
            <Zap className="mb-4 size-6 text-brand-500" />
            <h2 className="text-lg font-semibold text-text-primary">Animated</h2>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              Framer Motion wow-factor — Marquee, Globe, Particles, with live playgrounds.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-bg-base p-6">
            <Box className="mb-4 size-6 text-brand-500" />
            <h2 className="text-lg font-semibold text-text-primary">Sections</h2>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              Full-page blocks — Hero, Pricing, FAQ, Footer. Drop in, change copy, ship.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-20 text-center">
          <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
            See it before you copy it
          </h2>
          <p className="max-w-xl text-text-secondary">
            Every component has a live preview in the gallery and a full docs page with props,
            usage, and copy-ready source.
          </p>
          <Button asChild variant="primary" size="lg">
            <Link href="/components">
              Open component gallery
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
