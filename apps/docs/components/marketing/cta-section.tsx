'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Check, Copy } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Button } from '@varient/ui';
import { Github } from '@/components/site/brand-icons';
import Divider from '@/components/marketing/divider';
import { SectionHeader } from '@/components/marketing/section-header';
import { SITE_URL, gitConfig } from '@/lib/shared';

const GITHUB_URL = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;
const INSTALL_COMMAND = `npx shadcn@latest add ${SITE_URL}/r/button.json`;

const EASE_OUT_QUAD = [0.25, 0.46, 0.45, 0.94] as const;

/** Mono install one-liner with a working clipboard copy + check feedback. */
function InstallCommand() {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(INSTALL_COMMAND)
      .then(() => {
        setCopied(true);
        if (resetTimer.current) clearTimeout(resetTimer.current);
        resetTimer.current = setTimeout(() => setCopied(false), 1800);
      })
      .catch(() => {
        /* clipboard unavailable — leave the chip as-is */
      });
  };

  return (
    <div className="inline-flex max-w-full items-center gap-2.5 rounded-lg border border-border bg-smooth-50 py-1.5 pr-1.5 pl-4 font-mono text-muted-foreground text-xs">
      <span aria-hidden="true" className="select-none text-brand">
        $
      </span>
      <code className="truncate">{INSTALL_COMMAND}</code>
      <button
        aria-label={copied ? 'Install command copied' : 'Copy install command'}
        className="inline-flex size-7 shrink-0 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        onClick={handleCopy}
        type="button"
      >
        {copied ? (
          <Check aria-hidden="true" className="size-3.5 text-brand" />
        ) : (
          <Copy aria-hidden="true" className="size-3.5" />
        )}
      </button>
    </div>
  );
}

/**
 * Closing conversion panel — a single aurora-bordered surface (conic beam
 * ring + dot-grid backdrop) carrying the install one-liner and the two exits
 * off the marketing site: browse the library, or star the repo.
 */
export function CtaSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full bg-background px-6 py-24 md:px-8 md:py-32">
      <Divider />
      <motion.div
        className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl aurora-border bg-smooth-100"
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.45, ease: EASE_OUT_QUAD }}
        viewport={{ once: true, amount: 0.4 }}
        whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-dot-grid mask-fade-radial" />

        <div className="relative px-6 py-16 text-center sm:px-12 sm:py-20">
          <SectionHeader
            align="center"
            description="Browse the library, copy what you need, and ship real motion — no package, no lock-in."
            eyebrow="// get started"
            title={
              <>
                Stop shipping{' '}
                <em className="font-serif-accent italic text-gradient-brand">static.</em>
              </>
            }
          />

          <div className="mt-8 flex justify-center">
            <InstallCommand />
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="primary">
              <Link href="/components">Browse components</Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <a href={GITHUB_URL} rel="noopener noreferrer" target="_blank">
                <Github className="size-4" />
                Star on GitHub
              </a>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
