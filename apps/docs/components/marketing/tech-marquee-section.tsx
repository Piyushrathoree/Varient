'use client';

import { Marquee } from '@varient/ui';
import { SectionHeader } from '@/components/marketing/section-header';
import Divider from '@/components/marketing/divider';

const TECH_STACK = [
  'React',
  'Next.js',
  'Tailwind CSS v4',
  'Motion',
  'Radix UI',
  'TypeScript',
  'React Native',
  'Expo',
  'NativeWind',
  'Reanimated',
] as const;

function TechPill({ label }: { label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full border border-border bg-background/80 px-4 py-2 text-sm font-medium text-foreground/80 backdrop-blur-sm">
      {label}
    </span>
  );
}

export function TechMarqueeSection() {
  return (
    <section className="relative overflow-hidden bg-background px-6 py-20 md:px-8 md:py-24">
      <Divider />
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          align="center"
          description="Built on the stack you already use — web today, native next."
          eyebrow="Stack"
          title="Works with your toolchain"
        />
        <div className="relative mt-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent md:w-24"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent md:w-24"
          />
          <Marquee className="py-2" gap={12} pauseOnHover speed={28}>
            {TECH_STACK.map((name) => (
              <TechPill key={name} label={name} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
