'use client';

import { type ReactNode } from 'react';
import { Carousel } from '@varient/ui';

// Neutral gradient blocks standing in for photography — the house pattern
// for "media" demo slots that shouldn't depend on remote image assets (see
// expandable-card-demo's MediaBlock / image-comparison-demo's PhotoScene).
function MediaBlock({ icon, tone = 'neutral' }: { icon: ReactNode; tone?: 'neutral' | 'brand' }) {
  return (
    <div
      className={
        tone === 'brand'
            ? 'flex aspect-4/3 w-full items-center justify-center rounded-xl bg-linear-to-br from-brand/25 via-brand-light/10 to-card text-brand'
            : 'flex aspect-4/3 w-full items-center justify-center rounded-xl bg-linear-to-br from-muted via-card to-muted/60 text-muted-foreground/50'
      }
    >
      {icon}
    </div>
  );
}

function MountainIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-10" aria-hidden>
      <path d="m3 18 6-9 4 5 2-3 6 7H3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="17" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-10" aria-hidden>
      <path
        d="M5 19c8-1 12-6 13-14-8 1-13 5-14 13-.1.6.4 1.1 1 1Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M6 18c2-4 5-7 9-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function WaveIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-10" aria-hidden>
      <path
        d="M3 15c1.5-2 3.5-2 5 0s3.5 2 5 0 3.5-2 5 0 2.5 1.6 3-.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M3 10c1.5-2 3.5-2 5 0s3.5 2 5 0 3.5-2 5 0 2.5 1.6 3-.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6 text-brand" aria-hidden>
      <path
        d="M7.5 8.5c-2 0-3.5 1.6-3.5 3.8 0 2 1.3 3.2 3 3.2.3 2.2-1 3.7-3 4.2v1.3c3.4-.5 5.5-2.7 5.5-6.2V12c0-2.2-1-3.5-2-3.5Zm9 0c-2 0-3.5 1.6-3.5 3.8 0 2 1.3 3.2 3 3.2.3 2.2-1 3.7-3 4.2v1.3c3.4-.5 5.5-2.7 5.5-6.2V12c0-2.2-1-3.5-2-3.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

const GALLERY_SLIDES = [
  { icon: <MountainIcon />, label: 'Ridge line', tone: 'brand' as const },
  { icon: <LeafIcon />, label: 'Canopy', tone: 'neutral' as const },
  { icon: <WaveIcon />, label: 'Tideline', tone: 'brand' as const },
  { icon: <MountainIcon />, label: 'Basin', tone: 'neutral' as const },
  { icon: <LeafIcon />, label: 'Understory', tone: 'brand' as const },
];

const TESTIMONIALS = [
  {
    quote:
      'We swapped three separate motion libraries for Varient in an afternoon. The springs alone were worth it.',
    name: 'Priya Shah',
    role: 'Staff Engineer, Fintech startup',
  },
  {
    quote:
      'Carousel was the last primitive we were missing — drag, keyboard, and dots all work exactly the way our design spec described.',
    name: 'Marcus Lindqvist',
    role: 'Design Systems Lead',
  },
  {
    quote:
      'Reduced-motion support is genuinely everywhere, not bolted on. That saved us an entire accessibility audit pass.',
    name: 'Andrea Colón',
    role: 'Accessibility Consultant',
  },
];

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export function CarouselDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Gallery — arrows &amp; dots</p>
        <DemoCard label="align=&quot;start&quot;, drag or use the controls">
          <Carousel align="start" gap={16} className="w-full max-w-md">
            {GALLERY_SLIDES.map((slide) => (
              <Carousel.Item key={slide.label} className="w-full">
                <MediaBlock icon={slide.icon} tone={slide.tone} />
                <p className="mt-2 text-center text-sm font-medium text-foreground">{slide.label}</p>
              </Carousel.Item>
            ))}
            <Carousel.Previous />
            <Carousel.Next />
            <Carousel.Dots />
          </Carousel>
        </DemoCard>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Centered peek, looping</p>
        <DemoCard label="align=&quot;center&quot;, isLooping, partial-width items">
          <Carousel align="center" gap={12} isLooping className="w-full max-w-md">
            {GALLERY_SLIDES.map((slide) => (
              <Carousel.Item key={slide.label} className="w-[70%] sm:w-[55%]">
                <MediaBlock icon={slide.icon} tone={slide.tone} />
              </Carousel.Item>
            ))}
            <Carousel.Previous />
            <Carousel.Next />
            <Carousel.Dots />
          </Carousel>
        </DemoCard>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Testimonial quotes</p>
        <DemoCard label="single slide, dots only, no arrows">
          <Carousel align="center" className="w-full max-w-md">
            {TESTIMONIALS.map((testimonial) => (
              <Carousel.Item key={testimonial.name} className="w-full">
                <div className="flex flex-col gap-4 rounded-xl border border-border bg-background p-6">
                  <QuoteIcon />
                  <p className="text-sm text-foreground">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">{testimonial.name}</span>
                    <span className="text-xs text-muted-foreground">{testimonial.role}</span>
                  </div>
                </div>
              </Carousel.Item>
            ))}
            <Carousel.Dots />
          </Carousel>
        </DemoCard>
      </div>
    </div>
  );
}

export function CarouselPreviewCompact() {
  return (
    <Carousel align="center" gap={10} className="w-full max-w-65">
      {GALLERY_SLIDES.slice(0, 3).map((slide) => (
        <Carousel.Item key={slide.label} className="w-full">
          <MediaBlock icon={slide.icon} tone={slide.tone} />
        </Carousel.Item>
      ))}
      <Carousel.Dots />
    </Carousel>
  );
}
