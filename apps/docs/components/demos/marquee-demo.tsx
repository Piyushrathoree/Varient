'use client';

import { type ReactNode } from 'react';
import { Badge, Marquee } from '@varient/ui';
import { Star } from 'lucide-react';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

const LOGOS = ['Vercel', 'Linear', 'Stripe', 'Notion', 'Figma', 'Raycast'] as const;

const REVIEWS = [
  { name: 'Alex M.', quote: 'Shipped our landing page in a day.' },
  { name: 'Sam K.', quote: 'The motion feels polished, not gimmicky.' },
  { name: 'Jordan P.', quote: 'Copy-paste DX is exactly what we needed.' },
  { name: 'Riley T.', quote: 'Tokens and a11y are baked in.' },
] as const;

function LogoPill({ label }: { label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full border border-border bg-primary px-4 py-2 text-sm font-medium text-foreground">
      {label}
    </span>
  );
}

function ReviewChip({ name, quote }: { name: string; quote: string }) {
  return (
    <div className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
      <div className="flex items-center gap-0.5 text-brand">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className="size-3.5 fill-current" aria-hidden="true" />
        ))}
      </div>
      <p className="text-sm text-foreground">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground"> — {quote}</span>
      </p>
    </div>
  );
}

export function MarqueeDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      <p className="text-sm font-medium text-muted-foreground">
        Hover a horizontal track to pause — `pauseOnHover` is on by default.
      </p>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Logo strip</p>
        <div className="grid grid-cols-1 gap-4">
          <DemoCard label="Scroll left (default)">
            <Marquee gap={12} speed={24} className="w-full py-2">
              {LOGOS.map((logo) => (
                <LogoPill key={logo} label={logo} />
              ))}
            </Marquee>
          </DemoCard>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Directions &amp; speed</p>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <DemoCard label="Scroll right">
            <Marquee direction="right" gap={12} speed={18} className="w-full py-2">
              {LOGOS.map((logo) => (
                <LogoPill key={`right-${logo}`} label={logo} />
              ))}
            </Marquee>
          </DemoCard>

          <DemoCard label="Faster loop (12s)">
            <Marquee gap={12} speed={12} className="w-full py-2">
              {REVIEWS.map((review) => (
                <ReviewChip key={review.name} name={review.name} quote={review.quote} />
              ))}
            </Marquee>
          </DemoCard>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Vertical</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DemoCard label="Scroll up">
            <Marquee direction="up" gap={8} speed={16} className="h-48 w-full">
              {['Design tokens', 'Reduced motion', 'Copy-paste DX', 'Spring physics', 'Live previews'].map(
                (item) => (
                  <Badge key={item} variant="primary" appearance="soft" shape="pill">
                    {item}
                  </Badge>
                ),
              )}
            </Marquee>
          </DemoCard>

          <DemoCard label="Scroll down">
            <Marquee direction="down" gap={8} speed={20} className="h-48 w-full">
              {['Foundation', 'Animated', 'Sections', 'Playground', 'Registry'].map((item) => (
                <Badge key={`down-${item}`} variant="secondary" appearance="soft" shape="pill">
                  {item}
                </Badge>
              ))}
            </Marquee>
          </DemoCard>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">States</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DemoCard label="Paused (isPaused)">
            <Marquee isPaused gap={12} className="w-full py-2">
              {LOGOS.slice(0, 4).map((logo) => (
                <LogoPill key={`paused-${logo}`} label={logo} />
              ))}
            </Marquee>
          </DemoCard>

          <DemoCard label="No hover pause">
            <Marquee pauseOnHover={false} gap={12} speed={14} className="w-full py-2">
              {LOGOS.slice(0, 4).map((logo) => (
                <LogoPill key={`nohover-${logo}`} label={logo} />
              ))}
            </Marquee>
          </DemoCard>
        </div>
      </div>
    </div>
  );
}

export function MarqueePreviewCompact() {
  return (
    <Marquee gap={10} speed={22} className="w-full py-1">
      {['React', 'Motion', 'Tailwind', 'Radix'].map((tag) => (
        <Badge key={tag} variant="outline" size="sm">
          {tag}
        </Badge>
      ))}
    </Marquee>
  );
}
