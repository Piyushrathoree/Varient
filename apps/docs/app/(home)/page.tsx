import Link from 'next/link';
import { ArrowRight, Layers, Sparkles, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-bg-subtle px-4 py-1.5 text-sm text-text-secondary">
          <Sparkles className="size-4 text-brand-500" />
          Foundation · Animated · Sections
        </div>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-text-primary sm:text-6xl">
          Every component your website needs, in{' '}
          <span className="text-brand-500">every varient</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-text-secondary">
          A copy-paste React UI library — Radix-powered utilities, Framer Motion
          animations, and full-page sections with a consistent indigo identity.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-md bg-brand-500 px-5 py-2.5 text-sm font-medium text-neutral-0 transition-colors hover:bg-brand-600"
          >
            Get started
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/docs/getting-started/introduction"
            className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-bg-subtle"
          >
            Read the docs
          </Link>
        </div>
      </section>

      <section className="border-t border-border bg-bg-subtle">
        <div className="mx-auto grid max-w-5xl gap-8 px-6 py-16 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-bg-base p-6">
            <Layers className="mb-3 size-5 text-brand-500" />
            <h2 className="font-semibold text-text-primary">Foundation</h2>
            <p className="mt-2 text-sm text-text-secondary">
              25 accessible utility components powered by Radix UI primitives.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-bg-base p-6">
            <Zap className="mb-3 size-5 text-brand-500" />
            <h2 className="font-semibold text-text-primary">Animated</h2>
            <p className="mt-2 text-sm text-text-secondary">
              30 Framer Motion components with live playgrounds and reduced-motion support.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-bg-base p-6">
            <Sparkles className="mb-3 size-5 text-brand-500" />
            <h2 className="font-semibold text-text-primary">Sections</h2>
            <p className="mt-2 text-sm text-text-secondary">
              20 full-page blocks — Hero, Pricing, FAQ, and more. Drop in, ship.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
