'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { SlidingNumber, useViewportActive } from '@varient/ui';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

function MinusIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      aria-hidden="true"
      className="size-4"
    >
      <path d="M3.5 8h9" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      aria-hidden="true"
      className="size-4"
    >
      <path d="M8 3.5v9M3.5 8h9" />
    </svg>
  );
}

// Interactive +/- stepper — the clearest demonstration of individual digit
// columns rolling (and popping a new column when crossing 99 -> 100, or
// dropping one on the way back down).
function StepperCard() {
  const [count, setCount] = useState(96);

  return (
    <DemoCard label="Stepper (96 -> try crossing 100)">
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Decrease"
          onClick={() => setCount((c) => Math.max(0, c - 1))}
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-input bg-background text-foreground shadow-xs transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
        >
          <MinusIcon />
        </button>
        <span className="font-display min-w-[4ch] text-center text-4xl font-bold text-foreground">
          <SlidingNumber value={count} />
        </span>
        <button
          type="button"
          aria-label="Increase"
          onClick={() => setCount((c) => c + 1)}
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-input bg-background text-foreground shadow-xs transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
        >
          <PlusIcon />
        </button>
      </div>
    </DemoCard>
  );
}

// A live HH:MM:SS clock — three independently padded SlidingNumber columns
// sharing static ":" separators. The tick interval only runs while the card
// is actually on screen.
function ClockCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isActive = useViewportActive(containerRef);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    if (!isActive) return;
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, [isActive]);

  return (
    <DemoCard label="Live clock">
      <div ref={containerRef} className="font-display flex items-baseline gap-1 text-4xl font-bold text-foreground">
        <SlidingNumber value={now.getHours()} padStart={2} />
        <span className="text-muted-foreground">:</span>
        <SlidingNumber value={now.getMinutes()} padStart={2} />
        <span className="text-muted-foreground">:</span>
        <SlidingNumber value={now.getSeconds()} padStart={2} />
      </div>
    </DemoCard>
  );
}

// Monthly / annual price toggle — demonstrates decimalPlaces and isGrouped
// (the annual total crosses into four digits, so a thousands separator pops
// in alongside the digit-count growth).
function PriceCard() {
  const [isAnnual, setIsAnnual] = useState(false);
  const price = isAnnual ? 1908 : 29;

  return (
    <DemoCard label="Monthly / annual price">
      <div className="flex items-baseline gap-1 text-foreground">
        <span className="font-display text-2xl font-semibold">$</span>
        <span className="font-display text-4xl font-bold">
          <SlidingNumber value={price} isGrouped />
        </span>
        <span className="text-sm font-medium text-muted-foreground">
          {isAnnual ? '/yr' : '/mo'}
        </span>
      </div>
      <div className="flex items-center gap-1 rounded-full border border-border bg-muted/40 p-0.5 text-xs font-medium">
        <button
          type="button"
          aria-pressed={!isAnnual}
          onClick={() => setIsAnnual(false)}
          className={
            !isAnnual
              ? 'rounded-full bg-background px-3 py-1 text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
              : 'rounded-full px-3 py-1 text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          }
        >
          Monthly
        </button>
        <button
          type="button"
          aria-pressed={isAnnual}
          onClick={() => setIsAnnual(true)}
          className={
            isAnnual
              ? 'rounded-full bg-background px-3 py-1 text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
              : 'rounded-full px-3 py-1 text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          }
        >
          Annual
        </button>
      </div>
    </DemoCard>
  );
}

export function SlidingNumberDemo() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <StepperCard />
      <ClockCard />
      <PriceCard />
    </div>
  );
}

export function SlidingNumberPreviewCompact() {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isActive = useViewportActive(containerRef);
  const [count, setCount] = useState(42);

  useEffect(() => {
    if (!isActive) return;
    const id = window.setInterval(() => {
      setCount((c) => (c >= 999 ? 42 : c + Math.round(7 + Math.random() * 40)));
    }, 1800);
    return () => window.clearInterval(id);
  }, [isActive]);

  return (
    <span ref={containerRef} className="font-display text-4xl font-bold text-foreground">
      <SlidingNumber value={count} />
    </span>
  );
}
